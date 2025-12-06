document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section, footer'); 
    const navLinks = document.querySelectorAll('.nav-links li a'); 

    // === FUNGSI UTAMA: UPDATE TAMPILAN BERDASARKAN SCROLL ===
    function updateNavbarUI() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        changeActiveState();
    }

    // === LOGIKA ACTIVE STATE ===
    function changeActiveState() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;
        if (isAtBottom) {
            current = 'footer'; 
        }

        navLinks.forEach(link => {
            link.classList.remove('active'); 
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active'); 
            }
        });
    }

    // === EVENT LISTENER ===
    window.addEventListener('scroll', updateNavbarUI);

    // Panggil update SEKALI saat halaman baru dimuat/refresh. Ini agar navbar langsung tahu posisinya meskipun belum discroll
    updateNavbarUI();
});