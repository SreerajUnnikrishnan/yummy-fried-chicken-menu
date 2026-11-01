import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  LayoutGrid,
  ChevronRight,
  Drumstick,
  Sandwich,
  ScrollText,
  Utensils,
  Flame,
  Sparkles,
  CupSoda,
  IceCream,
  Check,
  Rows3,
} from 'lucide-react';
import { useMenu } from '../context/useMenu';
import { CATEGORY_HEADER_IMAGES, CATEGORY_DEFAULT_IMAGES, SAFE_IMAGE_FALLBACK } from '../data/seedMenu';

const ICON_MAP = {
  Drumstick,
  Sandwich,
  ScrollText,
  Scroll: ScrollText,
  Utensils,
  Flame,
  Sparkles,
  CupSoda,
  IceCream,
};

const FALLBACK_CATEGORY_IMAGES = CATEGORY_HEADER_IMAGES;

/**
 * Returns the dedicated category header image for Category Tabs.
 * Restores Buckets & Meals, Strips & Combos, Burgers, etc. to their respective header PNGs
 * instead of sharing the default brand poster image.
 */
export function getCategoryHeaderImage(cat) {
  if (!cat) return SAFE_IMAGE_FALLBACK;
  const catId = cat.id;

  if (
    cat.image_url &&
    !cat.image_url.includes('crunch-poster') &&
    !cat.image_url.includes('logo-yummy') &&
    !cat.image_url.includes('unsplash.com') &&
    cat.image_url.trim().length > 0
  ) {
    return cat.image_url.trim();
  }

  return CATEGORY_HEADER_IMAGES[catId] || SAFE_IMAGE_FALLBACK;
}

const DETAILED_CATEGORY_SECTIONS = [
  {
    id: 'meals-buckets',
    title_en: 'Bucket Meals & Combos',
    title_ar: 'وجبات البوكيت والكومبو',
    categoryIds: ['buckets-meals', 'strips-combos'],
  },
  {
    id: 'burgers-wraps',
    title_en: 'Burgers & Signature Wraps',
    title_ar: 'البرجر والرابس المميزة',
    categoryIds: ['burgers', 'signature-wraps'],
  },
  {
    id: 'seafood-sides',
    title_en: 'Prawns Special & Loaded Fries',
    title_ar: 'روبيان سبيشل وبطاطس محملة',
    categoryIds: ['prawns-special', 'loaded-fries-sides'],
  },
  {
    id: 'drinks-shakes',
    title_en: 'Mojitos, Juices, Frappe, Shakes & Lassi',
    title_ar: 'موهيتو، عصائر، فرابيه، ميلك شيك ولاسي',
    categoryIds: ['mojitos-juices', 'frappe-shakes-lassi'],
  },
];

