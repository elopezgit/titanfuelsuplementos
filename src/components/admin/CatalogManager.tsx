import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { getEmpresaId } from '../../lib/getEmpresa';
import { Trash2, Edit, Plus } from 'lucide-react';
import { formatPrice, roundUpPrice } from '../../utils/formatPrice';
import { getProductBrand, getAvailableBrands } from '../../utils/brandUtils';
import BulkEditor from './BulkEditor';
import SmartSyncPanel from './SmartSyncPanel';

interface Product {
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

interface Category {
  id: string;
  name: string;
}

export default function CatalogManager({ empresaSlug }: { empresaSlug: string }) {
  const [empresaId, setEmpresaId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [viewMode, setViewMode] = useState<'list' | 'bulk' | 'sync'>('sync');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', description: '', price: '', price_half: '', category_id: '', image_url: '', code: '', is_active: true });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('todas');
  const [sortBy, setSortBy] = useState('name_asc');

  const availableBrands = getAvailableBrands(products);

  useEffect(() => {
    async function init() {
      let id = await getEmpresaId(empresaSlug);
      if (!id) return;
      setEmpresaId(id);
      fetchData(id);
    }
    init();
  }, [empresaSlug]);

  const fetchData = async (id: string) => {
    try {
      const [cats, prods] = await Promise.all([
        supabase.from('categories').select('*').eq('empresa_id', id).order('name'),
        supabase.from('products').select('*').eq('empresa_id', id).order('name')
      ]);
      
      if (cats.data) {
        setCategories(cats.data);
      }

      if (prods.data) {
        setProducts(prods.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empresaId) return;

    const payload = {
      empresa_id: empresaId,
      name: formData.name,
      description: formData.description,
      price: roundUpPrice(formData.price),
      price_half: formData.price_half ? roundUpPrice(formData.price_half) : null,
      category_id: formData.category_id || null,
      image_url: formData.image_url || null,
      code: formData.code || null,
      is_active: formData.is_active
    };

    let error;
    if (formData.id) {
      // UPDATE
      const res = await supabase.from('products').update(payload).eq('id', formData.id);
      error = res.error;
    } else {
      // INSERT
      const res = await supabase.from('products').insert(payload);
      error = res.error;
    }

    if (!error) {
      setIsModalOpen(false);
      setFormData({ id: '', name: '', description: '', price: '', price_half: '', category_id: '', image_url: '', code: '', is_active: true });
      fetchData(empresaId);
    } else {
      alert("Error al guardar: " + error.message);
    }
  };

  const handleEdit = (p: Product) => {
    setFormData({
      id: p.id,
      name: p.name,
      description: p.description || '',
      price: p.price.toString(),
      price_half: p.price_half ? p.price_half.toString() : '',
      category_id: p.category_id || '',
      image_url: p.image_url || '',
      code: p.code || '',
      is_active: p.is_active
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar producto?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error && empresaId) {
      fetchData(empresaId);
    }
  };

  if (!empresaId) return <div className="p-8">Cargando gestor...</div>;

  // Filter and Sort Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (p.code && p.code.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory ? p.category_id === filterCategory : true;
    const matchesBrand = filterBrand === 'todas' ? true : getProductBrand(p) === filterBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="p-4 md:p-8">
      <header className="mb-6 md:mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Gestión de Catálogo</h2>
          <p className="text-slate-500 mt-1">Administra tus productos y categorías.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-200/60 p-1 rounded-lg flex items-center">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Lista
            </button>
            <button 
              onClick={() => setViewMode('bulk')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'bulk' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Edición Masiva
            </button>
            <button 
              onClick={() => setViewMode('sync')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-1 ${viewMode === 'sync' ? 'bg-[#FF1E27] shadow-sm text-white' : 'text-[#FF1E27] hover:bg-[#FF1E27]/10'}`}
            >
              ⚡ Smart Sync
            </button>
          </div>
          
          {viewMode === 'list' && (
            <button 
              onClick={() => {
                setFormData({ id: '', name: '', description: '', price: '', price_half: '', category_id: '', image_url: '', code: '', is_active: true });
                setIsModalOpen(true);
              }}
              className="bg-primary hover:bg-primary-hover text-black px-4 py-2 rounded-lg shadow-sm font-medium transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Nuevo Producto
            </button>
          )}
        </div>
      </header>

      {viewMode === 'bulk' ? (
        <BulkEditor 
          empresaId={empresaId} 
          products={products} 
          categories={categories} 
          onUpdate={() => fetchData(empresaId)} 
        />
      ) : viewMode === 'sync' ? (
        <SmartSyncPanel
          empresaId={empresaId}
          products={products}
          categories={categories}
          onUpdate={() => {
            fetchData(empresaId);
            setViewMode('list');
          }}
          onCancel={() => setViewMode('list')}
        />
      ) : (
        <>
          {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Buscar producto..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-primary"
        />
        <select 
          value={filterCategory} 
          onChange={e => setFilterCategory(e.target.value)}
          className="p-2 border border-slate-200 rounded-lg text-slate-800 bg-white min-w-[150px]"
        >
          <option value="">Todas las Categorías</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select 
          value={filterBrand} 
          onChange={e => setFilterBrand(e.target.value)}
          className="p-2 border border-slate-200 rounded-lg text-slate-800 bg-white min-w-[150px]"
        >
          <option value="todas">Todas las Marcas</option>
          {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select 
          value={sortBy} 
          onChange={e => setSortBy(e.target.value)}
          className="p-2 border border-slate-200 rounded-lg text-slate-800 bg-white min-w-[150px]"
        >
          <option value="name_asc">Nombre (A-Z)</option>
          <option value="price_asc">Precio (Menor a Mayor)</option>
          <option value="price_desc">Precio (Mayor a Menor)</option>
        </select>
      </div>
      
      <div className="bg-transparent md:bg-white md:rounded-xl md:shadow-sm md:border md:border-slate-200 overflow-hidden">
        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredProducts.map(product => {
            const cat = categories.find(c => c.id === product.category_id);
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-slate-200 shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-200 shrink-0 flex items-center justify-center text-slate-400 text-xs">Sin foto</div>
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-lg leading-tight mb-1">{product.name}</p>
                    {product.code && <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md mb-1 inline-block">Cod: {product.code}</span>}
                    <p className="text-xs text-slate-500 font-medium">{cat ? cat.name : 'Sin categoría'}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mt-1 border-t border-slate-100 pt-3">
                  <div>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 inline-block ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {product.is_active ? 'Activo' : 'Oculto'}
                    </span>
                    <p className="font-black text-slate-800 text-lg">
                      ${formatPrice(product.price)}
                    </p>
                    {product.price_half && <p className="text-[#FF1E27] font-bold text-xs mt-0.5">Oferta: ${formatPrice(product.price_half)}</p>}
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">No hay productos que coincidan con la búsqueda.</div>
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <tr>
                <th className="p-4 font-medium">Producto</th>
                <th className="p-4 font-medium">Categoría</th>
                <th className="p-4 font-medium">Precio</th>
                <th className="p-4 font-medium">Estado</th>
                <th className="p-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(product => {
                const cat = categories.find(c => c.id === product.category_id);
                return (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded-lg object-contain bg-slate-100 border border-slate-200 p-1 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center text-slate-400 text-xs">Sin foto</div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-800">{product.name} {product.code && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ml-1">Cod: {product.code}</span>}</p>
                        <p className="text-xs text-slate-500 truncate max-w-xs">{product.description}</p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{cat ? cat.name : '-'}</td>
                    <td className="p-4 font-bold text-slate-800">
                      ${formatPrice(product.price)}
                      {product.price_half && <span className="text-[#FF1E27] ml-2 font-black text-sm block">Oferta: ${formatPrice(product.price_half)}</span>}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {product.is_active ? 'Activo' : 'Oculto'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleEdit(product)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-2">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">No hay productos que coincidan con la búsqueda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-end md:items-center justify-center z-50 md:p-4">
          <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] h-[90vh] md:h-auto overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-slate-800">{formData.id ? 'Editar Producto' : 'Agregar Producto'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Código (Opcional)</label>
                  <input type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-primary" placeholder="Ej: 101, P01..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg h-20 resize-none text-slate-800 focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Precio Normal ($)</label>
                  <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 text-[#FF1E27]">Precio Oferta ($)</label>
                  <input type="number" min="0" value={formData.price_half} onChange={e => setFormData({...formData, price_half: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-primary" placeholder="Opcional" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                  <select required value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-primary">
                    <option value="">Seleccionar...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL de Imagen</label>
                <input type="url" placeholder="https://..." value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-primary text-sm" />
                {formData.image_url && <img src={formData.image_url} alt="Preview" className="mt-2 h-20 rounded-lg object-cover border border-slate-200" />}
              </div>
              
              <div className="flex items-center gap-2 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <input type="checkbox" id="isActive" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-4 h-4 text-primary rounded focus:ring-primary accent-primary" />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Producto Activo (Visible en el catálogo)
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-hover text-black rounded-lg font-bold transition-colors">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
