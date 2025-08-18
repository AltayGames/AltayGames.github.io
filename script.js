document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Mevcut tema kontrolü
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    body.classList.add(currentTheme + '-theme');
    updateThemeIcon();

    // Tema değiştirme butonu
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
        updateThemeIcon();
    });

    // Sistem teması değişikliğini dinle
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(newTheme + '-theme');
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });

    // İkon güncelleme fonksiyonu
    function updateThemeIcon() {
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '&#9788;'; // Güneş (light mode'a geç)
            themeToggle.style.background = 'linear-gradient(45deg, #ff6b6b, #cc5de8)';
        } else {
            themeToggle.innerHTML = '&#9790;'; // Ay (dark mode'a geç)
            themeToggle.style.background = 'linear-gradient(45deg, #339af0, #20c997)';
        }
    }

    // Mobile menu toggle
    document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
        const navMenu = document.querySelector('nav ul');
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        const closeIcon = document.querySelector('.close-icon');
        
        navMenu.classList.toggle('show');
        
        if (navMenu.classList.contains('show')) {
            hamburgerIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            hamburgerIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });

    // Mobile menü linklerine tıklanınca kapanması
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                document.querySelector('nav ul').classList.remove('show');
                document.querySelector('.hamburger-icon').style.display = 'block';
                document.querySelector('.close-icon').style.display = 'none';
            }
        });
    });
});