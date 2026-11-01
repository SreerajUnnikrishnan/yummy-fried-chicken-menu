import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envContent = fs.readFileSync('.env', 'utf-8');
let supabaseUrl = 'https://sjaxzyuzglrpuadjfvud.supabase.co';
let supabaseAnonKey = 'sb_publishable_bxjKj8peFxJ4v4VhfXv4sQ_xAqhpHfQ';
for (const line of envContent.split('\n')) {
  if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
  if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseAnonKey = line.split('=')[1].trim();
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const VALID_MENU_ITEM_COLUMNS = [
  'category_id',
  'name_en',
  'name_ar',
  'description_en',
  'description_ar',
  'price',
  'original_price',
  'image_url',
  'is_available',
  'is_offer',
];

async function verifyPersistence() {
  console.log('=== TEST 1: Update Item with Admin Panel Form Fields ===');
  // Admin form includes extra UI fields that used to break Supabase
  const adminFormInput = {
    id: 1,
    name_en: 'Best Bucket (12 Pcs Family Bucket)',
    name_ar: 'بوكيت بيست العائلي (12 قطعة)',
    category_id: 1,
    price: 7.900,
    original_price: 9.400,
    is_available: true,
    is_offer: true,
    // Extra fields that must be filtered out:
    offer_label_en: 'FAMILY DEAL',
    offer_label_ar: 'عرض العائلة',
    is_popular: true,
    spicy_level: 1,
    url: '/buckets&meals/best-bucket.png',
    updated_at: new Date().toISOString(),
  };

  const dbPayload = {};
  for (const col of VALID_MENU_ITEM_COLUMNS) {
    if (adminFormInput[col] !== undefined) {
      dbPayload[col] = adminFormInput[col];
    }
  }

  const { data: updated, error: updateError } = await supabase
    .from('menu_items')
    .update(dbPayload)
    .eq('id', 1)
    .select()
    .single();

  if (updateError) {
    console.error('FAIL: Update error:', updateError.message);
    return;
  }
  console.log('PASS: Supabase accepted update without schema error!');
  console.log('Persisted Name:', updated.name_en);

  console.log('\n=== TEST 2: Page Refresh / Fresh Fetch from Supabase ===');
  const { data: freshItems, error: fetchError } = await supabase
    .from('menu_items')
    .select('*')
    .order('id', { ascending: true });

  if (fetchError) {
    console.error('FAIL: Fetch error:', fetchError.message);
    return;
  }

  const freshItem1 = freshItems.find((i) => i.id === 1);
  console.log('Fresh fetched Name:', freshItem1?.name_en);
  if (freshItem1?.name_en === adminFormInput.name_en) {
    console.log('PASS: Fresh data from Supabase matches the updated name! ZERO reversion!');
  } else {
    console.error('FAIL: Reverted to old name!');
  }

  console.log('\n=== TEST 3: Restoring Item Name to Original ===');
  await supabase
    .from('menu_items')
    .update({ name_en: 'Best Bucket' })
    .eq('id', 1);
  console.log('Restored original name to "Best Bucket".');
}

verifyPersistence();

