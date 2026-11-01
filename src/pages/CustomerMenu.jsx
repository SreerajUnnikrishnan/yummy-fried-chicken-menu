import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Search,
  Flame,
  Star,
  Send,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  MessageSquare,
} from 'lucide-react';
import { useMenu } from '../context/useMenu';
import {
  STORE_INFO,
  formatKD,
  parseDescriptionBullets,
  filterAndRankMenuItems,
  resolveProductImageUrl,
  handleProductImageError,
  isCutoutProduct,
} from '../data/seedMenu';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';

const isMojitosJuices = (catId) =>
  catId === 'mojitos-juices' || String(catId) === '7';

const isFrappesShakes = (catId) =>
  catId === 'frappe-shakes-lassi' || String(catId) === '8';

const isItemInCat = (item, cat) => {
  if (!cat || !item) return false;
  if (item.category_id === cat.id || String(item.category_id) === String(cat.id)) return true;
  if (isMojitosJuices(cat.id) && isMojitosJuices(item.category_id)) return true;
  if (isFrappesShakes(cat.id) && isFrappesShakes(item.category_id)) return true;
  return false;
};

function getItemSubCategory(item) {
  if (item.sub_category) return item.sub_category;
  const n = `${item.name_en || ''} ${item.name_ar || ''}`.toLowerCase();
  const c = String(item.category_id);
  if (c === '7' || c === 'mojitos-juices') {
    return n.includes('juice') || n.includes('عصير') ? 'Juice' : 'Mojito';
  }
  if (c === '8' || c === 'frappe-shakes-lassi') {
    if (n.includes('frappe') || n.includes('فرابيه')) return 'Frappe';
    if (n.includes('shake') || n.includes('شيك')) return 'Shake';
    if (n.includes('lassi') || n.includes('لاسي')) return 'Lassi';
  }
  return null;
}

