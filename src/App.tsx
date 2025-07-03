import { useState, useMemo } from 'react';
import { usePlaces } from './hooks/usePlaces';
import { Map } from './components/Map';
import { PlaceDetails } from './components/PlaceDetails';
import { SearchFilters } from './components/SearchFilters';
import { UserLocationBox } from './components/UserLocationBox';
import { useAppContext } from './context/AppContext';
import type { Place, Category } from './types/Place';
import './App.css';



function App() {
  const { places, loading, error, getAllValeTypes } = usePlaces();
  const { userLocation, selectedCategory, setSelectedCategory, selectedValeTypes, setSelectedValeTypes } = useAppContext();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValeBrands, setSelectedValeBrands] = useState<string[]>([]);
  const [searchRadius, setSearchRadius] = useState<number>(10);



  // Função para calcular distância entre dois pontos (Haversine)
  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (x: number) => x * Math.PI / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Filtrar lugares baseado na busca, categoria, tipos de vale, marcas de vale e raio
  const filteredPlaces = useMemo(() => {
    return places
      .filter(place => selectedCategory === 'todos' || place.category === selectedCategory)
      .filter(place => 
        selectedValeTypes.length === 0 ||
        selectedValeTypes.some(type => place.valeType.map(v => v.toLowerCase()).includes(type.toLowerCase()))
      )
      .filter(place =>
        selectedValeBrands.length === 0 ||
        selectedValeBrands.some(brand => (place.valeBrands || []).map(b => b.toLowerCase()).includes(brand.toLowerCase()))
      )
      .filter(place => {
        if (!userLocation) return true;
        const dist = haversineDistance(userLocation[0], userLocation[1], place.coordinates.lat, place.coordinates.lng);
        return dist <= searchRadius;
      })
      .filter(place => {
        if (!searchQuery.trim()) return true;
        const lowerQuery = searchQuery.toLowerCase();
        return (
          place.name.toLowerCase().includes(lowerQuery) ||
          place.address.toLowerCase().includes(lowerQuery) ||
          place.city.toLowerCase().includes(lowerQuery) ||
          place.description.toLowerCase().includes(lowerQuery)
        );
      });
  }, [places, selectedCategory, searchQuery, selectedValeTypes, selectedValeBrands, userLocation, searchRadius]);

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

  const handleValeBrandsChange = (brands: string[]) => {
    setSelectedValeBrands(brands);
  };

  const handleSearchRadiusChange = (radius: number) => {
    setSearchRadius(radius);
  };

  const allValeTypes = getAllValeTypes();
  const allValeBrands = Array.from(new Set(places.flatMap(place => place.valeBrands || [])));

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
          <UserLocationBox />
          <SearchFilters
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            selectedCategory={selectedCategory}
            valeTypes={allValeTypes}
            selectedValeTypes={selectedValeTypes}
            onValeTypesChange={handleValeTypesChange}
            valeBrands={allValeBrands}
            selectedValeBrands={selectedValeBrands}
            onValeBrandsChange={handleValeBrandsChange}
            searchRadius={searchRadius}
            onSearchRadiusChange={handleSearchRadiusChange}
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
