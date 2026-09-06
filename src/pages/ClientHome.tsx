import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShoppingCart, Search, Info, MapPin, Plus, Star, ChevronRight, RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import CartModal from '../components/client/CartModal';
import ProductModal from '../components/client/ProductModal';
import OrderTrackerModal from '../components/client/OrderTrackerModal';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../utils/brandLogos';
import { normalizeString } from '../utils/stringUtils';
import { getEmpresaData } from '../lib/getEmpresa';
import { formatPrice, roundUpPrice } from '../utils/formatPrice';

interface Empresa {
  id: string;
  name: string;
  phone: string;
  instagram_url: string;
  maps_url: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url?: string;
  is_active: boolean;
  sort_order?: number;
  price_half?: number | null;
}

interface Banner {
  id: string;
  image_url: string;
  link?: string;
  title?: string;
  subtitle?: string;
}

export default function ClientHome() {
  const { empresaSlug } = useParams<{ empresaSlug: string }>();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  
  const [lastOrder, setLastOrder] = useState<any[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | 'todas'>('todas');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('todas');
  const [selectedKeyword, setSelectedKeyword] = useState<string>('todas');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const getProductBrand = (product: Product): string => {
    const match = product.name.match(/^\[(.*?)\]/);
    if (match) return match[1].trim();
    const knownBrands = ['STAR NUTRITION', 'ENA SPORT', 'GENERATION FIT', 'NUTRILAB', 'BODY ADVANCED', 'VITAMIN WAY', 'MERVICK', 'XTRENGHT', 'GOLD NUTRITION', 'HOCH SPORT', 'NATULIV'];
    for (const b of knownBrands) {
      if (product.name.toUpperCase().includes(b)) return b;
    }
    return 'Otras';
  };

  const getCleanProductName = (product: Product): string => {
    return product.name.replace(/^\[.*?\]\s*/, '').trim();
  };

  const categoryColors: Record<string, { from: string; to: string; shadow: string }> = {
    'Proteínas': { from: '#991B1B', to: '#DC2626', shadow: 'rgba(220,38,38,0.4)' },
    'Creatinas': { from: '#C2410C', to: '#F97316', shadow: 'rgba(249,115,22,0.4)' },
    'Pre-Entrenos': { from: '#B91C1C', to: '#FF1E27', shadow: 'rgba(255,30,39,0.4)' },
    'Quemadores': { from: '#9A3412', to: '#EA580C', shadow: 'rgba(234,88,12,0.4)' },
    'Aminoácidos & BCAA': { from: '#7C2D12', to: '#D97706', shadow: 'rgba(217,119,6,0.4)' },
    'Vitaminas & Minerales': { from: '#4C0519', to: '#E11D48', shadow: 'rgba(225,29,72,0.4)' },
    'Colágenos & Belleza': { from: '#831843', to: '#F43F5E', shadow: 'rgba(244,63,94,0.4)' },
    'Ganadores & Energía': { from: '#9A3412', to: '#FF5C00', shadow: 'rgba(255,92,0,0.4)' },
    'Accesorios & Snacks': { from: '#1E293B', to: '#334155', shadow: 'rgba(51,65,85,0.4)' },
  };

  const getCategoryStyle = (catName: string) => {
    return categoryColors[catName] || { from: '#6B7280', to: '#9CA3AF', shadow: 'rgba(107,114,128,0.3)' };
  };

  const categoryEmojis: Record<string, string> = {
    'Proteínas': '🥩',
    'Creatinas': '⚡',
    'Pre-Entrenos': '🚀',
    'Quemadores': '🔥',
    'Aminoácidos & BCAA': '🧬',
    'Vitaminas & Minerales': '💊',
    'Colágenos & Belleza': '✨',
    'Ganadores & Energía': '🔋',
    'Accesorios & Snacks': '🎒',
  };

  const getCategoryEmoji = (catName: string) => {
    return categoryEmojis[catName] || '🏋️';
  };

  const { items, setIsCartOpen, addToCart, clearCart } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const firstChild = scrollRef.current.children[0] as HTMLElement;
        const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 320; 
        
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 4000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, []);

  const handleTouchStart = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      startAutoScroll();
    }, 5000);
  };

  useEffect(() => {
    async function loadData() {
      if (!empresaSlug) return;
      try {
        let empData = await getEmpresaData(empresaSlug);

        if (!empData) {
          throw new Error("No se pudo cargar la información de la empresa.");
        }
        
        setEmpresa(empData);

        // Check for last order in localStorage
        const savedOrder = localStorage.getItem(`lastOrder_${empData.id}`);
        if (savedOrder) {
          try {
            setLastOrder(JSON.parse(savedOrder));
          } catch(e) {}
        }

        // Check for active order tracking
        const activeOrder = localStorage.getItem(`activeOrder_${empData.id}`);
        if (activeOrder) {
          setActiveOrderId(activeOrder);
        }

        const [cats, prods, bans] = await Promise.all([
          supabase.from('categories').select('*').eq('empresa_id', empData.id),
          supabase.from('products').select('*').eq('empresa_id', empData.id).eq('is_active', true),
          supabase.from('banners').select('*').eq('empresa_id', empData.id).eq('is_active', true)
        ]);

        if (cats.data) {
          setCategories(cats.data);
        }

        if (prods.data) {
          setProducts(prods.data.map((p: any) => ({
            ...p,
            price: roundUpPrice(p.price),
            price_half: p.price_half ? roundUpPrice(p.price_half) : null
          })));
        }

        if (bans.data) {
          const sortedBans = bans.data.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
          setBanners(sortedBans);
        }

      } catch (err: any) {
        setError(err.message || 'Error cargando datos');
      } finally {
        setLoading(false);
        setTimeout(() => setShowSplash(false), 3500); // Dar más tiempo para la animación completa
      }
    }
    loadData();
  }, [empresaSlug]);



  if (loading || showSplash) {
    return (
      <AnimatePresence>
        <motion.div 
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={() => setShowSplash(false)}
          className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden cursor-pointer select-none"
        >
          {/* Subtle Dark Radial Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,30,39,0.15)_0%,_rgba(9,9,11,1)_70%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-70" />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-lg mx-auto">
            {/* Minimal Brand Tag Top */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-8 shadow-2xl"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                Distribución Oficial
              </span>
            </motion.div>

            {/* Logo Animator */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
              className="relative mb-8"
            >
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-white/5 bg-surface-card shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center relative z-10 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                  <img 
                    src="/logo.jfif" 
                    alt="Titan Fuel Suplementos" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = '/img/logo/logo.jfif';
                    }} 
                  />
                </div>
              </div>
            </motion.div>

            {/* Title & Brand Phrase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                TITAN FUEL
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-[0.3em] mt-3">
                Premium Supplements
              </p>
            </motion.div>

            {/* Clean Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-8"
            >
              <span className="bg-white/5 border border-white/5 text-slate-300 text-[10px] font-semibold px-4 py-2 rounded-lg uppercase tracking-wider">
                Proteínas & Creatinas
              </span>
              <span className="bg-white/5 border border-white/5 text-slate-300 text-[10px] font-semibold px-4 py-2 rounded-lg uppercase tracking-wider">
                Envíos a todo el país
              </span>
            </motion.div>

            {/* Call To Action Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <span className="bg-[#FF1E27] hover:bg-[#E11D48] text-white font-black text-xs uppercase tracking-[0.2em] px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(255,30,39,0.2)] active:scale-95 transition-all">
                Ingresar al Catálogo
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Toca la pantalla para continuar
              </span>
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (error || !empresa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090B] p-4">
        <div className="bg-[#18181B] p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-white/5">
          <Info size={48} className="mx-auto text-[#FF1E27] mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Ops! Algo salió mal</h1>
          <p className="text-slate-400 break-words">{error}</p>
        </div>
      </div>
    );
  }

  const activeCategoryName = activeCategory === 'todas'
    ? 'todas'
    : categories.find(c => c.id === activeCategory)?.name || 'todas';

  const categoryProductsRaw = activeCategory === 'todas'
    ? products
    : products.filter(p => p.category_id === activeCategory);

  const availableBrands = Array.from(
    new Set(categoryProductsRaw.map(p => getProductBrand(p)))
  ).filter(b => b !== 'Otras').sort();

  const categoryKeywordsMap: Record<string, string[]> = {
    'Proteínas': ['Whey', 'Isolate', 'Hidrolizada', 'Vegana', 'Caseína', '1kg', '2lbs'],
    'Creatinas': ['Monohidrato', 'Micronizada', '300g', '500g', '1kg', 'Capsulas'],
    'Pre-Entrenos': ['Cafeína', 'Beta Alanina', 'Óxido Nítrico', 'Citrulina', 'Arginina'],
    'Quemadores': ['L-Carnitina', 'CLA', 'Café Verde', 'Termogénico'],
    'Aminoácidos & BCAA': ['BCAA', 'Glutamina', 'EAA', 'HMB', 'Polvo'],
    'Vitaminas & Minerales': ['Magnesio', 'ZMA', 'Omega 3', 'Vitamina C', 'Vitamina D', 'Multivitamínico'],
    'Colágenos & Belleza': ['Hidrolizado', 'Ácido Hialurónico', 'Polvo', 'Limon', 'Naranja'],
    'Ganadores & Energía': ['Mass', 'Carbo', '1.5kg', '3kg', 'Energy'],
    'Accesorios & Snacks': ['Bar', 'Shaker', '12x', 'Caja'],
    'todas': ['Whey', 'Creatina', 'Pre-Entreno', 'Magnesio', 'BCAA', 'Colágeno', 'Omega 3']
  };

  const availableKeywords = categoryKeywordsMap[activeCategoryName] || categoryKeywordsMap['todas'];

  const filteredProducts = products.filter(p => {
    const brand = getProductBrand(p);
    
    const normalizedQuery = normalizeString(searchQuery);
    const searchTerms = normalizedQuery.split(' ').filter(t => t.trim() !== '');
    
    const normalizedName = normalizeString(p.name);
    const normalizedDesc = p.description ? normalizeString(p.description) : '';
    const normalizedBrand = normalizeString(brand);
    
    // Buscar el nombre de la categoría para incluirlo en la búsqueda
    const category = categories.find(c => c.id === p.category_id);
    const normalizedCategory = category ? normalizeString(category.name) : '';
    
    // Búsqueda inteligente (Acentos ignorados)
    const matchesSearch = searchTerms.every(term => 
      normalizedName.includes(term) || 
      normalizedDesc.includes(term) ||
      normalizedBrand.includes(term) ||
      normalizedCategory.includes(term)
    );
    
    const matchesCategory = activeCategory === 'todas' || p.category_id === activeCategory;
    const matchesBrand = selectedBrand === 'todas' || brand === selectedBrand;
    
    const normalizedKeyword = normalizeString(selectedKeyword);
    const matchesKeyword = selectedKeyword === 'todas' || 
                          normalizedName.includes(normalizedKeyword) ||
                          normalizedDesc.includes(normalizedKeyword);
                          
    return matchesSearch && matchesCategory && matchesBrand && matchesKeyword;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
    return (a.sort_order || 0) - (b.sort_order || 0);
  });

  const getProductQuantity = (productId: string) => {
    return items.filter(i => i.id === productId).reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setSelectedBrand('todas');
    setSelectedKeyword('todas');
  };

  const handleReorder = () => {
    clearCart();
    lastOrder.forEach(item => {
      // Recreamos el producto simulando que se agregó
      addToCart({ id: item.id, name: item.name, price: item.price }, item.quantity, item.notes);
    });
    setIsCartOpen(true);
  };

  const displayBanners = banners;

  return (
    <div className="min-h-screen bg-background pb-32 font-sans text-slate-200">
      {/* 1. HERO HEADER */}
      <header className="bg-background/80 pt-[env(safe-area-inset-top,1rem)] pb-4 px-4 sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl">
         <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-50" />
         <div className="flex justify-between items-center mb-5 gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
             <div className="w-12 h-12 rounded-xl border border-white/10 bg-black flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                <img src="/logo.jfif" alt="Titan Fuel Logo" className="w-full h-full object-cover" onError={(e) => {
                  e.currentTarget.src = '/img/logo/logo.jfif';
                }} />
             </div>
             <div className="min-w-0 flex-1">
               <h1 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-white uppercase truncate">
                 TITAN FUEL
               </h1>
               <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">
                 <span className="text-[#FF1E27]">
                   Premium Supplements
                 </span>
               </div>
             </div>
          </div>
          
          {/* Social & WhatsApp Contact */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href={`https://wa.me/5493814751620?text=${encodeURIComponent('¡Hola Titan Fuel! Quisiera consultar sobre suplementos deportivos.')}`}
              target="_blank" 
              rel="noreferrer"
              title="Consultar por WhatsApp"
              className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
            </a>
            <a 
              href="https://www.instagram.com/titanfuelsuplementos" 
              target="_blank" 
              rel="noreferrer"
              title="Instagram Oficial"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:border-[#FF1E27] hover:text-[#FF1E27] hover:bg-white/10 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Search Bar & Filter Button */}
        <div className="flex items-center gap-2">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por marca o producto..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18181B] border border-white/5 text-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-white/20 focus:bg-white/5 transition-all text-sm placeholder:text-slate-500 shadow-inner"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-[52px] h-[52px] shrink-0 bg-[#18181B] border border-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all active:scale-95 shadow-lg relative"
          >
            <SlidersHorizontal size={20} />
            {/* Filter Indicator Badge */}
            {(selectedBrand !== 'todas' || selectedKeyword !== 'todas' || sortBy !== 'recommended') && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF1E27] rounded-full shadow-[0_0_8px_#FF1E27]"></span>
            )}
          </button>
        </div>

        {/* Active Order Tracker Button */}
        {activeOrderId && !searchQuery && (
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setIsTrackerOpen(true)}
            className="w-full mt-4 bg-primary/20 border border-primary text-primary py-3 px-4 rounded-xl flex items-center justify-between font-bold text-sm shadow-[0_0_15px_rgba(255,184,0,0.2)] animate-pulse"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Sigue tu pedido en vivo
            </div>
            <ChevronRight size={18} />
          </motion.button>
        )}
      </header>

      <main className="mt-2">
        {/* REORDER BUTTON (If last order exists) */}
        {lastOrder.length > 0 && !searchQuery && (
          <section className="px-4 py-2 mt-2">
            <button 
              onClick={handleReorder}
              className="w-full bg-[#18181B] border border-white/5 p-4 rounded-2xl flex items-center justify-between shadow-lg hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="bg-[#FF1E27]/10 p-2 rounded-full text-[#FF1E27]">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Pedir lo mismo de nuevo</h3>
                  <p className="text-xs text-slate-400">Tu último pedido fue increíble.</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-500" />
            </button>
          </section>
        )}

        {/* 2. BANNERS CAROUSEL (Manual & Auto Scroll) */}
        {!searchQuery && (
          <section className="py-4 overflow-hidden relative group">
            <div 
              ref={scrollRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={handleTouchStart}
              onMouseLeave={handleTouchEnd}
              className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {displayBanners.map((banner) => {
                return (
                  <div 
                    key={banner.id} 
                    className="shrink-0 w-[85vw] max-w-[340px] md:w-96 h-44 rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl block bg-slate-950 snap-center group/banner cursor-pointer"
                  >
                    <img 
                      src={banner.image_url} 
                      alt={banner.title || "Promo Titan Fuel"} 
                      className="w-full h-full object-cover opacity-65 group-hover/banner:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <span className="inline-block bg-primary text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-widest mb-1.5 shadow-md">
                        TITAN FUEL
                      </span>
                      {banner.title && (
                        <h3 className="text-white font-black text-lg leading-tight uppercase tracking-tight drop-shadow-md">
                          {banner.title}
                        </h3>
                      )}
                      {banner.subtitle && (
                        <p className="text-slate-300 text-xs font-medium mt-0.5 line-clamp-1">
                          {banner.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. CATEGORY SELECTOR — CIRCULAR MINIMALIST DESIGN */}
        {!searchQuery && (
          <section className="px-4 mb-8">
            <h2 className="text-lg font-black text-white mb-4 tracking-[0.1em] uppercase flex items-center gap-2">
              Categorías
            </h2>
            
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2 -mx-4 px-4 snap-x snap-mandatory">
              {/* "Todas" circular button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0 }}
                onClick={() => handleSelectCategory('todas')}
                className="snap-start shrink-0 flex flex-col items-center gap-2"
              >
                <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-300 border ${activeCategory === 'todas' ? 'bg-[#FF1E27] border-[#FF1E27] shadow-[0_0_15px_rgba(255,30,39,0.4)] scale-[1.05]' : 'bg-[#18181B] border-white/10 hover:border-white/20 hover:scale-[1.02]'}`}>
                  <Star size={24} className={activeCategory === 'todas' ? 'text-white' : 'text-[#FF1E27]'} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider w-20 text-center leading-tight ${activeCategory === 'todas' ? 'text-white' : 'text-slate-400'}`}>
                  Todas
                </span>
              </motion.button>

              {/* Category circular buttons */}
              {categories.map((cat, i) => {
                const isActive = activeCategory === cat.id;
                const catProducts = products.filter(p => p.category_id === cat.id);
                const firstImageProduct = catProducts.find(p => p.image_url);
                const catImageUrl = firstImageProduct?.image_url;

                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * (i + 1) }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="snap-start shrink-0 flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-[72px] h-[72px] relative rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 border ${isActive ? 'bg-[#FF1E27] border-[#FF1E27] shadow-[0_0_15px_rgba(255,30,39,0.4)] scale-[1.05]' : 'bg-[#18181B] border-white/10 hover:border-white/20 hover:scale-[1.02]'}`}
                    >
                      <span className={`text-[32px] drop-shadow-md transition-transform duration-300 ${isActive ? 'scale-110 grayscale-0 brightness-110' : 'grayscale-[0.4] hover:grayscale-0'}`}>
                        {getCategoryEmoji(cat.name)}
                      </span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider w-20 text-center leading-tight ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {cat.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>
        )}

        {/* 4. PRODUCT LIST */}
        <section className="px-4">
          {[...categories].sort((a, b) => {
            const order = ['Proteínas', 'Creatinas', 'Pre-Entrenos', 'Quemadores', 'Aminoácidos & BCAA', 'Vitaminas & Minerales', 'Colágenos & Belleza', 'Ganadores & Energía', 'Accesorios & Snacks'];
            return order.indexOf(a.name) - order.indexOf(b.name);
          }).map(category => {
            const categoryProducts = filteredProducts.filter(p => p.category_id === category.id).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="mb-10">
                <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2.5 uppercase tracking-wide">
                  <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                    <Star size={16} className="text-[#FF1E27]" />
                  </span> 
                  <span>{category.name}</span>
                </h2>
                
                <div className="flex flex-col gap-3.5">
                  {categoryProducts.map((product, idx) => {
                    const qty = getProductQuantity(product.id);
                    const brand = getProductBrand(product);
                    const cleanName = getCleanProductName(product);
                    const formattedDesc = (product.description || '')
                      .replace(/Lisa Mayorista \/ Suplementos AR\.?/gi, 'TITAN FUEL SUPLEMENTOS')
                      .replace(/Suplementos AR\.?/gi, 'TITAN FUEL SUPLEMENTOS') ||
                      `Línea oficial ${brand}. Producto 100% original con garantía de autenticidad en TITAN FUEL SUPLEMENTOS.`;
                    
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        key={product.id} 
                        onClick={() => setSelectedProduct(product)}
                        className="bg-surface-card rounded-2xl border border-white/5 hover:border-white/10 p-3.5 flex gap-4 relative cursor-pointer active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:ring-1 hover:ring-white/5 group"
                      >
                        {/* Text Content Area (Left) */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            {brand !== 'Otras' && (
                              <div className="mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                <BrandLogo brand={brand} size="sm" />
                              </div>
                            )}
                            <h3 className="font-bold text-slate-100 group-hover:text-white text-[15px] leading-tight mb-1 pr-2 transition-colors">{cleanName}</h3>
                            <p className="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed">{formattedDesc}</p>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-1">
                            {product.price_half ? (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-black text-[#FF1E27] text-lg tracking-tight">${formatPrice(product.price_half)}</span>
                                <span className="font-semibold text-slate-500 text-xs line-through">${formatPrice(product.price)}</span>
                              </div>
                            ) : (
                              <span className="font-black text-white text-lg tracking-tight">${formatPrice(product.price)}</span>
                            )}
                            {qty > 0 && (
                              <span className="bg-[#FF1E27]/20 text-[#FF1E27] font-bold text-[10px] px-2.5 py-0.5 rounded-md border border-[#FF1E27]/40 uppercase tracking-wider">
                                {qty} en pedido
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Image & Official Brand Seal Area (Right) */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-black/40 rounded-xl relative overflow-hidden shadow-inner border border-white/5 group-hover:border-white/10 transition-all flex flex-col justify-between p-2">
                          {/* Top Tag */}
                          <div className="z-10 flex justify-end w-full">
                            <span className="bg-black/60 backdrop-blur-sm text-slate-300 font-bold text-[9px] px-1.5 py-0.5 rounded border border-white/10 tracking-[0.1em] uppercase">
                              OFICIAL
                            </span>
                          </div>

                          {/* Center Official Brand Logo */}
                          <div className="z-10 my-auto flex justify-center w-full">
                            <BrandLogo brand={brand} size="sm" />
                          </div>

                          {/* Background image with overlay */}
                          {product.image_url && (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                          {/* Add Button inside image corner - Touch Optimized */}
                          <button 
                            className="absolute bottom-1.5 right-1.5 z-20 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white shadow-lg active:scale-[0.85] hover:bg-[#FF1E27] transition-all"
                          >
                            <Plus size={20} strokeWidth={2.5} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-[#13131F] rounded-3xl border border-slate-800">
              <Search size={48} className="mx-auto text-slate-500 mb-4" />
              <p className="text-lg font-bold text-white">No encontramos ningún producto</p>
              <p className="text-slate-500 text-sm">Prueba buscando con otras palabras.</p>
            </div>
          )}
        </section>
      </main>

      {/* FLOATING CART BUTTON */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] bg-gradient-to-t from-[#09090D] via-[#09090D]/90 to-transparent pointer-events-none"
          >
            <div className="md:max-w-md md:mx-auto pointer-events-auto">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-full bg-gradient-to-r from-[#FF1E27] via-[#DC2626] to-[#FF5C00] text-white p-4 rounded-2xl shadow-[0_10px_35px_rgba(255,30,39,0.5)] flex items-center justify-between transition-all hover:brightness-110 active:scale-[0.97] border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-black/35 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg border border-white/20 shadow-inner">
                    {cartItemCount}
                  </div>
                  <span className="font-black text-lg tracking-tight uppercase">Ver mi pedido</span>
                </div>
                <ShoppingCart size={24} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTER MODAL (BOTTOM SHEET) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] bg-[#14141A] rounded-t-[2rem] z-50 flex flex-col border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <SlidersHorizontal size={22} className="text-[#FF1E27]" /> Filtros Avanzados
                </h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 hide-scrollbar flex flex-col gap-8">
                {/* SORT BY */}
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Ordenar Por</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'recommended', label: 'Recomendados' },
                      { id: 'price_asc', label: 'Menor Precio' },
                      { id: 'price_desc', label: 'Mayor Precio' },
                      { id: 'name_asc', label: 'Alfabético (A-Z)' }
                    ].map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border text-center ${
                          sortBy === option.id 
                            ? 'bg-[#FF1E27] text-white border-[#FF1E27] shadow-lg shadow-[#FF1E27]/20' 
                            : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BRANDS */}
                {availableBrands.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Marcas Oficiales</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedBrand('todas')}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                          selectedBrand === 'todas'
                            ? 'bg-white/10 text-white border-white/20'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        Todas
                      </button>
                      {availableBrands.map(brand => (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                            selectedBrand === brand
                              ? 'bg-white/10 text-white border-white/20'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* KEYWORDS */}
                {availableKeywords.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Etiquetas Rápidas</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedKeyword('todas')}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                          selectedKeyword === 'todas'
                            ? 'bg-white/10 text-white border-white/20'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        #Todo
                      </button>
                      {availableKeywords.map(kw => (
                        <button
                          key={kw}
                          onClick={() => setSelectedKeyword(kw)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                            selectedKeyword === kw
                              ? 'bg-white/10 text-white border-white/20'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          #{kw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/5 bg-[#0F0F13] rounded-b-[2rem] flex gap-4">
                <button
                  onClick={() => {
                    setSortBy('recommended');
                    setSelectedBrand('todas');
                    setSelectedKeyword('todas');
                  }}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/10 transition-colors"
                >
                  Limpiar Filtros
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-4 bg-[#FF1E27] hover:bg-[#E61922] text-white rounded-xl font-black border border-[#FF1E27] shadow-[0_0_20px_rgba(255,30,39,0.3)] transition-all"
                >
                  Ver {filteredProducts.length} Productos
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />

      <CartModal 
        empresaId={empresa.id} 
        empresaName={empresa.name} 
        empresaPhone={empresa.phone || '5493814751620'} 
        onOrderPlaced={(id) => {
          setActiveOrderId(id);
          setIsTrackerOpen(true); // Open it immediately to surprise the user
        }}
      />

      <OrderTrackerModal 
        orderId={activeOrderId}
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        onClearActiveOrder={() => {
          localStorage.removeItem(`activeOrder_${empresa.id}`);
          setActiveOrderId(null);
        }}
      />

      {/* FOOTER - ADMIN QUICK ACCESS */}
      <footer className="py-12 text-center border-t border-slate-900/80 mt-16 bg-[#09090E]">
        <a
          href={`/admin/${empresaSlug || 'titanfuel'}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-[#FF1E27]/20 border border-slate-800 hover:border-[#FF1E27]/50 text-xs font-bold text-slate-400 hover:text-white transition-all shadow-md"
        >
          <span>🔒 Acceso Administración y POS</span>
        </a>
      </footer>
    </div>
  );
}
