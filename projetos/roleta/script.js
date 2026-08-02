// ============================================
// RODA 8-BIT — SCRIPT COMPLETO
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
const soundStatus = document.getElementById('soundStatus');
const spinCounter = document.getElementById('spinCounter');

let items = [];
let isSpinning = false;
let soundEnabled = true;
let spins = 0;

// ===== CORES 8-BITS (NES) =====
const COLORS = [
    '#e52521', '#f5c800', '#0068b5', '#00a800',
    '#e52521', '#f5c800', '#0068b5', '#00a800'
];

// ===== CARREGAR DADOS =====
function loadData() {
    const saved = localStorage.getItem('roleta8bit_items');
    if (saved) {
        try { items = JSON.parse(saved); } catch (e) { items = []; }
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

// ===== ITENS =====
function renderItems() {
    itemList.innerHTML = '';
    if (items.length === 0) {
        itemList.innerHTML = '<li class="empty-message" style="width:100%;text-align:center;">NENHUMA OPÇÃO ADICIONADA.</li>';
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
    updateRoletaCores();
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

// ===== ROLETA =====
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

    const angle = 1440 + (360 / items.length) * randomIndex + 360 - (360 / items.length / 2);

    roleta.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
        playSuccessSound();

        spins++;
        spinCounter.textContent = spins;
        localStorage.setItem('roleta8bit_spins', spins.toString());

        resultArea.innerHTML = `🎯 ${result}`;
        resultArea.classList.remove('pop');
        void resultArea.offsetWidth;
        resultArea.classList.add('pop');

        saveHistorico(result);
        playCelebrationSound();

        isSpinning = false;
        spinBtn.disabled = false;
    }, 4000);
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
        const notes = [523, 587, 659, 698, 784, 880];
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

loadData();
if (items.length > 0) {
    updateRoletaCores();
}