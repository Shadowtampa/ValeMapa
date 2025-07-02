import React, { useState, useMemo } from 'react';
import { usePlaces } from './hooks/usePlaces';
import { Map } from './components/Map';
import { PlaceDetails } from './components/PlaceDetails';
import { SearchFilters } from './components/SearchFilters';
import type { Place, Category } from './types/Place';
import './App.css';

function App() {
  const { places, loading, error, filterPlacesByCategory, searchPlaces } = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar lugares baseado na busca e categoria
  const filteredPlaces = useMemo(() => {
    let filtered = places;

    // Aplicar filtro de categoria
    if (selectedCategory !== 'todos') {
      filtered = filterPlacesByCategory(selectedCategory);
    }

    // Aplicar busca
    if (searchQuery.trim()) {
      filtered = searchPlaces(searchQuery);
    }

    return filtered;
  }, [places, selectedCategory, searchQuery, filterPlacesByCategory, searchPlaces]);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: Category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Carregando lugares...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Erro ao carregar dados</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🍽️ ValeMapa</h1>
          <p>Localizador de lugares que aceitam Vale Alimentação</p>
        </div>
      </header>

      <main className="app-main">
        <div className="sidebar">
          <SearchFilters
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            selectedCategory={selectedCategory}
          />
          
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{filteredPlaces.length}</span>
              <span className="stat-label">lugares encontrados</span>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="map-section">
            <Map
              places={filteredPlaces}
              selectedPlace={selectedPlace}
              onPlaceSelect={handlePlaceSelect}
            />
          </div>

          <div className="details-section">
            <PlaceDetails place={selectedPlace} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          💡 Dica: Os dados são atualizados manualmente. Se você conhece um lugar que aceita vale alimentação, 
          entre em contato para adicionarmos ao mapa!
        </p>
      </footer>
    </div>
  );
}

export default App;
