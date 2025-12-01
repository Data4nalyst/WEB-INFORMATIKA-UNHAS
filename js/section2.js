// SECTION 2 — LAB SLIDER
// Cleaner, modular, readable

const slide = document.querySelector(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

/** Move slide forward */
const moveNext = () => {
    slide.appendChild(slide.firstElementChild);
};

/** Move slide backward */
const movePrev = () => {
    slide.prepend(slide.lastElementChild);
};

/** Event listeners */
nextBtn.addEventListener("click", moveNext);
prevBtn.addEventListener("click", movePrev);

/** Keyboard navigation */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") moveNext();
    if (e.key === "ArrowLeft") movePrev();
});
