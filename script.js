// ============================================
// SCRIPT.JS — PORTFÓLIO CARLOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. SAUDAÇÃO POR HORÁRIO
    // ============================================
    function setGreeting() {
        const h = new Date().getHours();
        let msg = '';
        if (h >= 5 && h < 12) msg = '🌅 Bom dia, seja bem-vindo.';
        else if (h >= 12 && h < 18) msg = '☀️ Boa tarde, seja bem-vindo.';
        else msg = '🌙 Boa noite, seja bem-vindo.';
        const el = document.getElementById('greeting');
        if (el) el.textContent = msg;
    }
    setGreeting();

    // ============================================
    // 2. EFEITO DE DIGITAÇÃO (TYPED)
    // ============================================
    function typeEffect() {
        const phrases = [
            'Estudante de ADS · Front-End em formação',
            'Criando soluções com HTML, CSS e JS',
            'Sempre aprendendo algo novo',
            'Desenvolvedor em evolução constante'
        ];
        let phraseIndex = 0, charIndex = 0, isDeleting = false;
        const el = document.getElementById('typed-text');
        if (!el) return;
        function type() {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                el.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }
            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
                return;
            }
            setTimeout(type, isDeleting ? 50 : 100);
        }
        type();
    }
    typeEffect();

    // ============================================
    // 3. CONTADORES ANIMADOS (HERO STATS)
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    let current = 0;
                    const increment = Math.ceil(target / 50);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) { current = target; clearInterval(timer); }
                        el.textContent = current;
                    }, 40);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => observer.observe(c));
    }
    animateCounters();

    // ============================================
    // 4. MENU MOBILE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('open');
            }
        });
    }

    // ============================================
    // 5. SCROLL SPY (DESTACA O LINK ATIVO)
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    if (sections.length > 0 && navAnchors.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            navAnchors.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `${current}.html`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // 6. MODO DE ACESSIBILIDADE
    // ============================================
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const body = document.body;
    if (localStorage.getItem('accessibility-mode') === 'true') {
        body.classList.add('accessibility-mode');
    }
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', () => {
            body.classList.toggle('accessibility-mode');
            const isActive = body.classList.contains('accessibility-mode');
            localStorage.setItem('accessibility-mode', isActive);
        });
    }

    // ============================================
    // 7. BOTÃO VOLTAR AO TOPO
    // ============================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 300);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // 8. ANIMAÇÕES DE ENTRADA (FADE-IN)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => fadeObserver.observe(el));

    // ============================================
    // 9. FAQ (ACORDEÃO)
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(btn => {
            btn.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isOpen = answer.style.display === 'block';
                document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
                document.querySelectorAll('.faq-question i').forEach(i => i.style.transform = 'rotate(0deg)');
                if (!isOpen) {
                    answer.style.display = 'block';
                    this.querySelector('i').style.transform = 'rotate(180deg)';
                }
            });
        });
        const firstAnswer = document.querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.display = 'block';
            const firstIcon = document.querySelector('.faq-question i');
            if (firstIcon) firstIcon.style.transform = 'rotate(180deg)';
        }
    }

    // ============================================
    // 10. SCROLL SUAVE PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // 11. DETECTAR PÁGINA ATUAL PARA O MENU
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

});