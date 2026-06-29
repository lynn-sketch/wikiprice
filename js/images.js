/* Real product & market images — every deal mapped with fallback */
const WPIMAGES = {
  fallback: 'https://picsum.photos/seed/wikiprice-default/600/400',
  byDealId: {
    'ladies-office-pants': 'https://images.unsplash.com/photo-1594633313593-bab3825d0ffd?w=600&h=400&fit=crop&q=80',
    'mens-sneakers': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&q=80',
    'tv-32': 'https://images.unsplash.com/photo-1593359677870-a886bb61758f?w=600&h=400&fit=crop&q=80',
    'tv-43': 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&h=400&fit=crop&q=80',
    'kids-smartwatch': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=400&fit=crop&q=80',
    'bed-frame-single': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop&q=80',
    'bed-frame-double': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop&q=80',
    'sofa-3-seater': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&q=80',
    'dining-table-6': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=400&fit=crop&q=80',
    'bedding-single': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop&q=80',
    'bedding-double': 'https://images.unsplash.com/photo-1616628188855-eebc9a788850?w=600&h=400&fit=crop&q=80',
    'perfume-50ml': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop&q=80',
    'wireless-earbuds': 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&h=400&fit=crop&q=80',
    'bluetooth-speaker': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop&q=80',
    'power-bank-10000': 'https://images.unsplash.com/photo-1609091839311-9f6374e29401?w=600&h=400&fit=crop&q=80',
    'iphone-11-used': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&q=80',
    'ring-light-10': 'https://images.unsplash.com/photo-1598387993288-911158a037a8?w=600&h=400&fit=crop&q=80',
    'men-office-shoes': 'https://images.unsplash.com/photo-1614252238956-18c9c0818432?w=600&h=400&fit=crop&q=80',
    'children-school-shoes': 'https://images.unsplash.com/photo-1519747867030-85daa2382583?w=600&h=400&fit=crop&q=80',
    'ladies-blouse': 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=400&fit=crop&q=80',
    'men-jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop&q=80',
    'thrift-denim-jacket': 'https://images.unsplash.com/photo-1576995853123-5a10305d93b0?w=600&h=400&fit=crop&q=80',
    'electric-kettle': 'https://images.unsplash.com/photo-1585515320310-259814833e95?w=600&h=400&fit=crop&q=80',
    'air-compressor': 'https://images.unsplash.com/photo-1631545806606-4119b817f088?w=600&h=400&fit=crop&q=80',
    'blender': 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=400&fit=crop&q=80',
    'cosmetic-set': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop&q=80',
    'earrings-pair': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop&q=80',
    'greeting-cards': 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=400&fit=crop&q=80',
    'crafts-basket': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4af6?w=600&h=400&fit=crop&q=80',
    'smartwatch-basic': 'https://images.unsplash.com/photo-1434493789847-36fc3ce615a2?w=600&h=400&fit=crop&q=80',
    'phone-charger-fast': 'https://images.unsplash.com/photo-1583863788437-e586919f3018?w=600&h=400&fit=crop&q=80',
    'laptop-used': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&q=80',
    'computer-mouse': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop&q=80',
    'keyboard-wireless': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=400&fit=crop&q=80',
    'women-heels': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd1?w=600&h=400&fit=crop&q=80',
    'handbag': 'https://images.unsplash.com/photo-1584917865442-de89a76c861a?w=600&h=400&fit=crop&q=80',
    'scarf': 'https://images.unsplash.com/photo-1601924994987-69d26eea064c?w=600&h=400&fit=crop&q=80',
    'men-belt': 'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=600&h=400&fit=crop&q=80',
    'electric-iron': 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=400&fit=crop&q=80',
    'fan-standing': 'https://images.unsplash.com/photo-1521208919023-8f4976611302?w=600&h=400&fit=crop&q=80',
    'kitchen-pots-set': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop&q=80',
    'necklace': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&q=80',
    'hair-accessories': 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=400&fit=crop&q=80',
    'wooden-carving': 'https://images.unsplash.com/photo-1459411552884-841db9b3a2ea?w=600&h=400&fit=crop&q=80',
    'bark-cloth-bag': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop&q=80',
    'phone-case': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=400&fit=crop&q=80',
    'socks-pack': 'https://images.unsplash.com/photo-1586350977777-b259281f8649?w=600&h=400&fit=crop&q=80',
    'thrift-shirt': 'https://images.unsplash.com/photo-1622445275463-afa12ab720dd?w=600&h=400&fit=crop&q=80',
    'perfume-100ml': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=400&fit=crop&q=80',
    'ai-selfie-stick': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&q=80',
    'men-suit': 'https://images.unsplash.com/photo-1593030760827-1dea814a2697?w=600&h=400&fit=crop&q=80',
    'gomesi': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=400&fit=crop&q=80',
    'pillowcases-pair': 'https://images.unsplash.com/photo-1616628188855-eebc9a788850?w=600&h=400&fit=crop&q=80',
    'small-power-bank': 'https://images.unsplash.com/photo-1609091839311-9f6374e29401?w=600&h=400&fit=crop&q=80',
    'scam-iphone': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&q=80'
  },
  bySubCategory: {
    'Office pants': 'https://images.unsplash.com/photo-1594633313593-bab3825d0ffd?w=600&h=400&fit=crop&q=80',
    'Sneakers': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&q=80',
    'Office shoes': 'https://images.unsplash.com/photo-1614252238956-18c9c0818432?w=600&h=400&fit=crop&q=80',
    'School shoes': 'https://images.unsplash.com/photo-1519747867030-85daa2382583?w=600&h=400&fit=crop&q=80',
    'Televisions': 'https://images.unsplash.com/photo-1593359677870-a886bb61758f?w=600&h=400&fit=crop&q=80',
    'Smartwatches': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=400&fit=crop&q=80',
    'Smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&q=80',
    'Audio': 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&h=400&fit=crop&q=80',
    'Accessories': 'https://images.unsplash.com/photo-1609091839311-9f6374e29401?w=600&h=400&fit=crop&q=80',
    'Laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&q=80',
    'Bed frames': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop&q=80',
    'Sofas': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&q=80',
    'Dining tables': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=400&fit=crop&q=80',
    'Bedding': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop&q=80',
    'Kitchen': 'https://images.unsplash.com/photo-1585515320310-259814833e95?w=600&h=400&fit=crop&q=80',
    'Appliances': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
    'Perfumes': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop&q=80',
    'Cosmetics': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop&q=80',
    'Hair accessories': 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=400&fit=crop&q=80',
    'Blouses': 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=400&fit=crop&q=80',
    'Jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop&q=80',
    'Jackets': 'https://images.unsplash.com/photo-1551028711-00167b16eac5?w=600&h=400&fit=crop&q=80',
    'Shirts': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop&q=80',
    'Heels and flats': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd1?w=600&h=400&fit=crop&q=80',
    'Handbags': 'https://images.unsplash.com/photo-1584917865442-de89a76c861a?w=600&h=400&fit=crop&q=80',
    'Scarves': 'https://images.unsplash.com/photo-1601924994987-69d26eea064c?w=600&h=400&fit=crop&q=80',
    'Jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&q=80',
    'Belts': 'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=600&h=400&fit=crop&q=80',
    'Suits': 'https://images.unsplash.com/photo-1593030760827-1dea814a2697?w=600&h=400&fit=crop&q=80',
    'Dresses': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop&q=80',
    'Décor': 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop&q=80'
  },
  byCategory: {
    'Electronics': 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop&q=80',
    'Fashion for Men': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=400&fit=crop&q=80',
    'Fashion for Women': 'https://images.unsplash.com/photo-1483985988351-763728e1935b?w=600&h=400&fit=crop&q=80',
    'Fashion for Children': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop&q=80',
    'Home and Furniture': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&q=80',
    'Beauty and Fragrance': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=80',
    'Thrift': 'https://images.unsplash.com/photo-1441984904996-e0b46a68712d?w=600&h=400&fit=crop&q=80',
    'Wholesale for Business': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80',
    'Services': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80'
  },
  byArcade: {
    'Mukwano Arcade': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&q=80',
    'Kikuubo': 'https://images.unsplash.com/photo-1555529669-2269763671de?w=800&h=400&fit=crop&q=80',
    'Owino': 'https://images.unsplash.com/photo-1441984904996-e0b46a68712d?w=800&h=400&fit=crop&q=80',
    'New Pioneer Mall': 'https://images.unsplash.com/photo-1519567240926-48fce67a675f?w=800&h=400&fit=crop&q=80',
    'China Town': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop&q=80',
    'Crafts Market': 'https://images.unsplash.com/photo-1452457807411-49776985dd22?w=800&h=400&fit=crop&q=80',
    'Nsambya': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&q=80',
    'Gazaland Arcade': 'https://images.unsplash.com/photo-1441984904996-e0b46a68712d?w=800&h=400&fit=crop&q=80',
    'Galiraya': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&q=80',
    'Majestic Plaza': 'https://images.unsplash.com/photo-1519567240926-48fce67a675f?w=800&h=400&fit=crop&q=80',
    'Energy Centre': 'https://images.unsplash.com/photo-1555529669-2269763671de?w=800&h=400&fit=crop&q=80',
    'Magoba': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&q=80',
    'Avema': 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&h=400&fit=crop&q=80',
    'Kampala': 'https://images.unsplash.com/photo-1555529669-2269763671de?w=800&h=400&fit=crop&q=80',
    'Other': 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=400&fit=crop&q=80'
  },
  hero: 'https://images.unsplash.com/photo-1555529669-2269763671de?w=1200&h=500&fit=crop&q=80'
};

