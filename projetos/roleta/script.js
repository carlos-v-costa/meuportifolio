// ============================================
// RODA 8-BIT — SCRIPT COMPLETO (COM FATIAS)
// ============================================

// ===== ELEMENTOS =====
const roleta = document.getElementById('roleta');
const roletaFatias = document.getElementById('roletaFatias');
const themeInput = document.getElementById('themeInput');
const setThemeBtn = document.getElementById('setThemeBtn');
const currentTheme = document.getElementById('currentTheme');
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemList');
const spinBtn = document.getElementById('spinBtn');
const clearBtn = document.getElementById('clearBtn');
const resultArea = document.getElementById('resultArea');
const historicoList = document.getElementById('historicoList');
const soundToggle = document.getElementById('soundToggle');
const soundStatus = document.getElementById('soundStatus');
const spinCounter = document.getElementById('spinCounter');

let items = [];
let tema = 'NENHUM';
let isSpinning = false;
let soundEnabled = true;
let spins = 0;
let currentRotation = 0;

// ===== CORES 8-BITS (NES) =====
const COLORS = [
    '#e52521', '#f5c800', '#0068b5', '#00a800',
    '#e52521', '#f5c800', '#0068b5', '#00a800'
];

// ===== CARREGAR DADOS =====
function loadData() {
    const savedItems = localStorage.getItem('roleta8bit_items');
    if (savedItems) {
        try { items = JSON.parse(savedItems); } catch (e) { items = []; }
    }
    const savedTheme = localStorage.getItem('roleta8bit_theme');
    if (savedTheme) {
        tema = savedTheme;
        currentTheme.textContent = tema;
    }
    renderItems();
    loadHistorico();
    const savedSpins = localStorage.getItem('roleta8bit_spins');
    if (savedSpins) {
        spins = parseInt(savedSpins) || 0;
        spinCounter.textContent = spins;
    }
}

function saveItems() {
    localStorage.setItem('roleta8bit_items', JSON.stringify(items));
    localStorage.setItem('roleta8bit_theme', tema);
}

// ===== HISTÓRICO =====
function loadHistorico() {
    const saved = localStorage.getItem('roleta8bit_historico');
    if (saved) {
        try {
            const historico = JSON.parse(saved);
            renderHistorico(historico);
        } catch (e) { renderHistorico([]); }
    } else { renderHistorico([]); }
}

function saveHistorico(entry) {
    let historico = [];
    const saved = localStorage.getItem('roleta8bit_historico');
    if (saved) {
        try { historico = JSON.parse(saved); } catch (e) {}
    }
    historico.unshift({ item: entry, data: new Date().toLocaleString() });
    if (historico.length > 20) historico.pop();
    localStorage.setItem('roleta8bit_historico', JSON.stringify(historico));
    renderHistorico(historico);
}

function renderHistorico(historico) {
    historicoList.innerHTML = '';
    if (!historico || historico.length === 0) {
        historicoList.innerHTML = '<li class="empty-message">NENHUM SORTEIO AINDA.</li>';
        return;
    }
    historico.forEach(h => {
        const li = document.createElement('li');
        li.innerHTML = `<span>🎯 ${h.item}</span> <small>${h.data}</small>`;
        historicoList.appendChild(li);
    });
}

// ===== TEMA =====
function setTheme() {
    const text = themeInput.value.trim().toUpperCase();
    if (!text) return;
    tema = text;
    currentTheme.textContent = tema;
    themeInput.value = '';
    saveItems();
    playClickSound();
}

