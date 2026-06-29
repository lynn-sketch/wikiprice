/* WikiPrice Data — 50 deals, sellers, categories, baselines */
const WPDATA = {
  categories: {
    'Electronics': ['Smartphones', 'Tablets', 'Laptops', 'Televisions', 'Audio', 'Accessories', 'Smartwatches', 'Gaming', 'Cameras'],
    'Fashion for Men': ['Sneakers', 'Office shoes', 'Jeans', 'Shirts', 'Suits', 'Belts', 'Wristwatches'],
    'Fashion for Women': ['Office pants', 'Blouses', 'Dresses', 'Heels and flats', 'Handbags', 'Scarves', 'Jewelry', 'Makeup'],
    'Fashion for Children': ['School shoes', 'Uniforms', 'Casual wear', 'Toys'],
    'Home and Furniture': ['Bed frames', 'Sofas', 'Dining tables', 'Bedding', 'Kitchen', 'Appliances', 'Décor'],
    'Beauty and Fragrance': ['Perfumes', 'Cosmetics', 'Hair accessories', 'Skincare'],
    'Thrift': ['Jackets', 'Jeans', 'Shirts', 'Dresses', 'Shoes', 'Accessories'],
    'Wholesale for Business': ['Bulk clothing', 'Bulk electronics', 'Bulk home goods', 'Restaurant supplies']
  },
  locations: ['Mukwano Arcade', 'New Pioneer Mall', 'Kikuubo', 'Owino', 'Nsambya', 'China Town', 'Galiraya', 'Majestic Plaza', 'Energy Centre', 'Magoba', 'Crafts Market', 'Avema', 'Gazaland Arcade', 'Other'],
  baselines: [
    { category: 'Electronics', subCategory: 'Televisions', min: 450000, max: 500000 },
    { category: 'Electronics', subCategory: 'Audio', min: 25000, max: 35000 },
    { category: 'Electronics', subCategory: 'Smartphones', min: 350000, max: 400000 },
    { category: 'Electronics', subCategory: 'Smartwatches', min: 80000, max: 100000 },
    { category: 'Electronics', subCategory: 'Accessories', min: 15000, max: 50000 },
    { category: 'Fashion for Women', subCategory: 'Office pants', min: 30000, max: 40000 },
    { category: 'Fashion for Women', subCategory: 'Blouses', min: 25000, max: 35000 },
    { category: 'Fashion for Men', subCategory: 'Sneakers', min: 45000, max: 60000 },
    { category: 'Fashion for Men', subCategory: 'Office shoes', min: 55000, max: 70000 },
    { category: 'Fashion for Children', subCategory: 'School shoes', min: 40000, max: 50000 },
    { category: 'Home and Furniture', subCategory: 'Bed frames', min: 350000, max: 500000 },
    { category: 'Home and Furniture', subCategory: 'Sofas', min: 650000, max: 900000 },
    { category: 'Home and Furniture', subCategory: 'Bedding', min: 50000, max: 80000 },
    { category: 'Beauty and Fragrance', subCategory: 'Perfumes', min: 35000, max: 50000 },
    { category: 'Thrift', subCategory: 'Jackets', min: 15000, max: 30000 }
  ],
  sellers: {
    'fashion-wholesalers': {
      id: 'fashion-wholesalers', name: 'Fashion Wholesalers Ltd', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256701234001', whatsapp: '256701234001', email: 'fashionwholesale@email.com',
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 24,
      scamReports: 0, avgRating: 4.2, responseTimeHours: 4, platformMonths: 18,
      verificationHistory: 85, bioVerified: false, memberSince: '2024-03-01',
      bestTimeToContact: '9am - 6pm weekdays', bioExtracts: [],
      locations: [{ source: 'WikiPrice verification', text: 'Kikuubo, Building C, 2nd Floor, Stall 15' }]
    },
    'salongo-shoes': {
      id: 'salongo-shoes', name: 'Salongo House of Shoes', tiktokHandle: 'salongohouseofshoes_1', tiktokFollowers: 73000,
      phone: '256702345002', whatsapp: '256702345002', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 18,
      scamReports: 0, avgRating: 4.8, responseTimeHours: 2, platformMonths: 14,
      verificationHistory: 95, bioVerified: true, memberSince: '2024-01-15',
      bestTimeToContact: '10am - 5pm weekdays',
      bioExtracts: [
        { source: 'From bio', text: 'Mukwano Arcade, Ben Kiwanuka Street, opposite Gazaland' },
        { source: 'From bio', text: 'WhatsApp: 0702345002' },
        { source: 'From comment reply', text: 'Ground floor near escalator, Stall 22' }
      ],
      locations: [{ source: 'From bio', text: 'Mukwano Arcade, Ben Kiwanuka Street' }, { source: 'From comment reply', text: 'Ground Floor, Stall 22, opposite escalator' }]
    },
    'tv-house': {
      id: 'tv-house', name: 'TV House', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256703456003', whatsapp: '256703456003', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 36,
      scamReports: 0, avgRating: 4.0, responseTimeHours: 6, platformMonths: 20,
      verificationHistory: 80, bioVerified: false, memberSince: '2023-06-01',
      bestTimeToContact: '9am - 7pm daily', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Kikuubo, Building B, Shop 8' }]
    },
    'mummy-gadgets': {
      id: 'mummy-gadgets', name: 'Mummy Gadgets', tiktokHandle: 'mummyarleena', tiktokFollowers: 45000,
      phone: '256704567004', whatsapp: '256704567004', email: 'mummygadgets@email.com',
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 14,
      scamReports: 0, avgRating: 4.5, responseTimeHours: 1, platformMonths: 12,
      verificationHistory: 90, bioVerified: true, memberSince: '2024-02-01',
      bestTimeToContact: '10am - 6pm weekdays',
      bioExtracts: [
        { source: 'From bio', text: 'New Pioneer Mall, Kampala Road' },
        { source: 'From video caption', text: 'Kids tablets, smartwatches, UK-used phones' },
        { source: 'From OCR on video', text: 'Shop 12, 1st Floor' }
      ],
      locations: [{ source: 'From bio', text: 'New Pioneer Mall, Kampala Road, between Burton and Wilson Road' }]
    },
    'nsambya-furniture': {
      id: 'nsambya-furniture', name: 'Nsambya Furniture Workshop', tiktokHandle: 'nsambyafurnitureworkshop', tiktokFollowers: 28000,
      phone: '256705678005', whatsapp: '256705678005', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 20,
      scamReports: 0, avgRating: 4.9, responseTimeHours: 3, platformMonths: 16,
      verificationHistory: 98, bioVerified: true, memberSince: '2023-11-01',
      bestTimeToContact: '8am - 5pm weekdays',
      bioExtracts: [
        { source: 'From bio', text: 'Nsambya, near Nsambya Shopping Centre' },
        { source: 'From video caption', text: 'Custom beds, sofas, dining sets — DM for quote' },
        { source: 'From comment reply', text: 'Workshop behind Nsambya Hospital, blue gate' }
      ],
      locations: [{ source: 'From bio', text: 'Nsambya, near Nsambya Shopping Centre' }]
    },
    'mirembe-beddings': {
      id: 'mirembe-beddings', name: 'Mirembe Beddings', tiktokHandle: 'mirembebeddings', tiktokFollowers: 15000,
      phone: '256706789006', whatsapp: '256706789006', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 12,
      scamReports: 0, avgRating: 4.6, responseTimeHours: 2, platformMonths: 10,
      verificationHistory: 88, bioVerified: true, memberSince: '2024-04-01',
      bestTimeToContact: '9am - 5pm', bioExtracts: [{ source: 'From bio', text: 'Kampala — DM for exact location' }],
      locations: [{ source: 'From bio', text: 'Kampala (DM for exact location)' }]
    },
    'daniel-perfumes': {
      id: 'daniel-perfumes', name: 'Daniel Perfumes', tiktokHandle: 'danielperfumes', tiktokFollowers: 22000,
      phone: '256707890007', whatsapp: '256707890007', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 16,
      scamReports: 0, avgRating: 4.4, responseTimeHours: 1, platformMonths: 12,
      verificationHistory: 85, bioVerified: true, memberSince: '2024-01-20',
      bestTimeToContact: '11am - 7pm',
      bioExtracts: [{ source: 'From bio', text: 'Kampala — DM for location' }, { source: 'From comment reply', text: 'Ntinda, near Capital Shoppers' }],
      locations: [{ source: 'From comment reply', text: 'Ntinda, near Capital Shoppers' }]
    },
    'techdeals-ug': {
      id: 'techdeals-ug', name: 'TechDeals UG', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256708901008', whatsapp: '256708901008', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 30,
      scamReports: 0, avgRating: 4.1, responseTimeHours: 5, platformMonths: 18,
      verificationHistory: 82, bioVerified: false, memberSince: '2023-08-01',
      bestTimeToContact: '9am - 6pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Kikuubo, Building A, 2nd Floor' }]
    },
    'gadget-hub': {
      id: 'gadget-hub', name: 'Gadget Hub', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256709012009', whatsapp: '256709012009', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 24,
      scamReports: 0, avgRating: 4.0, responseTimeHours: 4, platformMonths: 15,
      verificationHistory: 78, bioVerified: false, memberSince: '2024-01-01',
      bestTimeToContact: '10am - 6pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Majestic Plaza, William Street' }]
    },
    'fashion-corner': {
      id: 'fashion-corner', name: 'Fashion Corner', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256710123010', whatsapp: '256710123010', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 28,
      scamReports: 0, avgRating: 4.0, responseTimeHours: 6, platformMonths: 16,
      verificationHistory: 75, bioVerified: false, memberSince: '2023-09-01',
      bestTimeToContact: '9am - 6pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Gazaland Arcade, ground floor' }]
    },
    'denim-hub': {
      id: 'denim-hub', name: 'Denim Hub', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256711234011', whatsapp: '256711234011', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 22,
      scamReports: 0, avgRating: 4.2, responseTimeHours: 5, platformMonths: 14,
      verificationHistory: 76, bioVerified: false, memberSince: '2024-02-15',
      bestTimeToContact: '9am - 6pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Gazaland Arcade, 1st floor' }]
    },
    'sharon-stall': {
      id: 'sharon-stall', name: "Sharon's Stall", tiktokHandle: null, tiktokFollowers: 0,
      phone: '256712345012', whatsapp: '256712345012', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 40,
      scamReports: 0, avgRating: 4.3, responseTimeHours: 8, platformMonths: 20,
      verificationHistory: 70, bioVerified: false, memberSince: '2023-05-01',
      bestTimeToContact: '8am - 5pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Owino Market, Mississippi section' }]
    },
    'home-appliances': {
      id: 'home-appliances', name: 'Home Appliances', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256713456013', whatsapp: '256713456013', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 35,
      scamReports: 0, avgRating: 4.1, responseTimeHours: 6, platformMonths: 18,
      verificationHistory: 80, bioVerified: false, memberSince: '2023-07-01',
      bestTimeToContact: '9am - 6pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Energy Centre, Market Street' }]
    },
    'china-town': {
      id: 'china-town', name: 'China Town Super Stores', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256714567014', whatsapp: '256714567014', email: 'chinatown@email.com',
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 8,
      scamReports: 0, avgRating: 4.5, responseTimeHours: 2, platformMonths: 6,
      verificationHistory: 92, bioVerified: false, memberSince: '2025-10-01',
      bestTimeToContact: '9am - 8pm daily', bioExtracts: [{ source: 'From video caption', text: 'Lugogo, former Shoprite building' }],
      locations: [{ source: 'WikiPrice verification', text: 'China Town, Lugogo (former Shoprite)' }]
    },
    'electronics-plaza': {
      id: 'electronics-plaza', name: 'Electronics Plaza', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256715678015', whatsapp: '256715678015', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 32,
      scamReports: 0, avgRating: 4.0, responseTimeHours: 5, platformMonths: 17,
      verificationHistory: 78, bioVerified: false, memberSince: '2023-08-15',
      bestTimeToContact: '9am - 6pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Kikuubo, Building A, Ground Floor' }]
    },
    'beauty-world': {
      id: 'beauty-world', name: 'Beauty World', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256716789016', whatsapp: '256716789016', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 20,
      scamReports: 0, avgRating: 3.8, responseTimeHours: 8, platformMonths: 12,
      verificationHistory: 65, bioVerified: false, memberSince: '2024-03-15',
      bestTimeToContact: '10am - 6pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Galiraya Arcade, William Street' }]
    },
    'jewelry-stall': {
      id: 'jewelry-stall', name: 'Jewelry Stall', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256717890017', whatsapp: '256717890017', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 45,
      scamReports: 0, avgRating: 4.2, responseTimeHours: 6, platformMonths: 22,
      verificationHistory: 72, bioVerified: false, memberSince: '2023-04-01',
      bestTimeToContact: '9am - 5pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Galiraya Arcade' }]
    },
    'card-shop': {
      id: 'card-shop', name: 'Card Shop', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256718901018', whatsapp: '256718901018', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 30,
      scamReports: 0, avgRating: 4.0, responseTimeHours: 8, platformMonths: 15,
      verificationHistory: 70, bioVerified: false, memberSince: '2024-01-10',
      bestTimeToContact: '10am - 5pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Avema Shopping Center, Kiyembe Lane' }]
    },
    'artisan-stalls': {
      id: 'artisan-stalls', name: 'Artisan Stalls', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256719012019', whatsapp: '256719012019', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 50,
      scamReports: 0, avgRating: 4.5, responseTimeHours: 12, platformMonths: 24,
      verificationHistory: 75, bioVerified: false, memberSince: '2022-12-01',
      bestTimeToContact: '9am - 5pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Crafts Market, next to National Theatre' }]
    },
    'noddiz': {
      id: 'noddiz', name: 'Noddiz Accessories', tiktokHandle: 'noddiz', tiktokFollowers: 12000,
      phone: '256720123020', whatsapp: '256720123020', email: 'noddiz@email.com',
      sellerType: 'both', physicalShop: false, shopShownInVideos: true, accountAgeMonths: 10,
      scamReports: 0, avgRating: 4.3, responseTimeHours: 2, platformMonths: 8,
      verificationHistory: 70, bioVerified: true, memberSince: '2024-06-01',
      bestTimeToContact: '10am - 6pm', bioExtracts: [{ source: 'From bio', text: 'Available on Jumia and social media' }],
      locations: [{ source: 'From bio', text: 'Online — Jumia and social media' }]
    },
    'magoba-suits': {
      id: 'magoba-suits', name: 'Magoba Tailors', tiktokHandle: null, tiktokFollowers: 0,
      phone: '256721234021', whatsapp: '256721234021', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: false, accountAgeMonths: 38,
      scamReports: 0, avgRating: 4.4, responseTimeHours: 6, platformMonths: 20,
      verificationHistory: 82, bioVerified: false, memberSince: '2023-06-15',
      bestTimeToContact: '9am - 6pm', bioExtracts: [], locations: [{ source: 'WikiPrice verification', text: 'Magoba Shopping Centre, Nakivubo Mews' }]
    },
    'suspect-seller': {
      id: 'suspect-seller', name: 'Quick Deals UG', tiktokHandle: 'quickdealsug', tiktokFollowers: 45,
      phone: '256799999999', whatsapp: '256799999999', email: null,
      sellerType: 'retail', physicalShop: false, shopShownInVideos: false, accountAgeMonths: 0.5,
      scamReports: 0, avgRating: 2.0, responseTimeHours: 48, platformMonths: 0.5,
      verificationHistory: 10, bioVerified: false, memberSince: '2026-05-01',
      bestTimeToContact: 'Unknown', bioExtracts: [{ source: 'From bio', text: '0709999999 — Nationwide delivery' }],
      locations: [{ source: 'From bio', text: 'Kampala — nationwide delivery only' }]
    }
  },
  deals: []
};

