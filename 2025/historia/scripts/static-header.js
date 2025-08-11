/**
 * Static Header Manager
 * Gerencia headers com imagens estáticas localizadas no diretório public
 */
class StaticHeader {
    constructor() {
        this.config = window.STATIC_HEADER_CONFIG || this.getDefaultConfig();
        this.init();
    }

    getDefaultConfig() {
        return {
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
            titles: {
                'hebreus': 'POVO HEBREU',
                'sumerios': 'POVO SUMÉRIO',
                'acadios': 'POVO ACÁDIO',
                'babilonios': 'POVO BABILÔNIO',
                'assirios': 'POVO ASSÍRIO',
                'demo': 'DEMO - HEADER ESTÁTICO',
                'test': 'TESTE - HEADER CORRIGIDO'
            },
            settings: {
                imagePath: 'public/images/headers/',
                defaultImage: 'default-header.svg',
                imageFormat: 'svg'
            }
        };
    }

    init() {
        this.createHeaderElement();
        this.loadBackgroundImage();
    }

    createHeaderElement() {
        // Cria o elemento header se não existir
        let header = document.querySelector('.static-header');
        if (!header) {
            header = document.createElement('header');
            header.className = 'static-header';
            header.innerHTML = `
                <div class="header-background ${this.config.classes[this.getCurrentPage()]}"></div>
                <div class="header-overlay"></div>
                <div class="header-content">
                    <h1 class="header-title"></h1>
                </div>
            `;
            
            // Insere o header dentro do container principal
            const container = document.querySelector('.container');
            if (container) {
                // Insere o header no início do container
                container.insertBefore(header, container.firstChild);
            } else {
                // Fallback: insere no body se não encontrar o container
                const navMenu = document.querySelector('navigation-menu');
                if (navMenu) {
                    navMenu.parentNode.insertBefore(header, navMenu.nextSibling);
                } else {
                    document.body.insertBefore(header, document.body.firstChild);
                }
            }
        }

        // Atualiza o título do header
        const titleElement = header.querySelector('.header-title');
        const pageTitle = this.getPageDisplayTitle();
        titleElement.textContent = pageTitle;
        
        // Remove o header duplicado se existir
        this.removeDuplicateHeader();
    }

    getPageDisplayTitle() {
        const currentPage = this.getCurrentPage();
        return this.config.titles[currentPage] || 'CIVILIZAÇÃO ANTIGA';
    }

    getCurrentPage() {
        // Tenta detectar a página atual de várias formas
        const navMenu = document.querySelector('navigation-menu');
        if (navMenu) {
            return navMenu.getAttribute('current-page');
        }

        // Fallback: detecta pelo nome do arquivo
        const path = window.location.pathname;
        if (path.includes('Hebreus')) return 'hebreus';
        if (path.includes('Sumerios')) return 'sumerios';
        if (path.includes('Acadios')) return 'acadios';
        if (path.includes('Babilonios')) return 'babilonios';
        if (path.includes('Assirios')) return 'assirios';

        return 'hebreus'; // Default
    }

    loadBackgroundImage() {
        const header = document.querySelector('.static-header');
        if (!header) return;

        const backgroundElement = header.querySelector('.header-background');
        const imageUrl = this.getImageUrl();
        this.setBackgroundImage(backgroundElement, imageUrl);
    }

    getImageUrl() {
        const currentPage = this.getCurrentPage();
        const imageName = this.config.images[currentPage] || this.config.settings.defaultImage;
        return `${this.config.settings.imagePath}${imageName}`;
    }

    setBackgroundImage(element, imageUrl) {
        element.style.backgroundImage = `url(${imageUrl})`;
        element.style.opacity = '0';
        
        // Fade in effect
        setTimeout(() => {
            element.style.opacity = '1';
        }, 100);
    }

    removeDuplicateHeader() {
        // Remove o header com título principal duplicado
        const container = document.querySelector('.container');
        if (container) {
            const duplicateHeader = container.querySelector('header:not(.static-header)');
            if (duplicateHeader) {
                duplicateHeader.remove();
            }
        }
    }

    // Método para atualizar o header quando a página muda
    updateHeader() {
        this.createHeaderElement();
        this.loadBackgroundImage();
    }
}

// Inicializa o header quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.staticHeader = new StaticHeader();
});

// Atualiza o header quando o menu de navegação muda
document.addEventListener('menuToggle', () => {
    if (window.staticHeader) {
        window.staticHeader.updateHeader();
    }
});
