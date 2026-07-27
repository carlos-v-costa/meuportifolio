// ============================================
// SCRIPT.JS — 1500 IDEIAS (COMPLETO)
// ============================================

// ============================================
// 1. PRELOADER
// ============================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => { preloader.style.display = 'none'; }, 800);
    }
});

// ============================================
// 2. PARTÍCULAS MATRIX
// ============================================
function createMatrixParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 20 + 10 + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.05;
        const green = Math.floor(Math.random() * 100 + 155);
        particle.style.background = `rgba(0, ${green}, 50, 0.12)`;
        particle.style.boxShadow = `0 0 ${Math.random() * 15 + 5}px rgba(0, ${green}, 50, 0.15)`;
        container.appendChild(particle);
    }
}
createMatrixParticles();

// ============================================
// 3. SAUDAÇÃO POR HORÁRIO
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
// 4. EFEITO DE DIGITAÇÃO (TYPED)
// ============================================
function typeEffect() {
    const phrases = [
        'Estudante de ADS · Front-End em formação',
        'Criando soluções com HTML, CSS e JS',
        '1500 ideias para inspirar',
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
// 5. CONTADORES ANIMADOS (HERO STATS)
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
// 6. MENU MOBILE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => { navLinks.classList.remove('open'); });
    });
}

// ============================================
// 7. SCROLL SPY
// ============================================
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

// ============================================
// 8. TEMA CLARO/ESCURO
// ============================================
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

// ============================================
// 9. CATEGORIAS (ACESSO RÁPIDO)
// ============================================
const categorias = [
    { id: 'categoria1', nome: 'Projetos Web', icon: '🌐' },
    { id: 'categoria2', nome: 'Design e UI/UX', icon: '🎨' },
    { id: 'categoria3', nome: 'Ferramentas e Utilitários', icon: '🛠️' },
    { id: 'categoria4', nome: 'IA e Automação', icon: '🤖' },
    { id: 'categoria5', nome: 'Educação e Aprendizado', icon: '📚' },
    { id: 'categoria6', nome: 'Sustentabilidade', icon: '🌿' },
    { id: 'categoria7', nome: 'Saúde e Bem-Estar', icon: '🧠' },
    { id: 'categoria8', nome: 'Social e Comunidade', icon: '🌍' },
    { id: 'categoria9', nome: 'Jogos e Entretenimento', icon: '🎮' },
    { id: 'categoria10', nome: 'Startups e Negócios', icon: '💼' },
    { id: 'categoria11', nome: 'Ciência e Tecnologia', icon: '🔬' },
    { id: 'categoria12', nome: 'Arte e Cultura', icon: '🎭' },
    { id: 'categoria13', nome: 'Finanças e Investimentos', icon: '💰' },
    { id: 'categoria14', nome: 'Marketing e Vendas', icon: '📈' },
    { id: 'categoria15', nome: 'Estilo de Vida e Hobbies', icon: '🏖️' }
];

const categoriasGrid = document.getElementById('categoriasGrid');
if (categoriasGrid) {
    categoriasGrid.innerHTML = categorias.map(cat => `
        <a href="#${cat.id}" class="categoria-card">
            <span class="categoria-icon">${cat.icon}</span>
            <span class="categoria-nome">${cat.nome}</span>
        </a>
    `).join('');
}

