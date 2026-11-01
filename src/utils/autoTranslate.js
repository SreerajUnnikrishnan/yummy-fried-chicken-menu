/**
 * Smart English -> Arabic Restaurant Menu Auto-Translator
 * 1. Zero-latency instant culinary dictionary translation on every keystroke
 * 2. Automatic debounced cloud translation (Google Translate GTX + MyMemory fallback)
 *    for arbitrary English words and sentences.
 */

const PHRASE_DICTIONARY = [
  ['family fiesta bucket', 'بوكيت العائلة فييستا'],
  ['super crunch', 'سوبر كرانش'],
  ['broasted chicken', 'دجاج بروستد'],
  ['fried chicken', 'دجاج مقلي'],
  ['crispy chicken', 'دجاج مقرمش'],
  ['crunchy chicken', 'دجاج مقرمش'],
  ['spicy chicken', 'دجاج حار'],
  ['grilled chicken', 'دجاج مشوي'],
  ['chicken breast fillet', 'فيليه صدر دجاج'],
  ['chicken breast strips', 'ستربس صدور دجاج'],
  ['chicken breast tenders', 'تندرز صدور دجاج'],
  ['chicken breast nuggets', 'ناجتس صدور دجاج'],
  ['chicken tenders', 'تندرز دجاج'],
  ['chicken strips', 'ستربس دجاج'],
  ['chicken nuggets', 'ناجتس دجاج'],
  ['popcorn chicken', 'بوب كورن دجاج'],
  ['chicken fillet', 'فيليه دجاج'],
  ['butterfly prawns', 'روبيان باترفلاي'],
  ['jumbo prawns', 'روبيان جامبو'],
  ['tempura prawns', 'روبيان تمبورا'],
  ['gulf prawns', 'روبيان خليج'],
  ['french fries', 'بطاطس مقلية'],
  ['crinkle fries', 'بطاطس كرنكل'],
  ['loaded fries', 'بطاطس محملة'],
  ['cajun fries', 'بطاطس كاجون'],
  ['family fries box', 'بوكس بطاطس عائلي'],
  ['family fries', 'بطاطس عائلي'],
  ['golden fries', 'بطاطس ذهبية'],
  ['seasoned fries', 'بطاطس متبلة'],
  ['crispy fries', 'بطاطس مقرمشة'],
  ['creamy coleslaw', 'كول سلو كريمي'],
  ['large coleslaw', 'كول سلو كبير'],
  ['coleslaw', 'كول سلو'],
  ['garlic sauce', 'صوص ثوم'],
  ['garlic dip', 'صوص ثوم'],
  ['garlic dips', 'صوص ثوم'],
  ['garlic mayo', 'مايونيز بالثوم'],
  ['dynamite sauce', 'صوص دايناميت'],
  ['dynamite dip', 'صوص دايناميت'],
  ['dynamite mayo', 'مايونيز دايناميت'],
  ['honey mustard', 'هني ماسترد'],
  ['cheddar cheese sauce', 'صوص جبن شيدر'],
  ['cheddar cheese dip', 'صوص جبن شيدر'],
  ['nacho cheese sauce', 'صوص جبن ناتشو'],
  ['melted cheddar', 'جبن شيدر ذائب'],
  ['american cheddar', 'جبن شيدر أمريكي'],
  ['cheddar cheese', 'جبن شيدر'],
  ['mozzarella sticks', 'أصابع جبن موزاريلا'],
  ['mozzarella cheese', 'جبن موزاريلا'],
  ['tartar sauce', 'صوص تارتار'],
  ['tartar dip', 'صوص تارتار'],
  ['cocktail dip', 'صوص كوكتيل'],
  ['cocktail sauce', 'صوص كوكتيل'],
  ['ranch dip', 'صوص رانش'],
  ['ranch sauce', 'صوص رانش'],
  ['bbq sauce', 'صوص باربكيو'],
  ['bbq dip', 'صوص باربكيو'],
  ['chipotle sauce', 'صوص شيبوتلي'],
  ['thousand island', 'ثاوزند آيلاند'],
  ['house sauce', 'صوص يمي الخاص'],
  ['brioche bun', 'خبز بريوش'],
  ['sesame seed bun', 'خبز بالسمسم'],
  ['soft buns', 'خبز طري'],
  ['soft bun', 'خبز طري'],
  ['warm bun', 'خبز دافئ'],
  ['texas toast', 'توست محمص'],
  ['toasted tortilla', 'خبز تورتيلا محمص'],
  ['grilled tortilla', 'خبز تورتيلا مشوي'],
  ['flour tortilla', 'خبز تورتيلا'],
  ['iceberg lettuce', 'خس آيسبرغ'],
  ['fresh lettuce', 'خس طازج'],
  ['crisp lettuce', 'خس مقرمش'],
  ['diced tomatoes', 'طماطم طازجة'],
  ['spring onions', 'بصل أخضر'],
  ['crispy onions', 'بصل مقرمش'],
  ['onion rings', 'حلقات بصل'],
  ['red cabbage', 'ملفوف أحمر'],
  ['sweet corn', 'ذرة حلوة'],
  ['smoked turkey', 'تيركي مدخن'],
  ['turkey bacon', 'تيركي مدخن'],
  ['hashbrown', 'هاش براون'],
  ['soft drink', 'مشروب غازي'],
  ['cold drink', 'مشروب بارد'],
  ['sparkling soda', 'صودا فوارة'],
  ['fizzy soda', 'صودا منعشة'],
  ['crushed ice', 'ثلج مجروش'],
  ['fresh mint leaves', 'أوراق نعناع طازجة'],
  ['fresh mint', 'نعناع طازج'],
  ['lime wedges', 'شرائح ليمون'],
  ['lime juice', 'عصير ليمون'],
  ['passion fruit', 'باشن فروت'],
  ['blue ocean', 'بلو أوشن'],
  ['blue curacao', 'بلو كوراساو'],
  ['blue curaçao', 'بلو كوراساو'],
  ['wild berries', 'توت بري'],
  ['strawberry puree', 'بيوريه فراولة'],
  ['valencia oranges', 'برتقال فالنسيا'],
  ['orange juice', 'عصير برتقال'],
  ['carrot juice', 'عصير جزر'],
  ['zero added sugar', 'بدون سكر مضاف'],
  ['vanilla ice cream', 'آيس كريم فانيلا'],
  ['vanilla bean ice cream', 'آيس كريم فانيلا'],
  ['ice cream', 'آيس كريم'],
  ['whipped cream', 'كريمة مخفوقة'],
  ['lotus biscoff', 'لوتس بيسكوف'],
  ['salted caramel', 'كراميل مملح'],
  ['caramel drizzle', 'صوص كراميل'],
  ['condensed milk', 'حليب مكثف'],
  ['whole milk', 'حليب كامل الدسم'],
  ['chocolate fudge', 'فادج شوكولاتة'],
  ['mango lassi', 'لاسي مانجو'],
  ['alfonso mango', 'مانجو ألفونسو'],
  ['crushed pistachios', 'فستق مجروش'],
  ['nutella hazelnut', 'نوتيلا بالبندق'],
  ['pistachio kunafa', 'فستق وكنافة'],
  ['green apple', 'تفاح أخضر'],
  ['lemon mint', 'ليمون بالنعناع'],
  ['creamy avocado', 'أفوكادو كريمي'],
  ['watermelon breeze', 'بطيخ منعش'],
  ['served with', 'تقدم مع'],
];

