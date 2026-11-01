# Yummy Fried Chicken Kuwait — Digital Web Menu & Staff Admin Dashboard

A mobile-first, bilingual (English / Arabic) Digital Web Menu (`/`) and Staff Admin Dashboard (`/admin`) built for **Yummy Fried Chicken (Fahaheel, Kuwait)** using **React**, **Tailwind CSS**, **Lucide React**, and **Supabase**.

## Key Features

### 1. Customer Digital Menu (`/`)
- **Brand Header**: Official Yummy Fried Chicken Kuwait logo, Fahaheel branch location & hours, quick phone call button, and instant **English / العربية** language toggle with full RTL/LTR support.
- **8 Category Filter Tabs**:
  1. **Buckets & Meals** (`بوكيت ووجبات`)
  2. **Strips & Combos** (`ستربس وكومبو`)
  3. **Burgers** (`برجر`)
  4. **Prawns Special** (`روبيان سبيشل`)
  5. **Signature Wraps** (`رابس مميزة`)
  6. **Loaded Fries & Sides** (`بطاطس محملة ومقبلات`)
  7. **Mojitos & Juices** (`موهيتو وعصائر`)
  8. **Frappe/Shakes/Lassi** (`فرابيه / ميلك شيك / لاسي`)
- **Instant Search & Offer Filter**: Real-time search bar filtering by English & Arabic titles/descriptions, plus a 1-click **Special Offers** filter.
- **Product Cards**:
  - High-impact food imagery with quick-view modal
  - Bilingual titles (both **English & Arabic** displayed on every card)
  - Appetizing descriptions
  - Prices formatted in **Kuwaiti Dinar (`KD`, 3 decimals, e.g., `1.500 KD`)**
  - Crimson & Gold **Offer Badge** on discounted items
  - Grayed-out **Sold Out (`نفذت الكمية`)** badge & overlay when an item is out of stock

### 2. Staff Admin Dashboard (`/admin`)
- **4-Digit PIN Login**: Protected by a touch-friendly 4-digit PIN pad (Default PIN: `1234`, configurable via `VITE_ADMIN_PIN`).
- **Full Item & Price Management**:
  - View all items with KPI counters (Total, Available, Sold Out, Active Offers)
  - Add new menu items (English & Arabic titles, descriptions, category, KD price, offer badge)
  - Inline 1-click **KD Price Editor** + full Edit Item modal
  - 1-tap **Available / Out of Stock** toggle switch
  - Direct image upload to Supabase Storage bucket `menu-images`

### 3. Supabase Setup
1. Copy `.env.example` to `.env` and add your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_ADMIN_PIN=1234
   ```
2. Open your Supabase SQL Editor and run [`supabase_schema.sql`](./supabase_schema.sql) to create the `categories` and `menu_items` tables and the `menu-images` storage bucket.
3. In `/admin`, click **Supabase Setup -> Seed Tables** to populate all 8 categories and initial menu items into your Supabase project.