// Helper to create deal with defaults
function mkDeal(o) {
  const seller = WPDATA.sellers[o.sellerId];
  const hist = o.priceHistory || [
    { date: '2026-06-01', price: o.retailPrice },
    { date: '2026-05-15', price: o.retailPrice + 5000 },
    { date: '2026-04-01', price: o.retailPrice + 10000 },
    { date: '2026-03-01', price: o.retailPrice + 5000 },
    { date: '2026-02-01', price: o.retailPrice + 15000 }
  ];
  return {
    id: o.id,
    name: o.name,
    category: o.category,
    subCategory: o.subCategory,
    retailPrice: o.retailPrice,
    wholesalePrice: o.wholesalePrice || o.retailPrice,
    minQuantity: o.minQuantity || 1,
    priceType: o.priceType || 'both',
    location: o.location,
    sellerId: o.sellerId,
    tiktokHandle: o.tiktokHandle || seller?.tiktokHandle,
    tiktokVideoUrl: o.tiktokVideoUrl || null,
    tiktokFollowers: seller?.tiktokFollowers || 0,
    verificationStatus: o.verificationStatus || 'verified',
    stockStatus: o.stockStatus || 'in-stock',
    lastVerified: o.lastVerified || '2026-06-14',
    verificationMethod: o.verificationMethod || 'physical',
    priceConfidence: o.priceConfidence || 'high',
    mallPrice: o.mallPrice || Math.round(o.retailPrice * 2),
    mentionedOnTiktok: o.mentionedOnTiktok || false,
    crowdConfirmations: o.crowdConfirmations || Math.floor(Math.random() * 8) + 3,
    priceHistory: hist,
    verificationHistory: o.verificationHistory || [
      { who: 'WikiPrice team', date: '2026-06-14', method: 'Physical visit' },
      { who: 'Community', date: '2026-06-10', method: '3 user confirmations' }
    ],
    reviews: o.reviews || [
      { name: 'Grace N.', date: '2026-05-20', stars: 5, comment: 'Exactly as described. Will return.' },
      { name: 'Peter O.', date: '2026-05-12', stars: 4, comment: 'Good price, friendly seller.' },
      { name: 'Amina K.', date: '2026-04-28', stars: 5, comment: 'Found it easily using the location details.' }
    ],
    image: o.image || null,
    description: o.description || ''
  };
}

