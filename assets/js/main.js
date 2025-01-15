// Toggle navigation
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const main = document.querySelector('.main');

toggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
});

// Active navigation item
const navItems = document.querySelectorAll('.navigation ul li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Handle navigation items on mobile
const handleMobileNav = () => {
    if (window.innerWidth <= 768) {
        navigation.classList.add('active');
        main.classList.add('active');
    } else {
        navigation.classList.remove('active');
        main.classList.remove('active');
    }
};

// Listen for window resize
window.addEventListener('resize', handleMobileNav);

// Initial check for mobile view
handleMobileNav();