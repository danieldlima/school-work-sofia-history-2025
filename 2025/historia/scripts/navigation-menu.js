/**
 * Navigation Menu Web Component
 * Componente reutilizável para o menu de navegação entre mapas mentais
 */
class NavigationMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentPage = this.getAttribute('current-page') || 'hebreus';
        this.isCollapsed = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.restoreState();
    }

    static get observedAttributes() {
        return ['current-page'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'current-page' && oldValue !== newValue) {
            this.currentPage = newValue;
            this.updateActiveLink();
        }
    }

    render() {
        const navigationData = [
            { id: 'hebreus', title: 'Hebreus', icon: '🏺', file: 'Hebreus.html' },
            { id: 'sumerios', title: 'Sumérios', icon: '🏛️', file: 'Sumerios.html' },
            { id: 'acadios', title: 'Acádios', icon: '⚔️', file: 'Acadios.html' },
            { id: 'babilonios', title: 'Babilônios', icon: '🏺', file: 'Babilonios.html' },
            { id: 'assirios', title: 'Assírios', icon: '🛡️', file: 'Assirios.html' }
        ];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                }

                .nav-menu {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 10px 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    transition: transform 300ms ease-in-out;
                }

                .nav-menu.collapsed {
                    transform: translateY(-100%);
                    opacity: 0;
                }

                .nav-menu a {
                    color: white;
                    text-decoration: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 500;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    font-family: Arial, sans-serif;
                }

                .nav-menu a:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border-color: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }

                .nav-menu a.active {
                    background: rgba(255, 255, 255, 0.3);
                    border-color: rgba(255, 255, 255, 0.5);
                    font-weight: bold;
                }

                .toggle-button {
                    position: fixed;
                    top: 10px;
                    right: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 20px;
                    cursor: pointer;
                    z-index: 1001;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    font-family: inherit;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }

                .toggle-button:hover {
                    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                }

                .toggle-button.collapsed {
                    top: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-color: rgba(255, 255, 255, 0.5);
                }

                @media (max-width: 768px) {
                    .nav-menu {
                        gap: 10px;
                        padding: 8px 15px;
                    }
                    
                    .nav-menu a {
                        padding: 6px 12px;
                        font-size: 12px;
                    }
                }
            </style>
            
            <nav class="nav-menu" role="navigation" aria-label="Navegação entre mapas mentais">
                ${navigationData.map(item => `
                    <a href="${item.file}" 
                       class="${item.id === this.currentPage ? 'active' : ''}"
                       ${item.id === this.currentPage ? 'aria-current="page"' : ''}
                       data-page="${item.id}">
                        ${item.icon} ${item.title}
                    </a>
                `).join('')}
            </nav>
            
            <button class="toggle-button" aria-label="Alternar menu de navegação" aria-expanded="true">
                ☰
            </button>
        `;
    }

    setupEventListeners() {
        const navMenu = this.shadowRoot.querySelector('.nav-menu');
        const toggleButton = this.shadowRoot.querySelector('.toggle-button');

        // Toggle do botão
        toggleButton.addEventListener('click', () => this.toggleMenu());

        // Recolher menu ao clicar em qualquer link
        const links = this.shadowRoot.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Recolhe o menu se estiver expandido
                if (!this.isCollapsed) {
                    this.toggleMenu();
                }
            });
        });

        // Tecla ESC para recolher
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.isCollapsed) {
                this.toggleMenu();
            }
        });

        // Auto-recolher em telas pequenas
        if (window.innerWidth <= 768) {
            window.addEventListener('scroll', () => {
                if (!this.isCollapsed && window.scrollY > 100) {
                    this.toggleMenu();
                }
            });
        }

        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
        
        const navMenu = this.shadowRoot.querySelector('.nav-menu');
        const toggleButton = this.shadowRoot.querySelector('.toggle-button');
        
        // Atualiza classes
        navMenu.classList.toggle('collapsed', this.isCollapsed);
        toggleButton.classList.toggle('collapsed', this.isCollapsed);
        document.body.classList.toggle('menu-collapsed', this.isCollapsed);
        
        // Atualiza aria-expanded
        toggleButton.setAttribute('aria-expanded', !this.isCollapsed);
        
        // Atualiza ícone
        toggleButton.innerHTML = this.isCollapsed ? '☰' : '✕';
        
        // Salva estado
        this.saveState();
        
        // Dispara evento customizado
        this.dispatchEvent(new CustomEvent('menuToggle', {
            detail: { isCollapsed: this.isCollapsed },
            bubbles: true
        }));
    }

    updateActiveLink() {
        const links = this.shadowRoot.querySelectorAll('a');
        links.forEach(link => {
            const pageId = link.getAttribute('data-page');
            if (pageId === this.currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    saveState() {
        try {
            localStorage.setItem('navMenuCollapsed', this.isCollapsed.toString());
        } catch (e) {
            console.warn('Não foi possível salvar estado do menu:', e);
        }
    }

    restoreState() {
        try {
            const saved = localStorage.getItem('navMenuCollapsed');
            if (saved !== null) {
                this.isCollapsed = saved === 'true';
                
                if (this.isCollapsed) {
                    const navMenu = this.shadowRoot.querySelector('.nav-menu');
                    const toggleButton = this.shadowRoot.querySelector('.toggle-button');
                    
                    navMenu.classList.add('collapsed');
                    toggleButton.classList.add('collapsed');
                    document.body.classList.add('menu-collapsed');
                    toggleButton.setAttribute('aria-expanded', 'false');
                    toggleButton.innerHTML = '☰';
                }
            }
        } catch (e) {
            console.warn('Não foi possível restaurar estado do menu:', e);
        }
    }

    handleResize() {
        // Em telas grandes, sempre expande o menu
        if (window.innerWidth > 768 && this.isCollapsed) {
            this.toggleMenu();
        }
    }

    // API pública
    expand() {
        if (this.isCollapsed) this.toggleMenu();
    }

    collapse() {
        if (!this.isCollapsed) this.toggleMenu();
    }

    isMenuCollapsed() {
        return this.isCollapsed;
    }
}

// Registra o web component
customElements.define('navigation-menu', NavigationMenu);

// Adiciona estilos globais para o body
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    body.menu-collapsed {
        padding-top: 20px !important;
    }
    
    body {
        padding-top: 60px;
    }
`;
document.head.appendChild(globalStyles);
