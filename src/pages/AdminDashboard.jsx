import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Plus,
  Search,
  Edit3,
  Trash2,
  Check,
  X,
  UploadCloud,
  RefreshCw,
  Tag,
  CheckCircle2,
  XCircle,
  KeyRound,
  Image as ImageIcon,
  DollarSign,
  LogOut,
  Star,
  Eye,
  EyeOff,
  Languages,
  Sparkles,
  LayoutGrid,
  Rows3,
} from 'lucide-react';
import { useMenu } from '../context/useMenu';
import {
  formatKD,
  filterAndRankMenuItems,
  resolveProductImageUrl,
  handleProductImageError,
  isCutoutProduct,
  AVAILABLE_STUDIO_IMAGES,
} from '../data/seedMenu';
import { uploadImageToMenuBucket } from '../lib/supabaseClient';
import {
  autoTranslateEnglishToArabic,
  translateWithCloudFallback,
} from '../utils/autoTranslate';

const DEFAULT_PIN = import.meta.env.VITE_ADMIN_PIN || '1234';
const SESSION_AUTH_KEY = 'yummy_staff_admin_authenticated';
const STAFF_ENGLISH_ONLY_KEY = 'yummy_staff_english_only_mode';

const EMPTY_FORM = {
  category_id: 'buckets-meals',
  name_en: '',
  name_ar: '',
  description_en: '',
  description_ar: '',
  price: '1.500',
  original_price: '',
  is_offer: false,
  offer_label_en: 'OFFER',
  offer_label_ar: 'عرض',
  is_available: true,
  is_popular: false,
  spicy_level: 0,
  image_url: '',
};

