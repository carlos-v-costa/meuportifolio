// ============================================
// RODA CARTOON — SCRIPT COMPLETO (NOITE)
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

// ===== CORES NOITE CARTOON (PASTEL ESCURO) =====
const COLORS = [
    '#2a1a3a', '#1a2a4a', '#3a1a2a', '#1a3a2a',
    '#2a2a4a', '#4a1a3a', '#1a4a3a', '#3a2a1a'
];

// ============================================
// ESTRELAS CADENTES
// ============================================
function createShootingStar() {
    const container = document.getElementById('shooting-stars');
    if (!container) return;

    const star = document.createElement('div');
    star.classList.add('shooting-star');

    const startX = Math.random() * 100;
    const startY = Math.random() * 30;

    const angle = Math.random() * 60 + 20;
    const distance = 200 + Math.random() * 300;
    const tx = distance * Math.cos(angle * Math.PI / 180);
    const ty = distance * Math.sin(angle * Math.PI / 180);

    star.style.left = startX + '%';
    star.style.top = startY + '%';
    star.style.setProperty('--tx', tx + 'px');
    star.style.setProperty('--ty', ty + 'px');

    const duration = 2 + Math.random() * 2;
    star.style.animationDuration = duration + 's';

    const size = 1 + Math.random() * 2;
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    container.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, duration * 1000 + 500);
}

function startShootingStars() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createShootingStar(), i * 1000);
    }

    setInterval(() => {
        if (Math.random() < 0.25) {
            createShootingStar();
        }
    }, 3000 + Math.random() * 3000);
}

// ============================================
// CARREGAR DADOS
// ============================================
function loadData() {
    const savedItems = localStorage.getItem('roletaCartoon_items');
    if (savedItems) {
        try { items = JSON.parse(savedItems); } catch (e) { items = []; }
    }
    const savedCoins = localStorage.getItem('roletaCartoon_coins');
    if (savedCoins) {
        coins = parseInt(savedCoins) || 0;
        coinCounter.textContent = coins;
    }
    renderItems();
    loadHistorico();
}

function saveItems() {
    localStorage.setItem('roletaCartoon_items', JSON.stringify(items));
    localStorage.setItem('roletaCartoon_coins', coins.toString());
}

// ===== HISTÓRICO =====
function loadHistorico() {
    const saved = localStorage.getItem('roletaCartoon_historico');
    if (saved) {
        try {
            const historico = JSON.parse(saved);
            renderHistorico(historico);
        } catch (e) { renderHistorico([]); }
    } else { renderHistorico([]); }
}

function saveHistorico(entry) {
    let historico = [];
    const saved = localStorage.getItem('roletaCartoon_historico');
    if (saved) {
        try { historico = JSON.parse(saved); } catch (e) {}
    }
    historico.unshift({ item: entry, data: new Date().toLocaleString() });
    if (historico.length > 20) historico.pop();
    localStorage.setItem('roletaCartoon_historico', JSON.stringify(historico));
    renderHistorico(historico);
}

function renderHistorico(historico) {
    historicoList.innerHTML = '';
    if (!historico || historico.length === 0) {
        historicoList.innerHTML = '<li class="empty-message-cartoon">NENHUM SORTEIO AINDA.</li>';
        return;
    }
    historico.forEach(h => {
        const li = document.createElement('li');
        li.innerHTML = `<span>✦ ${h.item}</span> <small>${h.data}</small>`;
        historicoList.appendChild(li);
    });
}

// ===== ITENS =====
function renderItems() {
    itemList.innerHTML = '';
    if (items.length === 0) {
        itemList.innerHTML = '<li class="empty-message-cartoon" style="width:100%;text-align:center;">NENHUMA OPÇÃO ADICIONADA.</li>';
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
        roleta.style.background = 'rgba(20,20,40,0.9)';
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
            color: rgba(255,255,255,0.8);
            font-size: 0.5rem;
            padding-left: 10px;
            box-sizing: border-box;
            font-family: 'Nunito', sans-serif;
            font-weight: 700;
            border: 1px solid rgba(255,255,255,0.05);
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
            font-family: 'Nunito', sans-serif;
            font-weight: 700;
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
        resultArea.innerHTML = '<span class="empty-message-cartoon">► ADICIONE ITENS E GIRE ◄</span>';
        playClickSound();
    }
}

// ===== GIRAR ROLETA =====
function spinRoleta() {
    if (isSpinning) return;
    if (items.length === 0) {
        resultArea.innerHTML = '<span style="color:#ffd54f;">⚠️ ADICIONE ITENS!</span>';
        playErrorSound();
        return;
    }

    isSpinning = true;
    spinBtn.disabled = true;

    roleta.style.transition = 'transform 0.3s ease';
    roleta.style.transform = 'scale(0.95)';
    setTimeout(() => {
        roleta.style.transform = 'scale(1)';
    }, 200);

    playSpinSound();

    const randomIndex = Math.floor(Math.random() * items.length);
    const result = items[randomIndex];

    const angleStep = 360 / items.length;
    const targetAngle = 360 - (randomIndex * angleStep + angleStep / 2);
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const finalAngle = extraSpins * 360 + targetAngle;

    roletaFatias.style.transition = 'transform 4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    roletaFatias.style.transform = `rotate(${finalAngle}deg)`;
    currentRotation = finalAngle;

    startBorderLights();

    setTimeout(() => {
        stopBorderLights();

        playSuccessSound();

        coins++;
        coinCounter.textContent = coins;
        localStorage.setItem('roletaCartoon_coins', coins.toString());

        resultArea.innerHTML = `✦ ${result}`;
        resultArea.classList.remove('pop');
        void resultArea.offsetWidth;
        resultArea.classList.add('pop');

        saveHistorico(result);
        playCelebrationSound();

        isSpinning = false;
        spinBtn.disabled = false;
    }, 4200);
}

// ===== LUZES NA BORDA =====
let borderInterval;

function startBorderLights() {
    roletaBorder.style.animation = 'borderGlowNight 0.3s linear infinite';
    let i = 0;
    borderInterval = setInterval(() => {
        const colors = ['rgba(255,215,0,0.3)', 'rgba(100,200,255,0.3)', 'rgba(255,150,200,0.3)', 'rgba(150,255,200,0.3)'];
        roletaBorder.style.borderColor = colors[i % colors.length];
        i++;
    }, 200);
}

function stopBorderLights() {
    clearInterval(borderInterval);
    roletaBorder.style.animation = 'borderGlowNight 6s linear infinite';
    roletaBorder.style.borderColor = 'rgba(255,215,0,0.2)';
}

// ============================================
// SONS CARTOON (SUAVES)
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
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
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
            osc.frequency.value = 500 + Math.random() * 200;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
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
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
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
        const notes = [523, 587, 659, 698, 784];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
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
        osc.frequency.value = 300;
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
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

// ============================================
// INICIALIZAR
// ============================================

loadData();
renderItems();
startShootingStars();

if (items.length > 0) {
    renderFatias();
}