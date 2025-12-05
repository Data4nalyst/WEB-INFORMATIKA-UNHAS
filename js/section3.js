{
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    const papersData = [
      { title: "RITECH 2025", image: "assets/news/gambar1.jpeg", content: "The 1st International Conference on Research and Innovations in Informatics and Engineering Technology (RITECH 2025) will be held on 6-7 September 2025 at Swiss-Belhotel Makassar, South Sulawesi, Indonesia. The event focuses on sustainable solutions, exploring the role of information technology and engineering in addressing global challenges like climate change and resource scarcity. The hybrid conference aims to bring together global experts to share ideas and research in sustainable technology, featuring keynote speakers from Monash University, IIT Roorkee, Universiti Sains Malaysia, and University of Indonesia. Topics include AI, IoT, green computing, and more. For details, visit RITECH 2025 or email ritech@event.unhas.ac.id" },
      { title: "RECURSION 1.0", image: "assets/news/gambar2.png", content: "Makassar – Hasanuddin University Informatics Student Organization (OKIF) successfully held RECURSION 1.0 (Red Campus Futurist Informatics Competition), a series of national scale events consisting of seminars and competitions in the field of information technology. Carrying the theme 'Transforming Tomorrow: Innovative Digital Solutions for a Smart, Sustainable, and Secure World', this activity includes four competition branches: UI/UX Design, ICT Business Plan, Competitive Programming, and Capture the Flag (CTF). This competition was attended by 808 participants from 69 universities throughout Indonesia, divided into 302 teams. The national seminar which was the highlight of the event with the theme 'Building a Sustainable Career as an IT Developer' was held on April 13 2025 at the Prof. Auditorium. A. Amiruddin, Faculty of Medicine, Unhas, with more than 230 participants attending offline and online. The chairman of the committee, Muhammad Zarrar Al Faruq Hasmin Tamsah, said that this activity was designed to answer the challenges of the current technology industry and encourage students to build sustainable IT careers. He also expressed the hope that RECURSION will continue to be a forum for innovation and collaboration for the younger generation in the field of informatics. Further information about RECURSION can be accessed via Instagram @recursion.uh or the official website https://recursionuh.my.id/." },
      { title: "APIE Camp Batch 4", image: "assets/news/gambar3.png", content: "The fourth Asia Pacific Internet Engineering (APIE) Camp batch officially began at the Laboratory of Ubiquitous Computing." },
      { title: "Integrity Pact 2024", image: "assets/news/gambar5.jpg", content: "Parent/Guardian Meeting and Signing the 2024 New Student Integrity Pact." },
      { title: "Top 10 CTF Hackfinity", image: "assets/news/gambar6.jpg", content: "Congratulations to our students for reaching the Top 10 in CTF (Capture The Flag) at Hackfinity Battle." },
      { title: "RPL Expo 2025", image: "assets/news/gambar7.jpg", content: "The Department of Informatics Engineering held the 2025 Software Engineering Project Expo (RPL Expo)." }
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

      const colLeft = document.createElement('div');
      const colRight = document.createElement('div');
      
      colLeft.classList.add('parallax-col', 'col-left');
      colRight.classList.add('parallax-col', 'col-right');
      
      const colStyle = "display: flex; flex-direction: column; gap: 100px; width: 45%;";
      colLeft.style.cssText = colStyle;
      colRight.style.cssText = colStyle; 

      papersData.forEach((data, index) => {
        const paperDiv = document.createElement('div');
        paperDiv.classList.add('scat-paper');
        
        let shortText = data.content;
        const limit = 200; 
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

        if (index % 2 === 0) {
            colLeft.appendChild(paperDiv);
        } else {
            colRight.appendChild(paperDiv);
        }
      });

      scatterContainer.appendChild(colLeft);
      scatterContainer.appendChild(colRight);

      setTimeout(() => {
          if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
              
              const cards = document.querySelectorAll('.scat-paper');
              
              cards.forEach((card) => {
                  const isLast = !card.nextElementSibling; 

                  gsap.to(card, {
                      opacity: 0,       
                      scale: 0.8,       
                      filter: "blur(10px)", 
                      y: -50,          
                      
                      scrollTrigger: {
                          trigger: card,
                          start: "center center", 
                          end: isLast ? "+=500%" : "+=60%",          
                          pin: isLast ? false : true,              
                          pinSpacing: true,       
                          scrub: 1,             
                          toggleActions: "play none none reverse"
                      }
                  });
              });
          }
      }, 200);
    }
  
    // --- MODAL ---
    function initModalDOM() {
        if(!modalStackWrap || modalStackWrap.children.length > 0) return; 
        
        papersData.forEach((d) => {
            const modPaper = document.createElement('div');
            modPaper.classList.add('mod-paper');
            const imgHTML = d.image ? `<img src="${d.image}" class="paper-img-large">` : '';
            modPaper.innerHTML = ` ${imgHTML} <h2>${d.title}</h2> <p>${d.content}</p> `;
            modalStackWrap.appendChild(modPaper);
        });
    }

    function animateModalStack() {
        if(!modalStackWrap) return;
        
        const cards = modalStackWrap.querySelectorAll('.mod-paper');

        cards.forEach((card, index) => {
            
            if (index === activeIndex) card.classList.add('active');
            else card.classList.remove('active');

            if (index === activeIndex) {
                gsap.to(card, {
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    zIndex: 20,
                    filter: "brightness(100%) blur(0px)",
                    duration: 0.6,
                    ease: "back.out(1.2)" 
                });
            } 
            else if (index < activeIndex) {
                gsap.to(card, {
                    scale: 0.8,
                    x: -600,        
                    y: 50,
                    rotation: -15,  
                    opacity: 0,     
                    zIndex: index,  
                    duration: 0.5,
                    ease: "power2.in"
                });
            } 
            else {
                const offset = index - activeIndex; 
                const randomRot = ((index * 5) % 6) - 3; 

                gsap.to(card, {
                    scale: 1 - (offset * 0.05), 
                    x: offset * 20,             
                    y: offset * -10,            
                    rotation: randomRot,
                    opacity: 1,                 
                    zIndex: 20 - offset,        
                    filter: "brightness(90%)",  
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });

        updateButtonVisibility();
    }

    function updateButtonVisibility() {
        if (prevBtn) prevBtn.style.display = (activeIndex === 0) ? 'none' : 'flex';
        if (nextBtn) nextBtn.style.display = (activeIndex === papersData.length - 1) ? 'none' : 'flex';
    }
  
    function openModal() { 
        if(modal) modal.classList.remove('hidden'); 
        document.body.classList.add('no-scroll'); 
        
        initModalDOM();      
        animateModalStack(); 
    }
  
    function closeModal() { 
        if(modal) modal.classList.add('hidden'); 
        document.body.classList.remove('no-scroll'); 
    }
  
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    
    if(nextBtn) nextBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        if (activeIndex < papersData.length - 1) { 
            activeIndex++; 
            animateModalStack(); 
        } 
    });
    
    if(prevBtn) prevBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        if (activeIndex > 0) { 
            activeIndex--; 
            animateModalStack(); 
        } 
    });
    
    if(modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  
    document.addEventListener('DOMContentLoaded', () => { renderScatteredView(); });
}
