import React from 'react';
import type { Place } from '../types/Place';

interface PlaceDetailsProps {
  place: Place | null;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place }) => {
  if (!place) {
    return (
      <div className="place-details empty">
        <div className="empty-state">
          <div className="empty-icon">📍</div>
          <h3>Selecione um lugar no mapa</h3>
          <p>Clique em um pin para ver os detalhes do estabelecimento</p>
        </div>
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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'restaurante':
        return 'Restaurante';
      case 'padaria':
        return 'Padaria';
      case 'supermercado':
        return 'Supermercado';
      case 'café':
        return 'Café';
      case 'pizzaria':
        return 'Pizzaria';
      default:
        return category;
    }
  };

  return (
    <div className="place-details">
      <div className="place-header">
        <div className="place-title">
          <span className="category-icon">{getCategoryIcon(place.category)}</span>
          <h2>{place.name}</h2>
        </div>
        <div className="place-category">
          <span className="category-badge">
            {getCategoryLabel(place.category)}
          </span>
        </div>
      </div>
      
      <div className="place-info">
        <div className="info-item">
          <div className="info-icon">🏠</div>
          <div className="info-content">
            <strong>Endereço</strong>
            <p>{place.address}</p>
            <p className="city-info">{place.city} - {place.state}</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">📝</div>
          <div className="info-content">
            <strong>Descrição</strong>
            <p>{place.description}</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">📞</div>
          <div className="info-content">
            <strong>Telefone</strong>
            <p>{place.phone}</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">🕒</div>
          <div className="info-content">
            <strong>Horário de Funcionamento</strong>
            <p>{place.hours}</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">💳</div>
          <div className="info-content">
            <strong>Tipos de Vale Aceitos</strong>
            <div className="vale-types">
              {place.valeType.map((type, index) => (
                <span key={index} className="vale-badge">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">✅</div>
          <div className="info-content">
            <strong>Status</strong>
            <span className={`status ${place.acceptsVale ? 'accepts' : 'not-accepts'}`}>
              {place.acceptsVale ? 'Aceita Vale Alimentação' : 'Não aceita Vale Alimentação'}
            </span>
          </div>
        </div>
      </div>

      <div className="place-actions">
        <button 
          className="btn-primary"
          onClick={() => window.open(`https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`, '_blank')}
        >
          <span className="btn-icon">📍</span>
          Ver no Google Maps
        </button>
        
        <button 
          className="btn-secondary"
          onClick={() => window.open(`tel:${place.phone}`, '_blank')}
        >
          <span className="btn-icon">📞</span>
          Ligar
        </button>
      </div>
    </div>
  );
}; 