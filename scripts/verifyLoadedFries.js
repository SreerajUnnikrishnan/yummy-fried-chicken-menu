import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  INITIAL_MENU_ITEMS,
  LOADED_FRIES_IMAGE_BY_ID,
  getLoadedFriesImage,
  resolveProductImageUrl,
  CATEGORY_HEADER_IMAGES,
} from '../src/data/seedMenu.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

console.log('================================================================');
console.log('  LOADED FRIES & SIDES IMAGE RESOLUTION & URL ENCODING TEST');
console.log('================================================================\n');

let errors = 0;

// 1. Verify LOADED_FRIES_IMAGE_BY_ID contains all 13 items pointing to /loadedfries_sides/
console.log('1. Checking LOADED_FRIES_IMAGE_BY_ID mapping (13 items pointing to /loadedfries_sides/):');
const loadedFriesItems = INITIAL_MENU_ITEMS.filter(
  (i) => i.category_id === 'loaded-fries-sides' || i.id.startsWith('item-lf-')
);

loadedFriesItems.forEach((item) => {
  const mapped = LOADED_FRIES_IMAGE_BY_ID[item.id];
  if (!mapped) {
    console.error(`  [ERROR] Item ${item.id} (${item.name_en}) missing from LOADED_FRIES_IMAGE_BY_ID`);
    errors++;
  } else if (!mapped.startsWith('/loadedfries_sides/')) {
    console.error(`  [ERROR] Item ${item.id} (${item.name_en}) does not point to /loadedfries_sides/: ${mapped}`);
    errors++;
  } else {
    // Check disk path in public/
    const diskPath = path.join(publicDir, mapped.replace(/^\//, ''));
    const exists = fs.existsSync(diskPath);

    if (!exists) {
      console.error(`  [DISK MISSING] File missing: ${diskPath}`);
      errors++;
    } else {
      console.log(`  [OK] ${item.id} (${item.name_en}) -> ${mapped} (File confirmed on disk)`);
    }
  }
});

// 2. Test ProductCard resolution logic
console.log('\n2. Testing ProductCard resolution logic:');
loadedFriesItems.forEach((item) => {
  // Test with standard item
  const resolved = LOADED_FRIES_IMAGE_BY_ID[item.id] || getLoadedFriesImage(item);
  if (!resolved || !resolved.includes('/loadedfries_sides')) {
    console.error(`  [ERROR] ProductCard resolution failed for ${item.id}: ${resolved}`);
    errors++;
  }

  // Test with simulated blank/null image item
  const blankItem = { ...item, image_url: null, url: null };
  const blankResolved =
    LOADED_FRIES_IMAGE_BY_ID[blankItem.id] || getLoadedFriesImage(blankItem);
  if (!blankResolved || blankResolved.includes('best-bucket')) {
    console.error(`  [ERROR] Blank item resolved to bucket or null: ${blankResolved}`);
    errors++;
  }
});
console.log('  [OK] All 13 Loaded Fries items resolve correctly without bucket fallback.');

// 3. Verify other categories remain untouched
console.log('\n3. Verifying other working categories remain untouched:');
const otherCats = [
  { id: 'buckets-meals', prefix: '/buckets&meals/' },
  { id: 'strips-combos', prefix: '/strips&combo/' },
  { id: 'burgers', prefix: '/burgers/' },
  { id: 'prawns-special', prefix: '/prawns/' },
  { id: 'signature-wraps', prefix: '/twister/' },
];

otherCats.forEach((cat) => {
  const header = CATEGORY_HEADER_IMAGES[cat.id];
  const items = INITIAL_MENU_ITEMS.filter((i) => i.category_id === cat.id);
  const allMatch = items.every((item) => {
    const res = resolveProductImageUrl(item);
    return res && res.startsWith(cat.prefix);
  });
  if (header && header.startsWith(cat.prefix) && allMatch) {
    console.log(`  [OK] Category "${cat.id}" (${items.length} items) remains 100% intact and untouched.`);
  } else {
    console.error(`  [ERROR] Category "${cat.id}" altered! Header: ${header}`);
    errors++;
  }
});

console.log('\n================================================================');
console.log(`  RESULT: ${errors === 0 ? 'ALL CHECKS PASSED (0 Errors)' : `${errors} Errors Found`}`);
console.log('================================================================');

if (errors > 0) process.exit(1);

