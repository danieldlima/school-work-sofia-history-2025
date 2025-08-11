/**
 * Unsplash Header Manager
 * Gerencia headers com imagens do Unsplash baseadas no título da página
 */
class UnsplashHeader {
    constructor() {
        // Usa configuração externa se disponível, senão usa valores padrão
        const config = window.UNSPLASH_CONFIG || {};
        this.unsplashAccessKey = config.accessKey || 'YOUR_UNSPLASH_ACCESS_KEY';
        this.unsplashApiUrl = config.apiUrl || 'https://api.unsplash.com/search/photos';
        this.defaultImageUrl = config.defaultImageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop';
        this.init();
    }

    init() {
        this.createHeaderElement();
        this.loadBackgroundImage();
    }

    createHeaderElement() {
        // Cria o elemento header se não existir
        let header = document.querySelector('.unsplash-header');
        if (!header) {
            header = document.createElement('header');
            header.className = 'unsplash-header';
            header.innerHTML = `
                <div class="header-background"></div>
                <div class="header-overlay"></div>
                <div class="header-content">
                    <h1 class="header-title"></h1>
                </div>
                <div class="photo-attribution">
                    <span class="attribution-text">
                        Foto por 
                            <a href="#" target="_blank" rel="noopener" title="Fotógrafo" class="unsplash-photographer-link">
                                Fotógrafo
                            </a> 
                        no 
                        <a href="https://unsplash.com" target="_blank" rel="noopener" class="unsplash-link">
                            Unsplash
                        </a>
                    </span>
                    <span class="attribution-text">
                        <a href="https://unsplash.com/license" target="_blank" rel="noopener" class="unsplash-license-link">
                            Licença
                        </a>
                    </span>
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
    
    removeDuplicateHeader() {
        // Remove o header com título principal duplicado
        const container = document.querySelector('.container');
        if (container) {
            const duplicateHeader = container.querySelector('header:not(.unsplash-header)');
            if (duplicateHeader) {
                duplicateHeader.remove();
            }
        }
    }

    getPageTitle() {
        // Usa termos de busca externos se disponíveis, senão usa valores padrão
        const searchTerms = window.UNSPLASH_SEARCH_TERMS || {
            'hebreus': 'ancient hebrew temple jerusalem',
            'sumerios': 'ancient mesopotamia sumerian civilization',
            'acadios': 'ancient akkadian empire mesopotamia',
            'babilonios': 'babylon ancient city hanging gardens',
            'assirios': 'assyrian empire ancient mesopotamia',
            'demo': 'ancient civilization history education',
            'test': 'ancient civilization test'
        };

        // Detecta a página atual baseada no URL ou atributo do menu
        const currentPage = this.getCurrentPage();
        return searchTerms[currentPage] || 'ancient civilization history';
    }
    
    getPageDisplayTitle() {
        // Usa títulos de exibição externos se disponíveis, senão usa valores padrão
        const displayTitles = window.UNSPLASH_DISPLAY_TITLES || {
            'hebreus': 'POVO HEBREU',
            'sumerios': 'POVO SUMÉRIO',
            'acadios': 'POVO ACÁDIO',
            'babilonios': 'POVO BABILÔNIO',
            'assirios': 'POVO ASSÍRIO',
            'demo': 'DEMO - HEADER UNSplash',
            'test': 'TESTE - HEADER CORRIGIDO'
        };

        const currentPage = this.getCurrentPage();
        return displayTitles[currentPage] || 'CIVILIZAÇÃO ANTIGA';
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

    async loadBackgroundImage() {
        const header = document.querySelector('.unsplash-header');
        if (!header) return;

        const backgroundElement = header.querySelector('.header-background');
        const searchTerm = this.getPageTitle();

        try {
            // Se não tiver chave da API, usa imagem padrão
            if (!this.unsplashAccessKey || this.unsplashAccessKey === 'YOUR_UNSPLASH_ACCESS_KEY') {
                this.setBackgroundImage(backgroundElement, this.defaultImageUrl);
                return;
            }

            // Busca imagem no Unsplash
            const imageUrl = await this.searchUnsplashImage(searchTerm);
            this.setBackgroundImage(backgroundElement, imageUrl);

        } catch (error) {
            console.warn('Erro ao carregar imagem do Unsplash:', error);
            this.setBackgroundImage(backgroundElement, this.defaultImageUrl);
        }
    }

    async searchUnsplashImage(query) {
        const url = `${this.unsplashApiUrl}?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${this.unsplashAccessKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const photo = data.results[0];
            this.updatePhotoAttribution(photo);
            return `${photo.urls.regular}?w=1200&h=400&fit=crop`;
        }

        throw new Error('Nenhuma imagem encontrada');
    }

    updatePhotoAttribution(photo) {
        const attributionElement = document.querySelector('.photo-attribution');
        const photographerLink = attributionElement?.querySelector('.photographer-link');
        
        if (attributionElement && photographerLink) {
            photographerLink.textContent = photo.user.name;
            photographerLink.href = photo.user.links.html;
        }
    }

    setBackgroundImage(element, imageUrl) {
        element.style.backgroundImage = `url(${imageUrl})`;
        element.style.opacity = '0';
        
        // Fade in effect
        setTimeout(() => {
            element.style.opacity = '1';
        }, 100);
    }

    // Método para atualizar o header quando a página muda
    updateHeader() {
        this.createHeaderElement();
        this.loadBackgroundImage();
    }
}

// Inicializa o header quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.unsplashHeader = new UnsplashHeader();
});

// Atualiza o header quando o menu de navegação muda
document.addEventListener('menuToggle', () => {
    if (window.unsplashHeader) {
        window.unsplashHeader.updateHeader();
    }
});