// ============================================
// 10. AS 1500 IDEIAS (15 CATEGORIAS × 100)
// ============================================
const ideiasPorCategoria = {
    categoria1: [
        '1. Sistema de tarefas com prioridades e prazos',
        '2. Blog pessoal com sistema de comentários',
        '3. Loja virtual com carrinho e checkout',
        '4. Dashboard de vendas com gráficos dinâmicos',
        '5. Aplicativo de clima com previsão semanal',
        '6. Gerador de currículos personalizados',
        '7. Sistema de agendamento de consultas',
        '8. Rede social para troca de livros',
        '9. Aplicativo de receitas com filtros e favoritos',
        '10. Gerenciador de finanças pessoais',
        '11. Jogo da velha com IA',
        '12. Calculadora científica interativa',
        '13. Sistema de estoque com código de barras',
        '14. Portal de notícias com API',
        '15. Aplicativo de meditação guiada',
        '16. Sistema de controle de horas trabalhadas',
        '17. Gerenciador de projetos estilo Trello',
        '18. Aplicativo de delivery de comida',
        '19. Sistema de reservas de hotéis',
        '20. Aplicativo de tradução de textos',
        '21. Editor de imagens básico',
        '22. Ferramenta de compressão de arquivos',
        '23. Sistema de enquetes e votações',
        '24. Aplicativo de automação de e-mails',
        '25. Galeria de fotos com tags',
        '26. Tocador de música com playlists',
        '27. Player de vídeo com legendas',
        '28. Podcast com episódios e descrições',
        '29. Aplicativo de criptografia de mensagens',
        '30. Sistema de backup automático (nuvem)',
        '31. Ferramenta de análise de dados (CSV)',
        '32. App de reconhecimento de voz (comandos)',
        '33. Sistema de busca com autocomplete',
        '34. Ferramenta de conversão de vídeos',
        '35. App de monitoramento de servidores',
        '36. Sistema de recomendação de produtos',
        '37. Ferramenta de diagramas (flowcharts)',
        '38. App de anotações com markdown',
        '39. Sistema de gestão de documentos',
        '40. Ferramenta de OCR (extrair texto de imagens)',
        '41. App de QR Code (gerador e leitor)',
        '42. Sistema de notificações em tempo real',
        '43. Ferramenta de benchmarking de sites',
        '44. App de comparação de preços',
        '45. Sistema de treinos personalizados',
        '46. Ferramenta de cálculo de IMC',
        '47. App de metas financeiras',
        '48. Sistema de lista de compras compartilhada',
        '49. Ferramenta de encurtador de URLs',
        '50. App de rastreamento de hábitos',
        '51. Sistema de estatísticas de uso',
        '52. Ferramenta de geração de relatórios PDF',
        '53. App de integração com APIs externas',
        '54. Sistema de login com autenticação 2FA',
        '55. Ferramenta de testes A/B',
        '56. App de feedback de usuários',
        '57. Sistema de roadmap de produtos',
        '58. Ferramenta de prototipação de interfaces',
        '59. App de colaboração em tempo real',
        '60. Sistema de gestão de equipes',
        '61. Ferramenta de timesheets (horas trabalhadas)',
        '62. App de planejamento de viagens',
        '63. Sistema de avaliação de restaurantes',
        '64. Ferramenta de cálculo de gorjetas',
        '65. App de conversão de unidades',
        '66. Sistema de sorteio de nomes',
        '67. Ferramenta de gerador de cores (paletas)',
        '68. App de busca de GIFs (API)',
        '69. Sistema de piadas aleatórias (API)',
        '70. Ferramenta de fatos curiosos (API)',
        '71. App de citações inspiradoras',
        '72. Sistema de previsão do zodíaco',
        '73. Ferramenta de cálculo de idade (datas)',
        '74. App de contagem regressiva para eventos',
        '75. Sistema de cronômetro com voltas',
        '76. Ferramenta de timer Pomodoro',
        '77. App de despertador com alarme',
        '78. Sistema de lista de tarefas com prioridades',
        '79. Ferramenta de nota fiscal (simples)',
        '80. App de cálculo de empréstimos',
        '81. Sistema de investimentos simulados',
        '82. Ferramenta de projeção de aposentadoria',
        '83. App de orçamento familiar',
        '84. Sistema de fluxo de caixa',
        '85. Ferramenta de DRE (demonstração de resultados)',
        '86. App de análise de balanço patrimonial',
        '87. Sistema de contabilidade simples',
        '88. Ferramenta de gestão de estoque',
        '89. App de gestão de fornecedores',
        '90. Sistema de pedidos de compra',
        '91. Ferramenta de logística de entregas',
        '92. App de rotas otimizadas (mapa)',
        '93. Sistema de frota de veículos',
        '94. Ferramenta de manutenção preditiva',
        '95. App de controle de qualidade',
        '96. Sistema de auditoria de processos',
        '97. Ferramenta de compliance regulatório',
        '98. App de gestão de riscos',
        '99. Sistema de continuidade de negócios',
        '100. Ferramenta de plano de contingência'
    ],
    categoria2: [
        '101. Design de landing pages de alta conversão',
        '102. Criação de identidade visual para startups',
        '103. Design de interfaces mobile-first',
        '104. Prototipação de aplicativos com Figma',
        '105. Criação de sistemas de design (design systems)',
        '106. Design de dashboards para dados complexos',
        '107. Criação de guias de estilo (style guides)',
        '108. Design de websites acessíveis (WCAG)',
        '109. Criação de wireframes para aplicativos',
        '110. Design de interfaces para e-commerce',
        '111. Criação de mockups de alta fidelidade',
        '112. Design de experiências de usuário (UX)',
        '113. Criação de fluxos de usuário (user flows)',
        '114. Design de personas para produtos digitais',
        '115. Criação de mapas de empatia',
        '116. Design de jornadas de usuário',
        '117. Criação de protótipos interativos',
        '118. Design de interfaces para redes sociais',
        '119. Criação de layouts para blogs',
        '120. Design de interfaces para aplicativos de saúde',
        '121. Criação de interfaces para fintechs',
        '122. Design de aplicativos de educação',
        '123. Criação de interfaces para jogos',
        '124. Design de aplicativos de transporte',
        '125. Criação de interfaces para IoT (Internet das Coisas)',
        '126. Design de aplicativos de realidade aumentada',
        '127. Criação de interfaces para dispositivos wearables',
        '128. Design de aplicativos de smart home',
        '129. Criação de interfaces para carros autônomos',
        '130. Design de aplicativos de viagem',
        '131. Criação de interfaces para turismo',
        '132. Design de aplicativos de gastronomia',
        '133. Criação de interfaces para eventos',
        '134. Design de aplicativos de esportes',
        '135. Criação de interfaces para fitness',
        '136. Design de aplicativos de música',
        '137. Criação de interfaces para podcasts',
        '138. Design de aplicativos de streaming',
        '139. Criação de interfaces para séries e filmes',
        '140. Design de aplicativos de leitura',
        '141. Criação de interfaces para e-books',
        '142. Design de aplicativos de aprendizado de idiomas',
        '143. Criação de interfaces para cursos online',
        '144. Design de aplicativos de mentoria',
        '145. Criação de interfaces para coaching',
        '146. Design de aplicativos de meditação',
        '147. Criação de interfaces para bem-estar',
        '148. Design de aplicativos de cuidados pessoais',
        '149. Criação de interfaces para saúde mental',
        '150. Design de aplicativos de nutrição',
        '151. Criação de interfaces para receitas',
        '152. Design de aplicativos de compras',
        '153. Criação de interfaces para marketplaces',
        '154. Design de aplicativos de serviços',
        '155. Criação de interfaces para freelancers',
        '156. Design de aplicativos de portfólio',
        '157. Criação de interfaces para agências',
        '158. Design de aplicativos de marketing',
        '159. Criação de interfaces para vendas',
        '160. Design de aplicativos de CRM',
        '161. Criação de interfaces para ERP',
        '162. Design de aplicativos de RH',
        '163. Criação de interfaces para recursos humanos',
        '164. Design de aplicativos de folha de pagamento',
        '165. Criação de interfaces para benefícios',
        '166. Design de aplicativos de gestão de pessoas',
        '167. Criação de interfaces para cultura organizacional',
        '168. Design de aplicativos de feedback',
        '169. Criação de interfaces para avaliação de desempenho',
        '170. Design de aplicativos de reconhecimento',
        '171. Criação de interfaces para recompensas',
        '172. Design de aplicativos de engajamento',
        '173. Criação de interfaces para colaboradores',
        '174. Design de aplicativos de comunicação interna',
        '175. Criação de interfaces para intranet',
        '176. Design de aplicativos de notícias corporativas',
        '177. Criação de interfaces para eventos internos',
        '178. Design de aplicativos de treinamento',
        '179. Criação de interfaces para capacitação',
        '180. Design de aplicativos de desenvolvimento profissional',
        '181. Criação de interfaces para carreira',
        '182. Design de aplicativos de sucessão',
        '183. Criação de interfaces para liderança',
        '184. Design de aplicativos de gestão de talentos',
        '185. Criação de interfaces para diversidade e inclusão',
        '186. Design de aplicativos de responsabilidade social',
        '187. Criação de interfaces para sustentabilidade',
        '188. Design de aplicativos de meio ambiente',
        '189. Criação de interfaces para causas sociais',
        '190. Design de aplicativos de voluntariado',
        '191. Criação de interfaces para doações',
        '192. Design de aplicativos de crowdfunding',
        '193. Criação de interfaces para investimento social',
        '194. Design de aplicativos de impacto social',
        '195. Criação de interfaces para comunidades',
        '196. Design de aplicativos de networking',
        '197. Criação de interfaces para eventos sociais',
        '198. Design de aplicativos de encontros',
        '199. Criação de interfaces para relacionamentos',
        '200. Design de aplicativos de família e amigos'
    ],
    categoria3: [
        '201. Ferramenta de corte e redimensionamento de imagens',
        '202. Compactador de arquivos online (ZIP/RAR)',
        '203. Conversor de formatos de vídeo (MP4, AVI, MOV)',
        '204. Extrator de áudio de vídeos (MP3)',
        '205. Ferramenta de OCR (reconhecimento de texto)',
        '206. Editor de PDF (junta, divide, assina)',
        '207. Gerador de currículos (modelos prontos)',
        '208. Calculadora de porcentagem e juros',
        '209. Conversor de moedas (câmbio)',
        '210. Ferramenta de fuso horário (conversão de horários)',
        '211. Calendário de feriados e eventos',
        '212. Contador de dias entre datas (calculadora de idade)',
        '213. Gerador de senhas fortes (customizável)',
        '214. Validador de CPF e CNPJ',
        '215. Gerador de QR Code com logo',
        '216. Leitor de QR Code (câmera)',
        '217. Ferramenta de encurtador de URLs',
        '218. Analisador de SEO (palavras-chave)',
        '219. Verificador de velocidade de site',
        '220. Ferramenta de teste de responsividade',
        '221. Gerador de cores (paletas)',
        '222. Ferramenta de gradientes (CSS)',
        '223. Gerador de sombras (CSS box-shadow)',
        '224. Ferramenta de bordas (CSS border-radius)',
        '225. Gerador de código HTML/CSS/JS',
        '226. Ferramenta de formatação de código (beautifier)',
        '227. Minificador de CSS e JS',
        '228. Ferramenta de validação de JSON',
        '229. Ferramenta de formatação de JSON',
        '230. Gerador de API (mock)',
        '231. Ferramenta de testes de API (Postman-like)',
        '232. Gerador de dados falsos (Faker)',
        '233. Ferramenta de conversão CSV ↔ JSON',
        '234. Gerador de gráficos (Chart.js)',
        '235. Ferramenta de diagramas (flowchart)',
        '236. Gerador de mapas mentais',
        '237. Ferramenta de brainstorming (ideias)',
        '238. Gerador de cronograma (planilha)',
        '239. Ferramenta de Gantt (gestão de projetos)',
        '240. Gerador de relatórios (PDF/Excel)',
        '241. Ferramenta de análise de dados (estatística)',
        '242. Gerador de nuvem de palavras (word cloud)',
        '243. Ferramenta de análise de sentimentos (texto)',
        '244. Gerador de resumo de textos (sumarização)',
        '245. Ferramenta de tradução automática',
        '246. Gerador de legendas (vídeos)',
        '247. Ferramenta de transcrição de áudio',
        '248. Gerador de playlist (música)',
        '249. Ferramenta de recomendações (algoritmo)',
        '250. Gerador de quizzes (perguntas)',
        '251. Ferramenta de flashcards (estudo)',
        '252. Gerador de exercícios (treino)',
        '253. Ferramenta de meditação guiada',
        '254. Gerador de receitas (culinária)',
        '255. Ferramenta de lista de compras',
        '256. Gerador de tarefas (to-do)',
        '257. Ferramenta de lembretes (notificações)',
        '258. Gerador de notas (organização)',
        '259. Ferramenta de diário (journaling)',
        '260. Gerador de metas (SMART)',
        '261. Ferramenta de hábitos (tracker)',
        '262. Gerador de rotina (planejamento)',
        '263. Ferramenta de feedback (avaliação)',
        '264. Gerador de pesquisa (formulário)',
        '265. Ferramenta de enquetes (votação)',
        '266. Gerador de sorteio (nomes)',
        '267. Ferramenta de roleta (aleatório)',
        '268. Gerador de piadas (API)',
        '269. Ferramenta de fatos curiosos (API)',
        '270. Gerador de citações (inspiração)',
        '271. Ferramenta de clima (previsão)',
        '272. Gerador de mapas (localização)',
        '273. Ferramenta de distância entre cidades',
        '274. Gerador de rotas (transporte)',
        '275. Ferramenta de horário de ônibus/trem',
        '276. Gerador de viagens (roteiro)',
        '277. Ferramenta de custo de viagem',
        '278. Gerador de hotel (busca)',
        '279. Ferramenta de voos (comparação)',
        '280. Gerador de restaurantes (recomendação)',
        '281. Ferramenta de avaliação de serviços',
        '282. Gerador de reviews (clientes)',
        '283. Ferramenta de reputação (empresas)',
        '284. Gerador de benefícios (cálculo)',
        '285. Ferramenta de salário (cálculo)',
        '286. Gerador de impostos (simples)',
        '287. Ferramenta de INSS (cálculo)',
        '288. Gerador de FGTS (simulação)',
        '289. Ferramenta de décimo terceiro (cálculo)',
        '290. Gerador de férias (cálculo)',
        '291. Ferramenta de rescisão (trabalhista)',
        '292. Gerador de contrato (modelo)',
        '293. Ferramenta de documento (geração)',
        '294. Gerador de certidão (digital)',
        '295. Ferramenta de autenticação (assinatura)',
        '296. Gerador de procuração (digital)',
        '297. Ferramenta de testamento (digital)',
        '298. Gerador de escritura (digital)',
        '299. Ferramenta de inventário (digital)',
        '300. Gerador de comprovante (digital)'
    ],
    categoria4: [
        '301. Chatbot com personalidade e contexto',
        '302. Sistema de recomendação (conteúdo, produtos)',
        '303. Analisador de sentimentos em textos',
        '304. Gerador de descrições para produtos (IA)',
        '305. Tradutor automático de textos',
        '306. Sumarizador de documentos longos',
        '307. Classificador de e-mails (spam)',
        '308. Gerador de títulos para artigos',
        '309. Sistema de perguntas e respostas (FAQ)',
        '310. Gerador de legendas para imagens',
        '311. Detector de fake news (IA)',
        '312. Sistema de reconhecimento de fala (comandos)',
        '313. Gerador de resumos para vídeos (IA)',
        '314. Analisador de currículos (match com vagas)',
        '315. Gerador de exercícios de matemática (IA)',
        '316. Sistema de correção de redações',
        '317. Gerador de questões para quizzes (IA)',
        '318. Classificador de notícias (categorias)',
        '319. Gerador de roteiro de viagem (IA)',
        '320. Sistema de previsão de demanda (vendas)',
        '321. Gerador de playlist personalizada (música)',
        '322. Analisador de perfis de redes sociais',
        '323. Gerador de respostas automáticas (chat)',
        '324. Sistema de recomendação de livros (IA)',
        '325. Gerador de exercícios de idiomas (IA)',
        '326. Classificador de imagens (categorias)',
        '327. Gerador de código automaticamente (IA)',
        '328. Sistema de detecção de fraudes (IA)',
        '329. Gerador de resenhas de produtos (IA)',
        '330. Analisador de concorrentes (IA)',
        '331. Gerador de estratégias de marketing (IA)',
        '332. Sistema de previsão de churn (cancelamento)',
        '333. Gerador de roteiros de estudo (IA)',
        '334. Analisador de feedbacks de clientes',
        '335. Gerador de personagens para jogos (IA)',
        '336. Sistema de criação de nomes (marcas, startups)',
        '337. Gerador de slogans (marketing)',
        '338. Analisador de sentimentos em músicas',
        '339. Gerador de poesias (IA)',
        '340. Sistema de criação de histórias (IA)',
        '341. Gerador de enredos para filmes (IA)',
        '342. Analisador de roteiros (cinema)',
        '343. Gerador de diálogos (filmagens)',
        '344. Sistema de tradução simultânea (áudio)',
        '345. Gerador de transcrição de reuniões (IA)',
        '346. Analisador de contratos (IA)',
        '347. Gerador de termos legais (IA)',
        '348. Sistema de identificação de plantas (IA)',
        '349. Gerador de descrição de animais (IA)',
        '350. Analisador de ecossistemas (IA)',
        '351. Gerador de rotas sustentáveis (IA)',
        '352. Sistema de previsão de clima extremo (IA)',
        '353. Gerador de alertas de desastres naturais',
        '354. Analisador de dados de saúde (IA)',
        '355. Gerador de planos de treino (IA)',
        '356. Sistema de recomendações de alimentos (IA)',
        '357. Gerador de cardápios semanais (IA)',
        '358. Analisador de hábitos alimentares',
        '359. Gerador de metas de bem-estar (IA)',
        '360. Sistema de meditação guiada (IA)',
        '361. Gerador de afirmações positivas (IA)',
        '362. Analisador de padrões de sono (IA)',
        '363. Gerador de dicas de produtividade (IA)',
        '364. Sistema de planejamento de carreira (IA)',
        '365. Gerador de perguntas para entrevistas (IA)',
        '366. Analisador de vagas de emprego (IA)',
        '367. Gerador de cartas de apresentação (IA)',
        '368. Sistema de mentoria virtual (IA)',
        '369. Gerador de conselhos financeiros (IA)',
        '370. Analisador de investimentos (IA)',
        '371. Gerador de portfólios de ações (IA)',
        '372. Sistema de detecção de oportunidades (IA)',
        '373. Gerador de ideias de negócios (IA)',
        '374. Analisador de mercado (IA)',
        '375. Gerador de estratégias empresariais (IA)',
        '376. Sistema de simulação de cenários (IA)',
        '377. Gerador de planos de negócios (IA)',
        '378. Analisador de riscos empresariais (IA)',
        '379. Gerador de pitch decks (IA)',
        '380. Sistema de avaliação de startups (IA)',
        '381. Gerador de métricas de impacto (IA)',
        '382. Analisador de sustentabilidade (IA)',
        '383. Gerador de soluções ambientais (IA)',
        '384. Sistema de inovação aberta (IA)',
        '385. Gerador de patentes (IA)',
        '386. Analisador de propriedade intelectual (IA)',
        '387. Gerador de contratos de licenciamento (IA)',
        '388. Sistema de conformidade regulatória (IA)',
        '389. Gerador de documentos legais (IA)',
        '390. Analisador de precedentes judiciais (IA)',
        '391. Gerador de petições (IA)',
        '392. Sistema de mediação virtual (IA)',
        '393. Gerador de acordos (IA)',
        '394. Analisador de conflitos (IA)',
        '395. Gerador de soluções de paz (IA)',
        '396. Sistema de negociação assistida (IA)',
        '397. Gerador de propostas comerciais (IA)',
        '398. Analisador de propostas (IA)',
        '399. Gerador de orçamentos (IA)',
        '400. Sistema de gerenciamento de contratos (IA)'
    ],
    categoria5: [
        '401. Plataforma de ensino com gamificação',
        '402. Sistema de gerenciamento de cursos (LMS)',
        '403. Ferramenta de criação de quizzes (interativos)',
        '404. Aplicativo de flashcards para estudo',
        '405. Sistema de revisão espaçada (memorização)',
        '406. Ferramenta de anotações colaborativas',
        '407. Aplicativo de dicionário personalizado',
        '408. Sistema de tradução de termos técnicos',
        '409. Ferramenta de etimologia (origem das palavras)',
        '410. Aplicativo de curiosidades (fatos diários)',
        '411. Sistema de perguntas e respostas (FAQ)',
        '412. Ferramenta de simulado (questões)',
        '413. Aplicativo de gabarito (correção automática)',
        '414. Sistema de ranking de desempenho (estudantes)',
        '415. Ferramenta de evolução de notas (gráficos)',
        '416. Aplicativo de desafios de conhecimento',
        '417. Sistema de jogos educativos (matemática, português)',
        '418. Ferramenta de palavras cruzadas (temas educativos)',
        '419. Aplicativo de caça-palavras (vocabulário)',
        '420. Sistema de jogo da forca (palavras)',
        '421. Ferramenta de ditado (áudio)',
        '422. Aplicativo de ortografia (correção)',
        '423. Sistema de gramática (exercícios interativos)',
        '424. Ferramenta de redação (temas e correção)',
        '425. Aplicativo de interpretação de texto',
        '426. Sistema de compreensão de leitura',
        '427. Ferramenta de vocabulário (novas palavras por dia)',
        '428. Aplicativo de expressões idiomáticas',
        '429. Sistema de provérbios (significados)',
        '430. Ferramenta de adivinhas (charadas educativas)',
        '431. Aplicativo de enigmas (lógica)',
        '432. Sistema de quebra-cabeças (raciocínio)',
        '433. Ferramenta de sudoku (lógica matemática)',
        '434. Aplicativo de xadrez (simples)',
        '435. Sistema de damas (estratégia)',
        '436. Ferramenta de dominó (social e educativo)',
        '437. Aplicativo de jogo de cartas (memória)',
        '438. Sistema de baralho (21)',
        '439. Ferramenta de dados (probabilidade)',
        '440. Aplicativo de roleta (aleatório educativo)',
        '441. Sistema de sorteio (nomes)',
        '442. Ferramenta de gerador de números',
        '443. Aplicativo de estatísticas (probabilidades)',
        '444. Sistema de gráficos (visualização de dados)',
        '445. Ferramenta de tabelas (dados)',
        '446. Aplicativo de fórmulas (matemática)',
        '447. Sistema de equações (álgebra)',
        '448. Ferramenta de geometria (formas)',
        '449. Aplicativo de trigonometria (ângulos)',
        '450. Sistema de cálculo (derivadas e integrais)',
        '451. Ferramenta de estatística (médias)',
        '452. Aplicativo de probabilidade (eventos)',
        '453. Sistema de combinatória (arranjos)',
        '454. Ferramenta de lógica (proposições)',
        '455. Aplicativo de filosofia (pensadores)',
        '456. Sistema de ética (dilemas)',
        '457. Ferramenta de sociologia (grupos)',
        '458. Aplicativo de psicologia (comportamento)',
        '459. Sistema de história (linha do tempo)',
        '460. Ferramenta de geografia (mapas)',
        '461. Aplicativo de biologia (células)',
        '462. Sistema de química (elementos)',
        '463. Ferramenta de física (leis)',
        '464. Aplicativo de astronomia (planetas)',
        '465. Sistema de evolução (espécies)',
        '466. Ferramenta de genética (DNA)',
        '467. Aplicativo de ecologia (ecossistemas)',
        '468. Sistema de clima (meteorologia)',
        '469. Ferramenta de oceanografia (mares)',
        '470. Aplicativo de geologia (rochas)',
        '471. Sistema de paleontologia (fósseis)',
        '472. Ferramenta de arqueologia (artefatos)',
        '473. Aplicativo de antropologia (culturas)',
        '474. Sistema de mitologia (deuses)',
        '475. Ferramenta de religião (ritos)',
        '476. Aplicativo de espiritualidade (meditação)',
        '477. Sistema de autoconhecimento (perfil)',
        '478. Ferramenta de desenvolvimento pessoal',
        '479. Aplicativo de inteligência emocional',
        '480. Sistema de habilidades sociais',
        '481. Ferramenta de comunicação (oratória)',
        '482. Aplicativo de escrita criativa',
        '483. Sistema de leitura dinâmica',
        '484. Ferramenta de memorização (técnicas)',
        '485. Aplicativo de concentração (foco)',
        '486. Sistema de produtividade (gestão de tempo)',
        '487. Ferramenta de organização (planejamento)',
        '488. Aplicativo de definição de metas',
        '489. Sistema de hábitos (rotina)',
        '490. Ferramenta de disciplina (consistência)',
        '491. Aplicativo de motivação (inspiração)',
        '492. Sistema de resiliência (superação)',
        '493. Ferramenta de adaptabilidade (flexibilidade)',
        '494. Aplicativo de criatividade (técnicas)',
        '495. Sistema de inovação (pensamento lateral)',
        '496. Ferramenta de solução de problemas',
        '497. Aplicativo de tomada de decisão',
        '498. Sistema de pensamento crítico',
        '499. Ferramenta de análise de argumentos',
        '500. Aplicativo de debate (técnicas de argumentação)'
    ],
    categoria6: [
        '501. Calculadora de pegada de carbono',
        '502. Sistema de compensação ambiental',
        '503. Guia de reciclagem por tipo de material',
        '504. Mapa de pontos de coleta seletiva',
        '505. Ferramenta de descarte correto de eletrônicos',
        '506. Guia de compostagem doméstica',
        '507. Aplicativo de horta urbana vertical',
        '508. Sistema de identificação de plantas (guia)',
        '509. Mapa de áreas verdes na cidade',
        '510. Ferramenta de reflorestamento (doação de árvores)',
        '511. Sistema de economia de água (dicas)',
        '512. Ferramenta de energia solar (simulação de economia)',
        '513. Aplicativo de eficiência energética',
        '514. Sistema de transporte sustentável (rotas)',
        '515. Ferramenta de redução de plástico (desafios)',
        '516. Guia de moda sustentável (marcas)',
        '517. Aplicativo de alimentação orgânica (produtores)',
        '518. Sistema de agricultura sustentável (dicas)',
        '519. Ferramenta de pesca responsável',
        '520. Guia de turismo ecológico (destinos)',
        '521. Aplicativo de preservação de oceanos',
        '522. Sistema de limpeza de praias (eventos)',
        '523. Ferramenta de reciclagem de eletrônicos',
        '524. Guia de upcycling (reutilização criativa)',
        '525. Aplicativo de economia circular (produtos)',
        '526. Sistema de redução de resíduos (desafios)',
        '527. Ferramenta de reutilização de materiais',
        '528. Guia de reparo de objetos (conserto)',
        '529. Aplicativo de empréstimo de ferramentas',
        '530. Sistema de biblioteca de coisas (compartilhamento)',
        '531. Ferramenta de troca de roupas (brechó virtual)',
        '532. Sistema de doação de alimentos',
        '533. Banco de alimentos (mapeamento)',
        '534. Aplicativo de hortas comunitárias',
        '535. Mapa de feiras orgânicas na região',
        '536. Guia de produtores locais',
        '537. Sistema de CSA (agricultura apoiada)',
        '538. Ferramenta de permacultura (design)',
        '539. Guia de agrofloresta (sistemas)',
        '540. Aplicativo de bioconstrução (materiais sustentáveis)',
        '541. Sistema de arquitetura sustentável',
        '542. Ferramenta de design biofílico',
        '543. Mapa de cidades verdes',
        '544. Guia de parques urbanos',
        '545. Aplicativo de qualidade do ar (dados em tempo real)',
        '546. Mapa de poluição sonora (monitoramento)',
        '547. Sistema de qualidade da água (relatórios)',
        '548. Ferramenta de biodiversidade (espécies ameaçadas)',
        '549. Aplicativo de conservação de espécies',
        '550. Sistema de corredores ecológicos (mapas)',
        '551. Ferramenta de unidades de conservação (visitação)',
        '552. Guia de trilhas ecológicas',
        '553. Aplicativo de observação de aves (guia)',
        '554. Sistema de observação de baleias',
        '555. Ferramenta de observação de estrelas (céu noturno)',
        '556. Mapa de poluição luminosa',
        '557. Aplicativo de céu limpo (visibilidade)',
        '558. Sistema de mudanças climáticas (dados)',
        '559. Ferramenta de eventos climáticos extremos',
        '560. Sistema de alertas de desastres naturais',
        '561. Ferramenta de prevenção de incêndios',
        '562. Aplicativo de combate a incêndios (coleta de dados)',
        '563. Sistema de monitoramento de secas',
        '564. Ferramenta de gestão de recursos hídricos',
        '565. Mapa de bacias hidrográficas',
        '566. Aplicativo de gestão de florestas',
        '567. Sistema de desmatamento (monitoramento)',
        '568. Ferramenta de regeneração florestal',
        '569. Mapa de corredores de fauna',
        '570. Aplicativo de passagens de fauna',
        '571. Sistema de pesquisa de campo (coleta de dados)',
        '572. Ferramenta de ciência cidadã (participação)',
        '573. Aplicativo de voluntariado ambiental',
        '574. Sistema de educação ambiental (conteúdo)',
        '575. Ferramenta de jogos ambientais (educativos)',
        '576. Aplicativo de realidade virtual (natureza)',
        '577. Sistema de documentário ambiental (vídeos)',
        '578. Ferramenta de história ambiental (linha do tempo)',
        '579. Aplicativo de povos indígenas (cultura)',
        '580. Sistema de saberes tradicionais (registro)',
        '581. Ferramenta de medicina natural (plantas)',
        '582. Aplicativo de cosméticos naturais',
        '583. Guia de limpeza ecológica (produtos)',
        '584. Sistema de construção sustentável (materiais)',
        '585. Ferramenta de certificação ambiental',
        '586. Guia de selo verde (produtos e serviços)',
        '587. Aplicativo de pegada ecológica (cálculo)',
        '588. Sistema de offset de carbono (compensação)',
        '589. Ferramenta de projetos de restauração',
        '590. Aplicativo de eco-inovação (ideias)',
        '591. Sistema de soluções baseadas na natureza',
        '592. Ferramenta de design regenerativo',
        '593. Aplicativo de economia azul (oceanos)',
        '594. Sistema de créditos de carbono (simulação)',
        '595. Ferramenta de avaliação de impacto ambiental',
        '596. Guia de boas práticas ambientais',
        '597. Aplicativo de cidades resilientes (clima)',
        '598. Sistema de adaptação às mudanças climáticas',
        '599. Ferramenta de mitigação (redução de emissões)',
        '600. Aplicativo de comunidades sustentáveis'
    ],
    categoria7: [
        '601. Aplicativo de monitoramento de sono (qualidade)',
        '602. Sistema de acompanhamento de peso (gráficos)',
        '603. Ferramenta de cálculo de IMC (índice de massa corporal)',
        '604. Guia de alimentação saudável (receitas)',
        '605. Aplicativo de hidratação (lembretes de água)',
        '606. Sistema de registro de atividades físicas',
        '607. Ferramenta de meditação guiada (áudio)',
        '608. Aplicativo de respiração (exercícios)',
        '609. Sistema de alongamento (posturas)',
        '610. Guia de ioga (sequências)',
        '611. Aplicativo de treinos em casa (sem equipamento)',
        '612. Sistema de personal trainer (planos de treino)',
        '613. Ferramenta de cardio (cronômetro)',
        '614. Aplicativo de corrida (distâncias e pace)',
        '615. Sistema de ciclismo (rotas e desempenho)',
        '616. Ferramenta de natação (voltas e tempo)',
        '617. Aplicativo de esportes (estatísticas)',
        '618. Sistema de competições (ranking)',
        '619. Ferramenta de registro de marcas pessoais',
        '620. Aplicativo de metas de saúde (diárias)',
        '621. Sistema de check-up virtual (sintomas)',
        '622. Guia de primeiros socorros (emergências)',
        '623. Aplicativo de identificação de doenças (sintomas)',
        '624. Sistema de monitoramento de pressão arterial',
        '625. Ferramenta de controle de glicemia (diabetes)',
        '626. Aplicativo de saúde mental (autoavaliação)',
        '627. Sistema de registro de humores (diário emocional)',
        '628. Ferramenta de terapia cognitivo-comportamental (exercícios)',
        '629. Guia de combate à ansiedade (técnicas)',
        '630. Aplicativo de gerenciamento de estresse',
        '631. Sistema de suporte psicológico (chat)',
        '632. Ferramenta de afirmações positivas',
        '633. Aplicativo de gratidão (diário)',
        '634. Sistema de relaxamento progressivo (áudio)',
        '635. Guia de massagem (técnicas)',
        '636. Aplicativo de aromaterapia (óleos essenciais)',
        '637. Sistema de fitoterapia (plantas medicinais)',
        '638. Ferramenta de homeopatia (remedios)',
        '639. Guia de acupuntura (pontos de pressão)',
        '640. Aplicativo de quiropraxia (exercícios de postura)',
        '641. Sistema de pilates (exercícios)',
        '642. Ferramenta de treino funcional',
        '643. Aplicativo de crossfit (WODs)',
        '644. Sistema de musculação (planos de treino)',
        '645. Guia de suplementação (recomendações)',
        '646. Aplicativo de acompanhamento de dieta (calorias)',
        '647. Sistema de receitas low-carb (low carb)',
        '648. Ferramenta de receitas veganas (plant-based)',
        '649. Guia de receitas sem glúten (celíacos)',
        '650. Aplicativo de alergias alimentares (controle)',
        '651. Sistema de intolerâncias (identificação)',
        '652. Ferramenta de saúde intestinal (probióticos)',
        '653. Aplicativo de desintoxicação (dietas)',
        '654. Sistema de jejum intermitente (cronômetro)',
        '655. Guia de sono (higiene do sono)',
        '656. Aplicativo de melatonina (ciclo circadiano)',
        '657. Sistema de relaxamento noturno (áudio)',
        '658. Ferramenta de wake-up light (despertador)',
        '659. Aplicativo de respiração para dormir',
        '660. Sistema de contagem de calorias (app de dieta)',
        '661. Ferramenta de balança inteligente (conexão)',
        '662. Aplicativo de smartwatch (dados de saúde)',
        '663. Sistema de sincronização com apps de fitness',
        '664. Ferramenta de análise de dados de saúde',
        '665. Aplicativo de evolução de saúde (relatórios)',
        '666. Sistema de metas de saúde (KPIs)',
        '667. Ferramenta de feedback de saúde (IA)',
        '668. Aplicativo de comunidade fitness (desafios)',
        '669. Sistema de treinos em grupo (virtual)',
        '670. Ferramenta de competições de saúde (gamificação)',
        '671. Aplicativo de prêmios por metas de saúde',
        '672. Sistema de conquistas de saúde (badges)',
        '673. Ferramenta de ranking de saúde (global)',
        '674. Aplicativo de saúde para idosos (cuidados)',
        '675. Sistema de saúde infantil (crescimento)',
        '676. Guia de vacinação (calendário)',
        '677. Aplicativo de medicamentos (lembretes)',
        '678. Sistema de interações medicamentosas (segurança)',
        '679. Ferramenta de farmácia (busca de remédios)',
        '680. Aplicativo de telemedicina (consulta virtual)',
        '681. Sistema de prontuário eletrônico (pessoal)',
        '682. Ferramenta de segunda opinião médica (IA)',
        '683. Aplicativo de exames (agendamento)',
        '684. Sistema de resultados de exames (visualização)',
        '685. Guia de prevenção de doenças (check-up)',
        '686. Aplicativo de vacinação (lembretes)',
        '687. Sistema de doação de órgãos (cadastro)',
        '688. Ferramenta de doação de sangue (agendamento)',
        '689. Aplicativo de informações de saúde pública',
        '690. Sistema de epidemias (alertas)',
        '691. Ferramenta de saúde global (dados)',
        '692. Aplicativo de saúde financeira (relacionada à saúde)',
        '693. Sistema de planos de saúde (comparação)',
        '694. Ferramenta de custos de saúde (cálculo)',
        '695. Aplicativo de prevenção de acidentes (dicas)',
        '696. Sistema de segurança no trabalho (saúde ocupacional)',
        '697. Guia de ergonomia (postura no trabalho)',
        '698. Aplicativo de saúde mental no trabalho',
        '699. Sistema de bem-estar corporativo (programas)',
        '700. Ferramenta de avaliação de estresse no trabalho'
    ],
    categoria8: [
        '701. Rede social para voluntariado',
        '702. Sistema de doação de roupas (match com necessitados)',
        '703. Ferramenta de arrecadação de alimentos (campanhas)',
        '704. Aplicativo de banco de sangue (doação)',
        '705. Sistema de cadastro de doadores de órgãos',
        '706. Ferramenta de apoio a moradores de rua (guias)',
        '707. Aplicativo de abrigos (mapeamento)',
        '708. Sistema de refeições gratuitas (distribuição)',
        '709. Guia de recursos sociais (auxílios governamentais)',
        '710. Aplicativo de inclusão social (pessoas com deficiência)',
        '711. Sistema de acessibilidade (mapas)',
        '712. Ferramenta de libras (tradutor)',
        '713. Aplicativo de audiodescrição (para cegos)',
        '714. Sistema de educação inclusiva (materiais)',
        '715. Ferramenta de cotas (informações sobre políticas)',
        '716. Aplicativo de igualdade de gênero (campanhas)',
        '717. Sistema de empoderamento feminino (conteúdo)',
        '718. Ferramenta de prevenção à violência doméstica',
        '719. Aplicativo de apoio a vítimas de violência',
        '720. Sistema de denúncia anônima (canais)',
        '721. Ferramenta de justiça social (recursos)',
        '722. Aplicativo de direitos humanos (conteúdo)',
        '723. Sistema de liberdade de expressão (campanhas)',
        '724. Ferramenta de democracia participativa (votações)',
        '725. Aplicativo de transparência pública (dados)',
        '726. Sistema de orçamento participativo (propostas)',
        '727. Ferramenta de fiscalização de obras públicas',
        '728. Aplicativo de serviços públicos (guia)',
        '729. Sistema de coleta de lixo (agendamento)',
        '730. Ferramenta de reciclagem comunitária (pontos)',
        '731. Aplicativo de compostagem comunitária',
        '732. Sistema de horta comunitária (gestão)',
        '733. Ferramenta de cozinha comunitária (agendamento)',
        '734. Aplicativo de bibliotecas comunitárias (acervo)',
        '735. Sistema de troca de livros (comunidade)',
        '736. Ferramenta de clube do livro (encontros)',
        '737. Aplicativo de cineclube (programação)',
        '738. Sistema de teatro comunitário (agenda)',
        '739. Ferramenta de música comunitária (bandas)',
        '740. Aplicativo de arte comunitária (exposições)',
        '741. Sistema de dança comunitária (aulas)',
        '742. Ferramenta de esportes comunitários (times)',
        '743. Aplicativo de campeonatos comunitários (organização)',
        '744. Sistema de eventos comunitários (calendário)',
        '745. Ferramenta de festas comunitárias (organização)',
        '746. Aplicativo de feiras comunitárias (produtores)',
        '747. Sistema de brechós comunitários (troca de roupas)',
        '748. Ferramenta de doação de móveis (match)',
        '749. Aplicativo de reformas comunitárias (mutirões)',
        '750. Sistema de limpeza de bairro (eventos)',
        '751. Ferramenta de segurança comunitária (vigilância)',
        '752. Aplicativo de proteção a animais (abrigos)',
        '753. Sistema de adoção de animais (match)',
        '754. Ferramenta de castração de animais (agendamento)',
        '755. Aplicativo de veterinário comunitário (serviços)',
        '756. Sistema de protetores de animais (voluntariado)',
        '757. Ferramenta de alimentação animal (doações)',
        '758. Aplicativo de crianças e adolescentes (proteção)',
        '759. Sistema de educação infantil (conteúdo)',
        '760. Ferramenta de creches comunitárias (vagas)',
        '761. Aplicativo de escolas públicas (informações)',
        '762. Sistema de merenda escolar (qualidade)',
        '763. Ferramenta de material escolar (doações)',
        '764. Aplicativo de reforço escolar (voluntários)',
        '765. Sistema de bolsas de estudo (oportunidades)',
        '766. Ferramenta de jovens aprendizes (vagas)',
        '767. Aplicativo de primeiro emprego (guias)',
        '768. Sistema de empreendedorismo jovem (mentoria)',
        '769. Ferramenta de tecnologia para jovens (cursos)',
        '770. Aplicativo de inclusão digital (acesso)',
        '771. Sistema de telecentros (computadores)',
        '772. Ferramenta de conectividade (Wi-Fi público)',
        '773. Aplicativo de cidades inteligentes (serviços)',
        '774. Sistema de mobilidade urbana (transporte)',
        '775. Ferramenta de bicicletas compartilhadas',
        '776. Aplicativo de patinetes elétricos (aluguel)',
        '777. Sistema de caronas solidárias (match)',
        '778. Ferramenta de transporte para idosos (serviços)',
        '779. Aplicativo de transporte para pessoas com deficiência',
        '780. Sistema de acessibilidade em transporte (guias)',
        '781. Ferramenta de turismo acessível (roteiros)',
        '782. Aplicativo de guias turísticos (comunidade)',
        '783. Sistema de intercâmbio cultural (programas)',
        '784. Ferramenta de aprendizado de línguas (comunitário)',
        '785. Aplicativo de imigração (guias)',
        '786. Sistema de refugiados (apoio)',
        '787. Ferramenta de integração social (eventos)',
        '788. Aplicativo de diversidade cultural (conteúdo)',
        '789. Sistema de patrimônio histórico (preservação)',
        '790. Ferramenta de museus comunitários (exposições)',
        '791. Aplicativo de memória local (histórias)',
        '792. Sistema de genealogia (pesquisa de família)',
        '793. Ferramenta de árvore genealógica (construção)',
        '794. Aplicativo de sobrenomes (origem)',
        '795. Sistema de heráldica (brasões)',
        '796. Ferramenta de história oral (entrevistas)',
        '797. Aplicativo de documentários locais (vídeos)',
        '798. Sistema de fotografia histórica (acervo)',
        '799. Ferramenta de cartografia histórica (mapas)',
        '800. Aplicativo de arquivos públicos (acesso)'
    ],
    categoria9: [
        '801. Jogo de aventura em texto (text-based RPG)',
        '802. Jogo de plataforma 2D (plataforma)',
        '803. Jogo de quebra-cabeça (puzzle)',
        '804. Jogo de corrida (racing)',
        '805. Jogo de tiro (shooter)',
        '806. Jogo de estratégia (turn-based)',
        '807. Jogo de simulação (simulation)',
        '808. Jogo de esportes (sports)',
        '809. Jogo de cartas (card game)',
        '810. Jogo de tabuleiro (board game)',
        '811. Jogo de RPG (role-playing game)',
        '812. Jogo de sobrevivência (survival)',
        '813. Jogo de terror (horror)',
        '814. Jogo de aventura gráfica (point-and-click)',
        '815. Jogo de música (rhythm game)',
        '816. Jogo de dança (dance game)',
        '817. Jogo de luta (fighting)',
        '818. Jogo de quebra-cabeça 3D (3D puzzle)',
        '819. Jogo de tiro em primeira pessoa (FPS)',
        '820. Jogo de tiro em terceira pessoa (TPS)',
        '821. Jogo de mundo aberto (open world)',
        '822. Jogo de sobrevivência espacial (space survival)',
        '823. Jogo de construção de cidades (city builder)',
        '824. Jogo de gerenciamento (management)',
        '825. Jogo de fazenda (farming)',
        '826. Jogo de pesca (fishing)',
        '827. Jogo de caça (hunting)',
        '828. Jogo de exploração (exploration)',
        '829. Jogo de fuga (escape room)',
        '830. Jogo de detetive (detective)',
        '831. Jogo de mistério (mystery)',
        '832. Jogo de ação (action)',
        '833. Jogo de aventura (adventure)',
        '834. Jogo de quebra-cabeça 2D (2D puzzle)',
        '835. Jogo de memória (memory)',
        '836. Jogo de palavras (word game)',
        '837. Jogo de números (number game)',
        '838. Jogo de lógica (logic game)',
        '839. Jogo de estratégia em tempo real (RTS)',
        '840. Jogo de tower defense (torre)',
        '841. Jogo de defesa de base (base defense)',
        '842. Jogo de invasão (invasion)',
        '843. Jogo de sobrevivência zumbi (zombie survival)',
        '844. Jogo de mundo pós-apocalíptico (post-apocalyptic)',
        '845. Jogo de ficção científica (sci-fi)',
        '846. Jogo de fantasia (fantasy)',
        '847. Jogo de mitologia (mythology)',
        '848. Jogo de história (historical)',
        '849. Jogo de piratas (pirate)',
        '850. Jogo de ninjas (ninja)',
        '851. Jogo de samurais (samurai)',
        '852. Jogo de vikings (viking)',
        '853. Jogo de espartanos (spartan)',
        '854. Jogo de gladiadores (gladiator)',
        '855. Jogo de cavaleiros (knight)',
        '856. Jogo de magos (wizard)',
        '857. Jogo de elfos (elf)',
        '858. Jogo de anões (dwarf)',
        '859. Jogo de dragões (dragon)',
        '860. Jogo de grifos (griffin)',
        '861. Jogo de fênix (phoenix)',
        '862. Jogo de unicórnios (unicorn)',
        '863. Jogo de sereias (mermaid)',
        '864. Jogo de centauros (centaur)',
        '865. Jogo de ciclopes (cyclops)',
        '866. Jogo de titãs (titan)',
        '867. Jogo de deuses (god)',
        '868. Jogo de heróis (hero)',
        '869. Jogo de vilões (villain)',
        '870. Jogo de anti-heróis (anti-hero)',
        '871. Jogo de super-heróis (superhero)',
        '872. Jogo de super-vilões (supervillain)',
        '873. Jogo de mutantes (mutant)',
        '874. Jogo de alienígenas (alien)',
        '875. Jogo de robôs (robot)',
        '876. Jogo de IA (AI)',
        '877. Jogo de ficção (fiction)',
        '878. Jogo de realidade virtual (VR)',
        '879. Jogo de realidade aumentada (AR)',
        '880. Jogo de simulação de voo (flight simulator)',
        '881. Jogo de simulação de corrida (racing simulator)',
        '882. Jogo de simulação de vida (life simulator)',
        '883. Jogo de simulação de esportes (sports simulator)',
        '884. Jogo de simulação de cidades (city simulator)',
        '885. Jogo de simulação de fazenda (farming simulator)',
        '886. Jogo de simulação de parque (park simulator)',
        '887. Jogo de simulação de zoológico (zoo simulator)',
        '888. Jogo de simulação de aquário (aquarium simulator)',
        '889. Jogo de simulação de hospital (hospital simulator)',
        '890. Jogo de simulação de escola (school simulator)',
        '891. Jogo de simulação de prisão (prison simulator)',
        '892. Jogo de simulação de guerra (war simulator)',
        '893. Jogo de simulação de paz (peace simulator)',
        '894. Jogo de simulação de diplomacia (diplomacy simulator)',
        '895. Jogo de simulação de economia (economy simulator)',
        '896. Jogo de simulação de mercado (market simulator)',
        '897. Jogo de simulação de negócios (business simulator)',
        '898. Jogo de simulação de startup (startup simulator)',
        '899. Jogo de simulação de carreira (career simulator)',
        '900. Jogo de simulação de vida profissional (work simulator)'
    ],
    categoria10: [
        '901. Marketplace para serviços freelancers',
        '902. Plataforma de crowdfunding para projetos criativos',
        '903. Sistema de assinatura para conteúdo exclusivo',
        '904. Ferramenta de consultoria online (agendamento)',
        '905. Aplicativo de mentoria de negócios (match)',
        '906. Sistema de gestão de startups (KPIs)',
        '907. Ferramenta de pitch deck (criação)',
        '908. Aplicativo de validação de ideias (MVP)',
        '909. Sistema de análise de concorrência (IA)',
        '910. Ferramenta de planejamento estratégico',
        '911. Aplicativo de orçamento para startups',
        '912. Sistema de captação de investimentos',
        '913. Ferramenta de due diligence para investidores',
        '914. Aplicativo de gestão de franquias',
        '915. Sistema de gestão de e-commerce',
        '916. Ferramenta de automação de marketing digital',
        '917. Aplicativo de CRM para pequenas empresas',
        '918. Sistema de ERP para PMEs',
        '919. Ferramenta de gestão de projetos (ágil)',
        '920. Aplicativo de gestão de equipes remotas',
        '921. Sistema de comunicação interna (intranet)',
        '922. Ferramenta de avaliação de desempenho',
        '923. Aplicativo de gestão de metas (OKRs)',
        '924. Sistema de feedback contínuo (360°)',
        '925. Ferramenta de reconhecimento e recompensas',
        '926. Aplicativo de gestão de talentos',
        '927. Sistema de recrutamento e seleção',
        '928. Ferramenta de onboarding de colaboradores',
        '929. Aplicativo de cultura organizacional',
        '930. Sistema de pesquisa de clima organizacional',
        '931. Ferramenta de endomarketing',
        '932. Aplicativo de benefícios flexíveis',
        '933. Sistema de gestão de folha de pagamento',
        '934. Ferramenta de compliance trabalhista',
        '935. Aplicativo de gestão de riscos (trabalhistas)',
        '936. Sistema de saúde e segurança no trabalho',
        '937. Ferramenta de ergonomia no trabalho',
        '938. Aplicativo de bem-estar corporativo',
        '939. Sistema de programas de incentivo',
        '940. Ferramenta de avaliação de fornecedores',
        '941. Aplicativo de gestão de contratos',
        '942. Sistema de gestão de documentos (digital)',
        '943. Ferramenta de assinatura digital (documentos)',
        '944. Aplicativo de armazenamento na nuvem (empresarial)',
        '945. Sistema de backup e recuperação de dados',
        '946. Ferramenta de segurança da informação',
        '947. Aplicativo de gestão de senhas (empresarial)',
        '948. Sistema de autenticação multifator (MFA)',
        '949. Ferramenta de monitoramento de redes',
        '950. Aplicativo de gestão de ativos de TI',
        '951. Sistema de help desk (suporte técnico)',
        '952. Ferramenta de gestão de chamados',
        '953. Aplicativo de base de conhecimento (wiki)',
        '954. Sistema de treinamento corporativo (LMS)',
        '955. Ferramenta de desenvolvimento de lideranças',
        '956. Aplicativo de coaching executivo (match)',
        '957. Sistema de mentoria reversa (jovens/experientes)',
        '958. Ferramenta de sucessão (plano de carreira)',
        '959. Aplicativo de gestão de desempenho',
        '960. Sistema de avaliação de competências',
        '961. Ferramenta de desenvolvimento de habilidades',
        '962. Aplicativo de certificação profissional',
        '963. Sistema de portfólio de projetos',
        '964. Ferramenta de gestão de casos de sucesso',
        '965. Aplicativo de criação de propostas comerciais',
        '966. Sistema de CRM (clientes)',
        '967. Ferramenta de automação de vendas',
        '968. Aplicativo de gestão de leads',
        '969. Sistema de funil de vendas',
        '970. Ferramenta de análise de conversão',
        '971. Aplicativo de gestão de pedidos',
        '972. Sistema de gestão de estoque',
        '973. Ferramenta de logística de entregas',
        '974. Aplicativo de rastreamento de entregas',
        '975. Sistema de gestão de fornecedores',
        '976. Ferramenta de negociação (planilha)',
        '977. Aplicativo de análise de mercado',
        '978. Sistema de inteligência competitiva',
        '979. Ferramenta de benchmarking',
        '980. Aplicativo de inovação aberta (ideias)',
        '981. Sistema de gestão de ideias (crowdsourcing)',
        '982. Ferramenta de prototipação rápida',
        '983. Aplicativo de design thinking (processo)',
        '984. Sistema de gestão ágil (Scrum/Kanban)',
        '985. Ferramenta de retrospectiva (sprint)',
        '986. Aplicativo de daily meeting (check-in)',
        '987. Sistema de planning poker (estimativas)',
        '988. Ferramenta de burndown chart (gráficos)',
        '989. Aplicativo de velocity tracking (desempenho)',
        '990. Sistema de roadmap de produto',
        '991. Ferramenta de gestão de backlog',
        '992. Aplicativo de priorização (Moscow)',
        '993. Sistema de MVP (produto mínimo viável)',
        '994. Ferramenta de discovery de produto',
        '995. Aplicativo de experimentação (testes)',
        '996. Sistema de análise de métricas (produto)',
        '997. Ferramenta de funis de conversão',
        '998. Aplicativo de jornada do usuário (mapeamento)',
        '999. Sistema de mapa de empatia (persona)',
        '1000. Ferramenta de user story mapping'
    ],
    categoria11: [
        '1001. Simulador de partículas subatômicas',
        '1002. Visualizador de estrutura molecular 3D',
        '1003. Modelo de sistema solar interativo',
        '1004. Simulador de evolução de espécies',
        '1005. Aplicativo de identificação de constelações',
        '1006. Simulador de clima e mudanças climáticas',
        '1007. Visualizador de dados sísmicos em tempo real',
        '1008. Modelo de cadeia alimentar interativo',
        '1009. Simulador de ciclo da água',
        '1010. Visualizador de placas tectônicas',
        '1011. Aplicativo de classificação de rochas e minerais',
        '1012. Simulador de explosão de supernova',
        '1013. Visualizador de buracos negros (simulação)',
        '1014. Modelo de evolução estelar',
        '1015. Simulador de órbita de satélites',
        '1016. Visualizador de dados do telescópio Hubble',
        '1017. Aplicativo de identificação de estrelas (celular)',
        '1018. Simulador de viagem no tempo (teórico)',
        '1019. Modelo de multiverso (simplificado)',
        '1020. Visualizador de ondas gravitacionais',
        '1021. Simulador de reações nucleares',
        '1022. Aplicativo de tabela periódica interativa',
        '1023. Simulador de ligações químicas',
        '1024. Visualizador de estrutura de proteínas',
        '1025. Modelo de replicação de DNA',
        '1026. Simulador de mutação genética',
        '1027. Aplicativo de genealogia genética',
        '1028. Visualizador de árvore filogenética',
        '1029. Simulador de ecossistema (cadeia alimentar)',
        '1030. Modelo de sucessão ecológica',
        '1031. Aplicativo de identificação de espécies (animal/planta)',
        '1032. Simulador de crescimento populacional',
        '1033. Visualizador de migração animal',
        '1034. Modelo de colmeia (abelhas)',
        '1035. Simulador de formigueiro (formigas)',
        '1036. Aplicativo de observação de pássaros',
        '1037. Visualizador de correntes oceânicas',
        '1038. Simulador de efeito estufa',
        '1039. Modelo de derretimento de calotas polares',
        '1040. Aplicativo de previsão de marés',
        '1041. Simulador de terremoto',
        '1042. Visualizador de vulcões ativos',
        '1043. Modelo de formação de montanhas',
        '1044. Aplicativo de identificação de fósseis',
        '1045. Simulador de escavação arqueológica',
        '1046. Visualizador de camadas da Terra',
        '1047. Modelo de ciclo do carbono',
        '1048. Simulador de ciclo do nitrogênio',
        '1049. Aplicativo de qualidade do ar (dados)',
        '1050. Visualizador de poluição em rios',
        '1051. Simulador de reciclagem de materiais',
        '1052. Modelo de economia circular (simulação)',
        '1053. Aplicativo de pegada ecológica (cálculo)',
        '1054. Simulador de desenvolvimento sustentável',
        '1055. Visualizador de ODS (Objetivos de Desenvolvimento Sustentável)',
        '1056. Modelo de cidades inteligentes',
        '1057. Aplicativo de mobilidade urbana sustentável',
        '1058. Simulador de energia renovável (solar, eólica)',
        '1059. Visualizador de eficiência energética',
        '1060. Modelo de captura de carbono',
        '1061. Aplicativo de agricultura de precisão',
        '1062. Simulador de sistemas agroflorestais',
        '1063. Visualizador de biodiversidade global',
        '1064. Modelo de extinção de espécies',
        '1065. Aplicativo de conservação de habitats',
        '1066. Simulador de restauração florestal',
        '1067. Visualizador de áreas protegidas',
        '1068. Modelo de corredores ecológicos',
        '1069. Aplicativo de educação ambiental',
        '1070. Simulador de mudanças no uso da terra',
        '1071. Visualizador de desmatamento (dados)',
        '1072. Modelo de queimadas (simulação)',
        '1073. Aplicativo de alerta de incêndios florestais',
        '1074. Simulador de enchentes e alagamentos',
        '1075. Visualizador de secas e escassez de água',
        '1076. Modelo de gestão de bacias hidrográficas',
        '1077. Aplicativo de consumo consciente de água',
        '1078. Simulador de tratamento de água',
        '1079. Visualizador de aquíferos subterrâneos',
        '1080. Modelo de ciclo urbano da água',
        '1081. Aplicativo de coleta seletiva (mapa)',
        '1082. Simulador de usina de reciclagem',
        '1083. Visualizador de lixo nos oceanos',
        '1084. Modelo de microplásticos (simulação)',
        '1085. Aplicativo de redução de resíduos',
        '1086. Simulador de compostagem',
        '1087. Visualizador de economia de energia',
        '1088. Modelo de eficiência de transporte',
        '1089. Aplicativo de mobilidade elétrica',
        '1090. Simulador de cidades de baixo carbono',
        '1091. Visualizador de emissões de CO2',
        '1092. Modelo de neutralidade de carbono',
        '1093. Aplicativo de créditos de carbono (simulação)',
        '1094. Simulador de mercado de carbono',
        '1095. Visualizador de impacto ambiental de produtos',
        '1096. Modelo de ciclo de vida de produtos',
        '1097. Aplicativo de economia compartilhada',
        '1098. Simulador de consumo colaborativo',
        '1099. Visualizador de comunidades sustentáveis',
        '1100. Modelo de desenvolvimento regenerativo'
    ],
    categoria12: [
        '1101. Galeria de arte digital interativa',
        '1102. Aplicativo de reconhecimento de estilos artísticos',
        '1103. Simulador de cores e paletas (arte)',
        '1104. Visualizador de museus virtuais',
        '1105. Modelo de curadoria de exposições',
        '1106. Aplicativo de criação de arte generativa',
        '1107. Simulador de pinceladas e texturas',
        '1108. Visualizador de esculturas em 3D',
        '1109. Modelo de animação de pinturas',
        '1110. Aplicativo de edição de imagens (estilo artístico)',
        '1111. Simulador de luz e sombra em obras',
        '1112. Visualizador de restauração de obras (antes/depois)',
        '1113. Modelo de autenticação de obras de arte',
        '1114. Aplicativo de leilão de arte virtual',
        '1115. Simulador de galeria de arte (3D)',
        '1116. Visualizador de arte urbana (grafite)',
        '1117. Modelo de intervenções artísticas',
        '1118. Aplicativo de performance artística (vídeo)',
        '1119. Simulador de instalações interativas',
        '1120. Visualizador de arte sonora',
        '1121. Modelo de poesia visual',
        '1122. Aplicativo de escrita criativa (com IA)',
        '1123. Simulador de roteiros de cinema',
        '1124. Visualizador de storyboards',
        '1125. Modelo de animação de personagens',
        '1126. Aplicativo de criação de quadrinhos',
        '1127. Simulador de mangá (estilos)',
        '1128. Visualizador de ilustrações',
        '1129. Modelo de design de moda (roupas)',
        '1130. Aplicativo de criação de estampas',
        '1131. Simulador de desfile de moda virtual',
        '1132. Visualizador de produção de joias',
        '1133. Modelo de design de interiores',
        '1134. Aplicativo de arquitetura (plantas 3D)',
        '1135. Simulador de paisagismo',
        '1136. Visualizador de urbanismo (cidades)',
        '1137. Modelo de patrimônio arquitetônico',
        '1138. Aplicativo de história da arte (linha do tempo)',
        '1139. Simulador de biografias de artistas',
        '1140. Visualizador de movimentos artísticos',
        '1141. Modelo de influências culturais na arte',
        '1142. Aplicativo de arte sacra (religiosa)',
        '1143. Simulador de arte mitológica',
        '1144. Visualizador de arte contemporânea',
        '1145. Modelo de arte indígena (culturas)',
        '1146. Aplicativo de arte popular (folclore)',
        '1147. Simulador de artesanato (técnicas)',
        '1148. Visualizador de cerâmica e escultura',
        '1149. Modelo de arte têxtil (tecelagem)',
        '1150. Aplicativo de gravura e impressão',
        '1151. Simulador de fotografia (técnicas)',
        '1152. Visualizador de fotografia documental',
        '1153. Modelo de fotografia de retrato',
        '1154. Aplicativo de fotografia de paisagem',
        '1155. Simulador de câmera fotográfica (analógica)',
        '1156. Visualizador de fotografia macro',
        '1157. Modelo de fotografia noturna',
        '1158. Aplicativo de fotografia aérea (drone)',
        '1159. Simulador de laboratório fotográfico',
        '1160. Visualizador de exposições de fotografia',
        '1161. Modelo de cinema (história do cinema)',
        '1162. Aplicativo de críticas de filmes',
        '1163. Simulador de produção cinematográfica',
        '1164. Visualizador de gêneros cinematográficos',
        '1165. Modelo de animação cinematográfica',
        '1166. Aplicativo de documentários (histórias)',
        '1167. Simulador de edição de vídeos (cortes)',
        '1168. Visualizador de efeitos especiais',
        '1169. Modelo de trilha sonora (composição)',
        '1170. Aplicativo de música experimental',
        '1171. Simulador de instrumentos musicais (virtuais)',
        '1172. Visualizador de teoria musical',
        '1173. Modelo de composição musical (IA)',
        '1174. Aplicativo de história da música',
        '1175. Simulador de gêneros musicais',
        '1176. Visualizador de música clássica',
        '1177. Modelo de música popular',
        '1178. Aplicativo de música étnica (culturas)',
        '1179. Simulador de performance musical',
        '1180. Visualizador de orquestra sinfônica (instrumentos)',
        '1181. Modelo de ópera e teatro musical',
        '1182. Aplicativo de dança (história e estilos)',
        '1183. Simulador de coreografia',
        '1184. Visualizador de balé clássico',
        '1185. Modelo de dança contemporânea',
        '1186. Aplicativo de danças étnicas',
        '1187. Simulador de teatro (peças)',
        '1188. Visualizador de dramaturgia (roteiros)',
        '1189. Modelo de interpretação (atuação)',
        '1190. Aplicativo de comédia (stand-up)',
        '1191. Simulador de improvisação teatral',
        '1192. Visualizador de cenografia',
        '1193. Modelo de figurino (teatro)',
        '1194. Aplicativo de iluminação cênica',
        '1195. Simulador de sonoplastia (som ao vivo)',
        '1196. Visualizador de produções teatrais',
        '1197. Modelo de festivais de arte',
        '1198. Aplicativo de premiações artísticas',
        '1199. Simulador de carreira artística',
        '1200. Visualizador de impacto da arte na sociedade'
    ],
    categoria13: [
        '1201. Simulador de investimentos na bolsa de valores',
        '1202. Aplicativo de carteira de ações (acompanhamento)',
        '1203. Simulador de fundos imobiliários (FIIs)',
        '1204. Visualizador de rentabilidade de investimentos',
        '1205. Modelo de análise de risco (investimentos)',
        '1206. Aplicativo de planejamento de aposentadoria',
        '1207. Simulador de previdência privada',
        '1208. Visualizador de benefícios fiscais (investimentos)',
        '1209. Modelo de diversificação de carteira',
        '1210. Aplicativo de análise de empresas (fundamentalista)',
        '1211. Simulador de valuation de empresas',
        '1212. Visualizador de indicadores financeiros',
        '1213. Modelo de fluxo de caixa descontado (DCF)',
        '1214. Aplicativo de planejamento tributário (pessoa física)',
        '1215. Simulador de imposto de renda (IRPF)',
        '1216. Visualizador de deduções fiscais',
        '1217. Modelo de planejamento sucessório',
        '1218. Aplicativo de gestão de patrimônio',
        '1219. Simulador de herança e partilha',
        '1220. Visualizador de inventário de bens',
        '1221. Modelo de avaliação de imóveis',
        '1222. Aplicativo de financiamento imobiliário (simulação)',
        '1223. Simulador de compra vs aluguel (imóveis)',
        '1224. Visualizador de mercado imobiliário',
        '1225. Modelo de crédito consignado (simulação)',
        '1226. Aplicativo de empréstimos pessoais (juros)',
        '1227. Simulador de parcelamento de dívidas',
        '1228. Visualizador de juros compostos (cálculo)',
        '1229. Modelo de educação financeira (conteúdo)',
        '1230. Aplicativo de planejamento de orçamento familiar',
        '1231. Simulador de custo de vida (cidades)',
        '1232. Visualizador de inflação e poder de compra',
        '1233. Modelo de câmbio e moedas (simulação)',
        '1234. Aplicativo de análise de criptomoedas',
        '1235. Simulador de trading de criptomoedas',
        '1236. Visualizador de blockchain e tokens',
        '1237. Modelo de NFT (arte digital)',
        '1238. Aplicativo de metaverso financeiro (simulação)',
        '1239. Simulador de fintechs (modelos de negócio)',
        '1240. Visualizador de bancos digitais (comparação)',
        '1241. Modelo de PIX e pagamentos instantâneos',
        '1242. Aplicativo de carteira digital (gestão)',
        '1243. Simulador de cartões de crédito (fatura)',
        '1244. Visualizador de programas de pontos e milhas',
        '1245. Modelo de clubes de vantagens (descontos)',
        '1246. Aplicativo de compras compartilhadas (cashback)',
        '1247. Simulador de economia compartilhada',
        '1248. Visualizador de marketplaces financeiros',
        '1249. Modelo de crowdfunding (investimento coletivo)',
        '1250. Aplicativo de angel investing (investidor-anjo)',
        '1251. Simulador de venture capital (VC)',
        '1252. Visualizador de private equity (PE)',
        '1253. Modelo de fusões e aquisições (M&A)',
        '1254. Aplicativo de avaliação de startups (valuation)',
        '1255. Simulador de captação de recursos (startups)',
        '1256. Visualizador de pitch para investidores',
        '1257. Modelo de due diligence (startups)',
        '1258. Aplicativo de gestão de equity (stock options)',
        '1259. Simulador de plano de carreira (financeiro)',
        '1260. Visualizador de benefícios trabalhistas (CLT)',
        '1261. Modelo de cálculo de rescisão (trabalhista)',
        '1262. Aplicativo de gestão de MEI (microempreendedor)',
        '1263. Simulador de impostos para MEI',
        '1264. Visualizador de obrigações acessórias (empresas)',
        '1265. Modelo de contabilidade simplificada',
        '1266. Aplicativo de fluxo de caixa (empresas)',
        '1267. Simulador de ponto de equilíbrio (negócios)',
        '1268. Visualizador de margem de contribuição',
        '1269. Modelo de preço de venda (markup)',
        '1270. Aplicativo de gestão de custos (empresas)',
        '1271. Simulador de DRE (demonstração de resultados)',
        '1272. Visualizador de balanço patrimonial',
        '1273. Modelo de indicadores financeiros (KPIs)',
        '1274. Aplicativo de gestão de caixa (tesouraria)',
        '1275. Simulador de captação de recursos (empresas)',
        '1276. Visualizador de linhas de crédito (empresas)',
        '1277. Modelo de renegociação de dívidas (empresas)',
        '1278. Aplicativo de planejamento financeiro (empresas)',
        '1279. Simulador de fluxo de caixa descontado (empresas)',
        '1280. Visualizador de valuation de empresas',
        '1281. Modelo de compra e venda de empresas',
        '1282. Aplicativo de análise de concorrência (financeiro)',
        '1283. Simulador de estratégias de precificação',
        '1284. Visualizador de elasticidade de preço',
        '1285. Modelo de análise de sensibilidade (financeiro)',
        '1286. Aplicativo de otimização de portfólio (Markowitz)',
        '1287. Simulador de CAPM (custo de capital)',
        '1288. Visualizador de WACC (custo médio ponderado)',
        '1289. Modelo de EVA (valor econômico agregado)',
        '1290. Aplicativo de ROI (retorno sobre investimento)',
        '1291. Simulador de ROE (retorno sobre patrimônio)',
        '1292. Visualizador de ROA (retorno sobre ativos)',
        '1293. Modelo de análise de crédito (pessoa física)',
        '1294. Aplicativo de score de crédito (simulação)',
        '1295. Simulador de financiamento de veículos',
        '1296. Visualizador de leasing (arrendamento)',
        '1297. Modelo de factoring (antecipação de recebíveis)',
        '1298. Aplicativo de gestão de contas a pagar/receber',
        '1299. Simulador de conciliação bancária',
        '1300. Visualizador de tesouraria (fluxo de caixa)'
    ],
    categoria14: [
        '1301. Plataforma de automação de marketing digital',
        '1302. Aplicativo de CRM (gestão de clientes)',
        '1303. Simulador de funil de vendas (conversão)',
        '1304. Visualizador de jornada do cliente',
        '1305. Modelo de segmentação de clientes (personas)',
        '1306. Aplicativo de análise de concorrência (marketing)',
        '1307. Simulador de posicionamento de marca',
        '1308. Visualizador de branding (identidade visual)',
        '1309. Modelo de gestão de redes sociais (agendamento)',
        '1310. Aplicativo de criação de conteúdo (blog)',
        '1311. Simulador de SEO (otimização para buscadores)',
        '1312. Visualizador de palavras-chave (SEO)',
        '1313. Modelo de link building (estratégias)',
        '1314. Aplicativo de marketing de conteúdo (estratégia)',
        '1315. Simulador de e-mail marketing (campanhas)',
        '1316. Visualizador de taxa de abertura (e-mail)',
        '1317. Modelo de automação de e-mails (sequências)',
        '1318. Aplicativo de landing pages (criação)',
        '1319. Simulador de testes A/B (conversão)',
        '1320. Visualizador de taxa de conversão (metas)',
        '1321. Modelo de CRO (otimização de conversão)',
        '1322. Aplicativo de anúncios online (Google Ads)',
        '1323. Simulador de anúncios em redes sociais',
        '1324. Visualizador de ROI de campanhas',
        '1325. Modelo de análise de métricas (KPIs)',
        '1326. Aplicativo de dashboards de marketing',
        '1327. Simulador de orçamento de marketing',
        '1328. Visualizador de canais de aquisição',
        '1329. Modelo de atribuição de marketing (modelos)',
        '1330. Aplicativo de gestão de leads (nutrição)',
        '1331. Simulador de score de leads (qualificação)',
        '1332. Visualizador de pipeline de vendas',
        '1333. Modelo de prospecção de clientes (estratégias)',
        '1334. Aplicativo de gestão de vendas (equipe)',
        '1335. Simulador de metas de vendas (KPIs)',
        '1336. Visualizador de comissões (cálculo)',
        '1337. Modelo de incentivo de vendas (programas)',
        '1338. Aplicativo de negociação (técnicas)',
        '1339. Simulador de objeções (treinamento)',
        '1340. Visualizador de fechamento de vendas',
        '1341. Modelo de pós-venda (relacionamento)',
        '1342. Aplicativo de fidelização de clientes',
        '1343. Simulador de programas de fidelidade',
        '1344. Visualizador de NPS (net promoter score)',
        '1345. Modelo de pesquisa de satisfação (feedback)',
        '1346. Aplicativo de gestão de reclamações (ouvidoria)',
        '1347. Simulador de reputação online (monitoramento)',
        '1348. Visualizador de gestão de crises (comunicação)',
        '1349. Modelo de relações públicas (RP)',
        '1350. Aplicativo de marketing de influência (estratégias)',
        '1351. Simulador de embaixadores da marca',
        '1352. Visualizador de marketing de guerrilha (ideias)',
        '1353. Modelo de marketing viral (campanhas)',
        '1354. Aplicativo de marketing de experiência (eventos)',
        '1355. Simulador de marketing de causa (social)',
        '1356. Visualizador de marketing sustentável (práticas)',
        '1357. Modelo de marketing verde (estratégias)',
        '1358. Aplicativo de marketing inclusivo (diversidade)',
        '1359. Simulador de marketing de nicho (segmentação)',
        '1360. Visualizador de marketing B2B (empresas)',
        '1361. Modelo de marketing B2C (consumidores)',
        '1362. Aplicativo de marketing educacional (conteúdo)',
        '1363. Simulador de marketing de autoridade (pensamento)',
        '1364. Visualizador de marketing de conteúdo (formatos)',
        '1365. Modelo de storytelling (narrativa)',
        '1366. Aplicativo de copywriting (persuasão)',
        '1367. Simulador de redação publicitária',
        '1368. Visualizador de design gráfico (material)',
        '1369. Modelo de produção de vídeo (marketing)',
        '1370. Aplicativo de podcasting (marketing)',
        '1371. Simulador de webinars (eventos online)',
        '1372. Visualizador de marketing de afiliados',
        '1373. Modelo de parcerias (estratégias)',
        '1374. Aplicativo de marketing de indicação',
        '1375. Simulador de marketing de referência',
        '1376. Visualizador de marketing de comunidades',
        '1377. Modelo de marketing de fóruns (engajamento)',
        '1378. Aplicativo de marketing de grupos (redes sociais)',
        '1379. Simulador de marketing de mensagens (SMS/WhatsApp)',
        '1380. Visualizador de marketing de chatbots (automação)',
        '1381. Modelo de marketing de IA (inteligência artificial)',
        '1382. Aplicativo de marketing preditivo (dados)',
        '1383. Simulador de marketing personalizado (1:1)',
        '1384. Visualizador de marketing de segmentação (comportamento)',
        '1385. Modelo de marketing de retargeting (anúncios)',
        '1386. Aplicativo de marketing de recomendação (produtos)',
        '1387. Simulador de marketing de cross-selling',
        '1388. Visualizador de marketing de up-selling',
        '1389. Modelo de marketing de recorrência (assinaturas)',
        '1390. Aplicativo de marketing de sazonalidade (campanhas)',
        '1391. Simulador de marketing de eventos (calendário)',
        '1392. Visualizador de marketing de lançamento (produtos)',
        '1393. Modelo de marketing de relançamento (reposicionamento)',
        '1394. Aplicativo de marketing de teste (validação)',
        '1395. Simulador de marketing de feedback (melhorias)',
        '1396. Visualizador de marketing de inovação (tendências)',
        '1397. Modelo de marketing de disrupção (revolução)',
        '1398. Aplicativo de marketing de futuro (visão)',
        '1399. Simulador de marketing de impacto (resultados)',
        '1400. Visualizador de marketing de propósito (missão)'
    ],
    categoria15: [
        '1401. Aplicativo de organização de viagens (itinerário)',
        '1402. Simulador de mochilão (orçamento)',
        '1403. Visualizador de destinos turísticos (fotos)',
        '1404. Modelo de roteiros personalizados (IA)',
        '1405. Aplicativo de dicas de viagem (comunidade)',
        '1406. Simulador de intercâmbio (planejamento)',
        '1407. Visualizador de culturas (comparação)',
        '1408. Modelo de aprendizado de idiomas (jogos)',
        '1409. Aplicativo de clubes de leitura (recomendações)',
        '1410. Simulador de meta de leitura (anual)',
        '1411. Visualizador de livros favoritos (críticas)',
        '1412. Modelo de escrita criativa (desafios)',
        '1413. Aplicativo de poesia (compartilhamento)',
        '1414. Simulador de diário pessoal (privado)',
        '1415. Visualizador de fotografia de viagem (álbum)',
        '1416. Modelo de jardinagem (guia de plantas)',
        '1417. Aplicativo de culinária (receitas do mundo)',
        '1418. Simulador de dieta personalizada (nutrição)',
        '1419. Visualizador de yoga (sequências)',
        '1420. Modelo de meditação (guias)',
        '1421. Aplicativo de jogos de tabuleiro online',
        '1422. Simulador de quebra-cabeças (diários)',
        '1423. Visualizador de hobbies (comunidade)',
        '1424. Modelo de aprendizado de música (teoria)',
        '1425. Aplicativo de prática de instrumentos (virtuais)',
        '1426. Simulador de composição musical (IA)',
        '1427. Visualizador de cinema (listas de filmes)',
        '1428. Modelo de maratona de séries (organização)',
        '1429. Aplicativo de games (recomendações)',
        '1430. Simulador de lifestyle minimalista (dicas)',
        '1431. Visualizador de moda sustentável (marcas)',
        '1432. Modelo de closet virtual (organização)',
        '1433. Aplicativo de cuidados com a pele (rotinas)',
        '1434. Simulador de bem-estar (autoavaliação)',
        '1435. Visualizador de exercícios em casa (vídeos)',
        '1436. Modelo de corrida (treinos)',
        '1437. Aplicativo de ciclismo (rotas)',
        '1438. Simulador de esportes ao ar livre (equipamentos)',
        '1439. Visualizador de acampamento (guias)',
        '1440. Modelo de trilhas ecológicas (mapas)',
        '1441. Aplicativo de observação de estrelas (guias)',
        '1442. Simulador de fotografia noturna (dicas)',
        '1443. Visualizador de vida noturna (cidades)',
        '1444. Modelo de gastronomia local (restaurantes)',
        '1445. Aplicativo de coquetéis (receitas)',
        '1446. Simulador de vinhos (harmonização)',
        '1447. Visualizador de cervejas artesanais (cervejarias)',
        '1448. Modelo de cafés especiais (torrefações)',
        '1449. Aplicativo de doces (confeitaria)',
        '1450. Simulador de panificação (pães)',
        '1451. Visualizador de queijos (tipos)',
        '1452. Modelo de chás (infusões)',
        '1453. Aplicativo de sucos detox (receitas)',
        '1454. Simulador de alimentação vegana (receitas)',
        '1455. Visualizador de alimentação low-carb (dicas)',
        '1456. Modelo de jejum intermitente (guias)',
        '1457. Aplicativo de sono (qualidade)',
        '1458. Simulador de relaxamento (técnicas)',
        '1459. Visualizador de massagem (técnicas)',
        '1460. Modelo de aromaterapia (óleos)',
        '1461. Aplicativo de flores (arranjos)',
        '1462. Simulador de decoração de interiores (estilos)',
        '1463. Visualizador de móveis (design)',
        '1464. Modelo de reforma (DIY)',
        '1465. Aplicativo de organização de casa (desapego)',
        '1466. Simulador de limpeza sustentável (produtos)',
        '1467. Visualizador de autocuidado (rituais)',
        '1468. Modelo de skincare (rotinas)',
        '1469. Aplicativo de cabelo (cuidados)',
        '1470. Simulador de maquiagem (tutoriais)',
        '1471. Visualizador de barba (estilos)',
        '1472. Modelo de tatuagens (ideias)',
        '1473. Aplicativo de piercings (cuidados)',
        '1474. Simulador de moda (tendências)',
        '1475. Visualizador de sapatos (coleções)',
        '1476. Modelo de bolsas (estilos)',
        '1477. Aplicativo de joias (design)',
        '1478. Simulador de relógios (marcas)',
        '1479. Visualizador de carros (modelos)',
        '1480. Modelo de motos (estilos)',
        '1481. Aplicativo de bicicletas (manutenção)',
        '1482. Simulador de veículos elétricos (carregamento)',
        '1483. Visualizador de drones (modelos)',
        '1484. Modelo de fotografia aérea (dicas)',
        '1485. Aplicativo de viagens espaciais (turismo)',
        '1486. Simulador de astronomia (observação)',
        '1487. Visualizador de telescópios (guias)',
        '1488. Modelo de planetários (visitas)',
        '1489. Aplicativo de museus (exposições)',
        '1490. Simulador de teatro (peças)',
        '1491. Visualizador de concertos (agenda)',
        '1492. Modelo de ópera (histórias)',
        '1493. Aplicativo de balé (espetáculos)',
        '1494. Simulador de dança (estilos)',
        '1495. Visualizador de circo (apresentações)',
        '1496. Modelo de mágica (truques)',
        '1497. Aplicativo de comédia (shows)',
        '1498. Simulador de palhaços (técnicas)',
        '1499. Visualizador de festas (organização)',
        '1500. Modelo de celebrações (tradições)'
    ]
};

