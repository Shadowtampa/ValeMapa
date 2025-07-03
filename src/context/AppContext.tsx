import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Category } from '../types/Place';

interface AppContextType {
  userLocation: [number, number] | null;
  setUserLocation: (loc: [number, number] | null) => void;
  selectedValeTypes: string[];
  setSelectedValeTypes: (types: string[]) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
}

const LOCALSTORAGE_LOCATION_KEY = 'valemapa_user_location';
const LOCALSTORAGE_VALETYPES_KEY = 'valemapa_selected_valetypes';
const LOCALSTORAGE_CATEGORY_KEY = 'valemapa_selected_category';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocationState] = useState<[number, number] | null>(null);
  const [selectedValeTypes, setSelectedValeTypesState] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategoryState] = useState<Category>('todos');

  // Carregar preferências do localStorage ao iniciar
  useEffect(() => {
    const loc = localStorage.getItem(LOCALSTORAGE_LOCATION_KEY);
    if (loc) {
      try {
        const [lat, lng] = JSON.parse(loc);
        if (typeof lat === 'number' && typeof lng === 'number') {
          setUserLocationState([lat, lng]);
        }
      } catch (error) {
        console.error('Erro ao carregar localização do localStorage:', error);
      }
    }
    const vales = localStorage.getItem(LOCALSTORAGE_VALETYPES_KEY);
    if (vales) {
      try {
        const arr = JSON.parse(vales);
        if (Array.isArray(arr)) {
          setSelectedValeTypesState(arr);
        }
      } catch (error) {
        console.error('Erro ao carregar tipos de vale do localStorage:', error);
      }
    }
    const cat = localStorage.getItem(LOCALSTORAGE_CATEGORY_KEY);
    if (cat) {
      setSelectedCategoryState(cat as Category);
    }
  }, []);

  // Salvar localização no localStorage
  useEffect(() => {
    if (userLocation) {
      localStorage.setItem(LOCALSTORAGE_LOCATION_KEY, JSON.stringify(userLocation));
    }
  }, [userLocation]);

  // Salvar tipos de vale selecionados no localStorage
  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_VALETYPES_KEY, JSON.stringify(selectedValeTypes));
  }, [selectedValeTypes]);

  // Salvar categoria selecionada no localStorage
  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_CATEGORY_KEY, selectedCategory);
  }, [selectedCategory]);

  // Funções para atualizar estado e localStorage
  const setUserLocation = (loc: [number, number] | null) => setUserLocationState(loc);
  const setSelectedValeTypes = (types: string[]) => setSelectedValeTypesState(types);
  const setSelectedCategory = (cat: Category) => setSelectedCategoryState(cat);

  return (
    <AppContext.Provider value={{ userLocation, setUserLocation, selectedValeTypes, setSelectedValeTypes, selectedCategory, setSelectedCategory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext deve ser usado dentro de AppProvider');
  return ctx;
}; 