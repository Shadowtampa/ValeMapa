import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export const UserLocationBox: React.FC = () => {
  const { userLocation, setUserLocation } = useAppContext();
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [chosenLocation, setChosenLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [showForm, setShowForm] = useState(true);

  // Sempre que userLocation mudar, refletir na UI
  useEffect(() => {
    if (userLocation) {
      setChosenLocation({ lat: userLocation[0], lng: userLocation[1] });
      setShowForm(false);
    } else {
      setShowForm(true);
      setChosenLocation(null);
    }
  }, [userLocation]);

  const handleGetLocation = () => {
    setError(null);
    setLoading(true);
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada pelo navegador.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setChosenLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setShowForm(false);
        setLoading(false);
      },
      () => {
        setError('Não foi possível obter sua localização.');
        setLoading(false);
      }
    );
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setChosenLocation({ lat, lng, address: data[0].display_name });
        setUserLocation([lat, lng]);
        setShowForm(false);
      } else {
        setError('Endereço não encontrado. Tente ser mais específico.');
      }
    } catch (err) {
      setError('Erro ao buscar endereço.' + err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeLocation = () => {
    setShowForm(true);
    setError(null);
    setAddress('');
    setUserLocation(null);
  };

  return (
    <div className="user-location-box">
      <h3>
        <span className="location-icon">📍</span>
        Minha Localização
      </h3>
      
      {showForm ? (
        <div className="location-form">
          <button 
            type="button" 
            onClick={handleGetLocation} 
            disabled={loading}
            className="location-btn primary"
          >
            <span className="btn-icon">🌍</span>
            {loading ? 'Buscando localização...' : 'Usar minha localização'}
          </button>
          
          <div className="divider">
            <span>ou</span>
          </div>
          
          <form onSubmit={handleAddressSubmit} className="address-form">
            <div className="input-group">
              <span className="input-icon">🏠</span>
              <input
                type="text"
                placeholder="Digite um endereço ou nome de lugar"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="address-input"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !address.trim()}
              className="location-btn secondary"
            >
              <span className="btn-icon">🔍</span>
              {loading ? 'Buscando endereço...' : 'Buscar endereço'}
            </button>
          </form>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="location-display">
          <div className="location-info">
            <div className="location-label">Localização escolhida:</div>
            <div className="location-value">
              {chosenLocation?.address ? (
                <span>{chosenLocation.address}</span>
              ) : (
                <span>
                  Lat: {chosenLocation?.lat.toFixed(6)}, Lng: {chosenLocation?.lng.toFixed(6)}
                </span>
              )}
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleChangeLocation}
            className="location-btn secondary"
          >
            <span className="btn-icon">🔄</span>
            Trocar localização
          </button>
        </div>
      )}
    </div>
  );
}; 