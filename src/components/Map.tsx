import React, { useEffect } from 'react';
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

// Ícone SVG de casa para localização do usuário
const houseSvg = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
  <g>
    <circle cx='20' cy='20' r='18' fill='#1976d2' stroke='white' stroke-width='3'/>
    <path d='M12 23 L20 15 L28 23 V30 H12 Z' fill='white' stroke='#1976d2' stroke-width='2'/>
    <rect x='17' y='25' width='6' height='5' fill='#1976d2' stroke='white' stroke-width='1'/>
  </g>
</svg>
`);
const houseIcon = L.icon({
  iconUrl: `data:image/svg+xml,${houseSvg}`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'user-location-marker',
});

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

export const Map: React.FC<MapProps> = ({ places, onPlaceSelect, userLocation }) => {
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
        <Marker position={userLocation} icon={houseIcon}>
          <Popup>Sua localização</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}; 