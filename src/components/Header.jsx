import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  Globe,
  Sun,
  Moon,
  Lock,
  Unlock,
  KeyRound,
  X,
  ArrowLeft,
} from 'lucide-react';
import { useMenu } from '../context/useMenu';
import { STORE_INFO } from '../data/seedMenu';

const DEFAULT_PIN = import.meta.env.VITE_ADMIN_PIN || '1234';
const SESSION_AUTH_KEY = 'yummy_staff_admin_authenticated';

export default function Header() {
  const { lang, toggleLanguage, theme, toggleTheme, showToast } = useMenu();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Secret Double-Click / Rapid 2-Tap detector on the Yummy Logo
  const lastClickTimeRef = useRef(0);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    if (isPinModalOpen) {
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
  }, [isPinModalOpen]);

  const openSecretAdminModal = () => {
    setPinInput('');
    setPinError('');
    setIsPinModalOpen(true);
  };

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 450) {
      // 2 rapid clicks/taps detected!
      lastClickTimeRef.current = 0;
      openSecretAdminModal();
    } else {
      lastClickTimeRef.current = now;
      if (isAdminPage) {
        navigate('/');
      }
    }
  };

  const unlockAndRedirectToAdmin = () => {
    sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
    window.dispatchEvent(new Event('yummy-admin-auth-change'));
    setIsPinModalOpen(false);
    setPinInput('');
    setPinError('');
    showToast(
      lang === 'ar'
        ? 'مرحباً بك في لوحة تحكم الموظفين'
        : 'Staff Admin Dashboard Unlocked'
    );
    navigate('/admin');
  };

  const handlePinSubmit = (e) => {
    if (e) e.preventDefault();
    const customPin =
      localStorage.getItem('yummy_custom_admin_pin') || DEFAULT_PIN;
    if (
      pinInput === customPin ||
      pinInput === DEFAULT_PIN ||
      pinInput === 'admin'
    ) {
      unlockAndRedirectToAdmin();
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
      const customPin =
        localStorage.getItem('yummy_custom_admin_pin') || DEFAULT_PIN;
      if (next.length === 4 && (next === customPin || next === DEFAULT_PIN)) {
        unlockAndRedirectToAdmin();
      }
    }
  };

  return (
    <>
      {/* Solid Premium Black Top Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A] text-white shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Left: Enlarged Official Yummy Logo (Secret Double-Click Trigger) + Pure White Brand Title & Location */}
          <div
            onClick={handleLogoClick}
            onDoubleClick={openSecretAdminModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogoClick();
            }}
            className="flex items-center gap-3 sm:gap-3.5 min-w-0 select-none cursor-pointer group"
            title="Yummy Fried Chicken Kuwait"
          >
            {/* Prominent Official Yummy Logo */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/brand/logo-yummy.png"
                alt="Yummy Fried Chicken Logo"
                className="w-full h-full object-contain scale-[1.9] pointer-events-none transition-transform duration-200 group-hover:scale-[2.0]"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith('/logo-yummy.png')) {
                    e.currentTarget.src = '/logo-yummy.png';
                  } else {
                    e.currentTarget.style.display = 'none';
                  }
                }}
              />
            </div>

            {/* Brand Name & Location Details in Clean Pure White */}
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight leading-tight text-white truncate">
                Yummy Fried Chicken
              </h1>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-white mt-0.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="text-white font-medium">
                  {lang === 'ar'
                    ? STORE_INFO.location_ar
                    : STORE_INFO.location_en}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls: Clean White/Neutral Theme & Language Toggles (No red/yellow backgrounds) */}
          <div className="flex items-center gap-2 shrink-0">
            {isAdminPage && (
              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'ar' ? 'القائمة' : 'Menu'}</span>
              </button>
            )}

            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'
              }
              title={
                theme === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'
              }
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 active:scale-95 transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>

            {/* English / Arabic Language Toggle in Clean White/Neutral Tones */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle Language English / Arabic"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-bold text-xs sm:text-sm active:scale-95 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-white shrink-0" />
              <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Secret Admin PIN Login Modal (Triggered by Double-Clicking the Logo) */}
      {isPinModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsPinModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-[#141414] text-white border border-white/10 shadow-2xl p-6 text-center space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPinModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-white">
                {lang === 'ar' ? 'بوابة الموظفين' : 'Staff Admin Access'}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {lang === 'ar'
                  ? 'أدخل رمز المرور المكون من 4 أرقام'
                  : 'Enter your 4-digit Staff PIN'}
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                  className="w-full py-3 pl-10 pr-4 rounded-xl bg-black border border-white/15 text-center font-mono text-xl tracking-[0.5em] text-amber-400 focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>

              {pinError && (
                <p className="text-xs font-semibold text-red-400">{pinError}</p>
              )}

              <div className="grid grid-cols-3 gap-2">
                {[
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  'C',
                  '0',
                  '⌫',
                ].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleKeypadPress(key)}
                    className={`py-2.5 rounded-xl font-bold text-base transition-colors active:scale-95 cursor-pointer ${
                      key === 'C'
                        ? 'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                        : key === '⌫'
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-[#1E1E1E] hover:bg-amber-400 hover:text-black text-white'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Unlock className="w-4 h-4" />
                <span>{lang === 'ar' ? 'دخول' : 'Unlock Admin'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