WPDATA.deals = [
  mkDeal({ id: 'ladies-office-pants', name: 'Ladies Office Pants', category: 'Fashion for Women', subCategory: 'Office pants', retailPrice: 35000, wholesalePrice: 30000, minQuantity: 12, priceType: 'both', mallPrice: 80000, sellerId: 'fashion-wholesalers', location: { arcade: 'Kikuubo', building: 'Building C', floor: '2nd Floor', stall: 'Stall 15', landmark: 'Near main staircase', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'From Old Taxi Park, walk 5 minutes towards Kikuubo. Building C is on the right.' } }),
  mkDeal({ id: 'mens-sneakers', name: "Men's Sneakers", category: 'Fashion for Men', subCategory: 'Sneakers', retailPrice: 45000, wholesalePrice: 38000, minQuantity: 6, priceType: 'both', mallPrice: 120000, sellerId: 'salongo-shoes', mentionedOnTiktok: true, location: { arcade: 'Mukwano Arcade', building: 'Mukwano Mall', floor: 'Ground Floor', stall: 'Stall 22', landmark: 'Opposite Gazaland, near Old Taxi Park', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Mukwano+Arcade+Kampala', directions: 'Enter Mukwano from Ben Kiwanuka Street. Ground floor near escalator.' } }),
  mkDeal({ id: 'tv-32', name: '32-inch Television', category: 'Electronics', subCategory: 'Televisions', retailPrice: 450000, wholesalePrice: 420000, minQuantity: 5, priceType: 'both', mallPrice: 800000, sellerId: 'tv-house', location: { arcade: 'Kikuubo', building: 'Building B', floor: 'Ground Floor', stall: 'Shop 8', landmark: 'Near Building B entrance', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building B, ground floor, first shop on the left.' } }),
  mkDeal({ id: 'tv-43', name: '43-inch Television', category: 'Electronics', subCategory: 'Televisions', retailPrice: 650000, wholesalePrice: 600000, minQuantity: 5, priceType: 'both', mallPrice: 950000, sellerId: 'tv-house', location: { arcade: 'Kikuubo', building: 'Building B', floor: 'Ground Floor', stall: 'Shop 8', landmark: 'Near Building B entrance', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Same shop as 32-inch TVs.' } }),
  mkDeal({ id: 'kids-smartwatch', name: "Kids' Smartwatch", category: 'Electronics', subCategory: 'Smartwatches', retailPrice: 80000, wholesalePrice: 70000, minQuantity: 10, priceType: 'both', mallPrice: 150000, sellerId: 'mummy-gadgets', mentionedOnTiktok: true, location: { arcade: 'New Pioneer Mall', building: 'Pioneer Mall', floor: '1st Floor', stall: 'Shop 12', landmark: 'Between Burton Street and Wilson Road', street: 'Kampala Road', mapsUrl: 'https://maps.google.com/?q=New+Pioneer+Mall+Kampala', directions: 'Enter Pioneer Mall, take stairs to 1st floor.' } }),
  mkDeal({ id: 'bed-frame-single', name: 'Custom Bed Frame (Single)', category: 'Home and Furniture', subCategory: 'Bed frames', retailPrice: 350000, wholesalePrice: 300000, minQuantity: 3, priceType: 'both', mallPrice: 800000, sellerId: 'nsambya-furniture', mentionedOnTiktok: true, location: { arcade: 'Nsambya', building: 'Workshop', floor: 'Ground', stall: 'Blue gate workshop', landmark: 'Near Nsambya Shopping Centre', street: 'Nsambya Road', mapsUrl: 'https://maps.google.com/?q=Nsambya+Kampala', directions: 'Behind Nsambya Hospital, look for blue gate.' } }),
  mkDeal({ id: 'bed-frame-double', name: 'Custom Bed Frame (Double)', category: 'Home and Furniture', subCategory: 'Bed frames', retailPrice: 500000, wholesalePrice: 450000, minQuantity: 3, priceType: 'both', mallPrice: 1000000, sellerId: 'nsambya-furniture', mentionedOnTiktok: true, location: { arcade: 'Nsambya', building: 'Workshop', floor: 'Ground', stall: 'Blue gate workshop', landmark: 'Near Nsambya Shopping Centre', street: 'Nsambya Road', mapsUrl: 'https://maps.google.com/?q=Nsambya+Kampala', directions: 'Same workshop as single bed frames.' } }),
  mkDeal({ id: 'sofa-3-seater', name: 'Sofa Set (3-Seater)', category: 'Home and Furniture', subCategory: 'Sofas', retailPrice: 650000, wholesalePrice: 600000, minQuantity: 2, priceType: 'wholesale', mallPrice: 1200000, sellerId: 'nsambya-furniture', mentionedOnTiktok: true, location: { arcade: 'Nsambya', building: 'Workshop', floor: 'Ground', stall: 'Blue gate workshop', landmark: 'Near Nsambya Shopping Centre', street: 'Nsambya Road', mapsUrl: 'https://maps.google.com/?q=Nsambya+Kampala', directions: 'Workshop behind Nsambya Hospital.' } }),
  mkDeal({ id: 'dining-table-6', name: 'Dining Table (6-Seater)', category: 'Home and Furniture', subCategory: 'Dining tables', retailPrice: 450000, wholesalePrice: 400000, minQuantity: 3, priceType: 'both', mallPrice: 900000, sellerId: 'nsambya-furniture', location: { arcade: 'Nsambya', building: 'Workshop', floor: 'Ground', stall: 'Blue gate workshop', landmark: 'Near Nsambya Shopping Centre', street: 'Nsambya Road', mapsUrl: 'https://maps.google.com/?q=Nsambya+Kampala', directions: 'Same Nsambya workshop.' } }),
  mkDeal({ id: 'bedding-single', name: 'Bedding Set (Single)', category: 'Home and Furniture', subCategory: 'Bedding', retailPrice: 50000, wholesalePrice: 40000, minQuantity: 10, priceType: 'both', mallPrice: 120000, sellerId: 'mirembe-beddings', mentionedOnTiktok: true, location: { arcade: 'Kampala', building: 'DM for location', floor: '', stall: '', landmark: 'DM seller on WhatsApp', street: '', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'Contact seller for exact location.' } }),
  mkDeal({ id: 'bedding-double', name: 'Bedding Set (Double)', category: 'Home and Furniture', subCategory: 'Bedding', retailPrice: 75000, wholesalePrice: 60000, minQuantity: 10, priceType: 'both', mallPrice: 150000, sellerId: 'mirembe-beddings', mentionedOnTiktok: true, location: { arcade: 'Kampala', building: 'DM for location', floor: '', stall: '', landmark: 'DM seller on WhatsApp', street: '', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'Contact seller for exact location.' } }),
  mkDeal({ id: 'perfume-50ml', name: 'Inspired Perfume (50ml)', category: 'Beauty and Fragrance', subCategory: 'Perfumes', retailPrice: 35000, wholesalePrice: 28000, minQuantity: 12, priceType: 'both', mallPrice: 80000, sellerId: 'daniel-perfumes', mentionedOnTiktok: true, location: { arcade: 'Kampala', building: 'Ntinda', floor: 'Ground', stall: 'Near Capital Shoppers', landmark: 'Near Capital Shoppers, Ntinda', street: 'Ntinda Road', mapsUrl: 'https://maps.google.com/?q=Ntinda+Kampala', directions: 'Near Capital Shoppers in Ntinda.' } }),
  mkDeal({ id: 'wireless-earbuds', name: 'Wireless Earbuds', category: 'Electronics', subCategory: 'Audio', retailPrice: 25000, wholesalePrice: 20000, minQuantity: 10, priceType: 'both', mallPrice: 60000, sellerId: 'techdeals-ug', location: { arcade: 'Kikuubo', building: 'Building A', floor: '2nd Floor', stall: 'Stall 5', landmark: 'Near staircase', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building A, 2nd floor.' } }),
  mkDeal({ id: 'bluetooth-speaker', name: 'Bluetooth Speaker', category: 'Electronics', subCategory: 'Audio', retailPrice: 35000, wholesalePrice: 30000, minQuantity: 10, priceType: 'both', mallPrice: 70000, sellerId: 'techdeals-ug', location: { arcade: 'Kikuubo', building: 'Building A', floor: '2nd Floor', stall: 'Stall 5', landmark: 'Near staircase', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building A, 2nd floor.' } }),
  mkDeal({ id: 'power-bank-10000', name: 'Power Bank 10,000mAh', category: 'Electronics', subCategory: 'Accessories', retailPrice: 45000, wholesalePrice: 38000, minQuantity: 10, priceType: 'both', mallPrice: 80000, sellerId: 'gadget-hub', location: { arcade: 'Majestic Plaza', building: 'Majestic Plaza', floor: '2nd Floor', stall: 'Shop 18', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Majestic+Plaza+Kampala', directions: 'William Street, 2nd floor tech section.' } }),
  mkDeal({ id: 'iphone-11-used', name: 'UK-Used iPhone 11', category: 'Electronics', subCategory: 'Smartphones', retailPrice: 350000, wholesalePrice: 330000, minQuantity: 5, priceType: 'both', mallPrice: 500000, sellerId: 'mummy-gadgets', verificationStatus: 'check-required', priceConfidence: 'medium', mentionedOnTiktok: true, location: { arcade: 'New Pioneer Mall', building: 'Pioneer Mall', floor: '1st Floor', stall: 'Shop 12', landmark: 'Kampala Road', street: 'Kampala Road', mapsUrl: 'https://maps.google.com/?q=New+Pioneer+Mall+Kampala', directions: 'Pioneer Mall, 1st floor.' } }),
  mkDeal({ id: 'ring-light-10', name: 'Ring Light 10-inch', category: 'Electronics', subCategory: 'Accessories', retailPrice: 45000, wholesalePrice: 40000, minQuantity: 10, priceType: 'both', mallPrice: 100000, sellerId: 'mummy-gadgets', mentionedOnTiktok: true, location: { arcade: 'New Pioneer Mall', building: 'Pioneer Mall', floor: '1st Floor', stall: 'Shop 12', landmark: 'Kampala Road', street: 'Kampala Road', mapsUrl: 'https://maps.google.com/?q=New+Pioneer+Mall+Kampala', directions: 'Pioneer Mall, 1st floor.' } }),
  mkDeal({ id: 'men-office-shoes', name: "Men's Office Shoes", category: 'Fashion for Men', subCategory: 'Office shoes', retailPrice: 55000, wholesalePrice: 48000, minQuantity: 6, priceType: 'both', mallPrice: 90000, sellerId: 'salongo-shoes', mentionedOnTiktok: true, location: { arcade: 'Mukwano Arcade', building: 'Mukwano Mall', floor: 'Ground Floor', stall: 'Stall 22', landmark: 'Opposite Gazaland', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Mukwano+Arcade+Kampala', directions: 'Ground floor near escalator.' } }),
  mkDeal({ id: 'children-school-shoes', name: "Children's School Shoes", category: 'Fashion for Children', subCategory: 'School shoes', retailPrice: 40000, wholesalePrice: 35000, minQuantity: 12, priceType: 'both', mallPrice: 80000, sellerId: 'salongo-shoes', mentionedOnTiktok: true, location: { arcade: 'Mukwano Arcade', building: 'Mukwano Mall', floor: 'Ground Floor', stall: 'Stall 22', landmark: 'Opposite Gazaland', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Mukwano+Arcade+Kampala', directions: 'Ground floor near escalator.' } }),
  mkDeal({ id: 'ladies-blouse', name: "Ladies Blouse", category: 'Fashion for Women', subCategory: 'Blouses', retailPrice: 25000, wholesalePrice: 20000, minQuantity: 20, priceType: 'both', mallPrice: 50000, sellerId: 'fashion-corner', location: { arcade: 'Gazaland Arcade', building: 'Gazaland', floor: 'Ground Floor', stall: 'Stall 8', landmark: 'Opposite Old Taxi Park', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Gazaland+Arcade+Kampala', directions: 'Ground floor, near entrance.' } }),
  mkDeal({ id: 'men-jeans', name: "Men's Jeans", category: 'Fashion for Men', subCategory: 'Jeans', retailPrice: 35000, wholesalePrice: 28000, minQuantity: 10, priceType: 'both', mallPrice: 70000, sellerId: 'denim-hub', location: { arcade: 'Gazaland Arcade', building: 'Gazaland', floor: '1st Floor', stall: 'Stall 14', landmark: 'Opposite Old Taxi Park', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Gazaland+Arcade+Kampala', directions: '1st floor denim section.' } }),
  mkDeal({ id: 'thrift-denim-jacket', name: 'Thrift Denim Jacket', category: 'Thrift', subCategory: 'Jackets', retailPrice: 15000, wholesalePrice: 10000, minQuantity: 20, priceType: 'both', mallPrice: 50000, sellerId: 'sharon-stall', location: { arcade: 'Owino', building: 'Mississippi Section', floor: 'Ground', stall: "Sharon's stall", landmark: 'Mississippi section for jackets', street: 'Owino Market', mapsUrl: 'https://maps.google.com/?q=Owino+Market+Kampala', directions: 'Ask for Sharon in Mississippi section.' } }),
  mkDeal({ id: 'electric-kettle', name: 'Electric Kettle', category: 'Home and Furniture', subCategory: 'Kitchen', retailPrice: 45000, wholesalePrice: 40000, minQuantity: 12, priceType: 'both', mallPrice: 90000, sellerId: 'home-appliances', location: { arcade: 'Energy Centre', building: 'Energy Centre', floor: 'Ground Floor', stall: 'Shop 3', landmark: 'Market Street', street: 'Market Street', mapsUrl: 'https://maps.google.com/?q=Energy+Centre+Kampala', directions: 'Ground floor, appliance section.' } }),
  mkDeal({ id: 'air-compressor', name: 'Air Compressor', category: 'Home and Furniture', subCategory: 'Appliances', retailPrice: 2900000, wholesalePrice: 2700000, minQuantity: 2, priceType: 'both', mallPrice: 5000000, sellerId: 'china-town', mentionedOnTiktok: true, location: { arcade: 'China Town', building: 'Former Shoprite', floor: 'Ground Floor', stall: 'Electronics section', landmark: 'Lugogo', street: 'Lugogo Bypass', mapsUrl: 'https://maps.google.com/?q=China+Town+Lugogo+Kampala', directions: 'Lugogo, former Shoprite building.' } }),
  mkDeal({ id: 'blender', name: 'Blender', category: 'Home and Furniture', subCategory: 'Kitchen', retailPrice: 70000, wholesalePrice: 60000, minQuantity: 6, priceType: 'both', mallPrice: 150000, sellerId: 'electronics-plaza', location: { arcade: 'Kikuubo', building: 'Building A', floor: 'Ground Floor', stall: 'Shop 2', landmark: 'Building A entrance', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building A, ground floor.' } }),
  mkDeal({ id: 'cosmetic-set', name: 'Cosmetic Set (Foundation & Lipstick)', category: 'Beauty and Fragrance', subCategory: 'Cosmetics', retailPrice: 40000, wholesalePrice: 35000, minQuantity: 6, priceType: 'both', mallPrice: 75000, sellerId: 'beauty-world', verificationStatus: 'check-required', priceConfidence: 'medium', location: { arcade: 'Galiraya', building: 'Galiraya Arcade', floor: 'Ground Floor', stall: 'Stall 6', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Galiraya+Arcade+Kampala', directions: 'Ground floor cosmetics section.' } }),
  mkDeal({ id: 'earrings-pair', name: 'Earrings (Pair)', category: 'Fashion for Women', subCategory: 'Jewelry', retailPrice: 8000, wholesalePrice: 5000, minQuantity: 24, priceType: 'both', mallPrice: 20000, sellerId: 'jewelry-stall', location: { arcade: 'Galiraya', building: 'Galiraya Arcade', floor: 'Ground Floor', stall: 'Stall 3', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Galiraya+Arcade+Kampala', directions: 'Ground floor jewelry section.' } }),
  mkDeal({ id: 'greeting-cards', name: 'Greeting Cards (Pack of 5)', category: 'Home and Furniture', subCategory: 'Décor', retailPrice: 10000, wholesalePrice: 8000, minQuantity: 30, priceType: 'both', mallPrice: 25000, sellerId: 'card-shop', location: { arcade: 'Avema', building: 'Avema Shopping Center', floor: 'Ground Floor', stall: 'Shop 4', landmark: 'Kiyembe Lane', street: 'Kiyembe Lane', mapsUrl: 'https://maps.google.com/?q=Avema+Shopping+Center+Kampala', directions: 'Kiyembe Lane, ground floor.' } }),
  mkDeal({ id: 'crafts-basket', name: 'Local Crafts Basket', category: 'Home and Furniture', subCategory: 'Décor', retailPrice: 25000, wholesalePrice: 20000, minQuantity: 10, priceType: 'both', mallPrice: 50000, sellerId: 'artisan-stalls', location: { arcade: 'Crafts Market', building: 'National Theatre', floor: 'Ground', stall: 'Various artisan stalls', landmark: 'Next to National Theatre', street: 'De Winton Road', mapsUrl: 'https://maps.google.com/?q=Crafts+Market+Kampala', directions: 'Next to National Theatre.' } }),
  mkDeal({ id: 'smartwatch-basic', name: 'Basic Smartwatch', category: 'Electronics', subCategory: 'Smartwatches', retailPrice: 50000, wholesalePrice: 42000, minQuantity: 10, priceType: 'both', mallPrice: 100000, sellerId: 'gadget-hub', location: { arcade: 'Majestic Plaza', building: 'Majestic Plaza', floor: '2nd Floor', stall: 'Shop 18', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Majestic+Plaza+Kampala', directions: '2nd floor tech section.' } }),
  mkDeal({ id: 'phone-charger-fast', name: 'Fast Phone Charger', category: 'Electronics', subCategory: 'Accessories', retailPrice: 15000, wholesalePrice: 12000, minQuantity: 20, priceType: 'both', mallPrice: 35000, sellerId: 'techdeals-ug', location: { arcade: 'Kikuubo', building: 'Building A', floor: '2nd Floor', stall: 'Stall 5', landmark: 'Near staircase', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building A, 2nd floor.' } }),
  mkDeal({ id: 'laptop-used', name: 'Used Laptop', category: 'Electronics', subCategory: 'Laptops', retailPrice: 450000, wholesalePrice: 400000, minQuantity: 3, priceType: 'both', mallPrice: 700000, sellerId: 'gadget-hub', location: { arcade: 'Majestic Plaza', building: 'Majestic Plaza', floor: '2nd Floor', stall: 'Shop 20', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Majestic+Plaza+Kampala', directions: '2nd floor, computer section.' } }),
  mkDeal({ id: 'computer-mouse', name: 'Computer Mouse', category: 'Electronics', subCategory: 'Accessories', retailPrice: 12000, wholesalePrice: 8000, minQuantity: 24, priceType: 'both', mallPrice: 25000, sellerId: 'gadget-hub', location: { arcade: 'Majestic Plaza', building: 'Majestic Plaza', floor: '2nd Floor', stall: 'Shop 20', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Majestic+Plaza+Kampala', directions: '2nd floor computer section.' } }),
  mkDeal({ id: 'keyboard-wireless', name: 'Wireless Keyboard', category: 'Electronics', subCategory: 'Accessories', retailPrice: 35000, wholesalePrice: 28000, minQuantity: 10, priceType: 'both', mallPrice: 65000, sellerId: 'gadget-hub', location: { arcade: 'Majestic Plaza', building: 'Majestic Plaza', floor: '2nd Floor', stall: 'Shop 20', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Majestic+Plaza+Kampala', directions: '2nd floor computer section.' } }),
  mkDeal({ id: 'women-heels', name: "Women's Heels", category: 'Fashion for Women', subCategory: 'Heels and flats', retailPrice: 50000, wholesalePrice: 42000, minQuantity: 6, priceType: 'both', mallPrice: 90000, sellerId: 'salongo-shoes', location: { arcade: 'Mukwano Arcade', building: 'Mukwano Mall', floor: 'Ground Floor', stall: 'Stall 22', landmark: 'Opposite Gazaland', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Mukwano+Arcade+Kampala', directions: 'Ground floor near escalator.' } }),
  mkDeal({ id: 'handbag', name: "Women's Handbag", category: 'Fashion for Women', subCategory: 'Handbags', retailPrice: 45000, wholesalePrice: 38000, minQuantity: 6, priceType: 'both', mallPrice: 85000, sellerId: 'fashion-corner', location: { arcade: 'Gazaland Arcade', building: 'Gazaland', floor: 'Ground Floor', stall: 'Stall 10', landmark: 'Opposite Old Taxi Park', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Gazaland+Arcade+Kampala', directions: 'Ground floor handbags section.' } }),
  mkDeal({ id: 'scarf', name: 'Fashion Scarf', category: 'Fashion for Women', subCategory: 'Scarves', retailPrice: 8000, wholesalePrice: 5000, minQuantity: 24, priceType: 'both', mallPrice: 20000, sellerId: 'fashion-corner', location: { arcade: 'Gazaland Arcade', building: 'Gazaland', floor: 'Ground Floor', stall: 'Stall 8', landmark: 'Opposite Old Taxi Park', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Gazaland+Arcade+Kampala', directions: 'Ground floor.' } }),
  mkDeal({ id: 'men-belt', name: "Men's Belt", category: 'Fashion for Men', subCategory: 'Belts', retailPrice: 12000, wholesalePrice: 8000, minQuantity: 20, priceType: 'both', mallPrice: 30000, sellerId: 'denim-hub', location: { arcade: 'Majestic Plaza', building: 'Majestic Plaza', floor: '1st Floor', stall: 'Stall 7', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Majestic+Plaza+Kampala', directions: '1st floor fashion section.' } }),
  mkDeal({ id: 'electric-iron', name: 'Electric Iron', category: 'Home and Furniture', subCategory: 'Appliances', retailPrice: 35000, wholesalePrice: 30000, minQuantity: 10, priceType: 'both', mallPrice: 65000, sellerId: 'home-appliances', location: { arcade: 'Energy Centre', building: 'Energy Centre', floor: 'Ground Floor', stall: 'Shop 3', landmark: 'Market Street', street: 'Market Street', mapsUrl: 'https://maps.google.com/?q=Energy+Centre+Kampala', directions: 'Ground floor appliances.' } }),
  mkDeal({ id: 'fan-standing', name: 'Standing Fan', category: 'Home and Furniture', subCategory: 'Appliances', retailPrice: 85000, wholesalePrice: 75000, minQuantity: 5, priceType: 'both', mallPrice: 150000, sellerId: 'home-appliances', location: { arcade: 'Energy Centre', building: 'Energy Centre', floor: 'Ground Floor', stall: 'Shop 5', landmark: 'Market Street', street: 'Market Street', mapsUrl: 'https://maps.google.com/?q=Energy+Centre+Kampala', directions: 'Ground floor appliances.' } }),
  mkDeal({ id: 'kitchen-pots-set', name: 'Kitchen Pots Set', category: 'Home and Furniture', subCategory: 'Kitchen', retailPrice: 65000, wholesalePrice: 55000, minQuantity: 6, priceType: 'both', mallPrice: 120000, sellerId: 'electronics-plaza', location: { arcade: 'Kikuubo', building: 'Building A', floor: 'Ground Floor', stall: 'Shop 2', landmark: 'Building A entrance', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building A, ground floor.' } }),
  mkDeal({ id: 'necklace', name: 'Necklace', category: 'Fashion for Women', subCategory: 'Jewelry', retailPrice: 15000, wholesalePrice: 10000, minQuantity: 20, priceType: 'both', mallPrice: 35000, sellerId: 'jewelry-stall', location: { arcade: 'Galiraya', building: 'Galiraya Arcade', floor: 'Ground Floor', stall: 'Stall 3', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Galiraya+Arcade+Kampala', directions: 'Ground floor jewelry.' } }),
  mkDeal({ id: 'hair-accessories', name: 'Hair Accessories Set', category: 'Beauty and Fragrance', subCategory: 'Hair accessories', retailPrice: 15000, wholesalePrice: 10000, minQuantity: 20, priceType: 'both', mallPrice: 30000, sellerId: 'beauty-world', location: { arcade: 'Galiraya', building: 'Galiraya Arcade', floor: 'Ground Floor', stall: 'Stall 6', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Galiraya+Arcade+Kampala', directions: 'Ground floor beauty section.' } }),
  mkDeal({ id: 'wooden-carving', name: 'Wooden Carving', category: 'Home and Furniture', subCategory: 'Décor', retailPrice: 35000, wholesalePrice: 28000, minQuantity: 5, priceType: 'both', mallPrice: 70000, sellerId: 'artisan-stalls', location: { arcade: 'Crafts Market', building: 'National Theatre', floor: 'Ground', stall: 'Various artisan stalls', landmark: 'Next to National Theatre', street: 'De Winton Road', mapsUrl: 'https://maps.google.com/?q=Crafts+Market+Kampala', directions: 'Next to National Theatre.' } }),
  mkDeal({ id: 'bark-cloth-bag', name: 'Bark Cloth Bag', category: 'Fashion for Women', subCategory: 'Handbags', retailPrice: 30000, wholesalePrice: 25000, minQuantity: 10, priceType: 'both', mallPrice: 60000, sellerId: 'artisan-stalls', location: { arcade: 'Crafts Market', building: 'National Theatre', floor: 'Ground', stall: 'Various artisan stalls', landmark: 'Next to National Theatre', street: 'De Winton Road', mapsUrl: 'https://maps.google.com/?q=Crafts+Market+Kampala', directions: 'Next to National Theatre.' } }),
  mkDeal({ id: 'phone-case', name: 'Phone Case', category: 'Electronics', subCategory: 'Accessories', retailPrice: 5000, wholesalePrice: 3000, minQuantity: 50, priceType: 'both', mallPrice: 15000, sellerId: 'techdeals-ug', location: { arcade: 'Kikuubo', building: 'Building A', floor: '2nd Floor', stall: 'Stall 5', landmark: 'Near staircase', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building A, 2nd floor.' } }),
  mkDeal({ id: 'socks-pack', name: 'Socks (3 Pairs)', category: 'Fashion for Men', subCategory: 'Shirts', retailPrice: 8000, wholesalePrice: 5000, minQuantity: 30, priceType: 'both', mallPrice: 20000, sellerId: 'denim-hub', location: { arcade: 'Kikuubo', building: 'Building C', floor: '1st Floor', stall: 'Stall 9', landmark: 'Near staircase', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building C, 1st floor.' } }),
  mkDeal({ id: 'thrift-shirt', name: 'Thrift Shirt', category: 'Thrift', subCategory: 'Shirts', retailPrice: 10000, wholesalePrice: 7000, minQuantity: 20, priceType: 'both', mallPrice: 30000, sellerId: 'sharon-stall', location: { arcade: 'Owino', building: 'Liberia Section', floor: 'Ground', stall: "Sharon's area", landmark: 'Liberia section for clothes', street: 'Owino Market', mapsUrl: 'https://maps.google.com/?q=Owino+Market+Kampala', directions: 'Liberia section, Owino Market.' } }),
  mkDeal({ id: 'perfume-100ml', name: 'Inspired Perfume (100ml)', category: 'Beauty and Fragrance', subCategory: 'Perfumes', retailPrice: 55000, wholesalePrice: 45000, minQuantity: 12, priceType: 'both', mallPrice: 100000, sellerId: 'daniel-perfumes', mentionedOnTiktok: true, location: { arcade: 'Kampala', building: 'Ntinda', floor: 'Ground', stall: 'Near Capital Shoppers', landmark: 'Near Capital Shoppers, Ntinda', street: 'Ntinda Road', mapsUrl: 'https://maps.google.com/?q=Ntinda+Kampala', directions: 'Near Capital Shoppers in Ntinda.' } }),
  mkDeal({ id: 'ai-selfie-stick', name: 'AI Selfie Stick Tripod', category: 'Electronics', subCategory: 'Accessories', retailPrice: 150000, wholesalePrice: 130000, minQuantity: 5, priceType: 'both', mallPrice: 200000, sellerId: 'noddiz', mentionedOnTiktok: true, location: { arcade: 'Other', building: 'Online/Jumia', floor: '', stall: '', landmark: 'Available on Jumia', street: '', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'Order via Jumia or WhatsApp.' } }),
  mkDeal({ id: 'men-suit', name: "Men's Suit", category: 'Fashion for Men', subCategory: 'Suits', retailPrice: 150000, wholesalePrice: 130000, minQuantity: 3, priceType: 'both', mallPrice: 280000, sellerId: 'magoba-suits', location: { arcade: 'Magoba', building: 'Magoba Shopping Centre', floor: '2nd Floor', stall: 'Shop 15', landmark: 'Opposite Old Taxi Park', street: 'Nakivubo Mews', mapsUrl: 'https://maps.google.com/?q=Magoba+Shopping+Centre+Kampala', directions: '2nd floor, suits section.' } }),
  mkDeal({ id: 'gomesi', name: 'Gomesi Traditional Garment', category: 'Fashion for Women', subCategory: 'Dresses', retailPrice: 80000, wholesalePrice: 65000, minQuantity: 5, priceType: 'both', mallPrice: 150000, sellerId: 'magoba-suits', location: { arcade: 'Magoba', building: 'Magoba Shopping Centre', floor: '1st Floor', stall: 'Shop 8', landmark: 'Opposite Old Taxi Park', street: 'Nakivubo Mews', mapsUrl: 'https://maps.google.com/?q=Magoba+Shopping+Centre+Kampala', directions: '1st floor, traditional wear.' } }),
  mkDeal({ id: 'pillowcases-pair', name: 'Pillowcases (Pair)', category: 'Home and Furniture', subCategory: 'Bedding', retailPrice: 12000, wholesalePrice: 8000, minQuantity: 20, priceType: 'both', mallPrice: 25000, sellerId: 'mirembe-beddings', location: { arcade: 'Kampala', building: 'DM for location', floor: '', stall: '', landmark: 'DM seller', street: '', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'Contact seller for location.' } }),
  mkDeal({ id: 'small-power-bank', name: 'Small Power Bank 5,000mAh', category: 'Electronics', subCategory: 'Accessories', retailPrice: 20000, wholesalePrice: 15000, minQuantity: 15, priceType: 'both', mallPrice: 40000, sellerId: 'techdeals-ug', location: { arcade: 'Kikuubo', building: 'Building A', floor: '2nd Floor', stall: 'Stall 5', landmark: 'Near staircase', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building A, 2nd floor.' } }),
  mkDeal({ id: 'scam-iphone', name: 'iPhone 15 Pro (Suspicious)', category: 'Electronics', subCategory: 'Smartphones', retailPrice: 150000, wholesalePrice: 150000, minQuantity: 1, priceType: 'retail', mallPrice: 2500000, sellerId: 'suspect-seller', verificationStatus: 'check-required', priceConfidence: 'low', stockStatus: 'limited', mentionedOnTiktok: true, location: { arcade: 'Kampala', building: '', floor: '', stall: '', landmark: 'Nationwide delivery only', street: '', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'No physical shop — online only.' } })
];

WPDATA.stats = {
  verifiedDeals: WPDATA.deals.filter(d => d.verificationStatus === 'verified').length,
  sellers: Object.keys(WPDATA.sellers).length,
  totalSavings: 125000000,
  users: 8420
};
