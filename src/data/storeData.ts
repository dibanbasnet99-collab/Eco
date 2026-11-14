export type ProductCategory =
  | 'All Products'
  | 'Bathroom & Oral Care'
  | 'Hair & Body'
  | 'Home & Kitchen'
  | 'Gift Bundles';

export interface Product {
  id: string;
  name: string;
  nepaliName: string;
  category: Exclude<ProductCategory, 'All Products'>;
  price: number;
  tag: string;
  impactLabel: string;
  bottlesSaved: number;
  origin: string;
  description: string;
  materials: string;
  image: string;
  imageFocusClass?: string;
  supportsEngraving?: boolean;
}

export interface RefillLiquid {
  id: string;
  name: string;
  nepaliName: string;
  ratePer100g: number;
  bottleEquivalentMl: number;
  notes: string;
  tintColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  neighborhood: string;
  quote: string;
  productBought: string;
}

export interface SocialReel {
  id: string;
  handle: string;
  title: string;
  nepaliCaption: string;
  views: string;
  duration: string;
  image: string;
  storyHighlight: string;
}

export const ASSETS = {
  heroRefill: '/src/assets/images/hero_refill_apothecary_1794670231033.jpg',
  bambooTumbler: '/src/assets/images/prod_bamboo_tumbler_1794670230797.jpg',
  neemCombBrush: '/src/assets/images/prod_neem_comb_brush_1794670230973.jpg',
  bambooToothbrush: '/src/assets/images/prod_bamboo_toothbrush_1794670232413.jpg',
  sisnuSoapDeo: '/src/assets/images/prod_sisnu_soap_deo_1794670232148.jpg',
  giftBoxHome: '/src/assets/images/prod_gift_box_home_1794670232936.jpg',
  storeCourtyard: '/src/assets/images/store_courtyard_kathmandu_1794670232993.jpg',
};

export const CATEGORIES: ProductCategory[] = [
  'All Products',
  'Bathroom & Oral Care',
  'Hair & Body',
  'Home & Kitchen',
  'Gift Bundles',
];

