// assets/js/data.js

// Dados centralizados dos jogos e programas
const data = {
    games: [
        {
            id: 1,
            title: "jogo-da-cobrinha",
            category: "arcade",
            image: "../../src/html/games/arcade/jogo-da-cobrinha/img.png",
            link: "../../src/html/games/arcade/jogo-da-cobrinha/artigo.html"
        },
        {
            id: 1,
            title: "name game 1",
            category: "ação",
            image: "../../assets/img/games/game1.jpg",
            rating: 4.5,
            link: "#"
        },
        // Adicione mais jogos aqui
    ],

    programs: [
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

        // Adicione mais programas aqui
    ]
};

// Expor os dados para uso em outros arquivos
const gamesData = data.games;
const programsData = data.programs;