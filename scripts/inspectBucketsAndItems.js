import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

let supabaseUrl = 'https://sjaxzyuzglrpuadjfvud.supabase.co';
let supabaseAnonKey = 'sb_publishable_bxjKj8peFxJ4v4VhfXv4sQ_xAqhpHfQ';

try {
  const envContent = fs.readFileSync('.env', 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
      supabaseUrl = trimmed.split('=')[1].trim();
    }
    if (trimmed.startsWith('VITE_SUPABASE_ANON_KEY=')) {
      supabaseAnonKey = trimmed.split('=')[1].trim();
    }
  }
} catch (e) {}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectBuckets() {
  const { data: allItems, error } = await supabase.from('menu_items').select('*');
  if (error) {
    console.error('Fetch error:', error);
    return;
  }
  console.log(`Total items in DB: ${allItems.length}`);
  
  // Find items related to buckets or pears hunt or best bucket
  const bucketItems = allItems.filter(i => 
    String(i.category_id) === '1' || 
    i.category_id === 'buckets-meals' ||
    (i.name_en && (i.name_en.toLowerCase().includes('bucket') || i.name_en.toLowerCase().includes('pears')))
  );

  console.log('\n--- Bucket / Meal Items in Supabase ---');
  for (const item of bucketItems) {
    console.log(`ID: ${item.id} | Cat: ${item.category_id} | Name: "${item.name_en}" | image_url: "${item.image_url}" | url: "${item.url}"`);
  }
}

inspectBuckets();

