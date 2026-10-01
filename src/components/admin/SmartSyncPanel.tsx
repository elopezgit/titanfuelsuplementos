import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { formatPrice, roundUpPrice } from '../../utils/formatPrice';
import { getProductBrand, getAvailableBrands } from '../../utils/brandUtils';
import { 
  Zap, Save, AlertTriangle, ArrowRight, XCircle, CheckCircle2, 
  ArrowUpRight, ArrowLeft, Settings2, Plus, Trash2, ShieldCheck, 
  Search, SlidersHorizontal, Sparkles, HelpCircle, RefreshCw, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost?: number;
  category_id: string;
  is_active: boolean;
  image_url?: string;
  code?: string;
  price_half?: number | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface PricingRule {
  id: string;
  name: string;
  enabled: boolean;
  matchType: 'all' | 'cost_under' | 'cost_over_equal' | 'cost_range' | 'brand' | 'category';
  costThreshold?: number;
  costMin?: number;
  costMax?: number;
  brand?: string;
  categoryId?: string;
  actionType: 'add_fixed' | 'add_percent' | 'multiplier';
  actionValue: number;
}

interface ParsedItem {
  name: string;
  cost: number;
  brand: string;
}

interface ProcessedProductItem {
  id: string;
  name: string;
  brand: string;
  oldCost: number;
  newCost: number;
  costDiff: number;
  oldPrice: number;
  newPrice: number;
  priceDiff: number;
  margin: number;
  marginPercent: number;
  matchedRuleName: string;
  category_id: string;
  is_active: boolean;
  image_url?: string;
  description?: string;
  code?: string;
  status: 'new' | 'updated' | 'same' | 'deactivated';
  hasImage: boolean;
  hasDescription: boolean;
}

interface SyncAnalysis {
  items: ProcessedProductItem[];
  newsCount: number;
  updatesCount: number;
  sameCount: number;
  deactivationsCount: number;
  totalItems: number;
}

const DEFAULT_RULES: PricingRule[] = [
  {
    id: 'rule-under-20k',
    name: 'Costo < $20.000: Sumar $14.000 fijo',
    enabled: true,
    matchType: 'cost_under',
    costThreshold: 20000,
    actionType: 'add_fixed',
    actionValue: 14000
  },
  {
    id: 'rule-over-20k',
    name: 'Costo ≥ $20.000: Margen +50%',
    enabled: true,
    matchType: 'cost_over_equal',
    costThreshold: 20000,
    actionType: 'add_percent',
    actionValue: 50
  }
];

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
  const [step, setStep] = useState<'input' | 'rules' | 'preview'>('input');
  const [rawText, setRawText] = useState('');
  const [rules, setRules] = useState<PricingRule[]>(() => {
    const saved = localStorage.getItem(`titan_pricing_rules_${empresaId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_RULES;
      }
    }
    return DEFAULT_RULES;
  });
  
  const [activateNewProducts, setActivateNewProducts] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<SyncAnalysis | null>(null);
  const [rulesSavedNotice, setRulesSavedNotice] = useState(false);

  // Preview filtering and search
  const [previewTab, setPreviewTab] = useState<'all' | 'updated' | 'news' | 'deactivations' | 'same'>('all');
  const [previewSearch, setPreviewSearch] = useState('');
  const [previewBrand, setPreviewBrand] = useState('todas');

  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
  const availableBrands = getAvailableBrands(products);

  // --------------------------------------------------------------------------
  // PRICING CALCULATION ENGINE
  // --------------------------------------------------------------------------
  const calculateNewPrice = (
    cost: number, 
    brand: string, 
    categoryId: string, 
    existingPrice: number
  ): { price: number; ruleName: string } => {
    if (cost <= 0) {
      return { price: existingPrice || 0, ruleName: 'Sin Costo / Sin Regla' };
    }

    const activeRules = rules.filter(r => r.enabled);

    // 1. Try brand-specific or category-specific rules first
    for (const rule of activeRules) {
      if (rule.matchType === 'brand' && rule.brand && brand.toLowerCase() === rule.brand.toLowerCase()) {
        return { price: applyRuleAction(cost, rule), ruleName: rule.name || `Marca: ${rule.brand}` };
      }
      if (rule.matchType === 'category' && rule.categoryId && categoryId === rule.categoryId) {
        return { price: applyRuleAction(cost, rule), ruleName: rule.name || `Categoría` };
      }
    }

    // 2. Try threshold & range rules
    for (const rule of activeRules) {
      if (rule.matchType === 'cost_under' && rule.costThreshold !== undefined) {
        if (cost < rule.costThreshold) {
          return { price: applyRuleAction(cost, rule), ruleName: rule.name };
        }
      }
      if (rule.matchType === 'cost_over_equal' && rule.costThreshold !== undefined) {
        if (cost >= rule.costThreshold) {
          return { price: applyRuleAction(cost, rule), ruleName: rule.name };
        }
      }
      if (rule.matchType === 'cost_range' && rule.costMin !== undefined && rule.costMax !== undefined) {
        if (cost >= rule.costMin && cost <= rule.costMax) {
          return { price: applyRuleAction(cost, rule), ruleName: rule.name };
        }
      }
      if (rule.matchType === 'all') {
        return { price: applyRuleAction(cost, rule), ruleName: rule.name };
      }
    }

    // 3. Fallback if no rules matched
    return { 
      price: roundUpPrice(cost * 1.5), 
      ruleName: 'Margen Estándar (+50%)' 
    };
  };

  const applyRuleAction = (cost: number, rule: PricingRule): number => {
    let raw = cost;
    if (rule.actionType === 'add_fixed') {
      raw = cost + Number(rule.actionValue);
    } else if (rule.actionType === 'add_percent') {
      raw = cost + (cost * Number(rule.actionValue) / 100);
    } else if (rule.actionType === 'multiplier') {
      raw = cost * Number(rule.actionValue);
    }
    return roundUpPrice(raw);
  };

  // --------------------------------------------------------------------------
  // STEP 1 -> STEP 2 / STEP 3: ANALYZE RAW LIST
  // --------------------------------------------------------------------------
  const parseRawText = (): ParsedItem[] => {
    if (!rawText.trim()) return [];
    const lines = rawText.trim().split('\n');
    return lines.map(line => {
      const parts = line.includes('\t') ? line.split('\t') : line.split(/\s{2,}/);
      const name = parts[0]?.trim() || '';
      
      const numberMatches = parts.slice(1).join(' ').match(/\d+[\.,]?\d*/g);
      let cost = 0;
      if (numberMatches && numberMatches.length > 0) {
        const numbers = numberMatches.map(n => parseFloat(n.replace(',', '.')));
        cost = Math.min(...numbers);
      }
      return { name, cost, brand: getProductBrand({ name }) };
    }).filter(item => item.name && item.cost > 0);
  };

  const runAnalysis = () => {
    const items = parseRawText();
    if (items.length === 0) {
      alert('No se encontraron productos válidos con precio. Revisa el texto pegado.');
      return;
    }

    const dbMap = new Map<string, Product>();
    products.forEach(p => dbMap.set(normalize(p.name), p));

    const parsedNamesNormalized = new Set<string>();
    const defaultCategoryId = categories.length > 0 ? categories[0].id : '';

    const processedList: ProcessedProductItem[] = [];

    items.forEach(item => {
      const normName = normalize(item.name);
      parsedNamesNormalized.add(normName);

      if (dbMap.has(normName)) {
        const old = dbMap.get(normName)!;
        const brand = getProductBrand(old);
        const oldCost = old.cost || 0;
        const newCost = item.cost;
        const costDiff = newCost - oldCost;
        
        // Calculate new sale price using active rules
        const { price: newPrice, ruleName } = calculateNewPrice(newCost, brand, old.category_id, old.price);
        const oldPrice = old.price || 0;
        const priceDiff = newPrice - oldPrice;
        const margin = newPrice - newCost;
        const marginPercent = newCost > 0 ? Math.round((margin / newCost) * 100) : 0;

        const isCostChanged = oldCost !== newCost;
        const isPriceChanged = oldPrice !== newPrice;
        const wasInactive = !old.is_active;

        const status: ProcessedProductItem['status'] = (isCostChanged || isPriceChanged || wasInactive) ? 'updated' : 'same';

        processedList.push({
          id: old.id,
          name: old.name,
          brand,
          oldCost,
          newCost,
          costDiff,
          oldPrice,
          newPrice,
          priceDiff,
          margin,
          marginPercent,
          matchedRuleName: ruleName,
          category_id: old.category_id,
          is_active: true,
          image_url: old.image_url,
          description: old.description,
          code: old.code,
          status,
          hasImage: !!old.image_url && old.image_url.trim().length > 0,
          hasDescription: !!old.description && old.description.trim().length > 0
        });
      } else {
        // New Product
        const brand = getProductBrand(item);
        const newCost = item.cost;
        const { price: newPrice, ruleName } = calculateNewPrice(newCost, brand, defaultCategoryId, 0);
        const margin = newPrice - newCost;
        const marginPercent = newCost > 0 ? Math.round((margin / newCost) * 100) : 0;

        processedList.push({
          id: crypto.randomUUID(),
          name: item.name,
          brand,
          oldCost: 0,
          newCost,
          costDiff: newCost,
          oldPrice: 0,
          newPrice,
          priceDiff: newPrice,
          margin,
          marginPercent,
          matchedRuleName: ruleName,
          category_id: defaultCategoryId,
          is_active: activateNewProducts,
          image_url: undefined,
          description: '',
          code: '',
          status: 'new',
          hasImage: false,
          hasDescription: false
        });
      }
    });

    // Handle products not present in current vuelco (deactivations)
    products.forEach(p => {
      const normName = normalize(p.name);
      if (!parsedNamesNormalized.has(normName) && p.is_active) {
        processedList.push({
          id: p.id,
          name: p.name,
          brand: getProductBrand(p),
          oldCost: p.cost || 0,
          newCost: p.cost || 0,
          costDiff: 0,
          oldPrice: p.price || 0,
          newPrice: p.price || 0,
          priceDiff: 0,
          margin: (p.price || 0) - (p.cost || 0),
          marginPercent: (p.cost || 0) > 0 ? Math.round((((p.price || 0) - (p.cost || 0)) / (p.cost || 1)) * 100) : 0,
          matchedRuleName: 'No presente en lista',
          category_id: p.category_id,
          is_active: false,
          image_url: p.image_url,
          description: p.description,
          code: p.code,
          status: 'deactivated',
          hasImage: !!p.image_url && p.image_url.trim().length > 0,
          hasDescription: !!p.description && p.description.trim().length > 0
        });
      }
    });

    const newsCount = processedList.filter(i => i.status === 'new').length;
    const updatesCount = processedList.filter(i => i.status === 'updated').length;
    const sameCount = processedList.filter(i => i.status === 'same').length;
    const deactivationsCount = processedList.filter(i => i.status === 'deactivated').length;

    setAnalysis({
      items: processedList,
      newsCount,
      updatesCount,
      sameCount,
      deactivationsCount,
      totalItems: processedList.length
    });
  };

  const handleGoToRules = () => {
    const items = parseRawText();
    if (items.length === 0) {
      alert('Pega el texto del proveedor primero.');
      return;
    }
    setStep('rules');
  };

  const handleSimulatePreview = () => {
    runAnalysis();
    setStep('preview');
  };

  // --------------------------------------------------------------------------
  // RULES MANAGEMENT
  // --------------------------------------------------------------------------
  const handleSaveDefaultRules = () => {
    localStorage.setItem(`titan_pricing_rules_${empresaId}`, JSON.stringify(rules));
    setRulesSavedNotice(true);
    setTimeout(() => setRulesSavedNotice(false), 3000);
  };

  const handleResetDefaultRules = () => {
    if (confirm('¿Restablecer a las reglas por defecto del sistema?')) {
      setRules(DEFAULT_RULES);
      localStorage.removeItem(`titan_pricing_rules_${empresaId}`);
    }
  };

  const handleAddRule = () => {
    const newRule: PricingRule = {
      id: `rule-${Date.now()}`,
      name: 'Nueva Regla de Margen',
      enabled: true,
      matchType: 'cost_under',
      costThreshold: 30000,
      actionType: 'add_percent',
      actionValue: 40
    };
    setRules([...rules, newRule]);
  };

  const handleToggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleUpdateRule = (id: string, updates: Partial<PricingRule>) => {
    setRules(rules.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  // --------------------------------------------------------------------------
  // STEP 3: APPLY TO DB WITH PRESERVATION GUARANTEE
  // --------------------------------------------------------------------------
  const handleApplySync = async () => {
    if (!analysis) return;
    
    const confirmMessage = `¿Confirmas aplicar el vuelco de ${analysis.items.length} productos?\n\n` +
      `✓ Se actualizarán costos y precios de venta al público calculados.\n` +
      `✓ Se protegerán al 100% las fotos y descripciones ya existentes.\n` +
      `✓ ${analysis.newsCount} Nuevos | ${analysis.updatesCount} Actualizados | ${analysis.deactivationsCount} Bajas.`;

    if (!window.confirm(confirmMessage)) return;

    setIsProcessing(true);
    try {
      // Map all items preserving image_url, description, category_id, code
      const payload = analysis.items.map(item => ({
        id: item.id,
        empresa_id: empresaId,
        name: item.name,
        description: item.description || '',
        price: item.newPrice,
        cost: item.newCost,
        category_id: item.category_id || null,
        is_active: item.is_active,
        image_url: item.image_url || null,
        code: item.code || null
      }));

      const batchSize = 100;
      for (let i = 0; i < payload.length; i += batchSize) {
        const batch = payload.slice(i, i + batchSize);
        const { error } = await supabase.from('products').upsert(batch);
        if (error) throw error;
      }

      // Persist the rules used
      localStorage.setItem(`titan_pricing_rules_${empresaId}`, JSON.stringify(rules));

      alert('¡Vuelco y actualización de precios completada con éxito!\nLas imágenes y descripciones fueron preservadas intactas.');
      onUpdate();
    } catch (e: any) {
      console.error(e);
      alert('Error sincronizando con la base de datos: ' + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Filtered preview items
  const filteredPreviewItems = (analysis?.items || []).filter(item => {
    const matchesTab = 
      previewTab === 'all' ? true :
      previewTab === 'updated' ? item.status === 'updated' :
      previewTab === 'news' ? item.status === 'new' :
      previewTab === 'deactivations' ? item.status === 'deactivated' :
      previewTab === 'same' ? item.status === 'same' : true;

    const matchesSearch = previewSearch 
      ? item.name.toLowerCase().includes(previewSearch.toLowerCase()) || item.brand.toLowerCase().includes(previewSearch.toLowerCase())
      : true;

    const matchesBrand = previewBrand === 'todas' ? true : item.brand === previewBrand;

    return matchesTab && matchesSearch && matchesBrand;
  });

  return (
    <div className="bg-[#09090E] min-h-screen text-slate-300 p-3 md:p-6 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP NAVIGATION & STEPPER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#FF1E27]/20 text-[#FF1E27] border border-[#FF1E27]/30 flex items-center gap-1">
                <Sparkles size={12} /> Motor de Precios Inteligente
              </span>
              <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                <ShieldCheck size={12} /> Protección de Fotos & Descripciones
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <Zap className="text-[#FF1E27]" size={28} /> Vuelco de Catálogo & Precios
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-[#14141A] p-1.5 rounded-xl border border-white/5 text-xs font-bold">
            <button 
              onClick={() => setStep('input')} 
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${step === 'input' ? 'bg-[#FF1E27] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              1. Carga Listado
            </button>
            <ArrowRight size={12} className="text-slate-600" />
            <button 
              onClick={() => {
                if (rawText.trim()) setStep('rules');
                else alert('Pega el listado primero.');
              }} 
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${step === 'rules' ? 'bg-[#FF1E27] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              2. Reglas de Margen
            </button>
            <ArrowRight size={12} className="text-slate-600" />
            <button 
              onClick={() => {
                if (rawText.trim()) handleSimulatePreview();
                else alert('Pega el listado primero.');
              }} 
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${step === 'preview' ? 'bg-[#FF1E27] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              3. Vista Previa & Impacto
            </button>
            <button 
              onClick={onCancel}
              className="ml-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* =================================================================== */}
          {/* PASO 1: ENTRADA DE TEXTO / LISTADO */}
          {/* =================================================================== */}
          {step === 'input' && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }} 
              className="space-y-6"
            >
              <div className="bg-[#14141A] border border-white/5 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      Pega aquí la lista de productos y costos del proveedor
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      El sistema detecta automáticamente el nombre y el costo base. No afectará descripciones ni fotos existentes.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-[#09090E] px-3 py-1.5 rounded-lg border border-white/5">
                    Líneas detectadas: <strong className="text-white">{rawText ? rawText.trim().split('\n').filter(l => l.trim()).length : 0}</strong>
                  </span>
                </div>

                <textarea
                  className="w-full h-[45vh] bg-[#09090E] border border-white/10 rounded-xl p-4 text-slate-200 font-mono text-xs focus:ring-1 focus:ring-[#FF1E27] focus:border-[#FF1E27] outline-none hide-scrollbar placeholder-slate-600"
                  placeholder="Ejemplo:&#10;CREATINA MICRONIZADA 300G - ENA SPORT        24500.00&#10;WHEY PROTEIN 1KG - STAR NUTRITION           32000.00    29900.00&#10;SHAKER TITAN 700ML                         5400.00"
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                />

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>Los productos que ya tengan imagen o descripción configurada <strong>no perderán sus datos</strong>.</span>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={handleGoToRules}
                      disabled={!rawText.trim()}
                      className="w-full md:w-auto px-6 py-3 bg-[#FF1E27] hover:bg-[#E61922] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF1E27]/20 transition-all disabled:opacity-40"
                    >
                      Paso 2: Configurar Reglas de Precios <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =================================================================== */}
          {/* PASO 2: MOTOR DE REGLAS DE NEGOCIO Y PRECIOS */}
          {/* =================================================================== */}
          {step === 'rules' && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              {/* Rules Header Card */}
              <div className="bg-[#14141A] border border-white/5 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white flex items-center gap-2">
                      <Settings2 className="text-[#FF1E27]" size={24} /> Reglas de Margen y Precios
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                      Configura qué margen o suma se aplicará sobre el costo base para determinar el <strong>Precio de Venta al Público</strong> antes de impactar el vuelco. Puedes activar, desactivar o modificar cualquier regla.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {rulesSavedNotice && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1 animate-pulse">
                        <CheckCircle2 size={14} /> ¡Reglas Guardadas!
                      </span>
                    )}
                    <button 
                      onClick={handleSaveDefaultRules}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Save size={14} /> Guardar como Predeterminadas
                    </button>
                    <button 
                      onClick={handleResetDefaultRules}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw size={14} /> Restablecer
                    </button>
                    <button 
                      onClick={handleAddRule}
                      className="px-3 py-2 bg-[#FF1E27]/20 hover:bg-[#FF1E27]/30 text-[#FF1E27] border border-[#FF1E27]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus size={14} /> Nueva Regla
                    </button>
                  </div>
                </div>
              </div>

              {/* Rules List */}
              <div className="space-y-4">
                {rules.map((rule, index) => (
                  <div 
                    key={rule.id} 
                    className={`bg-[#14141A] border rounded-2xl p-5 transition-all ${rule.enabled ? 'border-white/10 shadow-lg' : 'border-white/5 opacity-50'}`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      
                      {/* Left: Switch & Name */}
                      <div className="flex items-center gap-4">
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input 
                            type="checkbox" 
                            checked={rule.enabled} 
                            onChange={() => handleToggleRule(rule.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF1E27]"></div>
                        </label>

                        <div>
                          <input 
                            type="text"
                            value={rule.name}
                            onChange={(e) => handleUpdateRule(rule.id, { name: e.target.value })}
                            className="bg-transparent font-bold text-white text-base focus:bg-black/30 px-2 py-1 rounded outline-none border-b border-transparent focus:border-[#FF1E27]"
                            placeholder="Nombre de la regla"
                          />
                          <span className="text-xs text-slate-500 block px-2">Regla #{index + 1}</span>
                        </div>
                      </div>

                      {/* Middle: Condition & Action Inputs */}
                      <div className="flex flex-wrap items-center gap-3 bg-[#09090E] p-3 rounded-xl border border-white/5 w-full md:w-auto">
                        
                        {/* Match Type */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-slate-400 font-semibold">Si:</span>
                          <select 
                            value={rule.matchType}
                            onChange={(e) => handleUpdateRule(rule.id, { matchType: e.target.value as any })}
                            className="bg-[#14141A] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-medium outline-none text-xs"
                          >
                            <option value="cost_under">Costo Menor que (&lt;)</option>
                            <option value="cost_over_equal">Costo Mayor o Igual (&ge;)</option>
                            <option value="cost_range">Costo en Rango ($ min - $ max)</option>
                            <option value="brand">Marca específica</option>
                            <option value="all">Todos los productos</option>
                          </select>
                        </div>

                        {/* Condition Values */}
                        {(rule.matchType === 'cost_under' || rule.matchType === 'cost_over_equal') && (
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-slate-400">$</span>
                            <input 
                              type="number"
                              value={rule.costThreshold || 0}
                              onChange={(e) => handleUpdateRule(rule.id, { costThreshold: Number(e.target.value) })}
                              className="w-24 bg-[#14141A] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none focus:border-[#FF1E27]"
                            />
                          </div>
                        )}

                        {rule.matchType === 'cost_range' && (
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-slate-400">Min $</span>
                            <input 
                              type="number"
                              value={rule.costMin || 0}
                              onChange={(e) => handleUpdateRule(rule.id, { costMin: Number(e.target.value) })}
                              className="w-20 bg-[#14141A] border border-white/10 rounded-lg px-2 py-1.5 text-white font-mono text-xs outline-none"
                            />
                            <span className="text-slate-400">Max $</span>
                            <input 
                              type="number"
                              value={rule.costMax || 0}
                              onChange={(e) => handleUpdateRule(rule.id, { costMax: Number(e.target.value) })}
                              className="w-20 bg-[#14141A] border border-white/10 rounded-lg px-2 py-1.5 text-white font-mono text-xs outline-none"
                            />
                          </div>
                        )}

                        {rule.matchType === 'brand' && (
                          <div className="flex items-center gap-1 text-xs">
                            <select 
                              value={rule.brand || ''}
                              onChange={(e) => handleUpdateRule(rule.id, { brand: e.target.value })}
                              className="bg-[#14141A] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-medium outline-none text-xs"
                            >
                              <option value="">Selecciona Marca</option>
                              {availableBrands.map(b => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        <span className="text-slate-500 font-bold">&rarr;</span>

                        {/* Action Type */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-slate-400 font-semibold">Aplicar:</span>
                          <select 
                            value={rule.actionType}
                            onChange={(e) => handleUpdateRule(rule.id, { actionType: e.target.value as any })}
                            className="bg-[#14141A] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-medium outline-none text-xs"
                          >
                            <option value="add_fixed">Sumar Fijo (+$)</option>
                            <option value="add_percent">Margen Porcentaje (+%)</option>
                            <option value="multiplier">Multiplicador (x)</option>
                          </select>
                        </div>

                        {/* Action Value */}
                        <div className="flex items-center gap-1 text-xs">
                          <input 
                            type="number"
                            value={rule.actionValue || 0}
                            onChange={(e) => handleUpdateRule(rule.id, { actionValue: Number(e.target.value) })}
                            className="w-24 bg-[#14141A] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none focus:border-[#FF1E27]"
                          />
                          <span className="text-slate-400 font-bold">
                            {rule.actionType === 'add_fixed' ? '$' : rule.actionType === 'add_percent' ? '%' : 'x'}
                          </span>
                        </div>

                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleDeleteRule(rule.id)}
                          className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                          title="Eliminar regla"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Options & Proceed Button */}
              <div className="bg-[#14141A] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={activateNewProducts} 
                      onChange={(e) => setActivateNewProducts(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                  <span className="text-xs text-slate-300 font-medium">
                    Activar productos nuevos automáticamente con el precio calculado
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => setStep('input')}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    &larr; Volver al Listado
                  </button>
                  <button 
                    onClick={handleSimulatePreview}
                    className="flex-1 md:flex-none px-6 py-3 bg-[#FF1E27] hover:bg-[#E61922] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF1E27]/20 transition-all text-sm"
                  >
                    Simular y Ver Vista Previa <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* =================================================================== */}
          {/* PASO 3: VISTA PREVIA DETALLADA & CONFIRMACIÓN DE IMPACTO */}
          {/* =================================================================== */}
          {step === 'preview' && analysis && (
            <motion.div 
              key="step3" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              className="space-y-6"
            >
              {/* Summary KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#14141A] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowUpRight className="text-yellow-400" size={18} />
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider">Actualizados</h3>
                  </div>
                  <p className="text-3xl font-black text-white">{analysis.updatesCount}</p>
                  <span className="text-[11px] text-yellow-400/80 font-medium">Costos y/o precios ajustados</span>
                </div>

                <div className="bg-[#14141A] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="text-emerald-400" size={18} />
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider">Nuevos</h3>
                  </div>
                  <p className="text-3xl font-black text-white">{analysis.newsCount}</p>
                  <span className="text-[11px] text-emerald-400/80 font-medium">Con precio calculado listo</span>
                </div>

                <div className="bg-[#14141A] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className="text-red-400" size={18} />
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider">Bajas / Sin Stock</h3>
                  </div>
                  <p className="text-3xl font-black text-white">{analysis.deactivationsCount}</p>
                  <span className="text-[11px] text-red-400/80 font-medium">Se ocultarán del catálogo</span>
                </div>

                <div className="bg-[#14141A] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="text-emerald-400" size={18} />
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider">Protección</h3>
                  </div>
                  <p className="text-3xl font-black text-emerald-400">100%</p>
                  <span className="text-[11px] text-slate-400 font-medium">Fotos & Descripciones intactas</span>
                </div>
              </div>

              {/* Table Toolbar (Tabs, Filters, Search) */}
              <div className="bg-[#14141A] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                {/* Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#09090E] p-1 rounded-xl border border-white/5 text-xs font-bold">
                  <button
                    onClick={() => setPreviewTab('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${previewTab === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Todos ({analysis.totalItems})
                  </button>
                  <button
                    onClick={() => setPreviewTab('updated')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${previewTab === 'updated' ? 'bg-yellow-500/20 text-yellow-300' : 'text-slate-400 hover:text-white'}`}
                  >
                    Actualizados ({analysis.updatesCount})
                  </button>
                  <button
                    onClick={() => setPreviewTab('news')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${previewTab === 'news' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'}`}
                  >
                    Nuevos ({analysis.newsCount})
                  </button>
                  <button
                    onClick={() => setPreviewTab('deactivations')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${previewTab === 'deactivations' ? 'bg-red-500/20 text-red-300' : 'text-slate-400 hover:text-white'}`}
                  >
                    Bajas ({analysis.deactivationsCount})
                  </button>
                  <button
                    onClick={() => setPreviewTab('same')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${previewTab === 'same' ? 'bg-slate-500/20 text-slate-300' : 'text-slate-400 hover:text-white'}`}
                  >
                    Sin Cambios ({analysis.sameCount})
                  </button>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 md:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input 
                      type="text"
                      placeholder="Buscar en vista previa..."
                      value={previewSearch}
                      onChange={(e) => setPreviewSearch(e.target.value)}
                      className="w-full bg-[#09090E] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-[#FF1E27]"
                    />
                  </div>

                  <select
                    value={previewBrand}
                    onChange={(e) => setPreviewBrand(e.target.value)}
                    className="bg-[#09090E] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                  >
                    <option value="todas">Todas las Marcas</option>
                    {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Main Interactive Table */}
              <div className="bg-[#14141A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="max-h-[500px] overflow-y-auto hide-scrollbar">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-[#09090E] sticky top-0 z-10 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-white/5">
                      <tr>
                        <th className="p-3">Foto & Estado</th>
                        <th className="p-3">Producto / Marca</th>
                        <th className="p-3">Costo Base</th>
                        <th className="p-3">Regla Aplicada</th>
                        <th className="p-3">Precio Venta (Público)</th>
                        <th className="p-3">Margen Ganancia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredPreviewItems.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500">
                            No hay productos que coincidan con los filtros seleccionados.
                          </td>
                        </tr>
                      ) : (
                        filteredPreviewItems.map((item) => (
                          <tr 
                            key={item.id} 
                            className={`hover:bg-white/[0.02] transition-colors ${item.status === 'deactivated' ? 'opacity-40' : ''}`}
                          >
                            {/* Photo & Preservation Status */}
                            <td className="p-3 shrink-0">
                              <div className="flex items-center gap-2">
                                {item.hasImage ? (
                                  <div className="relative group">
                                    <img 
                                      src={item.image_url} 
                                      alt={item.name} 
                                      className="w-9 h-9 rounded-lg object-cover border border-white/10 bg-black/40" 
                                    />
                                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-black text-[8px] font-black px-1 rounded-full flex items-center gap-0.5 shadow">
                                      ✓
                                    </span>
                                  </div>
                                ) : (
                                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-600 text-[10px] font-bold">
                                    {item.status === 'new' ? 'NUEVO' : 'S/FOTO'}
                                  </div>
                                )}
                                
                                {item.status === 'new' && (
                                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-black">
                                    NUEVO
                                  </span>
                                )}
                                {item.status === 'updated' && (
                                  <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded text-[10px] font-black">
                                    ACTUALIZAR
                                  </span>
                                )}
                                {item.status === 'deactivated' && (
                                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-black">
                                    BAJA
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Name & Brand */}
                            <td className="p-3 max-w-[280px]">
                              <span className="font-bold text-white block truncate">{item.name}</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                                  {item.brand}
                                </span>
                                {item.hasDescription && (
                                  <span className="text-[10px] text-slate-500 flex items-center gap-0.5" title="Descripción personalizada preservada">
                                    📝 Descrip. OK
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Cost */}
                            <td className="p-3 font-mono">
                              {item.status === 'new' ? (
                                <span className="font-bold text-white">{formatPrice(item.newCost)}</span>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-slate-500 line-through text-[11px]">{formatPrice(item.oldCost)}</span>
                                  <span className="text-slate-600">&rarr;</span>
                                  <span className={`font-bold ${item.costDiff > 0 ? 'text-yellow-400' : item.costDiff < 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                                    {formatPrice(item.newCost)}
                                  </span>
                                </div>
                              )}
                            </td>

                            {/* Matched Rule */}
                            <td className="p-3">
                              <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[11px] text-slate-300 font-medium inline-block max-w-[180px] truncate">
                                {item.matchedRuleName}
                              </span>
                            </td>

                            {/* Sale Price */}
                            <td className="p-3 font-mono">
                              {item.status === 'new' ? (
                                <span className="font-black text-emerald-400 text-sm">{formatPrice(item.newPrice)}</span>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-slate-500 line-through text-[11px]">{formatPrice(item.oldPrice)}</span>
                                  <span className="text-slate-600">&rarr;</span>
                                  <span className="font-black text-white text-sm bg-white/5 px-2 py-0.5 rounded border border-white/10">
                                    {formatPrice(item.newPrice)}
                                  </span>
                                </div>
                              )}
                            </td>

                            {/* Margin */}
                            <td className="p-3 font-mono">
                              <div className="flex flex-col">
                                <span className="font-bold text-emerald-400">+{formatPrice(item.margin)}</span>
                                <span className="text-[10px] text-slate-500">({item.marginPercent}% s/costo)</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Confirmation Bar */}
              <div className="bg-[#14141A] border border-[#FF1E27]/30 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl">
                <div className="flex items-start md:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <span className="font-black text-white text-sm block">Confirmación de Impacto Seguro</span>
                    <p className="text-xs text-slate-400">
                      Al confirmar, se guardarán los nuevos costos y se publicarán los precios recalculados. <strong>Tus 100 fotos y descripciones permanecerán 100% intactas.</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => setStep('rules')}
                    disabled={isProcessing}
                    className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    &larr; Ajustar Reglas
                  </button>
                  <button 
                    onClick={handleApplySync}
                    disabled={isProcessing}
                    className="flex-1 md:flex-none px-7 py-3 bg-[#FF1E27] hover:bg-[#E61922] text-white rounded-xl font-black flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,30,39,0.35)] transition-all disabled:opacity-50 text-sm"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" /> Impactando Catálogo...
                      </>
                    ) : (
                      <>
                        <Save size={18} /> Confirmar e Impactar Catálogo
                      </>
                    )}
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
