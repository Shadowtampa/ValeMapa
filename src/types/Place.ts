export interface Place {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: string;
  description: string;
  acceptsVale: boolean;
  valeType: string[];
  phone: string;
  hours: string;
}

export interface PlacesData {
  places: Place[];
}

export type Category = 'restaurante' | 'padaria' | 'supermercado' | 'café' | 'pizzaria' | 'todos'; 