// ============================================
// RODA ARCADE — SCRIPT COMPLETO (STREET FIGHTER)
// ============================================

// ===== ELEMENTOS =====
const roleta = document.getElementById('roleta');
const roletaFatias = document.getElementById('roletaFatias');
const roletaBorder = document.getElementById('roletaBorder');
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemList');
const spinBtn = document.getElementById('spinBtn');
const clearBtn = document.getElementById('clearBtn');
const resultArea = document.getElementById('resultArea');
const historicoList = document.getElementById('historicoList');
const soundToggle = document.getElementById('soundToggle');
const soundStatus = document.getElementById('soundStatus');
const coinCounter = document.getElementById('coinCounter');

let items = [];
let isSpinning = false;
let soundEnabled = true;
let coins = 0;
let currentRotation = 0;

// ===== CORES STREET FIGHTER =====
const COLORS = [
    '#ff0000', '#ffcc00', '#0066ff', '#00ff00',
    '#ff00ff', '#00ffff', '#ff6600', '#ff0066'
];

// ===== CARREGAR DADOS =====
function loadData() {
    const savedItems = localStorage.getItem('roletaArcade_items');
    if (savedItems) {
        try { items = JSON.parse(savedItems); } catch (e) { items = []; }
    }
    const savedCoins = localStorage.getItem('roletaArcade_coins');
    if (savedCoins) {
        coins = parseInt(savedCoins) || 0;
        coinCounter.textContent = coins;
    }
    renderItems();
    loadHistorico();
}

function saveItems() {
    localStorage.setItem('roletaArcade_items', JSON.stringify(items));
    localStorage.setItem('roletaArcade_coins', coins.toString());
}

// ===== HISTÓRICO =====
function loadHistorico() {
    const saved = localStorage.getItem('roletaArcade_historico');
    if (saved) {
        try {
            const historico = JSON.parse(saved);
            renderHistorico(historico);
        } catch (e) { renderHistorico([]); }
    } else { renderHistorico([]); }
}

function saveHistorico(entry) {
    let historico = [];
    const saved = localStorage.getItem('roletaArcade_historico');
    if (saved) {
        try { historico = JSON.parse(saved); } catch (e) {}
    }
    historico.unshift({ item: entry, data: new Date().toLocaleString() });
    if (historico.length > 20) historico.pop();
    localStorage.setItem('roletaArcade_historico', JSON.stringify(historico));
    renderHistorico(historico);
}

function renderHistorico(historico) {
    historicoList.innerHTML = '';
    if (!historico || historico.length === 0) {
        historicoList.innerHTML = '<li class="empty-message-arcade">NENHUM SORTEIO AINDA.</li>';
        return;
    }
    historico.forEach(h => {
        const li = document.createElement('li');
        li.innerHTML = `<span>🎯 ${h.item}</span> <small>${h.data}</small>`;
        historicoList.appendChild(li);
    });
}

// ===== ITENS =====
function renderItems() {
    itemList.innerHTML = '';
    if (items.length === 0) {
        itemList.innerHTML = '<li class="empty-message-arcade" style="width:100%;text-align:center;">NENHUMA OPÇÃO ADICIONADA.</li>';
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
        roleta.style.background = '#0a0a0a';
        return;
    }

    const angleStep = 360 / count;
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
            text-shadow: 2px 2px 0 rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8);
            border: 1px solid rgba(255,255,255,0.15);
        `;

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
            font-weight: bold;
        `;
        fatia.appendChild(span);
        roletaFatias.appendChild(fatia);
    });

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
        resultArea.innerHTML = '<span class="empty-message-arcade">► ADICIONE ITENS E GIRE ◄</span>';
        playClickSound();
    }
}

// ===== GIRAR ROLETA (COM EFEITOS ARCADE) =====
function spinRoleta() {
    if (isSpinning) return;
    if (items.length === 0) {
        resultArea.innerHTML = '<span style="color:#ff0000;">⚠️ ADICIONE ITENS!</span>';
        playErrorSound();
        return;
    }

    isSpinning = true;
    spinBtn.disabled = true;

    // ===== ANIMAÇÃO "VS" =====
    showVSAnimation();

    playSpinSound();

    const randomIndex = Math.floor(Math.random() * items.length);
    const result = items[randomIndex];

    const angleStep = 360 / items.length;
    const targetAngle = 360 - (randomIndex * angleStep + angleStep / 2);
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const finalAngle = extraSpins * 360 + targetAngle;

    // ===== LUZES NA BORDA =====
    startBorderLights();

    roletaFatias.style.transform = `rotate(${finalAngle}deg)`;
    currentRotation = finalAngle;

    setTimeout(() => {
        stopBorderLights();

        // ===== EFEITO "KO" =====
        showKOEffect();

        playSuccessSound();

        coins++;
        coinCounter.textContent = coins;
        localStorage.setItem('roletaArcade_coins', coins.toString());

        resultArea.innerHTML = `🎯 ${result}`;
        resultArea.classList.remove('pop');
        void resultArea.offsetWidth;
        resultArea.classList.add('pop');

        saveHistorico(result);
        playCelebrationSound();

        isSpinning = false;
        spinBtn.disabled = false;
    }, 4200);
}

