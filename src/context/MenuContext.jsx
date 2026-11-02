import React, { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { MenuContext } from './useMenu';
import {
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_REVIEWS,
  resolveProductImageUrl,
  SAFE_IMAGE_FALLBACK,
  CATEGORY_DEFAULT_IMAGES,
  CATEGORY_HEADER_IMAGES,
  LOADED_FRIES_IMAGE_BY_ID,
  getLoadedFriesImage,
} from '../data/seedMenu';

const LOCAL_ITEMS_KEY = 'yummy_kuwait_menu_items_v29';
const LOCAL_CATEGORIES_KEY = 'yummy_kuwait_categories_v25';
const LOCAL_LANG_KEY = 'yummy_kuwait_lang';
const LOCAL_THEME_KEY = 'yummy_kuwait_theme_v2';
const LOCAL_REVIEWS_KEY = 'yummy_kuwait_reviews_v1';
const LOCAL_SHOW_REVIEWS_KEY = 'yummy_kuwait_show_reviews';
const LOCAL_VIEW_MODES_KEY = 'yummy_kuwait_category_view_modes_v1';

/**
 * Valid columns physically existing in the Supabase `menu_items` table.
 * Any other client-side properties (e.g. updated_at, offer_label_en, is_popular, spicy_level, url)
 * MUST be filtered out of database payloads to prevent Postgres schema rejection.
 */
const VALID_MENU_ITEM_COLUMNS = [
  'category_id',
  'name_en',
  'name_ar',
  'description_en',
  'description_ar',
  'price',
  'original_price',
  'image_url',
  'is_available',
  'is_offer',
];

/**
 * Bidirectional mapping between category text slugs and Supabase integer IDs
 */
export const CATEGORY_SLUG_TO_ID = {
  'buckets-meals': 1,
  'strips-combos': 2,
  burgers: 3,
  'prawns-special': 4,
  'signature-wraps': 5,
  'loaded-fries-sides': 6,
  'mojitos-juices': 7,
  'frappe-shakes-lassi': 8,
};

// Clean up old stale cache versions so users don't see cached legacy image paths
if (typeof window !== 'undefined') {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (
        k &&
        (k.startsWith('yummy_kuwait_menu_items_v') ||
          k.startsWith('yummy_kuwait_categories_v')) &&
        k !== LOCAL_ITEMS_KEY &&
        k !== LOCAL_CATEGORIES_KEY
      ) {
        localStorage.removeItem(k);
      }
    }
    // Remove legacy theme key so light mode is the clean default for all users
    if (localStorage.getItem('yummy_kuwait_theme')) {
      localStorage.removeItem('yummy_kuwait_theme');
    }
  } catch (e) {
    // Ignore storage errors
  }
}

const DEFAULT_CATEGORY_VIEW_MODES = {
  _default: 'single',
  'buckets-meals': 'single',
  'strips-combos': 'single',
  burgers: 'single',
  'prawns-special': 'single',
  'signature-wraps': 'single',
  'loaded-fries-sides': 'grid',
  'mojitos-juices': 'grid',
  'frappe-shakes-lassi': 'grid',
  'special-offers': 'single',
};

