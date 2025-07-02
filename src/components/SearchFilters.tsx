import React, { useState } from 'react';
import type { Category } from '../types/Place';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: Category) => void;
  selectedCategory: Category;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onCategoryFilter,
  selectedCategory
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

      <div className="info-section">
        <div className="info-card">
          <h4>💡 Como usar:</h4>
          <ul>
            <li>Use a busca para encontrar lugares por nome, endereço ou descrição</li>
            <li>Filtre por categoria para ver apenas tipos específicos de estabelecimentos</li>
            <li>Clique nos pins do mapa para ver detalhes completos</li>
            <li>Use os botões de ação para abrir no Google Maps ou ligar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 