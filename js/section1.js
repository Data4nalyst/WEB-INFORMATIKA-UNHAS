document.addEventListener("DOMContentLoaded", () => {
    const section1 = document.getElementById('section-1');
    if (!section1) return;

    const elements = section1.querySelectorAll('.autoBlur');
    let introTimer; 

    // Fungsi utama untuk mengaktifkan mode scroll
    const activateScrollMode = () => {
        clearTimeout(introTimer);
        window.removeEventListener('scroll', onUserScroll);

        elements.forEach(el => {
            // Stop animasi intro (agar transisi CSS mengambil alih)
            el.style.animation = "none";
            el.classList.add("active");
        });
    };

    const onUserScroll = () => {
        if (window.scrollY > 30) {
            activateScrollMode();
        }
    };

    introTimer = setTimeout(activateScrollMode, 2000);
    window.addEventListener('scroll', onUserScroll);
});