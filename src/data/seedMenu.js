/**
 * Category Header Studio Image Map for Category Tabs and Fallbacks
 * Used across the app to guarantee dedicated food category headers.
 */
export const CATEGORY_HEADER_IMAGES = {
  'buckets-meals': '/buckets&meals/best-bucket.png',
  'strips-combos': '/strips&combo/strip-combo.png',
  burgers: '/burgers/Zinger-burger.png',
  'signature-wraps': '/twister/yummy-twister-wrap.png',
  'loaded-fries-sides': '/loadedfries_sides/loaded-classic.png',
  'prawns-special': '/prawns/golden-prawns.png',
  'mojitos-juices': '/mojitos_juices/pineapple-mojito.png',
  'frappe-shakes-lassi': '/frappes_shakes/chocolate-frappe.png',

  // Supabase numeric IDs
  1: '/buckets&meals/best-bucket.png',
  2: '/strips&combo/strip-combo.png',
  3: '/burgers/Zinger-burger.png',
  4: '/prawns/golden-prawns.png',
  5: '/twister/yummy-twister-wrap.png',
  6: '/loadedfries_sides/loaded-classic.png',
  7: '/mojitos_juices/pineapple-mojito.png',
  8: '/frappes_shakes/chocolate-frappe.png',
  '1': '/buckets&meals/best-bucket.png',
  '2': '/strips&combo/strip-combo.png',
  '3': '/burgers/Zinger-burger.png',
  '4': '/prawns/golden-prawns.png',
  '5': '/twister/yummy-twister-wrap.png',
  '6': '/loadedfries_sides/loaded-classic.png',
  '7': '/mojitos_juices/pineapple-mojito.png',
  '8': '/frappes_shakes/chocolate-frappe.png',
};

export const CATEGORY_DEFAULT_IMAGES = CATEGORY_HEADER_IMAGES;

/**
 * Neutral food image fallback (NO brand logo).
 */
export const SAFE_IMAGE_FALLBACK = '/buckets&meals/best-bucket.png';

/**
 * Available original studio images library for quick Admin selection
 */
export const AVAILABLE_STUDIO_IMAGES = [
  // Buckets & Meals
  { category: 'Buckets & Meals', path: '/buckets&meals/best-bucket.png', label: 'Best Bucket (12 Pcs)' },
  { category: 'Buckets & Meals', path: '/buckets&meals/jolly-meal.png', label: 'Jolly Meal (9 Pcs)' },
  { category: 'Buckets & Meals', path: '/buckets&meals/couples-cut.png', label: 'Couples Cut (4 Pcs)' },
  { category: 'Buckets & Meals', path: '/buckets&meals/snacks-box.png', label: 'Snacks Box (2 Pcs)' },
  { category: 'Buckets & Meals', path: '/buckets&meals/trendy-20.png', label: 'Trendy 20 (20 Pcs)' },
  { category: 'Buckets & Meals', path: '/buckets&meals/pears-hunt.png', label: 'Pears Hunt' },
  { category: 'Buckets & Meals', path: '/buckets&meals/yummy-mix.png', label: 'Yummy Mix Bucket' },

  // Strips & Combos
  { category: 'Strips & Combos', path: '/strips&combo/strip-combo.png', label: 'Strip Combo' },
  { category: 'Strips & Combos', path: '/strips&combo/4pcs-strip-combo.png', label: '4 Pcs Strip Combo' },
  { category: 'Strips & Combos', path: '/strips&combo/strip-box.png', label: 'Strip Box' },
  { category: 'Strips & Combos', path: '/strips&combo/nuggets-combo.png', label: 'Nuggets Combo' },
  { category: 'Strips & Combos', path: '/strips&combo/kids-meal.png', label: 'Kids Meal' },

  // Burgers
  { category: 'Burgers', path: '/burgers/Zinger-burger.png', label: 'Zinger Burger' },
  { category: 'Burgers', path: '/burgers/Zinger-burger-combo.png', label: 'Zinger Burger Combo' },
  { category: 'Burgers', path: '/burgers/Double-pat-zinger-burger.png', label: 'Double Patty Zinger' },
  { category: 'Burgers', path: '/burgers/Double-pat-zinger-burger-combo.png', label: 'Double Patty Combo' },
  { category: 'Burgers', path: '/burgers/Dynamite-burger.png', label: 'Dynamite Burger' },
  { category: 'Burgers', path: '/burgers/Dynamite-burger-combo.png', label: 'Dynamite Burger Combo' },

  // Prawns Special
  { category: 'Prawns Special', path: '/prawns/golden-prawns.png', label: 'Golden Prawns Box' },
  { category: 'Prawns Special', path: '/prawns/ultimate-prawns-box.png', label: 'Ultimate Prawns Box' },
  { category: 'Prawns Special', path: '/prawns/prawns-burger.png', label: 'Prawns Burger' },
  { category: 'Prawns Special', path: '/prawns/prawns-dynamite.png', label: 'Dynamite Prawns Burger' },
  { category: 'Prawns Special', path: '/prawns/prawns-sandwich.png', label: 'Prawns Sandwich' },
  { category: 'Prawns Special', path: '/prawns/prawns-wrap.png', label: 'Prawns Wrap' },

  // Signature Wraps
  { category: 'Signature Wraps', path: '/twister/yummy-twister-wrap.png', label: 'Yummy Twister Wrap' },
  { category: 'Signature Wraps', path: '/twister/yummy-chicken-wrap.png', label: 'Yummy Chicken Wrap' },
  { category: 'Signature Wraps', path: '/twister/yummy-chicken-wrap-combo.png', label: 'Chicken Wrap Combo' },

  // Loaded Fries & Sides
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/loaded-classic.png', label: 'Classic Loaded Fries' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/cheesy-loaded.png', label: 'Cheesy Loaded Fries' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/loaded-fries-combo.png', label: 'Loaded Fries Combo' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/mozzarella-stick.png', label: 'Mozzarella Sticks' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/popcorn.png', label: 'Chicken Popcorn' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/nuggets-7pcs.png', label: 'Chicken Nuggets (7 Pcs)' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/nuggets-15pcs.png', label: 'Chicken Nuggets (15 Pcs)' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/onion-rings-small.png', label: 'Crispy Onion Rings (Small)' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/onion-rings-big.png', label: 'Crispy Onion Rings (Big)' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/french-fries-small.png', label: 'French Fries (Small)' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/french-fries-medium.png', label: 'French Fries (Medium)' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/french-fries-family.png', label: 'French Fries (Family Box)' },
  { category: 'Loaded Fries & Sides', path: '/loadedfries_sides/add-on-dips&sauces.png', label: 'Add-On Dips & Sauces' },

  // Brand Essentials
  { category: 'Brand Assets', path: '/brand/crunch-poster.jpg', label: 'Yummy Crunch Poster' },
  { category: 'Brand Assets', path: '/brand/cover-banner.png', label: 'Yummy Cover Banner' },
  { category: 'Brand Assets', path: '/brand/logo-yummy.png', label: 'Yummy Brand Logo' },
];

/**
 * 1:1 Item ID to Dedicated PNG Image Mapping for Loaded Fries & Sides (/loadedfries_sides/)
 */
export const LOADED_FRIES_IMAGE_BY_ID = {
  'item-lf-1': '/loadedfries_sides/loaded-classic.png',
  'item-lf-2': '/loadedfries_sides/cheesy-loaded.png',
  'item-lf-3': '/loadedfries_sides/loaded-fries-combo.png',
  'item-lf-4': '/loadedfries_sides/mozzarella-stick.png',
  'item-lf-5': '/loadedfries_sides/popcorn.png',
  'item-lf-6': '/loadedfries_sides/nuggets-7pcs.png',
  'item-lf-7': '/loadedfries_sides/nuggets-15pcs.png',
  'item-lf-8': '/loadedfries_sides/onion-rings-small.png',
  'item-lf-9': '/loadedfries_sides/onion-rings-big.png',
  'item-lf-10': '/loadedfries_sides/french-fries-small.png',
  'item-lf-11': '/loadedfries_sides/french-fries-medium.png',
  'item-lf-12': '/loadedfries_sides/french-fries-family.png',
  'item-lf-13': '/loadedfries_sides/add-on-dips&sauces.png',
};

/**
 * Resolves the exact Loaded Fries & Sides PNG filename.
 * Matches 1:1 by item ID, or falls back to name-based keyword matching.
 * Guarantees that Loaded Fries items explicitly use the dedicated PNGs without defaulting to brand logo.
 */
export function getLoadedFriesImage(item = {}) {
  const id = String(item.id || '').toLowerCase();
  if (LOADED_FRIES_IMAGE_BY_ID[id]) {
    return LOADED_FRIES_IMAGE_BY_ID[id];
  }
  const name = `${item.name_en || ''} ${item.name_ar || ''}`.toLowerCase();
  if (name.includes('combo')) return '/loadedfries_sides/loaded-fries-combo.png';
  if (name.includes('cheesy') || name.includes('جبن')) return '/loadedfries_sides/cheesy-loaded.png';
  if (name.includes('classic') || name.includes('كلاسيك')) return '/loadedfries_sides/loaded-classic.png';
  if (name.includes('mozzarella') || name.includes('موزاريلا')) return '/loadedfries_sides/mozzarella-stick.png';
  if (name.includes('popcorn') || name.includes('بوب')) return '/loadedfries_sides/popcorn.png';
  if (name.includes('15')) return '/loadedfries_sides/nuggets-15pcs.png';
  if (name.includes('nugget') || name.includes('ناجتس')) return '/loadedfries_sides/nuggets-7pcs.png';
  if (name.includes('ring') && (name.includes('big') || name.includes('large') || name.includes('كبير'))) return '/loadedfries_sides/onion-rings-big.png';
  if (name.includes('ring') || name.includes('بصل')) return '/loadedfries_sides/onion-rings-small.png';
  if (name.includes('family') || name.includes('عائلي')) return '/loadedfries_sides/french-fries-family.png';
  if (name.includes('medium') || name.includes('وسط')) return '/loadedfries_sides/french-fries-medium.png';
  if (name.includes('small') || name.includes('صغير')) return '/loadedfries_sides/french-fries-small.png';
  if (name.includes('dip') || name.includes('sauce') || name.includes('صوص')) return '/loadedfries_sides/add-on-dips&sauces.png';

  return '/loadedfries_sides/loaded-classic.png';
}

/**
 * Dynamically resolves product image URL directly from database column.
 * - PRIORITY 1: If a product has a valid image_url in Supabase (from Admin Panel upload or valid path), USE IT FIRST.
 * - FALLBACK: Local hardcoded paths in seedMenu.js only act as fallback if database URL is missing or empty.
 * - Ensures Best Bucket strictly uses /buckets&meals/best-bucket.png and never shares pears-hunt.png.
 * - NEVER replaces product images with the brand logo.
 */