export const PRODUCTS: Product[] = [
  {
    id: 'bamboo-thermal-tumbler',
    name: 'Engraved Bamboo Thermal Tumbler (500ml)',
    nepaliName: 'बाँसको थर्मल बोतल',
    category: 'Home & Kitchen',
    price: 1450,
    tag: 'Custom Name Engraving',
    impactLabel: 'Replaces ~167 single-use bottles/yr',
    bottlesSaved: 18,
    origin: 'Crafted with local finishing in Kathmandu',
    description:
      'Double-walled food-grade 304 stainless steel flask wrapped in sustainably harvested bamboo grain. Keeps masala chiya hot for 12 hours or Himalayan spring water chilled for 24.',
    materials: 'Moso bamboo sleeve · 304 stainless steel · BPA-free silicone seal',
    image: ASSETS.bambooTumbler,
    imageFocusClass: 'object-center',
    supportsEngraving: true,
  },
  {
    id: 'neem-wide-tooth-comb',
    name: 'Neem & Bamboo Wide-Tooth Hair Comb',
    nepaliName: 'निम र बाँसको काइँयो',
    category: 'Hair & Body',
    price: 350,
    tag: '100% Biodegradable',
    impactLabel: 'Saves ~4 plastic combs over 5 yrs',
    bottlesSaved: 4,
    origin: 'Hand-carved in Lalitpur',
    description:
      'Naturally antibacterial neem wood detangles curls and straight hair without static or breakage while stimulating scalp circulation.',
    materials: 'Seasoned neem wood · Cold-pressed linseed oil finish',
    image: ASSETS.neemCombBrush,
    imageFocusClass: 'object-[22%_55%] scale-[1.28]',
  },
  {
    id: 'bamboo-paddle-hairbrush',
    name: 'Bamboo Cushion Paddle Hairbrush',
    nepaliName: 'बाँसको कुसन ब्रस',
    category: 'Hair & Body',
    price: 700,
    tag: 'Plastic-Free Pins',
    impactLabel: 'Zero synthetic bristle shedding',
    bottlesSaved: 6,
    origin: 'Hand-assembled in Patan',
    description:
      'Rounded bamboo bristles glide gently over a natural rubber air cushion to massage the scalp and distribute natural oils evenly.',
    materials: 'FSC-certified bamboo · Natural tree-sap rubber cushion',
    image: ASSETS.neemCombBrush,
    imageFocusClass: 'object-[82%_45%] scale-[1.28]',
  },
  {
    id: 'bamboo-toothbrush-pack',
    name: 'Eco Sathi Bamboo Toothbrush (Pack of 2)',
    nepaliName: 'बाँसको टुथब्रस (२ थान)',
    category: 'Bathroom & Oral Care',
    price: 280,
    tag: 'Charcoal Bristles',
    impactLabel: 'Prevents ~8 plastic brushes/yr',
    bottlesSaved: 8,
    origin: 'Compostable handle · Nepal',
    description:
      'Ergonomic moisture-resistant bamboo handles paired with ultra-soft activated charcoal-infused bristles for gentle everyday enamel care.',
    materials: 'Heat-treated bamboo handle · Charcoal-infused soft nylon-4 bristles',
    image: ASSETS.bambooToothbrush,
    imageFocusClass: 'object-center',
  },
  {
    id: 'sisnu-shea-soap',
    name: 'Sisnu (Nettle) & Shea Herbal Soap Bar',
    nepaliName: 'सिस्नु र शिया हर्बल साबुन',
    category: 'Hair & Body',
    price: 320,
    tag: 'Made in Nepal',
    impactLabel: 'Saves ~3 liquid body wash bottles',
    bottlesSaved: 3,
    origin: 'Small-batch wildcrafted in Pokhara & Ilam',
    description:
      'Foraged Himalayan stinging nettle (Sisnu) blended with cold-pressed chiuri butter and soothing shea, hand-wrapped in traditional Nepali lokta paper.',
    materials: 'Wild Himalayan Sisnu · Chiuri butter · Unrefined shea · Lokta wrap',
    image: ASSETS.sisnuSoapDeo,
    imageFocusClass: 'object-[24%_50%] scale-[1.25]',
  },
  {
    id: 'natural-deodorant-tin',
    name: 'Natural Aluminium-Free Deodorant Tin',
    nepaliName: 'प्राकृतिक डिओडोरेन्ट टिन',
    category: 'Bathroom & Oral Care',
    price: 550,
    tag: '5% Off Tin Return',
    impactLabel: 'Saves ~6 aerosol/roll-on plastics',
    bottlesSaved: 6,
    origin: 'Formulated in Kathmandu · Refillable',
    description:
      'Silky arrowroot and Himalayan beeswax formula scented with bergamot and cedarwood. Bring the empty tin back to Babar Mahal for 5% off your next refill.',
    materials: 'Reusable brushed tin · Arrowroot · Coconut oil · Essential oils',
    image: ASSETS.sisnuSoapDeo,
    imageFocusClass: 'object-[78%_52%] scale-[1.28]',
  },
  {
    id: 'magnetic-dustpan-bamboo-broom',
    name: 'Magnetic Dustpan & Bamboo Broom Set',
    nepaliName: 'बाँसको कुचो र डस्टप्यान',
    category: 'Home & Kitchen',
    price: 800,
    tag: 'Home Essential',
    impactLabel: 'Built for 5+ yrs plastic-free sweeping',
    bottlesSaved: 5,
    origin: 'Crafted by Terai bamboo weavers',
    description:
      'Counter-top palm-grass broom that locks neatly onto a powder-coated steel dustpan via concealed magnets—replacing brittle plastic whisk sets.',
    materials: 'Natural tiger grass · Bamboo handle · Powder-coated steel',
    image: ASSETS.giftBoxHome,
    imageFocusClass: 'object-[84%_72%] scale-[1.34]',
  },
  {
    id: 'zero-waste-starter-box',
    name: 'Zero-Waste Starter Gift Box',
    nepaliName: 'शून्य-प्लास्टिक उपहार बक्स',
    category: 'Gift Bundles',
    price: 2500,
    tag: 'Best Gift',
    impactLabel: 'Eliminates ~30 single-use items/yr',
    bottlesSaved: 24,
    origin: 'Curated at Babar Mahal Revisited',
    description:
      'Our signature lokta-wrapped gift box featuring an engraved bamboo tumbler, Sisnu herbal soap, neem wide-tooth comb, and two charcoal bamboo toothbrushes.',
    materials: 'Flower-seeded lokta paper · Jute twine · 4 full-size swaps',
    image: ASSETS.giftBoxHome,
    imageFocusClass: 'object-[34%_52%] scale-[1.18]',
    supportsEngraving: true,
  },
];

