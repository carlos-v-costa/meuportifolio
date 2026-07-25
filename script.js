// ============================================
// PORTFÓLIO CARLOS — COMPLETO
// ============================================

// 1. SAUDAÇÃO POR HORÁRIO
(function setGreeting() {
    const h = new Date().getHours();
    let msg = '';
    if (h >= 5 && h < 12) msg = '🌅 Bom dia, seja bem-vindo.';
    else if (h >= 12 && h < 18) msg = '☀️ Boa tarde, seja bem-vindo.';
    else msg = '🌙 Boa noite, seja bem-vindo.';
    document.getElementById('greeting').textContent = msg;
})();

// 2. EFEITO DE DIGITAÇÃO (TYPED)
(function typeEffect() {
    const phrases = [
        'Estudante de ADS · Front-End em formação',
        'Criando soluções com HTML, CSS e JS',
        'Apaixonado por tecnologia e design',
        'Sempre aprendendo algo novo'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
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
})();

// 3. MENU MOBILE TOGGLE
document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.toggle('open');
});

// 4. FECHAR MENU AO CLICAR EM LINK (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links')?.classList.remove('open');
    });
});

// 5. PROJETOS
(function renderProjects() {
    const projects = [{
        name: 'Nexus · Task Manager',
        icon: '⚡',
        desc: 'Sistema de tarefas com gamificação, gráficos, loja e conquistas.',
        tech: ['HTML', 'CSS', 'JS', 'Chart.js'],
        isNexus: true
    }, {
        name: 'Dashboard Analytics',
        icon: '📊',
        desc: 'Dashboard interativo com gráficos dinâmicos.',
        tech: ['HTML', 'CSS', 'JS']
    }, {
        name: 'E‑commerce Platform',
        icon: '🛒',
        desc: 'Loja virtual com carrinho, filtros e responsividade.',
        tech: ['HTML', 'CSS', 'JS']
    }, {
        name: 'Weather App',
        icon: '🌤️',
        desc: 'Previsão do tempo em tempo real via API.',
        tech: ['HTML', 'CSS', 'JS', 'API']
    }, {
        name: 'Landing Page',
        icon: '🎯',
        desc: 'Landing page moderna com foco em conversão.',
        tech: ['HTML', 'CSS']
    }];

    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects.map(p => `
        <div class="project-card">
            <span class="icon">${p.icon}</span>
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
            <div class="tags">
                ${p.tech.map(t => `<span class="${p.isNexus ? 'nexus-tag' : ''}">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
})();

// 6. HABILIDADES
(function renderSkills() {
    const skills = [
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'React', icon: 'fab fa-react' }
    ];

    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = skills.map(s => `
        <div class="skill-item">
            <i class="${s.icon}"></i>
            <span>${s.name}</span>
        </div>
    `).join('');
})();

// 7. SCROLL SUAVE (links internos)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 8. NAVBAR EFEITO AO SCROLL
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 15, 10, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(46, 204, 113, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 15, 10, 0.85)';
        navbar.style.borderBottom = '1px solid rgba(46, 204, 113, 0.1)';
    }
});