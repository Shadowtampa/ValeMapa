# 🍽️ ValeMapa

Um localizador de lugares que aceitam Vale Alimentação, desenvolvido como uma aplicação serverless com interface moderna e responsiva.

## ✨ Funcionalidades

- **Mapa Interativo**: Visualização de lugares em um mapa com pins coloridos
- **Busca Inteligente**: Pesquisa por nome, endereço ou descrição dos estabelecimentos
- **Filtros por Categoria**: Filtre por restaurantes, padarias, supermercados, cafés e pizzarias
- **Detalhes Completos**: Informações detalhadas de cada lugar incluindo:
  - Endereço completo
  - Telefone de contato
  - Horário de funcionamento
  - Tipos de vale aceitos
  - Descrição do estabelecimento
- **Ações Rápidas**: Botões para abrir no Google Maps e fazer ligação
- **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Canvas API** - Renderização do mapa
- **CSS3** - Estilos modernos com gradientes e glassmorphism

## 📁 Estrutura do Projeto

```
valeMapa/
├── public/
│   └── places.json          # Dados dos lugares (mapeamento manual)
├── src/
│   ├── components/
│   │   ├── Map.tsx          # Componente do mapa interativo
│   │   ├── PlaceDetails.tsx # Detalhes do lugar selecionado
│   │   └── SearchFilters.tsx # Filtros e busca
│   ├── hooks/
│   │   └── usePlaces.ts     # Hook para gerenciar dados dos lugares
│   ├── types/
│   │   └── Place.ts         # Tipos TypeScript
│   ├── App.tsx              # Componente principal
│   ├── App.css              # Estilos da aplicação
│   └── main.tsx             # Ponto de entrada
└── package.json
```

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd valeMapa

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### Build para Produção
```bash
npm run build
npm run preview
```

## 📊 Estrutura dos Dados

Os lugares são armazenados no arquivo `public/places.json` com a seguinte estrutura:

```json
{
  "places": [
    {
      "id": 1,
      "name": "Nome do Estabelecimento",
      "address": "Endereço completo",
      "city": "Cidade",
      "state": "Estado",
      "coordinates": {
        "lat": -23.5505,
        "lng": -46.6333
      },
      "category": "restaurante|padaria|supermercado|café|pizzaria",
      "description": "Descrição do estabelecimento",
      "acceptsVale": true,
      "valeType": ["alimentação", "refeição"],
      "phone": "(11) 9999-9999",
      "hours": "Horário de funcionamento"
    }
  ]
}
```

## 🎨 Características da Interface

- **Design Moderno**: Interface com glassmorphism e gradientes
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Acessível**: Cores contrastantes e navegação por teclado
- **Performance**: Renderização otimizada com Canvas API
- **UX Intuitiva**: Feedback visual e interações suaves

## 🔧 Personalização

### Adicionando Novos Lugares

1. Abra o arquivo `public/places.json`
2. Adicione um novo objeto seguindo a estrutura acima
3. Use coordenadas precisas (lat/lng) para posicionamento correto no mapa
4. Categorize adequadamente o estabelecimento

### Modificando Categorias

Para adicionar novas categorias:

1. Atualize o tipo `Category` em `src/types/Place.ts`
2. Adicione a nova categoria no componente `SearchFilters.tsx`
3. Atualize os dados em `places.json`

### Customizando Estilos

Os estilos principais estão em `src/App.css` e podem ser facilmente modificados para:
- Alterar cores do tema
- Modificar layout
- Ajustar responsividade
- Personalizar animações

## 🌟 Funcionalidades Avançadas

- **Filtros Combinados**: Busca e filtro de categoria funcionam em conjunto
- **Tooltips Interativos**: Informações aparecem ao passar o mouse sobre os pins
- **Estados de Loading**: Feedback visual durante carregamento
- **Tratamento de Erros**: Mensagens amigáveis em caso de problemas
- **Estatísticas em Tempo Real**: Contador de lugares encontrados

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contribuindo

O ValeMapa é um projeto open source e adoramos receber contribuições da comunidade! 

### 📚 Guias de Contribuição

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guia completo de como contribuir
- **[docs/ADICIONAR_LOCALIZACOES.md](docs/ADICIONAR_LOCALIZACOES.md)** - Passo a passo para adicionar localizações

### 🚀 Como Começar

1. **Fork** o projeto
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature
4. **Faça suas alterações**
5. **Teste** localmente
6. **Commit** e **push** suas mudanças
7. **Abra um Pull Request**

### 📍 Adicionando Localizações

Para adicionar novos estabelecimentos que aceitam Vale Alimentação:

1. Siga o [guia detalhado](docs/ADICIONAR_LOCALIZACOES.md)
2. Use o [template de issue](.github/ISSUE_TEMPLATE/new_location.md) para reportar
3. Ou faça diretamente via Pull Request

### 🐛 Reportando Bugs

Use o [template de bug report](.github/ISSUE_TEMPLATE/bug_report.md) para reportar problemas.

### 💡 Sugerindo Melhorias

Use o [template de feature request](.github/ISSUE_TEMPLATE/feature_request.md) para sugerir novas funcionalidades.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para facilitar a busca por lugares que aceitam Vale Alimentação**
