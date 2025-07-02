import { useState, useEffect } from 'react';
import type { Place, PlacesData } from '../types/Place';

export const usePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await fetch('/places.json');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar dados dos lugares');
        }
        
        const data: PlacesData = await response.json();
        setPlaces(data.places);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const filterPlacesByCategory = (category: string): Place[] => {
    if (category === 'todos') {
      return places;
    }
    return places.filter(place => place.category === category);
  };

  const searchPlaces = (query: string): Place[] => {
    const lowerQuery = query.toLowerCase();
    return places.filter(place => 
      place.name.toLowerCase().includes(lowerQuery) ||
      place.address.toLowerCase().includes(lowerQuery) ||
      place.city.toLowerCase().includes(lowerQuery) ||
      place.description.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    places,
    loading,
    error,
    filterPlacesByCategory,
    searchPlaces
  };
}; 