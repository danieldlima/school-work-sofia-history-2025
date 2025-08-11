// Script para controle do menu de navegação
// Funcionalidades: recolher/expandir com animação

(function() {
    'use strict';

    // Configurações
    const CONFIG = {
        animationDuration: 300, // duração da animação em ms
        collapsedClass: 'collapsed',
        toggleClass: 'nav-toggle',
        menuClass: 'nav-menu',
        storageKey: 'navMenuCollapsed'
    };

    // Elementos do DOM
    let navMenu = null;
    let navToggle = null;
    let isCollapsed = false;

    // Inicialização
    function init() {
        // Aguarda o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupMenu);
        } else {
            setupMenu();
        }
    }

    // Configuração do menu
    function setupMenu() {
        // Encontra elementos
        navMenu = document.querySelector('.' + CONFIG.menuClass);
        if (!navMenu) {
            console.warn('Menu de navegação não encontrado');
            return;
        }

        // Cria o botão toggle
        createToggleButton();

        // Restaura estado salvo
        restoreMenuState();

        // Adiciona listeners
        addEventListeners();

        // Adiciona estilos CSS dinamicamente
        addDynamicStyles();
    }

    // Cria o botão toggle
    function createToggleButton() {
        navToggle = document.createElement('button');
        navToggle.className = CONFIG.toggleClass;
        navToggle.setAttribute('aria-label', 'Alternar menu de navegação');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.innerHTML = '☰';
        
        // Insere o botão no início do body
        document.body.insertBefore(navToggle, document.body.firstChild);
    }

    // Adiciona estilos CSS dinamicamente
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .${CONFIG.menuClass} {
                transition: transform ${CONFIG.animationDuration}ms ease-in-out;
            }

            .${CONFIG.menuClass}.${CONFIG.collapsedClass} {
                transform: translateY(-100%);
            }

            .${CONFIG.toggleClass} {
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

            .${CONFIG.toggleClass}:hover {
                background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }

            .${CONFIG.toggleClass}.${CONFIG.collapsedClass} {
                top: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-color: rgba(255, 255, 255, 0.5);
            }

            .${CONFIG.toggleClass}.${CONFIG.collapsedClass}:hover {
                background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            }

            /* Ajuste do body quando menu está recolhido */
            body.menu-collapsed {
                padding-top: 20px !important;
            }

            /* Animação suave para o container */
            .container {
                transition: margin-top ${CONFIG.animationDuration}ms ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    // Adiciona event listeners
    function addEventListeners() {
        // Toggle do botão
        navToggle.addEventListener('click', toggleMenu);

        // Tecla ESC para recolher
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !isCollapsed) {
                toggleMenu();
            }
        });

        // Auto-recolher em telas pequenas
        if (window.innerWidth <= 768) {
            window.addEventListener('scroll', function() {
                if (!isCollapsed && window.scrollY > 100) {
                    toggleMenu();
                }
            });
        }

        // Resize handler
        window.addEventListener('resize', handleResize);
    }

    // Toggle do menu
    function toggleMenu() {
        isCollapsed = !isCollapsed;
        
        // Atualiza classes
        navMenu.classList.toggle(CONFIG.collapsedClass, isCollapsed);
        navToggle.classList.toggle(CONFIG.collapsedClass, isCollapsed);
        document.body.classList.toggle('menu-collapsed', isCollapsed);
        
        // Atualiza aria-expanded
        navToggle.setAttribute('aria-expanded', !isCollapsed);
        
        // Atualiza ícone
        navToggle.innerHTML = isCollapsed ? '☰' : '✕';
        
        // Salva estado
        saveMenuState();
        
        // Log para debug
        console.log('Menu ' + (isCollapsed ? 'recolhido' : 'expandido'));
    }

    // Salva estado no localStorage
    function saveMenuState() {
        try {
            localStorage.setItem(CONFIG.storageKey, isCollapsed.toString());
        } catch (e) {
            console.warn('Não foi possível salvar estado do menu:', e);
        }
    }

    // Restaura estado do localStorage
    function restoreMenuState() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved !== null) {
                isCollapsed = saved === 'true';
                
                // Aplica estado salvo
                if (isCollapsed) {
                    navMenu.classList.add(CONFIG.collapsedClass);
                    navToggle.classList.add(CONFIG.collapsedClass);
                    document.body.classList.add('menu-collapsed');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.innerHTML = '☰';
                }
            }
        } catch (e) {
            console.warn('Não foi possível restaurar estado do menu:', e);
        }
    }

    // Handler para resize da janela
    function handleResize() {
        // Em telas grandes, sempre expande o menu
        if (window.innerWidth > 768 && isCollapsed) {
            toggleMenu();
        }
    }

    // API pública
    window.NavMenuToggle = {
        toggle: toggleMenu,
        expand: function() {
            if (isCollapsed) toggleMenu();
        },
        collapse: function() {
            if (!isCollapsed) toggleMenu();
        },
        isCollapsed: function() {
            return isCollapsed;
        }
    };

    // Inicializa quando o script é carregado
    init();

})();
