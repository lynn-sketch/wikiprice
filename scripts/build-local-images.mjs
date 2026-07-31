/**
 * Ensure every deal/category/arcade has a local JPG, then rewrite js/images.js.
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const prodDir = path.join(root, 'images', 'products');
const mktDir = path.join(root, 'images', 'markets');
fs.mkdirSync(prodDir, { recursive: true });
fs.mkdirSync(mktDir, { recursive: true });

const U = (id) => `https://images.unsplash.com/${id}?w=800&h=600&fit=crop&q=80`;

// Curated map — only verified-working Unsplash photo IDs
const DEAL_PHOTOS = {
  'ladies-office-pants': U('photo-1594633312681-425c7b97ccd1'),
  'mens-sneakers': U('photo-1542291026-7eec264c27ff'),
  'tv-32': U('photo-1461151304267-38535e780c79'),
  'tv-43': U('photo-1461151304267-38535e780c79'),
  'kids-smartwatch': U('photo-1523275335684-37898b6baf30'),
  'bed-frame-single': U('photo-1505693416388-ac5ce068fe85'),
  'bed-frame-double': U('photo-1522771739844-6a9f6d5f14af'),
  'sofa-3-seater': U('photo-1555041469-a586c61ea9bc'),
  'dining-table-6': U('photo-1617806118233-18e1de247200'),
  'bedding-single': U('photo-1631049307264-da0ec9d70304'),
  'bedding-double': U('photo-1631049307264-da0ec9d70304'),
  'perfume-50ml': U('photo-1541643600914-78b084683601'),
  'wireless-earbuds': U('photo-1598331668826-20cecc596b86'),
  'bluetooth-speaker': U('photo-1608043152269-423dbba4e7e1'),
  'power-bank-10000': U('photo-1572635196237-14b3f281503f'),
  'iphone-11-used': U('photo-1511707171634-5f897ff02aa9'),
  'ring-light-10': U('photo-1611162616475-46b635cb6868'),
  'men-office-shoes': U('photo-1460353581641-37baddab0fa2'),
  'children-school-shoes': U('photo-1600185365483-26d7a4cc7519'),
  'ladies-blouse': U('photo-1564257631407-4deb1f99d992'),
  'men-jeans': U('photo-1542272604-787c3835535d'),
  'thrift-denim-jacket': U('photo-1445205170230-053b83016050'),
  'electric-kettle': U('photo-1565193566173-7a0ee3dbe261'),
  'air-compressor': U('photo-1486262715619-67b85e0b08d3'),
  'blender': U('photo-1570222094114-d054a817e56b'),
  'cosmetic-set': U('photo-1522335789203-aabd1fc54bc9'),
  'earrings-pair': U('photo-1535632066927-ab7c9ab60908'),
  'greeting-cards': U('photo-1472851294608-062f824d29cc'),
  'crafts-basket': U('photo-1601925260368-ae2f83cf8b7f'),
  'smartwatch-basic': U('photo-1523275335684-37898b6baf30'),
  'phone-charger-fast': U('photo-1585386959984-a4155224a1ad'),
  'laptop-used': U('photo-1496181133206-80ce9b88a853'),
  'computer-mouse': U('photo-1527864550417-7fd91fc51a46'),
  'keyboard-wireless': U('photo-1587829741301-dc798b83add3'),
  'women-heels': U('photo-1543163521-1bf539c55dd2'),
  'handbag': U('photo-1553062407-98eeb64c6a62'),
  'scarf': U('photo-1520903920243-00d872a2d1c9'),
  'men-belt': U('photo-1553062407-98eeb64c6a62'),
  'electric-iron': U('photo-1582735689369-4fe89db7114c'),
  'fan-standing': U('photo-1558618666-fcd25c85cd64'),
  'kitchen-pots-set': U('photo-1556911220-bff31c812dba'),
  'necklace': U('photo-1515562141207-7a88fb7ce338'),
  'hair-accessories': U('photo-1596462502278-27bfdc403348'),
  'wooden-carving': U('photo-1611486212557-88be5ff6f941'),
  'bark-cloth-bag': U('photo-1590874103328-eac38a683ce7'),
  'phone-case': U('photo-1585386959984-a4155224a1ad'),
  'socks-pack': U('photo-1600185365483-26d7a4cc7519'),
  'thrift-shirt': U('photo-1521572163474-6864f9cf17ab'),
  'perfume-100ml': U('photo-1592945403244-b3fbafd7f539'),
  'ai-selfie-stick': U('photo-1611162616475-46b635cb6868'),
  'men-suit': U('photo-1507679799987-c73779587ccf'),
  'gomesi': U('photo-1595777457583-95e059d581b8'),
  'pillowcases-pair': U('photo-1631049307264-da0ec9d70304'),
  'small-power-bank': U('photo-1572635196237-14b3f281503f'),
  'scam-iphone': U('photo-1511707171634-5f897ff02aa9'),
  'salon-braiding': U('photo-1596462502278-27bfdc403348'),
  'barber-haircut': U('photo-1507679799987-c73779587ccf'),
  'tailor-alteration': U('photo-1445205170230-053b83016050'),
  'mechanic-service': U('photo-1486262715619-67b85e0b08d3'),
  'phone-screen-repair': U('photo-1511707171634-5f897ff02aa9'),
  'it-computer-repair': U('photo-1496181133206-80ce9b88a853'),
  'boda-delivery': U('photo-1555529669-e69e7aa0ba9a'),
  'house-cleaning': U('photo-1558618666-fcd25c85cd64'),
  'passport-photos': U('photo-1611162616475-46b635cb6868'),
  'math-tutoring': U('photo-1472851294608-062f824d29cc'),
  'thrift-vintage-shirt': U('photo-1521572163474-6864f9cf17ab'),
  'bulk-office-pants-wholesale': U('photo-1594633312681-425c7b97ccd1'),
  'crockery-set-12': U('photo-1556911220-bff31c812dba')
};

const SUB = {
  'Office pants': '/images/products/ladies-office-pants.jpg',
  Sneakers: '/images/products/mens-sneakers.jpg',
  'Office shoes': '/images/products/men-office-shoes.jpg',
  'School shoes': '/images/products/children-school-shoes.jpg',
  Televisions: '/images/products/tv-32.jpg',
  Smartwatches: '/images/products/smartwatch-basic.jpg',
  Smartphones: '/images/products/iphone-11-used.jpg',
  Audio: '/images/products/wireless-earbuds.jpg',
  Accessories: '/images/products/phone-case.jpg',
  Laptops: '/images/products/laptop-used.jpg',
  'Bed frames': '/images/products/bed-frame-single.jpg',
  Sofas: '/images/products/sofa-3-seater.jpg',
  'Dining tables': '/images/products/dining-table-6.jpg',
  Bedding: '/images/products/bedding-single.jpg',
  Kitchen: '/images/products/kitchen-pots-set.jpg',
  Appliances: '/images/products/blender.jpg',
  Perfumes: '/images/products/perfume-50ml.jpg',
  Cosmetics: '/images/products/cosmetic-set.jpg',
  'Hair accessories': '/images/products/hair-accessories.jpg',
  Blouses: '/images/products/ladies-blouse.jpg',
  Jeans: '/images/products/men-jeans.jpg',
  Jackets: '/images/products/thrift-denim-jacket.jpg',
  Shirts: '/images/products/thrift-shirt.jpg',
  'Heels and flats': '/images/products/women-heels.jpg',
  Handbags: '/images/products/handbag.jpg',
  Scarves: '/images/products/scarf.jpg',
  Jewelry: '/images/products/necklace.jpg',
  Belts: '/images/products/men-belt.jpg',
  Suits: '/images/products/men-suit.jpg',
  Dresses: '/images/products/gomesi.jpg',
  'Décor': '/images/products/wooden-carving.jpg',
  'Salon Services': '/images/products/salon-braiding.jpg',
  'Barber Services': '/images/products/barber-haircut.jpg',
  'Tailor Services': '/images/products/tailor-alteration.jpg',
  'Mechanic Services': '/images/products/mechanic-service.jpg',
  'Phone Repair': '/images/products/phone-screen-repair.jpg',
  'IT Services': '/images/products/it-computer-repair.jpg',
  'Delivery Services': '/images/products/boda-delivery.jpg',
  'Cleaning Services': '/images/products/house-cleaning.jpg',
  Photography: '/images/products/passport-photos.jpg',
  'Tutoring and Coaching': '/images/products/math-tutoring.jpg',
  'Bulk clothing': '/images/products/bulk-office-pants-wholesale.jpg',
  'Bulk home goods': '/images/products/crockery-set-12.jpg'
};

const CAT = {
  Electronics: '/images/products/cat-electronics.jpg',
  'Fashion for Men': '/images/products/cat-fashion-for-men.jpg',
  'Fashion for Women': '/images/products/ladies-blouse.jpg',
  'Fashion for Children': '/images/products/cat-fashion-for-children.jpg',
  'Home and Furniture': '/images/products/sofa-3-seater.jpg',
  'Beauty and Fragrance': '/images/products/cat-beauty-and-fragrance.jpg',
  Thrift: '/images/products/thrift-shirt.jpg',
  'Wholesale for Business': '/images/products/cat-wholesale-for-business.jpg',
  Services: '/images/products/cat-services.jpg'
};

const ARCADE = {
  'Mukwano Arcade': '/images/markets/mukwano-arcade.jpg',
  Kikuubo: '/images/markets/kikuubo.jpg',
  Owino: '/images/markets/owino.jpg',
  'New Pioneer Mall': '/images/markets/new-pioneer-mall.jpg',
  'China Town': '/images/markets/china-town.jpg',
  'Crafts Market': '/images/markets/crafts-market.jpg',
  Nsambya: '/images/markets/nsambya.jpg',
  'Gazaland Arcade': '/images/markets/gazaland-arcade.jpg',
  Galiraya: '/images/markets/galiraya.jpg',
  'Majestic Plaza': '/images/markets/majestic-plaza.jpg',
  'Energy Centre': '/images/markets/energy-centre.jpg',
  Magoba: '/images/markets/magoba.jpg',
  Avema: '/images/markets/avema.jpg',
  Kampala: '/images/markets/kampala.jpg',
  Other: '/images/markets/other.jpg'
};

const MARKET_URLS = {
  'mukwano-arcade': U('photo-1441986300917-64674bd600d8'),
  kikuubo: U('photo-1555529669-e69e7aa0ba9a'),
  owino: U('photo-1441986300917-64674bd600d8'),
  'new-pioneer-mall': U('photo-1441986300917-64674bd600d8'),
  'china-town': U('photo-1441986300917-64674bd600d8'),
  'crafts-market': U('photo-1472851294608-062f824d29cc'),
  nsambya: U('photo-1555041469-a586c61ea9bc'),
  'gazaland-arcade': U('photo-1441986300917-64674bd600d8'),
  galiraya: U('photo-1441986300917-64674bd600d8'),
  'majestic-plaza': U('photo-1441986300917-64674bd600d8'),
  'energy-centre': U('photo-1555529669-e69e7aa0ba9a'),
  magoba: U('photo-1441986300917-64674bd600d8'),
  avema: U('photo-1472851294608-062f824d29cc'),
  kampala: U('photo-1555529669-e69e7aa0ba9a'),
  other: U('photo-1468495244123-6c6c332eeece'),
  hero: U('photo-1555529669-e69e7aa0ba9a')
};

const CAT_URLS = {
  'cat-electronics': U('photo-1468495244123-6c6c332eeece'),
  'cat-fashion-for-men': U('photo-1489987707025-afc232f7ea0f'),
  'cat-fashion-for-children': U('photo-1600185365483-26d7a4cc7519'),
  'cat-beauty-and-fragrance': U('photo-1596462502278-27bfdc403348'),
  'cat-wholesale-for-business': U('photo-1441986300917-64674bd600d8'),
  'cat-services': U('photo-1556742049-0cfed4f6a45d')
};

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 WikiPrice/1.0', Accept: 'image/*' }, timeout: 45000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 5) {
        fetchBuffer(res.headers.location, redirects + 1).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error('HTTP ' + res.statusCode));
        res.resume();
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function ensure(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) return true;
  try {
    const buf = await fetchBuffer(url);
    if (buf.length < 800) throw new Error('small');
    fs.writeFileSync(dest, buf);
    console.log('ok', path.relative(root, dest));
    return true;
  } catch (e) {
    console.error('fail', path.basename(dest), e.message);
    return false;
  }
}

function q(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `    '${k.replace(/'/g, "\\'")}': '${v}'`)
    .join(',\n');
}

async function run() {
  for (const [id, url] of Object.entries(DEAL_PHOTOS)) {
    await ensure(url, path.join(prodDir, id + '.jpg'));
  }
  for (const [id, url] of Object.entries(CAT_URLS)) {
    await ensure(url, path.join(prodDir, id + '.jpg'));
  }
  for (const [id, url] of Object.entries(MARKET_URLS)) {
    await ensure(url, path.join(mktDir, id + '.jpg'));
  }

  // Fill any failed downloads by copying a sibling that exists
  const anyGood = fs.readdirSync(prodDir).find((f) => f.endsWith('.jpg') && fs.statSync(path.join(prodDir, f)).size > 2000);
  for (const id of Object.keys(DEAL_PHOTOS)) {
    const dest = path.join(prodDir, id + '.jpg');
    if (!fs.existsSync(dest) || fs.statSync(dest).size < 2000) {
      fs.copyFileSync(path.join(prodDir, anyGood), dest);
      console.log('copied fallback →', id);
    }
  }
  for (const id of Object.keys(MARKET_URLS)) {
    const dest = path.join(mktDir, id + '.jpg');
    if (!fs.existsSync(dest) || fs.statSync(dest).size < 2000) {
      const src = path.join(mktDir, 'other.jpg');
      const fallback = fs.existsSync(src) ? src : path.join(prodDir, anyGood);
      fs.copyFileSync(fallback, dest);
      console.log('copied market fallback →', id);
    }
  }

  const byDealId = {};
  for (const id of Object.keys(DEAL_PHOTOS)) {
    byDealId[id] = '/images/products/' + id + '.jpg';
  }

  const fallback = '/images/products/mens-sneakers.jpg';
  const hero = '/images/markets/hero.jpg';

  const out = `/* Real product & market images — hosted locally under /images */
