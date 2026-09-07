import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { roundUpPrice, formatPrice } from '../../utils/formatPrice';
import { getProductBrand, getAvailableBrands } from '../../utils/brandUtils';
import { Search, Filter, CheckSquare, Square, Save, AlertCircle, Calculator } from 'lucide-react';

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

export default function BulkEditor({ empresaId, products: initialProducts, categories, onUpdate }: { 
  empresaId: string, 
  products: Product[], 
  categories: Category[],
  onUpdate: () => void 
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('todas');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterCost, setFilterCost] = useState<'all' | 'under_20k' | 'over_20k'>('all');

  const availableBrands = getAvailableBrands(initialProducts);

  // Actions
  type ActionType = 'price_add_fixed' | 'price_sub_fixed' | 'price_add_percent' | 'price_sub_percent' | 'price_set_fixed' | 'price_rule_classic' | 'image' | 'category' | 'status';
  const [actionType, setActionType] = useState<ActionType>('price_rule_classic');
  const [actionValue, setActionValue] = useState('');
  const [actionValue2, setActionValue2] = useState(true); // Para estado boolean
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
    setSelectedIds(prev => {
      const newSet = new Set<string>();
      prev.forEach(id => {
        if (initialProducts.find(p => p.id === id)) newSet.add(id);
      });
      return newSet;
    });
  }, [initialProducts]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.code && p.code.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory ? p.category_id === filterCategory : true;
    const matchesBrand = filterBrand === 'todas' ? true : getProductBrand(p) === filterBrand;
    const matchesStatus = filterStatus === 'all' ? true : filterStatus === 'active' ? p.is_active : !p.is_active;
    
    let matchesCost = true;
    const c = p.cost || 0;
    if (filterCost === 'under_20k') matchesCost = c < 20000;
    if (filterCost === 'over_20k') matchesCost = c >= 20000;

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus && matchesCost;
  });

  const handleSelectAll = () => {
    if (selectedIds.size === filteredProducts.length && filteredProducts.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const applyBulkAction = async () => {
    if (selectedIds.size === 0) return alert('Selecciona al menos un producto.');
    
    // Validaciones
    if (actionType.startsWith('price_') && actionType !== 'price_rule_classic') {
        if (!actionValue || isNaN(Number(actionValue))) return alert('Ingresa un valor numérico válido.');
    }

    if (!window.confirm(`¿Estás seguro de aplicar esta acción a ${selectedIds.size} productos?`)) return;

    setIsApplying(true);
    const val = Number(actionValue);

    const selectedProducts = products.filter(p => selectedIds.has(p.id));
    const payload = selectedProducts.map(p => {
      let updatedProduct = { ...p };
      const baseCost = p.cost || 0; // Calculamos el precio en base al COSTO

      switch (actionType) {
        case 'price_rule_classic':
          if (baseCost < 20000) updatedProduct.price = roundUpPrice(baseCost + 3000);
          else updatedProduct.price = roundUpPrice(baseCost * 1.20);
          break;
        case 'price_add_fixed':
          updatedProduct.price = roundUpPrice(baseCost + val);
          break;
        case 'price_sub_fixed':
          updatedProduct.price = roundUpPrice(Math.max(0, baseCost - val));
          break;
        case 'price_add_percent':
          updatedProduct.price = roundUpPrice(baseCost + (baseCost * (val / 100)));
          break;
        case 'price_sub_percent':
          updatedProduct.price = roundUpPrice(Math.max(0, baseCost - (baseCost * (val / 100))));
          break;
        case 'price_set_fixed':
          updatedProduct.price = roundUpPrice(val);
          break;
        case 'image':
          updatedProduct.image_url = actionValue;
          break;
        case 'category':
          updatedProduct.category_id = actionValue || updatedProduct.category_id;
          break;
        case 'status':
          updatedProduct.is_active = actionValue2;
          break;
      }
      return updatedProduct;
    });

    try {
      const { error } = await supabase.from('products').upsert(
        payload.map(p => ({
          id: p.id,
          empresa_id: empresaId,
          name: p.name,
          description: p.description,
          price: p.price,
          cost: p.cost,
          price_half: p.price_half,
          category_id: p.category_id,
          is_active: p.is_active,
          image_url: p.image_url,
          code: p.code
        }))
      );

      if (error) throw error;
      
      alert('¡Actualización masiva de precios exitosa!');
      setSelectedIds(new Set());
      onUpdate();
    } catch (e: any) {
      console.error(e);
      alert('Error: ' + e.message);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
      
      {/* Panel Izquierdo: Selección y Filtros */}
      <div className="flex-1 flex flex-col border-r border-slate-200">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-3">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Filter size={18} /> Filtrar Catálogo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o cód..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#FF1E27]"
              />
            </div>
            <select 
              value={filterCategory} 
              onChange={e => setFilterCategory(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:border-[#FF1E27]"
            >
              <option value="">Todas las Categorías</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select 
              value={filterBrand} 
              onChange={e => setFilterBrand(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:border-[#FF1E27]"
            >
              <option value="todas">Todas las Marcas</option>
              {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select 
              value={filterCost} 
              onChange={e => setFilterCost(e.target.value as any)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:border-[#FF1E27]"
            >
              <option value="all">Todos los Costos</option>
              <option value="under_20k">Costo &lt; $20.000</option>
              <option value="over_20k">Costo &ge; $20.000</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value as any)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:border-[#FF1E27]"
            >
              <option value="all">Todos los Estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 relative p-4 h-[500px]">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
            <div className="overflow-y-auto overflow-x-auto flex-1 custom-scrollbar">
              <table className="w-full text-left text-sm relative min-w-[600px]">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="p-3 w-12 text-center cursor-pointer hover:bg-slate-200 transition-colors" onClick={handleSelectAll}>
                      {selectedIds.size === filteredProducts.length && filteredProducts.length > 0 ? (
                        <CheckSquare size={18} className="text-[#FF1E27] mx-auto" />
                      ) : (
                        <Square size={18} className="text-slate-400 mx-auto" />
                      )}
                    </th>
                    <th className="p-3 font-medium">Producto</th>
                    <th className="p-3 font-medium text-slate-400">Costo Base</th>
                    <th className="p-3 font-medium text-[#FF1E27]">Precio Venta</th>
                    <th className="p-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => toggleSelect(p.id)}>
                      <td className="p-3 text-center">
                        {selectedIds.has(p.id) ? (
                          <CheckSquare size={18} className="text-[#FF1E27] mx-auto" />
                        ) : (
                          <Square size={18} className="text-slate-300 mx-auto" />
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {p.image_url ? (
                            <img src={p.image_url} alt="" className="w-8 h-8 rounded-md object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center text-[10px] text-slate-400 shrink-0">N/A</div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-800 line-clamp-1">{p.name}</p>
                            {p.code && <p className="text-xs text-slate-400">Cód: {p.code}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-medium text-slate-500">${formatPrice(p.cost || 0)}</td>
                      <td className="p-3 font-black text-slate-800">${formatPrice(p.price)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                          {p.is_active ? 'Activo' : 'Oculto'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No hay productos que coincidan con los filtros.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho: Acción a Aplicar */}
      <div className="w-full lg:w-96 bg-white p-6 flex flex-col border-l border-slate-200">
        <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
          <Calculator size={20} className="text-[#FF1E27]" /> Manejador de Precios
        </h3>
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-6 flex items-start gap-2">
          <AlertCircle size={18} className="text-[#FF1E27] shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700">
            Tienes <strong className="font-black text-lg text-[#FF1E27]">{selectedIds.size}</strong> productos seleccionados. Las reglas se aplican tomando como base el Costo.
          </p>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Acción a realizar</label>
            <select 
              value={actionType}
              onChange={e => setActionType(e.target.value as any)}
              className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#FF1E27] bg-white font-medium shadow-sm"
            >
              <optgroup label="Reglas Automáticas">
                <option value="price_rule_classic">Aplicar Regla Base (+3k / +20%)</option>
              </optgroup>
              <optgroup label="Suma / Resta Fija">
                <option value="price_add_fixed">Sumar Monto Fijo al Costo ($)</option>
                <option value="price_sub_fixed">Restar Monto Fijo al Costo ($)</option>
              </optgroup>
              <optgroup label="Porcentajes">
                <option value="price_add_percent">Sumar Porcentaje al Costo (%)</option>
                <option value="price_sub_percent">Restar Porcentaje al Costo (%)</option>
              </optgroup>
              <optgroup label="Manual">
                <option value="price_set_fixed">Fijar Precio de Venta Exacto ($)</option>
              </optgroup>
              <optgroup label="Otros Atributos">
                <option value="image">Asignar misma Imagen URL</option>
                <option value="category">Cambiar Categoría</option>
                <option value="status">Cambiar Estado</option>
              </optgroup>
            </select>
          </div>

          {actionType === 'price_rule_classic' && (
            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 border border-slate-200 shadow-inner">
              <p className="font-bold mb-2">Resumen de la regla:</p>
              <ul className="list-disc pl-4 space-y-2 font-medium">
                <li>Si Costo &lt; $20,000 &rarr; <span className="text-[#FF1E27]">Costo + $3,000</span></li>
                <li>Si Costo &ge; $20,000 &rarr; <span className="text-[#FF1E27]">Costo + 20%</span></li>
              </ul>
              <p className="mt-3 text-xs text-slate-400 italic">El resultado final siempre se redondea hacia arriba.</p>
            </div>
          )}

          {actionType.startsWith('price_') && actionType !== 'price_rule_classic' && (
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">
                 {actionType.includes('percent') ? 'Porcentaje (Ej: 15)' : 'Monto (Ej: 5000)'}
               </label>
               <input 
                 type="number"
                 placeholder="0"
                 value={actionValue}
                 onChange={e => setActionValue(e.target.value)}
                 className="w-full p-3 text-lg font-black border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#FF1E27]"
               />
             </div>
          )}

          {actionType === 'image' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nueva URL de Imagen</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={actionValue}
                onChange={e => setActionValue(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#FF1E27]"
              />
              {actionValue && <img src={actionValue} alt="Preview" className="mt-2 h-20 rounded-lg object-cover border border-slate-200" />}
            </div>
          )}

          {actionType === 'category' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Seleccionar Categoría</label>
              <select 
                value={actionValue}
                onChange={e => setActionValue(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#FF1E27]"
              >
                <option value="">- Elige -</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}

          {actionType === 'status' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nuevo Estado</label>
              <div className="flex items-center gap-2 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <input 
                  type="checkbox" 
                  id="bulkActive" 
                  checked={actionValue2} 
                  onChange={e => setActionValue2(e.target.checked)} 
                  className="w-4 h-4 text-[#FF1E27] rounded focus:ring-[#FF1E27] accent-[#FF1E27]" 
                />
                <label htmlFor="bulkActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Activo (Visible en la tienda)
                </label>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={applyBulkAction}
          disabled={selectedIds.size === 0 || isApplying || (actionType === 'category' && !actionValue) || (actionType === 'image' && !actionValue) || (actionType.startsWith('price_') && actionType !== 'price_rule_classic' && !actionValue)}
          className="w-full bg-[#FF1E27] hover:bg-[#E61922] text-white font-black py-4 rounded-xl mt-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF1E27]/20 flex items-center justify-center gap-2"
        >
          {isApplying ? 'Aplicando...' : <><Save size={18} /> Aplicar a {selectedIds.size} ítems</>}
        </button>
      </div>

    </div>
  );
}
