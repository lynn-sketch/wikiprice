/**
 * WikiPrice API — Netlify Function backed by Netlify Database (Postgres).
 * Routes (via /api/* rewrite):
 *   GET  /api/health
 *   GET  /api/catalog
 *   POST /api/forms
 *   GET  /api/forms   (admin — requires x-wp-admin-token matching ADMIN_API_TOKEN)
 *   POST /api/seed    (admin — seed from data/catalog-seed.json if empty)
 */
import { getDatabase } from '@netlify/database';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-WP-Admin-Token',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...cors },
    body: JSON.stringify(body)
  };
}

function pathParts(event) {
  const raw = (event.path || '').replace(/^\/\.netlify\/functions\/api\/?/, '').replace(/^\/api\/?/, '');
  return raw.split('/').filter(Boolean);
}

function isAdmin(event) {
  const expected = process.env.ADMIN_API_TOKEN || process.env.WP_ADMIN_TOKEN;
  if (!expected) return false;
  const got = event.headers['x-wp-admin-token'] || event.headers['X-WP-Admin-Token'];
  return got && got === expected;
}

function loadSeed() {
  const candidates = [
    join(__dirname, '../../data/catalog-seed.json'),
    join(process.cwd(), 'data/catalog-seed.json')
  ];
  for (const p of candidates) {
    try {
      return JSON.parse(readFileSync(p, 'utf8'));
    } catch (_) { /* try next */ }
  }
  return null;
}

async function ensureSeeded(db) {
  const countRows = await db.sql`SELECT COUNT(*)::int AS count FROM deals`;
  const count = Number((countRows[0] && countRows[0].count) || 0);
  if (count > 0) return { seeded: false, deals: count };
  const seed = loadSeed();
  if (!seed || !Array.isArray(seed.deals)) {
    return { seeded: false, deals: 0, warning: 'no seed file' };
  }
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    for (const s of seed.sellers || []) {
      const id = s.id;
      if (!id) continue;
      await client.query(
        `INSERT INTO sellers (id, payload) VALUES ($1, $2::jsonb)
         ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
        [id, JSON.stringify(s)]
      );
    }
    for (const d of seed.deals || []) {
      const id = d.id;
      if (!id) continue;
      await client.query(
        `INSERT INTO deals (id, seller_id, payload) VALUES ($1, $2, $3::jsonb)
         ON CONFLICT (id) DO UPDATE SET
           seller_id = EXCLUDED.seller_id,
           payload = EXCLUDED.payload,
           updated_at = NOW()`,
        [id, d.sellerId || null, JSON.stringify(d)]
      );
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
  return { seeded: true, deals: (seed.deals || []).length, sellers: (seed.sellers || []).length };
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  const parts = pathParts(event);
  const route = parts[0] || 'health';

  try {
    if (route === 'health') {
      let dbOk = false;
      let dbError = null;
      try {
        const db = getDatabase();
        await db.sql`SELECT 1 AS ok`;
        dbOk = true;
      } catch (e) {
        dbError = e.message || String(e);
      }
      return json(200, {
        ok: true,
        service: 'wikiprice-api',
        database: dbOk ? 'connected' : 'unavailable',
        databaseError: dbError,
        time: new Date().toISOString()
      });
    }

    const db = getDatabase();

    if (route === 'catalog' && event.httpMethod === 'GET') {
      const seedInfo = await ensureSeeded(db);
      const sellersRows = await db.sql`SELECT id, payload FROM sellers ORDER BY id`;
      const dealsRows = await db.sql`SELECT id, seller_id, payload FROM deals ORDER BY id`;
      const sellers = {};
      for (const row of sellersRows) {
        const p = typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload;
        sellers[row.id] = p;
      }
      const deals = dealsRows.map((row) => {
        const p = typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload;
        return p;
      });
      return json(200, {
        ok: true,
        source: 'netlify-database',
        seed: seedInfo,
        sellers,
        deals,
        count: { sellers: Object.keys(sellers).length, deals: deals.length }
      });
    }

    if (route === 'forms' && event.httpMethod === 'POST') {
      let body = {};
      try {
        body = JSON.parse(event.body || '{}');
      } catch (_) {
        return json(400, { ok: false, error: 'Invalid JSON' });
      }
      const formType = String(body.formType || body.type || 'unknown').slice(0, 80);
      const payload = Object.assign({}, body);
      delete payload.formType;
      const insert = await db.pool.query(
        `INSERT INTO form_submissions (form_type, payload)
         VALUES ($1, $2::jsonb) RETURNING id, created_at`,
        [formType, JSON.stringify(payload)]
      );
      const row = insert.rows[0];

      if (formType === 'nominate' || formType === 'admin-intake' || formType === 'seller-signup') {
        const oid = 'tr-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        const outreach = {
          id: oid,
          stage: 'contacted',
          status: 'contacted',
          contactedAt: new Date().toISOString().slice(0, 10),
          businessName: payload.businessName || payload.name || 'Unknown',
          handle: payload.handle || payload.tiktokHandle || '',
          notes: [
            payload.location || '',
            payload.arcade ? (payload.arcade + ' ' + (payload.stall || '')) : '',
            payload.source ? ('source=' + payload.source) : '',
            payload.notes || '',
            'via=' + formType
          ].filter(Boolean).join(' | ')
        };
        await db.pool.query(
          `INSERT INTO outreach (id, payload) VALUES ($1, $2::jsonb) ON CONFLICT (id) DO NOTHING`,
          [oid, JSON.stringify(outreach)]
        );
      }

      return json(201, { ok: true, via: 'netlify-database', id: row.id, createdAt: row.created_at });
    }

    if (route === 'forms' && event.httpMethod === 'GET') {
      if (!isAdmin(event)) return json(401, { ok: false, error: 'Admin token required' });
      const rows = await db.sql`
        SELECT id, form_type, payload, created_at
        FROM form_submissions
        ORDER BY created_at DESC
        LIMIT 200
      `;
      return json(200, { ok: true, forms: rows });
    }

    if (route === 'seed' && event.httpMethod === 'POST') {
      if (!isAdmin(event)) return json(401, { ok: false, error: 'Admin token required' });
      const force = (event.queryStringParameters || {}).force === '1';
      if (force) {
        await db.sql`DELETE FROM deals`;
        await db.sql`DELETE FROM sellers`;
      }
      const info = await ensureSeeded(db);
      return json(200, { ok: true, ...info });
    }

    if (route === 'outreach' && event.httpMethod === 'GET') {
      if (!isAdmin(event)) return json(401, { ok: false, error: 'Admin token required' });
      const rows = await db.sql`SELECT id, payload, updated_at FROM outreach ORDER BY updated_at DESC LIMIT 500`;
      return json(200, {
        ok: true,
        outreach: rows.map((r) => (typeof r.payload === 'string' ? JSON.parse(r.payload) : r.payload))
      });
    }

    return json(404, { ok: false, error: 'Not found', route });
  } catch (e) {
    console.error('[wikiprice-api]', e);
    return json(500, {
      ok: false,
      error: e.message || String(e),
      hint: 'Netlify Database provisions on deploy when @netlify/database is installed (credit-based plans). Site falls back to static data until then.'
    });
  }
}
