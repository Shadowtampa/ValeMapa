import { vi, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Map } from '../Map'
import type { Place } from '../../types/Place'

// Mock do leaflet ANTES de importar o componente
vi.mock('leaflet', () => {
  const markerPrototype = { options: { icon: null } }
  return {
    __esModule: true,
    default: {
      icon: vi.fn(() => ({})),
      Marker: { prototype: markerPrototype },
    },
    icon: vi.fn(() => ({})),
    Marker: { prototype: markerPrototype },
    map: vi.fn(),
    tileLayer: vi.fn(),
    marker: vi.fn(),
    divIcon: vi.fn(),
    popup: vi.fn(),
    latLng: vi.fn(),
    latLngBounds: vi.fn(),
  }
})

// Mock do react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, center, zoom, style }: any) => (
    <div data-testid="map-container" style={style}>
      <div data-testid="map-center" data-lat={center[0]} data-lng={center[1]} data-zoom={zoom}>
        {children}
      </div>
    </div>
  ),
  TileLayer: ({ url, attribution }: any) => (
    <div data-testid="tile-layer" data-url={url} data-attribution={attribution} />
  ),
  Marker: ({ position, children, eventHandlers }: any) => (
    <div 
      data-testid="marker" 
      data-lat={position[0]} 
      data-lng={position[1]}
      onClick={eventHandlers?.click}
    >
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
  useMap: () => ({
    setView: vi.fn(),
    getZoom: () => 13,
  }),
}))

const mockPlaces: Place[] = [
  {
    id: 1,
    name: 'Restaurante Teste',
    address: 'Rua Teste, 123',
    city: 'São Paulo',
    state: 'SP',
    coordinates: { lat: -23.55, lng: -46.63 },
    category: 'restaurante',
    description: 'Um restaurante de teste',
    acceptsVale: true,
    valeType: ['refeição', 'alimentação'],
    valeBrands: ['Sodexo', 'Alelo'],
    phone: '(11) 1234-5678',
    hours: '09:00-22:00',
  },
]

describe('Map Component', () => {
  it('renderiza o mapa com o centro padrão', () => {
    const onPlaceSelect = vi.fn()
    
    render(
      <Map 
        places={mockPlaces} 
        selectedPlace={null}
        onPlaceSelect={onPlaceSelect}
      />
    )

    const mapContainer = screen.getByTestId('map-container')
    expect(mapContainer).toBeInTheDocument()

    const mapCenter = screen.getByTestId('map-center')
    expect(mapCenter).toHaveAttribute('data-lat', '-23.55')
    expect(mapCenter).toHaveAttribute('data-lng', '-46.63')
    expect(mapCenter).toHaveAttribute('data-zoom', '13')
  })

  it('renderiza o mapa com localização do usuário', () => {
    const onPlaceSelect = vi.fn()
    const userLocation: [number, number] = [-23.56, -46.64]
    
    render(
      <Map 
        places={mockPlaces} 
        selectedPlace={null}
        onPlaceSelect={onPlaceSelect}
        userLocation={userLocation}
      />
    )

    const mapCenter = screen.getByTestId('map-center')
    expect(mapCenter).toHaveAttribute('data-lat', '-23.56')
    expect(mapCenter).toHaveAttribute('data-lng', '-46.64')
  })

  it('renderiza marcadores para os lugares', () => {
    const onPlaceSelect = vi.fn()
    
    render(
      <Map 
        places={mockPlaces} 
        selectedPlace={null}
        onPlaceSelect={onPlaceSelect}
      />
    )

    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(1)
    
    const marker = markers[0]
    expect(marker).toHaveAttribute('data-lat', '-23.55')
    expect(marker).toHaveAttribute('data-lng', '-46.63')
  })

  it('renderiza popup com informações do lugar', () => {
    const onPlaceSelect = vi.fn()
    
    render(
      <Map 
        places={mockPlaces} 
        selectedPlace={null}
        onPlaceSelect={onPlaceSelect}
      />
    )

    const popups = screen.getAllByTestId('popup')
    expect(popups).toHaveLength(1)
    
    expect(popups[0]).toHaveTextContent('Restaurante Teste')
    expect(popups[0]).toHaveTextContent('Rua Teste, 123')
    expect(popups[0]).toHaveTextContent('São Paulo - SP')
  })

  it('chama onPlaceSelect quando marcador é clicado', () => {
    const onPlaceSelect = vi.fn()
    
    render(
      <Map 
        places={mockPlaces} 
        selectedPlace={null}
        onPlaceSelect={onPlaceSelect}
      />
    )

    const marker = screen.getByTestId('marker')
    marker.click()

    expect(onPlaceSelect).toHaveBeenCalledWith(mockPlaces[0])
  })
}) 