function getDealImage(deal) {
  if (deal.image) return deal.image;
  if (deal.id && WPIMAGES.byDealId[deal.id]) return WPIMAGES.byDealId[deal.id];
  if (deal.subCategory && WPIMAGES.bySubCategory[deal.subCategory]) return WPIMAGES.bySubCategory[deal.subCategory];
  if (deal.category && WPIMAGES.byCategory[deal.category]) return WPIMAGES.byCategory[deal.category];
  return 'https://picsum.photos/seed/' + encodeURIComponent(deal.id || 'wikiprice') + '/600/400';
}

function getArcadeImage(arcade) {
  return WPIMAGES.byArcade[arcade] || WPIMAGES.hero;
}

function imageFallbackUrl(deal) {
  return 'https://picsum.photos/seed/wp-' + encodeURIComponent(deal.id || 'item') + '/600/400';
}

function dealImageTag(deal, className) {
  const src = getDealImage(deal);
  const fallback = imageFallbackUrl(deal);
  const alt = deal.name + ' at ' + (deal.location?.arcade || 'Kampala');
  const priceText = (typeof WikiPrice !== 'undefined') ? WikiPrice.formatUGX(deal.retailPrice) : '';
  return '<img src="' + src + '" alt="' + (alt + (priceText ? ' — ' + priceText : '')).replace(/"/g, '&quot;') + '" class="' + (className || 'deal-card-photo') + '" loading="lazy" decoding="async" width="600" height="400" onerror="if(this.dataset.fb){this.src=this.dataset.fb}else{this.dataset.fb=1;this.src=\'' + fallback + '\'}">';
}

function arcadeImageTag(arcade, className) {
  const src = getArcadeImage(arcade);
  const fb = 'https://picsum.photos/seed/arcade-' + encodeURIComponent(arcade || 'market') + '/800/400';
  return '<img src="' + src + '" alt="' + (arcade || 'Market') + '" class="' + (className || 'deal-location-photo') + '" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'' + fb + '\'">';
}

/* Pre-assign image URL on every deal */
if (typeof WPDATA !== 'undefined' && WPDATA.deals) {
  WPDATA.deals.forEach(function (d) {
    if (!d.image) d.image = getDealImage(d);
  });
}