// ============================================
// 11. RENDERIZAÇÃO DAS IDEIAS
// ============================================
function renderIdeias() {
    for (const [categoriaId, ideias] of Object.entries(ideiasPorCategoria)) {
        const grid = document.getElementById(`grid-${categoriaId}`);
        if (!grid) continue;
        grid.innerHTML = ideias.map(ideia => `
            <div class="ideia-card">
                <span class="ideia-numero">${ideia.split('.')[0]}</span>
                <span class="ideia-texto">${ideia}</span>
            </div>
        `).join('');
    }
}
renderIdeias();

// ============================================
// 12. GERADOR DE IDEIAS
// ============================================
const todasIdeias = Object.values(ideiasPorCategoria).flat();
const gerarBtn = document.getElementById('gerarIdeia');
const resultado = document.getElementById('ideiaResultado');
if (gerarBtn && resultado) {
    gerarBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * todasIdeias.length);
        resultado.innerHTML = `<div class="ideia-item"><i class="fas fa-lightbulb"></i><span>${todasIdeias[randomIndex]}</span></div>`;
    });
}

// ============================================
// 13. GAMIFICAÇÃO
// ============================================
let gamification = {
    xp: 0,
    level: 1,
    streak: 0,
    lastDate: null,
    achievements: []
};

