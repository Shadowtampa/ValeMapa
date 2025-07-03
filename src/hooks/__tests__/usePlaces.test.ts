import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePlaces } from '../usePlaces'
import type { Place } from '../../types/Place'

// Mock do fetch global
(globalThis as any).fetch = vi.fn()

const mockPlaces: Place[] = [
  {
    id: 1,
    name: 'Restaurante Italiano',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    coordinates: { lat: -23.55, lng: -46.63 },
    category: 'restaurante',
    description: 'Restaurante italiano tradicional',
    acceptsVale: true,
    valeType: ['refeição', 'alimentação'],
    valeBrands: ['Sodexo', 'Alelo'],
    phone: '(11) 1234-5678',
    hours: '12:00-23:00',
  },
  {
    id: 2,
    name: 'Padaria Central',
    address: 'Av. Paulista, 456',
    city: 'São Paulo',
    state: 'SP',
    coordinates: { lat: -23.56, lng: -46.64 },
    category: 'padaria',
    description: 'Padaria com pães frescos',
    acceptsVale: true,
    valeType: ['alimentação'],
    valeBrands: ['Sodexo'],
    phone: '(11) 2345-6789',
    hours: '06:00-20:00',
  },
  {
    id: 3,
    name: 'Café Expresso',
    address: 'Rua Augusta, 789',
    city: 'São Paulo',
    state: 'SP',
    coordinates: { lat: -23.57, lng: -46.65 },
    category: 'café',
    description: 'Café especializado',
    acceptsVale: false,
    valeType: [],
    valeBrands: [],
    phone: '(11) 3456-7890',
    hours: '08:00-18:00',
  },
]

describe('usePlaces Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('carrega lugares com sucesso', async () => {
    const mockResponse = { places: mockPlaces }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => usePlaces())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.places).toEqual(mockPlaces)
    expect(result.current.error).toBeNull()
  })

  it('manipula erro ao carregar lugares', async () => {
    ;(fetch as any).mockRejectedValueOnce(new Error('Erro de rede'))

    const { result } = renderHook(() => usePlaces())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Erro de rede')
    expect(result.current.places).toEqual([])
  })

  it('manipula resposta não ok', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
    })

    const { result } = renderHook(() => usePlaces())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Erro ao carregar dados dos lugares')
  })

  it('filtra lugares por categoria', async () => {
    const mockResponse = { places: mockPlaces }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => usePlaces())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const restaurantes = result.current.filterPlacesByCategory('restaurante')
    expect(restaurantes).toHaveLength(1)
    expect(restaurantes[0].name).toBe('Restaurante Italiano')

    const padarias = result.current.filterPlacesByCategory('padaria')
    expect(padarias).toHaveLength(1)
    expect(padarias[0].name).toBe('Padaria Central')
  })

  it('retorna todos os lugares quando categoria é "todos"', async () => {
    const mockResponse = { places: mockPlaces }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => usePlaces())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const todos = result.current.filterPlacesByCategory('todos')
    expect(todos).toHaveLength(3)
  })

  it('filtra lugares por tipos de vale', async () => {
    const mockResponse = { places: mockPlaces }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => usePlaces())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const lugaresComRefeicao = result.current.filterPlacesByValeTypes(['refeição'])
    expect(lugaresComRefeicao).toHaveLength(1)
    expect(lugaresComRefeicao[0].name).toBe('Restaurante Italiano')

    const lugaresComAlimentacao = result.current.filterPlacesByValeTypes(['alimentação'])
    expect(lugaresComAlimentacao).toHaveLength(2)
  })

  it('retorna todos os lugares quando não há filtros de vale', async () => {
    const mockResponse = { places: mockPlaces }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => usePlaces())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const todos = result.current.filterPlacesByValeTypes([])
    expect(todos).toHaveLength(3)
  })

  it('busca lugares por texto', async () => {
    const mockResponse = { places: mockPlaces }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => usePlaces())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const resultados = result.current.searchPlaces('italiano')
    expect(resultados).toHaveLength(1)
    expect(resultados[0].name).toBe('Restaurante Italiano')

    const resultadosPorCidade = result.current.searchPlaces('São Paulo')
    expect(resultadosPorCidade).toHaveLength(3)
  })

  it('retorna tipos de vale únicos', async () => {
    const mockResponse = { places: mockPlaces }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => usePlaces())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const valeTypes = result.current.getAllValeTypes()
    expect(valeTypes).toContain('refeição')
    expect(valeTypes).toContain('alimentação')
    expect(valeTypes).toHaveLength(2)
  })
}) 