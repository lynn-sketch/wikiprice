/* Extended sellers, services, TikTok extraction data */
(function () {
  const extraSellers = {
    'fashion-hub-ug': {
      id: 'fashion-hub-ug', name: 'Fashion Hub UG', tiktokHandle: 'fashionhubug', tiktokFollowers: 5200,
      phone: '256722001001', whatsapp: '256722001001', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 10,
      scamReports: 0, avgRating: 4.3, responseTimeHours: 3, platformMonths: 8,
      verificationHistory: 82, bioVerified: true, memberSince: '2025-04-01',
      bestTimeToContact: '9am - 6pm',
      about: 'Trendy fashion for men and women at Mukwano Arcade. Wholesale and retail.',
      bioExtracts: [
        { source: 'From bio', text: 'Mukwano Arcade, Stall 18, Ben Kiwanuka Street' },
        { source: 'From bio', text: 'WhatsApp orders welcome · DM for wholesale prices' },
        { source: 'From video caption', text: 'Office pants UGX 30K wholesale, UGX 35K retail' }
      ],
      videoCaptions: ['Ladies office pants from UGX 35,000. Wholesale UGX 30K min 12 pcs.', 'New stock every Monday at Mukwano.'],
      commentReplies: [{ user: '@buyer_ug', question: 'location?', reply: 'Building C, 2nd floor, near escalator' }],
      ocrExtracts: [{ source: 'From OCR on video', text: 'Stall 18 — Fashion Hub UG — 0702001001' }],
      locations: [{ source: 'From bio', text: 'Mukwano Arcade, Stall 18' }]
    },
    'techdeals-ug-tk': {
      id: 'techdeals-ug-tk', name: 'TechDeals Uganda', tiktokHandle: 'techdealsug', tiktokFollowers: 4800,
      phone: '256708901008', whatsapp: '256708901008', email: 'techdeals@email.com',
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 14,
      scamReports: 0, avgRating: 4.2, responseTimeHours: 4, platformMonths: 12,
      verificationHistory: 84, bioVerified: true, memberSince: '2024-06-01',
      bestTimeToContact: '9am - 7pm',
      about: 'Electronics and gadgets at Kikuubo prices. Earbuds, speakers, chargers.',
      bioExtracts: [
        { source: 'From bio', text: 'Kikuubo Building A, 2nd Floor · Earbuds from UGX 25K' },
        { source: 'From video caption', text: 'Wireless earbuds UGX 25,000 only today!' }
      ],
      videoCaptions: ['Earbuds UGX 25K retail. Building A 2nd floor.', 'Bluetooth speaker UGX 35K. Inbox for location.'],
      commentReplies: [{ user: '@tech_fan', question: 'where?', reply: 'Kikuubo Building A, 2nd floor stall 5' }],
      ocrExtracts: [{ source: 'From OCR on video', text: 'TechDeals UG — Stall 5 — UGX 25,000' }],
      locations: [{ source: 'From comment reply', text: 'Kikuubo, Building A, 2nd Floor, Stall 5' }]
    },
    'bags-and-more': {
      id: 'bags-and-more', name: 'Bags and More', tiktokHandle: 'bagsandmoreug', tiktokFollowers: 3100,
      phone: '256723002002', whatsapp: '256723002002', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 8,
      scamReports: 0, avgRating: 4.1, responseTimeHours: 5, platformMonths: 6,
      verificationHistory: 78, bioVerified: true, memberSince: '2025-06-01',
      bestTimeToContact: '10am - 6pm',
      about: 'Handbags, backpacks, and travel bags at Mukwano Arcade.',
      bioExtracts: [{ source: 'From bio', text: 'Mukwano Arcade, ground floor, bags section' }],
      videoCaptions: ['Handbags from UGX 45,000. Mukwano ground floor.'],
      commentReplies: [], ocrExtracts: [],
      locations: [{ source: 'From bio', text: 'Mukwano Arcade, ground floor' }]
    },
    'royal-perfumes': {
      id: 'royal-perfumes', name: 'Royal Perfumes UG', tiktokHandle: 'royalperfumesug', tiktokFollowers: 2800,
      phone: '256724003003', whatsapp: '256724003003', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 12,
      scamReports: 0, avgRating: 4.4, responseTimeHours: 2, platformMonths: 10,
      verificationHistory: 80, bioVerified: true, memberSince: '2024-08-01',
      bestTimeToContact: '11am - 8pm',
      about: 'Inspired designer fragrances. DM for location in Kampala.',
      bioExtracts: [{ source: 'From bio', text: 'Kampala · Inspired perfumes from UGX 35K · DM for location' }],
      videoCaptions: ['Inspired perfume 50ml UGX 35,000. Inbox to order.'],
      commentReplies: [{ user: '@scent_lover', question: 'location?', reply: 'Ntinda near Capital Shoppers' }],
      ocrExtracts: [], locations: [{ source: 'From comment reply', text: 'Ntinda, near Capital Shoppers' }]
    },
    'smartwatch-ug': {
      id: 'smartwatch-ug', name: 'Smartwatch UG', tiktokHandle: 'smartwatchug', tiktokFollowers: 2100,
      phone: '256725004004', whatsapp: '256725004004', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 6,
      scamReports: 0, avgRating: 4.0, responseTimeHours: 3, platformMonths: 5,
      verificationHistory: 75, bioVerified: true, memberSince: '2025-08-01',
      bestTimeToContact: '10am - 6pm',
      about: 'Smartwatches and fitness bands at Majestic Plaza.',
      bioExtracts: [{ source: 'From bio', text: 'Majestic Plaza, William Street, 2nd floor tech section' }],
      videoCaptions: ['Kids smartwatch UGX 80K. Basic smartwatch UGX 50K.'],
      commentReplies: [], ocrExtracts: [],
      locations: [{ source: 'From bio', text: 'Majestic Plaza, William Street' }]
    },
    'home-essentials-ug': {
      id: 'home-essentials-ug', name: 'Home Essentials UG', tiktokHandle: 'homeessentialsug', tiktokFollowers: 1900,
      phone: '256713456013', whatsapp: '256713456013', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 9,
      scamReports: 0, avgRating: 4.2, responseTimeHours: 6, platformMonths: 7,
      verificationHistory: 79, bioVerified: true, memberSince: '2025-05-01',
      bestTimeToContact: '9am - 6pm',
      about: 'Home appliances — kettles, irons, fans at Energy Centre.',
      bioExtracts: [{ source: 'From bio', text: 'Energy Centre, Market Street · Kettles, irons, fans' }],
      videoCaptions: ['Electric kettle UGX 45,000. Energy Centre ground floor.'],
      commentReplies: [], ocrExtracts: [],
      locations: [{ source: 'From bio', text: 'Energy Centre, Market Street' }]
    },
    'beauty-world-ug': {
      id: 'beauty-world-ug', name: 'Beauty World UG', tiktokHandle: 'beautyworldug', tiktokFollowers: 2200,
      phone: '256716789016', whatsapp: '256716789016', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 11,
      scamReports: 0, avgRating: 4.0, responseTimeHours: 5, platformMonths: 9,
      verificationHistory: 72, bioVerified: true, memberSince: '2024-09-01',
      bestTimeToContact: '10am - 6pm',
      about: 'Cosmetics and beauty products at Galiraya Arcade.',
      bioExtracts: [{ source: 'From bio', text: 'Galiraya Arcade, William Street · Cosmetics wholesale & retail' }],
      videoCaptions: ['Cosmetic set UGX 40K. Galiraya ground floor.'],
      commentReplies: [], ocrExtracts: [],
      locations: [{ source: 'From bio', text: 'Galiraya Arcade, William Street' }]
    },
    'shoe-empire-ug': {
      id: 'shoe-empire-ug', name: 'Shoe Empire UG', tiktokHandle: 'shoeempireug', tiktokFollowers: 2400,
      phone: '256726005005', whatsapp: '256726005005', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 7,
      scamReports: 0, avgRating: 4.3, responseTimeHours: 3, platformMonths: 6,
      verificationHistory: 81, bioVerified: true, memberSince: '2025-07-01',
      bestTimeToContact: '9am - 6pm',
      about: 'Shoes for the whole family at Mukwano Arcade.',
      bioExtracts: [{ source: 'From bio', text: 'Mukwano Arcade · Sneakers, office shoes, school shoes' }],
      videoCaptions: ['Sneakers UGX 45K. School shoes UGX 40K. Mukwano Stall 25.'],
      commentReplies: [], ocrExtracts: [],
      locations: [{ source: 'From bio', text: 'Mukwano Arcade, Stall 25' }]
    },
    'phone-world-ug': {
      id: 'phone-world-ug', name: 'Phone World UG', tiktokHandle: 'phoneworldug', tiktokFollowers: 2600,
      phone: '256727006006', whatsapp: '256727006006', email: null,
      sellerType: 'both', physicalShop: true, shopShownInVideos: true, accountAgeMonths: 10,
      scamReports: 0, avgRating: 4.1, responseTimeHours: 4, platformMonths: 8,
      verificationHistory: 77, bioVerified: true, memberSince: '2025-03-01',
      bestTimeToContact: '10am - 7pm',
      about: 'UK-used phones and accessories at Majestic Plaza.',
      bioExtracts: [{ source: 'From bio', text: 'Majestic Plaza, 2nd floor · UK-used iPhones & Samsung' }],
      videoCaptions: ['iPhone 11 UK-used UGX 350K. Majestic Plaza shop 12.'],
      commentReplies: [], ocrExtracts: [],
      locations: [{ source: 'From bio', text: 'Majestic Plaza, 2nd Floor, Shop 12' }]
    }
  };

  Object.assign(WPDATA.sellers, extraSellers);

  // Update existing sellers with TikTok handles from prompt
  if (WPDATA.sellers['fashion-wholesalers']) {
    WPDATA.sellers['fashion-wholesalers'].tiktokHandle = 'fashionhubug';
    WPDATA.sellers['fashion-wholesalers'].tiktokFollowers = 5200;
  }
  if (WPDATA.sellers['techdeals-ug']) {
    WPDATA.sellers['techdeals-ug'].tiktokHandle = 'techdealsug';
    WPDATA.sellers['techdeals-ug'].tiktokFollowers = 4800;
  }
  if (WPDATA.sellers['tv-house']) {
    WPDATA.sellers['tv-house'].tiktokHandle = 'techdealsug';
    WPDATA.sellers['tv-house'].tiktokFollowers = 4800;
  }
  if (WPDATA.sellers['mummy-gadgets']) WPDATA.sellers['mummy-gadgets'].tiktokFollowers = 50000;
  if (WPDATA.sellers['nsambya-furniture']) WPDATA.sellers['nsambya-furniture'].tiktokFollowers = 20000;
  if (WPDATA.sellers['daniel-perfumes']) WPDATA.sellers['daniel-perfumes'].tiktokFollowers = 10000;
  if (WPDATA.sellers['noddiz']) WPDATA.sellers['noddiz'].tiktokFollowers = 10000;

  WPDATA.categories['Services'] = [
    'Salon Services', 'Barber Services', 'Tailor Services', 'Mechanic Services',
    'Phone Repair', 'IT Services', 'Delivery Services', 'Cleaning Services',
    'Photography', 'Tutoring and Coaching'
  ];

  const serviceDeals = [
    { id: 'salon-braiding', name: 'Hair Braiding', category: 'Services', subCategory: 'Salon Services', retailPrice: 50000, wholesalePrice: 50000, minQuantity: 1, priceType: 'retail', mallPrice: 100000, sellerId: 'beauty-world-ug', location: { arcade: 'Galiraya', building: 'Galiraya Arcade', floor: 'Ground Floor', stall: 'Salon section', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Galiraya+Arcade+Kampala', directions: 'Ground floor salon area.' } },
    { id: 'barber-haircut', name: 'Barber Haircut', category: 'Services', subCategory: 'Barber Services', retailPrice: 10000, wholesalePrice: 10000, minQuantity: 1, priceType: 'retail', mallPrice: 20000, sellerId: 'fashion-hub-ug', location: { arcade: 'Kikuubo', building: 'Downtown', floor: 'Ground', stall: 'Various barbers', landmark: 'Near Old Taxi Park', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'Multiple barber shops downtown.' } },
    { id: 'tailor-alteration', name: 'Tailor Alteration', category: 'Services', subCategory: 'Tailor Services', retailPrice: 15000, wholesalePrice: 12000, minQuantity: 5, priceType: 'both', mallPrice: 30000, sellerId: 'magoba-suits', location: { arcade: 'Magoba', building: 'Magoba Shopping Centre', floor: '2nd Floor', stall: 'Tailor section', landmark: 'Nakivubo Mews', street: 'Nakivubo Mews', mapsUrl: 'https://maps.google.com/?q=Magoba+Kampala', directions: '2nd floor tailor shops.' } },
    { id: 'mechanic-service', name: 'Car Service (Basic)', category: 'Services', subCategory: 'Mechanic Services', retailPrice: 150000, wholesalePrice: 150000, minQuantity: 1, priceType: 'retail', mallPrice: 300000, sellerId: 'home-appliances', location: { arcade: 'Nalubwana Arcade', building: 'Nalubwana', floor: 'Ground', stall: 'Auto section', landmark: 'Ben Kiwanuka Street', street: 'Ben Kiwanuka Street', mapsUrl: 'https://maps.google.com/?q=Nalubwana+Arcade+Kampala', directions: 'Opposite Old Taxi Park, auto section.' } },
    { id: 'phone-screen-repair', name: 'Phone Screen Replacement', category: 'Services', subCategory: 'Phone Repair', retailPrice: 80000, wholesalePrice: 80000, minQuantity: 1, priceType: 'retail', mallPrice: 150000, sellerId: 'phone-world-ug', location: { arcade: 'Majestic Plaza', building: 'Majestic Plaza', floor: '2nd Floor', stall: 'Repair shop', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Majestic+Plaza+Kampala', directions: '2nd floor phone repair.' } },
    { id: 'it-computer-repair', name: 'Computer Repair', category: 'Services', subCategory: 'IT Services', retailPrice: 50000, wholesalePrice: 50000, minQuantity: 1, priceType: 'retail', mallPrice: 100000, sellerId: 'gadget-hub', location: { arcade: 'Majestic Plaza', building: 'Majestic Plaza', floor: '2nd Floor', stall: 'Shop 20', landmark: 'William Street', street: 'William Street', mapsUrl: 'https://maps.google.com/?q=Majestic+Plaza+Kampala', directions: 'Computer repair section.' } },
    { id: 'boda-delivery', name: 'Boda Delivery (Kampala)', category: 'Services', subCategory: 'Delivery Services', retailPrice: 5000, wholesalePrice: 5000, minQuantity: 1, priceType: 'retail', mallPrice: 10000, sellerId: 'noddiz', location: { arcade: 'Other', building: 'Citywide', floor: '', stall: '', landmark: 'Various couriers', street: '', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'Order via WhatsApp.' } },
    { id: 'house-cleaning', name: 'House Cleaning (Half Day)', category: 'Services', subCategory: 'Cleaning Services', retailPrice: 50000, wholesalePrice: 50000, minQuantity: 1, priceType: 'retail', mallPrice: 100000, sellerId: 'home-essentials-ug', location: { arcade: 'Kampala', building: 'Various', floor: '', stall: '', landmark: 'Citywide service', street: '', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'Book via WhatsApp.' } },
    { id: 'passport-photos', name: 'Passport Photos (4 copies)', category: 'Services', subCategory: 'Photography', retailPrice: 15000, wholesalePrice: 15000, minQuantity: 1, priceType: 'retail', mallPrice: 25000, sellerId: 'card-shop', location: { arcade: 'Avema', building: 'Avema Shopping Center', floor: 'Ground', stall: 'Photo studio', landmark: 'Kiyembe Lane', street: 'Kiyembe Lane', mapsUrl: 'https://maps.google.com/?q=Avema+Kampala', directions: 'Ground floor photo studio.' } },
    { id: 'math-tutoring', name: 'Math Tutoring (1 Hour)', category: 'Services', subCategory: 'Tutoring and Coaching', retailPrice: 30000, wholesalePrice: 30000, minQuantity: 1, priceType: 'retail', mallPrice: 60000, sellerId: 'mirembe-beddings', location: { arcade: 'Kampala', building: 'Various', floor: '', stall: '', landmark: 'Home visits or online', street: '', mapsUrl: 'https://maps.google.com/?q=Kampala', directions: 'Contact via WhatsApp.' } },
    { id: 'thrift-vintage-shirt', name: 'Thrift Vintage Shirt', category: 'Thrift', subCategory: 'Shirts', retailPrice: 10000, wholesalePrice: 8000, minQuantity: 30, priceType: 'both', mallPrice: 30000, sellerId: 'sharon-stall', verificationStatus: 'check-required', location: { arcade: 'Owino', building: 'Mississippi Section', floor: 'Ground', stall: 'Walk around', landmark: 'Mississippi section', street: 'Owino Market', mapsUrl: 'https://maps.google.com/?q=Owino+Market+Kampala', directions: 'Owino Mississippi section.' } },
    { id: 'bulk-office-pants-wholesale', name: 'Bulk Ladies Office Pants (Wholesale)', category: 'Wholesale for Business', subCategory: 'Bulk clothing', retailPrice: 35000, wholesalePrice: 30000, minQuantity: 12, priceType: 'wholesale', mallPrice: 80000, sellerId: 'fashion-wholesalers', location: { arcade: 'Kikuubo', building: 'Building C', floor: '2nd Floor', stall: 'Stall 15', landmark: 'Near main staircase', street: 'Kikuubo Road', mapsUrl: 'https://maps.google.com/?q=Kikuubo+Kampala', directions: 'Building C, 2nd floor, stall 15.' } },
    { id: 'crockery-set-12', name: 'Crockery Set (12pc)', category: 'Wholesale for Business', subCategory: 'Bulk home goods', retailPrice: 45000, wholesalePrice: 40000, minQuantity: 12, priceType: 'both', mallPrice: 90000, sellerId: 'china-town', mentionedOnTiktok: true, location: { arcade: 'China Town', building: 'Former Shoprite', floor: 'Ground Floor', stall: 'Kitchenware section', landmark: 'Lugogo', street: 'Lugogo Bypass', mapsUrl: 'https://maps.google.com/?q=China+Town+Lugogo+Kampala', directions: 'Lugogo, kitchenware section.' } }
  ];

  function mkSvc(o) {
    const seller = WPDATA.sellers[o.sellerId];
    return {
      id: o.id, name: o.name, category: o.category, subCategory: o.subCategory,
      retailPrice: o.retailPrice || o.wholesalePrice, wholesalePrice: o.wholesalePrice || o.retailPrice,
      minQuantity: o.minQuantity || 1, priceType: o.priceType || 'retail', location: o.location,
      sellerId: o.sellerId, tiktokHandle: seller?.tiktokHandle, verificationStatus: o.verificationStatus || 'verified',
      stockStatus: 'in-stock', lastVerified: '2026-06-14', verificationMethod: 'physical',
      priceConfidence: 'high', mallPrice: o.mallPrice, mentionedOnTiktok: o.mentionedOnTiktok || false,
      crowdConfirmations: 5, priceHistory: [{ date: '2026-06-01', price: o.retailPrice || o.wholesalePrice }],
      verificationHistory: [{ who: 'WikiPrice team', date: '2026-06-14', method: 'Physical visit' }],
      reviews: [{ name: 'Customer', date: '2026-05-20', stars: 4, comment: 'Good service for the price.' }]
    };
  }

  serviceDeals.forEach(d => WPDATA.deals.push(mkSvc(d)));

  WPDATA.tiktokFeed = [
    { handle: 'WikiPriceUG', videoId: '7123456789012345678', caption: 'Office pants UGX 80K in Garden City but UGX 30K in Kikuubo?!' },
    { handle: 'WikiPriceUG', videoId: '7123456789012345679', caption: 'Did you know? Compressor UGX 2.9M at China Town vs UGX 5M downtown' },
    { handle: 'WikiPriceUG', videoId: '7123456789012345680', caption: 'Under UGX 50K budget finds in Kampala markets' },
    { handle: 'salongohouseofshoes_1', videoId: '7123456789012345681', caption: 'Sneakers from UGX 45,000 at Mukwano Arcade' },
    { handle: 'mummyarleena', videoId: '7123456789012345682', caption: 'Kids smartwatch UGX 80,000 at Pioneer Mall' },
    { handle: 'nsambyafurnitureworkshop', videoId: '7123456789012345683', caption: 'Custom bed frame from UGX 350,000 — watch us build it' }
  ];

  WPDATA.stats.verifiedDeals = WPDATA.deals.filter(d => d.verificationStatus === 'verified').length;
  WPDATA.stats.sellers = Object.keys(WPDATA.sellers).length;

  WPDATA.locations.push('Nalubwana Arcade');
})();
