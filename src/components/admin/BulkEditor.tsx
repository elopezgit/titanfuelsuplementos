import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { roundUpPrice, formatPrice } from '../../utils/formatPrice';
import { getProductBrand, getAvailableBrands } from '../../utils/brandUtils';
import { Search, Filter, CheckSquare, Square, Save, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
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

  const availableBrands = getAvailableBrands(initialProducts);

  // Actions
  const [actionType, setActionType] = useState<'price_rule' | 'image' | 'category' | 'status'>('price_rule');
  const [actionValue, setActionValue] = useState('');
  const [actionValue2, setActionValue2] = useState(true); // Para estado
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
    // Remove selection if product no longer exists
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
    return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
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
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const applyBulkAction = async () => {
    if (selectedIds.size === 0) return alert('Selecciona al menos un producto.');
    if (!window.confirm(`¿Estás seguro de aplicar esta acción a ${selectedIds.size} productos?`)) return;

    setIsApplying(true);

    const selectedProducts = products.filter(p => selectedIds.has(p.id));
    const payload = selectedProducts.map(p => {
      let updatedProduct = { ...p };

      switch (actionType) {
        case 'price_rule':
          if (p.price < 20000) {
            updatedProduct.price = roundUpPrice(p.price + 3000);
          } else {
            updatedProduct.price = roundUpPrice(p.price * 1.20);
          }
          // Aplica también al precio de oferta si lo tiene
          if (p.price_half && p.price_half > 0) {
              if (p.price_half < 20000) {
                updatedProduct.price_half = roundUpPrice(p.price_half + 3000);
              } else {
                updatedProduct.price_half = roundUpPrice(p.price_half * 1.20);
              }
          }
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
      // Usamos .upsert para enviar todos de golpe, asegurando empresa_id para RLS
      const { error } = await supabase.from('products').upsert(
        payload.map(p => ({
          id: p.id,
          empresa_id: empresaId,
          name: p.name,
          description: p.description,
          price: p.price,
          price_half: p.price_half,
          category_id: p.category_id,
          is_active: p.is_active,
          image_url: p.image_url,
          code: p.code
        }))
      );

      if (error) throw error;
      
      alert('¡Actualización masiva exitosa!');
      setSelectedIds(new Set());
      onUpdate(); // Recargar datos en el padre
    } catch (e: any) {
      console.error(e);
      alert('Error: ' + e.message);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      
      {/* Panel Izquierdo: Selección y Filtros */}
      <div className="flex-1 flex flex-col border-r border-slate-200">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-3">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Filter size={18} /> Filtrar Catálogo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o cód..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-primary"
              />
            </div>
            <select 
              value={filterCategory} 
              onChange={e => setFilterCategory(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white"
            >
              <option value="">Todas las Categorías</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select 
              value={filterBrand} 
              onChange={e => setFilterBrand(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white"
            >
              <option value="todas">Todas las Marcas</option>
              {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value as any)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white"
            >
              <option value="all">Todos los Estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 relative p-4 h-[500px]">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left text-sm relative">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="p-3 w-12 text-center cursor-pointer hover:bg-slate-200 transition-colors" onClick={handleSelectAll}>
                      {selectedIds.size === filteredProducts.length && filteredProducts.length > 0 ? (
                        <CheckSquare size={18} className="text-primary mx-auto" />
                      ) : (
                        <Square size={18} className="text-slate-400 mx-auto" />
                      )}
                    </th>
                    <th className="p-3 font-medium">Producto</th>
                    <th className="p-3 font-medium">Precio</th>
                    <th className="p-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => toggleSelect(p.id)}>
                      <td className="p-3 text-center">
                        {selectedIds.has(p.id) ? (
                          <CheckSquare size={18} className="text-primary mx-auto" />
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
                      <td className="p-3 font-medium">${formatPrice(p.price)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                          {p.is_active ? 'Activo' : 'Oculto'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">No hay productos que coincidan con los filtros.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho: Acción a Aplicar */}
      <div className="w-full md:w-80 bg-white p-6 flex flex-col border-l border-slate-200">
        <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
          <Save size={20} className="text-primary" /> Acción Masiva
        </h3>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-start gap-2">
          <AlertCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Tienes <strong className="font-black text-lg">{selectedIds.size}</strong> productos seleccionados.
          </p>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Operación a realizar</label>
            <select 
              value={actionType}
              onChange={e => setActionType(e.target.value as any)}
              className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-primary bg-slate-50"
            >
              <option value="price_rule">Regla de Precios (+3k / +20%)</option>
              <option value="image">Asignar misma Imagen URL</option>
              <option value="category">Cambiar Categoría</option>
              <option value="status">Cambiar Estado</option>
            </select>
          </div>

          {actionType === 'price_rule' && (
            <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 border border-slate-200">
              <p className="font-bold mb-1">Regla aplicada:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Si Precio &lt; $20,000 &rarr; Precio + $3,000</li>
                <li>Si Precio &ge; $20,000 &rarr; Precio + 20%</li>
              </ul>
              <p className="mt-2 text-slate-500 italic">* Se aplicará un redondeo automático.</p>
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
                className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-primary"
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
                className="w-full p-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-primary"
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
                  className="w-4 h-4 text-primary rounded focus:ring-primary accent-primary" 
                />
                <label htmlFor="bulkActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Activo (Visible)
                </label>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={applyBulkAction}
          disabled={selectedIds.size === 0 || isApplying || (actionType === 'category' && !actionValue) || (actionType === 'image' && !actionValue)}
          className="w-full bg-primary hover:bg-primary-hover text-black font-bold py-3 rounded-xl mt-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isApplying ? 'Aplicando...' : `Aplicar a ${selectedIds.size} ítems`}
        </button>
      </div>

    </div>
  );
}
