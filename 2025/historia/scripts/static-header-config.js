/**
 * Configuração para Header com Imagens Estáticas
 * 
 * Este arquivo substitui a API do Unsplash por imagens estáticas
 * localizadas no diretório public/images/headers/
 */

// Configuração das imagens de header para cada página
window.STATIC_HEADER_CONFIG = {
    // Imagens de header para cada página
    images: {
        'acadios': 'header-bg--acadios.jpg',
        'assirios': 'header-bg--assirios.jpg',
        'babilonios': 'header-bg--babilonios.jpg',
        'hebreus': 'header-bg--hebreus.jpg',
        'sumerios': 'header-bg--sumerios.jpg',
        'demo': 'default-header.svg',
        'test': 'default-header.svg'
    },

    classes: {
        'acadios': 'header-bg--acadios',
        'assirios': 'header-bg--assirios',
        'babilonios': 'header-bg--babilonios',
        'hebreus': 'header-bg--hebreus',
        'sumerios': 'header-bg--sumerios',
    },
    
    // Títulos de exibição para cada página
    titles: {
        'hebreus': 'POVO HEBREU',
        'sumerios': 'POVO SUMÉRIO',
        'acadios': 'POVO ACÁDIO',
        'babilonios': 'POVO BABILÔNIO',
        'assirios': 'POVO ASSÍRIO',
        'demo': 'DEMO - HEADER ESTÁTICO',
        'test': 'TESTE - HEADER CORRIGIDO'
    },
    
    // Configurações gerais
    settings: {
        imagePath: 'public/images/headers/',
        defaultImage: 'default-header.svg',
        imageFormat: 'svg'
    }
};
