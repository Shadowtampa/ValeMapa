import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchFilters } from '../SearchFilters'
import type { Category } from '../../types/Place'

describe('SearchFilters Component', () => {
  const defaultProps = {
    onSearch: vi.fn(),
    valeTypes: ['refeição', 'alimentação', 'cultura'],
    selectedCategory: 'todos' as Category,
    onCategoryFilter: vi.fn(),
    selectedValeTypes: [],
    onValeTypesChange: vi.fn(),
    valeBrands: ['Sodexo', 'Alelo', 'VR'],
    selectedValeBrands: [],
    onValeBrandsChange: vi.fn(),
    searchRadius: 5,
    onSearchRadiusChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza o campo de busca', () => {
    render(<SearchFilters {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Buscar lugares...')
    expect(searchInput).toBeInTheDocument()
  })

  it('chama onSearch quando o usuário digita na busca', () => {
    render(<SearchFilters {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Buscar lugares...')
    fireEvent.change(searchInput, { target: { value: 'restaurante' } })
    
    expect(defaultProps.onSearch).toHaveBeenCalledWith('restaurante')
  })

  it('renderiza todas as categorias', () => {
    render(<SearchFilters {...defaultProps} />)
    
    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByText('Restaurantes')).toBeInTheDocument()
    expect(screen.getByText('Padarias')).toBeInTheDocument()
    expect(screen.getByText('Supermercados')).toBeInTheDocument()
    expect(screen.getByText('Cafés')).toBeInTheDocument()
    expect(screen.getByText('Pizzarias')).toBeInTheDocument()
  })

  it('destaca a categoria selecionada', () => {
    render(<SearchFilters {...defaultProps} selectedCategory="restaurante" />)
    
    const restauranteButton = screen.getByText('Restaurantes').closest('button')
    expect(restauranteButton).toHaveClass('active')
  })

  it('chama onCategoryFilter quando uma categoria é clicada', () => {
    render(<SearchFilters {...defaultProps} />)
    
    const restauranteButton = screen.getByText('Restaurantes').closest('button')
    fireEvent.click(restauranteButton!)
    
    expect(defaultProps.onCategoryFilter).toHaveBeenCalledWith('restaurante')
  })

  it('renderiza os tipos de vale disponíveis', () => {
    render(<SearchFilters {...defaultProps} />)
    
    expect(screen.getByText('refeição')).toBeInTheDocument()
    expect(screen.getByText('alimentação')).toBeInTheDocument()
    expect(screen.getByText('cultura')).toBeInTheDocument()
  })

  it('chama onValeTypesChange quando um tipo de vale é selecionado', () => {
    render(<SearchFilters {...defaultProps} />)
    
    const refeicaoCheckbox = screen.getByLabelText('refeição')
    fireEvent.click(refeicaoCheckbox)
    
    expect(defaultProps.onValeTypesChange).toHaveBeenCalledWith(['refeição'])
  })

  it('remove tipo de vale quando desmarcado', () => {
    render(<SearchFilters {...defaultProps} selectedValeTypes={['refeição']} />)
    
    const refeicaoCheckbox = screen.getByLabelText('refeição')
    fireEvent.click(refeicaoCheckbox)
    
    expect(defaultProps.onValeTypesChange).toHaveBeenCalledWith([])
  })

  it('renderiza as marcas de vale disponíveis', () => {
    render(<SearchFilters {...defaultProps} />)
    
    expect(screen.getByText('Sodexo')).toBeInTheDocument()
    expect(screen.getByText('Alelo')).toBeInTheDocument()
    expect(screen.getByText('VR')).toBeInTheDocument()
  })

  it('chama onValeBrandsChange quando uma marca é selecionada', () => {
    render(<SearchFilters {...defaultProps} />)
    
    const sodexoCheckbox = screen.getByLabelText('Sodexo')
    fireEvent.click(sodexoCheckbox)
    
    expect(defaultProps.onValeBrandsChange).toHaveBeenCalledWith(['Sodexo'])
  })

  it('renderiza o seletor de raio de busca', () => {
    render(<SearchFilters {...defaultProps} />)
    
    const radiusSelect = screen.getByDisplayValue('5 km')
    expect(radiusSelect).toBeInTheDocument()
  })

  it('chama onSearchRadiusChange quando o raio é alterado', () => {
    render(<SearchFilters {...defaultProps} />)
    
    const radiusSelect = screen.getByDisplayValue('5 km')
    fireEvent.change(radiusSelect, { target: { value: '10' } })
    
    expect(defaultProps.onSearchRadiusChange).toHaveBeenCalledWith(10)
  })

  it('renderiza as instruções de uso', () => {
    render(<SearchFilters {...defaultProps} />)
    
    expect(screen.getByText('Como usar')).toBeInTheDocument()
    expect(screen.getByText(/Use a busca para encontrar lugares/)).toBeInTheDocument()
    expect(screen.getByText(/Filtre por categoria/)).toBeInTheDocument()
  })

  it('não renderiza seção de tipos de vale quando não há tipos', () => {
    render(<SearchFilters {...defaultProps} valeTypes={[]} />)
    
    expect(screen.queryByText('Tipos de Vale')).not.toBeInTheDocument()
  })

  it('não renderiza seção de marcas quando não há marcas', () => {
    render(<SearchFilters {...defaultProps} valeBrands={[]} />)
    
    expect(screen.queryByText('Marcas do Vale')).not.toBeInTheDocument()
  })
}) 