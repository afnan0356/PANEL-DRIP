import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_banner_streetwear_1785684273927.jpg';
export const RESIN_HIGHLIGHT_IMAGE = '/src/assets/images/resin_statue_highlight_1785684292437.jpg';

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    title: 'Cyber-Valkyrie EX 1/7 Scale Resin Statue',
    subtitle: 'NEXUS STUDIOS x PANEL & DRIP EXCLUSIVE',
    category: 'resin-statues',
    subcategory: '1/7 Scale Resin',
    franchise: 'Cyberpunk Neo-Tokyo',
    priceUSD: 489.99,
    originalPriceUSD: 549.99,
    rating: 4.95,
    reviewCount: 38,
    images: [
      RESIN_HIGHLIGHT_IMAGE,
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Museum-grade 1/7 scale resin statue handcrafted by Nexus Studios featuring illuminated USB-C dual-mode LED base, translucent wing effect pieces, custom metal plaque, and certificate of authenticity signed by concept artist REN. Limited run of 500 pieces worldwide.',
    specs: [
      { label: 'Scale / Material', value: '1/7 Scale Polystone & Polyurethane Resin' },
      { label: 'Dimensions', value: 'H: 42cm x W: 31cm x D: 28cm' },
      { label: 'Lighting', value: 'Built-in USB-C LED base with 3 pulse modes' },
      { label: 'Edition Size', value: 'Strictly limited to 500 numbered pieces worldwide' },
      { label: 'Packaging', value: 'Custom artwork magnetic collector box + laser-cut foam' }
    ],
    sizes: ['Standard Edition', 'Deluxe EX LED Base Edition'],
    isLimitedResin: true,
    isPreOrder: true,
    preOrderDate: 'Q4 2026 Batch Shipping',
    stockCount: 4,
    editionLimit: 500,
    tags: ['Resin Statue', '1/7 Scale', 'LED Base', 'Limited Edition', 'Collector Item'],
    reviews: [
      {
        id: 'rev-01',
        userName: 'Kenji_K',
        userBadge: 'Verified Resin Collector',
        rating: 5,
        date: 'July 24, 2026',
        title: 'Mind-blowing resin quality and paint job!',
        comment:
          'Received my early batch resin figure today. The translucent crystal wing pieces under the LED base light up my entire display cabinet. Packaging was triple bubble-wrapped with zero box damage.',
        helpfulCount: 29
      },
      {
        id: 'rev-02',
        userName: 'AetherGamer',
        userBadge: 'High-End Statue Enthusiast',
        rating: 5,
        date: 'June 18, 2026',
        title: 'Worth every single penny',
        comment:
          'Panel & Drip is legit for resin statues. Nexus Studios nailed the metallic shading and character eyes. Highly recommend grabbing before all 500 sell out.',
        helpfulCount: 17
      }
    ]
  },
  {
    id: 'prod-002',
    title: 'Void-Cutter 450 GSM Heavy Cotton Graphic Tee',
    subtitle: 'RAW EDGE OVERSIZED STREETWEAR FIT',
    category: 'streetwear',
    subcategory: 'Oversized Tee',
    franchise: 'Chainsaw Devil',
    priceUSD: 58.00,
    originalPriceUSD: 68.00,
    rating: 4.88,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Ultra-heavyweight 450 GSM 100% combed ring-spun cotton graphic t-shirt. Features screen-printed high-density puff print anime panel back print, vintage acid-wash finish, dropped shoulders, and relaxed boxy drape tailored specifically for Gen Z streetwear silhouettes.',
    specs: [
      { label: 'Fabric Weight', value: '450 GSM Heavyweight Organic Cotton' },
      { label: 'Print Technique', value: 'High-density puff print + discharge screenprint' },
      { label: 'Fit Profile', value: 'Boxy oversized with dropped shoulders (Size down for regular fit)' },
      { label: 'Care Instructions', value: 'Machine wash cold inside out, hang dry only' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockCount: 22,
    tags: ['Heavy Cotton', 'Oversized', 'Acid Wash', 'Streetwear', 'Puff Print'],
    reviews: [
      {
        id: 'rev-03',
        userName: 'Sora_Fitz',
        userBadge: 'Verified Streetwear Buyer',
        rating: 5,
        date: 'July 15, 2026',
        title: 'Insane quality cotton, perfect drop shoulders!',
        comment:
          'This tee feels like a $180 luxury streetwear brand. Super thick cotton that holds shape, puff print has crisp detail. Perfect to pair with wide leg denim.',
        helpfulCount: 45
      }
    ]
  },
  {
    id: 'prod-003',
    title: 'Tokyo 90s Wide-Leg Distressed Wash Denim',
    subtitle: 'SUB-CULTURE RELAXED BAGGY FIT',
    category: 'bottoms',
    subcategory: 'Wide-Leg Denim',
    franchise: 'Retro 90s',
    priceUSD: 94.00,
    originalPriceUSD: 110.00,
    rating: 4.91,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Heavy 14oz rigid Japanese denim cut in a vintage wide-leg silhouette. Artisanal hand-distressed knees, subtle laser-etched manga panel detail along the rear right pocket, custom metal button hardware, and custom woven waist patch.',
    specs: [
      { label: 'Denim Weight', value: '14oz Japanese Rigid Cotton Denim' },
      { label: 'Wash', value: 'Vintage Stonewashed Light Blue with subtle distress' },
      { label: 'Leg Opening', value: '24-inch wide leg flare' },
      { label: 'Closure', value: 'Custom PANEL & DRIP stamped metal button fly' }
    ],
    sizes: ['28 (S)', '30 (M)', '32 (L)', '34 (XL)', '36 (2XL)'],
    stockCount: 14,
    tags: ['Wide Leg', 'Baggy Denim', 'Japanese Denim', 'Vintage Wash', 'Unisex'],
    reviews: [
      {
        id: 'rev-04',
        userName: 'Milo_Subculture',
        userBadge: 'Fashion Youth',
        rating: 5,
        date: 'July 28, 2026',
        title: 'The ultimate baggy jeans for chunky sneakers',
        comment:
          'The flare and stack on these jeans over platform sneakers is unmatched. Love the subtle manga etching on the back pocket. Buying the black pair next!',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'prod-004',
    title: 'Shadow-Blade Poseable S.H.Figuarts Action Figure',
    subtitle: 'OFFICIAL BANDAI SPIRITS LICENSED',
    category: 'action-figures',
    subcategory: 'S.H.Figuarts',
    franchise: 'Jujutsu High',
    priceUSD: 78.00,
    rating: 4.90,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Ultra-articulated 15cm poseable S.H.Figuarts action figure. Includes 4 swappable face expressions, 8 interchangeable hands, 2 glowing cursed aura effect parts, signature cursed katana blade, and Tamashii Stage clear display stand.',
    specs: [
      { label: 'Height', value: '150mm (Approx 6 inches)' },
      { label: 'Material', value: 'ABS & PVC' },
      { label: 'Articulation Points', value: '32 seamless double-joint points' },
      { label: 'Accessories Included', value: '4 Face plates, 8 hands, 2 magic effects, stand' }
    ],
    sizes: ['Standard Figure Pack'],
    stockCount: 18,
    tags: ['S.H.Figuarts', 'Action Figure', 'Poseable', 'Official License', 'Jujutsu High'],
    reviews: [
      {
        id: 'rev-05',
        userName: 'ActionFigX',
        userBadge: 'Verified Figure Collector',
        rating: 5,
        date: 'June 30, 2026',
        title: 'Incredible range of motion for dynamic poses',
        comment:
          'Bandai killed it with this joint engineering. You can pose him in full battle stance without falling over. Effect parts add so much energy to the shelf.',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'prod-005',
    title: 'Shadow-Exorcist Full Cross-Cosplay Outfit Set',
    subtitle: 'GENDER-INCLUSIVE ALL-IN-ONE COSTUME KIT',
    category: 'cosplay',
    subcategory: 'Cross-Cosplay Set',
    franchise: 'Dark Fantasy',
    priceUSD: 165.00,
    originalPriceUSD: 185.00,
    rating: 4.93,
    reviewCount: 51,
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Complete gender-inclusive convention-ready cosplay set. Includes tailored high-collar uniform jacket with custom metal crest buttons, pleated wrap trousers, utility tactical belt with leg pouches, inner high-neck compression top, and BONUS pre-styled wig cap & prop badge.',
    specs: [
      { label: 'Includes', value: 'Jacket, Trousers, Inner Top, Belt, Leg Pouch, Crest Pins, Wig Cap' },
      { label: 'Fabric', value: 'Premium breathable twill poly-blend with stretch lining' },
      { label: 'Fit', value: 'Unisex gender-inclusive sizing with adjustable waist cinch' },
      { label: 'Care', value: 'Hand wash cold, line dry' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    stockCount: 9,
    tags: ['Cosplay Set', 'Gender-Inclusive', 'Convention Ready', 'Complete Kit', 'Anime Uniform'],
    reviews: [
      {
        id: 'rev-06',
        userName: 'Rin_CrossCosplay',
        userBadge: 'Convention Dresser',
        rating: 5,
        date: 'July 11, 2026',
        title: 'Saved me weeks of tailoring! Fits like a dream.',
        comment:
          'Sizing is super inclusive and forgiving thanks to the hidden elastic waist cinches. The fabric feels like real high-end apparel rather than cheap halloween costumes.',
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'prod-006',
    title: 'Crimson-Spike Pre-Styled Synthetic Cosplay Wig',
    subtitle: 'HEAT-RESISTANT FIBER WITH ADJUSTABLE CAP',
    category: 'cosplay',
    subcategory: 'Pre-styled Wig',
    franchise: 'Dark Fantasy',
    priceUSD: 39.50,
    rating: 4.85,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Pre-cut and textured crimson spike wig crafted from high-temperature Japanese kanekalon synthetic fiber. Heat resistant up to 180°C (350°F) for custom styling with curling irons or hairspray. Includes breathable mesh wig cap and dual adjustment hooks.',
    specs: [
      { label: 'Fiber Material', value: '180°C Heat-Resistant Japanese Synthetic Kanekalon' },
      { label: 'Cap Size', value: 'Adjustable 54cm - 60cm head circumference' },
      { label: 'Pre-styled', value: 'Crimson multi-layer spikes cut and sprayed ready-to-wear' },
      { label: 'Free Bonus', value: 'Includes 2 breathable nude wig caps' }
    ],
    sizes: ['One Size (Adjustable)'],
    stockCount: 30,
    tags: ['Cosplay Wig', 'Pre-styled', 'Heat Resistant', 'Wig Cap Included'],
    reviews: [
      {
        id: 'rev-07',
        userName: 'Kai_WigArt',
        userBadge: 'Verified Cosplayer',
        rating: 5,
        date: 'July 02, 2026',
        title: 'Spikes stayed upright through a whole 10-hour con day!',
        comment:
          'Super dense hair volume with zero mesh showing underneath. Minimal touchup needed out of the box. Highly recommended for quick con readiness.',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'prod-007',
    title: 'Neon Genesis Complete Manga Box Set (Vol 1 - 14)',
    subtitle: 'HARDCOVER COLLECTOR EDITION BOX WITH ART PRINTS',
    category: 'manga-books',
    subcategory: 'Manga Box Set',
    franchise: 'Mecha',
    priceUSD: 145.00,
    originalPriceUSD: 175.00,
    rating: 4.98,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'The definitive complete 14-volume manga box set enclosed in a heavy embossed metallic silver collector chest. Includes bonus 64-page illustration booklet, double-sided metallic wall poster, and 4 exclusive character art cards.',
    specs: [
      { label: 'Publisher', value: 'Official Viz / Kadokawa Special Release' },
      { label: 'Language', value: 'English Translation with Original Japanese Sound FX' },
      { label: 'Page Count', value: 'Over 2,800 total pages in 14 deluxe volumes' },
      { label: 'Extras', value: 'Collector chest, 64-page mini artbook, poster, 4 art cards' }
    ],
    sizes: ['Complete Box Set Edition'],
    stockCount: 12,
    tags: ['Manga Box Set', 'Collector Edition', 'Hardcover', 'Art Prints Included'],
    reviews: [
      {
        id: 'rev-08',
        userName: 'MangaArchive',
        userBadge: 'Physical Manga Collector',
        rating: 5,
        date: 'June 14, 2026',
        title: 'Centerpiece of my manga bookshelf!',
        comment:
          'The metallic foil box box print is gorgeous. Books came wrapped in shrink-wrap with zero spine creasing. Essential for any anime fan library.',
        helpfulCount: 52
      }
    ]
  },
  {
    id: 'prod-008',
    title: 'Cyber-Samurai Tactical Techwear Shell Jacket',
    subtitle: 'WATERPROOF BREATHABLE REFLECTIVE OUTERWEAR',
    category: 'streetwear',
    subcategory: 'Techwear Jacket',
    franchise: 'Cyberpunk Neo-Tokyo',
    priceUSD: 178.00,
    originalPriceUSD: 210.00,
    rating: 4.92,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      '3-layer 20,000mm waterproof & windproof tactical shell. Integrated 3M 8912 iridescent reflective anime Kanji graphics along sleeve straps, magnetic storm flap pockets, quick-release shoulder harness system, and detachable storm hood.',
    specs: [
      { label: 'Waterproof Rating', value: '20,000mm hydrostatic head waterproof membrane' },
      { label: 'Reflective Details', value: '3M Scotchlite 8912 iridescent heat-transfer print' },
      { label: 'Hardware', value: 'YKK AquaGuard weather-sealed zippers & Fidlock magnetic buckles' },
      { label: 'Fit Profile', value: 'Articulated ergonomic techwear fit' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockCount: 7,
    tags: ['Techwear', 'Waterproof', 'Reflective', 'Tactical Jacket', 'Cyberpunk'],
    reviews: [
      {
        id: 'rev-09',
        userName: 'TechwearKID',
        userBadge: 'Verified Techwear Enthusiast',
        rating: 5,
        date: 'July 19, 2026',
        title: 'Fidlock magnetic buckles + true waterproof performance',
        comment:
          'Wore this in heavy downpour at an outdoor night market — stayed 100% dry. The 3M reflective kanji glows crazy brightly under flash photography.',
        helpfulCount: 34
      }
    ]
  },
  {
    id: 'prod-009',
    title: 'Mini Chibi Nendoroid collectible: Demon Slayer Tanjiro',
    subtitle: 'GOOD SMILE COMPANY ORIGINAL',
    category: 'action-figures',
    subcategory: 'Nendoroid',
    franchise: 'Demon Blade',
    priceUSD: 54.00,
    rating: 4.87,
    reviewCount: 120,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Chibi 10cm Nendoroid figure from Good Smile Company. Features 3 swappable face plates (standard smile, battle determination, comical sweat face), black Nichirin sword with water breathing effect pieces, and box display stand.',
    specs: [
      { label: 'Height', value: '100mm (Approx 4 inches)' },
      { label: 'Manufacturer', value: 'Good Smile Company' },
      { label: 'Face Plates', value: '3 Swappable expressions' },
      { label: 'Included Parts', value: 'Water Breathing effect arc, Nichirin sword & sheath, base' }
    ],
    sizes: ['Standard Nendoroid Box'],
    stockCount: 25,
    tags: ['Nendoroid', 'Chibi Figure', 'Good Smile', 'Swappable Faces'],
    reviews: [
      {
        id: 'rev-10',
        userName: 'NendoCollector',
        userBadge: 'Chibi Figure Fanatic',
        rating: 5,
        date: 'May 22, 2026',
        title: 'Adorable and authentic Good Smile release!',
        comment:
          'Holographic GSC seal on box confirms 100% official authenticity. Face swaps easily without joint looseness. Looks super cute next to my manga stack.',
        helpfulCount: 27
      }
    ]
  },
  {
    id: 'prod-010',
    title: 'Neo-Tokyo Desk Pad 900x400mm Gaming Mat',
    subtitle: 'STITCHED EDGE HIGH-DENSITY RUBBER BASE',
    category: 'accessories-decor',
    subcategory: 'Gaming Desk Pad',
    franchise: 'Cyberpunk Neo-Tokyo',
    priceUSD: 36.00,
    originalPriceUSD: 42.00,
    rating: 4.96,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1616588589676-63b3d98d2333?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Ultra-wide 900mm x 400mm x 4mm desktop pad featuring vibrant high-definition print of cyberpunk Tokyo cityscape. Micro-weave cloth surface for pinpoint mouse tracking, anti-fray stitched border perimeter, and non-slip textured natural rubber base.',
    specs: [
      { label: 'Dimensions', value: '900mm x 400mm x 4mm thick' },
      { label: 'Surface', value: 'Micro-woven speed cloth with spill-resistant coating' },
      { label: 'Base', value: 'Heavy natural rubber non-skid backing' },
      { label: 'Edges', value: 'Seamless anti-fray color-matched stitching' }
    ],
    sizes: ['Extra Large (900x400mm)'],
    stockCount: 40,
    tags: ['Desk Pad', 'Gaming Setup', 'Room Decor', 'Cyberpunk', 'Spill Resistant'],
    reviews: [
      {
        id: 'rev-11',
        userName: 'Battlestation_R',
        userBadge: 'Setup Designer',
        rating: 5,
        date: 'July 05, 2026',
        title: 'Transformed my desk setup completely!',
        comment:
          'Colors are crisp and vibrant, mouse glides smooth as silk. Spill-resistant coating saved my desk when I spilled boba tea on it last night — wiped off cleanly.',
        helpfulCount: 41
      }
    ]
  },
  {
    id: 'prod-011',
    title: 'POP UP PARADE Scale Figure: Chainsaw Devil Denji',
    subtitle: 'GOOD SMILE COMPANY POP UP PARADE LINE',
    category: 'action-figures',
    subcategory: 'POP UP PARADE',
    franchise: 'Chainsaw Devil',
    priceUSD: 49.99,
    rating: 4.89,
    reviewCount: 73,
    images: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Official POP UP PARADE figure standing 18cm tall. Dynamic posing captured with detailed metallic blood splatters, sharp translucent chainsaw blades, and textured devil head sculpture. Easy-to-collect affordable scale figure line.',
    specs: [
      { label: 'Height', value: '180mm (Approx 7.1 inches)' },
      { label: 'Material', value: 'Pre-painted Plastic with Base Included' },
      { label: 'Line', value: 'POP UP PARADE by Good Smile' }
    ],
    sizes: ['Standard Figure Window Box'],
    stockCount: 16,
    tags: ['POP UP PARADE', 'Scale Figure', 'Chainsaw Devil', 'Good Smile'],
    reviews: [
      {
        id: 'rev-12',
        userName: 'DenjiFan_00',
        userBadge: 'Verified Figure Collector',
        rating: 5,
        date: 'June 21, 2026',
        title: 'Crazy good detail for under $50',
        comment:
          'POP UP PARADE figures keep getting better. The chainsaw blades look metallic and scary realistic on my shelf.',
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'prod-012',
    title: 'Gothic-Lolita Embroidered Haori Kimono Cardigan',
    subtitle: 'OVERSIZED RELAXED JAPANESE DRAPE',
    category: 'streetwear',
    subcategory: 'Haori Cardigan',
    franchise: 'Original Studio',
    priceUSD: 72.00,
    originalPriceUSD: 85.00,
    rating: 4.91,
    reviewCount: 48,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Flowing open-front kimono haori cardigan crafted from soft matte satin blend fabric. Features 100,000-stitch intricate rear embroidery of traditional spider lily and koi fish manga motifs, wide three-quarter sleeves, and side vents.',
    specs: [
      { label: 'Material', value: 'Silky Matte Poly-Satin blend' },
      { label: 'Embroidery', value: 'High-density 100k-stitch rear embroidered art' },
      { label: 'Fit', value: 'One-size relaxed flowing drape (Fits S through 3XL comfortably)' }
    ],
    sizes: ['One Size (Relaxed Drape)'],
    stockCount: 11,
    tags: ['Haori Cardigan', 'Kimono', 'Embroidered', 'Japanese Streetwear', 'Unisex'],
    reviews: [
      {
        id: 'rev-13',
        userName: 'Aoi_StreetStyle',
        userBadge: 'Subculture Dresser',
        rating: 5,
        date: 'July 12, 2026',
        title: 'The embroidery quality is jaw-dropping!',
        comment:
          'Silky smooth texture that flows gracefully when walking. Gets compliments every time I wear it out to anime conventions or boba runs.',
        helpfulCount: 23
      }
    ]
  },
  {
    id: 'prod-013',
    title: 'Oversized Heavy Fleece Anime Panel Graphic Hoodie',
    subtitle: '500 GSM WINTER WEIGHT FLEECE HOODIE',
    category: 'streetwear',
    subcategory: 'Oversized Hoodie',
    franchise: 'Cyberpunk Neo-Tokyo',
    priceUSD: 98.00,
    originalPriceUSD: 115.00,
    rating: 4.97,
    reviewCount: 168,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Monstrously cozy 500 GSM custom-knit heavy fleece hoodie. Features double-layered double-lined hood, hidden phone stash pocket inside kangaroo pouch, heavy ribbed cuffs, and high-gloss screen printed manga panel graphic on front and sleeves.',
    specs: [
      { label: 'Fleece Weight', value: '500 GSM Ultra-Heavy Cotton Fleece' },
      { label: 'Hood', value: 'Double-lined double-layered heavy hood (no drawstring needed)' },
      { label: 'Fit Profile', value: 'Oversized drop-shoulder streetwear fit' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockCount: 19,
    tags: ['Heavy Fleece', '500 GSM', 'Oversized Hoodie', 'Manga Graphic', 'Best Seller'],
    reviews: [
      {
        id: 'rev-14',
        userName: 'Kaito_Fits',
        userBadge: 'Verified Buyer',
        rating: 5,
        date: 'July 22, 2026',
        title: 'Heavy as armor, warm as a blanket!',
        comment:
          'This hoodie weighs almost 3 lbs. The hood stays up firm without collapsing and the graphic screenprint has crisp line detail.',
        helpfulCount: 61
      }
    ]
  },
  {
    id: 'prod-014',
    title: 'Chunky Platform Streetwear Sneakers: NEON-RUNNER v2',
    subtitle: 'GEN Z POP-CULTURE FOOTWEAR',
    category: 'streetwear',
    subcategory: 'Platform Sneakers',
    franchise: 'Cyberpunk Neo-Tokyo',
    priceUSD: 128.00,
    originalPriceUSD: 145.00,
    rating: 4.86,
    reviewCount: 82,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Chunky 6cm platform techwear sneakers constructed with premium vegan leather, breathable mesh panels, glow-in-the-dark sole inserts, and padded ergonomic air cushion heel unit. Includes interchangeable neon extra laces.',
    specs: [
      { label: 'Platform Height', value: '60mm (2.4 inches) stacked chunky sole' },
      { label: 'Upper Material', value: 'Microfiber vegan leather & reinforced ripstop mesh' },
      { label: 'Cushioning', value: 'High-rebound EVA mid-sole + air heel cushion' }
    ],
    sizes: ['US 6 / EU 38', 'US 7 / EU 39', 'US 8 / EU 40', 'US 9 / EU 42', 'US 10 / EU 43', 'US 11 / EU 44'],
    stockCount: 15,
    tags: ['Chunky Sneakers', 'Platform Shoes', 'Glow in Dark', 'Techwear Footwear'],
    reviews: [
      {
        id: 'rev-15',
        userName: 'Steppy_Zero',
        userBadge: 'Pop-Culture Footwear Buyer',
        rating: 5,
        date: 'June 09, 2026',
        title: 'Comfy platform boost and instant height!',
        comment:
          'Super lightweight despite the chunky platform shape. Wore them walking all over Tokyo during vacation and my feet felt fine.',
        helpfulCount: 29
      }
    ]
  },
  {
    id: 'prod-015',
    title: 'The Art of Cyber-Gundam Official Anime Artbook',
    subtitle: 'DELUXE HARDCOVER WITH METALLIC FOIL COVER',
    category: 'manga-books',
    subcategory: 'Official Artbook',
    franchise: 'Mecha',
    priceUSD: 48.00,
    rating: 4.94,
    reviewCount: 65,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      '240-page heavy matte artbook featuring unreleased concept sketches, key animation line-art, mechanical blueprints, and color illustrations from famous anime mech designer H. Okawara. Gold foil embossed hardcover.',
    specs: [
      { label: 'Format', value: 'Hardcover 9" x 12" Full Color' },
      { label: 'Pages', value: '240 Heavyweight archival matte pages' },
      { label: 'Language', value: 'Bilingual (English / Japanese commentary)' }
    ],
    sizes: ['Hardcover Collector Edition'],
    stockCount: 20,
    tags: ['Artbook', 'Concept Art', 'Hardcover', 'Official Release', 'Mecha'],
    reviews: [
      {
        id: 'rev-16',
        userName: 'MechaDesigner',
        userBadge: 'Artbook Buyer',
        rating: 5,
        date: 'July 01, 2026',
        title: 'Masterclass in mechanical design and line art',
        comment:
          'High resolution print quality with true color reproduction. The unreleased mechanical sketches alone are worth the price.',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'prod-016',
    title: 'Cross-Body Utility Shoulder Bag & Modular Pouch',
    subtitle: 'CORDURA NYLON WATER-RESISTANT UTILITY BAG',
    category: 'accessories-decor',
    subcategory: 'Utility Bag',
    franchise: 'Original Studio',
    priceUSD: 42.00,
    rating: 4.89,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Heavy-duty 1000D Cordura tactical cross-body bag equipped with MOLLE webbing loops, quick-detach magnetic key clip, internal padded tablet sleeve, transparent vinyl pin display pocket (ita-bag style), and detachable strap.',
    specs: [
      { label: 'Material', value: '1000D Weatherproof Cordura Ballistic Nylon' },
      { label: 'Features', value: 'Ita-bag pin window + MOLLE strap attachments' },
      { label: 'Capacity', value: '4.5 Liters (Fits iPad Mini, Nintendo Switch & water bottle)' }
    ],
    sizes: ['One Size Bag'],
    stockCount: 28,
    tags: ['Utility Bag', 'Ita Bag', 'MOLLE', 'Crossbody', 'Streetwear Bag'],
    reviews: [
      {
        id: 'rev-17',
        userName: 'PinCollector_Maya',
        userBadge: 'Enamel Pin Collector',
        rating: 5,
        date: 'July 18, 2026',
        title: 'Perfect ita-bag setup for showing off enamel pins!',
        comment:
          'The front clear window lets me display my anime enamel pin collection without ruining the fabric. Sturdy zippers and comfortable strap.',
        helpfulCount: 40
      }
    ]
  },
  {
    id: 'prod-017',
    title: 'Limited Enamel Pin & Metal Keychain Box Set',
    subtitle: 'SET OF 5 HARD ENAMEL PINS WITH GOLD PLATING',
    category: 'accessories-decor',
    subcategory: 'Pins & Keychains',
    franchise: 'Chainsaw Devil',
    priceUSD: 28.00,
    originalPriceUSD: 34.00,
    rating: 4.93,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Set of 5 collector-grade hard enamel lapel pins with gold-plated metal plating and rubber clutch backings. Comes packaged in a laser-embossed velvet collector tray with custom matching acrylic keychain clip.',
    specs: [
      { label: 'Pin Size', value: '1.5 inches to 1.8 inches each' },
      { label: 'Finish', value: 'Hard enamel gold plating with screen-printed face details' },
      { label: 'Backing', value: 'Dual rubber clutch fasteners per pin to prevent rotation' }
    ],
    sizes: ['5-Piece Collector Set'],
    stockCount: 35,
    tags: ['Enamel Pins', 'Metal Keychain', 'Gold Plated', 'Collector Set'],
    reviews: [
      {
        id: 'rev-18',
        userName: 'PinLover99',
        userBadge: 'Verified Buyer',
        rating: 5,
        date: 'June 27, 2026',
        title: 'Super smooth enamel with shiny gold edges!',
        comment:
          'The double pin backings keep them locked on my backpack and jacket without spinning around. Looks amazing in person!',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'prod-018',
    title: 'Chibi Blind-Box Mini Vinyl Figure (Series 1)',
    subtitle: 'RANDOM MYSTERY COLLECTIBLE MINI FIGURE',
    category: 'action-figures',
    subcategory: 'Blind-Box Vinyl',
    franchise: 'Cyber-Neon',
    priceUSD: 14.50,
    rating: 4.82,
    reviewCount: 204,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Sealed mystery blind-box containing 1 of 8 collectible chibi mini vinyl figures plus 1 hidden 1:96 secret chase variant! Features vibrant metallic vinyl paint and desktop stand display card.',
    specs: [
      { label: 'Figure Size', value: '75mm (Approx 3 inches)' },
      { label: 'Rarity Rates', value: 'Regular 1:8 chance | Secret Chase 1:96 chance' },
      { label: 'Packaging', value: 'Foil sealed blind pouch inside collector box' }
    ],
    sizes: ['Single Blind Box', 'Full Case of 8 (No Duplicates guarantee)'],
    stockCount: 50,
    tags: ['Blind Box', 'Vinyl Figure', 'Mystery Pack', 'Collectible Mini'],
    reviews: [
      {
        id: 'rev-19',
        userName: 'MysteryBoxUnbox',
        userBadge: 'Vinyl Collector',
        rating: 5,
        date: 'July 25, 2026',
        title: 'I PULLED THE CHASE VARIANT!!',
        comment:
          'Cannot believe my luck! The gold metallic secret variant is so sick. Ordered 3 boxes and got zero duplicates.',
        helpfulCount: 58
      }
    ]
  }
];

export const FRANCHISES = [
  'All Franchises',
  'Cyberpunk Neo-Tokyo',
  'Chainsaw Devil',
  'Jujutsu High',
  'Dark Fantasy',
  'Mecha',
  'Demon Blade',
  'Retro 90s',
  'Original Studio'
];

export interface PromoCoupon {
  code: string;
  title: string;
  description: string;
  discountPercent?: number;
  discountFixedUSD?: number;
  minSpendUSD?: number;
  badge: string;
  expires: string;
}

export const PROMO_CODES: Record<string, PromoCoupon> = {
  DRIP10: {
    code: 'DRIP10',
    title: '10% OFF Welcome Drip',
    description: 'Get 10% off your entire order. Valid for all streetwear, statues & figures.',
    discountPercent: 10,
    badge: '10% OFF',
    expires: 'Never Expires'
  },
  OTAKU20: {
    code: 'OTAKU20',
    title: '$20 Collector Reward',
    description: 'Save $20 on high-end orders over $150.',
    discountFixedUSD: 20,
    minSpendUSD: 150,
    badge: '$20 OFF',
    expires: 'Limited Time'
  },
  PANEL15: {
    code: 'PANEL15',
    title: '15% OFF Resin & Apparel',
    description: '15% discount site-wide on orders over $200.',
    discountPercent: 15,
    minSpendUSD: 200,
    badge: '15% OFF',
    expires: 'Popular'
  },
  RESIN30: {
    code: 'RESIN30',
    title: '$30 OFF Statue Drop',
    description: 'Save $30 on premium 1/7 scale resin figures over $350.',
    discountFixedUSD: 30,
    minSpendUSD: 350,
    badge: '$30 OFF',
    expires: 'Collector Special'
  },
  FREESHIP: {
    code: 'FREESHIP',
    title: 'Free Express Air Shipping',
    description: '$15 shipping credit on orders over $100.',
    discountFixedUSD: 15,
    minSpendUSD: 100,
    badge: 'FREE SHIPPING',
    expires: 'Exclusive'
  }
};
