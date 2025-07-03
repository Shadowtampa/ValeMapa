import React, { useState } from 'react';
import type { Category } from '../types/Place';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  valeTypes: string[];
  selectedCategory: Category;
  onCategoryFilter: (category: Category) => void;
  selectedValeTypes: string[];
  onValeTypesChange: (types: string[]) => void;
  valeBrands: string[];
  selectedValeBrands: string[];
  onValeBrandsChange: (brands: string[]) => void;
  searchRadius: number;
  onSearchRadiusChange: (radius: number) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  valeTypes,
  selectedCategory,
  onCategoryFilter,
  selectedValeTypes,
  onValeTypesChange,
  valeBrands,
  selectedValeBrands,
  onValeBrandsChange,
  searchRadius,
  onSearchRadiusChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { value: Category; label: string; icon: string }[] = [
    { value: 'todos', label: 'Todos', icon: '📍' },
    { value: 'restaurante', label: 'Restaurantes', icon: '🍽️' },
    { value: 'padaria', label: 'Padarias', icon: '🥖' },
    { value: 'supermercado', label: 'Supermercados', icon: '🛒' },
    { value: 'café', label: 'Cafés', icon: '☕' },
    { value: 'pizzaria', label: 'Pizzarias', icon: '🍕' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryChange = (category: Category) => {
    onCategoryFilter(category);
  };

  const handleValeTypeChange = (type: string) => {
    let newValeTypes: string[];
    if (selectedValeTypes.includes(type)) {
      newValeTypes = selectedValeTypes.filter(t => t !== type);
    } else {
      newValeTypes = [...selectedValeTypes, type];
    }
    onValeTypesChange(newValeTypes);
  };

  const handleValeBrandChange = (brand: string) => {
    let newBrands: string[];
    if (selectedValeBrands.includes(brand)) {
      newBrands = selectedValeBrands.filter(b => b !== brand);
    } else {
      newBrands = [...selectedValeBrands, brand];
    }
    onValeBrandsChange(newBrands);
  };

  const radiusOptions = [1, 2, 5, 10, 20, 50];

  return (
    <div className="search-filters">
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar lugares..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filters-section">
        <h3>Filtrar por categoria:</h3>
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`category-filter ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.value)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-label">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {valeTypes.length > 0 && (
        <div className="filters-section" style={{ marginTop: '1rem' }}>
          <h3>Filtrar por tipo de vale:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {valeTypes.map(type => (
              <label key={type} style={{ fontSize: '0.95rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedValeTypes.includes(type)}
                  onChange={() => handleValeTypeChange(type)}
                  style={{ marginRight: '0.5rem' }}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      )}

      {valeBrands.length > 0 && (
        <div className="filters-section" style={{ marginTop: '1rem' }}>
          <h3>Filtrar por marca do vale:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {valeBrands.map(brand => (
              <label key={brand} style={{ fontSize: '0.95rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedValeBrands.includes(brand)}
                  onChange={() => handleValeBrandChange(brand)}
                  style={{ marginRight: '0.5rem' }}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="filters-section">
        <h3>Filtrar por raio de busca:</h3>
        <select value={searchRadius} onChange={e => onSearchRadiusChange(Number(e.target.value))} style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
          {radiusOptions.map(opt => (
            <option key={opt} value={opt}>{opt} km</option>
          ))}
        </select>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h4>💡 Como usar:</h4>
          <ul>
            <li>Use a busca para encontrar lugares por nome, endereço ou descrição</li>
            <li>Filtre por categoria para ver apenas tipos específicos de estabelecimentos</li>
            <li>Filtre por tipo de vale aceito</li>
            <li>Clique nos pins do mapa para ver detalhes completos</li>
            <li>Use os botões de ação para abrir no Google Maps ou ligar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 