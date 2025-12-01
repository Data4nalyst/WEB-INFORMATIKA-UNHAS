//Data untuk news
const papersData = [
  { 
    title: "RITECH 2025 Conference", 
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80",
    content: "The 1st International Conference on Research and Innovations in Informatics and Engineering Technology 2025 (RITECH 2025) will be held on 6-7 September 2025 at Swiss-Belhotel Makassar, South Sulawesi, Indonesia. This conference, hosted by the Department of Informatics Engineering at Hasanuddin University, will explore innovative and sustainable solutions in information and engineering technologies to address global challenges like climate change and resource limitations. Themed 'Sustainable Solutions: Leveraging Information and Engineering Technology', RITECH 2025 will feature keynote speakers from Monash University (Australia), Indian Institute of Technology Roorkee (India), Universiti Sains Malaysia (Malaysia), and Universitas Indonesia (Indonesia). The event will be hybrid, offering both in-person and virtual sessions. The conference invites submissions on topics including AI, data science, IoT, sustainability, green computing, and more. All accepted papers will be submitted for inclusion in Scopus-indexed proceedings. For more information, visit: https://ritech.events.unhas.ac.id or contact: ritech@event.unhas.ac.id" 
  },
  { 
    title: "RECURSION 1.0", 
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    content: "Makassar – Hasanuddin University Informatics Student Organization (OKIF) successfully held RECURSION 1.0 (Red Campus Futurist Informatics Competition), a series of national scale events consisting of seminars and competitions in the field of information technology. Carrying the theme 'Transforming Tomorrow: Innovative Digital Solutions for a Smart, Sustainable, and Secure World', this activity includes four competition branches: UI/UX Design, ICT Business Plan, Competitive Programming, and Capture the Flag (CTF).This competition was attended by 808 participants from 69 universities throughout Indonesia, divided into 302 teams. The national seminar which was the highlight of the event with the theme 'Building a Sustainable Career as an IT Developer' was held on April 13 2025 at the Prof. Auditorium. A. Amiruddin, Faculty of Medicine, Unhas, with more than 230 participants attending offline and online.The chairman of the committee, Muhammad Zarrar Al Faruq Hasmin Tamsah, said that this activity was designed to answer the challenges of the current technology industry and encourage students to build sustainable IT careers. He also expressed the hope that RECURSION will continue to be a forum for innovation and collaboration for the younger generation in the field of informatics.Further information about RECURSION can be accessed via Instagram @recursion.uh or the official website https://recursionuh.my.id/." 
  },
  { 
    title: "The Department of Informatics, UNHAS is hosting the 4th Asia Pacific Internet Engineering (APIE) Camp", 
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    content: "The fourth Asia Pacific Internet Engineering (APIE) Camp batch officially began at the Laboratory of Ubiquitous Computing and Networking (Ubicon Lab), Department of Informatics, Faculty of Engineering, Universitas Hasanuddin in Gowa, South Sulawesi, on 12-16 August 2024. This five-day camp focused on intensive learning in internet and network technologies, has attracted 20 participants from various universities across the Asia-Pacific region, creating a truly international community. The participating universities include Keio University (Japan), Universiti Sains Malaysia (Malaysia), Hanoi University of Science and Technology (Vietnam), University of San Carlos (Philippines), Duy Tan University (Vietnam), Bangladesh University of Engineering and Technology (Bangladesh), Tribhuvan University (Nepal), Institut Teknologi Bandung, Universitas Brawijaya, Universitas Syiah Kuala, Universitas Sam Ratulangi, and Univesitas Hasanuddin as a host. The camp is designed to enhance the technical skills of future internet engineers, preparing them to contribute effectively to the development and expansion of internet infrastructure within the region. Participants will engage in hands-on sessions led by experts from the Asia Pacific Network Information Centre (APNIC), Amazon Web Services (AWS), Keio University, and Universitas Hasanuddin." 
  },
  { 
    title: "Department of Informatics Holding a Parent/Guardian Meeting and Signing the 2024 New Student Integrity Pact", 
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80",
    content: "Parent/Guardian Meeting and Signing the 2024 New Student Integrity Pact." 
  },
  { 
    title: "Congratulations and Success Top 10 in CTF (Capture The Flag) Competition", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    content: "Congratulations & Success to Muhamad Zibrisky (Informatics Engineering 2023), Ady Ulil Amri (Informatics Engineering 2023), Denzel Samuel Noah Simatupang (Informatics Engineering 2022), Ahmad Sultani Dayanullah (Informatics Engineering 2021), and Marcellino Candyawan (Informatics Engineering 2021) for their achievements in reaching the Top 10 in CTF (Capture The Flag) at Hackfinity Battle organized by TryHackMe and successfully hacking all the systems given. This cybersecurity competition was attended by more than 4000 teams. This competition took place boldly on March 17 - 20." 
  },
  { 
    title: "Informatics Engineering Students Showcase RPL Innovations at the 2025 Software Engineering Expo", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    content: "Makassar, June 20, 2025 — The Department of Informatics Engineering, Faculty of Engineering, Hasanuddin University, held the 2025 Software Engineering Project Expo (RPL Expo) at the Center of Technology Exhibition Hall. The event showcased digital technology projects developed by students through project-based learning." 
  }
];

let activeIndex = 0;