function SubcategorySection({
  titleEn,
  titleAr,
  items,
  category,
  lang,
  isDark,
  onSelectItem,
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-4 mb-7">
      {/* Subcategory Section Heading */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="h-4 w-1 rounded-full bg-amber-400" />
        <h3 className="text-sm sm:text-base font-black tracking-wider uppercase text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>{titleEn}</span>
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            / {titleAr}
          </span>
        </h3>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-500 dark:bg-amber-400/15 dark:text-amber-400">
          {items.length} {lang === 'ar' ? 'أصناف' : 'items'}
        </span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800/80" />
      </div>

      {/* Grid of Individual Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4.5">
        {items.map((item, idx) => (
          <ProductCard
            key={item.id}
            item={item}
            index={idx}
            category={category}
            lang={lang}
            viewMode="grid"
            onSelectItem={onSelectItem}
          />
        ))}
      </div>
    </div>
  );
}

export default function CustomerMenu() {
  const {
    lang,
    theme,
    categories,
    menuItems,
    loading,
    showReviews,
    addReview,
    getItemRatingStats,
    getCategoryViewMode,
  } = useMenu();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Star Rating & Short Review Form State inside Product Modal
  const [ratingInput, setRatingInput] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  // Background Scroll Lock (Body Lock) when Product Detail Modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      setRatingInput(5);
      setHoverRating(0);
      setReviewText('');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedItem]);

  // Item counts per category for the 'More' modal
  const itemCounts = useMemo(() => {
    const counts = {};
    categories.forEach((cat) => {
      counts[cat.id] = menuItems.filter((i) => isItemInCat(i, cat)).length;
    });
    return counts;
  }, [categories, menuItems]);

  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.id] = cat;
    });
    return map;
  }, [categories]);

  // Special Offers list (displayed right below the category grid when viewing All)
  const offerItems = useMemo(() => {
    return menuItems.filter(
      (item) =>
        Boolean(item.is_offer) ||
        (item.original_price && Number(item.original_price) > Number(item.price))
    );
  }, [menuItems]);

  // Smart Partial & Multi-Keyword Search + Category Filtering
  // When a search query is typed (e.g. 'wrap', 'burger', 'bucket', 'mango', 'juice'),
  // it searches globally across all menu items regardless of prefix words or active category.
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim();
    if (q) {
      return filterAndRankMenuItems(menuItems, q, categoryMap);
    }
    if (activeCategory !== 'all') {
      return menuItems.filter((item) =>
        isItemInCat(item, { id: activeCategory })
      );
    }
    return menuItems;
  }, [menuItems, activeCategory, searchQuery, categoryMap]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;
    await addReview({
      itemId: selectedItem.id,
      rating: ratingInput,
      comment: reviewText,
      author: reviewerName,
    });
    setReviewText('');
    setRatingInput(5);
  };

  const selectedItemStats = selectedItem
    ? getItemRatingStats(selectedItem.id)
    : { average: 0, count: 0, itemReviews: [] };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-white text-zinc-900'
        }`}
    >
      <div>
        {/* Top Category Grid (5 Category Cards + 6th 'More' Card) & Search Bar */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          itemCounts={itemCounts}
          lang={lang}
        />

        {/* Main Content: Special Offers + Full Menu List */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 pb-12">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-64 rounded-2xl animate-pulse ${isDark ? 'bg-[#141414]' : 'bg-zinc-200/70'
                    }`}
                />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div
              className={`text-center py-14 px-4 rounded-2xl my-4 ${isDark
                  ? 'bg-[#141414] ring-1 ring-white/10'
                  : 'bg-white shadow-sm ring-1 ring-zinc-200'
                }`}
            >
              <Search className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <h3 className="text-base font-bold">
                {lang === 'ar'
                  ? 'لا توجد أصناف مطابقة'
                  : 'No matching items found'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs cursor-pointer"
              >
                {lang === 'ar' ? 'عرض الكل' : 'Show Full Menu'}
              </button>
            </div>
          ) : activeCategory === 'all' && !searchQuery ? (
            <div className="space-y-8">
              {/* 1. SPECIAL OFFERS SECTION */}
              {offerItems.length > 0 && (
                <section id="special-offers">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
                      <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    </span>
                    <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                      {lang === 'ar' ? 'العروض الخاصة' : 'Special Offers'}
                      <span
                        className={`mx-2 text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'
                          }`}
                      >
                        {lang === 'ar' ? 'Special Offers' : 'العروض الخاصة'}
                      </span>
                    </h2>
                  </div>

                  <div
                    className={
                      getCategoryViewMode('special-offers') === 'grid'
                        ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4'
                        : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
                    }
                  >
                    {offerItems.map((item, idx) => (
                      <ProductCard
                        key={`offer-${item.id}`}
                        item={item}
                        index={idx}
                        category={categoryMap[item.category_id]}
                        lang={lang}
                        viewMode={getCategoryViewMode('special-offers')}
                        onSelectItem={setSelectedItem}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 2. FULL MENU LIST BY CATEGORY */}
              {categories.map((cat) => {
                const catItems = filteredItems.filter((i) => isItemInCat(i, cat));
                if (catItems.length === 0) return null;
                const catViewMode = getCategoryViewMode(cat.id);
                const isMJ = isMojitosJuices(cat.id);
                const isFSL = isFrappesShakes(cat.id);

                return (
                  <section
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                        {lang === 'ar' ? cat.name_ar : cat.name_en}
                        <span
                          className={`mx-2 text-xs font-medium ${
                            isDark ? 'text-zinc-400' : 'text-zinc-500'
                          }`}
                        >
                          {lang === 'ar' ? cat.name_en : cat.name_ar}
                        </span>
                      </h2>
                    </div>

                    {isMJ ? (
                      <div>
                        <SubcategorySection
                          titleEn="MOJITO"
                          titleAr="موهيتو"
                          items={catItems.filter((i) => getItemSubCategory(i) === 'Mojito')}
                          category={cat}
                          lang={lang}
                          isDark={isDark}
                          onSelectItem={setSelectedItem}
                        />
                        <SubcategorySection
                          titleEn="JUICE"
                          titleAr="عصائر طازجة"
                          items={catItems.filter((i) => getItemSubCategory(i) === 'Juice')}
                          category={cat}
                          lang={lang}
                          isDark={isDark}
                          onSelectItem={setSelectedItem}
                        />
                      </div>
                    ) : isFSL ? (
                      <div>
                        <SubcategorySection
                          titleEn="FRAPPE"
                          titleAr="فرابيه"
                          items={catItems.filter((i) => getItemSubCategory(i) === 'Frappe')}
                          category={cat}
                          lang={lang}
                          isDark={isDark}
                          onSelectItem={setSelectedItem}
                        />
                        <SubcategorySection
                          titleEn="SHAKE"
                          titleAr="ميلك شيك"
                          items={catItems.filter((i) => getItemSubCategory(i) === 'Shake')}
                          category={cat}
                          lang={lang}
                          isDark={isDark}
                          onSelectItem={setSelectedItem}
                        />
                        <SubcategorySection
                          titleEn="LASSI"
                          titleAr="لاسي منعش"
                          items={catItems.filter((i) => getItemSubCategory(i) === 'Lassi')}
                          category={cat}
                          lang={lang}
                          isDark={isDark}
                          onSelectItem={setSelectedItem}
                        />
                      </div>
                    ) : (
                      <div
                        className={
                          catViewMode === 'grid'
                            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4'
                            : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
                        }
                      >
                        {catItems.map((item, idx) => (
                          <ProductCard
                            key={item.id}
                            item={item}
                            index={idx}
                            category={cat}
                            lang={lang}
                            viewMode={catViewMode}
                            onSelectItem={setSelectedItem}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          ) : !searchQuery && isMojitosJuices(activeCategory) ? (
            /* Mojitos & Juices Category Dedicated Subcategory Layout */
            <div>
              <SubcategorySection
                titleEn="MOJITO"
                titleAr="موهيتو"
                items={filteredItems.filter((i) => getItemSubCategory(i) === 'Mojito')}
                category={categoryMap[activeCategory] || { id: activeCategory, name_en: 'Mojitos & Juices', name_ar: 'الموهيتو والعصائر' }}
                lang={lang}
                isDark={isDark}
                onSelectItem={setSelectedItem}
              />
              <SubcategorySection
                titleEn="JUICE"
                titleAr="عصائر طازجة"
                items={filteredItems.filter((i) => getItemSubCategory(i) === 'Juice')}
                category={categoryMap[activeCategory] || { id: activeCategory, name_en: 'Mojitos & Juices', name_ar: 'الموهيتو والعصائر' }}
                lang={lang}
                isDark={isDark}
                onSelectItem={setSelectedItem}
              />
            </div>
          ) : !searchQuery && isFrappesShakes(activeCategory) ? (
            /* Frappe, Shakes & Lassi Category Dedicated Subcategory Layout */
            <div>
              <SubcategorySection
                titleEn="FRAPPE"
                titleAr="فرابيه"
                items={filteredItems.filter((i) => getItemSubCategory(i) === 'Frappe')}
                category={categoryMap[activeCategory] || { id: activeCategory, name_en: 'Frappe, Shakes & Lassi', name_ar: 'فرابيه، ميلك شيك ولاسي' }}
                lang={lang}
                isDark={isDark}
                onSelectItem={setSelectedItem}
              />
              <SubcategorySection
                titleEn="SHAKE"
                titleAr="ميلك شيك"
                items={filteredItems.filter((i) => getItemSubCategory(i) === 'Shake')}
                category={categoryMap[activeCategory] || { id: activeCategory, name_en: 'Frappe, Shakes & Lassi', name_ar: 'فرابيه، ميلك شيك ولاسي' }}
                lang={lang}
                isDark={isDark}
                onSelectItem={setSelectedItem}
              />
              <SubcategorySection
                titleEn="LASSI"
                titleAr="لاسي منعش"
                items={filteredItems.filter((i) => getItemSubCategory(i) === 'Lassi')}
                category={categoryMap[activeCategory] || { id: activeCategory, name_en: 'Frappe, Shakes & Lassi', name_ar: 'فرابيه، ميلك شيك ولاسي' }}
                lang={lang}
                isDark={isDark}
                onSelectItem={setSelectedItem}
              />
            </div>
          ) : (
            /* Filtered Category or Search Results Grid */
            <div
              className={
                (activeCategory !== 'all'
                  ? getCategoryViewMode(activeCategory)
                  : getCategoryViewMode('_default')) === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4'
                  : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
              }
            >
              {filteredItems.map((item, idx) => {
                const mode =
                  activeCategory !== 'all'
                    ? getCategoryViewMode(activeCategory)
                    : getCategoryViewMode(item.category_id);
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    index={idx}
                    category={categoryMap[item.category_id]}
                    lang={lang}
                    viewMode={mode}
                    onSelectItem={setSelectedItem}
                  />
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* =====================================================================
          FOOTER WITH OFFICIAL FACEBOOK & INSTAGRAM SOCIAL MEDIA ICONS
      ===================================================================== */}
      <footer
        className={`py-8 px-4 transition-colors ${isDark ? 'bg-[#0D0D0D] text-zinc-300' : 'bg-white text-zinc-700 shadow-inner'
          }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Brand & Branch Info */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-14 h-14 rounded-xl bg-[#0A0A0A] flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/brand/logo-yummy.png"
                alt="Yummy Fried Chicken"
                className="w-full h-full object-contain scale-[1.85]"
              />
            </div>
            <div>
              <p
                className={`font-extrabold text-sm sm:text-base ${isDark ? 'text-white' : 'text-zinc-900'
                  }`}
              >
                Yummy Fried Chicken Kuwait • يمي فرايد تشيكن
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-zinc-400 mt-0.5">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {lang === 'ar'
                    ? STORE_INFO.location_ar
                    : STORE_INFO.location_en}
                </span>
                <a
                  href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1 hover:text-amber-500 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span dir="ltr">{STORE_INFO.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
                >
                  <span>WhatsApp:</span>
                  <span dir="ltr">{STORE_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Official WhatsApp, Facebook & Instagram Links */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order via WhatsApp +965 55161435"
              title="WhatsApp +965 55161435"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#181818] hover:bg-[#25D366] text-white ring-1 ring-white/10'
                  : 'bg-zinc-100 hover:bg-[#25D366] text-zinc-800 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={STORE_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Yummy Fried Chicken Kuwait on Facebook"
              title="Facebook"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#181818] hover:bg-[#1877F2] text-white ring-1 ring-white/10'
                  : 'bg-zinc-100 hover:bg-[#1877F2] text-zinc-800 hover:text-white'
              }`}
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>

            <a
              href={STORE_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Yummy Fried Chicken Kuwait on Instagram"
              title="Instagram @yummyfriedchicken_kuwait"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#181818] hover:bg-gradient-to-r hover:from-pink-600 hover:to-amber-500 text-white ring-1 ring-white/10'
                  : 'bg-zinc-100 hover:bg-gradient-to-r hover:from-pink-600 hover:to-amber-500 text-zinc-800 hover:text-white'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          ITEM DETAIL & CUSTOMER REVIEW MODAL (With Background Scroll Lock)
      ===================================================================== */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className={`w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col ${isDark
                ? 'bg-[#161616] text-white ring-1 ring-white/10'
                : 'bg-white text-zinc-900'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div
              className={`relative h-60 sm:h-72 shrink-0 flex items-center justify-center overflow-hidden ${
                selectedItem.category_id === 'mojitos-juices' ||
                selectedItem.category_id === 'frappe-shakes-lassi'
                  ? isDark
                    ? 'bg-gradient-to-b from-[#1E1E1E] via-[#141414] to-[#101010]'
                    : 'bg-gradient-to-b from-amber-50/50 via-zinc-50 to-white'
                  : isCutoutProduct(selectedItem)
                  ? 'bg-[#FDFDFD]'
                  : isDark
                  ? 'bg-black'
                  : 'bg-zinc-100'
              }`}
            >
              {/* Ambient Glow for Beverage Drinks */}
              {(selectedItem.category_id === 'mojitos-juices' ||
                selectedItem.category_id === 'frappe-shakes-lassi') && (
                <div
                  className={`absolute inset-x-12 inset-y-8 rounded-full blur-3xl pointer-events-none ${
                    isDark ? 'bg-amber-400/15' : 'bg-amber-400/25'
                  }`}
                />
              )}

              <img
                src={resolveProductImageUrl(selectedItem)}
                alt={selectedItem.name_en}
                onError={(e) => {
                  handleProductImageError(e, selectedItem, categoryMap);
                }}
                className={`relative z-10 transition-transform ${
                  selectedItem.category_id === 'mojitos-juices' ||
                  selectedItem.category_id === 'frappe-shakes-lassi'
                    ? 'max-w-full max-h-full object-contain p-4 drop-shadow-[0_14px_28px_rgba(0,0,0,0.5)]'
                    : 'w-full h-full object-contain p-3'
                } ${!selectedItem.is_available ? 'grayscale' : ''}`}
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {!selectedItem.is_available ? (
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-zinc-900/95 text-zinc-200 text-xs font-bold uppercase">
                  {lang === 'ar' ? 'نفذت الكمية • Sold Out' : 'Sold Out'}
                </span>
              ) : selectedItem.is_offer ? (
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-red-600 text-white text-xs font-bold">
                  {lang === 'ar' ? 'عرض خاص' : 'Offer'}
                </span>
              ) : null}
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Bilingual Title & Price Row */}
              <div className="flex items-start justify-between gap-3">
                <div dir="ltr" className="space-y-0.5 flex-1">
                  <h3 className="text-lg font-extrabold text-left">
                    {selectedItem.name_en}
                  </h3>
                  <p
                    dir="rtl"
                    className={`text-sm font-bold text-right ${isDark ? 'text-amber-400' : 'text-amber-600'
                      }`}
                  >
                    {selectedItem.name_ar}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-xl font-extrabold block ${isDark ? 'text-amber-400' : 'text-zinc-900'
                      }`}
                  >
                    {formatKD(selectedItem.price, lang)}
                  </span>
                  {selectedItem.original_price && (
                    <span className="text-xs text-zinc-400 line-through">
                      {formatKD(selectedItem.original_price, lang)}
                    </span>
                  )}
                </div>
              </div>

              {/* Bilingual Bullet Points (Left English / Right Arabic) */}
              {(selectedItem.description_en || selectedItem.description_ar) && (
                <div
                  dir="ltr"
                  className={`grid grid-cols-2 gap-3 p-3.5 rounded-2xl ${isDark ? 'bg-black/45' : 'bg-zinc-50'
                    }`}
                >
                  <ul dir="ltr" className="space-y-1.5 text-left">
                    {parseDescriptionBullets(selectedItem.description_en).map(
                      (point, idx) => (
                        <li
                          key={`modal-en-${idx}`}
                          className={`flex items-start gap-1.5 text-xs leading-snug ${isDark ? 'text-zinc-300' : 'text-zinc-600'
                            }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      )
                    )}
                  </ul>

                  <ul dir="rtl" className="space-y-1.5 text-right">
                    {parseDescriptionBullets(selectedItem.description_ar).map(
                      (point, idx) => (
                        <li
                          key={`modal-ar-${idx}`}
                          className={`flex items-start gap-1.5 text-xs leading-snug ${isDark ? 'text-zinc-300' : 'text-zinc-600'
                            }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* ===============================================================
                  CUSTOMER STAR RATING & SHORT REVIEW SECTION
              =============================================================== */}
              <div
                className={`p-4 rounded-2xl space-y-3.5 ${isDark
                    ? 'bg-[#1E1E1E] ring-1 ring-white/5'
                    : 'bg-zinc-100/80 ring-1 ring-zinc-200/80'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs sm:text-sm font-extrabold">
                      {lang === 'ar'
                        ? 'تقييم الصنف وآراء العملاء'
                        : 'Rate & Review This Dish'}
                    </h4>
                  </div>

                  {showReviews && selectedItemStats.count > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-500 text-xs font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{selectedItemStats.average.toFixed(1)}</span>
                      <span className="opacity-75">
                        ({selectedItemStats.count})
                      </span>
                    </span>
                  )}
                </div>

                {/* Interactive 1 to 5 Star Rating & Short Review Form */}
                <form onSubmit={handleReviewSubmit} className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                    >
                      {lang === 'ar' ? 'اختر التقييم (1 - 5):' : 'Your Rating:'}
                    </span>

                    <div className="flex items-center gap-1" dir="ltr">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= (hoverRating || ratingInput);
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRatingInput(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            aria-label={`Rate ${star} stars`}
                            className="p-1 transition-transform active:scale-90 hover:scale-110 cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 transition-colors ${isFilled
                                  ? 'fill-amber-400 text-amber-400'
                                  : isDark
                                    ? 'text-zinc-600'
                                    : 'text-zinc-300'
                                }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder={
                        lang === 'ar' ? 'اسمك (اختياري)' : 'Your name (optional)'
                      }
                      className={`sm:w-36 px-3 py-2 rounded-xl text-xs focus:outline-none ${isDark
                          ? 'bg-black text-white placeholder-zinc-500'
                          : 'bg-white text-zinc-900 placeholder-zinc-400'
                        }`}
                    />

                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder={
                          lang === 'ar'
                            ? 'اكتب رأيك المختصر عن الوجبة...'
                            : 'Write a short review...'
                        }
                        className={`flex-1 px-3 py-2 rounded-xl text-xs focus:outline-none ${isDark
                            ? 'bg-black text-white placeholder-zinc-500'
                            : 'bg-white text-zinc-900 placeholder-zinc-400'
                          }`}
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'إرسال' : 'Submit'}</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Recent Customer Reviews List (Shown when enabled by Admin) */}
                {showReviews && selectedItemStats.itemReviews.length > 0 && (
                  <div className="space-y-2 pt-1 max-h-40 overflow-y-auto pr-1">
                    {selectedItemStats.itemReviews.slice(0, 6).map((rev) => (
                      <div
                        key={rev.id}
                        className={`p-2.5 rounded-xl text-xs ${isDark ? 'bg-black/60' : 'bg-white'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold">{rev.author}</span>
                          <div className="flex items-center gap-0.5" dir="ltr">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-3 h-3 ${idx < rev.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-zinc-500/40'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        {rev.comment && (
                          <p
                            className={
                              isDark ? 'text-zinc-300' : 'text-zinc-600'
                            }
                          >
                            {rev.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
