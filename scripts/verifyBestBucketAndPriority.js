import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import {
  resolveProductImageUrl,
  SEED_ITEM_IMAGE_BY_ID,
  INITIAL_MENU_ITEMS,
} from '../src/data/seedMenu.js';

let supabaseUrl = 'https://sjaxzyuzglrpuadjfvud.supabase.co';
let supabaseAnonKey = 'sb_publishable_bxjKj8peFxJ4v4VhfXv4sQ_xAqhpHfQ';

try {
  const envContent = fs.readFileSync('.env', 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = trimmed.split('=')[1].trim();
    if (trimmed.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseAnonKey = trimmed.split('=')[1].trim();
  }
} catch (e) {}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyAll() {
  console.log('=== TEST 1: Database URL Priority ===');
  const customAdminItem = {
    id: 15,
    name_en: 'Dynamite Burger',
    image_url: 'https://sjaxzyuzglrpuadjfvud.supabase.co/storage/v1/object/public/menu/custom-admin-burger.png',
  };
  const resolvedAdminUrl = resolveProductImageUrl(customAdminItem);
  console.log('Admin upload URL input:', customAdminItem.image_url);
  console.log('Resolved URL:', resolvedAdminUrl);
  if (resolvedAdminUrl === customAdminItem.image_url) {
    console.log('PASS: Database URL prioritized over local defaults.');
  } else {
    console.error('FAIL: Database URL was not prioritized!');
  }

  console.log('\n=== TEST 2: Best Bucket vs Pears Hunt in seedMenu & resolveProductImageUrl ===');
  const bestBucketItem = { id: 1, name_en: 'Best Bucket' };
  const pearsHuntItem = { id: 2, name_en: 'Pears Hunt' };
  const bbUrl = resolveProductImageUrl(bestBucketItem);
  const phUrl = resolveProductImageUrl(pearsHuntItem);
  console.log('Best Bucket resolved image:', bbUrl);
  console.log('Pears Hunt resolved image:', phUrl);

  if (bbUrl === '/buckets&meals/best-bucket.png' && phUrl === '/buckets&meals/pears-hunt.png') {
    console.log('PASS: Best Bucket and Pears Hunt have distinct, correct images.');
  } else {
    console.error('FAIL: Best Bucket or Pears Hunt image mismatch!');
  }

  console.log('\n=== TEST 3: Best Bucket Seed Item in INITIAL_MENU_ITEMS ===');
  const seedBB = INITIAL_MENU_ITEMS.find((i) => i.id === 'item-bm-1');
  const seedPH = INITIAL_MENU_ITEMS.find((i) => i.id === 'item-bm-6');
  console.log('item-bm-1 image_url:', seedBB?.image_url);
  console.log('item-bm-6 image_url:', seedPH?.image_url);
  if (
    seedBB?.image_url === '/buckets&meals/best-bucket.png' &&
    seedPH?.image_url === '/buckets&meals/pears-hunt.png'
  ) {
    console.log('PASS: INITIAL_MENU_ITEMS holds independent paths.');
  } else {
    console.error('FAIL: INITIAL_MENU_ITEMS mismatch!');
  }

  console.log('\n=== TEST 4: Live Supabase menu_items for Category 1 ===');
  const { data: dbItems, error } = await supabase
    .from('menu_items')
    .select('id, category_id, name_en, image_url')
    .in('id', [1, 2]);

  if (error) {
    console.error('Supabase query error:', error);
  } else {
    console.log('Live items in Supabase:', dbItems);
    const dbBB = dbItems.find((i) => i.id === 1);
    const dbPH = dbItems.find((i) => i.id === 2);
    if (
      dbBB?.image_url === '/buckets&meals/best-bucket.png' &&
      dbPH?.image_url === '/buckets&meals/pears-hunt.png'
    ) {
      console.log('PASS: Supabase DB has /buckets&meals/best-bucket.png and /buckets&meals/pears-hunt.png!');
    } else {
      console.error('FAIL: Supabase DB mismatch!');
    }
  }
}

verifyAll();

