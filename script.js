// SAUDAÇÃO POR HORÁRIO
(function setGreeting() {
    const h = new Date().getHours();
    let msg = '';
    if (h >= 5 && h < 12) msg = '🌅 Bom dia, seja bem-vindo.';
    else if (h >= 12 && h < 18) msg = '☀️ Boa tarde, seja bem-vindo.';
    else msg = '🌙 Boa noite, seja bem-vindo.';
    document.getElementById('greeting').textContent = msg;
})();

// PROJETOS
(function renderProjects() {
    const projects = [{
        name: 'Nexus · Task Manager',
        icon: '⚡',
        desc: 'Sistema de tarefas com gamificação, gráficos, loja e conquistas.',
        tech: ['HTML', 'CSS', 'JS', 'Chart.js']
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
    }];

    const grid = document.getElementById('projects-grid');
    grid.innerHTML = projects.map(p => `
        <div class="project-card">
            <span class="icon">${p.icon}</span>
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
            <div class="tags">
                ${p.tech.map(t => `<span>${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
})();