// --- DOM ELEMENTS ---
const scatterContainer = document.getElementById('scatterContainer');
const modal = document.getElementById('detailModal');
const modalStackWrap = document.getElementById('modalStackWrap');
const closeBtn = document.getElementById('closeBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// --- RENDER FUNCTION (3D TILT VERSION) ---
function renderScatteredView() {
  if (!scatterContainer) return;
  scatterContainer.innerHTML = ''; 
  
  const containerW = scatterContainer.clientWidth;
  
  const paperW = 450; 
  const paperH = 320; 
  const gapX = 50;  
  const gapY = 60;  
  
  const cellWidth = paperW + gapX;
  const cellHeight = paperH + gapY;

  let cols = Math.floor((containerW - 20) / cellWidth);
  if (cols < 1) cols = 1;

  const totalGridWidth = (cols * paperW) + ((cols - 1) * gapX);
  const startOffsetX = (containerW - totalGridWidth) / 2;

  let maxBottom = 0;

  papersData.forEach((data, index) => {
    const paperDiv = document.createElement('div');
    paperDiv.classList.add('scat-paper');
    paperDiv.style.animationDelay = `${index * 0.15}s`;

    // Posisi Grid
    const colIndex = index % cols;
    const rowIndex = Math.floor(index / cols);

    const baseX = startOffsetX + (colIndex * cellWidth);
    const baseY = 50 + (rowIndex * cellHeight); 

    // Nudge (Goyangan Posisi)
    const nudgeX = (Math.random() * 20) - 10; 
    const nudgeY = (Math.random() * 20) - 10; 
    
    // Initial Random Rotation
    const randomRot = (Math.random() * 4) - 2; 

    let finalX = baseX + nudgeX;
    let finalY = baseY + nudgeY;

    // Boundaries
    finalX = Math.max(10, finalX);
    finalX = Math.min(containerW - paperW - 20, finalX);
    
    paperDiv.style.left = `${finalX}px`;
    paperDiv.style.top = `${finalY}px`;
    
    // Set variabel rotasi dasar
    paperDiv.style.setProperty('--base-rot', `${randomRot}deg`);
    paperDiv.style.zIndex = index + 1;

    // Hitung tinggi container
    const paperBottom = finalY + paperH;
    if (paperBottom > maxBottom) maxBottom = paperBottom;

    // --- LOGIKA PEMOTONGAN TEKS (TRUNCATE) ---
    // Ambil 150 karakter pertama saja untuk preview
    let shortText = data.content;
    if (shortText.length > 150) {
        shortText = shortText.substring(0, 150) + "...";
    }

    // Render Preview (Judul + Teks Pendek Blur + Garis)
    paperDiv.innerHTML = `
      <div class="blur-content">
        <h2>${data.title}</h2>
        <p>${shortText}</p> <div class="separator" style="width:100%;"></div>
        <div class="separator" style="width:85%;"></div>
        <div class="separator" style="width:90%;"></div>
      </div>
    `;

    // --- 3D TILT LOGIC ---
    paperDiv.addEventListener('mousemove', (e) => {
      const rect = paperDiv.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; 
      const rotateY = ((x - centerX) / centerX) * 10; 

      const glareX = ((x / rect.width) * 100) + '%';
      const glareY = ((y / rect.height) * 100) + '%';

      paperDiv.style.setProperty('--rX', `${rotateX}deg`);
      paperDiv.style.setProperty('--rY', `${rotateY}deg`);
      paperDiv.style.setProperty('--glare-x', glareX);
      paperDiv.style.setProperty('--glare-y', glareY);
    });

    paperDiv.addEventListener('mouseleave', () => {
      paperDiv.style.setProperty('--rX', `0deg`);
      paperDiv.style.setProperty('--rY', `0deg`);
    });

    // Klik Modal
    paperDiv.addEventListener('click', () => {
      activeIndex = index;
      openModal();
    });

    scatterContainer.appendChild(paperDiv);
  });

  scatterContainer.style.height = `${maxBottom + 100}px`;
}

// --- MODAL LOGIC (FULL CONTENT) ---
function updateModalStack() {
  modalStackWrap.innerHTML = ''; 
  
  // Ambil data aktif
  const data = papersData[activeIndex];

  papersData.forEach((d, index) => {
    const modPaper = document.createElement('div');
    modPaper.classList.add('mod-paper');

    if (index === activeIndex) {
      // AKTIF: Tampilkan Konten LENGKAP & Gambar
      modPaper.classList.add('active');
      const imgHTML = d.image ? `<img src="${d.image}" class="paper-img-large" alt="${d.title}">` : '';
      
      modPaper.innerHTML = `
        ${imgHTML}
        <h2>${d.title}</h2>
        <p>${d.content}</p> `;
    } else {
      // BACKGROUND
      modPaper.classList.add('behind');
      const fixedRot = ((index * 13) % 10) - 5; 
      modPaper.style.transform = `rotate(${fixedRot}deg)`;
    }
    
    modalStackWrap.appendChild(modPaper);
  });
}

function openModal() {
  if(modal) modal.classList.remove('hidden');
  document.body.classList.add('no-scroll'); 
  updateModalStack();
}

function closeModal() {
  if(modal) modal.classList.add('hidden');
  document.body.classList.remove('no-scroll'); 
}

//Memanggil Event
if(closeBtn) closeBtn.addEventListener('click', closeModal);
if(nextBtn) nextBtn.addEventListener('click', () => {
  if (activeIndex < papersData.length - 1) { activeIndex++; updateModalStack(); }
});
if(prevBtn) prevBtn.addEventListener('click', () => {
  if (activeIndex > 0) { activeIndex--; updateModalStack(); }
});
if(modal) modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderScatteredView, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    renderScatteredView();
});