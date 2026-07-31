/**
 * Export WPDATA sellers + deals into data/catalog-seed.json for Netlify Database seeding.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const ctx = { console, Math, Date, Object, Array, JSON, String, Number, Boolean };
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(path.join(root, 'js/data.js'), 'utf8').replace(/\bconst WPDATA\b/, 'var WPDATA'),
  ctx
);
vm.runInContext(fs.readFileSync(path.join(root, 'js/data-extended.js'), 'utf8'), ctx);

const WPDATA = ctx.WPDATA;
if (!WPDATA || !WPDATA.deals) {
  console.error('Failed to load WPDATA');
  process.exit(1);
}

const sellers = Object.keys(WPDATA.sellers || {}).map((id) => {
  const s = Object.assign({ id }, WPDATA.sellers[id]);
  return s;
});

const deals = (WPDATA.deals || []).map((d) => Object.assign({}, d));

const out = {
  version: 1,
  exportedAt: new Date().toISOString(),
  sellers,
  deals
};

const dest = path.join(root, 'data', 'catalog-seed.json');
fs.writeFileSync(dest, JSON.stringify(out));
console.log('Wrote', dest, 'sellers=', sellers.length, 'deals=', deals.length);