export function resolveProductImageUrl(item = {}) {
  if (!item) return '/buckets&meals/best-bucket.png';
  const rawUrl = item.image_url || item.url;
  const url = typeof rawUrl === 'string' ? rawUrl.trim() : '';

  // 1. PRIORITIZE VALID DATABASE URL FIRST (Admin Panel uploads, storage URLs, or custom paths)
  const isMissingOrPlaceholder =
    !url ||
    url === 'null' ||
    url === 'undefined' ||
    url.includes('images.unsplash.com') ||
    url.includes('crunch-poster.jpg') ||
    url.includes('logo-yummy.png') ||
    url.includes('placeholder');

  if (!isMissingOrPlaceholder) {
    // Normalize any legacy Loaded Fries paths to the verified disk folder /loadedfries_sides/
    if (
      url.startsWith('/loadedfries/') ||
      url.startsWith('/loadedfries&sides/') ||
      url.startsWith('/loadedfries%26sides/') ||
      url.startsWith('/loadedfries&meals/')
    ) {
      return url
        .replace('/loadedfries%26sides/', '/loadedfries_sides/')
        .replace('/loadedfries&sides/', '/loadedfries_sides/')
        .replace('/loadedfries&meals/', '/loadedfries_sides/')
        .replace('/loadedfries/', '/loadedfries_sides/');
    }

    // Safeguard: If Best Bucket in database mistakenly points to pears-hunt.png, correct it to best-bucket.png
    const name = `${item.name_en || ''} ${item.name_ar || ''}`.toLowerCase();
    const isBestBucket =
      item.id === 1 ||
      item.id === '1' ||
      item.id === 'item-bm-1' ||
      (name.includes('best bucket') && !name.includes('pears'));
    if (isBestBucket && url.includes('pears-hunt')) {
      return '/buckets&meals/best-bucket.png';
    }

    return url;
  }

  // 2. FALLBACKS (ONLY evaluated when database image_url is missing, null, or empty):

  // 2a. Strict Loaded Fries & Sides mapping fallback
  const isLoadedFries =
    item.category_id === 'loaded-fries-sides' ||
    String(item.category_id) === '6' ||
    String(item.id || '').startsWith('item-lf-');

  if (isLoadedFries) {
    return (item.id && LOADED_FRIES_IMAGE_BY_ID[item.id]) || getLoadedFriesImage(item);
  }

  // 2b. Best Bucket vs Pears Hunt individual fallback
  const itemName = `${item.name_en || ''} ${item.name_ar || ''}`.toLowerCase();
  if (
    item.id === 1 ||
    item.id === '1' ||
    item.id === 'item-bm-1' ||
    (itemName.includes('best bucket') && !itemName.includes('pears'))
  ) {
    return '/buckets&meals/best-bucket.png';
  }
  if (
    item.id === 2 ||
    item.id === '2' ||
    item.id === 'item-bm-6' ||
    itemName.includes('pears hunt')
  ) {
    return '/buckets&meals/pears-hunt.png';
  }

  // 2c. Known seed item image if available
  if (item.id && typeof SEED_ITEM_IMAGE_BY_ID !== 'undefined' && SEED_ITEM_IMAGE_BY_ID[item.id]) {
    const seedUrl = SEED_ITEM_IMAGE_BY_ID[item.id];
    if (seedUrl && !seedUrl.includes('unsplash.com') && !seedUrl.includes('crunch-poster')) {
      return seedUrl;
    }
  }

  // 2d. Fall back to Category Default studio food image
  if (item.category_id && CATEGORY_HEADER_IMAGES[item.category_id]) {
    return CATEGORY_HEADER_IMAGES[item.category_id];
  }

  // 2e. Default neutral real food image fallback (NEVER brand logo)
  return '/buckets&meals/best-bucket.png';
}

/**
 * Universal safe image error handler to prevent layout breaking.
 * Falls back to dedicated item image, then category default image.
 * Catch-all bucket fallback is completely removed so error handler never blindly forces a bucket image.
 */
export function handleProductImageError(event, item = {}, categoryMap = {}) {
  const target = event?.currentTarget;
  if (!target) return;

  target.onerror = null; // Prevent infinite error loops
  const currentSrc = target.src || '';

  // 1. If Loaded Fries & Sides, strictly stay on dedicated PNG and never fall through
  const isLoadedFries =
    item?.category_id === 'loaded-fries-sides' ||
    String(item?.category_id) === '6' ||
    String(item?.id || '').startsWith('item-lf-');

  if (isLoadedFries) {
    const lfImg = (item?.id && LOADED_FRIES_IMAGE_BY_ID[item.id]) || getLoadedFriesImage(item);
    if (!currentSrc.endsWith(lfImg)) {
      target.src = lfImg;
    }
    return;
  }

  // 2. Best Bucket vs Pears Hunt independent error fallback
  const name = `${item?.name_en || ''} ${item?.name_ar || ''}`.toLowerCase();
  if (
    item?.id === 1 ||
    item?.id === '1' ||
    item?.id === 'item-bm-1' ||
    (name.includes('best bucket') && !name.includes('pears'))
  ) {
    if (!currentSrc.endsWith('/buckets&meals/best-bucket.png')) {
      target.src = '/buckets&meals/best-bucket.png';
      return;
    }
  }
  if (
    item?.id === 2 ||
    item?.id === '2' ||
    item?.id === 'item-bm-6' ||
    name.includes('pears hunt')
  ) {
    if (!currentSrc.endsWith('/buckets&meals/pears-hunt.png')) {
      target.src = '/buckets&meals/pears-hunt.png';
      return;
    }
  }

  // 3. Known seed item image
  if (item?.id && typeof SEED_ITEM_IMAGE_BY_ID !== 'undefined' && SEED_ITEM_IMAGE_BY_ID[item.id]) {
    const seedImg = SEED_ITEM_IMAGE_BY_ID[item.id];
    if (seedImg && !currentSrc.endsWith(seedImg)) {
      target.src = seedImg;
      return;
    }
  }

  // 4. Category header image fallback
  const catId = item?.category_id;
  const catFallback = catId && (CATEGORY_HEADER_IMAGES[catId] || CATEGORY_DEFAULT_IMAGES[catId]);
  if (catFallback && !currentSrc.endsWith(catFallback)) {
    target.src = catFallback;
    return;
  }
}

/**
 * Determines if an item image should be rendered in studio cutout mode
 * (object-contain with clean padding on light background) vs photographic cover.
 * Fully dynamic based on asset format (PNG, SVG, WebP) or beverage category, with ZERO hardcoded food names.
 */
export function isCutoutProduct(item = {}) {
  if (!item) return false;
  const url = String(item.image_url || item.url || '').toLowerCase();
  return (
    url.includes('.png') ||
    url.includes('.webp') ||
    url.includes('.svg') ||
    url.startsWith('data:image/png') ||
    item.category_id === 'mojitos-juices' ||
    item.category_id === 'frappe-shakes-lassi'
  );
}

export const STORE_INFO = {
  name_en: 'Yummy Fried Chicken',
  name_ar: 'يمي فرايد تشيكن',
  location_en: 'Fahaheel, Kuwait',
  location_ar: 'الفحيحيل، الكويت',
  address_en: 'Block 7, Makkah Street, Fahaheel, Kuwait',
  address_ar: 'قطعة 7، شارع مكة، شارع الفحيحيل، الكويت',
  hours_en: 'Daily: 11:00 AM – 2:00 AM',
  hours_ar: 'يومياً: 11:00 ص – 2:00 ص',
  phone: '+965 55161435',
  whatsapp: '96555161435',
  facebook: 'https://www.facebook.com/profile.php?id=61594738855830',
  instagram: 'https://www.instagram.com/yummyfriedchicken_kuwait',
  instagram_handle: '@yummyfriedchicken_kuwait',
  currency_en: 'KD',
  currency_ar: 'د.ك',
};

export const INITIAL_CATEGORIES = [
  {
    id: 'buckets-meals',
    name_en: 'Buckets & Meals',
    short_en: 'Buckets & Meals',
    name_ar: 'وجبات البوكيت',
    short_ar: 'وجبات البوكيت',
    section_en: 'Meals & Buckets',
    section_ar: 'وجبات وبوكيت',
    slug: 'buckets-meals',
    sort_order: 1,
    icon: 'Drumstick',
    image_url: '/buckets&meals/best-bucket.png',
  },
  {
    id: 'burgers',
    name_en: 'Burgers',
    short_en: 'Burgers',
    name_ar: 'برجر',
    short_ar: 'برجر',
    section_en: 'Burgers & Wraps',
    section_ar: 'برجر ورابس',
    slug: 'burgers',
    sort_order: 2,
    icon: 'Sandwich',
    image_url: '/burgers/Zinger-burger.png',
  },
  {
    id: 'signature-wraps',
    name_en: 'Twister & Wraps',
    short_en: 'Twister & Wraps',
    name_ar: 'تويستر ورابس',
    short_ar: 'تويستر ورابس',
    section_en: 'Burgers & Wraps',
    section_ar: 'برجر ورابس',
    slug: 'signature-wraps',
    sort_order: 3,
    icon: 'ScrollText',
    image_url: '/twister/yummy-twister-wrap.png',
  },
  {
    id: 'loaded-fries-sides',
    name_en: 'Loaded Fries & Sides',
    short_en: 'Loaded Fries',
    name_ar: 'بطاطس محملة ومقبلات',
    short_ar: 'بطاطس ومقبلات',
    section_en: 'Seafood & Sides',
    section_ar: 'بحريات ومقبلات',
    slug: 'loaded-fries-sides',
    sort_order: 4,
    icon: 'Utensils',
    image_url: '/loadedfries_sides/loaded-classic.png',
  },
  {
    id: 'strips-combos',
    name_en: 'Strips & Combos',
    short_en: 'Strips & Combos',
    name_ar: 'ستربس وكومبو',
    short_ar: 'ستربس وكومبو',
    section_en: 'Meals & Buckets',
    section_ar: 'وجبات وبوكيت',
    slug: 'strips-combos',
    sort_order: 5,
    icon: 'Flame',
    image_url: '/strips&combo/strip-combo.png',
  },
  {
    id: 'prawns-special',
    name_en: 'Prawns Special',
    short_en: 'Prawns Special',
    name_ar: 'روبيان سبيشل',
    short_ar: 'روبيان سبيشل',
    section_en: 'Seafood & Sides',
    section_ar: 'بحريات ومقبلات',
    slug: 'prawns-special',
    sort_order: 6,
    icon: 'Sparkles',
    image_url: '/prawns/golden-prawns.png',
  },
  {
    id: 'mojitos-juices',
    name_en: 'Mojitos & Juices',
    short_en: 'Mojitos & Juices',
    name_ar: 'موهيتو وعصائر',
    short_ar: 'موهيتو وعصائر',
    section_en: 'Drinks & Shakes',
    section_ar: 'مشروبات وميلك شيك',
    slug: 'mojitos-juices',
    sort_order: 7,
    icon: 'CupSoda',
    image_url: '/mojitos_juices/pineapple-mojito.png',
  },
  {
    id: 'frappe-shakes-lassi',
    name_en: 'Frappe, Shakes & Lassi',
    short_en: 'Frappe & Shakes',
    name_ar: 'فرابيه، ميلك شيك ولاسي',
    short_ar: 'فرابيه وشيك',
    section_en: 'Drinks & Shakes',
    section_ar: 'مشروبات وميلك شيك',
    slug: 'frappe-shakes-lassi',
    sort_order: 8,
    icon: 'IceCream',
    image_url: '/frappes_shakes/chocolate-frappe.png',
  },
];

