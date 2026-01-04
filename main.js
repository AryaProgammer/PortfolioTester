// ======================
// 1. Typed.js (tetap sama, tidak berubah)
// ======================
const typed = new Typed(".text", {
    strings: ["Frontend Developer", "Backend Developer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

document.addEventListener("DOMContentLoaded", function () {
    // ======================
    // 2. ABOUT Section Observer (animasi sekali saja)
    // ======================
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    aboutObserver.unobserve(entry.target); // Sekali saja
                }
            });
        }, { threshold: 0.2 });
        aboutObserver.observe(aboutSection);
    }

    // ======================
    // 3. SKILLS Observer (animasi sekali saja)
    // ======================
    const skills = document.querySelectorAll('.skill');
    const skillTitles = document.querySelectorAll('.skills-title h2, .skills-title span');
    if (skills.length || skillTitles.length) {
        const skillObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('animate');
                    obs.unobserve(entry.target); // Sekali saja
                }
            });
        }, { threshold: 0.2 });
        skillTitles.forEach(title => skillObserver.observe(title));
        skills.forEach(skill => skillObserver.observe(skill));
    }

    // ======================
    // 4. CONTACT Observer (animasi sekali saja)
    // ======================
    const contactElements = document.querySelectorAll(
        '.contact, .contact-text, .contact-info, .contact-list li, .contact-form'
    );
    if (contactElements.length) {
        const contactObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); // Sekali saja
                }
            });
        }, { threshold: 0.5 });
        contactElements.forEach(el => contactObserver.observe(el));
    }

    // ======================
    // 5. CONTACT Text Smooth Animation (animasi sekali saja)
    // ======================
    const portfolioTextObserver = document.querySelectorAll(
        '.contact-text p, .contact-list li, .contact-form form input, .contact-form form textarea, .contact-form form .send'
    );
    if (portfolioTextObserver.length) {
        const pObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    pObserver.unobserve(entry.target); // Sekali saja
                }
            });
        }, { threshold: 0.2 });
        portfolioTextObserver.forEach(el => pObserver.observe(el));
    }

    // ======================
    // 6. Footer Observer (animasi sekali saja)
    // ======================
    const footer = document.querySelector(".footer");
    if (footer) {
        const footerObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add("show-footer");
                    footerObserver.unobserve(footer); // Sekali saja
                }
            });
        });
        footerObserver.observe(footer);
    }

    // ======================
    // 7. Portfolio Filter (dioptimasi untuk anti-lag dan responsif)
    // ======================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                // Reset active state
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        // Gunakan requestAnimationFrame untuk smooth transition
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        });
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => item.style.display = 'none', 300); // Delay untuk transisi
                    }
                });
            });
        });
    }

    // ======================
    // 8. Portfolio Slider (dioptimasi untuk anti-bug, touch-friendly, dan performa)
    // ======================
    window.slidePortfolio = function (sliderId, direction) {
        const slider = document.getElementById('portfolio-slider-' + sliderId);
        if (!slider) return; // Anti-bug: cek jika slider ada

        const images = slider.querySelectorAll('.slider-img');
        if (!images.length) return;

        let current = Array.from(images).findIndex(img => img.classList.contains('active'));
        if (current === -1) return; // Anti-bug: pastikan ada active

        images[current].classList.remove('active');

        let next = current + direction;
        if (next < 0) next = images.length - 1;
        if (next >= images.length) next = 0;

        images[next].classList.add('active');
    };

    // ======================
    // 9. Portfolio Observer (animasi scroll sekali saja)
    // ======================
    const scrollElements = document.querySelectorAll(
        '.portfolio-title h2, .portfolio-title p, .portfolio-filter, .portfolio-item'
    );
    if (scrollElements.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate'); // Tambahkan animasi
                        observer.unobserve(entry.target); // HENTIKAN OBSERVE (animasi SEKALI SAJA)
                    }
                });
            },
            { threshold: 0.2 } // 20% elemen terlihat
        );
        scrollElements.forEach((el) => observer.observe(el));
    }

    // ======================
    // 10. SOFT SKILLS Observer (animasi sekali saja)
    // ======================
    const softSkills = document.querySelectorAll(".btn-box1");
    if (softSkills.length) {
        const softObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.3 }
        );
        softSkills.forEach(skill => softObserver.observe(skill));
    }

    const softSkillSection = document.querySelector('#SoftSkills');
    const SoftSkills = document.querySelectorAll('.btn-box1');
    if (softSkillSection && SoftSkills.length) {
        const softSkillObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    SoftSkills.forEach((skill, index) => {
                        setTimeout(() => {
                            skill.classList.add('visible');
                            skill.classList.add('animate');
                        }, index * 120);
                    });
                    obs.unobserve(entry.target); // Sekali saja
                }
            });
        }, { threshold: 0.3 });
        softSkillObserver.observe(softSkillSection);
    }

    // ======================
    // SKILLS SLIDER ELITE (dioptimasi untuk anti-lag dan responsif)
    // ======================
    const viewport = document.querySelector(".skills-viewport");
    const track = document.querySelector(".skills-track");
    const pages = document.querySelectorAll(".skills-page");
    const btnLeft = document.querySelector(".skill-btn.left");
    const btnRight = document.querySelector(".skill-btn.right");
    const indicatorsWrap = document.querySelector(".skills-indicators");

    if (viewport && track && pages.length && btnLeft && btnRight && indicatorsWrap) {
        const total = pages.length;
        let index = 0;
        let isAnimating = false;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let autoSlide;

        const duration = 800;
        const threshold = 50;

        const slideWidth = () => viewport.offsetWidth;

        function updateIndicators() {
            indicatorsWrap.querySelectorAll("button").forEach((dot, i) => {
                dot.setAttribute("aria-selected", i === index);
                dot.tabIndex = i === index ? 0 : -1;
            });
        }

        function goToSlide(i, focus = false) {
            if (isAnimating) return;
            isAnimating = true;
            index = (i + total) % total;
            currentTranslate = -index * slideWidth();
            prevTranslate = currentTranslate;
            track.style.transition = `transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`;
            track.style.transform = `translateX(${currentTranslate}px)`;
            updateIndicators();
            if (focus) indicatorsWrap.children[index].focus();
            setTimeout(() => isAnimating = false, duration);
        }

        const next = () => goToSlide(index + 1);
        const prev = () => goToSlide(index - 1);

        // Indicators
        pages.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.role = "tab";
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
            dot.setAttribute("aria-selected", i === 0);
            dot.tabIndex = i === 0 ? 0 : -1;
            dot.addEventListener("click", () => {
                stopAuto();
                goToSlide(i, true);
                startAuto();
            });
            indicatorsWrap.appendChild(dot);
        });

        // Buttons
        btnLeft.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });
        btnRight.addEventListener("click", () => { stopAuto(); next(); startAuto(); });

        // Auto Slide
        function startAuto() { stopAuto(); autoSlide = setInterval(next, 3500); }
        function stopAuto() { if (autoSlide) clearInterval(autoSlide); }
        startAuto();

        // Drag/Swipe (touch-friendly)
        viewport.addEventListener("pointerdown", e => {
            if (isAnimating) return;
            isDragging = true;
            startX = e.clientX;
            track.style.transition = "none";
            stopAuto();
            viewport.setPointerCapture(e.pointerId);
        });

        viewport.addEventListener("pointermove", e => {
            if (!isDragging) return;
            const diff = e.clientX - startX;
            currentTranslate = prevTranslate + diff;
            track.style.transform = `translateX(${currentTranslate}px)`;
        });

        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            const moved = currentTranslate - prevTranslate;
            if (Math.abs(moved) > threshold) {
                moved < 0 ? next() : prev();
            } else {
                goToSlide(index);
            }
            startAuto();
        }

        viewport.addEventListener("pointerup", endDrag);
        viewport.addEventListener("pointerleave", endDrag);

        // Keyboard
        viewport.addEventListener("keydown", e => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        });

        // Resize dengan debounce untuk anti-lag
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => goToSlide(index), 100);
        });
    }

    // ======================
    // Lightbox untuk Portfolio (fitur tambahan untuk interaktivitas)
    // ======================
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('lightboxImg');
    const captionText = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.close-lightbox');

    if (modal && modalImg && captionText && closeBtn) {
        // Klik gambar untuk buka modal
        document.querySelectorAll('.slider-img').forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('show');
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
                modal.setAttribute('aria-hidden', 'false');
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    }
});