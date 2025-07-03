import React from 'react';
import type { Place } from '../types/Place';

interface PlaceDetailsProps {
  place: Place | null;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place }) => {
  if (!place) {
    return (
      <div className="place-details empty">
        <h3>Selecione um lugar no mapa</h3>
        <p>Clique em um pin para ver os detalhes do estabelecimento</p>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurante':
        return '🍽️';
      case 'padaria':
        return '🥖';
      case 'supermercado':
        return '🛒';
      case 'café':
        return '☕';
      case 'pizzaria':
        return '🍕';
      default:
        return '📍';
    }
  };

  return (
    <div className="place-details">
      <div className="place-header">
        <span className="category-icon">{getCategoryIcon(place.category)}</span>
        <h2>{place.name}</h2>
      </div>
      
      <div className="place-info">
        <div className="info-item">
          <strong>Endereço:</strong>
          <p>{place.address}</p>
          <p>{place.city} - {place.state}</p>
        </div>

        <div className="info-item">
          <strong>Descrição:</strong>
          <p>{place.description}</p>
        </div>

        <div className="info-item">
          <strong>Categoria:</strong>
          <p>{place.category}</p>
        </div>

        <div className="info-item">
          <strong>Telefone:</strong>
          <p>{place.phone}</p>
        </div>

        <div className="info-item">
          <strong>Horário de Funcionamento:</strong>
          <p>{place.hours}</p>
        </div>

        <div className="info-item">
          <strong>Tipos de Vale Aceitos:</strong>
          <div className="vale-types">
            {place.valeType.map((type, index) => (
              <span key={index} className="vale-badge">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="info-item">
          <strong>Status:</strong>
          <span className={`status ${place.acceptsVale ? 'accepts' : 'not-accepts'}`}>
            {place.acceptsVale ? '✅ Aceita Vale Alimentação' : '❌ Não aceita Vale Alimentação'}
          </span>
        </div>
      </div>

      <div className="place-actions">
        <button 
          className="btn-primary"
          onClick={() => window.open(`https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`, '_blank')}
        >
          📍 Ver no Google Maps
        </button>
        
        <button 
          className="btn-secondary"
          onClick={() => window.open(`tel:${place.phone}`, '_blank')}
        >
          📞 Ligar
        </button>
      </div>
    </div>
  );
}; 