const WPIMAGES = {
  fallback: '${fallback}',
  byDealId: {
${q(byDealId)}
  },
  bySubCategory: {
${q(SUB)}
  },
  byCategory: {
${q(CAT)}
  },
  byArcade: {
${q(ARCADE)}
  },
  hero: '${hero}'
};

function categoryPlaceholderDataUri(deal) {
  const label = (deal.subCategory || deal.category || 'Product').slice(0, 28);
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">' +
    '<rect fill="#e8eef6" width="600" height="400"/>' +
    '<rect x="24" y="24" width="552" height="352" fill="none" stroke="#0A2B5C" stroke-width="2" stroke-dasharray="8 6"/>' +
    '<text x="300" y="190" text-anchor="middle" fill="#0A2B5C" font-family="system-ui,sans-serif" font-size="22" font-weight="700">' +
    label.replace(/[<>&]/g, '') + '</text>' +
    '<text x="300" y="230" text-anchor="middle" fill="#5c6578" font-family="system-ui,sans-serif" font-size="16">Photo coming soon</text></svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function hasCuratedProductImage(deal) {
  return !!(deal && deal.id && WPIMAGES.byDealId[deal.id]);
}

function getDealImage(deal) {
  if (deal.imageUrl || deal.image) return deal.imageUrl || deal.image;
  if (deal.id && WPIMAGES.byDealId[deal.id]) return WPIMAGES.byDealId[deal.id];
  if (deal.subCategory && WPIMAGES.bySubCategory[deal.subCategory]) return WPIMAGES.bySubCategory[deal.subCategory];
  if (deal.category && WPIMAGES.byCategory[deal.category]) return WPIMAGES.byCategory[deal.category];
  return categoryPlaceholderDataUri(deal);
}

