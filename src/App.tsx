import React, { useState, useMemo } from 'react';
import { usePlaces } from './hooks/usePlaces';
import { Map } from './components/Map';
import { PlaceDetails } from './components/PlaceDetails';
import { SearchFilters } from './components/SearchFilters';
import { UserLocationBox } from './components/UserLocationBox';
import type { Place, Category } from './types/Place';
import './App.css';

function App() {
  const { places, loading, error, filterPlacesByCategory, filterPlacesByValeTypes, searchPlaces, getAllValeTypes } = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedValeTypes, setSelectedValeTypes] = useState<string[]>([]);

  // Filtrar lugares baseado na busca, categoria e tipos de vale
  const filteredPlaces = useMemo(() => {
    let filtered = places;

    // Filtro por categoria
    if (selectedCategory !== 'todos') {
      filtered = filterPlacesByCategory(selectedCategory);
    }

    // Filtro por tipos de vale
    if (selectedValeTypes.length > 0) {
      filtered = filterPlacesByValeTypes(selectedValeTypes).filter(p => filtered.includes(p));
    }

    // Busca
    if (searchQuery.trim()) {
      filtered = searchPlaces(searchQuery).filter(p => filtered.includes(p));
    }

    return filtered;
  }, [places, selectedCategory, searchQuery, selectedValeTypes, filterPlacesByCategory, filterPlacesByValeTypes, searchPlaces]);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleValeTypesChange = (valeTypes: string[]) => {
    setSelectedValeTypes(valeTypes);
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setUserLocation([lat, lng]);
  };

  const allValeTypes = getAllValeTypes();

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
          <UserLocationBox onLocationChange={handleLocationChange} />
          <SearchFilters
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            selectedCategory={selectedCategory}
            valeTypes={allValeTypes}
            selectedValeTypes={selectedValeTypes}
            onValeTypesChange={handleValeTypesChange}
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
              userLocation={userLocation}
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
