// Ambil elemen-elemen penting
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section'); // Mengambil semua tag <section>
const navLinks = document.querySelectorAll('.nav-links li a'); // Mengambil semua link menu

// === 1. EFEK NAVBAR MENGECIL SAAT SCROLL ===
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Panggil fungsi active state setiap kali scroll
    changeActiveState();
});

// === 2. LOGIKA ACTIVE STATE (SCROLL SPY) ===
// Fungsi ini menentukan section mana yang sedang dilihat user
function changeActiveState() {
    let current = '';

    sections.forEach(section => {
        // Ambil posisi atas section
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Logika: Jika kita scroll melebihi bagian atas section (dikurangi offset navbar)
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // Loop semua link untuk memindahkan class 'active'
    navLinks.forEach(link => {
        link.classList.remove('active'); // Reset semua
        
        // Cek jika href link (misal #section-2) cocok dengan id section saat ini
        if (link.getAttribute('href').includes(current)) {
            if (current !== '') {
                link.classList.add('active'); // Tambah titik biru
            }
        }
    });
}

// === 3. HAMBURGER MENU (MOBILE) ===
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Tutup menu saat link diklik (UX Mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(hamburger) hamburger.classList.remove('active');
        if(navMenu) navMenu.classList.remove('active');
    });
});