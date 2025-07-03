# 📍 Guia Completo: Como Adicionar Localizações ao ValeMapa

Este guia detalhado mostra exatamente como adicionar novos estabelecimentos ao ValeMapa, seguindo o processo que você já utiliza.

## 🎯 Objetivo

Adicionar estabelecimentos que aceitam Vale Alimentação ao mapa, fornecendo informações precisas e úteis para os usuários.

## 📋 Pré-requisitos

- Acesso ao repositório do ValeMapa
- Editor de código (VS Code, Sublime, etc.)
- Navegador web
- Conhecimento básico de JSON

## 🚀 Processo Passo a Passo

### Passo 1: Preparar o Ambiente

1. **Clone o repositório** (se ainda não fez):
   ```bash
   git clone https://github.com/seu-usuario/valeMapa.git
   cd valeMapa
   ```

2. **Crie uma nova branch**:
   ```bash
   git checkout -b feature/nova-localizacao
   ```

3. **Abra o arquivo de dados**:
   - Navegue até `public/places.json`
   - Abra no seu editor de código

### Passo 2: Identificar o Próximo ID

1. **Localize o último ID** no arquivo `places.json`
2. **Adicione 1** ao último ID para criar um novo ID único
3. **Exemplo**: Se o último ID é 13, o novo será 14

### Passo 3: Coletar Dados do Estabelecimento

#### 3.1 Informações Básicas
- **Nome**: Nome oficial do estabelecimento
- **Endereço**: Endereço completo (rua, número, bairro, cidade, estado, CEP)
- **Telefone**: Formato (XX) XXXX-XXXX
- **Horário**: Horário de funcionamento detalhado
- **Descrição**: Breve descrição (opcional)

#### 3.2 Categorização
Escolha uma das categorias disponíveis:
- `restaurante` - Restaurantes em geral
- `padaria` - Padarias e panificadoras  
- `supermercado` - Supermercados e mercados
- `café` - Cafeterias e lanchonetes
- `pizzaria` - Pizzarias
- `sorveteria` - Sorveterias e gelaterias

#### 3.3 Tipos de Vale
Selecione os tipos aceitos:
- `alimentação` - Vale alimentação
- `refeição` - Vale refeição

#### 3.4 Marcas de Vale
Selecione as marcas aceitas:
- `flash` - Flash Benefícios
- `ifood beneficios` - iFood Benefícios
- `sodexo` - Sodexo

### Passo 4: Obter Coordenadas (Google Maps)