export const INITIAL_MENU_ITEMS = [
  // ==================== 1. BUCKETS & MEALS ====================
  {
    id: 'item-bm-1',
    category_id: 'buckets-meals',
    name_en: 'Best Bucket (12 Pcs Family Bucket)',
    name_ar: 'بوكيت بيست العائلي (12 قطعة)',
    description_en:
      '12 Pcs Crispy Broasted Chicken\nLarge Family Fries Box\n2 Large Creamy Coleslaw\n5 Signature Garlic Dips & 5 Soft Buns\n1.25L Cold Pepsi',
    description_ar:
      '12 قطعة دجاج بروستد مقرمش\nبوكس بطاطس عائلي كبير\n2 كول سلو كريمي كبير\n5 صوص ثوم و 5 خبز طري\nبيبسي بارد 1.25 لتر',
    price: 5.950,
    original_price: 7.250,
    is_offer: true,
    offer_label_en: 'FAMILY DEAL',
    offer_label_ar: 'عرض العائلة',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/buckets&meals/best-bucket.png',
    image_url: '/buckets&meals/best-bucket.png',
  },
  {
    id: 'item-bm-2',
    category_id: 'buckets-meals',
    name_en: 'Jolly Meal (9 Pcs Bucket)',
    name_ar: 'وجبة جولي العائلية (9 قطع)',
    description_en:
      '9 Pcs Crunchy Fried Chicken\nFamily Golden Fries Box\n1 Large Creamy Coleslaw\n4 Garlic Sauces & 4 Soft Buns\n1.25L Cold Pepsi',
    description_ar:
      '9 قطع دجاج مقلي مقرمش\nبوكس بطاطس ذهبية عائلي\n1 كول سلو كريمي حجم كبير\n4 صوص ثوم و 4 خبز طري\nبيبسي بارد 1.25 لتر',
    price: 4.500,
    original_price: 5.250,
    is_offer: true,
    offer_label_en: 'HOT OFFER',
    offer_label_ar: 'عرض ساخن',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/buckets&meals/jolly-meal.png',
    image_url: '/buckets&meals/jolly-meal.png',
  },
  {
    id: 'item-bm-3',
    category_id: 'buckets-meals',
    name_en: 'Couples Cut (4 Pcs Meal)',
    name_ar: 'وجبة كابلز كات (4 قطع)',
    description_en:
      '4 Pcs Golden Broasted Chicken\nCrispy French Fries\nFresh Creamy Coleslaw\nGarlic Dip & 2 Warm Soft Buns\nCold Pepsi',
    description_ar:
      '4 قطع دجاج بروستد ذهبي\nبطاطس مقلية مقرمشة\nكول سلو كريمي طازج\nصوص ثوم و 2 خبز طازج\nبيبسي بارد',
    price: 2.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/buckets&meals/couples-cut.png',
    image_url: '/buckets&meals/couples-cut.png',
  },
  {
    id: 'item-bm-4',
    category_id: 'buckets-meals',
    name_en: 'Snacks Box (2 Pcs Crunch Box)',
    name_ar: 'بوكس سناكس مقرمش (قطعتين)',
    description_en:
      '2 Pcs Crispy Fried Chicken\nFresh Creamy Coleslaw\nSignature Garlic & Ketchup Dip\n1 Fresh Soft Bun',
    description_ar:
      'قطعتين دجاج مقلي مقرمش\nكول سلو كريمي طازج\nصوص ثوم وكاتشب\nقطعة خبز طري طازج',
    price: 1.350,
    original_price: 1.650,
    is_offer: true,
    offer_label_en: 'LUNCH SAVER',
    offer_label_ar: 'توفير الغداء',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/buckets&meals/snacks-box.png',
    image_url: '/buckets&meals/snacks-box.png',
  },
  {
    id: 'item-bm-5',
    category_id: 'buckets-meals',
    name_en: 'Trendy 20 Mega Bucket (20 Pcs)',
    name_ar: 'بوكيت ترندي 20 للحفلات (20 قطعة)',
    description_en:
      '20 Pcs Crispy Broasted Chicken\n2 Jumbo Family Fries Boxes\n2 Large Coleslaw Tubs\n6 Garlic Dips & 6 Soft Buns\n2 Family Cold Pepsis',
    description_ar:
      '20 قطعة دجاج بروستد مقرمش\n2 بوكس بطاطس عائلي جامبو\n2 علب كول سلو حجم كبير\n6 صوص ثوم و 6 خبز طري\n2 بيبسي عائلي بارد',
    price: 8.500,
    original_price: 9.950,
    is_offer: true,
    offer_label_en: 'PARTY OFFER',
    offer_label_ar: 'عرض الجمعات',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/buckets&meals/trendy-20.png',
    image_url: '/buckets&meals/trendy-20.png',
  },
  {
    id: 'item-bm-6',
    category_id: 'buckets-meals',
    name_en: 'Pears Hunt Meal (6 Pcs Box)',
    name_ar: 'وجبة بيرز هانت (6 قطع)',
    description_en:
      '6 Pcs Crispy Broasted Chicken\nLarge Golden French Fries\nFresh Creamy Coleslaw\n3 Garlic Dips & 3 Soft Buns\n1.25L Cold Pepsi',
    description_ar:
      '6 قطع دجاج بروستد مقرمش\nبطاطس مقلية ذهبية حجم كبير\nكول سلو كريمي طازج\n3 صوص ثوم و 3 خبز طري\nبيبسي بارد 1.25 لتر',
    price: 3.450,
    original_price: 3.950,
    is_offer: true,
    offer_label_en: 'SPECIAL DEAL',
    offer_label_ar: 'عرض مميز',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/buckets&meals/pears-hunt.png',
    image_url: '/buckets&meals/pears-hunt.png',
  },
  {
    id: 'item-bm-7',
    category_id: 'buckets-meals',
    name_en: 'Yummy Mix Combo Meal',
    name_ar: 'وجبة يمي ميكس المشكلة',
    description_en:
      '1 Crispy Zinger Chicken Burger\n3 Pcs Golden Broasted Chicken\n3 Pcs Crunchy Chicken Strips\nGolden Fries, Creamy Coleslaw & Dip\nChilled Pepsi Can',
    description_ar:
      '1 برجر دجاج زنجر مقرمش\n3 قطع دجاج بروستد ذهبي\n3 قطع ستربس دجاج مقرمش\nبطاطس ذهبية، كول سلو كريمي وصوص\nبيبسي بارد',
    price: 3.250,
    original_price: 3.750,
    is_offer: true,
    offer_label_en: 'ALL-IN-ONE',
    offer_label_ar: 'وجبة شاملة',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/buckets&meals/yummy-mix.png',
    image_url: '/buckets&meals/yummy-mix.png',
  },

  // ==================== 2. STRIPS & COMBOS ====================
  {
    id: 'item-sc-1',
    category_id: 'strips-combos',
    name_en: 'Strip Combo (5 Pcs Crispy Tenders)',
    name_ar: 'ستربس كومبو (5 قطع تندرز مقرمش)',
    description_en:
      '5 Pcs Pure Breast Chicken Tenders\nSeasoned Golden Fries\nHoney Mustard & Dynamite Dips\nWarm Soft Bun\nCold Soft Drink',
    description_ar:
      '5 قطع ستربس صدور دجاج صافية\nبطاطس ذهبية متبلة\nصوص هني ماسترد ودايناميت\nخبز طري دافئ\nمشروب غازي بارد',
    price: 2.150,
    original_price: 2.500,
    is_offer: true,
    offer_label_en: 'BESTSELLER',
    offer_label_ar: 'الأكثر مبيعاً',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/strips&combo/strip-combo.png',
    image_url: '/strips&combo/strip-combo.png',
  },
  {
    id: 'item-sc-2',
    category_id: 'strips-combos',
    name_en: 'Nuggets Combo (6 Pcs & Fries Meal)',
    name_ar: 'ناجتس كومبو (6 قطع وبطاطس)',
    description_en:
      '6 Pcs Golden Chicken Breast Nuggets\nCrispy French Fries\nWarm Cheddar Cheese & BBQ Dip\nChilled Soft Drink',
    description_ar:
      '6 قطع ناجتس صدور دجاج ذهبية\nبطاطس مقلية مقرمشة\nصوص جبن شيدر وباربكيو\nمشروب غازي بارد',
    price: 1.500,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/strips&combo/nuggets-combo.png',
    image_url: '/strips&combo/nuggets-combo.png',
  },
  {
    id: 'item-sc-3',
    category_id: 'strips-combos',
    name_en: 'Strip Box (Nashville Hot Tenders 6 Pcs)',
    name_ar: 'ستربس بوكس (تندرز ناشفيل الحار 6 قطع)',
    description_en:
      '6 Pcs Fiery Nashville Chicken Strips\nToasted Butter Texas Toast\nSeasoned Crinkle Fries\nCool Ranch Dip & Dill Pickles',
    description_ar:
      '6 قطع ستربس دجاج ناشفيل الحار\nتوست محمص بالزبدة\nبطاطس كرنكل متبلة\nصوص رانش بارد ومخلل',
    price: 2.650,
    original_price: 3.000,
    is_offer: true,
    offer_label_en: 'SPICY OFFER',
    offer_label_ar: 'عرض حار',
    is_available: true,
    is_popular: true,
    spicy_level: 3,
    url: '/strips&combo/strip-box.png',
    image_url: '/strips&combo/strip-box.png',
  },
  {
    id: 'item-sc-4',
    category_id: 'strips-combos',
    name_en: '4 Pcs Strip Combo Meal',
    name_ar: 'كومبو ستربس 4 قطع مع بطاطس ومشروب',
    description_en:
      '4 Pcs Crispy Chicken Tender Strips\nGolden French Fries\nSignature Garlic & Honey Dip\nSoft Bun & Chilled Drink',
    description_ar:
      '4 قطع ستربس دجاج مقرمش طري\nبطاطس مقلية ذهبية\nصوص ثوم وهني ماسترد مميز\nخبز طازج ومشروب بارد',
    price: 1.850,
    original_price: 2.150,
    is_offer: true,
    offer_label_en: 'COMBO DEAL',
    offer_label_ar: 'عرض كومبو',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/strips&combo/4pcs-strip-combo.png',
    image_url: '/strips&combo/4pcs-strip-combo.png',
  },
  {
    id: 'item-sc-5',
    category_id: 'strips-combos',
    name_en: 'Kids Meal (Crunch Tenders Box)',
    name_ar: 'وجبة أطفال (بوكس تندرز مقرمش)',
    description_en:
      '3 Pcs Golden Tender Chicken Strips\nCrispy Kid-Cut French Fries\nTomato Ketchup & Creamy Dip\nFruit Juice Box & Toy Surprise',
    description_ar:
      '3 قطع ستربس دجاج ذهبية طرية\nبطاطس مقلية مقرمشة للأطفال\nكاتشب طماطم وصوص كريمي\nعلبة عصير فواكه طبيعي ومفاجأة',
    price: 1.350,
    original_price: 1.600,
    is_offer: true,
    offer_label_en: 'KIDS SPECIAL',
    offer_label_ar: 'وجبة أطفال',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/strips&combo/kids-meal.png',
    image_url: '/strips&combo/kids-meal.png',
  },

  // ==================== 3. BURGERS ====================
  {
    id: 'item-bg-1',
    category_id: 'burgers',
    name_en: 'Zinger Burger',
    name_ar: 'برجر زنجر كرانش',
    description_en:
      'Crispy Fried Chicken Breast Fillet\nAmerican Cheddar Cheese\nCrisp Fresh Lettuce & Creamy Sauce\nToasted Golden Brioche Bun',
    description_ar:
      'فيليه صدر دجاج مقرمش وذهبي\nشريحة جبن شيدر أمريكي\nخس طازج مقرمش وصوص كريمي\nخبز بريوش محمص طري',
    price: 1.500,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 2,
    url: '/burgers/Zinger-burger.png',
    image_url: '/burgers/Zinger-burger.png',
  },
  {
    id: 'item-bg-2',
    category_id: 'burgers',
    name_en: 'Zinger Burger Combo Meal',
    name_ar: 'وجبة كومبو برجر زنجر',
    description_en:
      'Crispy Zinger Chicken Burger\nGolden Crispy French Fries\nCreamy Ketchup & Garlic Dip\nCold Chilled Soft Drink',
    description_ar:
      'برجر دجاج زنجر مقرمش ولذيذ\nبطاطس مقلية ذهبية مقرمشة\nكاتشب وصوص ثوم كريمي\nمشروب غازي بارد منعش',
    price: 1.950,
    original_price: 2.300,
    is_offer: true,
    offer_label_en: 'COMBO MEAL',
    offer_label_ar: 'وجبة كومبو',
    is_available: true,
    is_popular: true,
    spicy_level: 2,
    url: '/burgers/Zinger-burger-combo.png',
    image_url: '/burgers/Zinger-burger-combo.png',
  },
  {
    id: 'item-bg-3',
    category_id: 'burgers',
    name_en: 'Double Patty Zinger Burger',
    name_ar: 'برجر دبل باتي زنجر',
    description_en:
      '2 Crispy Chicken Breast Fillets\nDouble Melted American Cheddar\nCrisp Fresh Lettuce & Creamy Mayo\nToasted Golden Brioche Bun',
    description_ar:
      'قطعتان فيليه صدر دجاج مقرمش\nدبل جبن شيدر أمريكي ذائب\nخس طازج مقرمش ومايونيز كريمي\nخبز بريوش محمص طري',
    price: 2.100,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 2,
    url: '/burgers/Double-pat-zinger-burger.png',
    image_url: '/burgers/Double-pat-zinger-burger.png',
  },
  {
    id: 'item-bg-4',
    category_id: 'burgers',
    name_en: 'Double Patty Zinger Burger Combo',
    name_ar: 'وجبة كومبو دبل باتي زنجر برجر',
    description_en:
      '2 Crispy Chicken Breast Fillets Burger\nGolden Crispy French Fries\nCreamy Ketchup Dip\nCold Chilled Soft Drink',
    description_ar:
      'برجر قطعتين فيليه دجاج مقرمش\nبطاطس مقلية ذهبية مقرمشة\nصوص كاتشب كريمي\nمشروب غازي بارد منعش',
    price: 2.650,
    original_price: 3.100,
    is_offer: true,
    offer_label_en: 'SUPER COMBO',
    offer_label_ar: 'سوبر كومبو',
    is_available: true,
    is_popular: true,
    spicy_level: 2,
    url: '/burgers/Double-pat-zinger-burger-combo.png',
    image_url: '/burgers/Double-pat-zinger-burger-combo.png',
  },
  {
    id: 'item-bg-5',
    category_id: 'burgers',
    name_en: 'Dynamite Burger',
    name_ar: 'برجر دايناميت سبايسي',
    description_en:
      'Spicy Crispy Chicken Breast Fillet\nMelted American Cheddar Cheese\nFiery Creamy Dynamite Glaze & Lettuce\nToasted Soft Brioche Bun',
    description_ar:
      'صدر دجاج مقلي مقرمش حار\nجبن شيدر أمريكي ذائب\nصوص دايناميت كريمي حار وخس طازج\nخبز بريوش محمص طري',
    price: 1.750,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 3,
    url: '/burgers/Dynamite-burger.png',
    image_url: '/burgers/Dynamite-burger.png',
  },
  {
    id: 'item-bg-6',
    category_id: 'burgers',
    name_en: 'Dynamite Burger Combo Meal',
    name_ar: 'وجبة كومبو برجر دايناميت',
    description_en:
      'Fiery Dynamite Chicken Burger\nGolden Crispy French Fries\nSignature Dipping Sauce\nCold Chilled Soft Drink',
    description_ar:
      'برجر دجاج دايناميت سبايسي شهي\nبطاطس مقلية ذهبية مقرمشة\nصوص تغميس مميز\nمشروب غازي بارد منعش',
    price: 2.250,
    original_price: 2.600,
    is_offer: true,
    offer_label_en: 'FIERY COMBO',
    offer_label_ar: 'كومبو حار',
    is_available: true,
    is_popular: true,
    spicy_level: 3,
    url: '/burgers/Dynamite-burger-combo.png',
    image_url: '/burgers/Dynamite-burger-combo.png',
  },

  // ==================== 4. PRAWNS SPECIAL ====================
  {
    id: 'item-ps-1',
    category_id: 'prawns-special',
    name_en: 'Golden Prawns Box',
    name_ar: 'بوكس روبيان ذهبي مقرمش',
    description_en:
      'Crispy Golden Fried Butterfly Prawns\nCrispy French Fries & Warm Bun\nCreamy Garlic Dip & Ketchup',
    description_ar:
      'قطع روبيان ذهبية مقلية مقرمشة\nبطاطس مقلية مقرمشة وخبز طازج\nصوص ثوم كريمي وكاتشب',
    price: 2.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/prawns/golden-prawns.png',
    image_url: '/prawns/golden-prawns.png',
  },
  {
    id: 'item-ps-2',
    category_id: 'prawns-special',
    name_en: 'Ultimate Prawns Box (Mega Meal)',
    name_ar: 'وجبة ألتميت روبيان بوكس (ميجا)',
    description_en:
      'Large Box of Crispy Golden Butterfly Prawns\nFamily Fries & 2 Soft Warm Buns\nTartar Sauce, Garlic Dip & Ketchup',
    description_ar:
      'بوكس عائلي كبير روبيان مقلي ذهبي\nبطاطس عائلية و2 خبز طازج\nصوص تارتار، ثوم وكاتشب',
    price: 3.450,
    original_price: 3.950,
    is_offer: true,
    offer_label_en: 'MEGA BOX',
    offer_label_ar: 'ميجا بوكس',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/prawns/ultimate-prawns-box.png',
    image_url: '/prawns/ultimate-prawns-box.png',
  },
  {
    id: 'item-ps-3',
    category_id: 'prawns-special',
    name_en: 'Crispy Prawns Burger',
    name_ar: 'برجر روبيان مقرمش',
    description_en:
      'Crispy Fried Gulf Prawns Fillet\nFresh Crisp Lettuce & Special Sauce\nCreamy Garlic Mayo on Brioche Bun',
    description_ar:
      'روبيان خليجي مقرمش ولذيذ\nخس مقرمش وصوص يمي المميز\nمايونيز كريمي في خبز بريوش طري',
    price: 1.750,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/prawns/prawns-burger.png',
    image_url: '/prawns/prawns-burger.png',
  },
  {
    id: 'item-ps-4',
    category_id: 'prawns-special',
    name_en: 'Dynamite Prawns Burger',
    name_ar: 'برجر روبيان دايناميت سبايسي',
    description_en:
      'Crispy Prawns Coated in Fiery Dynamite Sauce\nMelted American Cheddar Slice\nFresh Crisp Lettuce on Soft Bun',
    description_ar:
      'روبيان مقرمش بصوص دايناميت حار ولذيذ\nشريحة جبن شيدر أمريكي ذائبة\nخس مقرمش طازج في خبز طري',
    price: 1.950,
    original_price: 2.250,
    is_offer: true,
    offer_label_en: 'SPICY FAVORITE',
    offer_label_ar: 'الأكثر طلباً',
    is_available: true,
    is_popular: true,
    spicy_level: 2,
    url: '/prawns/prawns-dynamite.png',
    image_url: '/prawns/prawns-dynamite.png',
  },
  {
    id: 'item-ps-5',
    category_id: 'prawns-special',
    name_en: 'Crispy Prawns Sub Sandwich',
    name_ar: 'ساندوتش صب روبيان مقرمش',
    description_en:
      'Crispy Butterfly Prawns in Long Hoagie Roll\nCrisp Lettuce, Garlic Spread & Secret Sauce',
    description_ar:
      'روبيان باترفلاي مقرمش في خبز صب طويل\nخس طازج ومسحة ثوم وصوص خاص',
    price: 1.650,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 1,
    url: '/prawns/prawns-sandwich.png',
    image_url: '/prawns/prawns-sandwich.png',
  },
  {
    id: 'item-ps-6',
    category_id: 'prawns-special',
    name_en: 'Prawns Twister Wrap',
    name_ar: 'راب روبيان تويستر مقرمش',
    description_en:
      'Crispy Golden Prawns & Fresh Diced Tomatoes\nCrisp Lettuce & Creamy Tartar Sauce in Grilled Tortilla',
    description_ar:
      'روبيان ذهبي مقرمش وطماطم طازجة\nخس مقرمش وصوص تارتار في خبز تورتيلا محمص',
    price: 1.500,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/prawns/prawns-wrap.png',
    image_url: '/prawns/prawns-wrap.png',
  },

  // ==================== 5. SIGNATURE WRAPS ====================
  {
    id: 'item-sw-1',
    category_id: 'signature-wraps',
    name_en: 'Yummy Twister Wrap',
    name_ar: 'تويستر راب يمي كرانش',
    description_en:
      'Crispy Chicken Breast Strips\nFresh Crisp Lettuce & Diced Tomatoes\nMelted American Cheddar\nPepper Mayo in Toasted Tortilla',
    description_ar:
      'ستربس صدور دجاج مقرمشة\nخس طازج مقرمش وطماطم\nجبن شيدر أمريكي ذائب\nمايونيز بالفلفل في تورتيلا محمصة',
    price: 1.250,
    original_price: 1.500,
    is_offer: true,
    offer_label_en: 'POPULAR',
    offer_label_ar: 'عرض مميز',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/twister/yummy-twister-wrap.png',
    image_url: '/twister/yummy-twister-wrap.png',
  },
  {
    id: 'item-sw-2',
    category_id: 'signature-wraps',
    name_en: 'Yummy Chicken Wrap',
    name_ar: 'راب دجاج يمي كرانش',
    description_en:
      'Golden Crispy Chicken Strips\nCrisp Lettuce & Garlic Mayo Sauce\nRolled in Warm Toasted Tortilla',
    description_ar:
      'ستربس دجاج ذهبية مقرمشة\nخس طازج وصوص مايونيز بالثوم\nملفوفة في خبز تورتيلا محمص',
    price: 1.350,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/twister/yummy-chicken-wrap.png',
    image_url: '/twister/yummy-chicken-wrap.png',
  },
  {
    id: 'item-sw-3',
    category_id: 'signature-wraps',
    name_en: 'Twister / Yummy Chicken Wrap Combo',
    name_ar: 'وجبة كومبو تويستر / راب دجاج يمي',
    description_en:
      'Crispy Chicken Wrap or Twister\nGolden Crispy French Fries\nCreamy Ketchup Dip\nCold Chilled Soft Drink',
    description_ar:
      'راب دجاج أو تويستر مقرمش ولذيذ\nبطاطس مقلية ذهبية مقرمشة\nصوص كاتشب للتغميس\nمشروب غازي بارد منعش',
    price: 1.850,
    original_price: 2.150,
    is_offer: true,
    offer_label_en: 'COMBO DEAL',
    offer_label_ar: 'عرض كومبو',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/twister/yummy-chicken-wrap-combo.png',
    image_url: '/twister/yummy-chicken-wrap-combo.png',
  },

  // ==================== 6. LOADED FRIES & SIDES ====================
  {
    id: 'item-lf-1',
    category_id: 'loaded-fries-sides',
    name_en: 'Classic Loaded Fries',
    name_ar: 'بطاطس كلاسيك محملة',
    description_en:
      'Crispy Golden Crinkle Fries\nDiced Crunchy Chicken & Melted Cheddar\nSignature House Sauce & Jalapeños',
    description_ar:
      'بطاطس مقرمشة ذهبية\nقطع دجاج كرانشي وجبن شيدر ذائب\nصوص يمي المميز وهالبينو',
    price: 1.450,
    original_price: 1.750,
    is_offer: true,
    offer_label_en: 'BEST SELLER',
    offer_label_ar: 'الأكثر طلباً',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/loadedfries_sides/loaded-classic.png',
    image_url: '/loadedfries_sides/loaded-classic.png',
  },
  {
    id: 'item-lf-2',
    category_id: 'loaded-fries-sides',
    name_en: 'Cheesy Loaded Fries',
    name_ar: 'بطاطس محملة بالجبن',
    description_en:
      'Crispy Crinkle Fries Smothered in Warm Cheddar\nSpecial Yummy Sauce Blend\nSprinkled with Savory Herbs',
    description_ar:
      'بطاطس مقرمشة مغطاة بصوص جبن الشيدر الدافئ\nمزيج صوص يمي الخاص\nمرشوشة بالأعشاب اللذيذة',
    price: 1.350,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/loadedfries_sides/cheesy-loaded.png',
    image_url: '/loadedfries_sides/cheesy-loaded.png',
  },
  {
    id: 'item-lf-3',
    category_id: 'loaded-fries-sides',
    name_en: 'Loaded Fries Combo Meal',
    name_ar: 'وجبة كومبو بطاطس محملة',
    description_en:
      'Full Loaded Chicken Fries\nServed with Refreshing Chilled Drink\nExtra Dip of Your Choice',
    description_ar:
      'بطاطس محملة بقطع الدجاج والجبن\nتقدم مع مشروب بارد منعش\nصوص تغميس إضافي حسب اختيارك',
    price: 1.950,
    original_price: 2.250,
    is_offer: true,
    offer_label_en: 'COMBO VALUE',
    offer_label_ar: 'قيمة التوفير',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/loadedfries_sides/loaded-fries-combo.png',
    image_url: '/loadedfries_sides/loaded-fries-combo.png',
  },
  {
    id: 'item-lf-4',
    category_id: 'loaded-fries-sides',
    name_en: 'Mozzarella Sticks',
    name_ar: 'أصابع موزاريلا مقرمشة',
    description_en:
      'Golden Herb-Crusted Mozzarella Sticks (6 Pcs)\nGooey Melt-in-Your-Mouth Center\nServed with Rich Marinara Dip',
    description_ar:
      'أصابع جبنة موزاريلا ذهبية مقرمشة (6 قطع)\nمحشوة بجبنة ذائبة غنية\nتقدم مع صوص مارينارا اللذيذ',
    price: 1.150,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/loadedfries_sides/mozzarella-stick.png',
    image_url: '/loadedfries_sides/mozzarella-stick.png',
  },
  {
    id: 'item-lf-5',
    category_id: 'loaded-fries-sides',
    name_en: 'Crispy Chicken Popcorn',
    name_ar: 'بوب كورن دجاج مقرمش',
    description_en:
      'Crispy Golden Bite-Sized Chicken Bites\nTossed in Secret Yummy Spices\nServed with Tangy Dipping Sauce',
    description_ar:
      'قطع دجاج مقرمشة بحجم اللقمة\nمتبلة بخلطة بهارات يمي السرية\nتقدم مع صوص تغميس شهي',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 1,
    url: '/loadedfries_sides/popcorn.png',
    image_url: '/loadedfries_sides/popcorn.png',
  },
  {
    id: 'item-lf-6',
    category_id: 'loaded-fries-sides',
    name_en: 'Chicken Nuggets (7 Pcs)',
    name_ar: 'ناجتس دجاج (7 قطع)',
    description_en:
      '7 Pcs Golden Crispy Chicken Nuggets\nTender Chicken Inside, Crunchy Outside\nServed with Tangy BBQ or Garlic Dip',
    description_ar:
      '7 قطع ناجتس دجاج ذهبية مقرمشة\nدجاج طري من الداخل ومقرمش من الخارج\nتقدم مع صوص الباربكيو أو الثوم',
    price: 0.850,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/loadedfries_sides/nuggets-7pcs.png',
    image_url: '/loadedfries_sides/nuggets-7pcs.png',
  },
  {
    id: 'item-lf-7',
    category_id: 'loaded-fries-sides',
    name_en: 'Chicken Nuggets (15 Pcs)',
    name_ar: 'ناجتس دجاج (15 قطعة)',
    description_en:
      '15 Pcs Sharing Box of Golden Nuggets\nPerfect for Sharing with Friends & Family\nServed with 2 Signature Dips',
    description_ar:
      'علبة مشاركة 15 قطعة ناجتس ذهبية\nمثالية للمشاركة مع العائلة والأصدقاء\nتقدم مع صوصين مميزين',
    price: 1.650,
    original_price: 1.850,
    is_offer: true,
    offer_label_en: 'SHARE BOX',
    offer_label_ar: 'بوكس المشاركة',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/loadedfries_sides/nuggets-15pcs.png',
    image_url: '/loadedfries_sides/nuggets-15pcs.png',
  },
  {
    id: 'item-lf-8',
    category_id: 'loaded-fries-sides',
    name_en: 'Crispy Onion Rings (Small)',
    name_ar: 'حلقات بصل مقرمشة (صغير)',
    description_en:
      'Freshly Battered Golden Onion Rings\nExtra Crunchy Texture with Savory Seasoning\nServed with House Dipping Sauce',
    description_ar:
      'حلقات بصل طازجة ومقرمشة ومقلية بلون ذهبي\nمتبلة ببهارات شهية\nتقدم مع صوص التغميس الخاص',
    price: 0.650,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/loadedfries_sides/onion-rings-small.png',
    image_url: '/loadedfries_sides/onion-rings-small.png',
  },
  {
    id: 'item-lf-9',
    category_id: 'loaded-fries-sides',
    name_en: 'Crispy Onion Rings (Big)',
    name_ar: 'حلقات بصل مقرمشة (كبير)',
    description_en:
      'Large Portion of Golden Onion Rings\nCrispy Double-Coated Batter\nServed with 2 Delicious Dips',
    description_ar:
      'حصة كبيرة من حلقات البصل الذهبية المقرمشة\nتغليفة مقرمشة مضاعفة\nتقدم مع صوصين لذيذين',
    price: 1.050,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/loadedfries_sides/onion-rings-big.png',
    image_url: '/loadedfries_sides/onion-rings-big.png',
  },
  {
    id: 'item-lf-10',
    category_id: 'loaded-fries-sides',
    name_en: 'French Fries (Small)',
    name_ar: 'بطاطس مقلية (صغير)',
    description_en:
      'Classic Golden Hot French Fries\nCrispy Exterior with Fluffy Potato Inside\nLightly Salted to Perfection',
    description_ar:
      'بطاطس مقلية كلاسيكية ذهبية وساخنة\nمقرمشة من الخارج وهشة من الداخل\nمملحة بتوازن مثالي',
    price: 0.500,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/loadedfries_sides/french-fries-small.png',
    image_url: '/loadedfries_sides/french-fries-small.png',
  },
  {
    id: 'item-lf-11',
    category_id: 'loaded-fries-sides',
    name_en: 'French Fries (Medium)',
    name_ar: 'بطاطس مقلية (وسط)',
    description_en:
      'Medium Portion of Golden French Fries\nServed Piping Hot & Crispy\nGreat Companion to Any Burger or Meal',
    description_ar:
      'حصة وسط من البطاطس المقلية الذهبية\nتقدم ساخنة ومقرمشة\nرفيق مثالي لأي ساندوتش أو وجبة',
    price: 0.750,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/loadedfries_sides/french-fries-medium.png',
    image_url: '/loadedfries_sides/french-fries-medium.png',
  },
  {
    id: 'item-lf-12',
    category_id: 'loaded-fries-sides',
    name_en: 'French Fries (Family Box)',
    name_ar: 'بطاطس مقلية (بوكس عائلي)',
    description_en:
      'Family-Sized Giant Box of Crispy French Fries\nFreshly Fried and Generously Salted\nIdeal for the Whole Family',
    description_ar:
      'بوكس عائلي كبير جداً من البطاطس المقرمشة\nطازجة وساخنة ومملحة بتوازن\nمثالي لجميع أفراد العائلة',
    price: 1.350,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    spicy_level: 0,
    url: '/loadedfries_sides/french-fries-family.png',
    image_url: '/loadedfries_sides/french-fries-family.png',
  },
  {
    id: 'item-lf-13',
    category_id: 'loaded-fries-sides',
    name_en: 'Add-On Dips & Sauces',
    name_ar: 'إضافات الصصوصات والتغميسات',
    description_en:
      'Selection of Signature Yummy Sauces\nDynamite, Cheddar Cheese, Garlic Mayo, BBQ\nElevate Every Bite',
    description_ar:
      'تشكيلة صوصات يمي المميزة اللذيذة\nدايناميت، جبن شيدر، مايونيز بالثوم، باربكيو\nتضفي نكهة رائعة لكل لقمة',
    price: 0.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    url: '/loadedfries_sides/add-on-dips&sauces.png',
    image_url: '/loadedfries_sides/add-on-dips&sauces.png',
  },

  // ==================== 7. MOJITOS & JUICES ====================
  // Sub-category: Mojito (Price: 1.250 KD) - 9 items
  {
    id: 'item-mj-pineapple',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Pineapple',
    name_ar: 'أناناس',
    description_en: 'Fresh Pineapple Chunks, Mint Leaves, Lime & Sparkling Soda',
    description_ar: 'قطع أناناس طازجة، أوراق نعناع، ليمون وصودا فوارة',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/pineapple-mojito.png',
    url: '/mojitos_juices/pineapple-mojito.png',
  },
  {
    id: 'item-mj-lychee',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Lychee',
    name_ar: 'ليتشي',
    description_en: 'Sweet Exotic Lychee Fruit, Garden Mint & Citrus Soda',
    description_ar: 'فاكهة الليتشي الاستوائية، نعناع طازج وصودا حمضيات',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/lychee-mojito.png',
    url: '/mojitos_juices/lychee-mojito.png',
  },
  {
    id: 'item-mj-mint-lime',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Mint Lime',
    name_ar: 'ليمون ونعناع',
    description_en: 'Classic Muddled Mint Leaves, Fresh Squeezed Lime & Soda',
    description_ar: 'نعناع مهروس طازج، شرائح ليمون معصور وصودا فوارة',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/mint-lime-mojito.png',
    url: '/mojitos_juices/mint-lime-mojito.png',
  },
  {
    id: 'item-mj-blue-zesty',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Blue Zesty',
    name_ar: 'بلو زيستي',
    description_en: 'Blue Curaçao Citrus Splash, Garden Mint & Ice-Cold Soda',
    description_ar: 'سيرب بلو كوراساو، حمضيات منعشة، نعناع وصودا مثلجة',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/blue-zesty-mojito.png',
    url: '/mojitos_juices/blue-zesty-mojito.png',
  },
  {
    id: 'item-mj-passion-fruit',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Passion Fruit',
    name_ar: 'باشن فروت',
    description_en: 'Tropical Passion Fruit Pulp, Fresh Mint & Sparkling Soda',
    description_ar: 'لب باشن فروت استوائي، نعناع طازج وصودا فوارة',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/passion-fruit-mojito.png',
    url: '/mojitos_juices/passion-fruit-mojito.png',
  },
  {
    id: 'item-mj-mango',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Mango',
    name_ar: 'مانجو',
    description_en: 'Ripe Sweet Mango, Garden Mint, Lime & Sparkling Soda',
    description_ar: 'قطع مانجو حلوة، نعناع طازج، ليمون وصودا فوارة',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/mango-mojito.png',
    url: '/mojitos_juices/mango-mojito.png',
  },
  {
    id: 'item-mj-blueberry',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Blueberry',
    name_ar: 'بلوبيري',
    description_en: 'Wild Mountain Blueberries, Fresh Mint & Sparkling Soda',
    description_ar: 'توت أزرق بري، أوراق نعناع وصودا فوارة منعشة',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/blueberry-mojito.png',
    url: '/mojitos_juices/blueberry-mojito.png',
  },
  {
    id: 'item-mj-watermelon',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Watermelon',
    name_ar: 'بطيخ',
    description_en: 'Crisp Juicy Watermelon, Muddled Mint & Chilled Soda',
    description_ar: 'بطيخ طازج مقرمش، نعناع وصودا مثلجة منعشة',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/watermelon-mojito.png',
    url: '/mojitos_juices/watermelon-mojito.png',
  },
  {
    id: 'item-mj-strawberry',
    category_id: 'mojitos-juices',
    sub_category: 'Mojito',
    sub_category_ar: 'موهيتو',
    name_en: 'Strawberry',
    name_ar: 'فراولة',
    description_en: 'Fresh Farm Strawberries, Mint Leaves, Lime & Soda',
    description_ar: 'فراولة طازجة من المزرعة، نعناع، ليمون وصودا',
    price: 1.250,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/strawberry-mojito.png',
    url: '/mojitos_juices/strawberry-mojito.png',
  },

  // Sub-category: Juice (Price: 1.000 KD) - 5 items
  {
    id: 'item-j-mango',
    category_id: 'mojitos-juices',
    sub_category: 'Juice',
    sub_category_ar: 'عصير',
    name_en: 'Mango',
    name_ar: 'مانجو',
    description_en: '100% Pure Fresh Sweet Mango Juice',
    description_ar: 'عصير مانجو طبيعي طازج ولذيذ 100%',
    price: 1.000,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/mango-juice.png',
    url: '/mojitos_juices/mango-juice.png',
  },
  {
    id: 'item-j-strawberry',
    category_id: 'mojitos-juices',
    sub_category: 'Juice',
    sub_category_ar: 'عصير',
    name_en: 'Strawberry',
    name_ar: 'فراولة',
    description_en: 'Fresh Pressed Sweet Red Strawberries',
    description_ar: 'عصير فراولة حمراء طازجة حلوة',
    price: 1.000,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/strawberry-juice.png',
    url: '/mojitos_juices/strawberry-juice.png',
  },
  {
    id: 'item-j-avocado',
    category_id: 'mojitos-juices',
    sub_category: 'Juice',
    sub_category_ar: 'عصير',
    name_en: 'Avocado',
    name_ar: 'أفوكادو',
    description_en: 'Rich Creamy Hass Avocado Fresh Juice',
    description_ar: 'عصير أفوكادو هاس كريمي طازج وغني',
    price: 1.000,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/avocado-juice.png',
    url: '/mojitos_juices/avocado-juice.png',
  },
  {
    id: 'item-j-cocktail',
    category_id: 'mojitos-juices',
    sub_category: 'Juice',
    sub_category_ar: 'عصير',
    name_en: 'Cocktail',
    name_ar: 'كوكتيل',
    description_en: 'Fresh Seasonal Mixed Fruit Cocktail Juice',
    description_ar: 'عصير كوكتيل فواكه مشكلة طازجة',
    price: 1.000,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/cocktail-juice.png',
    url: '/mojitos_juices/cocktail-juice.png',
  },
  {
    id: 'item-j-orange',
    category_id: 'mojitos-juices',
    sub_category: 'Juice',
    sub_category_ar: 'عصير',
    name_en: 'Orange',
    name_ar: 'برتقال',
    description_en: '100% Freshly Squeezed Valencia Oranges',
    description_ar: 'عصير برتقال فالنسيا معصور طازج 100%',
    price: 1.000,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/mojitos_juices/orange-juice.png',
    url: '/mojitos_juices/orange-juice.png',
  },

  // ==================== 8. FRAPPE, SHAKES & LASSI ====================
  // Sub-category: Frappe (Price: 1.500 KD) - 3 items
  {
    id: 'item-fsl-frappe-chocolate',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Frappe',
    sub_category_ar: 'فرابيه',
    name_en: 'Chocolate',
    name_ar: 'شوكولاتة',
    description_en: 'Rich Belgian Chocolate Blended Frappe',
    description_ar: 'فرابيه شوكولاتة بلجيكية غنية مع الكريمة',
    price: 1.500,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/chocolate-frappe.png',
    url: '/frappes_shakes/chocolate-frappe.png',
  },
  {
    id: 'item-fsl-frappe-strawberry',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Frappe',
    sub_category_ar: 'فرابيه',
    name_en: 'Strawberry',
    name_ar: 'فراولة',
    description_en: 'Creamy Strawberry Ice Blended Frappe',
    description_ar: 'فرابيه فراولة مثلجة كريمية',
    price: 1.500,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/strawberry-frappe.png',
    url: '/frappes_shakes/strawberry-frappe.png',
  },
  {
    id: 'item-fsl-frappe-caramel',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Frappe',
    sub_category_ar: 'فرابيه',
    name_en: 'Caramel',
    name_ar: 'كراميل',
    description_en: 'Golden Buttery Caramel Frappe',
    description_ar: 'فرابيه كراميل ذهبي غني ولذيذ',
    price: 1.500,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/caramel-frappe.png',
    url: '/frappes_shakes/caramel-frappe.png',
  },

  // Sub-category: Shake (Price: 1.350 KD) - 3 items
  {
    id: 'item-fsl-shake-avocado',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Shake',
    sub_category_ar: 'ميلك شيك',
    name_en: 'Avocado Shake',
    name_ar: 'ميلك شيك أفوكادو',
    description_en: 'Rich Avocado Shake with Honey & Milk',
    description_ar: 'ميلك شيك أفوكادو غني بالحليب والعسل',
    price: 1.350,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/avocado-shake.png',
    url: '/frappes_shakes/avocado-shake.png',
  },
  {
    id: 'item-fsl-shake-coconut',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Shake',
    sub_category_ar: 'ميلك شيك',
    name_en: 'Tender Coconut Shake',
    name_ar: 'ميلك شيك جوز هند طري',
    description_en: 'Fresh Coastal Tender Coconut Pulp & Milk',
    description_ar: 'ميلك شيك جوز هند ساحلي طري ومنعش',
    price: 1.350,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/tender-coconut-shake.png',
    url: '/frappes_shakes/tender-coconut-shake.png',
  },
  {
    id: 'item-fsl-shake-chikku',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Shake',
    sub_category_ar: 'ميلك شيك',
    name_en: 'Chikku Shake',
    name_ar: 'ميلك شيك شيكو (سابوديا)',
    description_en: 'Sweet Sapodilla Chikku Shake',
    description_ar: 'ميلك شيك فاكهة الشيكو (سابوديلا) الحلوة',
    price: 1.350,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/chikku-shake.png',
    url: '/frappes_shakes/chikku-shake.png',
  },

  // Sub-category: Lassi (Price: 0.750 KD) - 4 items
  {
    id: 'item-fsl-lassi-mango',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Lassi',
    sub_category_ar: 'لاسي',
    name_en: 'Mango',
    name_ar: 'مانجو',
    description_en: 'Traditional Chilled Mango Yogurt Lassi',
    description_ar: 'لاسي روب بارد بالمانجو اللذيذ',
    price: 0.750,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/mango-lassi.png',
    url: '/frappes_shakes/mango-lassi.png',
  },
  {
    id: 'item-fsl-lassi-strawberry',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Lassi',
    sub_category_ar: 'لاسي',
    name_en: 'Strawberry',
    name_ar: 'فراولة',
    description_en: 'Sweet Strawberry Creamy Yogurt Lassi',
    description_ar: 'لاسي روب كريمي بالفراولة المنعشة',
    price: 0.750,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: true,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/strawberry-lassi.png',
    url: '/frappes_shakes/strawberry-lassi.png',
  },
  {
    id: 'item-fsl-lassi-plain',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Lassi',
    sub_category_ar: 'لاسي',
    name_en: 'Lassi Plain',
    name_ar: 'لاسي سادة كلاسيكي',
    description_en: 'Authentic Sweet Cardamom Plain Lassi',
    description_ar: 'لاسي روب تقليدي حلو مع الهيل',
    price: 0.750,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/plain-lassi.png',
    url: '/frappes_shakes/plain-lassi.png',
  },
  {
    id: 'item-fsl-lassi-rose',
    category_id: 'frappe-shakes-lassi',
    sub_category: 'Lassi',
    sub_category_ar: 'لاسي',
    name_en: 'Lassi Rose',
    name_ar: 'لاسي بالورد',
    description_en: 'Fragrant Damascus Rose Yogurt Lassi',
    description_ar: 'لاسي روب منعش بماء الورد الدمشقي',
    price: 0.750,
    original_price: null,
    is_offer: false,
    offer_label_en: '',
    offer_label_ar: '',
    is_available: true,
    is_popular: false,
    is_beverage: true,
    spicy_level: 0,
    image_url: '/frappes_shakes/rose-lassi.png',
    url: '/frappes_shakes/rose-lassi.png',
  },
];

