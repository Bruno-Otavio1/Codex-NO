// Função para adicionar efeito de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Carrossel
class Carousel {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.videos = document.querySelectorAll('.carousel-slide video');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.autoplayInterval = null;

        this.init();
    }

    init() {
        // Adiciona eventos aos dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Configura os vídeos
        this.videos.forEach(video => {
            video.addEventListener('ended', () => {
                this.nextSlide();
            });
        });

        // Inicia com o primeiro vídeo
        this.playVideo(0);
    }

    goToSlide(index) {
        // Para o vídeo atual
        this.videos[this.currentSlide].pause();
        this.videos[this.currentSlide].currentTime = 0;

        // Atualiza o slide atual
        this.currentSlide = index;
        this.carousel.style.transform = `translateX(-${index * 33.333}%)`;

        // Atualiza dots
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[index].classList.add('active');

        // Inicia o novo vídeo
        this.playVideo(index);
    }

    playVideo(index) {
        const video = this.videos[index];
        video.currentTime = 0;
        video.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
}

// Quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicia o efeito de digitação
    const title = document.querySelector('.text-content h1');
    const originalText = title.innerHTML;
    typeWriter(title, originalText);

    // Adiciona classe de fade-in nos stats
    const stats = document.querySelectorAll('.stat-item');
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('show');
        }, 500 * (index + 1));
    });

    // Inicia o carrossel
    new Carousel();
});