// ===== ANIMAÇÃO "VS" =====
function showVSAnimation() {
    const vs = document.createElement('div');
    vs.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 6rem;
        font-family: 'Press Start 2P', monospace;
        color: #ffcc00;
        text-shadow: 
            0 0 40px rgba(255, 0, 0, 0.8),
            0 0 80px rgba(255, 0, 0, 0.4),
            4px 4px 0 #ff0000;
        z-index: 999;
        animation: vsAnimation 0.8s steps(4) forwards;
        pointer-events: none;
        background: rgba(0,0,0,0.7);
        padding: 30px 50px;
        border: 4px solid #ffcc00;
        box-shadow: 0 0 60px rgba(255, 204, 0, 0.3);
    `;
    vs.textContent = 'VS';
    document.body.appendChild(vs);

    setTimeout(() => {
        vs.style.animation = 'vsFadeOut 0.3s steps(4) forwards';
        setTimeout(() => vs.remove(), 400);
    }, 1000);
}

// ===== EFEITO "KO" =====
function showKOEffect() {
    const ko = document.createElement('div');
    ko.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        font-family: 'Press Start 2P', monospace;
        color: #ff0000;
        text-shadow: 
            0 0 40px rgba(255, 0, 0, 0.9),
            0 0 80px rgba(255, 0, 0, 0.5),
            4px 4px 0 #000000;
        z-index: 999;
        animation: koAnimation 0.8s steps(4) forwards;
        pointer-events: none;
        background: rgba(0,0,0,0.5);
        padding: 20px 40px;
        border: 4px solid #ff0000;
        box-shadow: 0 0 60px rgba(255, 0, 0, 0.3);
    `;
    ko.textContent = '🔥 KO!';
    document.body.appendChild(ko);

    setTimeout(() => {
        ko.style.animation = 'koFadeOut 0.3s steps(4) forwards';
        setTimeout(() => ko.remove(), 400);
    }, 1200);
}

// ===== LUZES NA BORDA =====
let borderInterval;

function startBorderLights() {
    roletaBorder.style.animation = 'borderGlow 0.3s linear infinite';
    let i = 0;
    borderInterval = setInterval(() => {
        const colors = ['#ff0000', '#ffcc00', '#0066ff', '#00ff00'];
        roletaBorder.style.borderColor = colors[i % colors.length];
        i++;
    }, 150);
}

function stopBorderLights() {
    clearInterval(borderInterval);
    roletaBorder.style.animation = 'borderGlow 2s linear infinite';
    roletaBorder.style.borderColor = '#ffcc00';
}

// ============================================
// SONS ARCADE (CHIP-TUNE)
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
            osc.frequency.value = 300 + Math.random() * 300;
            osc.type = 'square';
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.04);
            count++;
            if (count > 18) clearInterval(interval);
        }, 50);
    } catch (e) {}
}

function playSuccessSound() {
    if (!soundEnabled) return;
    initAudio();
    try {
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.frequency.value = freq;
                osc.type = 'square';
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.2);
            }, i * 100);
        });
    } catch (e) {}
}

function playCelebrationSound() {
    if (!soundEnabled) return;
    initAudio();
    try {
        const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.frequency.value = freq;
                osc.type = 'square';
                gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.1);
            }, i * 60);
        });
    } catch (e) {}
}

function playErrorSound() {
    if (!soundEnabled) return;
    initAudio();
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 200;
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
}

// ============================================
// ESTILOS DINÂMICOS (ANIMAÇÕES)
// ============================================

const styleArcade = document.createElement('style');
styleArcade.textContent = `
    @keyframes vsAnimation {
        0% { transform: translate(-50%, -50%) scale(0) rotate(-10deg); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2) rotate(5deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes vsFadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    @keyframes koAnimation {
        0% { transform: translate(-50%, -50%) scale(0) rotate(-20deg); opacity: 0; }
        30% { transform: translate(-50%, -50%) scale(1.3) rotate(10deg); opacity: 1; }
        70% { transform: translate(-50%, -50%) scale(0.9) rotate(-5deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes koFadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
`;
document.head.appendChild(styleArcade);

// ============================================
// EVENTOS
// ============================================

addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});
spinBtn.addEventListener('click', spinRoleta);
clearBtn.addEventListener('click', clearItems);
soundToggle.addEventListener('click', function() {
    soundEnabled = !soundEnabled;
    soundStatus.textContent = soundEnabled ? 'LIGADO' : 'DESLIGADO';
});

// ============================================
// INICIALIZAR
// ============================================

loadData();
renderItems();