/**
 * Universal Seed Item ID to Image Map across all categories.
 * Maps both string IDs ('item-bm-1') and Supabase numeric IDs (1..46).
 * Enforces strict separation between Best Bucket (/buckets&meals/best-bucket.png)
 * and Pears Hunt (/buckets&meals/pears-hunt.png).
 */
export const SEED_ITEM_IMAGE_BY_ID = {
  ...Object.fromEntries(
    INITIAL_MENU_ITEMS.map((item) => [item.id, item.image_url || item.url])
  ),
  // Supabase Database IDs 1-46 mapping
  1: '/buckets&meals/best-bucket.png',
  '1': '/buckets&meals/best-bucket.png',
  2: '/buckets&meals/pears-hunt.png',
  '2': '/buckets&meals/pears-hunt.png',
  3: '/buckets&meals/couples-cut.png',
  '3': '/buckets&meals/couples-cut.png',
  4: '/buckets&meals/jolly-meal.png',
  '4': '/buckets&meals/jolly-meal.png',
  5: '/buckets&meals/snacks-box.png',
  '5': '/buckets&meals/snacks-box.png',
  6: '/buckets&meals/yummy-mix.png',
  '6': '/buckets&meals/yummy-mix.png',
  7: '/buckets&meals/trendy-20.png',
  '7': '/buckets&meals/trendy-20.png',
  8: '/strips&combo/strip-combo.png',
  '8': '/strips&combo/strip-combo.png',
  9: '/strips&combo/4pcs-strip-combo.png',
  '9': '/strips&combo/4pcs-strip-combo.png',
  10: '/strips&combo/strip-box.png',
  '10': '/strips&combo/strip-box.png',
  11: '/strips&combo/kids-meal.png',
  '11': '/strips&combo/kids-meal.png',
  12: '/strips&combo/nuggets-combo.png',
  '12': '/strips&combo/nuggets-combo.png',
  13: '/burgers/Zinger-burger.png',
  '13': '/burgers/Zinger-burger.png',
  14: '/burgers/Zinger-burger-combo.png',
  '14': '/burgers/Zinger-burger-combo.png',
  15: '/burgers/Dynamite-burger.png',
  '15': '/burgers/Dynamite-burger.png',
  16: '/burgers/Dynamite-burger-combo.png',
  '16': '/burgers/Dynamite-burger-combo.png',
  17: '/burgers/Double-pat-zinger-burger.png',
  '17': '/burgers/Double-pat-zinger-burger.png',
  18: '/burgers/Zinger-burger-combo.png',
  '18': '/burgers/Zinger-burger-combo.png',
  19: '/prawns/ultimate-prawns-box.png',
  '19': '/prawns/ultimate-prawns-box.png',
  20: '/prawns/golden-prawns.png',
  '20': '/prawns/golden-prawns.png',
  21: '/prawns/prawns-sandwich.png',
  '21': '/prawns/prawns-sandwich.png',
  22: '/prawns/prawns-burger.png',
  '22': '/prawns/prawns-burger.png',
  23: '/burgers/Dynamite-burger-combo.png',
  '23': '/burgers/Dynamite-burger-combo.png',
  24: '/prawns/prawns-wrap.png',
  '24': '/prawns/prawns-wrap.png',
  25: '/twister/yummy-chicken-wrap.png',
  '25': '/twister/yummy-chicken-wrap.png',
  26: '/prawns/prawns-wrap.png',
  '26': '/prawns/prawns-wrap.png',
  27: '/twister/yummy-twister-wrap.png',
  '27': '/twister/yummy-twister-wrap.png',
  28: '/twister/yummy-chicken-wrap-combo.png',
  '28': '/twister/yummy-chicken-wrap-combo.png',
  29: '/loadedfries_sides/loaded-fries-combo.png',
  '29': '/loadedfries_sides/loaded-fries-combo.png',
  30: '/loadedfries_sides/loaded-classic.png',
  '30': '/loadedfries_sides/loaded-classic.png',
  31: '/loadedfries_sides/cheesy-loaded.png',
  '31': '/loadedfries_sides/cheesy-loaded.png',
  32: '/loadedfries_sides/onion-rings-small.png',
  '32': '/loadedfries_sides/onion-rings-small.png',
  33: '/loadedfries_sides/onion-rings-big.png',
  '33': '/loadedfries_sides/onion-rings-big.png',
  34: '/loadedfries_sides/nuggets-7pcs.png',
  '34': '/loadedfries_sides/nuggets-7pcs.png',
  35: '/loadedfries_sides/nuggets-15pcs.png',
  '35': '/loadedfries_sides/nuggets-15pcs.png',
  36: '/loadedfries_sides/popcorn.png',
  '36': '/loadedfries_sides/popcorn.png',
  37: '/loadedfries_sides/mozzarella-stick.png',
  '37': '/loadedfries_sides/mozzarella-stick.png',
  38: '/loadedfries_sides/french-fries-small.png',
  '38': '/loadedfries_sides/french-fries-small.png',
  39: '/loadedfries_sides/french-fries-medium.png',
  '39': '/loadedfries_sides/french-fries-medium.png',
  40: '/loadedfries_sides/french-fries-family.png',
  '40': '/loadedfries_sides/french-fries-family.png',
  41: '/loadedfries_sides/add-on-dips&sauces.png',
  '41': '/loadedfries_sides/add-on-dips&sauces.png',
  // Mojitos (Category 7, IDs 47-55)
  47: '/mojitos_juices/pineapple-mojito.png',
  '47': '/mojitos_juices/pineapple-mojito.png',
  48: '/mojitos_juices/lychee-mojito.png',
  '48': '/mojitos_juices/lychee-mojito.png',
  49: '/mojitos_juices/mint-lime-mojito.png',
  '49': '/mojitos_juices/mint-lime-mojito.png',
  50: '/mojitos_juices/blue-zesty-mojito.png',
  '50': '/mojitos_juices/blue-zesty-mojito.png',
  51: '/mojitos_juices/passion-fruit-mojito.png',
  '51': '/mojitos_juices/passion-fruit-mojito.png',
  52: '/mojitos_juices/mango-mojito.png',
  '52': '/mojitos_juices/mango-mojito.png',
  53: '/mojitos_juices/blueberry-mojito.png',
  '53': '/mojitos_juices/blueberry-mojito.png',
  54: '/mojitos_juices/watermelon-mojito.png',
  '54': '/mojitos_juices/watermelon-mojito.png',
  55: '/mojitos_juices/strawberry-mojito.png',
  '55': '/mojitos_juices/strawberry-mojito.png',
  // Juices (Category 7, IDs 56-60)
  56: '/mojitos_juices/mango-juice.png',
  '56': '/mojitos_juices/mango-juice.png',
  57: '/mojitos_juices/strawberry-juice.png',
  '57': '/mojitos_juices/strawberry-juice.png',
  58: '/mojitos_juices/avocado-juice.png',
  '58': '/mojitos_juices/avocado-juice.png',
  59: '/mojitos_juices/cocktail-juice.png',
  '59': '/mojitos_juices/cocktail-juice.png',
  60: '/mojitos_juices/orange-juice.png',
  '60': '/mojitos_juices/orange-juice.png',
  // Frappes (Category 8, IDs 61-63)
  61: '/frappes_shakes/chocolate-frappe.png',
  '61': '/frappes_shakes/chocolate-frappe.png',
  62: '/frappes_shakes/strawberry-frappe.png',
  62: '/frappes_shakes/strawberry-frappe.png',
  63: '/frappes_shakes/caramel-frappe.png',
  '63': '/frappes_shakes/caramel-frappe.png',
  // Shakes (Category 8, IDs 64-66)
  64: '/frappes_shakes/avocado-shake.png',
  '64': '/frappes_shakes/avocado-shake.png',
  65: '/frappes_shakes/tender-coconut-shake.png',
  '65': '/frappes_shakes/tender-coconut-shake.png',
  66: '/frappes_shakes/chikku-shake.png',
  '66': '/frappes_shakes/chikku-shake.png',
  // Lassis (Category 8, IDs 67-70)
  67: '/frappes_shakes/mango-lassi.png',
  '67': '/frappes_shakes/mango-lassi.png',
  68: '/frappes_shakes/strawberry-lassi.png',
  '68': '/frappes_shakes/strawberry-lassi.png',
  69: '/frappes_shakes/plain-lassi.png',
  '69': '/frappes_shakes/plain-lassi.png',
  70: '/frappes_shakes/rose-lassi.png',
  '70': '/frappes_shakes/rose-lassi.png',
};

