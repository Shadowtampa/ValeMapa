# Testes do ValeMapa

Este diretório contém a configuração e exemplos de testes para o projeto ValeMapa.

## Configuração

O projeto usa:
- **Vitest** - Framework de testes moderno e rápido
- **React Testing Library** - Para testar componentes React
- **Jest DOM** - Matchers adicionais para DOM
- **User Event** - Para simular interações do usuário

## Scripts Disponíveis

```bash
# Executar testes em modo watch
npm run test

# Executar testes com interface gráfica
npm run test:ui

# Executar testes uma vez
npm run test:run

# Executar testes com cobertura
npm run test:coverage
```

## Estrutura dos Testes

```
src/
├── components/
│   └── __tests__/
│       ├── Map.test.tsx
│       └── SearchFilters.test.tsx
├── hooks/
│   └── __tests__/
│       └── usePlaces.test.ts
└── test/
    ├── setup.ts          # Configuração global dos testes
    ├── vitest.d.ts       # Declarações de tipos
    └── README.md         # Este arquivo
```

## Exemplos de Testes

### Testando Componentes

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MeuComponente } from '../MeuComponente'

describe('MeuComponente', () => {
  it('renderiza corretamente', () => {
    render(<MeuComponente />)
    expect(screen.getByText('Texto esperado')).toBeInTheDocument()
  })

  it('chama callback quando clicado', () => {
    const handleClick = vi.fn()
    render(<MeuComponente onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Testando Hooks

```tsx
import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useMeuHook } from '../useMeuHook'

describe('useMeuHook', () => {
  it('retorna estado inicial', () => {
    const { result } = renderHook(() => useMeuHook())
    expect(result.current.value).toBe(0)
  })

  it('atualiza estado', async () => {
    const { result } = renderHook(() => useMeuHook())
    
    result.current.increment()
    
    await waitFor(() => {
      expect(result.current.value).toBe(1)
    })
  })
})
```

## Mocks

### Mock do Leaflet

O Leaflet é mockado no `setup.ts` para evitar problemas nos testes:

```tsx
// Mock do react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, center, zoom }: any) => (
    <div data-testid="map-container">
      <div data-lat={center[0]} data-lng={center[1]} data-zoom={zoom}>
        {children}
      </div>
    </div>
  ),
  // ... outros componentes
}))
```

### Mock do Fetch

Para testar chamadas de API:

```tsx
// Mock do fetch
(globalThis as any).fetch = vi.fn()

// No teste
(fetch as any).mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: 'test' })
})
```

## Boas Práticas

1. **Teste o comportamento, não a implementação**
2. **Use queries acessíveis** (getByRole, getByLabelText, etc.)
3. **Mantenha os testes simples e focados**
4. **Use mocks para dependências externas**
5. **Teste casos de erro e edge cases**

## Cobertura de Testes

Para ver a cobertura de testes:

```bash
npm run test:coverage
```

Isso gerará um relatório mostrando quais partes do código estão sendo testadas.

## Troubleshooting

### Erro de tipos do Vitest

Se você encontrar erros de tipos, certifique-se de que o arquivo `vitest.d.ts` está sendo carregado corretamente.

### Problemas com Leaflet

Se houver problemas com o Leaflet nos testes, verifique se o mock no `setup.ts` está correto.

### Testes assíncronos

Para testes que envolvem operações assíncronas, use `waitFor`:

```tsx
await waitFor(() => {
  expect(screen.getByText('Texto carregado')).toBeInTheDocument()
})
``` 