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

async function testCatId() {
  console.log('Testing category_id with integer 1:');
  const res1 = await supabase.from('menu_items').update({ category_id: 1 }).eq('id', 1);
  console.log('Integer 1:', res1.error ? res1.error.message : 'SUCCESS');

  console.log('Testing category_id with string "1":');
  const res2 = await supabase.from('menu_items').update({ category_id: '1' }).eq('id', 1);
  console.log('String "1":', res2.error ? res2.error.message : 'SUCCESS');

  console.log('Testing category_id with slug "buckets-meals":');
  const res3 = await supabase.from('menu_items').update({ category_id: 'buckets-meals' }).eq('id', 1);
  console.log('Slug "buckets-meals":', res3.error ? res3.error.message : 'SUCCESS');
}
testCatId();

