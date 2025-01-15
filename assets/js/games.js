// Dados simulados dos jogos
const gamesData = [
    {
        id: 1,
        title: "jogo-da-cobrinha",
        category: "arcade",
        image: "../../src/html/games/arcade/jogo-da-cobrinha/img.png",
        link: "../../src/html/games/arcade/jogo-da-cobrinha/artigo.html"
    },
    {
        id: 2,
        title: "name game 1",
        category: "rpg",
        image: "assets/img/games/game2.jpg",
        link: "#"
    },

    // Adicione mais jogos conforme necessário
];

class GamesManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentCategory = 'all';
        this.currentSort = 'newest';

        this.initializeElements();
        this.setupEventListeners();
        this.renderGames();
    }

    initializeElements() {
        this.gamesGrid = document.querySelector('.games-grid');
        this.categorySelect = document.getElementById('categorySelect');
        this.sortSelect = document.getElementById('sortSelect');
        this.prevButton = document.querySelector('.prev-page');
        this.nextButton = document.querySelector('.next-page');
        this.currentPageSpan = document.querySelector('.current');
        this.totalPagesSpan = document.querySelector('.total');
    }

    setupEventListeners() {
        this.categorySelect.addEventListener('change', () => {
            this.currentCategory = this.categorySelect.value;
            this.currentPage = 1;
            this.renderGames();
        });

        this.sortSelect.addEventListener('change', () => {
            this.currentSort = this.sortSelect.value;
            this.renderGames();
        });

        this.prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderGames();
            }
        });

        this.nextButton.addEventListener('click', () => {
            const totalPages = Math.ceil(this.getFilteredGames().length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderGames();
            }
        });
    }

    getFilteredGames() {
        let filtered = [...gamesData];

        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(game => game.category === this.currentCategory);
        }

        switch (this.currentSort) {
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return filtered;
    }

    renderGames() {
        const filteredGames = this.getFilteredGames();
        const totalPages = Math.ceil(filteredGames.length / this.itemsPerPage);
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const currentGames = filteredGames.slice(start, end);

        this.gamesGrid.innerHTML = currentGames.map(game => this.createGameCard(game)).join('');

        // Atualiza paginação
        this.currentPageSpan.textContent = this.currentPage;
        this.totalPagesSpan.textContent = totalPages;
        this.prevButton.disabled = this.currentPage === 1;
        this.nextButton.disabled = this.currentPage === totalPages;
    }

    createGameCard(game) {
        return `
            <a href="${game.link}" class="game-card-link">
                <div class="game-card">
                    <div class="game-image">
                        <img src="${game.image}" alt="${game.title}">
                        <span class="game-category">${game.category}</span>
                    </div>
                    <div class="game-info">
                        <h3 class="game-title">${game.title}</h3>
                        <div class="game-meta">
                            
                            
                        </div>
                    </div>
                    
                </div>
            </a>
        `;
    }
}

// Inicializa o gerenciador de jogos quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    new GamesManager();
});