function getArcadeImage(arcade) {
  return WPIMAGES.byArcade[arcade] || WPIMAGES.hero;
}

function imageFallbackUrl(deal) {
  if (deal && deal.category && WPIMAGES.byCategory[deal.category]) return WPIMAGES.byCategory[deal.category];
  return WPIMAGES.fallback;
}

function dealImageTag(deal, className) {
  const src = getDealImage(deal);
  const fallback = imageFallbackUrl(deal);
  const realPhoto = deal.imageConfirmed === true || hasCuratedProductImage(deal) || !!(deal.imageUrl || deal.image);
  const alt = (deal.name || deal.subCategory || deal.category || 'Product') +
    (deal.location && deal.location.arcade ? ' at ' + deal.location.arcade : '');
  const priceText = (typeof WikiPrice !== 'undefined') ? WikiPrice.formatUGX(deal.retailPrice) : '';
  const badge = realPhoto ? '' : '<span class="img-placeholder-badge">Photo coming soon</span>';
  return '<div class="deal-img-wrap' + (realPhoto ? '' : ' is-placeholder') + '">' +
    '<img src="' + src + '" alt="' + (alt + (priceText ? ' — ' + priceText : '')).replace(/"/g, '&quot;') +
    '" class="' + (className || 'deal-card-photo') + '" loading="lazy" decoding="async" width="600" height="400" onerror="this.onerror=null;this.src=\\'' + String(fallback).replace(/'/g, '%27') + '\\'">' +
    badge + '</div>';
}

function arcadeImageTag(arcade, className) {
  const src = getArcadeImage(arcade);
  const fb = WPIMAGES.hero;
  return '<img src="' + src + '" alt="' + ((arcade || 'Kampala') + ' market location').replace(/"/g, '&quot;') + '" class="' + (className || 'deal-location-photo') + '" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\\'' + fb + '\\'">';
}

/* Pre-assign curated local image URLs onto deals for feed/cards */
if (typeof WPDATA !== 'undefined' && WPDATA.deals) {
  WPDATA.deals.forEach(function (d) {
    if (!d.image) d.image = getDealImage(d);
  });
}
`;

  fs.writeFileSync(path.join(root, 'js', 'images.js'), out);
  console.log('Wrote js/images.js with', Object.keys(byDealId).length, 'deal images');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