export const REFILL_LIQUIDS: RefillLiquid[] = [
  {
    id: 'hand-wash',
    name: 'Herbal Hand Wash',
    nepaliName: 'हात धुने झोल साबुन',
    ratePer100g: 45,
    bottleEquivalentMl: 250,
    notes: 'Lemongrass & neem extract · pH balanced · Greywater safe',
    tintColor: '#B87D4B',
  },
  {
    id: 'dish-wash',
    name: 'Citrus Dish Wash Liquid',
    nepaliName: 'भाँडा माझ्ने झोल',
    ratePer100g: 35,
    bottleEquivalentMl: 500,
    notes: 'Ritha (soapnut) & Himalayan lime · Tough on ghee & grease',
    tintColor: '#C59B48',
  },
  {
    id: 'floor-cleaner',
    name: 'Pine & Citronella Floor Cleaner',
    nepaliName: 'भुइँ सफा गर्ने क्लिनर',
    ratePer100g: 30,
    bottleEquivalentMl: 1000,
    notes: 'Himalayan chir pine oil · Safe for toddlers & pets',
    tintColor: '#6E8B74',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Pratiksha Shrestha',
    role: 'Architect',
    neighborhood: 'Patan, Lalitpur',
    quote:
      'Swapping our kitchen dish wash to Eco Sathi’s refill bar saved us 14 plastic bottles in a single year. I just drop by Babar Mahal with two glass jars on my Sunday coffee walk.',
    productBought: 'Refill Bar & Sisnu Soap',
  },
  {
    id: 't2',
    name: 'Aarav Gurung',
    role: 'Trekking Guide & Photographer',
    neighborhood: 'Lazimpat, Kathmandu',
    quote:
      'Had my name engraved in Devanagari on the 500ml bamboo flask before heading to Langtang. Zero leaks in my daypack and kept black tea piping hot at 3,800 meters.',
    productBought: 'Custom Engraved Bamboo Flask',
  },
  {
    id: 't3',
    name: 'Sunita Adhikari',
    role: 'Montessori Educator',
    neighborhood: 'Sanepa, Lalitpur',
    quote:
      'The Sisnu & Shea soap and aluminium deodorant tin feel genuinely crafted for Nepal’s climate. Returning empty tins for 5% off makes zero-waste habits feel effortless.',
    productBought: 'Deodorant Tin & Neem Comb',
  },
];

export const SOCIAL_REELS: SocialReel[] = [
  {
    id: 'r1',
    handle: '@ecosathi_nepal',
    title: '60-Second Refill Run at Babar Mahal',
    nepaliCaption: 'भाँडो ल्याउनुहोस्, तौलेर मात्र तिर्नुहोस्',
    views: '48.2K views',
    duration: '0:42',
    image: ASSETS.heroRefill,
    storyHighlight:
      'Watch how tare-weighing works at our courtyard refill bar—zero extra charge for the glass jar.',
  },
  {
    id: 'r2',
    handle: '@ecosathi_nepal',
    title: 'Laser Engraving Your Bamboo Flask',
    nepaliCaption: 'आफ्नै नाममा बाँसको थर्मल बोतल',
    views: '31.9K views',
    duration: '0:28',
    image: ASSETS.bambooTumbler,
    storyHighlight:
      'Behind the scenes of custom vertical engraving in Minimal Sans, Serif, and Devanagari script.',
  },
  {
    id: 'r3',
    handle: '@ecosathi_nepal',
    title: 'Inside Our Sisnu & Lokta Wrapping',
    nepaliCaption: 'नेपाली लोक्ता कागजमा हस्तनिर्मित साबुन',
    views: '26.4K views',
    duration: '0:35',
    image: ASSETS.sisnuSoapDeo,
    storyHighlight:
      'How wild-foraged stinging nettle and handmade lokta paper replace plastic soap wrappers.',
  },
  {
    id: 'r4',
    handle: '@ecosathi_nepal',
    title: 'EV Scooter Delivery Across Valley',
    nepaliCaption: 'काठमाडौं उपत्यकामा इलेक्ट्रिक डेलिभरी',
    views: '19.7K views',
    duration: '0:31',
    image: ASSETS.storeCourtyard,
    storyHighlight:
      'Packing orders in reused cardboard & newspaper before our electric scooter fleet heads out.',
  },
];