/**
 * Format price in Kuwaiti Dinar (3 decimal places, e.g. 1.500 KD)
 */
export function formatKD(value, lang = 'en') {
  const num = Number(value);
  const formatted = Number.isFinite(num) ? num.toFixed(3) : '0.000';
  return lang === 'ar' ? `${formatted} د.ك` : `${formatted} KD`;
}

export const BUCKET_MEAL_IMAGES = [
  '/buckets&meals/best-bucket.png',
  '/buckets&meals/jolly-meal.png',
  '/buckets&meals/couples-cut.png',
  '/buckets&meals/snacks-box.png',
  '/buckets&meals/trendy-20.png',
  '/buckets&meals/pears-hunt.png',
  '/buckets&meals/yummy-mix.png',
];

export const STRIP_COMBO_IMAGES = [
  '/strips&combo/strip-combo.png',
  '/strips&combo/nuggets-combo.png',
  '/strips&combo/strip-box.png',
  '/strips&combo/4pcs-strip-combo.png',
  '/strips&combo/kids-meal.png',
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    item_id: 'item-bm-1',
    rating: 5,
    comment: 'Super crispy and fresh! Best family bucket in Fahaheel.',
    author: 'Abdullah K.',
    created_at: '2026-10-28T18:30:00Z',
  },
  {
    id: 'rev-2',
    item_id: 'item-bm-1',
    rating: 5,
    comment: 'الدجاج مقرمش جداً والثوم رهيب، أنصح فيه للعائلة',
    author: 'محمد العتيبي',
    created_at: '2026-10-29T20:15:00Z',
  },
  {
    id: 'rev-3',
    item_id: 'item-bm-2',
    rating: 5,
    comment: 'Great crunch and generous portions for the price.',
    author: 'Fahad M.',
    created_at: '2026-10-29T19:00:00Z',
  },
  {
    id: 'rev-4',
    item_id: 'item-bg-1',
    rating: 5,
    comment: 'The Zinger Crunch burger is huge and spicy just right!',
    author: 'Sara A.',
    created_at: '2026-10-29T21:10:00Z',
  },
  {
    id: 'rev-5',
    item_id: 'item-sc-1',
    rating: 5,
    comment: 'التندرز طري ومقرمش وصوص الدايناميت ممتاز',
    author: 'Nasser',
    created_at: '2026-10-29T22:00:00Z',
  },
  {
    id: 'rev-6',
    item_id: 'item-ps-1',
    rating: 5,
    comment: 'Jumbo butterfly prawns are super crunchy and fresh.',
    author: 'Omar R.',
    created_at: '2026-10-29T22:30:00Z',
  },
  {
    id: 'rev-7',
    item_id: 'item-lf-1',
    rating: 5,
    comment: 'Loaded Volcano fries are a must-try!',
    author: 'Zainab',
    created_at: '2026-10-30T01:00:00Z',
  },
  {
    id: 'rev-8',
    item_id: 'item-mj-2',
    rating: 5,
    comment: 'The Blue Lagoon Mojito is incredibly icy and refreshing!',
    author: 'Khaled S.',
    created_at: '2026-10-30T14:20:00Z',
  },
  {
    id: 'rev-9',
    item_id: 'item-fsl-2',
    rating: 5,
    comment: 'Best Lotus Biscoff shake in Kuwait, rich, thick and delicious.',
    author: 'Maryam H.',
    created_at: '2026-10-30T16:45:00Z',
  },
];

