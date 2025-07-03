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
    <div style={{ marginBottom: '1rem' }}>
      <h3>Minha localização</h3>
      {showForm ? (
        <>
          <button type="button" onClick={handleGetLocation} disabled={loading} style={{ marginBottom: '0.5rem' }}>
            {loading ? 'Buscando localização...' : 'Usar minha localização'}
          </button>
          <form onSubmit={handleAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="text"
              placeholder="Digite um endereço ou nome de lugar"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <button type="submit" disabled={loading || !address.trim()}>
              {loading ? 'Buscando endereço...' : 'Buscar endereço'}
            </button>
          </form>
          {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
        </>
      ) : (
        <div style={{ margin: '0.5rem 0' }}>
          <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            <strong>Localização escolhida:</strong><br />
            {chosenLocation?.address ? (
              <span>{chosenLocation.address}</span>
            ) : (
              <span>Lat: {chosenLocation?.lat.toFixed(6)}, Lng: {chosenLocation?.lng.toFixed(6)}</span>
            )}
          </div>
          <button type="button" onClick={handleChangeLocation}>
            Trocar localização
          </button>
        </div>
      )}
    </div>
  );
}; 