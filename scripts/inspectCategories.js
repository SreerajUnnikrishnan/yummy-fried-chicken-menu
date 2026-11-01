import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

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

async function inspect() {
  const { data: cats } = await supabase.from('categories').select('*');
  console.log('Categories in Supabase:');
  console.log(cats);

  const { data: items } = await supabase.from('menu_items').select('id, category_id, name_en, image_url');
  console.log('\nSample items in Supabase:');
  console.log(items.slice(20, 45));
}

inspect().catch(console.error);