const WORD_DICTIONARY = {
  yummy: 'يمي',
  bucket: 'بوكيت',
  buckets: 'بوكيت',
  meal: 'وجبة',
  meals: 'وجبات',
  combo: 'كومبو',
  box: 'بوكس',
  family: 'عائلي',
  party: 'حفلات',
  mega: 'ميجا',
  super: 'سوبر',
  jumbo: 'جامبو',
  large: 'كبير',
  medium: 'وسط',
  regular: 'عادي',
  small: 'صغير',
  snack: 'سناك',
  dinner: 'عشاء',
  lunch: 'غداء',
  pcs: 'قطع',
  pc: 'قطعة',
  pieces: 'قطع',
  piece: 'قطعة',
  chicken: 'دجاج',
  broasted: 'بروستد',
  fried: 'مقلي',
  crispy: 'مقرمش',
  crunchy: 'مقرمش',
  golden: 'ذهبي',
  spicy: 'حار',
  hot: 'حار',
  fiery: 'حار',
  original: 'أصلي',
  tender: 'طري',
  tenders: 'تندرز',
  strips: 'ستربس',
  nuggets: 'ناجتس',
  wings: 'أجنحة',
  fillet: 'فيليه',
  fillets: 'فيليه',
  breast: 'صدر',
  burger: 'برجر',
  burgers: 'برجر',
  zinger: 'زنجر',
  royal: 'رويال',
  double: 'دبل',
  triple: 'تربل',
  tower: 'تاور',
  supreme: 'سوبريم',
  classic: 'كلاسيك',
  cheesy: 'بالجبن',
  cheese: 'جبن',
  cheddar: 'شيدر',
  mozzarella: 'موزاريلا',
  cheetos: 'شيتوز',
  wrap: 'راب',
  wraps: 'رابس',
  twister: 'تويستر',
  tortilla: 'تورتيلا',
  quesadilla: 'كاساديا',
  mexican: 'مكسيكي',
  prawns: 'روبيان',
  prawn: 'روبيان',
  shrimp: 'روبيان',
  seafood: 'بحريات',
  volcano: 'فولكانو',
  dynamite: 'دايناميت',
  fries: 'بطاطس',
  loaded: 'محملة',
  sides: 'مقبلات',
  coleslaw: 'كول سلو',
  garlic: 'ثوم',
  sauce: 'صوص',
  sauces: 'صوصات',
  dip: 'صوص',
  dips: 'صوصات',
  mayo: 'مايونيز',
  pickles: 'مخلل',
  jalapenos: 'هالبينو',
  jalapeños: 'هالبينو',
  lettuce: 'خس',
  tomatoes: 'طماطم',
  tomato: 'طماطم',
  onions: 'بصل',
  onion: 'بصل',
  corn: 'ذرة',
  bun: 'خبز',
  buns: 'خبز',
  bread: 'خبز',
  toast: 'توست',
  pepsi: 'بيبسي',
  drink: 'مشروب',
  drinks: 'مشروبات',
  soda: 'صودا',
  water: 'مياه',
  mojito: 'موهيتو',
  mojitos: 'موهيتو',
  juice: 'عصير',
  juices: 'عصائر',
  fresh: 'طازج',
  freshly: 'طازج',
  orange: 'برتقال',
  carrot: 'جزر',
  carrots: 'جزر',
  lemon: 'ليمون',
  lime: 'ليمون',
  mint: 'نعناع',
  pineapple: 'أناناس',
  lychee: 'ليتشي',
  mango: 'مانجو',
  strawberry: 'فراولة',
  watermelon: 'بطيخ',
  avocado: 'أفوكادو',
  kiwi: 'كيوي',
  apple: 'تفاح',
  berry: 'توت',
  berries: 'توت',
  tropical: 'استوائي',
  iced: 'مثلج',
  cold: 'بارد',
  chilled: 'مبرد',
  frappe: 'فرابيه',
  shake: 'ميلك شيك',
  shakes: 'ميلك شيك',
  milkshake: 'ميلك شيك',
  lassi: 'لاسي',
  yogurt: 'زبادي',
  caramel: 'كراميل',
  chocolate: 'شوكولاتة',
  nutella: 'نوتيلا',
  hazelnut: 'بندق',
  kunafa: 'كنافة',
  belgian: 'بلجيكية',
  oreo: 'أوريو',
  lotus: 'لوتس',
  vanilla: 'فانيلا',
  espresso: 'إسبريسو',
  coffee: 'قهوة',
  spanish: 'سبانش',
  cardamom: 'هيل',
  pistachios: 'فستق',
  sweet: 'حلو',
  special: 'سبيشل',
  signature: 'مميز',
  kids: 'أطفال',
  sandwich: 'ساندويتش',
  sandwiches: 'ساندويتشات',
  shawarma: 'شاورما',
  shawarmas: 'شاورما',
  grill: 'مشاوي',
  grills: 'مشاوي',
  grilled: 'مشوي',
  platter: 'طبق',
  platters: 'أطباق',
  dessert: 'حلويات',
  desserts: 'حلويات',
  sweets: 'حلويات',
  appetizer: 'مقبلات',
  appetizers: 'مقبلات',
  salads: 'سلطات',
  pasta: 'باستا',
  pizza: 'بيتزا',
  kebab: 'كباب',
  kabab: 'كباب',
  falafel: 'فلافل',
  hummus: 'حمص',
  arabic: 'عربي',
  club: 'كلوب',
  salad: 'سلطة',
  rice: 'أرز',
  normal: 'عادي',
  and: 'و',
  with: 'مع',
  in: 'في',
  or: 'أو',
};