export function MenuProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LOCAL_LANG_KEY) || 'en';
    }
    return 'en';
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LOCAL_THEME_KEY) || 'light';
    }
    return 'light';
  });

  // Global Staff Admin toggle: Show Customer Reviews on Menu
  const [showReviews, setShowReviews] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_SHOW_REVIEWS_KEY);
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  // Per-Category View Modes ('single' = Single Card View, 'grid' = 2-Column Grid View)
  const [categoryViewModes, setCategoryViewModes] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_VIEW_MODES_KEY);
        if (saved) {
          return { ...DEFAULT_CATEGORY_VIEW_MODES, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn('Failed to parse saved view modes:', e);
      }
    }
    return DEFAULT_CATEGORY_VIEW_MODES;
  });

  const [categories, setCategories] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_CATEGORIES_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((cat) => {
              const seedCat = INITIAL_CATEGORIES.find((c) => c.id === cat.id);
              const headerImg =
                CATEGORY_HEADER_IMAGES[cat.id] ||
                seedCat?.image_url ||
                SAFE_IMAGE_FALLBACK;

              const isStaleOrBrand =
                !cat.image_url ||
                cat.image_url.includes('crunch-poster') ||
                cat.image_url.includes('logo-yummy') ||
                cat.image_url.includes('unsplash.com');

              const validUrl = !isStaleOrBrand ? cat.image_url : headerImg;
              return {
                ...cat,
                image_url: validUrl,
              };
            });
          }
        }
      } catch (e) {
        console.warn('Failed to parse local categories:', e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  const getCategoryViewMode = useCallback(
    (categoryId) => {
      return categoryViewModes[categoryId] || categoryViewModes._default || 'single';
    },
    [categoryViewModes]
  );

  const setCategoryViewMode = useCallback((categoryId, mode) => {
    setCategoryViewModes((prev) => {
      const updated = { ...prev, [categoryId]: mode };
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_VIEW_MODES_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const toggleCategoryViewMode = useCallback((categoryId) => {
    setCategoryViewModes((prev) => {
      const current = prev[categoryId] || prev._default || 'single';
      const next = current === 'single' ? 'grid' : 'single';
      const updated = { ...prev, [categoryId]: next };
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_VIEW_MODES_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const setAllCategoriesViewMode = useCallback(
    (mode) => {
      setCategoryViewModes((prev) => {
        const updated = { ...prev, _default: mode, 'special-offers': mode };
        Object.keys(DEFAULT_CATEGORY_VIEW_MODES).forEach((k) => {
          updated[k] = mode;
        });
        categories.forEach((cat) => {
          if (cat?.id) updated[cat.id] = mode;
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_VIEW_MODES_KEY, JSON.stringify(updated));
        }
        return updated;
      });
    },
    [categories]
  );

  // Product Reviews & Star Ratings state
  const [reviews, setReviews] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_REVIEWS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse local reviews:', e);
      }
    }
    return INITIAL_REVIEWS;
  });

  const [menuItems, setMenuItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_ITEMS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((item) => {
              const resolved = resolveProductImageUrl(item);
              return {
                ...item,
                url: resolved,
                image_url: resolved,
              };
            });
          }
        }
      } catch (e) {
        console.warn('Failed to parse local menu items:', e);
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState(
    isSupabaseConfigured ? 'connecting' : 'local'
  );
  const [dbError, setDbError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Keep HTML dir and lang attributes synchronized with English / Arabic toggle
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_LANG_KEY, lang);
    }
  }, [lang]);

  // Keep HTML dark/light class synchronized
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_THEME_KEY, theme);
    }
  }, [theme]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleShowReviews = useCallback(() => {
    setShowReviews((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_SHOW_REVIEWS_KEY, String(next));
      }
      showToast(
        next
          ? lang === 'ar'
            ? 'تم تفعيل عرض التقييمات والمراجعات في القائمة'
            : 'Customer reviews & ratings enabled on menu'
          : lang === 'ar'
          ? 'تم إخفاء التقييمات والمراجعات من القائمة'
          : 'Customer reviews hidden from public menu',
        next ? 'success' : 'info'
      );
      return next;
    });
  }, [lang, showToast]);

  // Submit a customer star rating (1-5) and short text review
  const addReview = useCallback(
    async ({ itemId, rating, comment, author }) => {
      const numericRating = Math.min(5, Math.max(1, Number(rating) || 5));
      const newReview = {
        id: `rev-${Date.now()}`,
        item_id: itemId,
        rating: numericRating,
        comment: (comment || '').trim(),
        author:
          (author || '').trim() ||
          (lang === 'ar' ? 'عميل يمي' : 'Valued Customer'),
        created_at: new Date().toISOString(),
      };

      if (supabase) {
        try {
          await supabase.from('product_reviews').insert([
            {
              item_id: newReview.item_id,
              rating: newReview.rating,
              comment: newReview.comment,
              author: newReview.author,
            },
          ]);
        } catch (err) {
          // Silently fall back to localStorage if table doesn't exist yet
        }
      }

      setReviews((prev) => {
        const updated = [newReview, ...prev];
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(updated));
          } catch (e) {
            console.warn('Could not save review to localStorage:', e);
          }
        }
        return updated;
      });

      showToast(
        lang === 'ar'
          ? 'شكراً لتقييمك! تم إرسال مراجعتك بنجاح'
          : 'Thank you! Your rating & review have been submitted.'
      );
      return newReview;
    },
    [lang, showToast]
  );

  // Get average rating & review list for a specific item
  const getItemRatingStats = useCallback(
    (itemId) => {
      const itemReviews = reviews.filter((r) => r.item_id === itemId);
      const count = itemReviews.length;
      if (count === 0) {
        return { average: 0, count: 0, itemReviews: [] };
      }
      const sum = itemReviews.reduce(
        (acc, r) => acc + (Number(r.rating) || 0),
        0
      );
      const average = Number((sum / count).toFixed(1));
      return { average, count, itemReviews };
    },
    [reviews]
  );

  // Persist local copy for instant load and fallback resilience
  const saveLocalItems = useCallback((items) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_ITEMS_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn('Could not save items to localStorage:', e);
      }
    }
  }, []);

  const saveLocalCategories = useCallback((cats) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(cats));
      } catch (e) {
        console.warn('Could not save categories to localStorage:', e);
      }
    }
  }, []);

  // Fetch dynamically from Supabase `categories` and `menu_items` tables
  const fetchFromSupabase = useCallback(async () => {
    if (!supabase) {
      setDataSource('local');
      setLoading(false);
      return;
    }

    setLoading(true);
    setDbError(null);

    try {
      const [catRes, itemsRes] = await Promise.all([
        supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('menu_items')
          .select('*')
          .order('created_at', { ascending: true }),
      ]);

      if (catRes.error) throw catRes.error;
      if (itemsRes.error) throw itemsRes.error;

      const catMap = {};
      INITIAL_CATEGORIES.forEach((c) => {
        catMap[c.id] = c;
      });

      if (Array.isArray(catRes.data) && catRes.data.length > 0) {
        const updatedCats = catRes.data.map((cat) => {
          const seedCat = INITIAL_CATEGORIES.find((c) => c.id === cat.id);
          const headerImg =
            CATEGORY_HEADER_IMAGES[cat.id] ||
            seedCat?.image_url ||
            SAFE_IMAGE_FALLBACK;

          const isStaleOrBrand =
            !cat.image_url ||
            cat.image_url.includes('crunch-poster') ||
            cat.image_url.includes('logo-yummy') ||
            cat.image_url.includes('unsplash.com');

          const validUrl = !isStaleOrBrand ? cat.image_url : headerImg;
          return {
            ...cat,
            image_url: validUrl,
          };
        });
        updatedCats.forEach((c) => {
          catMap[c.id] = c;
        });
        setCategories(updatedCats);
        saveLocalCategories(updatedCats);
      }

      if (Array.isArray(itemsRes.data) && itemsRes.data.length > 0) {
        // ABSOLUTE SOURCE OF TRUTH:
        // Every database record fetched from Supabase is the single source of truth.
        // Its values (name_en, name_ar, description_en, description_ar, price,
        // original_price, is_available, is_offer, image_url) must NEVER be overridden
        // or replaced by static seedMenu.js or INITIAL_MENU_ITEMS.
        const normalized = itemsRes.data.map((item) => {
          const directImageUrl = resolveProductImageUrl(item);

          let subCat = item.sub_category;
          if (!subCat) {
            const n = `${item.name_en || ''} ${item.name_ar || ''}`.toLowerCase();
            const c = String(item.category_id);
            if (c === '7' || c === 'mojitos-juices') {
              subCat = n.includes('juice') || n.includes('عصير') ? 'Juice' : 'Mojito';
            } else if (c === '8' || c === 'frappe-shakes-lassi') {
              if (n.includes('frappe') || n.includes('فرابيه')) subCat = 'Frappe';
              else if (n.includes('shake') || n.includes('شيك')) subCat = 'Shake';
              else if (n.includes('lassi') || n.includes('لاسي')) subCat = 'Lassi';
            }
          }

          const isBev =
            String(item.category_id) === '7' ||
            String(item.category_id) === '8' ||
            item.category_id === 'mojitos-juices' ||
            item.category_id === 'frappe-shakes-lassi' ||
            Boolean(item.is_beverage);

          return {
            ...item,
            name_en: item.name_en, // Absolute source of truth from database
            name_ar: item.name_ar, // Absolute source of truth from database
            description_en: item.description_en || '',
            description_ar: item.description_ar || '',
            price: Number(item.price),
            original_price: item.original_price ? Number(item.original_price) : null,
            is_available: item.is_available !== undefined ? Boolean(item.is_available) : true,
            is_offer: Boolean(item.is_offer),
            sub_category: subCat,
            is_beverage: isBev,
            image_url: directImageUrl,
            url: directImageUrl,
          };
        });
        setMenuItems(normalized);
        saveLocalItems(normalized);
        setDataSource('supabase');
      } else {
        setDataSource('supabase-empty');
      }
    } catch (err) {
      console.warn('Supabase fetch error (using local fallback data):', err.message);
      setDbError(err.message);
      setDataSource('local-fallback');
    } finally {
      setLoading(false);
    }
  }, [saveLocalItems, saveLocalCategories]);

  useEffect(() => {
    fetchFromSupabase();
  }, [fetchFromSupabase]);

  // Temporary trigger: Ensure Supabase Loaded Fries items hold correct /loadedfries_sides/ paths and Best Bucket is not pears-hunt
  useEffect(() => {
    if (!supabase) return;
    const syncDatabaseImages = async () => {
      try {
        // 1. Ensure Best Bucket (ID 1) strictly maps to /buckets&meals/best-bucket.png
        const { data: bbItem } = await supabase
          .from('menu_items')
          .select('id, name_en, image_url')
          .eq('id', 1)
          .maybeSingle();

        if (bbItem && bbItem.image_url === '/buckets&meals/pears-hunt.png') {
          await supabase
            .from('menu_items')
            .update({ image_url: '/buckets&meals/best-bucket.png' })
            .eq('id', 1);
        }

        // 2. Ensure Loaded Fries items hold verified /loadedfries_sides/ paths
        const { data: lfItems, error } = await supabase
          .from('menu_items')
          .select('id, category_id, name_en, name_ar, image_url')
          .or('category_id.eq.6,category_id.eq.loaded-fries-sides');

        if (error || !Array.isArray(lfItems) || lfItems.length === 0) return;

        for (const item of lfItems) {
          const targetUrl = resolveProductImageUrl(item);
          if (item.image_url !== targetUrl) {
            await supabase
              .from('menu_items')
              .update({ image_url: targetUrl })
              .eq('id', item.id);
          }
        }
      } catch (err) {
        console.warn('Database image sync warning:', err);
      }
    };
    syncDatabaseImages();
  }, []);

  // Create a new category on the fly (e.g., Shawarma / شاورما) and save to Supabase + local state
  const addCategory = async ({ name_en, name_ar, icon, image_url }) => {
    const cleanEn = (name_en || '').trim();
    const cleanAr = (name_ar || cleanEn).trim();
    if (!cleanEn) return null;

    // Check if category already exists by English name or ID
    const existing = categories.find(
      (c) =>
        c.name_en.toLowerCase() === cleanEn.toLowerCase() ||
        c.name_ar === cleanAr
    );
    if (existing) {
      showToast(
        lang === 'ar'
          ? `القسم "${existing.name_ar}" موجود بالفعل`
          : `Category "${existing.name_en}" already exists`,
        'info'
      );
      return existing;
    }

    const baseSlug =
      cleanEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || `cat-${Date.now()}`;
    const uniqueId = categories.some((c) => c.id === baseSlug)
      ? `${baseSlug}-${Date.now().toString().slice(-4)}`
      : baseSlug;

    const newCategory = {
      id: uniqueId,
      name_en: cleanEn,
      short_en: cleanEn,
      name_ar: cleanAr,
      short_ar: cleanAr,
      section_en: 'Specialty & Custom Sections',
      section_ar: 'أقسام إضافية ومميزة',
      slug: uniqueId,
      sort_order: categories.length + 1,
      icon: icon || 'Utensils',
      image_url:
        image_url ||
        CATEGORY_HEADER_IMAGES[uniqueId] ||
        SAFE_IMAGE_FALLBACK,
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .insert([
            {
              id: newCategory.id,
              name_en: newCategory.name_en,
              name_ar: newCategory.name_ar,
              slug: newCategory.slug,
              sort_order: newCategory.sort_order,
              icon: newCategory.icon,
            },
          ])
          .select()
          .single();

        if (!error && data) {
          Object.assign(newCategory, data);
          setDataSource('supabase');
        } else if (error) {
          console.warn('Supabase category insert error, saving locally:', error.message);
        }
      } catch (err) {
        console.warn('Supabase category insert exception, saving locally:', err.message);
      }
    }

    setCategories((prev) => {
      const updated = [...prev, newCategory];
      saveLocalCategories(updated);
      return updated;
    });

    showToast(
      lang === 'ar'
        ? `تمت إضافة القسم الجديد "${cleanAr}" بنجاح`
        : `New category "${cleanEn}" (${cleanAr}) saved!`
    );
    return newCategory;
  };

  // Add a new menu item
  const addMenuItem = async (itemData) => {
    let catId = itemData.category_id || categories[0]?.id || 1;
    if (CATEGORY_SLUG_TO_ID[catId]) {
      catId = CATEGORY_SLUG_TO_ID[catId];
    } else if (!isNaN(Number(catId))) {
      catId = Number(catId);
    }

    const payload = {
      category_id: catId,
      name_en: itemData.name_en.trim(),
      name_ar: (itemData.name_ar || itemData.name_en).trim(),
      description_en: (itemData.description_en || '').trim(),
      description_ar: (itemData.description_ar || '').trim(),
      price: Number(parseFloat(itemData.price || 0).toFixed(3)),
      original_price: itemData.original_price
        ? Number(parseFloat(itemData.original_price).toFixed(3))
        : null,
      is_offer: Boolean(itemData.is_offer),
      is_available: itemData.is_available !== undefined ? Boolean(itemData.is_available) : true,
      image_url:
        itemData.image_url ||
        (catId && CATEGORY_HEADER_IMAGES[catId]) ||
        SAFE_IMAGE_FALLBACK,
    };

    if (supabase) {
      // Filter payload strictly to valid Supabase columns
      const dbPayload = {};
      for (const col of VALID_MENU_ITEM_COLUMNS) {
        if (payload[col] !== undefined) {
          dbPayload[col] = payload[col];
        }
      }

      const { data, error } = await supabase
        .from('menu_items')
        .insert([dbPayload])
        .select()
        .single();

      if (!error && data) {
        const directImageUrl = resolveProductImageUrl(data);
        const created = {
          ...data,
          price: Number(data.price),
          original_price: data.original_price ? Number(data.original_price) : null,
          image_url: directImageUrl,
          url: directImageUrl,
        };
        setMenuItems((prev) => {
          const updated = [created, ...prev];
          saveLocalItems(updated);
          return updated;
        });
        setDataSource('supabase');
        showToast(
          lang === 'ar'
            ? 'تمت إضافة الصنف بنجاح'
            : 'New item added successfully'
        );
        return created;
      } else if (error) {
        console.error('Supabase insert error, saving locally:', error.message);
        showToast(`Failed to add item: ${error.message}`, 'error');
        return null;
      }
    }

    const localItem = {
      ...payload,
      id: `item-${Date.now()}`,
      created_at: new Date().toISOString(),
      url: resolveProductImageUrl(payload),
    };
    setMenuItems((prev) => {
      const updated = [localItem, ...prev];
      saveLocalItems(updated);
      return updated;
    });
    showToast(lang === 'ar' ? 'تمت إضافة الصنف بنجاح' : 'New menu item added');
    return localItem;
  };

  // Update an existing item (Supabase as absolute source of truth)
  const updateMenuItem = async (id, updates) => {
    const cleanUpdates = { ...updates };
    if (cleanUpdates.price !== undefined) {
      cleanUpdates.price = Number(parseFloat(cleanUpdates.price || 0).toFixed(3));
    }
    if (cleanUpdates.original_price !== undefined) {
      cleanUpdates.original_price = cleanUpdates.original_price
        ? Number(parseFloat(cleanUpdates.original_price).toFixed(3))
        : null;
    }
    if (cleanUpdates.image_url !== undefined) {
      cleanUpdates.url = cleanUpdates.image_url;
    }
    if (cleanUpdates.category_id !== undefined) {
      if (CATEGORY_SLUG_TO_ID[cleanUpdates.category_id]) {
        cleanUpdates.category_id = CATEGORY_SLUG_TO_ID[cleanUpdates.category_id];
      } else if (!isNaN(Number(cleanUpdates.category_id))) {
        cleanUpdates.category_id = Number(cleanUpdates.category_id);
      }
    }

    if (supabase && id) {
      // Filter payload strictly to valid Supabase columns to avoid schema rejection
      const dbPayload = {};
      for (const col of VALID_MENU_ITEM_COLUMNS) {
        if (cleanUpdates[col] !== undefined) {
          dbPayload[col] = cleanUpdates[col];
        }
      }

      const { data, error } = await supabase
        .from('menu_items')
        .update(dbPayload)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        console.error('Supabase update error:', error.message);
        showToast(
          lang === 'ar'
            ? `فشل الحفظ في قاعدة البيانات: ${error.message}`
            : `Failed to save changes to database: ${error.message}`,
          'error'
        );
        return false;
      }

      // If Supabase returned the updated row, merge directly into state & storage
      if (data) {
        const directImageUrl = resolveProductImageUrl(data);
        const savedItem = {
          ...data,
          price: Number(data.price),
          original_price: data.original_price ? Number(data.original_price) : null,
          image_url: directImageUrl,
          url: directImageUrl,
        };

        setMenuItems((prev) => {
          const updated = prev.map((item) =>
            item.id === id ? { ...item, ...savedItem } : item
          );
          saveLocalItems(updated);
          return updated;
        });

        showToast(lang === 'ar' ? 'تم حفظ التعديلات' : 'Item updated');
        return true;
      }
    }

    // Fallback if offline / local-only
    setMenuItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...cleanUpdates } : item
      );
      saveLocalItems(updated);
      return updated;
    });

    showToast(lang === 'ar' ? 'تم حفظ التعديلات' : 'Item updated');
    return true;
  };

  // Quick toggle availability (Available <-> Out of Stock)
  const toggleItemAvailability = async (id) => {
    const target = menuItems.find((i) => i.id === id);
    if (!target) return;
    const nextStatus = !target.is_available;

    if (supabase && id) {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: nextStatus })
        .eq('id', id);

      if (error) {
        console.error('Supabase availability toggle error:', error.message);
        showToast(`Availability update failed: ${error.message}`, 'error');
        return;
      }
    }

    setMenuItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, is_available: nextStatus } : item
      );
      saveLocalItems(updated);
      return updated;
    });

    showToast(
      nextStatus
        ? lang === 'ar'
          ? `تم تفعيل "${target.name_ar}"`
          : `"${target.name_en}" marked Available`
        : lang === 'ar'
        ? `تم تحويل "${target.name_ar}" إلى نفذت الكمية`
        : `"${target.name_en}" marked Sold Out`,
      nextStatus ? 'success' : 'warning'
    );
  };

  // Delete a menu item
  const deleteMenuItem = async (id) => {
    if (supabase && id) {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) {
        console.warn('Supabase delete error:', error.message);
      }
    }

    setMenuItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveLocalItems(updated);
      return updated;
    });

    showToast(lang === 'ar' ? 'تم حذف الصنف' : 'Menu item deleted', 'info');
  };

  return (
    <MenuContext.Provider
      value={{
        lang,
        setLang,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        showReviews,
        setShowReviews,
        toggleShowReviews,
        categoryViewModes,
        getCategoryViewMode,
        setCategoryViewMode,
        toggleCategoryViewMode,
        setAllCategoriesViewMode,
        reviews,
        addReview,
        getItemRatingStats,
        categories,
        addCategory,
        menuItems,
        loading,
        dataSource,
        dbError,
        toast,
        showToast,
        refreshMenu: fetchFromSupabase,
        addMenuItem,
        updateMenuItem,
        toggleItemAvailability,
        deleteMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
