import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { BrandLogo } from '../../utils/brandLogos';
import { formatPrice } from '../../utils/formatPrice';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, notes: string) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setNotes('');
    }
  }, [isOpen, product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, notes);
    onClose();
  };

  const getPlaceholder = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('prote') || n.includes('whey')) return 'Ej: Sabor vainilla, mezclar con agua...';
    if (n.includes('creatina')) return 'Ej: Micronizada, sin sabor...';
    if (n.includes('pre') || n.includes('entreno')) return 'Ej: Sin cafeína, dosis recomendada...';
    return 'Ej: Aclaraciones especiales...';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-[#13131F] text-white rounded-t-3xl overflow-hidden flex flex-col max-h-[90vh] md:max-w-md md:mx-auto md:bottom-4 md:rounded-3xl shadow-2xl border border-red-500/30"
          >
            <div className="relative h-64 bg-black shrink-0">
              <img 
                src={product.image_url || `https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80`} 
                alt={product.name}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13131F] via-black/30 to-transparent"></div>
              
              {/* Brand Official Overlay Seal */}
              <div className="absolute bottom-4 left-6 z-10 flex flex-col items-start gap-1">
                <BrandLogo 
                  brand={(() => {
                    const match = product.name.match(/^\[(.*?)\]/);
                    return match ? match[1].trim() : 'TITAN FUEL';
                  })()} 
                  size="lg" 
                />
                <div className="text-[11px] font-extrabold text-[#FF5C00] uppercase tracking-widest pl-1 drop-shadow-md">
                  ★ 100% ORIGINAL & GARANTIZADO
                </div>
              </div>

              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 bg-black/70 text-white rounded-full border border-white/20 backdrop-blur-md hover:bg-[#FF1E27] transition-colors z-20"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar p-6 bg-[#13131F]">
              <h2 className="text-2xl font-black text-white mb-2 leading-tight">
                {product.name.replace(/^\[.*?\]\s*/, '').trim()}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                {(product.description || '')
                  .replace(/Lisa Mayorista \/ Suplementos AR\.?/gi, 'TITAN FUEL SUPLEMENTOS')
                  .replace(/Suplementos AR\.?/gi, 'TITAN FUEL SUPLEMENTOS') ||
                  'Producto de alta pureza y calidad garantizada en la línea oficial de TITAN FUEL SUPLEMENTOS.'}
              </p>

              <div className="mb-4">
                <label className="block text-xs font-black uppercase tracking-wider text-[#FF1E27] mb-2">Instrucciones Especiales</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={getPlaceholder(product.name)}
                  className="w-full bg-[#181824] border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-[#FF1E27]/30 focus:border-[#FF1E27] outline-none transition-all resize-none h-20 placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-[#13131F] shrink-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 bg-[#181824] rounded-2xl p-1.5 border border-slate-700/80">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-[#242436] rounded-xl shadow-sm text-white active:scale-95 transition-transform"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-black w-6 text-center text-white text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#FF1E27] to-[#FF5C00] rounded-xl shadow-sm text-white active:scale-95 transition-transform"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="text-2xl font-black text-white">
                  ${formatPrice(product.price * quantity)}
                </div>
              </div>

              <button 
                onClick={handleAdd}
                className="w-full bg-gradient-to-r from-[#FF1E27] via-[#DC2626] to-[#FF5C00] hover:brightness-110 text-white py-4 rounded-2xl font-black uppercase tracking-wide text-lg shadow-[0_5px_25px_rgba(255,30,39,0.45)] transition-all active:scale-[0.98]"
              >
                ⚡ Agregar al pedido
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
