# CI/CD Pipeline

Este documento descreve o pipeline de Integração Contínua (CI) configurado para o projeto ValeMapa.

## Workflows Disponíveis

### 1. CI Básico (`.github/workflows/ci.yml`)

Workflow simples que executa:
- Linting com ESLint
- Testes unitários
- Build do projeto

### 2. CI Avançado (`.github/workflows/ci-advanced.yml`)

Workflow mais completo que inclui:
- Linting com ESLint
- Testes unitários
- Relatórios de cobertura de código
- Upload de relatórios para Codecov
- Build do projeto
- Upload de artefatos de build

## Triggers

Os workflows são executados automaticamente quando:

- **Push** para as branches `main` ou `develop`
- **Pull Request** para as branches `main` ou `develop`

## Matriz de Testes

Os testes são executados em múltiplas versões do Node.js:
- Node.js 18.x
- Node.js 20.x

## Passos do Pipeline

### 1. Checkout
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

### 2. Setup Node.js
```yaml
- name: Setup Node.js ${{ matrix.node-version }}
  uses: actions/setup-node@v4
  with:
    node-version: ${{ matrix.node-version }}
    cache: 'npm'
```

### 3. Instalação de Dependências
```yaml
- name: Install dependencies
  run: npm ci
```

### 4. Linting
```yaml
- name: Run linting
  run: npm run lint
```

### 5. Testes
```yaml
- name: Run tests
  run: npm run test:run
```

### 6. Cobertura de Código
```yaml
- name: Run tests with coverage
  run: npm run test:coverage
```

### 7. Build
```yaml
- name: Build project
  run: npm run build
```

## Relatórios de Cobertura

O projeto gera relatórios de cobertura de código usando o Vitest com o provider `v8`. Os relatórios incluem:

- **Text**: Saída no console
- **JSON**: Para integração com ferramentas
- **HTML**: Relatório visual
- **LCOV**: Para integração com Codecov

### Configuração de Cobertura

```typescript
// vitest.config.ts
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html', 'lcov'],
  exclude: [
    'node_modules/',
    'src/test/',
    '**/*.d.ts',
    '**/*.config.*',
    'dist/',
  ],
}
```

## Cache

O pipeline utiliza cache para otimizar a performance:

- **Dependências npm**: Cache automático via `actions/setup-node@v4`
- **Artefatos de build**: Retidos por 7 dias

## Monitoramento

### GitHub Actions

Acesse os workflows em: `https://github.com/[seu-usuario]/valeMapa/actions`

### Codecov (Opcional)

Para visualizar relatórios de cobertura detalhados:

1. Conecte seu repositório ao [Codecov](https://codecov.io)
2. Adicione o token do Codecov como secret no GitHub
3. Os relatórios serão enviados automaticamente

## Troubleshooting

### Falhas Comuns

1. **Testes falhando**: Verifique se todos os testes passam localmente
2. **Lint falhando**: Execute `npm run lint` localmente e corrija os erros
3. **Build falhando**: Verifique se o projeto compila localmente com `npm run build`

### Logs

Os logs completos estão disponíveis na aba "Actions" do GitHub, onde você pode:
- Ver o output de cada passo
- Baixar artefatos
- Re-executar workflows

## Próximos Passos

Para expandir o pipeline, considere:

1. **Deploy Automático**: Adicionar deploy para staging/produção
2. **Testes E2E**: Integrar Cypress ou Playwright
3. **Análise de Segurança**: Adicionar dependabot ou Snyk
4. **Performance**: Adicionar testes de performance com Lighthouse CI 