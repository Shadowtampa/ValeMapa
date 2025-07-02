import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Place } from '../types/Place';
import L from 'leaflet';

// Corrige o ícone padrão do Leaflet para funcionar com webpack/vite
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface MapProps {
  places: Place[];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
}

export const Map: React.FC<MapProps> = ({ places, selectedPlace, onPlaceSelect }) => {
  // Centraliza o mapa em SP
  const center: [number, number] = [-23.55, -46.63];

  return (
    <MapContainer center={center} zoom={13} style={{ width: '100%', height: '400px' }} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.coordinates.lat, place.coordinates.lng]}
          eventHandlers={{
            click: () => onPlaceSelect(place),
          }}
        >
          <Popup>
            <strong>{place.name}</strong><br />
            {place.address}<br />
            {place.city} - {place.state}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}; 