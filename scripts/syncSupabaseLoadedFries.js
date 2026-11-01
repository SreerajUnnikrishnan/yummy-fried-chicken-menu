import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

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
} catch (e) {
  // Ignore error
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LOADED_FRIES_IMAGE_BY_ID = {
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

function getCorrectImage(item) {
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

async function runSync() {
  console.log('Connecting to Supabase:', supabaseUrl);

  const { data: items, error } = await supabase
    .from('menu_items')
    .select('id, name_en, name_ar, category_id, image_url');

  if (error) {
    console.error('Error fetching menu_items from Supabase:', error.message);
    process.exit(1);
  }

  console.log(`Found ${items?.length || 0} total items in Supabase.`);

  const loadedFriesItems = (items || []).filter(
    (item) =>
      item.category_id === 'loaded-fries-sides' ||
      String(item.id || '').startsWith('item-lf-') ||
      item.name_en?.toLowerCase().includes('fries') ||
      item.name_en?.toLowerCase().includes('nugget') ||
      item.name_en?.toLowerCase().includes('mozzarella') ||
      item.name_en?.toLowerCase().includes('onion ring') ||
      item.name_en?.toLowerCase().includes('popcorn')
  );

  console.log(`Found ${loadedFriesItems.length} Loaded Fries & Sides items in Supabase.`);

  let updatedCount = 0;
  for (const item of loadedFriesItems) {
    const targetUrl = getCorrectImage(item);
    console.log(`Item: "${item.name_en}" (ID: ${item.id})`);
    console.log(`  Current image_url: "${item.image_url}"`);
    console.log(`  Target image_url:  "${targetUrl}"`);

    if (item.image_url !== targetUrl) {
      const { error: updateError } = await supabase
        .from('menu_items')
        .update({ image_url: targetUrl })
        .eq('id', item.id);

      if (updateError) {
        console.error(`  [FAILED UPDATE] ${updateError.message}`);
      } else {
        console.log(`  [UPDATED SUCCESSFULLY]`);
        updatedCount++;
      }
    } else {
      console.log(`  [ALREADY MATCHES]`);
    }
  }

  console.log(`\nFinished sync: ${updatedCount} items updated in Supabase.`);
}

runSync().catch(console.error);
