if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const papersData = [
  { title: "RITECH 2025", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80", content: "The 1st International Conference on Research and Innovations in Informatics and Engineering Technology 2025." },
  { title: "RECURSION 1.0", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80", content: "Hasanuddin University Informatics Student Organization (OKIF) successfully held RECURSION 1.0." },
  { title: "APIE Camp Batch 4", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80", content: "The fourth Asia Pacific Internet Engineering (APIE) Camp batch officially began at the Laboratory of Ubiquitous Computing." },
  { title: "Integrity Pact 2024", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80", content: "Parent/Guardian Meeting and Signing the 2024 New Student Integrity Pact." },
  { title: "Top 10 CTF Hackfinity", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", content: "Congratulations to our students for reaching the Top 10 in CTF (Capture The Flag) at Hackfinity Battle." },
  { title: "RPL Expo 2025", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=600&q=80", content: "The Department of Informatics Engineering held the 2025 Software Engineering Project Expo (RPL Expo)." }
];

let activeIndex = 0;
const scatterContainer = document.getElementById('scatterContainer');
const modal = document.getElementById('detailModal');
const modalStackWrap = document.getElementById('modalStackWrap');
const closeBtn = document.getElementById('closeBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function renderScatteredView() {
  if (!scatterContainer) return;
  scatterContainer.innerHTML = ''; 
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.getAll().forEach(t => t.kill());

  const isMobile = window.innerWidth < 900; 

  papersData.forEach((data, index) => {
    const paperDiv = document.createElement('div');
    paperDiv.classList.add('scat-paper');
    
    let shortText = data.content;
    const limit = isMobile ? 120 : 250; 
    if (shortText.length > limit) shortText = shortText.substring(0, limit) + "...";

    paperDiv.innerHTML = `
      <div class="card-inner">
          <div class="blur-content">
            <h2>${data.title}</h2>
            <p>${shortText}</p> 
            <div class="separator" style="width:100%;"></div>
            <div class="separator" style="width:80%;"></div>
          </div>
      </div>
    `;

    paperDiv.addEventListener('click', () => {
      activeIndex = index;
      openModal();
    });

    scatterContainer.appendChild(paperDiv);

    // --- ANIMASI PINNING ---
    if (typeof gsap !== 'undefined' && !isMobile) {
        ScrollTrigger.create({
            trigger: paperDiv,
            start: "center center", 
            end: "+=600",
            pin: true, 
            pinSpacing: true,
            scrub: true,
            animation: gsap.from(paperDiv, { 
                y: 50, 
                opacity: 0, 
                duration: 1, 
                ease: "power2.out" 
            })
        });
    } else if (typeof gsap !== 'undefined' && isMobile) {
        gsap.from(paperDiv, {
            scrollTrigger: { trigger: paperDiv, start: "top 85%" },
            y: 50, opacity: 0, duration: 0.6
        });
    }
  });
}

function updateModalStack() {
  modalStackWrap.innerHTML = ''; 
  const data = papersData[activeIndex];
  papersData.forEach((d, index) => {
    const modPaper = document.createElement('div');
    modPaper.classList.add('mod-paper');
    if (index === activeIndex) {
      modPaper.classList.add('active');
      const imgHTML = d.image ? `<img src="${d.image}" class="paper-img-large">` : '';
      modPaper.innerHTML = ` ${imgHTML} <h2>${d.title}</h2> <p>${d.content}</p> `;
    } else {
      modPaper.classList.add('behind');
      const fixedRot = ((index * 10) % 6) - 3; 
      modPaper.style.transform = `rotate(${fixedRot}deg)`;
    }
    modalStackWrap.appendChild(modPaper);
  });
}
function openModal() { if(modal) modal.classList.remove('hidden'); document.body.classList.add('no-scroll'); updateModalStack(); }
function closeModal() { if(modal) modal.classList.add('hidden'); document.body.classList.remove('no-scroll'); }
if(closeBtn) closeBtn.addEventListener('click', closeModal);
if(nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); if (activeIndex < papersData.length - 1) { activeIndex++; updateModalStack(); } });
if(prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); if (activeIndex > 0) { activeIndex--; updateModalStack(); } });
if(modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(renderScatteredView, 100); });
document.addEventListener('DOMContentLoaded', () => { renderScatteredView(); });      