// ===== ITENS =====
function renderItems() {
    itemList.innerHTML = '';
    if (items.length === 0) {
        itemList.innerHTML = '<li class="empty-message" style="width:100%;text-align:center;">NENHUMA OPÇÃO ADICIONADA.</li>';
        renderFatias();
        return;
    }
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item}
            <button class="remove-btn" data-index="${index}">✕</button>
        `;
        li.querySelector('.remove-btn').addEventListener('click', () => { removeItem(index); });
        itemList.appendChild(li);
    });
    renderFatias();
}

function renderFatias() {
    const count = items.length;
    roletaFatias.innerHTML = '';
    if (count === 0) {
        roleta.style.background = '#2d3436';
        return;
    }

    const angleStep = 360 / count;
    const radius = 50; // %

    items.forEach((item, index) => {
        const angle = index * angleStep;
        const color = COLORS[index % COLORS.length];

        const fatia = document.createElement('div');
        fatia.className = 'fatia';
        fatia.style.cssText = `
            transform: rotate(${angle}deg);
            background: ${color};
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            width: 50%;
            height: 50%;
            transform-origin: 100% 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #fff;
            font-size: 0.5rem;
            padding-left: 10px;
            box-sizing: border-box;
            text-shadow: 1px 1px 0 rgba(0,0,0,0.8);
            border: 1px solid rgba(255,255,255,0.1);
        `;

        // Texto da fatia
        const span = document.createElement('span');
        span.textContent = item;
        span.style.cssText = `
            transform: rotate(${angleStep / 2}deg);
            display: block;
            font-size: 0.5rem;
            max-width: 80px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-family: 'Press Start 2P', monospace;
        `;
        fatia.appendChild(span);

        roletaFatias.appendChild(fatia);
    });

    // Ajustar a roleta para mostrar as fatias corretamente
    roleta.style.background = 'transparent';
}

function addItem() {
    const text = itemInput.value.trim().toUpperCase();
    if (!text) return;
    if (items.length >= 8) {
        alert('MÁXIMO DE 8 ITENS!');
        return;
    }
    items.push(text);
    itemInput.value = '';
    saveItems();
    renderItems();
    playClickSound();
}

function removeItem(index) {
    items.splice(index, 1);
    saveItems();
    renderItems();
    playClickSound();
}

function clearItems() {
    if (items.length === 0) return;
    if (confirm('Tem certeza que deseja limpar a lista?')) {
        items = [];
        saveItems();
        renderItems();
        resultArea.innerHTML = '<span class="empty-message">► ADICIONE ITENS E GIRE ◄</span>';
        playClickSound();
    }
}

// ===== GIRAR ROLETA =====
function spinRoleta() {
    if (isSpinning) return;
    if (items.length === 0) {
        resultArea.innerHTML = '<span style="color:#e52521;">⚠️ ADICIONE ITENS!</span>';
        playErrorSound();
        return;
    }

    isSpinning = true;
    spinBtn.disabled = true;

    playSpinSound();

    const randomIndex = Math.floor(Math.random() * items.length);
    const result = items[randomIndex];

    // Calcular ângulo para parar no item selecionado
    const angleStep = 360 / items.length;
    // Para alinhar com o ponteiro (topo), precisamos que o item fique na posição 0 (topo)
    // Ajuste para que o item fique alinhado com o ponteiro
    const targetAngle = 360 - (randomIndex * angleStep + angleStep / 2);
    // Adicionar rotações extras para parecer que girou muito
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const finalAngle = extraSpins * 360 + targetAngle;

    // Aplicar rotação
    roletaFatias.style.transform = `rotate(${finalAngle}deg)`;
    currentRotation = finalAngle;

    setTimeout(() => {
        playSuccessSound();

        spins++;
        spinCounter.textContent = spins;
        localStorage.setItem('roleta8bit_spins', spins.toString());

        // Mostrar resultado com tema
        const resultadoTexto = tema !== 'NENHUM' ? `${tema}: ${result}` : `${result}`;
        resultArea.innerHTML = `🎯 ${resultadoTexto}`;
        resultArea.classList.remove('pop');
        void resultArea.offsetWidth;
        resultArea.classList.add('pop');

        saveHistorico(result);
        playCelebrationSound();

        isSpinning = false;
        spinBtn.disabled = false;
    }, 4200);
}

// ============================================
// SONS 8-BITS (CHIP-TUNE)
// ============================================

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
}

function playClickSound() {
    if (!soundEnabled) return;
    initAudio();
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 800;
        osc.type = 'square';
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.06);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.06);
    } catch (e) {}
}

function playSpinSound() {
    if (!soundEnabled) return;
    initAudio();
    try {
        let count = 0;
        const interval = setInterval(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = 400 + Math.random() * 200;
            osc.type = 'square';
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.04);
            count++;
            if (count > 16) clearInterval(interval);
        }, 60);
    } catch (e) {}
}

function playSuccessSound() {
    if (!soundEnabled) return;
    initAudio();
    try {
        const notes = [523, 659, 784];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.frequency.value = freq;
                osc.type = 'square';
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audio