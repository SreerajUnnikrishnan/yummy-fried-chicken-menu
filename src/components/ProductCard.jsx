import React from 'react';
import { Star } from 'lucide-react';
import { useMenu } from '../context/useMenu';
import {
  formatKD,
  parseDescriptionBullets,
  resolveProductImageUrl,
  handleProductImageError,
  isCutoutProduct,
} from '../data/seedMenu';

export default function ProductCard({
  item,
  index = 0,
  category = null,
  lang,
  viewMode = 'single',
  onSelectItem,
}) {
  const { theme, showReviews, getItemRatingStats } = useMenu();
  const isDark = theme === 'dark';
  const isCompactGrid = viewMode === 'grid';

  const isSoldOut = !item.is_available;
  const isDiscounted =
    Boolean(item.is_offer) ||
    (item.original_price && Number(item.original_price) > Number(item.price));

  const bulletsEn = parseDescriptionBullets(item.description_en);
  const bulletsAr = parseDescriptionBullets(item.description_ar);

  const { average, count } = getItemRatingStats(item.id);

  const discountPercent =
    item.original_price && Number(item.original_price) > Number(item.price)
      ? Math.round(
          ((Number(item.original_price) - Number(item.price)) /
            Number(item.original_price)) *
            100
        )
      : null;

  const isBeverage =
    item.category_id === 'mojitos-juices' ||
    item.category_id === 'frappe-shakes-lassi' ||
    String(item.category_id) === '7' ||
    String(item.category_id) === '8' ||
    Boolean(item.is_beverage);

  // Pure dynamic database binding: read direct image URL from Supabase record
  const finalImageSrc = resolveProductImageUrl(item);
  const isStudioProduct = isCutoutProduct(item);

  // =========================================================================
  // MODERN STICKER-STYLE LAYOUT FOR BEVERAGES (NO CARD BOX / NO BULLETS)
  // =========================================================================
  if (isBeverage) {
    return (
      <div
        onClick={() => onSelectItem && onSelectItem(item)}
        className={`group relative flex flex-col items-center justify-between cursor-pointer select-none transition-all duration-300 p-3 sm:p-4 rounded-2xl ${
          isDark ? 'bg-[#141414]' : 'bg-white hover:bg-white'
        } ${isSoldOut ? 'opacity-60' : 'hover:-translate-y-1'}`}
      >
        {/* Floating Glass Container */}
        <div className="relative w-full h-44 sm:h-52 md:h-56 flex items-center justify-center">
          <img
            src={finalImageSrc}
            alt={`${item.name_en} - ${item.name_ar}`}
            loading="lazy"
            onError={(e) => {
              handleProductImageError(e, item);
            }}
            className={`w-full h-full object-contain p-2 transition-all duration-300 group-hover:scale-105 ${
              isSoldOut ? 'grayscale' : ''
            }`}
          />

          {/* Minimal Floating Badges if Sold Out or Offer */}
          {isSoldOut ? (
            <span className="absolute top-1 px-2.5 py-0.5 rounded-full bg-zinc-900/90 text-zinc-300 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
              {lang === 'ar' ? 'نفذت الكمية' : 'Sold Out'}
            </span>
          ) : isDiscounted ? (
            <span className="absolute top-1 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold tracking-wider shadow-md">
              {lang === 'ar' ? 'عرض' : 'Offer'}
            </span>
          ) : null}
        </div>

        {/* Directly Below: Only Clear Drink Name & Price in a Neat Minimalist Font */}
        <div className="mt-2.5 text-center w-full space-y-1">
          <p
            dir="ltr"
            className={`text-sm sm:text-base font-extrabold tracking-tight transition-colors group-hover:text-amber-500 ${
              isDark ? 'text-zinc-100' : 'text-zinc-900'
            }`}
          >
            <span>{item.name_en}</span>
            <span className="text-zinc-400 dark:text-zinc-500 mx-1.5 font-normal">
              —
            </span>
            <span className="text-amber-500 dark:text-amber-400 font-black whitespace-nowrap">
              {formatKD(item.price, lang)}
            </span>
          </p>

          {item.name_ar && (
            <p
              dir="rtl"
              className="text-xs sm:text-sm font-bold text-zinc-400 dark:text-zinc-400 group-hover:text-amber-400/90 transition-colors"
            >
              {item.name_ar}
            </p>
          )}

          {isDiscounted && item.original_price && !isSoldOut && (
            <p className="text-[11px] text-zinc-400 line-through font-medium">
              {formatKD(item.original_price, lang)}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={() => onSelectItem && onSelectItem(item)}
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${
        isDark ? 'bg-[#141414] text-white' : 'bg-white hover:bg-white text-zinc-900'
      } ${isSoldOut ? 'opacity-65' : 'hover:-translate-y-0.5'}`}
    >
      {/* Product Image Container: Consistent Aspect Ratio & Centered Scaling */}
      <div
        className={`relative w-full overflow-hidden flex items-center justify-center ${
          isCompactGrid
            ? 'aspect-square'
            : 'h-48 sm:h-56'
        } ${isDark ? 'bg-[#181818]' : 'bg-white hover:bg-white'}`}
      >
        <img
          src={finalImageSrc}
          alt={`${item.name_en} - ${item.name_ar}`}
          loading="lazy"
          onError={(e) => {
            handleProductImageError(e, item);
          }}
          className={`w-full h-full object-contain p-2.5 sm:p-3.5 transition-transform duration-300 ${
            isSoldOut ? 'grayscale' : 'group-hover:scale-105'
          }`}
        />

        {/* Top Badges: Sold Out / Discount Badge + Average Star Rating Badge */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1.5 pointer-events-none">
          <div>
            {isSoldOut ? (
              <span className="px-2 py-0.5 rounded-md bg-zinc-900/90 text-zinc-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide">
                {lang === 'ar' ? 'نفذت الكمية' : 'Sold Out'}
              </span>
            ) : isDiscounted ? (
              <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] sm:text-[11px] font-bold tracking-wide shadow-sm">
                {lang === 'ar'
                  ? `عرض${discountPercent ? ` ${discountPercent}%-` : ''}`
                  : `Offer${discountPercent ? ` -${discountPercent}%` : ''}`}
              </span>
            ) : null}
          </div>

          {showReviews && count > 0 && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-bold shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{average.toFixed(1)}</span>
              <span className="text-zinc-300 font-medium">({count})</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div
        className={`flex flex-col flex-1 justify-between ${
          isCompactGrid ? 'p-2.5 sm:p-3.5 gap-2' : 'p-3.5 sm:p-4 gap-3'
        }`}
      >
        <div className={isCompactGrid ? 'space-y-1.5' : 'space-y-2.5'}>
          {/* Bilingual Item Titles */}
          <div dir="ltr" className="space-y-0.5">
            <h3
              className={`font-bold text-left leading-snug ${
                isCompactGrid
                  ? 'text-xs sm:text-sm line-clamp-1'
                  : 'text-sm sm:text-base'
              } ${isDark ? 'text-white' : 'text-zinc-900'}`}
            >
              {item.name_en}
            </h3>
            {item.name_ar && (
              <p
                dir="rtl"
                className={`font-bold text-right leading-snug ${
                  isCompactGrid
                    ? 'text-[11px] sm:text-xs line-clamp-1'
                    : 'text-xs sm:text-sm'
                } ${isDark ? 'text-amber-400' : 'text-amber-600'}`}
              >
                {item.name_ar}
              </p>
            )}
          </div>

          {/* Structured Bullet Points: English Aligned Left & Arabic Aligned Right */}
          {(bulletsEn.length > 0 || bulletsAr.length > 0) &&
            (isCompactGrid ? (
              /* In 2-Column Compact Grid View: show active language bullets aligned properly (Left for EN, Right for AR) on mobile, or 2 cols on desktop */
              <div className="pt-0.5">
                {lang === 'ar' && bulletsAr.length > 0 ? (
                  <ul dir="rtl" className="space-y-0.5 text-right">
                    {bulletsAr.slice(0, 3).map((point, idx) => (
                      <li
                        key={`ar-compact-${idx}`}
                        className={`flex items-start gap-1 text-[10px] sm:text-xs leading-snug line-clamp-1 ${
                          isDark ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span className="truncate">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul dir="ltr" className="space-y-0.5 text-left">
                    {bulletsEn.slice(0, 3).map((point, idx) => (
                      <li
                        key={`en-compact-${idx}`}
                        className={`flex items-start gap-1 text-[10px] sm:text-xs leading-snug line-clamp-1 ${
                          isDark ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span className="truncate">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              /* In Single Card View: full side-by-side English (Left) and Arabic (Right) bullet points */
              <div
                dir="ltr"
                className={`grid gap-2.5 pt-1 ${
                  bulletsEn.length > 0 && bulletsAr.length > 0
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {bulletsEn.length > 0 && (
                  <ul dir="ltr" className="space-y-1 text-left">
                    {bulletsEn.map((point, idx) => (
                      <li
                        key={`en-${idx}`}
                        className={`flex items-start gap-1.5 text-[11px] sm:text-xs leading-snug ${
                          isDark ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {bulletsAr.length > 0 && (
                  <ul dir="rtl" className="space-y-1 text-right">
                    {bulletsAr.map((point, idx) => (
                      <li
                        key={`ar-${idx}`}
                        className={`flex items-start gap-1.5 text-[11px] sm:text-xs leading-snug ${
                          isDark ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>

        {/* Clean Price Row in KD + Rating Summary */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              className={`font-extrabold tracking-tight ${
                isCompactGrid ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
              } ${
                isSoldOut
                  ? 'text-zinc-400 line-through'
                  : isDark
                  ? 'text-amber-400'
                  : 'text-zinc-900'
              }`}
            >
              {formatKD(item.price, lang)}
            </span>

            {isDiscounted && item.original_price && !isSoldOut && (
              <span className="text-[10px] sm:text-xs text-zinc-400 line-through font-medium">
                {formatKD(item.original_price, lang)}
              </span>
            )}
          </div>

          {isSoldOut ? (
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                isDark
                  ? 'bg-zinc-800 text-zinc-400'
                  : 'bg-zinc-100 text-zinc-500'
              }`}
            >
              {lang === 'ar' ? 'غير متوفر' : 'Sold Out'}
            </span>
          ) : showReviews ? (
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                isDark ? 'text-zinc-300' : 'text-zinc-600'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {count > 0 ? (
                <>
                  <span className="font-bold">{average.toFixed(1)}</span>
                  <span className="text-[10px] text-zinc-400">({count})</span>
                </>
              ) : (
                <span className="text-[10px] text-zinc-400">
                  {lang === 'ar' ? 'قيّم' : 'Rate'}
                </span>
              )}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
