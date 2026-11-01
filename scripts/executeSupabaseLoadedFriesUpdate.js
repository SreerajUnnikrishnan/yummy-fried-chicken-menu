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

const LOADED_FRIES_MAPPINGS = [
  { id: 30, name: 'Loaded Classic', image_url: '/loadedfries_sides/loaded-classic.png' },
  { id: 31, name: 'Cheesy Loaded', image_url: '/loadedfries_sides/cheesy-loaded.png' },
  { id: 29, name: 'Loaded Fries Combo', image_url: '/loadedfries_sides/loaded-fries-combo.png' },
  { id: 37, name: 'Mozzarella Stick (5 Pcs)', image_url: '/loadedfries_sides/mozzarella-stick.png' },
  { id: 36, name: 'Chicken Popcorn', image_url: '/loadedfries_sides/popcorn.png' },
  { id: 34, name: 'Nuggets (7 Pcs)', image_url: '/loadedfries_sides/nuggets-7pcs.png' },
  { id: 35, name: 'Nuggets (15 Pcs)', image_url: '/loadedfries_sides/nuggets-15pcs.png' },
  { id: 32, name: 'Onion Rings (Small)', image_url: '/loadedfries_sides/onion-rings-small.png' },
  { id: 33, name: 'Onion Rings (Big)', image_url: '/loadedfries_sides/onion-rings-big.png' },
  { id: 38, name: 'French Fries (Small)', image_url: '/loadedfries_sides/french-fries-small.png' },
  { id: 39, name: 'French Fries (Medium)', image_url: '/loadedfries_sides/french-fries-medium.png' },
  { id: 40, name: 'French Fries (Family)', image_url: '/loadedfries_sides/french-fries-family.png' },
  { id: 41, name: 'Add-On Dips & Sauces', image_url: '/loadedfries_sides/add-on-dips&sauces.png' },
];

async function updateSupabase() {
  console.log('Connecting to Supabase...');

  // Restore item 12 in case it was modified
  await supabase
    .from('menu_items')
    .update({ image_url: '/strips&combo/nuggets-combo.png' })
    .eq('id', 12);
  console.log('Verified item 12 -> /strips&combo/nuggets-combo.png');

  // Also check if any category 6 items exist with custom string ids
  for (const m of LOADED_FRIES_MAPPINGS) {
    const { data, error } = await supabase
      .from('menu_items')
      .update({ image_url: m.image_url })
      .eq('id', m.id)
      .select('id, name_en, image_url');

    if (error) {
      console.error(`Error updating ID ${m.id} (${m.name}):`, error.message);
    } else {
      console.log(`[UPDATED] ID ${m.id}: ${m.name} -> ${m.image_url}`);
    }
  }

  // Also search for any item in category 6 or with loaded fries names
  const { data: lfItems } = await supabase
    .from('menu_items')
    .select('id, name_en, category_id, image_url')
    .or('category_id.eq.6,category_id.eq.loaded-fries-sides');

  console.log('\nFinal state of Loaded Fries & Sides in Supabase:');
  console.table(lfItems);
}

updateSupabase().catch(console.error);

