document.addEventListener('DOMContentLoaded', function() {

    // PRELOADER
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 800);
        }
    });

    // PARTÍCULAS
    function createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 20 + 10 + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            container.appendChild(particle);
        }
    }
    createParticles();

    // SAUDAÇÃO
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

    // TYPED
    function typeEffect() {
        const phrases = [
            'Estudante de ADS · Front-End em formação',
            'Criando soluções com HTML, CSS e JS',
            'Apaixonado por tecnologia e design',
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

    // CONTADORES
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

    // MENU MOBILE
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => { navLinks.classList.toggle('open'); });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => { navLinks.classList.remove('open'); });
        });
    }

    // SCROLL SPY
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });
        navAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });

    // TEMA
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // PROJETOS
    const projects = [
        { name: 'Nexus · Task Manager', icon: '⚡', desc: 'Sistema de tarefas com gamificação, gráficos, loja e conquistas.', tech: ['HTML', 'CSS', 'JS', 'Chart.js'], filter: ['html','css','js'], link: '#', detailed: 'Projeto completo de gerenciamento de tarefas com experiência gamificada.' },
        { name: 'Dashboard Analytics', icon: '📊', desc: 'Dashboard interativo com gráficos dinâmicos.', tech: ['HTML', 'CSS', 'JS'], filter: ['html','css','js'], link: '#', detailed: 'Painel de controle com visualização de dados em tempo real.' },
        { name: 'E‑commerce Platform', icon: '🛒', desc: 'Loja virtual com carrinho, filtros e responsividade.', tech: ['HTML', 'CSS', 'JS'], filter: ['html','css','js'], link: '#', detailed: 'Plataforma de e-commerce completa com carrinho e checkout.' },
        { name: 'Weather App', icon: '🌤️', desc: 'Previsão do tempo em tempo real via API.', tech: ['HTML', 'CSS', 'JS', 'API'], filter: ['html','css','js'], link: '#', detailed: 'Aplicativo de clima com dados em tempo real.' },
        { name: 'Landing Page', icon: '🎯', desc: 'Landing page moderna com foco em conversão.', tech: ['HTML', 'CSS'], filter: ['html','css'], link: '#', detailed: 'Página de vendas otimizada para conversão.' },
        { name: 'React Dashboard', icon: '⚛️', desc: 'Dashboard desenvolvido com React e hooks.', tech: ['React', 'CSS'], filter: ['react','css'], link: '#', detailed: 'Dashboard moderno com componentes reutilizáveis.' }
    ];

    function renderProjects(filter = 'all') {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        const filtered = filter === 'all' ? projects : projects.filter(p => p.filter.includes(filter));
        grid.innerHTML = filtered.map(p => `
            <div class="project-card">
                <span class="icon">${p.icon}</span>
                <h4>${p.name}</h4>
                <p>${p.desc}</p>
                <div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
                <button class="btn btn-sm btn-primary modal-trigger" data-id="${p.name}">Ver detalhes</button>
            </div>
        `).join('');
        document.querySelectorAll('.modal-trigger').forEach(btn => {
            btn.addEventListener('click', function() {
                const project = projects.find(p => p.name === this.getAttribute('data-id'));
                if (project) openModal(project);
            });
        });
    }
    renderProjects();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProjects(this.getAttribute('data-filter'));
        });
    });

    // MODAL
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTech = document.getElementById('modalTech');
    const modalLink = document.getElementById('modalLink');

    function openModal(project) {
        modalTitle.textContent = project.name;
        modalDesc.textContent = project.detailed || project.desc;
        modalTech.innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');
        modalLink.href = project.link || '#';
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    if (modalClose) {
        modalClose.addEventListener('click', () => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; });
        modal.addEventListener('click', function(e) { if (e.target === this) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; } });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { modal.style.display = 'none'; document.body.style.overflow = 'auto'; } });
    }

    // HABILIDADES
    const skills = [
        { name: 'HTML5', icon: 'fab fa-html5', level: 85 },
        { name: 'CSS3', icon: 'fab fa-css3-alt', level: 80 },
        { name: 'JavaScript', icon: 'fab fa-js', level: 75 },
        { name: 'Git', icon: 'fab fa-git-alt', level: 70 },
        { name: 'GitHub', icon: 'fab fa-github', level: 75 },
        { name: 'React', icon: 'fab fa-react', level: 60 }
    ];
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        skillsGrid.innerHTML = skills.map(s => `
            <div class="skill-item">
                <i class="${s.icon}"></i>
                <span>${s.name}</span>
                <div class="skill-bar"><div class="skill-level" style="width: ${s.level}%;"></div></div>
            </div>
        `).join('');
    }

    // CERTIFICADOS
    const certs = [
        { name: 'HTML5 e CSS3', issuer: 'Curso em Vídeo', year: '2025' },
        { name: 'JavaScript Básico', issuer: 'Curso em Vídeo', year: '2025' },
        { name: 'Git e GitHub', issuer: 'Curso em Vídeo', year: '2026' },
        { name: 'ReactJS', issuer: 'Rocketseat', year: '2026' }
    ];
    const certGrid = document.getElementById('cert-grid');
    if (certGrid) {
        certGrid.innerHTML = certs.map(c => `
            <div class="cert-card">
                <i class="fas fa-certificate"></i>
                <h4>${c.name}</h4>
                <p>${c.issuer} · ${c.year}</p>
            </div>
        `).join('');
    }

    // TIMELINE
    const timelineData = [
        { year: '2026', title: 'Início da Faculdade', desc: 'Comecei Análise e Desenvolvimento de Sistemas' },
        { year: '2026', title: 'Primeiro Portfólio', desc: 'Publiquei meu primeiro site no GitHub Pages' },
        { year: '2026', title: 'Nexus Project', desc: 'Desenvolvi sistema completo de tarefas com gamificação' },
        { year: '2027', title: 'React Studies', desc: 'Iniciei estudos em React e desenvolvimento de APIs' }
    ];
    const timelineEl = document.getElementById('timeline');
    if (timelineEl) {
        timelineEl.innerHTML = timelineData.map(t => `
            <div class="timeline-item">
                <div class="timeline-year">${t.year}</div>
                <div class="timeline-content"><h4>${t.title}</h4><p>${t.desc}</p></div>
            </div>
        `).join('');
    }

    // DEPOIMENTOS
    const depoimentos = [
        { name: 'Professor A.', text: 'Carlos é um aluno dedicado e curioso. Tem grande potencial na área de tecnologia.' },
        { name: 'Colega B.', text: 'Sempre disposto a ajudar e compartilhar conhecimento. Ótimo trabalho em equipe.' }
    ];
    const depoGrid = document.getElementById('depoimentos-grid');
    if (depoGrid) {
        depoGrid.innerHTML = depoimentos.map(d => `
            <div class="depoimento-card">
                <i class="fas fa-quote-left"></i>
                <p>${d.text}</p>
                <h4>— ${d.name}</h4>
            </div>
        `).join('');
    }

    // FAQ
    const faqs = [
        { q: 'Qual sua principal tecnologia?', a: 'Tenho foco em JavaScript e React, mas também trabalho com HTML, CSS e ferramentas de versionamento.' },
        { q: 'Está disponível para estágio?', a: 'Sim! Estou buscando oportunidades de estágio e desenvolvimento júnior.' },
        { q: 'Onde posso ver seus projetos?', a: 'Todos os meus projetos estão disponíveis no GitHub e no meu portfólio.' }
    ];
    const faqGrid = document.getElementById('faq-grid');
    if (faqGrid) {
        faqGrid.innerHTML = faqs.map((f, index) => `
            <div class="faq-item">
                <button class="faq-question" data-index="${index}">${f.q} <i class="fas fa-chevron-down"></i></button>
                <div class="faq-answer" id="faq-answer-${index}"><p>${f.a}</p></div>
            </div>
        `).join('');
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const answer = document.getElementById(`faq-answer-${index}`);
                const isOpen = answer.style.display === 'block';
                document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
                document.querySelectorAll('.faq-question i').forEach(i => i.style.transform = 'rotate(0deg)');
                if (!isOpen) {
                    answer.style.display = 'block';
                    this.querySelector('i').style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    // GERADOR DE IDEIAS
    const ideias = [
        'Crie um app de receitas com busca por ingredientes',
        'Desenvolva um jogo da velha com IA',
        'Crie um dashboard de vendas com gráficos',
        'Desenvolva um site de portfólio com efeito parallax',
        'Crie um gerador de senhas seguras',
        'Desenvolva um app de clima com previsão semanal',
        'Crie um sistema de tarefas com gamificação',
        'Desenvolva um e-commerce com carrinho e checkout',
        'Crie um blog com sistema de comentários',
        'Desenvolva uma calculadora científica interativa'
    ];
    const gerarBtn = document.getElementById('gerarIdeia');
    const resultado = document.getElementById('ideiaResultado');
    if (gerarBtn && resultado) {
        gerarBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * ideias.length);
            resultado.innerHTML = `<div class="ideia-item"><i class="fas fa-lightbulb"></i><span>${ideias[randomIndex]}</span></div>`;
        });
    }

    // BACK TO TOP
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 400);
        });
        backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // COMPARTILHAR
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({ title: 'Carlos · Portfólio', text: 'Confira meu portfólio de desenvolvimento!', url: window.location.href });
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copiado para a área de transferência!');
            }
        });
    }

    // SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

});