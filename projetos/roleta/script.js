// ============================================
// ROLETA — SCRIPT COMPLETO (RENOVADO)
// ============================================

// ===== ELEMENTOS =====
const roleta = document.getElementById('roleta');
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemList');
const spinBtn = document.getElementById('spinBtn');
const clearBtn = document.getElementById('clearBtn');
const resultArea = document.getElementById('resultArea');
const historicoList = document.getElementById('historicoList');
const soundToggle = document.getElementById('soundToggle');

// ===== ESTADO =====
let items = [];
let isSpinning = false;
let soundEnabled = true;

// ===== CORES DA ROLETA (PALETA HARMONIOSA) =====
const COLORS = [
    '#00b4d8', '#48cae4', '#0077b6', '#90e0ef',
    '#00d4ff', '#0096c7', '#023e8a', '#03045e'
];

// ===== CARREGAR DADOS SALVOS =====
function loadData() {
    const saved = localStorage.getItem('roleta_items');
    if (saved) {
        try { items = JSON.parse(saved); } catch (e) { items = []; }
    }
    renderItems();
    loadHistorico();
}

function saveItems() {
    localStorage.setItem('roleta_items', JSON.stringify(items));
}

// ===== HISTÓRICO =====
function loadHistorico() {
    const saved = localStorage.getItem('roleta_historico');
    if (saved) {
        try {
            const historico = JSON.parse(saved);
            renderHistorico(historico);
        } catch (e) { renderHistorico([]); }
    } else { renderHistorico([]); }
}

function saveHistorico(entry) {
    let historico = [];
    const saved = localStorage.getItem('roleta_historico');
    if (saved) {
        try { historico = JSON.parse(saved); } catch (e) {}
    }
    historico.unshift({ item: entry, data: new Date().toLocaleString() });
    if (historico.length > 20) historico.pop();
    localStorage.setItem('roleta_historico', JSON.stringify(historico));
    renderHistorico(historico);
}

function renderHistorico(historico) {
    historicoList.innerHTML = '';
    if (!historico || historico.length === 0) {
        historicoList.innerHTML = '<li class="empty-message">Nenhum sorteio ainda.</li>';
        return;
    }
    historico.forEach(h => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${h.item}</span> <small>${h.data}</small>`;
        historicoList.appendChild(li);
    });
}

// ===== RENDERIZAR ITENS =====
function renderItems() {
    itemList.innerHTML = '';
    if (items.length === 0) {
        itemList.innerHTML = '<li class="empty-message" style="width:100%;text-align:center;">Nenhuma opção adicionada.</li>';
        return;
    }
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item}
            <button class="remove-btn" data-index="${index}"><i class="fas fa-times"></i></button>
        `;
        li.querySelector('.remove-btn').addEventListener('click', () => { removeItem(index); });
        itemList.appendChild(li);
    });
    updateRoletaCores();
}

// ===== ADICIONAR ITEM =====
function addItem() {
    const text = itemInput.value.trim();
    if (!text) return;
    if (items.length >= 12) {
        alert('Máximo de 12 itens!');
        return;
    }
    items.push(text);
    itemInput.value = '';
    saveItems();
    renderItems();
    playClickSound();
}

// ===== REMOVER ITEM =====
function removeItem(index) {
    items.splice(index, 1);
    saveItems();
    renderItems();
    playClickSound();
}

// ===== LIMPAR LISTA =====
function clearItems() {
    if (items.length === 0) return;
    if (confirm('Tem certeza que deseja limpar a lista?')) {
        items = [];
        saveItems();
        renderItems();
        resultArea.innerHTML = '<span class="empty-message">Adicione itens e gire a roleta!</span>';
        playClickSound();
    }
}

// ===== ATUALIZAR CORES DA ROLETA =====
function updateRoletaCores() {
    const count = items.length;
    if (count === 0) {
        roleta.style.background = '#2d3436';
        return;
    }
    let gradient = 'conic-gradient(';
    const step = 100 / count;
    for (let i = 0; i < count; i++) {
        const color = COLORS[i % COLORS.length];
        const start = i * step;
        const end = (i + 1) * step;
        gradient += `${color} ${start}% ${end}%${i < count - 1 ? ',' : ''}`;
    }
    gradient += ')';
    roleta.style.background = gradient;
}

// ===== GIRAR ROLETA =====
function spinRoleta() {
    if (isSpinning) return;
    if (items.length === 0) {
        resultArea.innerHTML = '<span style="color:#e74c3c;">⚠️ Adicione itens primeiro!</span>';
        playErrorSound();
        return;
    }

    isSpinning = true;
    spinBtn.disabled = true;

    playSpinSound();

    const randomIndex = Math.floor(Math.random() * items.length);
    const result = items[randomIndex];

    const angle = 1440 + (360 / items.length) * randomIndex + 360 - (360 / items.length / 2);

    roleta.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
        playSuccessSound();

        resultArea.innerHTML = `🎉 <span style="color: #feca57;">${result}</span> 🎉`;
        resultArea.classList.remove('pop');
        void resultArea.offsetWidth;
        resultArea.classList.add('pop');

        saveHistorico(result);
        playCelebrationSound();
        createConfetti();

        isSpinning = false;
        spinBtn.disabled = false;
    }, 4000);
}

// ============================================
// CONFETES
// ============================================
function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#1dd1a1', '#f368e0'];
    const container = document.querySelector('.roleta-container');
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = Math.random() * 1 + 1;
        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size * 0.6}px;
            background: ${color};
            left: ${left}%;
            top: -10%;
            border-radius: 2px;
            z-index: 1000;
            pointer-events: none;
            animation: confettiFall ${duration}s ease-in ${delay}s forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), (duration + delay) * 1000 + 100);
    }
}

// CSS para confetes (adicione no style.css)
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg) scale(0.5); opacity: 0; }
    }
`;
document.head.appendChild(confettiStyle);

// ============================================
// SONS (Web Audio API)
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
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.08);
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
            osc.frequency.value = 600 + Math.random() * 200;
            osc.type = 'square';
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.04);
            count++;
            if (count > 18) clearInterval(interval);
        }, 70);
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
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.25);
            }, i * 120);
        });
    } catch (e) {}
}

function playCelebrationSound() {
    if (!soundEnabled) return;
    initAudio();
    try {
        const notes = [523, 587, 659, 698, 784, 880];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.12);
            }, i * 70);
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
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
}

// ============================================
// EVENT LISTENERS
// ============================================

addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});
spinBtn.addEventListener('click', spinRoleta);
clearBtn.addEventListener('click', clearItems);
soundToggle.addEventListener('change', function() {
    soundEnabled = this.checked;
});

// ============================================
// INICIALIZAR
// ============================================

loadData();
if (items.length > 0) {
    updateRoletaCores();
}