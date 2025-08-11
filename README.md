# 🗺️ Mapas Mentais de História - 2025

Projeto educacional com mapas mentais interativos sobre povos da Antiguidade, desenvolvido para facilitar o aprendizado de história.

## 📚 Povos Abordados

- **🏺 Hebreus** - Povo monoteísta e suas tradições
- **🏛️ Sumérios** - Primeira civilização da história
- **⚔️ Acádios** - Primeiro império da história
- **🏺 Babilônios** - Império com Hamurabi e Jardins Suspensos
- **🛡️ Assírios** - Império militar poderoso

## 🏗️ Estrutura do Projeto

```
2025/historia/
├── README.md                    # Esta documentação
├── scripts/                     # Arquivos JavaScript
│   ├── README.md               # Documentação dos scripts
│   ├── navigation-menu.js      # Web component do menu
│   └── menu-toggle.js         # Script legado
├── styles/                      # Arquivos CSS
│   ├── README.md               # Documentação dos estilos
│   └── common-styles.css       # Estilos compartilhados
├── Hebreus.html                 # Mapa mental dos Hebreus
├── Sumerios.html               # Mapa mental dos Sumérios
├── Acadios.html                # Mapa mental dos Acádios
├── Babilonios.html             # Mapa mental dos Babilônios
└── Assirios.html               # Mapa mental dos Assírios
```

## ✨ Características

### 🎨 **Design Responsivo**
- Layout adaptativo para todos os dispositivos
- Design moderno com gradientes e sombras
- Tipografia clara e legível
- Cores harmoniosas e acessíveis

### 🧭 **Navegação Intuitiva**
- Menu de navegação com Web Components
- Animações suaves e interativas
- Estado persistente (localStorage)
- Suporte a teclado (ESC para recolher menu)

### 📱 **Funcionalidades**
- Menu responsivo que se adapta ao tamanho da tela
- Auto-recolher em dispositivos móveis
- Indicador visual da página ativa
- Animações CSS otimizadas

### 🖨️ **Impressão**
- Layout otimizado para impressão
- Cores preservadas no papel
- Formato A4 com margens adequadas

## 🚀 Como Usar

### **Visualizar Online**
1. Abra qualquer arquivo `.html` em um navegador
2. Navegue entre as páginas usando o menu superior
3. Use o botão ☰ para recolher/expandir o menu

### **Servidor Local**
```bash
# Navegar até o diretório
cd 2025/historia

# Iniciar servidor Python
python3 -m http.server 8000

# Acessar no navegador
# http://localhost:8000
```

### **Desenvolvimento**
- **CSS:** Edite `styles/common-styles.css` para mudanças globais
- **JavaScript:** Modifique `scripts/navigation-menu.js` para funcionalidades
- **Páginas:** Cada `.html` contém estilos específicos no `<style>` local

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis CSS
- **JavaScript ES6+** - Web Components e funcionalidades
- **Web Components** - Menu de navegação modular

## 📋 Funcionalidades por Página

### **Estrutura Padrão**
- Título principal com gradiente
- Centro do mapa mental
- 7-8 ramos temáticos
- Linhas conectoras animadas
- Elementos decorativos

### **Conteúdo Educacional**
- Informações históricas precisas
- Datas e períodos importantes
- Figuras históricas relevantes
- Legados e contribuições

## 🎯 Objetivos Educacionais

1. **Visualização:** Facilitar a compreensão através de mapas visuais
2. **Organização:** Estruturar informações de forma lógica
3. **Memorização:** Ajudar na retenção de conhecimento
4. **Interatividade:** Engajar o estudante através da navegação
5. **Acessibilidade:** Tornar o conteúdo acessível a todos

## 🔧 Manutenção

### **Adicionar Nova Página**
1. Criar arquivo `.html` seguindo o padrão existente
2. Incluir CSS comum: `<link rel="stylesheet" href="styles/common-styles.css">`
3. Adicionar web component: `<navigation-menu current-page="nome"></navigation-menu>`
4. Incluir script: `<script src="scripts/navigation-menu.js"></script>`
5. Atualizar `navigation-menu.js` com o novo item

### **Modificar Estilos Globais**
- Editar `styles/common-styles.css`
- Testar em todas as páginas
- Verificar responsividade

### **Adicionar Funcionalidades**
- Modificar `scripts/navigation-menu.js`
- Manter compatibilidade com navegadores
- Testar em diferentes dispositivos

## 📈 Melhorias Futuras

- [ ] Sistema de temas (claro/escuro)
- [ ] Animações mais elaboradas
- [ ] Modo offline (PWA)
- [ ] Busca e filtros
- [ ] Exportação para PDF
- [ ] Mais povos da Antiguidade
- [ ] Quiz interativo
- [ ] Linha do tempo interativa

## 🤝 Contribuição

Para contribuir com o projeto:

1. Mantenha a estrutura de arquivos organizada
2. Use as variáveis CSS existentes
3. Teste em diferentes navegadores
4. Verifique a responsividade
5. Documente mudanças importantes

## 📄 Licença

Este projeto é educacional e pode ser usado livremente para fins educativos.

---

**Desenvolvido com ❤️ para facilitar o aprendizado de história**
