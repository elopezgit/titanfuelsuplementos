import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { formatPrice } from '../../utils/formatPrice';
import { Zap, Save, AlertTriangle, ArrowRight, XCircle, CheckCircle2, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost?: number; // Nueva columna
  category_id: string;
  is_active: boolean;
  image_url?: string;
  code?: string;
  price_half?: number | null;
}

interface Category {
  id: string;
  name: string;
}

interface ParsedItem {
  name: string;
  cost: number;
  brand: string;
}

interface SyncResult {
  news: Product[];
  updates: { old: Product; new: Product }[];
  same: Product[];
  deactivations: Product[];
}

export default function SmartSyncPanel({ 
  empresaId, 
  products, 
  categories, 
  onUpdate, 
  onCancel 
}: { 
  empresaId: string; 
  products: Product[]; 
  categories: Category[];
  onUpdate: () => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState<'input' | 'preview'>('input');
  const [rawText, setRawText] = useState('');
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();

  // --------------------------------------------------------------------------
  // STEP 1: PARSE TEXT & GENERATE CRUD
  // --------------------------------------------------------------------------
  const handleAnalyze = () => {
    if (!rawText.trim()) return alert('Pega el texto del proveedor primero.');

    const lines = rawText.trim().split('\n');
    const items = lines.map(line => {
      const parts = line.includes('\t') ? line.split('\t') : line.split(/\s{2,}/);
      const name = parts[0]?.trim() || '';
      
      const numberMatches = parts.slice(1).join(' ').match(/\d+[\.,]?\d*/g);
      let cost = 0;
      if (numberMatches && numberMatches.length > 0) {
        const numbers = numberMatches.map(n => parseFloat(n.replace(',', '.')));
        cost = Math.min(...numbers);
      }
      return { name, cost, brand: '' };
    }).filter(item => item.name && item.cost > 0);

    if (items.length === 0) {
      return alert('No se encontraron productos válidos con precio. Revisa el formato.');
    }

    const dbMap = new Map<string, Product>();
    products.forEach(p => dbMap.set(normalize(p.name), p));
    
    const parsedNamesNormalized = new Set<string>();
    const defaultCategoryId = categories.length > 0 ? categories[0].id : '';

    const results: SyncResult = { news: [], updates: [], same: [], deactivations: [] };

    items.forEach(item => {
      const normName = normalize(item.name);
      parsedNamesNormalized.add(normName);
      
      if (dbMap.has(normName)) {
        const oldProduct = dbMap.get(normName)!;
        // Solo verificamos si cambió el COSTO o si estaba inactivo
        const currentCost = oldProduct.cost || 0;
        if (currentCost !== item.cost || !oldProduct.is_active) {
            results.updates.push({
               old: oldProduct,
               new: { ...oldProduct, cost: item.cost, is_active: true }
            });
        } else {
            results.same.push(oldProduct);
        }
      } else {
        // Nuevo producto, el precio de venta arranca en 0 (requiere ir al manejador de precios luego)
        results.news.push({
           id: crypto.randomUUID(),
           name: item.name,
           description: '',
           price: 0, 
           cost: item.cost,
           category_id: defaultCategoryId,
           is_active: false // Se guarda inactivo para que no se publique sin precio
        } as Product);
      }
    });

    products.forEach(p => {
       const normName = normalize(p.name);
       if (!parsedNamesNormalized.has(normName) && p.is_active) {
           results.deactivations.push({ ...p, is_active: false });
       }
    });

    setSyncResult(results);
    setStep('preview');
  };

  // --------------------------------------------------------------------------
  // STEP 2: APPLY TO DB
  // --------------------------------------------------------------------------
  const handleApplySync = async () => {
    if (!syncResult) return;
    if (!window.confirm('¿Confirmas aplicar estos costos en la base de datos? (Los precios de venta no se verán afectados aún)')) return;
    
    setIsProcessing(true);
    try {
      const payload = [
        ...syncResult.news,
        ...syncResult.updates.map(u => u.new),
        ...syncResult.deactivations
      ].map(p => ({
          id: p.id,
          empresa_id: empresaId,
          name: p.name,
          description: p.description || '',
          price: p.price, // Mantenemos el precio público intacto
          cost: p.cost || 0, // Volcamos el costo
          category_id: p.category_id,
          is_active: p.is_active,
          image_url: p.image_url || null,
          code: p.code || null
      }));

      const batchSize = 100;
      for (let i = 0; i < payload.length; i += batchSize) {
        const batch = payload.slice(i, i + batchSize);
        const { error } = await supabase.from('products').upsert(batch);
        if (error) throw error;
      }
      
      alert('¡Vuelco de Costos Exitoso! Ahora ve a Edición Masiva (Manejador de Precios) para aplicar tus reglas.');
      onUpdate();
    } catch (e: any) {
      console.error(e);
      alert('Error sincronizando: ' + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#09090E] min-h-screen text-slate-300 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 md:gap-3">
              <Zap className="text-[#FF1E27]" size={28} /> Vuelco de Costos (Smart Sync)
            </h1>
            <p className="text-slate-400 mt-2 text-sm max-w-2xl">
              {step === 'input' && "Paso 1: Pega tu listado para volcar los Costos Base (no afectará el Precio de Venta aún)."}
              {step === 'preview' && "Paso 2: Verifica los cambios en los costos antes de guardarlos."}
            </p>
          </div>
          {step === 'input' && (
            <button onClick={onCancel} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-bold text-sm">
              Cerrar
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: INPUT */}
          {step === 'input' && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#14141A] border border-white/5 rounded-2xl p-6 shadow-xl">
              <label className="block text-sm font-bold text-white mb-3">Pega el texto aquí (Nombre, Tab/Espacios, Precios)</label>
              <textarea
                className="w-full h-[50vh] bg-[#09090E] border border-white/10 rounded-xl p-4 text-slate-300 font-mono text-xs focus:ring-1 focus:ring-[#FF1E27] focus:border-[#FF1E27] outline-none hide-scrollbar"
                placeholder="Ejemplo:&#10;CARNIVOR X 1,85LBS - MUSCLEMEDS        80000.00&#10;CITRATO DE MAGNESIO 300GR - GENERATION FIT        14400.00    13000.00"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
              />
              <div className="mt-6 flex justify-end">
                <button onClick={handleAnalyze} className="px-6 py-3 bg-[#FF1E27] hover:bg-[#E61922] text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#FF1E27]/20 transition-all">
                  Siguiente: Ver Análisis <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CRUD PREVIEW */}
          {step === 'preview' && syncResult && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#14141A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-green-500" size={24} />
                    <h3 className="font-bold text-white text-sm">Nuevos</h3>
                  </div>
                  <p className="text-4xl font-black text-white">{syncResult.news.length}</p>
                </div>

                <div className="bg-[#14141A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <ArrowUpRight className="text-yellow-500" size={24} />
                    <h3 className="font-bold text-white text-sm">Actualizados</h3>
                  </div>
                  <p className="text-4xl font-black text-white">{syncResult.updates.length}</p>
                </div>

                <div className="bg-[#14141A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="text-red-500" size={24} />
                    <h3 className="font-bold text-white text-sm">Bajas</h3>
                  </div>
                  <p className="text-4xl font-black text-white">{syncResult.deactivations.length}</p>
                </div>

                <div className="bg-[#14141A] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-slate-500" size={24} />
                    <h3 className="font-bold text-white text-sm">Sin Cambios</h3>
                  </div>
                  <p className="text-4xl font-black text-white">{syncResult.same.length}</p>
                </div>
              </div>

              {/* CRUD Tables Summary */}
              <div className="bg-[#14141A] border border-white/5 rounded-2xl p-6 max-h-[400px] overflow-y-auto hide-scrollbar space-y-6">
                  {syncResult.updates.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Variación de Costos ({syncResult.updates.length})</h4>
                      <div className="space-y-2">
                        {syncResult.updates.slice(0, 50).map((u, i) => (
                          <div key={i} className="flex flex-col md:flex-row justify-between md:items-center bg-white/5 px-4 py-2 rounded-lg text-sm gap-2">
                            <span className="text-slate-300 truncate pr-4">{u.new.name}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-slate-500 line-through text-xs">{formatPrice(u.old.cost || 0)}</span>
                              <ArrowRight size={14} className="text-slate-600" />
                              <span className="font-bold text-yellow-500">{formatPrice(u.new.cost || 0)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {syncResult.news.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-green-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Productos Nuevos ({syncResult.news.length})</h4>
                      <div className="space-y-2">
                        {syncResult.news.slice(0, 50).map((p, i) => (
                          <div key={i} className="flex flex-col md:flex-row justify-between md:items-center bg-white/5 px-4 py-2 rounded-lg text-sm gap-2">
                            <span className="text-slate-300 truncate pr-4">{p.name}</span>
                            <span className="font-bold text-green-500">Costo: {formatPrice(p.cost || 0)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {syncResult.deactivations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Productos a Dar de Baja ({syncResult.deactivations.length})</h4>
                      <div className="space-y-2">
                        {syncResult.deactivations.slice(0, 50).map((p, i) => (
                          <div key={i} className="flex flex-col md:flex-row justify-between md:items-center bg-white/5 px-4 py-2 rounded-lg text-sm gap-2 opacity-50">
                            <span className="text-slate-400 truncate pr-4 line-through">{p.name}</span>
                            <span className="font-bold text-red-500">SE OCULTARÁ</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1A1A22] p-4 rounded-2xl border border-[#FF1E27]/20 gap-4">
                <div className="flex items-start md:items-center gap-3">
                  <AlertTriangle className="text-yellow-500 shrink-0" size={24} />
                  <div className="text-sm text-slate-300">
                    <span className="font-bold text-white block">Aclaración de Precios</span>
                    Esto solo actualizará tu columna de Costos. Tus precios de venta actuales no se alterarán hasta que vayas al Manejador de Precios.
                  </div>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                  <button onClick={() => setStep('input')} disabled={isProcessing} className="flex-1 md:flex-none px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all disabled:opacity-50 text-sm md:text-base text-center">
                    Atrás
                  </button>
                  <button onClick={handleApplySync} disabled={isProcessing} className="flex-1 md:flex-none px-6 py-3 bg-[#FF1E27] hover:bg-[#E61922] text-white rounded-xl font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,30,39,0.3)] transition-all disabled:opacity-50 text-sm md:text-base">
                    {isProcessing ? 'Sincronizando...' : <><Save size={18} /> Confirmar Costos</>}
                  </button>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
