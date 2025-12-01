document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.autoBlur');

    // Biarkan animasi intro selama 2 detik
    setTimeout(() => {
        elements.forEach(el => {
            // Stop semua animasi intro
            el.style.animation = "none";
            void el.offsetWidth; 

            // Aktifkan animasi scroll
            el.classList.add("active");
        });
    }, 2000);
});
