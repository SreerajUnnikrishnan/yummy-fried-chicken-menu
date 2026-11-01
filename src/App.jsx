import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { MenuProvider } from './context/MenuContext';
import { useMenu } from './context/useMenu';
import Header from './components/Header';
import CustomerMenu from './pages/CustomerMenu';
import AdminDashboard from './pages/AdminDashboard';

function ToastBanner() {
  const { toast } = useMenu();
  if (!toast) return null;

  const styles =
    toast.type === 'error'
      ? 'bg-red-600 text-white'
      : toast.type === 'warning'
      ? 'bg-amber-400 text-black'
      : 'bg-[#141414] text-white border border-amber-400/50';

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto sm:w-80 z-50 pointer-events-none flex justify-end">
      <div
        className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold ${styles}`}
      >
        {toast.type === 'error' || toast.type === 'warning' ? (
          <AlertTriangle className="w-4 h-4 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-4 h-4 shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

function AppContent() {
  const { theme } = useMenu();
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDark ? 'dark bg-[#0A0A0A] text-white' : 'bg-white text-zinc-900'
      }`}
    >
      <Header />
      <ToastBanner />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<CustomerMenu />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <Router>
        <AppContent />
      </Router>
    </MenuProvider>
  );
}
