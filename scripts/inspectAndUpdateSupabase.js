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

async function inspectAndFix() {
  console.log('Connecting to Supabase...');
  const { data: allItems, error } = await supabase.from('menu_items').select('*');
  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  console.log(`Retrieved ${allItems.length} items from Supabase.`);

  // 1. Fix item 12 if it's Nuggets Combo (strips-combos)
  const item12 = allItems.find((i) => String(i.id) === '12');
  if (item12 && item12.category_id === 'strips-combos') {
    console.log('Restoring item 12 to /strips&combo/nuggets-combo.png');
    await supabase
      .from('menu_items')
      .update({ image_url: '/strips&combo/nuggets-combo.png' })
      .eq('id', item12.id);
  }

  // 2. Inspect all items in loaded-fries-sides
  const lfItems = allItems.filter((i) => i.category_id === 'loaded-fries-sides');
  console.log(`\nItems strictly in loaded-fries-sides (${lfItems.length} items):`);

  for (const item of lfItems) {
    let target = '/loadedfries_sides/loaded-classic.png';
    const nameEn = (item.name_en || '').toLowerCase();
    const nameAr = (item.name_ar || '').toLowerCase();

    if (nameEn.includes('mozzarella')) {
      target = '/loadedfries_sides/mozzarella-stick.png';
    } else if (nameEn.includes('cheesy')) {
      target = '/loadedfries_sides/cheesy-loaded.png';
    } else if (nameEn.includes('combo')) {
      target = '/loadedfries_sides/loaded-fries-combo.png';
    } else if (nameEn.includes('classic')) {
      target = '/loadedfries_sides/loaded-classic.png';
    } else if (nameEn.includes('popcorn')) {
      target = '/loadedfries_sides/popcorn.png';
    } else if (nameEn.includes('15')) {
      target = '/loadedfries_sides/nuggets-15pcs.png';
    } else if (nameEn.includes('nugget') || nameEn.includes('7')) {
      target = '/loadedfries_sides/nuggets-7pcs.png';
    } else if (nameEn.includes('onion') && (nameEn.includes('big') || nameEn.includes('large'))) {
      target = '/loadedfries_sides/onion-rings-big.png';
    } else if (nameEn.includes('onion')) {
      target = '/loadedfries_sides/onion-rings-small.png';
    } else if (nameEn.includes('family')) {
      target = '/loadedfries_sides/french-fries-family.png';
    } else if (nameEn.includes('medium')) {
      target = '/loadedfries_sides/french-fries-medium.png';
    } else if (nameEn.includes('small') && nameEn.includes('fries')) {
      target = '/loadedfries_sides/french-fries-small.png';
    } else if (nameEn.includes('dip') || nameEn.includes('sauce')) {
      target = '/loadedfries_sides/add-on-dips&sauces.png';
    }

    console.log(`- [ID: ${item.id}] "${item.name_en}" -> ${target} (was: ${item.image_url})`);

    const { error: updErr } = await supabase
      .from('menu_items')
      .update({ image_url: target })
      .eq('id', item.id);

    if (updErr) {
      console.error(`  Error updating ${item.id}:`, updErr.message);
    }
  }

  console.log('\nSupabase update completed successfully.');
}

inspectAndFix().catch(console.error);