export default function AdminDashboard() {
  const {
    lang,
    categories,
    addCategory,
    menuItems,
    loading,
    showReviews,
    toggleShowReviews,
    getItemRatingStats,
    getCategoryViewMode,
    setCategoryViewMode,
    setAllCategoriesViewMode,
    refreshMenu,
    addMenuItem,
    updateMenuItem,
    toggleItemAvailability,
    deleteMenuItem,
    showToast,
  } = useMenu();

  // Authentication State (4-Digit PIN or Password)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
    }
    return false;
  });

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(sessionStorage.getItem(SESSION_AUTH_KEY) === 'true');
    };
    window.addEventListener('yummy-admin-auth-change', syncAuth);
    return () => window.removeEventListener('yummy-admin-auth-change', syncAuth);
  }, []);

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Staff Mode: English Only Mode (hides Arabic helper text & dual-language clutter for non-Arabic speaking staff)
  const [englishOnlyMode, setEnglishOnlyMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STAFF_ENGLISH_ONLY_KEY) === 'true';
    }
    return false;
  });

  const toggleEnglishOnlyMode = () => {
    setEnglishOnlyMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STAFF_ENGLISH_ONLY_KEY, String(next));
      }
      showToast(
        next
          ? 'English Only Mode enabled — Arabic fields hidden'
          : 'Standard dual-language (English & Arabic) view enabled',
        'info'
      );
      return next;
    });
  };

  // Effective UI language inside Admin Dashboard (always 'en' when English Only Mode is active)
  const uiLang = englishOnlyMode ? 'en' : lang;

  // Dashboard Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Inline Quick Price Editing State
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editingPriceValue, setEditingPriceValue] = useState('');

  // Add / Edit Item Modal & Category Layouts Modal State
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadStatusMsg, setUploadStatusMsg] = useState('');
  const [isSavingItem, setIsSavingItem] = useState(false);
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(true);
  const [isTranslatingCloud, setIsTranslatingCloud] = useState(false);

  // Add New Category on the fly state
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatAr, setNewCatAr] = useState('');
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  const fileInputRef = useRef(null);
  const nameTranslateTimerRef = useRef(null);
  const descTranslateTimerRef = useRef(null);
  const catTranslateTimerRef = useRef(null);

  // Lock background scrolling when Add/Edit Item Modal or Category Layouts Modal is open
  useEffect(() => {
    if (isItemModalOpen || isLayoutModalOpen) {
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
  }, [isItemModalOpen, isLayoutModalOpen]);

  // Handle PIN submission
  const handlePinSubmit = (e) => {
    if (e) e.preventDefault();
    const customPin = localStorage.getItem('yummy_custom_admin_pin') || DEFAULT_PIN;
    if (pinInput === customPin || pinInput === DEFAULT_PIN || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      showToast(
        lang === 'ar'
          ? 'مرحباً بك في لوحة التحكم'
          : 'Staff Admin unlocked'
      );
    } else {
      setPinError(
        lang === 'ar'
          ? 'رمز الدخول غير صحيح'
          : 'Invalid PIN. Please try again.'
      );
      setPinInput('');
    }
  };

  const handleKeypadPress = (digit) => {
    setPinError('');
    if (digit === 'C') {
      setPinInput('');
      return;
    }
    if (digit === '⌫') {
      setPinInput((prev) => prev.slice(0, -1));
      return;
    }
    if (pinInput.length < 8) {
      const next = pinInput + digit;
      setPinInput(next);
      const customPin = localStorage.getItem('yummy_custom_admin_pin') || DEFAULT_PIN;
      if (next.length === 4 && (next === customPin || next === DEFAULT_PIN)) {
        setIsAuthenticated(true);
        sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
        showToast(lang === 'ar' ? 'تم تسجيل الدخول' : 'Staff Admin unlocked');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
    sessionStorage.removeItem(SESSION_AUTH_KEY);
  };

  // KPI Metrics
  const stats = useMemo(() => {
    const total = menuItems.length;
    const available = menuItems.filter((i) => i.is_available).length;
    const soldOut = total - available;
    const offers = menuItems.filter(
      (i) =>
        Boolean(i.is_offer) ||
        (i.original_price && Number(i.original_price) > Number(i.price))
    ).length;
    return { total, available, soldOut, offers };
  }, [menuItems]);

  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [categories]);

  // Filtered items for Admin List using Smart Partial Search
  const filteredItems = useMemo(() => {
    const baseList = menuItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category_id !== selectedCategory) {
        return false;
      }
      if (statusFilter === 'available' && !item.is_available) return false;
      if (statusFilter === 'soldout' && item.is_available) return false;
      if (statusFilter === 'offer' && !item.is_offer) return false;
      return true;
    });

    const q = searchQuery.trim();
    if (!q) return baseList;
    return filterAndRankMenuItems(baseList, q, categoryMap);
  }, [menuItems, selectedCategory, statusFilter, searchQuery, categoryMap]);

  // Open Modal for Add New Item
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setAutoTranslateEnabled(true);
    setIsAddingCategory(false);
    setNewCatEn('');
    setNewCatAr('');
    setFormData({
      ...EMPTY_FORM,
      category_id:
        selectedCategory !== 'all'
          ? selectedCategory
          : categories[0]?.id || 'buckets-meals',
    });
    setUploadStatusMsg('');
    setIsItemModalOpen(true);
  };

  // Open Modal for Edit Existing Item
  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setAutoTranslateEnabled(true);
    setIsAddingCategory(false);
    setNewCatEn('');
    setNewCatAr('');
    setFormData({
      category_id: item.category_id || 'buckets-meals',
      name_en: item.name_en || '',
      name_ar: item.name_ar || '',
      description_en: item.description_en || '',
      description_ar: item.description_ar || '',
      price: Number(item.price || 0).toFixed(3),
      original_price: item.original_price
        ? Number(item.original_price).toFixed(3)
        : '',
      is_offer: Boolean(item.is_offer),
      offer_label_en: item.offer_label_en || 'OFFER',
      offer_label_ar: item.offer_label_ar || 'عرض',
      is_available: Boolean(item.is_available),
      is_popular: Boolean(item.is_popular),
      spicy_level: Number(item.spicy_level || 0),
      image_url: item.image_url || '',
    });
    setUploadStatusMsg('');
    setIsItemModalOpen(true);
  };

  // Handle New Category English Name Input with Live Auto-Translation to Arabic
  const handleNewCategoryEnglishChange = (value) => {
    setNewCatEn(value);
    if (autoTranslateEnabled) {
      setNewCatAr(autoTranslateEnglishToArabic(value));
      if (catTranslateTimerRef.current) {
        clearTimeout(catTranslateTimerRef.current);
      }
      if (value.trim()) {
        catTranslateTimerRef.current = setTimeout(async () => {
          const translated = await translateWithCloudFallback(value);
          if (translated) {
            setNewCatAr(translated);
          }
        }, 400);
      }
    }
  };

  // Save a newly created category on the fly and select it in the product form
  const handleCreateCategoryOnTheFly = async () => {
    if (!newCatEn.trim()) {
      showToast(
        lang === 'ar'
          ? 'يرجى إدخال اسم القسم بالإنجليزية'
          : 'Please enter the category name in English',
        'error'
      );
      return null;
    }

    setIsSavingCategory(true);
    try {
      const arName =
        newCatAr.trim() ||
        autoTranslateEnglishToArabic(newCatEn.trim()) ||
        newCatEn.trim();
      const createdCat = await addCategory({
        name_en: newCatEn.trim(),
        name_ar: arName,
      });
      if (createdCat?.id) {
        setFormData((prev) => ({
          ...prev,
          category_id: createdCat.id,
        }));
        setIsAddingCategory(false);
        setNewCatEn('');
        setNewCatAr('');
        return createdCat;
      }
      return null;
    } finally {
      setIsSavingCategory(false);
    }
  };

  // Handle English Title Input with Live + Cloud Auto-Translation to Arabic field below
  const handleEnglishNameChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      name_en: value,
      name_ar: autoTranslateEnabled
        ? autoTranslateEnglishToArabic(value)
        : prev.name_ar,
    }));

    if (autoTranslateEnabled) {
      if (nameTranslateTimerRef.current) {
        clearTimeout(nameTranslateTimerRef.current);
      }
      if (value.trim()) {
        nameTranslateTimerRef.current = setTimeout(async () => {
          const translated = await translateWithCloudFallback(value);
          if (translated) {
            setFormData((prev) =>
              prev.name_en === value ? { ...prev, name_ar: translated } : prev
            );
          }
        }, 450);
      }
    }
  };

  // Handle English Description / Bullet Points Input with Live + Cloud Auto-Translation to Arabic field below
  const handleEnglishDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description_en: value,
      description_ar: autoTranslateEnabled
        ? autoTranslateEnglishToArabic(value)
        : prev.description_ar,
    }));

    if (autoTranslateEnabled) {
      if (descTranslateTimerRef.current) {
        clearTimeout(descTranslateTimerRef.current);
      }
      if (value.trim()) {
        descTranslateTimerRef.current = setTimeout(async () => {
          const translated = await translateWithCloudFallback(value);
          if (translated) {
            setFormData((prev) =>
              prev.description_en === value
                ? { ...prev, description_ar: translated }
                : prev
            );
          }
        }, 450);
      }
    }
  };

  // Trigger Manual / Cloud-Enhanced Translation of English Title & Description into Arabic
  const handleManualTranslateClick = async () => {
    setIsTranslatingCloud(true);
    try {
      const [arTitle, arDesc] = await Promise.all([
        translateWithCloudFallback(formData.name_en),
        translateWithCloudFallback(formData.description_en),
      ]);
      setFormData((prev) => ({
        ...prev,
        name_ar: arTitle || prev.name_ar,
        description_ar: arDesc || prev.description_ar,
      }));
      showToast(
        lang === 'ar'
          ? 'تمت الترجمة التلقائية إلى العربية بنجاح'
          : 'Auto-translated English fields to Arabic!'
      );
    } finally {
      setIsTranslatingCloud(false);
    }
  };

  // Image Upload Handler
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadStatusMsg(
      lang === 'ar' ? 'جارٍ رفع الصورة...' : 'Uploading image...'
    );

    try {
      const result = await uploadImageToMenuBucket(file);
      setFormData((prev) => ({
        ...prev,
        image_url: result.publicUrl,
      }));
      setUploadStatusMsg(
        lang === 'ar' ? 'تم رفع الصورة بنجاح' : 'Image uploaded successfully'
      );
      showToast(lang === 'ar' ? 'تم رفع الصورة' : 'Image uploaded');
    } catch (err) {
      setUploadStatusMsg(`Upload error: ${err.message}`);
      showToast(`Image upload failed: ${err.message}`, 'error');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Save Add or Edit Item Form
  const handleSaveItemForm = async (e) => {
    e.preventDefault();
    if (!formData.name_en.trim()) return;

    setIsSavingItem(true);
    try {
      let targetCategoryId = formData.category_id;
      if (isAddingCategory && newCatEn.trim()) {
        const createdCat = await handleCreateCategoryOnTheFly();
        if (createdCat?.id) {
          targetCategoryId = createdCat.id;
        }
      }

      const payload = { ...formData, category_id: targetCategoryId };
      if (editingItem) {
        await updateMenuItem(editingItem.id, payload);
      } else {
        await addMenuItem(payload);
      }
      setIsItemModalOpen(false);
    } finally {
      setIsSavingItem(false);
    }
  };

  // Save Inline Quick Price Change
  const handleSaveInlinePrice = async (itemId) => {
    const parsed = parseFloat(editingPriceValue);
    if (isNaN(parsed) || parsed < 0) {
      showToast('Please enter a valid price in KD (e.g. 1.500)', 'error');
      return;
    }
    await updateMenuItem(itemId, { price: Number(parsed.toFixed(3)) });
    setEditingPriceId(null);
    setEditingPriceValue('');
  };

  // ============================================================================
  // 1. PROTECTED 4-DIGIT PIN LOGIN
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-70px)] bg-zinc-50 dark:bg-[#0B0B0B] flex items-center justify-center p-4 transition-colors duration-200">
        <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#141414] shadow-xl ring-1 ring-zinc-200 dark:ring-white/10 p-6 sm:p-7 text-center space-y-5">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">
              {lang === 'ar' ? 'دخول الموظفين' : 'Staff Admin Login'}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {lang === 'ar'
                ? 'أدخل رمز المرور المكون من 4 أرقام'
                : 'Enter 4-digit PIN to manage prices & stock'}
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                inputMode="numeric"
                value={pinInput}
                onChange={(e) => {
                  setPinError('');
                  setPinInput(e.target.value);
                }}
                placeholder="••••"
                aria-label="4-Digit Staff PIN"
                className="w-full py-3 pl-10 pr-4 rounded-xl bg-zinc-100 dark:bg-black text-center font-mono text-xl tracking-[0.5em] text-zinc-900 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                autoFocus
              />
            </div>

            {pinError && (
              <p className="text-xs font-semibold text-red-500">{pinError}</p>
            )}

            <div className="grid grid-cols-3 gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleKeypadPress(key)}
                    className={`py-2.5 rounded-xl font-bold text-base transition-colors active:scale-95 cursor-pointer ${
                      key === 'C'
                        ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                        : key === '⌫'
                        ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        : 'bg-zinc-100 dark:bg-[#1E1E1E] hover:bg-amber-500 hover:text-black text-zinc-900 dark:text-white'
                    }`}
                  >
                    {key}
                  </button>
                )
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Unlock className="w-4 h-4" />
              <span>{lang === 'ar' ? 'دخول' : 'Unlock Dashboard'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. AUTHENTICATED STAFF ADMIN DASHBOARD (No Supabase Button or Credentials UI)
  // ============================================================================
  return (
    <div
      dir={englishOnlyMode ? 'ltr' : undefined}
      className="min-h-screen bg-zinc-50 dark:bg-[#0B0B0B] text-zinc-900 dark:text-white pb-16 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 space-y-4">
        {/* Top Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white dark:bg-[#141414] p-4 rounded-2xl shadow-sm ring-1 ring-zinc-200/80 dark:ring-white/5">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-white">
              {uiLang === 'ar' ? 'لوحة تحكم الموظفين' : 'Staff Admin Dashboard'}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {uiLang === 'ar'
                ? 'إدارة الأسعار، توفر الأصناف، وصور الوجبات'
                : 'Manage menu items, prices in KD, and stock availability'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Staff Mode Toggle Switch: English Only Mode */}
            <button
              type="button"
              onClick={toggleEnglishOnlyMode}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                englishOnlyMode
                  ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/40'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
              title="Hide Arabic helper text and dual-language fields for non-Arabic speaking staff"
            >
              <Languages
                className={`w-4 h-4 ${
                  englishOnlyMode ? 'text-amber-500' : 'text-zinc-400'
                }`}
              />
              <span>
                English Only Mode: {englishOnlyMode ? 'ON' : 'OFF'}
              </span>
              <span
                className={`w-8 h-4 rounded-full p-0.5 transition-colors flex items-center ${
                  englishOnlyMode
                    ? 'bg-amber-500 justify-end'
                    : 'bg-zinc-400 dark:bg-zinc-600 justify-start'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white shadow" />
              </span>
            </button>

            {/* Global Toggle Switch: Show Customer Reviews on Menu */}
            <button
              type="button"
              onClick={toggleShowReviews}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                showReviews
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/40'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
              title="Enable or Disable Customer Reviews & Ratings on Public Menu"
            >
              {showReviews ? (
                <Eye className="w-4 h-4 text-emerald-500" />
              ) : (
                <EyeOff className="w-4 h-4 text-zinc-400" />
              )}
              <span>
                {uiLang === 'ar'
                  ? `عرض التقييمات: ${showReviews ? 'مفعّل' : 'مخفي'}`
                  : `Show Customer Reviews on Menu: ${
                      showReviews ? 'ON' : 'OFF'
                    }`}
              </span>
              <span
                className={`w-8 h-4 rounded-full p-0.5 transition-colors flex items-center ${
                  showReviews
                    ? 'bg-emerald-500 justify-end'
                    : 'bg-zinc-400 dark:bg-zinc-600 justify-start'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white shadow" />
              </span>
            </button>

            {/* Manage Category Layouts Pop-up Modal Trigger Button */}
            <button
              type="button"
              onClick={() => setIsLayoutModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs cursor-pointer transition-colors"
              title="Open Category View Layout Manager"
            >
              <LayoutGrid className="w-4 h-4 text-amber-500" />
              <span>
                {uiLang === 'ar'
                  ? 'إدارة تخطيط الأقسام'
                  : 'Manage Category Layouts'}
              </span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{uiLang === 'ar' ? 'إضافة صنف' : 'Add Item'}</span>
            </button>

            <button
              type="button"
              onClick={refreshMenu}
              title={uiLang === 'ar' ? 'تحديث القائمة' : 'Refresh Menu'}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin text-amber-500' : ''}`}
              />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{uiLang === 'ar' ? 'خروج' : 'Lock'}</span>
            </button>
          </div>
        </div>

        {/* Compact Summary Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] shadow-sm ring-1 ring-zinc-200/80 dark:ring-white/5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {uiLang === 'ar' ? 'إجمالي الأصناف' : 'Total Items'}
            </p>
            <p className="text-xl font-extrabold text-zinc-900 dark:text-white mt-0.5">
              {stats.total}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] shadow-sm ring-1 ring-zinc-200/80 dark:ring-white/5">
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              {uiLang === 'ar' ? 'متوفر' : 'Available'}
            </p>
            <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {stats.available}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] shadow-sm ring-1 ring-zinc-200/80 dark:ring-white/5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {uiLang === 'ar' ? 'نفذت الكمية' : 'Sold Out'}
            </p>
            <p className="text-xl font-extrabold text-zinc-700 dark:text-zinc-300 mt-0.5">
              {stats.soldOut}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] shadow-sm ring-1 ring-zinc-200/80 dark:ring-white/5">
            <p className="text-xs text-red-600 dark:text-red-400">
              {uiLang === 'ar' ? 'العروض' : 'Active Offers'}
            </p>
            <p className="text-xl font-extrabold text-red-600 dark:text-amber-400 mt-0.5">
              {stats.offers}
            </p>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 bg-white dark:bg-[#141414] p-3 rounded-2xl shadow-sm ring-1 ring-zinc-200/80 dark:ring-white/5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                uiLang === 'ar'
                  ? 'ابحث عن صنف...'
                  : englishOnlyMode
                  ? 'Search items by name...'
                  : 'Search items by English or Arabic name...'
              }
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-zinc-100 dark:bg-black text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by Category"
            className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-black text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="all">
              {uiLang === 'ar' ? 'جميع الأقسام' : 'All Categories'}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {englishOnlyMode
                  ? cat.name_en
                  : `${cat.name_en} — ${cat.name_ar}`}
              </option>
            ))}
          </select>

          {/* Category Layout Selector (Single Card View vs. 2-Column Grid View) when a category is selected */}
          {selectedCategory !== 'all' && (
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-black p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setCategoryViewMode(selectedCategory, 'single')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  getCategoryViewMode(selectedCategory) === 'single'
                    ? 'bg-amber-500 text-black'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                <Rows3 className="w-3.5 h-3.5" />
                <span>{uiLang === 'ar' ? 'عرض فردي' : 'Single View'}</span>
              </button>
              <button
                type="button"
                onClick={() => setCategoryViewMode(selectedCategory, 'grid')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  getCategoryViewMode(selectedCategory) === 'grid'
                    ? 'bg-amber-500 text-black'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{uiLang === 'ar' ? 'شبكة (عمودين)' : '2-Col Grid'}</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-black p-1 rounded-xl overflow-x-auto">
            {[
              { id: 'all', labelEn: 'All', labelAr: 'الكل' },
              { id: 'available', labelEn: 'Available', labelAr: 'متوفر' },
              { id: 'soldout', labelEn: 'Sold Out', labelAr: 'نفذت الكمية' },
              { id: 'offer', labelEn: 'Offers', labelAr: 'العروض' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {uiLang === 'ar' ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-2.5">
          {filteredItems.map((item) => {
            const cat = categoryMap[item.category_id];
            const isEditingPrice = editingPriceId === item.id;
            const ratingStats = getItemRatingStats(item.id);

            return (
              <div
                key={item.id}
                className={`p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#141414] shadow-sm ring-1 ring-zinc-200/80 dark:ring-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-opacity ${
                  !item.is_available ? 'opacity-70' : ''
                }`}
              >
                {/* Item Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#FDFDFD] shrink-0">
                    <img
                      src={resolveProductImageUrl(item)}
                      alt={item.name_en}
                      onError={(e) => {
                        handleProductImageError(e, item, categoryMap);
                      }}
                      className={`w-full h-full object-contain p-1 ${!item.is_available ? 'grayscale' : ''}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                        {cat ? cat.name_en : item.category_id}
                      </span>
                      {item.is_offer && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white">
                          Offer
                        </span>
                      )}
                      {!item.is_available && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          Sold Out
                        </span>
                      )}
                      {ratingStats.count > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-600 dark:text-amber-400">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>{ratingStats.average.toFixed(1)}</span>
                          <span>({ratingStats.count})</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white truncate">
                      {item.name_en}
                    </h3>
                    {!englishOnlyMode && (
                      <p
                        dir="rtl"
                        className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate"
                      >
                        {item.name_ar}
                      </p>
                    )}
                  </div>
                </div>

                {/* Controls: Inline Price, Availability Toggle, Edit, Delete */}
                <div className="w-full sm:w-auto flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
                  {isEditingPrice ? (
                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-black p-1 rounded-xl ring-1 ring-amber-500">
                      <input
                        type="number"
                        step="0.050"
                        min="0"
                        value={editingPriceValue}
                        onChange={(e) => setEditingPriceValue(e.target.value)}
                        className="w-20 px-2 py-1 text-sm font-bold text-zinc-900 dark:text-amber-400 bg-transparent focus:outline-none"
                        autoFocus
                      />
                      <span className="text-xs text-zinc-400 font-bold">KD</span>
                      <button
                        type="button"
                        onClick={() => handleSaveInlinePrice(item.id)}
                        className="p-1.5 rounded-lg bg-emerald-600 text-white cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPriceId(null)}
                        className="p-1.5 rounded-lg bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPriceId(item.id);
                        setEditingPriceValue(Number(item.price).toFixed(3));
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-black dark:hover:bg-zinc-900 text-zinc-900 dark:text-amber-400 font-extrabold text-sm cursor-pointer transition-colors"
                      title="Click to edit price"
                    >
                      <span>{formatKD(item.price, uiLang)}</span>
                      <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleItemAvailability(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                      item.is_available
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.is_available ? 'bg-emerald-500' : 'bg-zinc-400'
                      }`}
                    />
                    <span>
                      {item.is_available
                        ? uiLang === 'ar'
                          ? 'متوفر'
                          : 'Available'
                        : uiLang === 'ar'
                        ? 'نفذت الكمية'
                        : 'Out of Stock'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 rounded-xl bg-zinc-100 hover:bg-amber-500 hover:text-black dark:bg-zinc-800 dark:hover:bg-amber-500 dark:hover:text-black text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                      title="Edit Item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteMenuItem(item.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          ADD / EDIT ITEM MODAL
      ===================================================================== */}
      {isItemModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setIsItemModalOpen(false)}
        >
          <div
            className="w-full sm:max-w-xl bg-white dark:bg-[#161616] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 flex items-center justify-between border-b border-zinc-200/70 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white">
                  {editingItem
                    ? uiLang === 'ar'
                      ? 'تعديل الصنف'
                      : 'Edit Menu Item'
                    : uiLang === 'ar'
                    ? 'إضافة صنف جديد'
                    : 'Add New Menu Item'}
                </h2>
                {englishOnlyMode && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wide">
                    English Only Mode
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsItemModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSaveItemForm}
              className="px-5 py-5 space-y-4 overflow-y-auto flex-1"
            >
              {/* 1. CATEGORY SELECTION & '+ ADD NEW CATEGORY' ACTION BUTTON */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-black/40 ring-1 ring-zinc-200/70 dark:ring-white/5 space-y-2.5">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-200">
                  {uiLang === 'ar' ? 'القسم *' : 'Category *'}
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <select
                    value={formData.category_id}
                    onChange={(e) => {
                      if (e.target.value === '__add_new__') {
                        setIsAddingCategory(true);
                        return;
                      }
                      setFormData((prev) => ({
                        ...prev,
                        category_id: e.target.value,
                      }));
                    }}
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-white dark:bg-black text-sm font-medium text-zinc-900 dark:text-white ring-1 ring-zinc-200 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {englishOnlyMode
                          ? cat.name_en
                          : `${cat.name_en} (${cat.name_ar})`}
                      </option>
                    ))}
                    <option value="__add_new__">
                      {uiLang === 'ar'
                        ? '+ إضافة قسم جديد...'
                        : '+ Add New Category...'}
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={() => setIsAddingCategory((prev) => !prev)}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 cursor-pointer transition-all ${
                      isAddingCategory
                        ? 'bg-amber-500 text-black shadow-sm'
                        : 'bg-amber-500/15 hover:bg-amber-500 text-amber-700 dark:text-amber-400 hover:text-black ring-1 ring-amber-500/35'
                    }`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>
                      {uiLang === 'ar'
                        ? 'إضافة قسم جديد'
                        : 'Add New Category'}
                    </span>
                  </button>
                </div>

                {/* Inline Create New Category Panel */}
                {isAddingCategory && (
                  <div className="mt-2 p-3.5 rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-zinc-900 dark:text-amber-400 flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>
                          {uiLang === 'ar'
                            ? 'إنشاء قسم جديد (مثل: شاورما، مشاوي، حلويات)'
                            : 'Create New Category (e.g., Shawarma, Grills, Desserts)'}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCategory(false);
                          setNewCatEn('');
                          setNewCatAr('');
                        }}
                        className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div
                      className={`grid grid-cols-1 ${
                        englishOnlyMode ? '' : 'sm:grid-cols-2'
                      } gap-2.5`}
                    >
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-200 mb-1">
                          {englishOnlyMode
                            ? 'Category Name *'
                            : 'Category Name (English) *'}
                        </label>
                        <input
                          type="text"
                          value={newCatEn}
                          onChange={(e) =>
                            handleNewCategoryEnglishChange(e.target.value)
                          }
                          placeholder="e.g. Shawarma"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-xs sm:text-sm text-zinc-900 dark:text-white ring-1 ring-zinc-200 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                      </div>

                      {!englishOnlyMode && (
                        <div>
                          <label
                            dir="rtl"
                            className="block text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-1 text-right"
                          >
                            اسم القسم بالعربية (يتولد تلقائياً أو يدوياً) *
                          </label>
                          <input
                            type="text"
                            dir="rtl"
                            value={newCatAr}
                            onChange={(e) => setNewCatAr(e.target.value)}
                            placeholder="مثال: شاورما"
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-xs sm:text-sm text-right text-zinc-900 dark:text-amber-300 ring-1 ring-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCategory(false);
                          setNewCatEn('');
                          setNewCatAr('');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs cursor-pointer"
                      >
                        {uiLang === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        type="button"
                        disabled={isSavingCategory || !newCatEn.trim()}
                        onClick={handleCreateCategoryOnTheFly}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs cursor-pointer disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>
                          {isSavingCategory
                            ? uiLang === 'ar'
                              ? 'جارٍ الحفظ...'
                              : 'Saving...'
                            : uiLang === 'ar'
                            ? 'حفظ القسم فوراً'
                            : 'Save Category'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. STOCK STATUS (Dedicated Non-Overlapping Row) */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-black/40 ring-1 ring-zinc-200/70 dark:ring-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-200">
                    {uiLang === 'ar' ? 'حالة التوفر' : 'Stock Status'}
                  </label>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {uiLang === 'ar'
                      ? 'حدد ما إذا كان الصنف متوفراً للطلب حالياً'
                      : 'Set whether this dish is currently in stock'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:w-64 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        is_available: true,
                      }))
                    }
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      formData.is_available
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-white dark:bg-black text-zinc-500 dark:text-zinc-400 ring-1 ring-zinc-200 dark:ring-white/10'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {englishOnlyMode
                        ? 'Available'
                        : uiLang === 'ar'
                        ? 'متوفر'
                        : 'Available'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        is_available: false,
                      }))
                    }
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      !formData.is_available
                        ? 'bg-zinc-800 text-white dark:bg-zinc-700 shadow-sm'
                        : 'bg-white dark:bg-black text-zinc-500 dark:text-zinc-400 ring-1 ring-zinc-200 dark:ring-white/10'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {englishOnlyMode
                        ? 'Sold Out'
                        : uiLang === 'ar'
                        ? 'نفذت الكمية'
                        : 'Sold Out'}
                    </span>
                  </button>
                </div>
              </div>

              {/* 3. AUTO-TRANSLATION HELPER BAR (Hidden in English Only Mode) */}
              {!englishOnlyMode && (
                <div className="p-3 rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/30 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-amber-500 shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold text-zinc-900 dark:text-amber-400">
                        {uiLang === 'ar'
                          ? 'الترجمة التلقائية (إنجليزي ← عربي)'
                          : 'Auto-Translate (English → Arabic)'}
                      </span>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {uiLang === 'ar'
                          ? 'اكتب بالإنجليزية وسيتم توليد الترجمة العربية تلقائياً'
                          : 'Type in English below to auto-generate Arabic name & bullet points'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAutoTranslateEnabled((prev) => !prev)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                        autoTranslateEnabled
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-500/40'
                          : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {autoTranslateEnabled ? 'Live Auto: ON' : 'Live Auto: OFF'}
                    </button>

                    <button
                      type="button"
                      disabled={isTranslatingCloud}
                      onClick={handleManualTranslateClick}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[11px] cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>
                        {isTranslatingCloud
                          ? 'Translating...'
                          : uiLang === 'ar'
                          ? 'ترجم الآن'
                          : 'Translate Now'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* 4. PRODUCT NAME (Clean English-only in Staff Mode, Dual-Language otherwise) */}
              <div className="space-y-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-black/40 ring-1 ring-zinc-200/70 dark:ring-white/5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-200 mb-1">
                    {englishOnlyMode
                      ? 'Product Name *'
                      : 'Product Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name_en}
                    onChange={(e) => handleEnglishNameChange(e.target.value)}
                    placeholder="e.g. 6 Pcs Spicy Crispy Chicken Bucket"
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-black text-sm text-zinc-900 dark:text-white ring-1 ring-zinc-200 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                {!englishOnlyMode && (
                  <div>
                    <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center justify-between">
                      <span>Arabic Product Name (Auto-Generated Below) *</span>
                      <span dir="rtl">الاسم بالعربية (يتولد تلقائياً)</span>
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      required
                      value={formData.name_ar}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name_ar: e.target.value,
                        }))
                      }
                      placeholder="يتولد تلقائياً عند الكتابة بالإنجليزية أعلاه..."
                      className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-black text-sm text-right text-zinc-900 dark:text-amber-300 ring-1 ring-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                )}
              </div>

              {/* 5. PRODUCT DESCRIPTION / BULLET POINTS (Clean English-only in Staff Mode, Dual-Language otherwise) */}
              <div className="space-y-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-black/40 ring-1 ring-zinc-200/70 dark:ring-white/5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-200 mb-1">
                    {englishOnlyMode
                      ? 'Description / Included Items (1 item per line)'
                      : 'Description / Included Items (English — 1 item per line)'}
                  </label>
                  <textarea
                    rows={3}
                    dir="ltr"
                    value={formData.description_en}
                    onChange={(e) =>
                      handleEnglishDescriptionChange(e.target.value)
                    }
                    placeholder={'4 Pcs Broasted Chicken\nGolden French Fries\nColeslaw & Garlic Dip'}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-sm text-left text-zinc-900 dark:text-white ring-1 ring-zinc-200 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                {!englishOnlyMode && (
                  <div>
                    <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center justify-between">
                      <span>
                        Arabic Description / Bullet Points (Auto-Generated Below)
                      </span>
                      <span dir="rtl">
                        المكونات / الوصف بالعربية (يتولد تلقائياً)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={formData.description_ar}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description_ar: e.target.value,
                        }))
                      }
                      placeholder={'تتولد النقاط بالعربية تلقائياً سطراً بسطر...'}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black text-sm text-right text-zinc-900 dark:text-amber-300 ring-1 ring-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                )}
              </div>

              {/* 6. PRICE & DISCOUNT SETTINGS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-zinc-100/80 dark:bg-black/60">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-amber-400 mb-1">
                    Price (KD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-3.5 h-3.5 text-amber-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      step="0.050"
                      min="0"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      className="w-full pl-8 pr-9 py-2 rounded-xl bg-white dark:bg-[#161616] text-sm font-bold text-zinc-900 dark:text-white focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-zinc-400">
                      KD
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Original Price (KD)
                  </label>
                  <input
                    type="number"
                    step="0.050"
                    min="0"
                    value={formData.original_price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        original_price: e.target.value,
                        is_offer:
                          Boolean(e.target.value) &&
                          Number(e.target.value) > Number(prev.price),
                      }))
                    }
                    placeholder="Optional"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#161616] text-sm text-zinc-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        is_offer: !prev.is_offer,
                      }))
                    }
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      formData.is_offer
                        ? 'bg-red-600 text-white'
                        : 'bg-white dark:bg-[#161616] text-zinc-500'
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{formData.is_offer ? 'Offer Active' : 'No Offer'}</span>
                  </button>
                </div>
              </div>

              {/* 7. PRODUCT IMAGE UPLOAD */}
              <div className="p-3.5 rounded-2xl bg-zinc-100/80 dark:bg-black/60 space-y-2.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-500" />
                  <span>{uiLang === 'ar' ? 'صورة الصنف' : 'Product Image'}</span>
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-[#161616] overflow-hidden shrink-0 flex items-center justify-center">
                    {formData.image_url ? (
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          handleProductImageError(e, { category_id: formData.category_id });
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-zinc-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer disabled:opacity-50"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>
                        {isUploadingImage
                          ? 'Uploading...'
                          : uiLang === 'ar'
                          ? 'رفع صورة جديدة'
                          : 'Upload Image'}
                      </span>
                    </button>

                    <input
                      type="text"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          image_url: e.target.value,
                        }))
                      }
                      placeholder="Image URL or upload above"
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] text-xs text-zinc-900 dark:text-white focus:outline-none"
                    />

                    {/* Quick Official Studio Images Preset Selector */}
                    <div className="pt-1">
                      <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                        {uiLang === 'ar'
                          ? 'أو اختر صورة ستوديو رسمية من القائمة:'
                          : 'Or select an official studio preset:'}
                      </p>
                      <select
                        value={
                          AVAILABLE_STUDIO_IMAGES.some(
                            (img) => img.path === formData.image_url
                          )
                            ? formData.image_url
                            : ''
                        }
                        onChange={(e) => {
                          if (e.target.value) {
                            setFormData((prev) => ({
                              ...prev,
                              image_url: e.target.value,
                            }));
                            setUploadStatusMsg(
                              uiLang === 'ar'
                                ? 'تم اختيار صورة الستوديو'
                                : 'Official studio image selected'
                            );
                          }
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#161616] text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:outline-none cursor-pointer"
                      >
                        <option value="">
                          {uiLang === 'ar'
                            ? '-- اختر صورة رسمية --'
                            : '-- Choose official studio preset --'}
                        </option>
                        {AVAILABLE_STUDIO_IMAGES.map((img) => (
                          <option key={img.path} value={img.path}>
                            [{img.category}] {img.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {uploadStatusMsg && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {uploadStatusMsg}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs cursor-pointer"
                >
                  {uiLang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSavingItem || isUploadingImage}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer disabled:opacity-50"
                >
                  {isSavingItem
                    ? 'Saving...'
                    : editingItem
                    ? uiLang === 'ar'
                      ? 'حفظ التعديلات'
                      : 'Save Changes'
                    : uiLang === 'ar'
                    ? 'إضافة الصنف'
                    : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MANAGE CATEGORY LAYOUTS POP-UP MODAL (Vertical List + Global Toggle)
      ===================================================================== */}
      {isLayoutModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setIsLayoutModalOpen(false)}
        >
          <div
            className="w-full sm:max-w-lg bg-white dark:bg-[#161616] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[88vh] flex flex-col ring-1 ring-zinc-200 dark:ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-zinc-200/70 dark:border-white/5">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-amber-500" />
                  <span>
                    {uiLang === 'ar'
                      ? 'إدارة تخطيط عرض الأقسام'
                      : 'Manage Category Layouts'}
                  </span>
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {uiLang === 'ar'
                    ? 'اختر العرض الفردي أو الشبكي (عمودين) لكل قسم في القائمة'
                    : 'Choose Single View or 2-Col Grid View for each menu category'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLayoutModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Global Toggle Bar (Set All Categories at Once) */}
            <div className="px-5 py-3 bg-zinc-50 dark:bg-black/50 border-b border-zinc-200/60 dark:border-white/5 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {uiLang === 'ar'
                  ? 'تطبيق على جميع الأقسام:'
                  : 'Global Quick Set (All Categories):'}
              </span>

              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAllCategoriesViewMode('single');
                    showToast(
                      uiLang === 'ar'
                        ? 'تم ضبط جميع الأقسام على العرض الفردي'
                        : 'All categories set to Single View'
                    );
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-200/80 hover:bg-amber-500 hover:text-black dark:bg-zinc-800 dark:hover:bg-amber-500 dark:hover:text-black text-zinc-700 dark:text-zinc-200 text-xs font-bold cursor-pointer transition-colors"
                >
                  <Rows3 className="w-3.5 h-3.5" />
                  <span>
                    {uiLang === 'ar' ? 'الكل فردي' : 'All Single View'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAllCategoriesViewMode('grid');
                    showToast(
                      uiLang === 'ar'
                        ? 'تم ضبط جميع الأقسام على عرض الشبكة (عمودين)'
                        : 'All categories set to 2-Col Grid View'
                    );
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-200/80 hover:bg-amber-500 hover:text-black dark:bg-zinc-800 dark:hover:bg-amber-500 dark:hover:text-black text-zinc-700 dark:text-zinc-200 text-xs font-bold cursor-pointer transition-colors"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>
                    {uiLang === 'ar' ? 'الكل شبكة' : 'All 2-Col Grid'}
                  </span>
                </button>
              </div>
            </div>

            {/* Vertical Scrollable List of All Categories */}
            <div className="px-5 py-4 space-y-2.5 overflow-y-auto flex-1">
              {[
                {
                  id: 'special-offers',
                  name_en: 'Special Offers',
                  name_ar: 'العروض الخاصة',
                },
                ...categories,
              ].map((cat) => {
                const mode = getCategoryViewMode(cat.id);
                const isGrid = mode === 'grid';

                return (
                  <div
                    key={`modal-layout-${cat.id}`}
                    className="p-3 rounded-2xl bg-zinc-50 dark:bg-black/40 ring-1 ring-zinc-200/70 dark:ring-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white truncate">
                        {uiLang === 'ar' ? cat.name_ar : cat.name_en}
                      </p>
                      {!englishOnlyMode && (
                        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
                          {uiLang === 'ar' ? cat.name_en : cat.name_ar}
                        </p>
                      )}
                    </div>

                    {/* Switch between Single View and 2-Col Grid View */}
                    <div className="inline-flex items-center p-1 rounded-xl bg-zinc-200/75 dark:bg-[#1E1E1E] shrink-0">
                      <button
                        type="button"
                        onClick={() => setCategoryViewMode(cat.id, 'single')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                          !isGrid
                            ? 'bg-amber-500 text-black shadow-sm'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        <Rows3 className="w-3.5 h-3.5" />
                        <span>
                          {uiLang === 'ar' ? 'فردي' : 'Single View'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCategoryViewMode(cat.id, 'grid')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                          isGrid
                            ? 'bg-amber-500 text-black shadow-sm'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>
                          {uiLang === 'ar' ? 'شبكة عمودين' : '2-Col Grid'}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 border-t border-zinc-200/70 dark:border-white/5 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsLayoutModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs cursor-pointer transition-colors"
              >
                {uiLang === 'ar' ? 'تم' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
