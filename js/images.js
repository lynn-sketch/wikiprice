/* Real product & market images — hosted locally under /images */
const WPIMAGES = {
  fallback: '/images/products/mens-sneakers.jpg',
  byDealId: {
    'ladies-office-pants': '/images/products/ladies-office-pants.jpg',
    'mens-sneakers': '/images/products/mens-sneakers.jpg',
    'tv-32': '/images/products/tv-32.jpg',
    'tv-43': '/images/products/tv-43.jpg',
    'kids-smartwatch': '/images/products/kids-smartwatch.jpg',
    'bed-frame-single': '/images/products/bed-frame-single.jpg',
    'bed-frame-double': '/images/products/bed-frame-double.jpg',
    'sofa-3-seater': '/images/products/sofa-3-seater.jpg',
    'dining-table-6': '/images/products/dining-table-6.jpg',
    'bedding-single': '/images/products/bedding-single.jpg',
    'bedding-double': '/images/products/bedding-double.jpg',
    'perfume-50ml': '/images/products/perfume-50ml.jpg',
    'wireless-earbuds': '/images/products/wireless-earbuds.jpg',
    'bluetooth-speaker': '/images/products/bluetooth-speaker.jpg',
    'power-bank-10000': '/images/products/power-bank-10000.jpg',
    'iphone-11-used': '/images/products/iphone-11-used.jpg',
    'ring-light-10': '/images/products/ring-light-10.jpg',
    'men-office-shoes': '/images/products/men-office-shoes.jpg',
    'children-school-shoes': '/images/products/children-school-shoes.jpg',
    'ladies-blouse': '/images/products/ladies-blouse.jpg',
    'men-jeans': '/images/products/men-jeans.jpg',
    'thrift-denim-jacket': '/images/products/thrift-denim-jacket.jpg',
    'electric-kettle': '/images/products/electric-kettle.jpg',
    'air-compressor': '/images/products/air-compressor.jpg',
    'blender': '/images/products/blender.jpg',
    'cosmetic-set': '/images/products/cosmetic-set.jpg',
    'earrings-pair': '/images/products/earrings-pair.jpg',
    'greeting-cards': '/images/products/greeting-cards.jpg',
    'crafts-basket': '/images/products/crafts-basket.jpg',
    'smartwatch-basic': '/images/products/smartwatch-basic.jpg',
    'phone-charger-fast': '/images/products/phone-charger-fast.jpg',
    'laptop-used': '/images/products/laptop-used.jpg',
    'computer-mouse': '/images/products/computer-mouse.jpg',
    'keyboard-wireless': '/images/products/keyboard-wireless.jpg',
    'women-heels': '/images/products/women-heels.jpg',
    'handbag': '/images/products/handbag.jpg',
    'scarf': '/images/products/scarf.jpg',
    'men-belt': '/images/products/men-belt.jpg',
    'electric-iron': '/images/products/electric-iron.jpg',
    'fan-standing': '/images/products/fan-standing.jpg',
    'kitchen-pots-set': '/images/products/kitchen-pots-set.jpg',
    'necklace': '/images/products/necklace.jpg',
    'hair-accessories': '/images/products/hair-accessories.jpg',
    'wooden-carving': '/images/products/wooden-carving.jpg',
    'bark-cloth-bag': '/images/products/bark-cloth-bag.jpg',
    'phone-case': '/images/products/phone-case.jpg',
    'socks-pack': '/images/products/socks-pack.jpg',
    'thrift-shirt': '/images/products/thrift-shirt.jpg',
    'perfume-100ml': '/images/products/perfume-100ml.jpg',
    'ai-selfie-stick': '/images/products/ai-selfie-stick.jpg',
    'men-suit': '/images/products/men-suit.jpg',
    'gomesi': '/images/products/gomesi.jpg',
    'pillowcases-pair': '/images/products/pillowcases-pair.jpg',
    'small-power-bank': '/images/products/small-power-bank.jpg',
    'scam-iphone': '/images/products/scam-iphone.jpg',
    'salon-braiding': '/images/products/salon-braiding.jpg',
    'barber-haircut': '/images/products/barber-haircut.jpg',
    'tailor-alteration': '/images/products/tailor-alteration.jpg',
    'mechanic-service': '/images/products/mechanic-service.jpg',
    'phone-screen-repair': '/images/products/phone-screen-repair.jpg',
    'it-computer-repair': '/images/products/it-computer-repair.jpg',
    'boda-delivery': '/images/products/boda-delivery.jpg',
    'house-cleaning': '/images/products/house-cleaning.jpg',
    'passport-photos': '/images/products/passport-photos.jpg',
    'math-tutoring': '/images/products/math-tutoring.jpg',
    'thrift-vintage-shirt': '/images/products/thrift-vintage-shirt.jpg',
    'bulk-office-pants-wholesale': '/images/products/bulk-office-pants-wholesale.jpg',
    'crockery-set-12': '/images/products/crockery-set-12.jpg'
  },
  bySubCategory: {
    'Office pants': '/images/products/ladies-office-pants.jpg',
    'Sneakers': '/images/products/mens-sneakers.jpg',
    'Office shoes': '/images/products/men-office-shoes.jpg',
    'School shoes': '/images/products/children-school-shoes.jpg',
    'Televisions': '/images/products/tv-32.jpg',
    'Smartwatches': '/images/products/smartwatch-basic.jpg',
    'Smartphones': '/images/products/iphone-11-used.jpg',
    'Audio': '/images/products/wireless-earbuds.jpg',
    'Accessories': '/images/products/phone-case.jpg',
    'Laptops': '/images/products/laptop-used.jpg',
    'Bed frames': '/images/products/bed-frame-single.jpg',
    'Sofas': '/images/products/sofa-3-seater.jpg',
    'Dining tables': '/images/products/dining-table-6.jpg',
    'Bedding': '/images/products/bedding-single.jpg',
    'Kitchen': '/images/products/kitchen-pots-set.jpg',
    'Appliances': '/images/products/blender.jpg',
    'Perfumes': '/images/products/perfume-50ml.jpg',
    'Cosmetics': '/images/products/cosmetic-set.jpg',
    'Hair accessories': '/images/products/hair-accessories.jpg',
    'Blouses': '/images/products/ladies-blouse.jpg',
    'Jeans': '/images/products/men-jeans.jpg',
    'Jackets': '/images/products/thrift-denim-jacket.jpg',
    'Shirts': '/images/products/thrift-shirt.jpg',
    'Heels and flats': '/images/products/women-heels.jpg',
    'Handbags': '/images/products/handbag.jpg',
    'Scarves': '/images/products/scarf.jpg',
    'Jewelry': '/images/products/necklace.jpg',
    'Belts': '/images/products/men-belt.jpg',
    'Suits': '/images/products/men-suit.jpg',
    'Dresses': '/images/products/gomesi.jpg',
    'Décor': '/images/products/wooden-carving.jpg',
    'Salon Services': '/images/products/salon-braiding.jpg',
    'Barber Services': '/images/products/barber-haircut.jpg',
    'Tailor Services': '/images/products/tailor-alteration.jpg',
    'Mechanic Services': '/images/products/mechanic-service.jpg',
    'Phone Repair': '/images/products/phone-screen-repair.jpg',
    'IT Services': '/images/products/it-computer-repair.jpg',
    'Delivery Services': '/images/products/boda-delivery.jpg',
    'Cleaning Services': '/images/products/house-cleaning.jpg',
    'Photography': '/images/products/passport-photos.jpg',
    'Tutoring and Coaching': '/images/products/math-tutoring.jpg',
    'Bulk clothing': '/images/products/bulk-office-pants-wholesale.jpg',
    'Bulk home goods': '/images/products/crockery-set-12.jpg'
  },
  byCategory: {
    'Electronics': '/images/products/cat-electronics.jpg',
    'Fashion for Men': '/images/products/cat-fashion-for-men.jpg',
    'Fashion for Women': '/images/products/ladies-blouse.jpg',
    'Fashion for Children': '/images/products/cat-fashion-for-children.jpg',
    'Home and Furniture': '/images/products/sofa-3-seater.jpg',
    'Beauty and Fragrance': '/images/products/cat-beauty-and-fragrance.jpg',
    'Thrift': '/images/products/thrift-shirt.jpg',
    'Wholesale for Business': '/images/products/cat-wholesale-for-business.jpg',
    'Services': '/images/products/cat-services.jpg'
  },
  byArcade: {
    'Mukwano Arcade': '/images/markets/mukwano-arcade.jpg',
    'Kikuubo': '/images/markets/kikuubo.jpg',
    'Owino': '/images/markets/owino.jpg',
    'New Pioneer Mall': '/images/markets/new-pioneer-mall.jpg',
    'China Town': '/images/markets/china-town.jpg',
    'Crafts Market': '/images/markets/crafts-market.jpg',
    'Nsambya': '/images/markets/nsambya.jpg',
    'Gazaland Arcade': '/images/markets/gazaland-arcade.jpg',
    'Galiraya': '/images/markets/galiraya.jpg',
    'Majestic Plaza': '/images/markets/majestic-plaza.jpg',
    'Energy Centre': '/images/markets/energy-centre.jpg',
    'Magoba': '/images/markets/magoba.jpg',
    'Avema': '/images/markets/avema.jpg',
    'Kampala': '/images/markets/kampala.jpg',
    'Other': '/images/markets/other.jpg'
  },
  hero: '/images/markets/hero.jpg'
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
  const safeFallback = String(fallback).replace(/'/g, '%27');
  return '<div class="deal-img-wrap' + (realPhoto ? '' : ' is-placeholder') + '">' +
    '<img src="' + src + '" alt="' + (alt + (priceText ? ' — ' + priceText : '')).replace(/"/g, '&quot;') +
    '" class="' + (className || 'deal-card-photo') + '" loading="lazy" decoding="async" width="600" height="400" ' +
    'onerror="this.onerror=null;this.src=\'' + safeFallback + '\'">' +
    badge + '</div>';
}

function arcadeImageTag(arcade, className) {
  const src = getArcadeImage(arcade);
  const fb = WPIMAGES.hero;
  return '<img src="' + src + '" alt="' + ((arcade || 'Kampala') + ' market location').replace(/"/g, '&quot;') + '" class="' + (className || 'deal-location-photo') + '" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'' + fb + '\'">';
}

/* Pre-assign curated local image URLs onto deals for feed/cards */
if (typeof WPDATA !== 'undefined' && WPDATA.deals) {
  WPDATA.deals.forEach(function (d) {
    if (!d.image) d.image = getDealImage(d);
  });
}
