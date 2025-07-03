# 🤝 Guia de Contribuição - ValeMapa

Obrigado por considerar contribuir com o ValeMapa! Este projeto existe para ajudar pessoas a encontrarem lugares que aceitam Vale Alimentação, e sua contribuição é muito importante para nós.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Adicionando Novas Localizações](#adicionando-novas-localizações)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)
- [Desenvolvimento](#desenvolvimento)
- [Código de Conduta](#código-de-conduta)

## 🚀 Como Contribuir

### 1. Fork e Clone

1. Faça um fork do repositório
2. Clone seu fork localmente:
   ```bash
   git clone https://github.com/seu-usuario/valeMapa.git
   cd valeMapa
   ```

### 2. Configuração do Ambiente

```bash
# Instale as dependências
npm install

# Execute o projeto localmente
npm run dev
```

### 3. Crie uma Branch

```bash
git checkout -b feature/nova-localizacao
# ou
git checkout -b fix/correcao-bug
```

### 4. Faça suas Alterações

- Adicione novas localizações seguindo o [guia abaixo](#adicionando-novas-localizações)
- Corrija bugs
- Melhore a documentação
- Adicione novas funcionalidades

### 5. Commit e Push

```bash
git add .
git commit -m "feat: adiciona nova localização - Nome do Estabelecimento"
git push origin feature/nova-localizacao
```

### 6. Abra um Pull Request

1. Vá para o repositório original no GitHub
2. Clique em "New Pull Request"
3. Selecione sua branch
4. Descreva suas mudanças detalhadamente
5. Aguarde a revisão

## 📍 Adicionando Novas Localizações

### Passo a Passo Detalhado

#### 1. **Preparação**
- Abra o arquivo `public/places.json`
- Identifique o último ID usado (para criar um novo ID único)

#### 2. **Coleta de Dados**
- **Nome do estabelecimento**: Nome oficial e completo
- **Endereço**: Endereço completo incluindo bairro e CEP
- **Cidade e Estado**: Abreviação do estado (SP, RJ, PA, etc.)
- **Telefone**: Formato (XX) XXXX-XXXX
- **Horário de funcionamento**: Formato claro e legível
- **Descrição**: Breve descrição do estabelecimento (opcional)

#### 3. **Obtenção das Coordenadas**
1. Acesse [Google Maps](https://maps.google.com)
2. Pesquise pelo nome do estabelecimento
3. Clique com o botão direito no **pino vermelho** do Google Maps
4. As coordenadas aparecerão no topo do menu
5. Copie latitude e longitude

#### 4. **Estrutura do JSON**
```json
{
  "id": [PRÓXIMO_ID_DISPONÍVEL],
  "name": "Nome do Estabelecimento",
  "address": "Endereço completo",
  "city": "Nome da Cidade",
  "state": "UF",
  "coordinates": {
    "lat": [LATITUDE],
    "lng": [LONGITUDE]
  },
  "category": "restaurante|padaria|supermercado|café|pizzaria|sorveteria",
  "description": "Descrição opcional do estabelecimento",
  "acceptsVale": true,
  "valeType": ["alimentação", "refeição"],
  "valeBrands": ["flash", "ifood beneficios", "sodexo"],
  "phone": "(XX) XXXX-XXXX",
  "hours": "Horário de funcionamento"
}
```

#### 5. **Categorias Disponíveis**
- `restaurante` - Restaurantes em geral
- `padaria` - Padarias e panificadoras
- `supermercado` - Supermercados e mercados
- `café` - Cafeterias e lanchonetes
- `pizzaria` - Pizzarias
- `sorveteria` - Sorveterias e gelaterias

#### 6. **Tipos de Vale**
- `alimentação` - Vale alimentação
- `refeição` - Vale refeição

#### 7. **Marcas de Vale**
- `flash` - Flash Benefícios
- `ifood beneficios` - iFood Benefícios
- `sodexo` - Sodexo

### 📝 Exemplo Prático

```json
{
  "id": 14,
  "name": "Restaurante Sabor Caseiro",
  "address": "Rua das Palmeiras, 456 - Jardim Botânico, São Paulo - SP, 01234-567",
  "city": "São Paulo",
  "state": "SP",
  "coordinates": {
    "lat": -23.5678,
    "lng": -46.6789
  },
  "category": "restaurante",
  "description": "Restaurante familiar com pratos da culinária brasileira",
  "acceptsVale": true,
  "valeType": ["alimentação", "refeição"],
  "valeBrands": ["flash", "ifood beneficios"],
  "phone": "(11) 3456-7890",
  "hours": "Seg-Sex: 11h-15h e 18h-22h, Sáb: 11h-23h, Dom: 12h-21h"
}
```

### ⚠️ Regras Importantes

1. **IDs Únicos**: Sempre use o próximo ID disponível
2. **Coordenadas Precisas**: Use as coordenadas exatas do Google Maps
3. **Dados Completos**: Preencha todos os campos obrigatórios
4. **Formatação**: Mantenha a formatação JSON consistente
5. **Verificação**: Teste localmente antes de fazer commit

## 🐛 Reportando Bugs

### Como Reportar

1. **Verifique se já existe uma issue** sobre o problema
2. **Crie uma nova issue** com:
   - Título descritivo
   - Descrição detalhada do bug
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots (se aplicável)
   - Informações do sistema (navegador, OS)

### Template de Bug Report

```markdown
## 🐛 Descrição do Bug

[Descreva o bug de forma clara e concisa]

## 🔄 Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado

[Descreva o que deveria acontecer]

## ❌ Comportamento Atual

[Descreva o que está acontecendo]

## 📱 Informações Adicionais

- Navegador: [ex: Chrome 120]
- Sistema Operacional: [ex: Windows 11]
- Versão do ValeMapa: [se aplicável]
```

## 💡 Sugerindo Melhorias

### Como Sugerir

1. **Verifique se já existe uma sugestão similar**
2. **Crie uma issue** com:
   - Título descritivo
   - Descrição detalhada da melhoria
   - Justificativa para a mudança
   - Exemplos de implementação (se possível)

### Template de Feature Request

```markdown
## 💡 Sugestão de Melhoria

[Descreva a melhoria de forma clara]

## 🎯 Problema que Resolve

[Explique qual problema esta melhoria resolve]

## 💭 Solução Proposta

[Descreva como você imagina a implementação]

## 🔍 Alternativas Consideradas

[Liste outras soluções que você considerou]

## 📋 Informações Adicionais

[Qualquer informação adicional relevante]
```

## 🛠️ Desenvolvimento

### Estrutura do Projeto

```
valeMapa/
├── public/
│   └── places.json          # Dados dos lugares
├── src/
│   ├── components/          # Componentes React
│   ├── hooks/              # Custom hooks
│   ├── types/              # Definições TypeScript
│   └── App.tsx             # Componente principal
└── docs/                   # Documentação
```

### Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento local
npm run build        # Build para produção
npm run preview      # Preview do build
npm run test         # Executar testes
npm run lint         # Verificar código
```

### Padrões de Código

- **TypeScript**: Use tipagem forte
- **ESLint**: Siga as regras de linting
- **Prettier**: Mantenha formatação consistente
- **Commits**: Use conventional commits

### Conventional Commits

```bash
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção
```

## 📞 Código de Conduta

### Nossos Compromissos

- **Ambiente Inclusivo**: Todos são bem-vindos
- **Respeito Mútuo**: Trate todos com respeito
- **Colaboração**: Trabalhe em conjunto
- **Aprendizado**: Compartilhe conhecimento

### Nossos Padrões

**Comportamento Aceitável:**
- Usar linguagem inclusiva
- Respeitar diferentes pontos de vista
- Aceitar críticas construtivas
- Focar no que é melhor para a comunidade

**Comportamento Inaceitável:**
- Linguagem ou imagens sexualizadas
- Trolling ou comentários insultuosos
- Assédio público ou privado
- Publicar informações privadas de outros

### Como Reportar

Se você testemunhar ou sofrer comportamento inaceitável, entre em contato através de uma issue privada ou email.

## 🎉 Reconhecimento

Todas as contribuições são reconhecidas no README do projeto. Contribuidores ativos podem ser convidados para se tornarem mantenedores.

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

---

**Obrigado por contribuir para tornar o ValeMapa ainda melhor! 🍽️✨** 