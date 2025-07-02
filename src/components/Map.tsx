import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
  userLocation?: [number, number] | null;
}

const CenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export const Map: React.FC<MapProps> = ({ places, selectedPlace, onPlaceSelect, userLocation }) => {
  // Centraliza o mapa em SP por padrão
  const defaultCenter: [number, number] = [-23.55, -46.63];
  const center = userLocation || defaultCenter;

  return (
    <MapContainer center={center} zoom={13} style={{ width: '100%', height: '400px' }} scrollWheelZoom={true}>
      <CenterMap center={center} />
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
      {userLocation && (
        <Marker position={userLocation} icon={L.icon({ ...defaultIcon, iconUrl: iconUrl, iconAnchor: [12, 41], iconSize: [25, 41], className: 'user-location-marker' })}>
          <Popup>Sua localização</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}; 