/**
 * Convert any item description (newline-separated, bullet-separated, or comma-separated)
 * into a clean array of structured bullet point strings.
 */
export function parseDescriptionBullets(text) {
  if (!text || typeof text !== 'string') return [];
  const trimmed = text.trim();
  if (!trimmed) return [];

  // 1. If already newline or bullet separated
  if (trimmed.includes('\n') || trimmed.includes('•')) {
    return trimmed
      .split(/[\n•]+/)
      .map((line) => line.replace(/^[-*•\s]+/, '').trim())
      .filter(Boolean);
  }

  // 2. Otherwise split comma-separated sentences (English ',' or Arabic '،')
  return trimmed
    .split(/[,،]+/)
    .map((part) =>
      part
        .replace(/^(served with|includes|with|تقدم مع|مع)\s+/i, '')
        .replace(/\.$/, '')
        .trim()
    )
    .filter(Boolean);
}

/**
 * Normalize English & Arabic strings for smart partial & stem matching
 */
function normalizeSearchText(str = '') {
  return String(str)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove Arabic diacritics
    .replace(/[أإآ]/g, 'ا') // Normalize Arabic Alef
    .replace(/ة/g, 'ه') // Normalize Taa Marbuta
    .replace(/ى/g, 'ي') // Normalize Alef Maksura
    .replace(/[^a-z0-9\u0600-\u06FF\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stemEnglishWord(word = '') {
  if (word.length <= 3) return word;
  if (word.endsWith('ies') && word.length > 4) {
    return word.slice(0, -3) + 'y';
  }
  if (word.endsWith('es') && word.length > 4) {
    return word.slice(0, -2);
  }
  if (word.endsWith('s') && !word.endsWith('ss')) {
    return word.slice(0, -1);
  }
  return word;
}

const KEYWORD_SYNONYMS = {
  wrap: 'wrap wraps tortilla twister quesadilla راب رابس تورتيلا تويستر',
  burger: 'burger burgers zinger fillet sandwich برجر زنجر فيليه',
  bucket: 'bucket buckets meal family party broasted بوكيت وجبه عائلي بروستد',
  mango: 'mango mangoes alfonso مانجو الفونسو',
  pineapple: 'pineapple mojito juice اناناس موهيتو عصير',
  lychee: 'lychee litchi mojito ليتشي موهيتو عصير',
  juice: 'juice juices mojito drink fresh orange carrot عصير عصائر موهيتو مشروب برتقال',
  mojito: 'mojito mojitos juice lagoon mint lime soda موهيتو عصير نعناع ليمون',
  shake: 'shake shakes milkshake frappe lassi oreo lotus ميلك شيك فرابيه لاسي اوريو لوتس',
  frappe: 'frappe frappes coffee espresso shake فرابيه قهوه اسبريسو شيك',
  lassi: 'lassi lassis yogurt mango shake لاسي زبادي روب مانجو شيك',
  prawn: 'prawn prawns shrimp butterfly seafood روبيان جمبري بحريات',
  shrimp: 'prawn prawns shrimp butterfly seafood روبيان جمبري بحريات',
  fries: 'fries fry loaded potato cajun بطاطس محمله كاجون',
  strips: 'strips strip tenders nuggets crispy chicken combo box kids ستربس تندرز ناجتس مقرمش كومبو بوكس اطفال',
  nuggets: 'nuggets nugget strips tenders ناجتس ستربس تندرز',
  combo: 'combo combos strip box kids meal كومبو وجبة اطفال بوكس',
  kid: 'kids kid meal surprise طفل اطفال وجبة',
};

/**
 * Smart Partial & Multi-Keyword Search Filter + Relevance Ranking
 * Matches partial keywords (e.g. 'wrap', 'burger', 'bucket', 'mango', 'juice')
 * regardless of prefix words like 'Yummy' or word order.
 */
export function filterAndRankMenuItems(items, query, categoryMap = {}) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return items;

  const queryTokens = normalizedQuery.split(' ').filter(Boolean);
  if (queryTokens.length === 0) return items;

  const scoredResults = [];

  for (const item of items) {
    const cat = categoryMap[item.category_id] || {};

    const titleText = normalizeSearchText(
      `${item.name_en || ''} ${item.name_ar || ''}`
    );
    const categoryText = normalizeSearchText(
      `${cat.name_en || ''} ${cat.short_en || ''} ${cat.name_ar || ''} ${
        cat.short_ar || ''
      } ${cat.section_en || ''} ${item.category_id || ''}`
    );
    const descText = normalizeSearchText(
      `${item.description_en || ''} ${item.description_ar || ''}`
    );

    const fullHaystack = `${titleText} ${categoryText} ${descText}`;
    const fullWords = fullHaystack.split(' ').filter(Boolean);
    const stemmedHaystack = fullWords.map(stemEnglishWord).join(' ');

    let allTokensMatch = true;
    let relevanceScore = 0;

    for (const rawToken of queryTokens) {
      const stemmedToken = stemEnglishWord(rawToken);
      const synonymExpansion = KEYWORD_SYNONYMS[stemmedToken] || '';

      const inTitle =
        titleText.includes(rawToken) || titleText.includes(stemmedToken);
      const inCategory =
        categoryText.includes(rawToken) || categoryText.includes(stemmedToken);
      const inDesc =
        descText.includes(rawToken) || descText.includes(stemmedToken);
      const inStemmed = stemmedHaystack.includes(stemmedToken);
      const inSynonyms =
        synonymExpansion &&
        synonymExpansion
          .split(' ')
          .some((syn) => titleText.includes(syn) || categoryText.includes(syn));

      if (inTitle || inCategory || inDesc || inStemmed || inSynonyms) {
        if (inTitle) relevanceScore += 10;
        if (inCategory) relevanceScore += 6;
        if (inDesc) relevanceScore += 3;
        if (inSynonyms) relevanceScore += 2;
      } else {
        allTokensMatch = false;
        break;
      }
    }

    if (allTokensMatch) {
      scoredResults.push({ item, relevanceScore });
    }
  }

  return scoredResults
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .map((entry) => entry.item);
}
