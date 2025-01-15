class ConfigManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.searchGames = document.getElementById('search-games');
        this.searchPrograms = document.getElementById('search-programs');

        this.initializeTheme();
        this.initializeSearchSettings();
        this.setupEventListeners();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.themeToggle.checked = savedTheme === 'dark';
    }

    initializeSearchSettings() {
        const searchSettings = JSON.parse(localStorage.getItem('searchSettings')) || {
            games: true,
            programs: true
        };

        this.searchGames.checked = searchSettings.games;
        this.searchPrograms.checked = searchSettings.programs;
    }

    setupEventListeners() {
        this.themeToggle.addEventListener('change', () => {
            const theme = this.themeToggle.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });

        [this.searchGames, this.searchPrograms].forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const settings = {
                    games: this.searchGames.checked,
                    programs: this.searchPrograms.checked
                };
                localStorage.setItem('searchSettings', JSON.stringify(settings));
            });
        });
    }
}

// Initialize configuration manager
document.addEventListener('DOMContentLoaded', () => {
    new ConfigManager();
});

// Global search function to be used in other pages
function globalSearch(query) {
    const searchSettings = JSON.parse(localStorage.getItem('searchSettings')) || {
        games: true,
        programs: true
    };

    const results = {
        games: [],
        programs: []
    };

    if (searchSettings.games) {
        results.games = searchInGames(query);
    }

    if (searchSettings.programs) {
        results.programs = searchInPrograms(query);
    }

    return results;
}

function searchInGames(query) {
    return gamesData.filter(game =>
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.category.toLowerCase().includes(query.toLowerCase())
    );
}

function searchInPrograms(query) {
    return programsData.filter(program =>
        program.title.toLowerCase().includes(query.toLowerCase()) ||
        program.category.toLowerCase().includes(query.toLowerCase())
    );
}

class SearchManager {
    constructor() {
        this.initializeSearchBar();
        this.setupSearchEventListeners();
    }

    initializeSearchBar() {
        // Create search container
        const searchContainer = document.createElement('section');
        searchContainer.className = 'config-section';
        searchContainer.innerHTML = `
            <h2>Barra de Pesquisa</h2>
            <div class="search-container">
                <div class="search-bar">
                    <input type="text" id="globalSearchInput" placeholder="Pesquisar jogos e programas...">
                    <div id="searchResults" class="search-results"></div>
                </div>
            </div>
        `;

        // Insert into the config-sections div
        const configSections = document.querySelector('.config-sections');
        configSections.appendChild(searchContainer);
    }

    setupSearchEventListeners() {
        const searchInput = document.getElementById('globalSearchInput');
        const searchResults = document.getElementById('searchResults');
        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = e.target.value.trim();
                if (query.length >= 2) {
                    this.performSearch(query);
                } else {
                    searchResults.innerHTML = '';
                    searchResults.style.display = 'none';
                }
            }, 300);
        });

        // Fechar resultados ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }

    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        const searchSettings = JSON.parse(localStorage.getItem('searchSettings')) || {
            games: true,
            programs: true
        };

        let results = [];

        // Verificar se window.gamesData e window.programsData existem
        if (searchSettings.games && typeof gamesData !== 'undefined') {
            const gameResults = gamesData.filter(game =>
                game.title.toLowerCase().includes(query.toLowerCase())
            ).map(game => ({ ...game, type: 'game' }));
            results = results.concat(gameResults);
        }

        if (searchSettings.programs && typeof programsData !== 'undefined') {
            const programResults = programsData.filter(program =>
                program.title.toLowerCase().includes(query.toLowerCase())
            ).map(program => ({ ...program, type: 'program' }));
            results = results.concat(programResults);
        }

        this.displayResults(results);
    }

    displayResults(results) {
        const searchResults = document.getElementById('searchResults');

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">Nenhum resultado encontrado</div>';
            searchResults.style.display = 'block';
            return;
        }

        const resultsHTML = results.map(item => `
            <a href="${item.link}" class="search-result-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="result-info">
                    <div class="result-title">${item.title}</div>
                    <div class="result-category">${item.type === 'game' ? 'Jogo' : 'Programa'} - ${item.category}</div>
                </div>
            </a>
        `).join('');

        searchResults.innerHTML = resultsHTML;
        searchResults.style.display = 'block';
    }
}

// Inicializar o SearchManager quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new SearchManager();
});