const achievementsList = [
    { id: 'first_xp', name: 'Primeiro XP', icon: '🌟', desc: 'Ganhe 10 XP', unlocked: false },
    { id: 'level_5', name: 'Nível 5', icon: '📈', desc: 'Alcance o nível 5', unlocked: false },
    { id: 'streak_3', name: 'Streak 3', icon: '🔥', desc: 'Mantenha streak de 3 dias', unlocked: false },
    { id: 'xp_100', name: '100 XP', icon: '⚡', desc: 'Acumule 100 XP', unlocked: false },
    { id: 'level_10', name: 'Nível 10', icon: '🏆', desc: 'Alcance o nível 10', unlocked: false }
];

function loadGamification() {
    const saved = localStorage.getItem('nexus_gamification');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            gamification = data;
        } catch(e) {}
    }
    updateGamificationUI();
}

function saveGamification() {
    localStorage.setItem('nexus_gamification', JSON.stringify(gamification));
}

function addXP(amount) {
    gamification.xp += amount;
    while (gamification.xp >= gamification.level * 100) {
        gamification.xp -= gamification.level * 100;
        gamification.level++;
        showToast(`🏆 UP! Nível ${gamification.level} alcançado!`);
    }
    updateStreak();
    checkAchievements();
    saveGamification();
    updateGamificationUI();
    showToast(`+${amount} XP!`);
}

