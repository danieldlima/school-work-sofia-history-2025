/**
 * Exemplo de configuração da API do Unsplash
 * 
 * Para usar este arquivo:
 * 1. Copie este arquivo para unsplash-config.js
 * 2. Substitua 'YOUR_ACCESS_KEY' pela sua chave real
 * 3. Inclua o arquivo unsplash-config.js antes do unsplash-header.js
 */

// Configuração da API do Unsplash
window.UNSPLASH_CONFIG = {
    accessKey: 'YOUR_ACCESS_KEY', // Substitua pela sua chave real
    apiUrl: 'https://api.unsplash.com/search/photos',
    defaultImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop'
};

// Termos de busca personalizados para cada página
window.UNSPLASH_SEARCH_TERMS = {
    'hebreus': 'ancient hebrew temple jerusalem',
    'sumerios': 'ancient mesopotamia sumerian civilization',
    'acadios': 'ancient akkadian empire mesopotamia',
    'babilonios': 'babylon ancient city hanging gardens',
    'assirios': 'assyrian empire ancient mesopotamia',
    'demo': 'ancient civilization history education',
    'test': 'ancient civilization test'
};

// Títulos de exibição para cada página
window.UNSPLASH_DISPLAY_TITLES = {
    'hebreus': 'POVO HEBREU',
    'sumerios': 'POVO SUMÉRIO',
    'acadios': 'POVO ACÁDIO',
    'babilonios': 'POVO BABILÔNIO',
    'assirios': 'POVO ASSÍRIO',
    'demo': 'DEMO - HEADER UNSplash',
    'test': 'TESTE - HEADER CORRIGIDO'
};

// Configurações adicionais
window.UNSPLASH_OPTIONS = {
    orientation: 'landscape',
    perPage: 1,
    imageWidth: 1200,
    imageHeight: 400,
    fit: 'crop'
};
