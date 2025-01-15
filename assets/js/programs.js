const programsData = [
    {
        id: 1,
        title: "Imagem 360",
        category: "html",
        image: "../../src/html/programas/html/imagem 360/img.png",
        link: "../../src/html/programas/html/imagem 360/artigo.html"
    },
    {
        id: 2,
        title: "Cardioid",
        category: "python",
        image: "../../src/html/programas/python/cardioid/img.png",
        link: "../../src/html/programas/python/cardioid/artigo.html"
    },
    {
        id: 3,
        title: "Java Spring Boot API",
        category: "java",
        image: "assets/img/programs/java-spring.jpg",
        link: "#"
    },

];

class ProgramsManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentCategory = 'all';
        this.currentSort = 'newest';

        this.initializeElements();
        this.setupEventListeners();
        this.renderPrograms();
    }

    initializeElements() {
        this.programsGrid = document.querySelector('.programs-grid');
        this.categorySelect = document.getElementById('categorySelect');
        this.sortSelect = document.getElementById('sortSelect');
        this.prevButton = document.querySelector('.prev-page');
        this.nextButton = document.querySelector('.next-page');
        this.currentPageSpan = document.querySelector('.current');
        this.totalPagesSpan = document.querySelector('.total');

        // Set up category options
        this.categorySelect.innerHTML = `
            <option value="all">Todas Categorias</option>
            <option value="html">HTML</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
        `;
    }

    setupEventListeners() {
        this.categorySelect.addEventListener('change', () => {
            this.currentCategory = this.categorySelect.value;
            this.currentPage = 1;
            this.renderPrograms();
        });

        this.sortSelect.addEventListener('change', () => {
            this.currentSort = this.sortSelect.value;
            this.renderPrograms();
        });

        this.prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPrograms();
            }
        });

        this.nextButton.addEventListener('click', () => {
            const totalPages = Math.ceil(this.getFilteredPrograms().length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderPrograms();
            }
        });
    }

    getFilteredPrograms() {
        let filtered = [...programsData];

        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(program => program.category === this.currentCategory);
        }

        switch (this.currentSort) {
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'popular':
                filtered.sort((a, b) => {
                    const downloadsA = parseInt(b.downloads.replace('K', '000'));
                    const downloadsB = parseInt(a.downloads.replace('K', '000'));
                    return downloadsA - downloadsB;
                });
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return filtered;
    }

    renderPrograms() {
        const filteredPrograms = this.getFilteredPrograms();
        const totalPages = Math.ceil(filteredPrograms.length / this.itemsPerPage);
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const currentPrograms = filteredPrograms.slice(start, end);

        this.programsGrid.innerHTML = currentPrograms.map(program => this.createProgramCard(program)).join('');

        this.currentPageSpan.textContent = this.currentPage;
        this.totalPagesSpan.textContent = totalPages;
        this.prevButton.disabled = this.currentPage === 1;
        this.nextButton.disabled = this.currentPage === totalPages;
    }

    createProgramCard(program) {
        return `
            <a href="${program.link}" class="program-card-link">
                <div class="program-card">
                    <div class="program-image">
                        <img src="${program.image}" alt="${program.title}">
                        <span class="program-category">${program.category.toUpperCase()}</span>
                    </div>
                    <div class="program-info">
                        <h3 class="program-title">${program.title}</h3>
                        <div class="program-meta">
                            
                            
                        </div>
                    </div>
                    
                </div>
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProgramsManager();
});