function updateStreak() {
    const today = new Date().toDateString();
    if (gamification.lastDate === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (gamification.lastDate === yesterday.toDateString()) {
        gamification.streak++;
    } else {
        gamification.streak = 1;
    }
    gamification.lastDate = today;
}

function checkAchievements() {
    achievementsList.forEach(ach => {
        if (ach.unlocked) return;
        let unlocked = false;
        if (ach.id === 'first_xp' && gamification.xp >= 10) unlocked = true;
        if (ach.id === 'level_5' && gamification.level >= 5) unlocked = true;
        if (ach.id === 'streak_3' && gamification.streak >= 3) unlocked = true;
        if (ach.id === 'xp_100' && gamification.xp >= 100) unlocked = true;
        if (ach.id === 'level_10' && gamification.level >= 10) unlocked = true;
        if (unlocked) {
            ach.unlocked = true;
            showToast(`🏅 Conquista desbloqueada: ${ach.name}! ${ach.icon}`);
        }
    });
}

function updateGamificationUI() {
    document.getElementById('gamificationXp').textContent = gamification.xp;
    document.getElementById('gamificationLevel').textContent = gamification.level;
    document.getElementById('gamificationStreak').textContent = gamification.streak;
    const unlockedCount = achievementsList.filter(a => a.unlocked).length;
    document.getElementById('gamificationAchievements').textContent = unlockedCount;

    const list = document.getElementById('gamificationAchievementsList');
    if (list) {
        list.innerHTML = achievementsList.map(ach => `
            <div class="achievement-item ${ach.unlocked ? 'unlocked' : 'locked'}">
                <span class="achievement-icon">${ach.icon}</span>
                <div class="achievement-name">${ach.name}</div>
                <div class="achievement-desc">${ach.desc}</div>
            </div>
        `).join('');
    }
}

document.getElementById('addXpBtn')?.addEventListener('click', () => addXP(10));
document.getElementById('resetGamificationBtn')?.addEventListener('click', () => {
    if (confirm('Resetar todo o progresso da gamificação?')) {
        gamification = { xp: 0, level: 1, streak: 0, lastDate: null, achievements: [] };
        achievementsList.forEach(a => a.unlocked = false);
        saveGamification();
        updateGamificationUI();
        showToast('Progresso resetado!');
    }
});

loadGamification();

// ============================================
// 14. FAQ (ACORDEÃO)
// ============================================
const faqs = [
    { q: 'Como usar as 1500 ideias?', a: 'Navegue pelas categorias ou use o gerador aleatório para se inspirar.' },
    { q: 'Posso salvar as ideias?', a: 'As ideias são exibidas na tela. Você pode copiá-las ou anotá-las.' },
    { q: 'As ideias são atualizadas?', a: 'Novas ideias podem ser adicionadas futuramente.' }
];

const faqGrid = document.getElementById('faq-grid');
if (faqGrid) {
    faqGrid.innerHTML = faqs.map((f, index) => `
        <div class="faq-item">
            <button class="faq-question" data-index="${index}">
                ${f.q} <i class="fas fa-chevron-down"></i>
            </button>
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

// ============================================
// 15. TOAST (NOTIFICAÇÕES)
// ============================================
function showToast(msg, duration = 3000) {
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        background: #00b4d8; color: #0a0f0a;
        padding: 12px 24px; border-radius: 10px;
        font-weight: 500; z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 50);
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ============================================
// 16. BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// ============================================
// 17. COMPARTILHAR
// ============================================
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: '1500 Ideias · Carlos',
                text: 'Confira estas 1500 ideias para projetos!',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    });
}

// ============================================
// 18. SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});