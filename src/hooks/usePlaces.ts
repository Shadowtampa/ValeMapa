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

  const filterPlacesByValeTypes = (valeTypes: string[]): Place[] => {
    if (!valeTypes.length) return places;
    return places.filter(place =>
      valeTypes.every(type => place.valeType.map(v => v.toLowerCase()).includes(type.toLowerCase()))
    );
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

  // Retorna todos os tipos de vale únicos
  const getAllValeTypes = (): string[] => {
    const set = new Set<string>();
    places.forEach(place => place.valeType.forEach(type => set.add(type)));
    return Array.from(set);
  };

  return {
    places,
    loading,
    error,
    filterPlacesByCategory,
    filterPlacesByValeTypes,
    searchPlaces,
    getAllValeTypes
  };
}; 