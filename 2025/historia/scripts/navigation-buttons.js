/**
 * Navigation Buttons Component
 * Botões de navegação "anterior" e "próximo" seguindo a ordem do menu
 */
class NavigationButtons extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentPage = this.getAttribute('current-page') || 'hebreus';
        this.init();
    }

    static get observedAttributes() {
        return ['current-page'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'current-page' && oldValue !== newValue) {
            this.currentPage = newValue;
            this.updateButtons();
        }
    }

    init() {
        this.navigationOrder = [
            { id: 'hebreus', title: 'Hebreus', icon: '🏺', file: 'Hebreus.html' },
            { id: 'sumerios', title: 'Sumérios', icon: '🏛️', file: 'Sumerios.html' },
            { id: 'acadios', title: 'Acádios', icon: '⚔️', file: 'Acadios.html' },
            { id: 'babilonios', title: 'Babilônios', icon: '🏺', file: 'Babilonios.html' },
            { id: 'assirios', title: 'Assírios', icon: '🛡️', file: 'Assirios.html' }
        ];
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1000;
                    pointer-events: none;
                }

                .nav-buttons {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                    justify-content: space-between;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    transform: translateY(-50%);
                    padding: 0 20px;
                    pointer-events: none;
                }

                .nav-button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    text-decoration: none;
                    pointer-events: auto;
                }

                .nav-button:hover {
                    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                }





                @media (max-width: 768px) {
                    .nav-buttons {
                        gap: 10px;
                        padding: 0 15px;
                    }

                    .nav-button {
                        width: 45px;
                        height: 45px;
                        font-size: 18px;
                    }
                }
            </style>
            
            <div class="nav-buttons">
                <a href="#" class="nav-button prev" id="prev-button" aria-label="Página anterior">
                    ←
                </a>
                <a href="#" class="nav-button next" id="next-button" aria-label="Próxima página">
                    →
                </a>
            </div>
        `;
    }

    setupEventListeners() {
        const prevButton = this.shadowRoot.querySelector('#prev-button');
        const nextButton = this.shadowRoot.querySelector('#next-button');

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToPrevious();
        });

        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToNext();
        });

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigateToPrevious();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigateToNext();
            }
        });
    }

    getCurrentPageIndex() {
        return this.navigationOrder.findIndex(page => page.id === this.currentPage);
    }

    getPreviousPage() {
        const currentIndex = this.getCurrentPageIndex();
        if (currentIndex <= 0) {
            // Se for o primeiro item, vai para o último
            return this.navigationOrder[this.navigationOrder.length - 1];
        }
        return this.navigationOrder[currentIndex - 1];
    }

    getNextPage() {
        const currentIndex = this.getCurrentPageIndex();
        if (currentIndex >= this.navigationOrder.length - 1) {
            // Se for o último item, vai para o primeiro
            return this.navigationOrder[0];
        }
        return this.navigationOrder[currentIndex + 1];
    }

    navigateToPrevious() {
        const prevPage = this.getPreviousPage();
        if (prevPage) {
            window.location.href = prevPage.file;
        }
    }

    navigateToNext() {
        const nextPage = this.getNextPage();
        if (nextPage) {
            window.location.href = nextPage.file;
        }
    }

    updateButtons() {
        const prevButton = this.shadowRoot.querySelector('#prev-button');
        const nextButton = this.shadowRoot.querySelector('#next-button');

        const prevPage = this.getPreviousPage();
        const nextPage = this.getNextPage();

        // Atualiza botão anterior
        prevButton.href = prevPage.file;
        prevButton.removeAttribute('disabled');
        prevButton.setAttribute('aria-label', `Página anterior: ${prevPage.title}`);

        // Atualiza botão próximo
        nextButton.href = nextPage.file;
        nextButton.removeAttribute('disabled');
        nextButton.setAttribute('aria-label', `Próxima página: ${nextPage.title}`);
    }
}

// Registra o web component
customElements.define('navigation-buttons', NavigationButtons);
