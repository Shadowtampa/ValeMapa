import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock do Leaflet para evitar problemas nos testes
(globalThis as any).L = {
  map: vi.fn(() => ({
    setView: vi.fn(),
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  })),
  tileLayer: vi.fn(() => ({
    addTo: vi.fn(),
  })),
  marker: vi.fn(() => ({
    addTo: vi.fn(),
    bindPopup: vi.fn(),
    setLatLng: vi.fn(),
  })),
  Marker: {
    prototype: {
      options: {
        icon: null,
      },
    },
  },
  icon: vi.fn(),
  divIcon: vi.fn(),
  popup: vi.fn(),
  latLng: vi.fn(),
  latLngBounds: vi.fn(),
}

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
}) 