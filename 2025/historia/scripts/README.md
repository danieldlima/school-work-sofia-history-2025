# Configuração do Header com Imagens do Unsplash

Este projeto inclui um sistema de header dinâmico que carrega imagens do Unsplash baseadas no título de cada página.

## Configuração da API do Unsplash

### 1. Obter uma chave de API

1. Acesse [Unsplash Developers](https://unsplash.com/developers)
2. Crie uma conta ou faça login
3. Crie uma nova aplicação
4. Copie sua `Access Key`

### 2. Configurar a chave

#### Opção A: Configuração direta no arquivo
Abra o arquivo `scripts/unsplash-header.js` e substitua:

```javascript
this.unsplashAccessKey = 'YOUR_UNSPLASH_ACCESS_KEY';
```

Pela sua chave real:

```javascript
this.unsplashAccessKey = 'sua_chave_aqui';
```

#### Opção B: Arquivo de configuração separado (Recomendado)
1. Copie o arquivo `unsplash-config-example.js` para `unsplash-config.js`
2. Edite `unsplash-config.js` e substitua `'YOUR_ACCESS_KEY'` pela sua chave real
3. Inclua o arquivo de configuração nas páginas HTML antes do `unsplash-header.js`:

```html
<script src="scripts/unsplash-config.js"></script>
<script src="scripts/unsplash-header.js"></script>
```

### 3. Termos de busca personalizados

O sistema mapeia automaticamente cada página para termos de busca relevantes:

- **Hebreus**: "ancient hebrew temple jerusalem"
- **Sumérios**: "ancient mesopotamia sumerian civilization"
- **Acádios**: "ancient akkadian empire mesopotamia"
- **Babilônios**: "babylon ancient city hanging gardens"
- **Assírios**: "assyrian empire ancient mesopotamia"

### 4. Funcionamento sem API

Se você não configurar a chave da API, o sistema usará uma imagem padrão do Unsplash.

## Estrutura dos arquivos

- `scripts/unsplash-header.js` - Gerenciador principal do header
- `styles/common-styles.css` - Estilos do header
- Todas as páginas HTML incluem o script automaticamente

## Personalização

### Alterar termos de busca

Edite o método `getPageTitle()` no arquivo `unsplash-header.js`:

```javascript
getPageTitle() {
    const pageTitles = {
        'hebreus': 'seu_termo_aqui',
        'sumerios': 'seu_termo_aqui',
        // ...
    };
    // ...
}
```

### Alterar estilos do header

Edite as classes CSS no arquivo `styles/common-styles.css`:

- `.unsplash-header` - Container principal
- `.header-background` - Imagem de fundo
- `.header-overlay` - Overlay gradiente
- `.header-title` - Título do header

## Limitações da API

- **Rate Limit**: 50 requests por hora para aplicações não verificadas
- **Rate Limit**: 5000 requests por hora para aplicações verificadas
- **Atribuição**: As imagens devem incluir atribuição ao fotógrafo (já incluída automaticamente)

## Solução de problemas

### Imagem não carrega
1. Verifique se a chave da API está correta
2. Verifique se não excedeu o limite de requisições
3. Verifique a conexão com a internet

### Header não aparece
1. Verifique se o script `unsplash-header.js` está incluído na página
2. Verifique se não há erros no console do navegador

### Performance
- As imagens são carregadas apenas uma vez por página
- O sistema inclui fallback para imagens padrão
- As imagens são otimizadas automaticamente pelo Unsplash
