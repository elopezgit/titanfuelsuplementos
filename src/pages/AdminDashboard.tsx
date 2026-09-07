import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KanbanBoard from '../components/admin/KanbanBoard';
import CatalogManager from '../components/admin/CatalogManager';
import BannerManager from '../components/admin/BannerManager';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';
import POSHome from './POSHome';
import ErrorBoundary from '../components/ErrorBoundary';
import { LayoutDashboard, ShoppingBag, Image as ImageIcon, Settings, LockKeyhole, LogOut, BarChart3, Store, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const { empresaSlug } = useParams<{ empresaSlug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'kanban' | 'catalog' | 'banners' | 'config' | 'pos'>('analytics');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Login States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<'admin' | 'cocina' | 'operador' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem(`admin_role_${empresaSlug}`);
    if (savedRole === 'admin' || savedRole === 'cocina' || savedRole === 'operador') {
      setIsAuthenticated(true);
      setRole(savedRole);
      setDefaultTab(savedRole);
    }
  }, [empresaSlug]);

  const setDefaultTab = (userRole: 'admin' | 'cocina' | 'operador') => {
    if (userRole === 'admin') setActiveTab('analytics');
    else if (userRole === 'cocina') setActiveTab('kanban');
    else if (userRole === 'operador') setActiveTab('pos');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(false);
    
    // Bypass local / acceso rápido para administración y roles internos
    if (
      (username === 'admin' && password === '123456') ||
      (username === 'cocina' && password === 'cocina') || 
      (username === 'operador' && password === 'operador')
    ) {
      const assignedRole = username === 'admin' ? 'admin' : (username as 'cocina' | 'operador');
      setIsAuthenticated(true);
      setRole(assignedRole);
      localStorage.setItem(`admin_role_${empresaSlug}`, assignedRole);
      setDefaultTab(assignedRole);
      setIsLoading(false);
      return;
    }

    // Login real por supabase multi-tenant (Aislamiento de empresas)
    // Cada empresa tendrá su propio usuario admin aislado basado en su slug
    let loginEmail = username;
    if (username === 'admin') {
      loginEmail = `${empresaSlug}@gmail.com`;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: password,
      });

      if (error || !data.user) {
        setLoginError(true);
      } else {
        const assignedRole = 'admin';
        setIsAuthenticated(true);
        setRole(assignedRole);
        localStorage.setItem(`admin_role_${empresaSlug}`, assignedRole);
        setDefaultTab(assignedRole);
      }
    } catch (err) {
      setLoginError(true);
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem(`admin_role_${empresaSlug}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] w-full max-w-md text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <LockKeyhole size={36} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Acceso Restringido</h2>
          <p className="text-slate-400 text-sm mb-10 font-medium">Administración de <span className="text-primary">{empresaSlug}</span></p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Usuario" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-slate-700 text-white px-5 py-4 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-500"
              />
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-slate-700 text-white px-5 py-4 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-500"
              />
            </div>
            
            {loginError && <p className="text-red-400 text-sm font-semibold animate-pulse">Credenciales incorrectas</p>}
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-black font-black text-lg py-4 rounded-xl mt-6 active:scale-[0.98] transition-all hover:shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.4)] hover:brightness-110 disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center gap-2"
            >
              {isLoading ? 'Verificando...' : 'Entrar al Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900 text-white h-16 flex items-center justify-between px-4 sticky top-0 z-40 border-b border-slate-800 shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black font-bold">
              {empresaSlug?.charAt(0).toUpperCase()}
            </span>
            <h1 className="font-bold text-lg truncate max-w-[150px] text-primary">{empresaSlug?.toUpperCase()}</h1>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 md:w-64 bg-slate-900 text-slate-100 p-6 flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6 md:mb-1">
          <h1 className="text-2xl font-bold text-primary hidden md:block">{empresaSlug?.toUpperCase()}</h1>
          <h1 className="text-2xl font-bold text-primary md:hidden">Menú</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-8 uppercase tracking-widest font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          Rol: <span className="text-slate-200">{role}</span>
        </p>
        
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {role === 'admin' && (
            <button 
              onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 text-left p-3.5 rounded-xl font-medium transition-all ${activeTab === 'analytics' ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-[1.02]' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <BarChart3 size={20} className={activeTab === 'analytics' ? 'text-black' : 'text-slate-500'} />
              Resumen
            </button>
          )}

          {(role === 'admin' || role === 'operador') && (
            <button 
              onClick={() => { setActiveTab('pos'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 text-left p-3.5 rounded-xl font-medium transition-all ${activeTab === 'pos' ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-[1.02]' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <Store size={20} className={activeTab === 'pos' ? 'text-black' : 'text-slate-500'} />
              Tomar Pedido
            </button>
          )}

          {(role === 'admin' || role === 'cocina') && (
            <button 
              onClick={() => { setActiveTab('kanban'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 text-left p-3.5 rounded-xl font-medium transition-all ${activeTab === 'kanban' ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-[1.02]' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <LayoutDashboard size={20} className={activeTab === 'kanban' ? 'text-black' : 'text-slate-500'} />
              Pedidos
            </button>
          )}

          {role === 'admin' && (
            <>
              <button 
                onClick={() => { setActiveTab('catalog'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 text-left p-3.5 rounded-xl font-medium transition-all ${activeTab === 'catalog' ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-[1.02]' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                <ShoppingBag size={20} className={activeTab === 'catalog' ? 'text-black' : 'text-slate-500'} />
                Catálogo
              </button>
              <button 
                onClick={() => { setActiveTab('banners'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 text-left p-3.5 rounded-xl font-medium transition-all ${activeTab === 'banners' ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-[1.02]' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                <ImageIcon size={20} className={activeTab === 'banners' ? 'text-black' : 'text-slate-500'} />
                Banners
              </button>
              <button 
                onClick={() => { setActiveTab('config'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 text-left p-3.5 rounded-xl font-medium transition-all ${activeTab === 'config' ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-[1.02]' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                <Settings size={20} className={activeTab === 'config' ? 'text-black' : 'text-slate-500'} />
                Configuración
              </button>
            </>
          )}
        </nav>
        
        <div className="mt-auto border-t border-slate-800/50 pt-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800/50 text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 border border-transparent py-3 rounded-xl text-sm font-semibold transition-all mb-4"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
          <p className="text-xs text-slate-500 text-center font-medium">Suplementos OS v2.0</p>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto relative bg-slate-50 h-[calc(100vh-64px)] md:h-screen">
        {activeTab === 'analytics' && <AnalyticsDashboard empresaSlug={empresaSlug!} />}
        {activeTab === 'kanban' && <KanbanBoard empresaSlug={empresaSlug!} role={role!} />}
        {activeTab === 'catalog' && <CatalogManager empresaSlug={empresaSlug!} />}
        {activeTab === 'banners' && <BannerManager empresaSlug={empresaSlug!} />}
        {activeTab === 'pos' && (
          <div className="h-full overflow-hidden">
            <POSHome empresaSlug={empresaSlug!} />
          </div>
        )}
        {activeTab === 'config' && (
          <div className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Configuración</h2>
            <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm leading-relaxed">
              Aquí pondremos más adelante la configuración del logo, teléfono, redes sociales y links de mapas de <span className="font-bold text-slate-700">{empresaSlug}</span>.
            </p>
          </div>
        )}
      </main>
    </div>
    </ErrorBoundary>
  );
}
