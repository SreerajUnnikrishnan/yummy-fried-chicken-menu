-- =============================================================================
-- YUMMY FRIED CHICKEN KUWAIT (FAHAHEEL) - SUPABASE SCHEMA & SEED SCRIPT
-- Run this SQL inside your Supabase SQL Editor to set up tables, storage & RLS
-- =============================================================================

-- 1. Create `categories` table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  icon TEXT DEFAULT 'Utensils',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create `menu_items` table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_ar TEXT DEFAULT '',
  price NUMERIC(6, 3) NOT NULL,
  original_price NUMERIC(6, 3),
  is_offer BOOLEAN DEFAULT FALSE,
  offer_label_en TEXT DEFAULT 'SPECIAL OFFER',
  offer_label_ar TEXT DEFAULT 'عرض خاص',
  is_available BOOLEAN DEFAULT TRUE,
  is_popular BOOLEAN DEFAULT FALSE,
  spicy_level INTEGER DEFAULT 0,
  image_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS) with public read/write policies for demo/PIN-protected client admin
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read categories" ON public.categories;
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public write categories" ON public.categories;
CREATE POLICY "Allow public write categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read menu_items" ON public.menu_items;
CREATE POLICY "Allow public read menu_items" ON public.menu_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public write menu_items" ON public.menu_items;
CREATE POLICY "Allow public write menu_items" ON public.menu_items FOR ALL USING (true) WITH CHECK (true);

-- 4. Create Storage Bucket `menu-images`
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access to menu-images" ON storage.objects;
CREATE POLICY "Public Access to menu-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

DROP POLICY IF EXISTS "Allow Uploads to menu-images" ON storage.objects;
CREATE POLICY "Allow Uploads to menu-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'menu-images');

DROP POLICY IF EXISTS "Allow Updates to menu-images" ON storage.objects;
CREATE POLICY "Allow Updates to menu-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'menu-images');

DROP POLICY IF EXISTS "Allow Deletes from menu-images" ON storage.objects;
CREATE POLICY "Allow Deletes from menu-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'menu-images');

-- 5. Seed the 8 Required Categories
INSERT INTO public.categories (id, name_en, name_ar, slug, sort_order, icon) VALUES
  ('buckets-meals', 'Buckets & Meals', 'بوكيت ووجبات', 'buckets-meals', 1, 'Drumstick'),
  ('strips-combos', 'Strips & Combos', 'ستربس وكومبو', 'strips-combos', 2, 'Flame'),
  ('burgers', 'Burgers', 'برجر', 'burgers', 3, 'Sandwich'),
  ('prawns-special', 'Prawns Special', 'روبيان سبيشل', 'prawns-special', 4, 'Sparkles'),
  ('signature-wraps', 'Signature Wraps', 'رابس مميزة', 'signature-wraps', 5, 'Scroll'),
  ('loaded-fries-sides', 'Loaded Fries & Sides', 'بطاطس محملة ومقبلات', 'loaded-fries-sides', 6, 'Utensils'),
  ('mojitos-juices', 'Mojitos & Juices', 'موهيتو وعصائر', 'mojitos-juices', 7, 'CupSoda'),
  ('frappe-shakes-lassi', 'Frappe/Shakes/Lassi', 'فرابيه / ميلك شيك / لاسي', 'frappe-shakes-lassi', 8, 'IceCream')
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ar = EXCLUDED.name_ar,
  sort_order = EXCLUDED.sort_order;