export default function CategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  itemCounts = {},
  lang,
}) {
  const {
    theme,
    getCategoryViewMode,
    setCategoryViewMode,
    setAllCategoriesViewMode,
  } = useMenu();
  const isDark = theme === 'dark';
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  const currentTopViewMode =
    activeCategory !== 'all'
      ? getCategoryViewMode(activeCategory)
      : getCategoryViewMode('_default');

  const handleTopViewModeChange = (mode) => {
    if (activeCategory !== 'all') {
      setCategoryViewMode(activeCategory, mode);
    } else {
      setAllCategoriesViewMode(mode);
    }
  };

  // Build sections for the 'More' modal, automatically including any newly created categories (e.g., Shawarma)
  const builtInCategoryIds = new Set(
    DETAILED_CATEGORY_SECTIONS.flatMap((s) => s.categoryIds)
  );
  const customCategories = categories.filter(
    (c) => !builtInCategoryIds.has(c.id)
  );
  const dynamicSections =
    customCategories.length > 0
      ? [
          ...DETAILED_CATEGORY_SECTIONS,
          {
            id: 'custom-sections',
            title_en: 'Specialty & Custom Sections',
            title_ar: 'أقسام إضافية ومميزة',
            categoryIds: customCategories.map((c) => c.id),
          },
        ]
      : DETAILED_CATEGORY_SECTIONS;

  // Lock background page scrolling when 'More' modal is open
  useEffect(() => {
    if (isMoreModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMoreModalOpen]);

  // Top 5 categories displayed directly as image cards, remaining go into 'More'
  const topFiveCategories = categories.slice(0, 5);
  const moreCategories = categories.slice(5);

  const activeMoreCategory = moreCategories.find(
    (c) => c.id === activeCategory
  );

  const handleCardClick = (catId) => {
    if (activeCategory === catId) {
      onSelectCategory('all');
    } else {
      onSelectCategory(catId);
    }
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 pb-2 space-y-3">
        {/* Compact Search Bar + Prominent Single / 2-Column Grid View Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              className={`w-4 h-4 text-zinc-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                lang === 'ar' ? 'right-3.5' : 'left-3.5'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'ابحث عن وجبة، برجر، رابس، روبيان، بطاطس، مشروبات...'
                  : 'Search bucket meals, burgers, wraps, prawns, fries, drinks...'
              }
              aria-label="Search menu items by name"
              className={`w-full py-2.5 rounded-2xl text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                isDark
                  ? 'bg-[#151515] text-white placeholder-zinc-500 ring-1 ring-white/10'
                  : 'bg-white text-zinc-900 placeholder-zinc-400 shadow-sm ring-1 ring-zinc-200'
              } ${lang === 'ar' ? 'pr-10 pl-9' : 'pl-10 pr-9'}`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer ${
                  lang === 'ar' ? 'left-3' : 'right-3'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle: Single Card View vs. 2-Column Grid View */}
          <div
            className={`inline-flex items-center p-1 rounded-2xl shrink-0 ${
              isDark
                ? 'bg-[#151515] ring-1 ring-white/10'
                : 'bg-white shadow-sm ring-1 ring-zinc-200'
            }`}
            role="group"
            aria-label="Toggle Single Card View or 2-Column Grid View"
          >
            <button
              type="button"
              onClick={() => handleTopViewModeChange('single')}
              title={
                lang === 'ar'
                  ? 'عرض بطاقة واحدة (Single Card View)'
                  : 'Single Card View (Buckets & Meals)'
              }
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTopViewMode === 'single'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Rows3 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'عرض فردي' : 'Single View'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTopViewModeChange('grid')}
              title={
                lang === 'ar'
                  ? 'عرض شبكي عمودين (2-Column Grid View)'
                  : '2-Column Grid View (Drinks & Sides)'
              }
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTopViewMode === 'grid'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'شبكة عمودين' : '2-Col Grid'}
              </span>
            </button>
          </div>
        </div>

        {/* Sleek 6-Card Category Grid (Top 5 Category Cards + 6th 'More' Card) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
          {topFiveCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const imgUrl = getCategoryHeaderImage(cat);
            const label =
              lang === 'ar'
                ? cat.short_ar || cat.name_ar
                : cat.short_en || cat.name_en;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCardClick(cat.id)}
                className={`group relative flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-center ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-md ring-2 ring-amber-500 scale-[1.02]'
                    : isDark
                    ? 'bg-[#151515] hover:bg-[#1E1E1E] text-white ring-1 ring-white/10'
                    : 'bg-white hover:bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-zinc-200/90'
                }`}
              >
                {/* Category Image Placed Directly Inside Button Container */}
                <img
                  src={imgUrl}
                  alt={cat.name_en}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    const canonical = CATEGORY_HEADER_IMAGES[cat.id] || SAFE_IMAGE_FALLBACK;
                    if (!e.currentTarget.src.includes(canonical)) {
                      e.currentTarget.src = canonical;
                    }
                  }}
                  className="w-full h-16 sm:h-20 object-contain mb-1.5 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category Title */}
                <span
                  className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-1 ${
                    isActive
                      ? 'text-black font-extrabold'
                      : isDark
                      ? 'text-zinc-100'
                      : 'text-zinc-800'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}

          {/* 6th Card: 'More' Button (Opens Detailed Category Organization Modal) */}
          <button
            type="button"
            onClick={() => setIsMoreModalOpen(true)}
            className={`group relative flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-center ${
              activeMoreCategory
                ? 'bg-amber-400 text-black shadow-md ring-2 ring-amber-500 scale-[1.02]'
                : isDark
                ? 'bg-[#151515] hover:bg-[#1E1E1E] text-white ring-1 ring-white/10'
                : 'bg-white hover:bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-zinc-200/90'
            }`}
          >
            <div
              className={`w-full h-16 sm:h-20 rounded-xl mb-1.5 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                activeMoreCategory
                  ? 'bg-black text-amber-400'
                  : isDark
                  ? 'bg-amber-400/15 text-amber-400 ring-1 ring-amber-400/30'
                  : 'bg-amber-50 text-amber-600 ring-1 ring-amber-200'
              }`}
            >
              <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="text-[10px] font-extrabold mt-0.5">
                {lang === 'ar' ? 'الأقسام' : 'All'}
              </span>
            </div>

            <span
              className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-1 ${
                activeMoreCategory
                  ? 'text-black font-extrabold'
                  : isDark
                  ? 'text-amber-400'
                  : 'text-amber-600'
              }`}
            >
              {activeMoreCategory
                ? lang === 'ar'
                  ? activeMoreCategory.short_ar || activeMoreCategory.name_ar
                  : activeMoreCategory.short_en || activeMoreCategory.name_en
                : lang === 'ar'
                ? 'المزيد'
                : 'More'}
            </span>
          </button>
        </div>

        {/* Active Category Filter Pill */}
        {activeCategory !== 'all' && (
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>
                {lang === 'ar' ? 'القسم المختار:' : 'Category:'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-black font-bold">
                {(() => {
                  const found = categories.find((c) => c.id === activeCategory);
                  if (!found) return activeCategory;
                  return lang === 'ar' ? found.name_ar : found.name_en;
                })()}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className="text-xs font-bold text-amber-500 hover:text-amber-400 cursor-pointer"
            >
              {lang === 'ar' ? 'عرض جميع الأقسام' : 'Show Full Menu'}
            </button>
          </div>
        )}
      </section>

      {/* =====================================================================
          DETAILED CATEGORY ORGANIZATION ('MORE' MENU MODAL)
      ===================================================================== */}
      {isMoreModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setIsMoreModalOpen(false)}
        >
          <div
            className={`w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[88vh] flex flex-col ${
              isDark
                ? 'bg-[#141414] text-white ring-1 ring-white/10'
                : 'bg-white text-zinc-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold">
                  {lang === 'ar' ? 'أقسام قائمة الطعام' : 'Menu Categories'}
                </h3>
                <p
                  className={`text-xs ${
                    isDark ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  {lang === 'ar'
                    ? 'اختر القسم للانتقال المباشر'
                    : 'Choose any section to browse items'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMoreModalOpen(false)}
                className={`p-2 rounded-full cursor-pointer ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-zinc-300'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 pb-6 space-y-5 overflow-y-auto">
              {/* View Full Menu Option */}
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  setIsMoreModalOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-amber-400 text-black font-bold'
                    : isDark
                    ? 'bg-[#1C1C1C] hover:bg-[#242424] text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      activeCategory === 'all'
                        ? 'bg-black text-amber-400'
                        : 'bg-amber-400/15 text-amber-500'
                    }`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-extrabold">
                      {lang === 'ar'
                        ? 'عرض القائمة الكاملة والعروض'
                        : 'Full Menu & Special Offers'}
                    </p>
                    <p
                      className={`text-xs ${
                        activeCategory === 'all'
                          ? 'text-black/75'
                          : isDark
                          ? 'text-zinc-400'
                          : 'text-zinc-500'
                      }`}
                    >
                      {lang === 'ar'
                        ? 'جميع الوجبات والمشروبات والعروض'
                        : 'Browse all sections and discounted meals'}
                    </p>
                  </div>
                </div>
                {activeCategory === 'all' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-4 h-4 opacity-50" />
                )}
              </button>

              {/* Well-Defined Organized Category Sections (including dynamically added categories) */}
              {dynamicSections.map((section) => {
                const sectionCats = section.categoryIds
                  .map((id) => categories.find((c) => c.id === id))
                  .filter(Boolean);

                if (sectionCats.length === 0) return null;

                return (
                  <div key={section.id} className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <h4
                        className={`text-xs font-extrabold uppercase tracking-wider ${
                          isDark ? 'text-amber-400' : 'text-amber-600'
                        }`}
                      >
                        {lang === 'ar' ? section.title_ar : section.title_en}
                      </h4>
                      <span
                        className={`text-[11px] font-medium ${
                          isDark ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        {lang === 'ar' ? section.title_en : section.title_ar}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {sectionCats.map((cat) => {
                        const isSelected = activeCategory === cat.id;
                        const IconComponent = ICON_MAP[cat.icon] || Sparkles;
                        const imgUrl = getCategoryHeaderImage(cat);

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              onSelectCategory(cat.id);
                              setIsMoreModalOpen(false);
                            }}
                            className={`flex items-center justify-between p-2.5 rounded-2xl transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-black font-bold shadow-md'
                                : isDark
                                ? 'bg-[#1C1C1C] hover:bg-[#252525] text-white ring-1 ring-white/5'
                                : 'bg-zinc-100 hover:bg-zinc-200/75 text-zinc-900'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-zinc-900">
                                <img
                                  src={imgUrl}
                                  alt={cat.name_en}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    const canonical = CATEGORY_HEADER_IMAGES[cat.id] || SAFE_IMAGE_FALLBACK;
                                    if (!e.currentTarget.src.includes(canonical)) {
                                      e.currentTarget.src = canonical;
                                    }
                                  }}
                                />
                                <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded bg-black/75 text-amber-400 flex items-center justify-center">
                                  <IconComponent className="w-2.5 h-2.5" />
                                </span>
                              </div>

                              <div dir="ltr" className="text-left min-w-0">
                                <p className="text-xs sm:text-sm font-extrabold truncate">
                                  {cat.name_en}
                                </p>
                                <p
                                  dir="rtl"
                                  className={`text-xs font-bold truncate ${
                                    isSelected
                                      ? 'text-black/80'
                                      : isDark
                                      ? 'text-amber-400/90'
                                      : 'text-zinc-600'
                                  }`}
                                >
                                  {cat.name_ar}
                                </p>
                                <p
                                  className={`text-[10px] mt-0.5 ${
                                    isSelected
                                      ? 'text-black/70'
                                      : isDark
                                      ? 'text-zinc-400'
                                      : 'text-zinc-500'
                                  }`}
                                >
                                  {itemCounts[cat.id] || 0}{' '}
                                  {lang === 'ar' ? 'أصناف' : 'items'}
                                </p>
                              </div>
                            </div>

                            <ChevronRight
                              className={`w-4 h-4 shrink-0 ${
                                isSelected ? 'text-black' : 'opacity-40'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