#### 4.1 Acessar Google Maps
1. Abra [Google Maps](https://maps.google.com)
2. No campo de busca, digite o nome do estabelecimento
3. Pressione Enter

#### 4.2 Localizar o Pino
1. **Procure pelo pino vermelho** que marca a localização
2. **Certifique-se** de que é o estabelecimento correto
3. **Verifique** se o endereço confere

#### 4.3 Extrair Coordenadas
1. **Clique com o botão direito** no pino vermelho
2. **No menu que aparece**, as coordenadas estarão no topo
3. **Formato**: `-23.5505, -46.6333` (latitude, longitude)
4. **Copie** as coordenadas

### Passo 5: Criar o Objeto JSON

#### 5.1 Estrutura Base
```json
{
  "id": [SEU_NOVO_ID],
  "name": "Nome do Estabelecimento",
  "address": "Endereço Completo",
  "city": "Nome da Cidade",
  "state": "UF",
  "coordinates": {
    "lat": [LATITUDE],
    "lng": [LONGITUDE]
  },
  "category": "[CATEGORIA]",
  "description": "Descrição opcional",
  "acceptsVale": true,
  "valeType": ["tipo1", "tipo2"],
  "valeBrands": ["marca1", "marca2"],
  "phone": "(XX) XXXX-XXXX",
  "hours": "Horário de funcionamento"
}
```

#### 5.2 Exemplo Prático
```json
{
  "id": 14,
  "name": "Restaurante Sabor da Terra",
  "address": "Rua das Acácias, 789 - Jardim América, São Paulo - SP, 01234-567",
  "city": "São Paulo",
  "state": "SP",
  "coordinates": {
    "lat": -23.5678,
    "lng": -46.6789
  },
  "category": "restaurante",
  "description": "Restaurante familiar com pratos típicos da culinária brasileira",
  "acceptsVale": true,
  "valeType": ["alimentação", "refeição"],
  "valeBrands": ["flash", "ifood beneficios"],
  "phone": "(11) 3456-7890",
  "hours": "Seg-Sex: 11h-15h e 18h-22h, Sáb: 11h-23h, Dom: 12h-21h"
}
```

### Passo 6: Adicionar ao Arquivo

#### 6.1 Localizar a Posição
1. **Abra** `public/places.json`
2. **Navegue** até o final do array `places`
3. **Localize** o último objeto (antes do `]` de fechamento)

#### 6.2 Inserir o Novo Objeto
1. **Adicione uma vírgula** após o último objeto
2. **Cole** seu novo objeto JSON
3. **Verifique** a formatação e vírgulas

#### 6.3 Exemplo de Inserção
```json
// ... objetos anteriores ...
{
  "id": 13,
  "name": "Gelateria Luci",
  // ... dados do último objeto ...
},
{
  "id": 14,
  "name": "Restaurante Sabor da Terra",
  // ... SEU NOVO OBJETO AQUI ...
}
```

### Passo 7: Validar o JSON

#### 7.1 Verificar Sintaxe
1. **Use um validador JSON** online (jsonlint.com)
2. **Ou teste no VS Code** (deve destacar erros)
3. **Verifique** se todas as vírgulas estão corretas

#### 7.2 Verificar Dados
- [ ] ID é único
- [ ] Coordenadas estão corretas
- [ ] Endereço está completo
- [ ] Categoria é válida
- [ ] Tipos de vale são válidos

### Passo 8: Testar Localmente

#### 8.1 Executar o Projeto
```bash
npm run dev
```

#### 8.2 Verificar no Mapa
1. **Abra** o navegador no endereço local
2. **Procure** pelo novo estabelecimento
3. **Clique** no pin para ver os detalhes
4. **Verifique** se todas as informações estão corretas

### Passo 9: Commit e Push

#### 9.1 Adicionar Mudanças
```bash
git add public/places.json
```

#### 9.2 Fazer Commit
```bash
git commit -m "feat: adiciona [Nome do Estabelecimento] - [Cidade/UF]"
```

**Exemplo**:
```bash
git commit -m "feat: adiciona Restaurante Sabor da Terra - São Paulo/SP"
```

#### 9.3 Enviar para o Repositório
```bash
git push origin feature/nova-localizacao
```

### Passo 10: Criar Pull Request

#### 10.1 Acessar GitHub
1. **Vá** para o repositório no GitHub
2. **Clique** em "Compare & pull request" (aparece automaticamente)

#### 10.2 Descrever Mudanças
```markdown
## 📍 Nova Localização Adicionada

**Estabelecimento**: [Nome]
**Categoria**: [Categoria]
**Localização**: [Cidade/UF]
**Tipos de Vale**: [Tipos aceitos]

### Informações Adicionadas:
- ✅ Nome e endereço completos
- ✅ Coordenadas precisas do Google Maps
- ✅ Telefone e horário de funcionamento
- ✅ Categorização correta
- ✅ Tipos de vale aceitos

### Testado:
- [x] Validação JSON
- [x] Teste local
- [x] Verificação no mapa
```

## ⚠️ Regras Importantes

### ✅ O que Fazer
- **Sempre** use IDs únicos
- **Sempre** verifique as coordenadas no Google Maps
- **Sempre** teste localmente antes do commit
- **Sempre** use dados precisos e atualizados
- **Sempre** siga o formato JSON estabelecido

### ❌ O que Não Fazer
- **Nunca** duplique IDs
- **Nunca** use coordenadas aproximadas
- **Nunca** adicione dados sem verificar
- **Nunca** quebre a formatação JSON
- **Nunca** commite sem testar

## 🔧 Dicas e Truques

### Validação Rápida
```bash
# Validar JSON via terminal
node -e "console.log(JSON.parse(require('fs').readFileSync('public/places.json', 'utf8')))"
```

### Encontrar Último ID
```bash
# Via terminal (Linux/Mac)
grep -o '"id": [0-9]*' public/places.json | tail -1
```

### Formatação Automática
- **VS Code**: Ctrl+Shift+P → "Format Document"
- **Online**: jsonformatter.org

## 🆘 Solução de Problemas

### Erro de JSON
- **Verifique** vírgulas extras ou faltantes
- **Use** um validador JSON online
- **Teste** no VS Code para highlights de erro

### Pin Não Aparece
- **Verifique** se as coordenadas estão corretas
- **Confirme** se o JSON está válido
- **Teste** com coordenadas conhecidas

### Dados Incorretos
- **Volte** ao Google Maps e revalide
- **Verifique** se não há erros de digitação
- **Confirme** se o estabelecimento realmente aceita vale

## 📞 Suporte

Se encontrar problemas:
1. **Verifique** este guia novamente
2. **Consulte** o CONTRIBUTING.md
3. **Abra uma issue** no GitHub
4. **Pergunte** na comunidade

---

**🎉 Parabéns! Você acabou de contribuir para tornar o ValeMapa ainda mais útil para a comunidade!** 