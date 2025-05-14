import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/product/productThunks';
import ProductCard from '../components/ProductCard';
import type { AppDispatch, RootState } from '../app/store';

const FILTERS_KEY = 'mobileStoreFilters';

interface StoredFilters {
  search: string;
  sortOrder: 'asc' | 'desc';
  selectedBrand: string;
}

const ProductListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.product);

  // Filtros iniciales desde localStorage
  const getInitialFilters = (): StoredFilters => {
    const saved = localStorage.getItem(FILTERS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { search: '', sortOrder: 'asc', selectedBrand: 'Todas' };
      }
    }
    return { search: '', sortOrder: 'asc', selectedBrand: 'Todas' };
  };

  const [search, setSearch] = useState(getInitialFilters().search);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(getInitialFilters().sortOrder);
  const [selectedBrand, setSelectedBrand] = useState(getInitialFilters().selectedBrand);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Guardar filtros en localStorage al cambiar
  useEffect(() => {
    const filters: StoredFilters = { search, sortOrder, selectedBrand };
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  }, [search, sortOrder, selectedBrand]);

  const brands = Array.from(new Set(items.map(p => p.marca)));

  const filtered = items
    .filter(p => {
      const matchesSearch = `${p.marca} ${p.modelo}`.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = selectedBrand === 'Todas' || p.marca === selectedBrand;
      return matchesSearch && matchesBrand;
    })
    .sort((a, b) => sortOrder === 'asc' ? a.precio - b.precio : b.precio - a.precio);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <input
          type="text"
          placeholder="Buscar por marca o modelo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded px-4 py-2"
        />

        <div className="flex gap-4 flex-wrap">
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="asc">Precio: Menor a mayor</option>
            <option value="desc">Precio: Mayor a menor</option>
          </select>

          <select
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="Todas">Todas las marcas</option>
            {brands.map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-gray-500">Cargando productos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-gray-400">No se encontraron productos.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