export function translateLineToArabicInstant(englishLine) {
  if (!englishLine || !englishLine.trim()) return '';

  let text = englishLine.trim();

  text = text.replace(/\b2\s*pcs?\b/gi, 'قطعتين');
  text = text.replace(/\b1\s*pc\b/gi, 'قطعة');
  text = text.replace(/\b(\d+)\s*pcs?\b/gi, '$1 قطع');
  text = text.replace(/\b(\d+(?:\.\d+)?)\s*l\b/gi, '$1 لتر');

  for (const [enPhrase, arPhrase] of PHRASE_DICTIONARY) {
    const regex = new RegExp(`\\b${enPhrase}\\b`, 'gi');
    text = text.replace(regex, arPhrase);
  }

  text = text.replace(/\s*&\s*/g, ' و ');
  text = text.replace(/\s*\+\s*/g, ' + ');

  const tokens = text.split(/(\s+|[(),.-])/);
  const translatedTokens = tokens.map((tok) => {
    const clean = tok.toLowerCase().replace(/[^a-zéñ]/g, '');
    if (clean && WORD_DICTIONARY[clean]) {
      return WORD_DICTIONARY[clean];
    }
    return tok;
  });

  return translatedTokens
    .join('')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function autoTranslateEnglishToArabic(englishText) {
  if (!englishText || !englishText.trim()) return '';
  return englishText
    .split('\n')
    .map((line) => translateLineToArabicInstant(line))
    .join('\n');
}

/**
 * Translate arbitrary English text into Arabic using Google Translate GTX endpoint
 * with fallback to MyMemory API and our local culinary dictionary.
 */
export async function translateWithCloudFallback(englishText) {
  if (!englishText || !englishText.trim()) return '';

  const instantResult = autoTranslateEnglishToArabic(englishText);

  try {
    // 1. Try fast Google Translate GTX public endpoint (preserves newlines)
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(
      englishText.trim()
    )}`;
    const gtxRes = await fetch(gtxUrl);
    if (gtxRes.ok) {
      const gtxData = await gtxRes.json();
      if (Array.isArray(gtxData?.[0])) {
        const joined = gtxData[0]
          .map((part) => (Array.isArray(part) ? part[0] : ''))
          .join('')
          .trim();
        if (joined) return joined;
      }
    }
  } catch {
    // Fallback to MyMemory or local dictionary
  }

  // If instant dictionary already translated all words, return it
  if (!/[a-zA-Z]{3,}/.test(instantResult)) {
    return instantResult;
  }

  try {
    const lines = englishText.split('\n').filter((l) => l.trim());
    const translatedLines = await Promise.all(
      lines.map(async (line) => {
        const localAttempt = translateLineToArabicInstant(line);
        if (!/[a-zA-Z]{3,}/.test(localAttempt)) {
          return localAttempt;
        }
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          line.trim()
        )}&langpair=en|ar`;
        const res = await fetch(url);
        if (!res.ok) return localAttempt;
        const data = await res.json();
        const cloudText = data?.responseData?.translatedText;
        return cloudText ? cloudText.trim() : localAttempt;
      })
    );
    return translatedLines.join('\n');
  } catch {
    return instantResult;
  }
}
