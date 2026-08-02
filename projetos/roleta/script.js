// ELEMENTOS
const themeSelect = document.getElementById('themeSelect');
const hudTheme = document.getElementById('hudTheme');
const creditCounter = document.getElementById('creditCounter');

const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const clearItemsBtn = document.getElementById('clearItemsBtn');
const itemList = document.getElementById('itemList');

const wheelSlices = document.getElementById('wheelSlices');
const spinBtn = document.getElementById('spinBtn');
const resultArea = document.getElementById('resultArea');

const historyList = document.getElementById('historyList');
const btnPreset = document.getElementById('btnPreset');

let currentTheme = 'FILMES';
let items = [];
let isSpinning = false;
let credits = 0;

// PALETA RETRÔ PARA FATIAS
const SLICE_COLORS = [
  '#e4000f', '#4b6cd1', '#6a4bd1', '#f2d64b',
  '#3a3a3a', '#c4c4c4', '#e47f0f', '#2b8c3a'
];

// LOCALSTORAGE KEYS
function getItemsKey() {
  return `pixelRoulette_items_${currentTheme}`;
}
function getHistoryKey() {
  return `pixelRoulette_history_${currentTheme}`;
}
const CREDIT_KEY = 'pixelRoulette_credits';
const THEME_KEY = 'pixelRoulette_theme';

// CARREGAR DADOS
function loadData() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) currentTheme = savedTheme;

  themeSelect.value = currentTheme;
  hudTheme.textContent = currentTheme;

  const savedCredits = localStorage.getItem(CREDIT_KEY);
  if (savedCredits) credits = parseInt(savedCredits) || 0;
  updateCredits();

  const savedItems = localStorage.getItem(getItemsKey());
  if (savedItems) {
    try { items = JSON.parse(savedItems); } catch { items = []; }
  }

  renderItems();
  loadHistory();
}

function saveItems() {
  localStorage.setItem(getItemsKey(), JSON.stringify(items));
}

function updateCredits() {
  creditCounter.textContent = String(credits).padStart(3, '0');
}

function addCredit() {
  credits++;
  localStorage.setItem(CREDIT_KEY, credits.toString());
  updateCredits();
}

// HISTÓRICO
function loadHistory() {
  const saved = localStorage.getItem(getHistoryKey());
  if (!saved) {
    renderHistory([]);
    return;
  }
  try {
    const history = JSON.parse(saved);
    renderHistory(history);
  } catch {
    renderHistory([]);
  }
}

function saveHistoryEntry(item) {
  const saved = localStorage.getItem(getHistoryKey());
  let history = [];
  if (saved) {
    try { history = JSON.parse(saved); } catch {}
  }
  history.unshift({ item, date: new Date().toLocaleString() });
  if (history.length > 20) history.pop();
  localStorage.setItem(getHistoryKey(), JSON.stringify(history));
  renderHistory(history);
}

function renderHistory(history) {
  historyList.innerHTML = '';
  if (!history || history.length === 0) {
    const li = document.createElement('li');
    li.className = 'history-empty';
    li.textContent = 'NENHUM SORTEIO AINDA.';
    historyList.appendChild(li);
    return;
  }
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.item} · ${entry.date}`;
    historyList.appendChild(li);
  });
}

// ITENS
function renderItems() {
  itemList.innerHTML = '';
  if (items.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'NENHUMA OPÇÃO ADICIONADA.';
    itemList.appendChild(li);
    renderSlices();
    return;
  }
  items.forEach((text, index) => {
    const li = document.createElement('li');
    li.textContent = text;
    const btn = document.createElement('button');
    btn.className = 'item-remove';
    btn.textContent = 'X';
    btn.addEventListener('click', () => {
      items.splice(index, 1);
      saveItems();
      renderItems();
    });
    li.appendChild(btn);
    itemList.appendChild(li);
  });
  renderSlices();
}

function addItemFromInput() {
  const raw = itemInput.value.trim();
  if (!raw) return;

  // permite múltiplos separados por vírgula
  const parts = raw.split(',').map(p => p.trim()).filter(p => p);
  parts.forEach(p => {
    if (items.length < 12) {
      items.push(p.toUpperCase());
    }
  });

  itemInput.value = '';
  saveItems();
  renderItems();
}

function clearItems() {
  if (items.length === 0) return;
  if (!confirm('Limpar todas as opções deste tema?')) return;
  items = [];
  saveItems();
  renderItems();
}

// ROLETA
function renderSlices() {
  wheelSlices.innerHTML = '';
  const count = items.length;
  if (count === 0) return;

  const angleStep = 360 / count;
  items.forEach((item, index) => {
    const angle = index * angleStep;
    const color = SLICE_COLORS[index % SLICE_COLORS.length];

    const slice = document.createElement('div');
    slice.className = 'slice';
    slice.style.background = color;
    slice.style.transform = `rotate(${angle}deg)`;
    slice.style.border = '1px solid #000000';

    const span = document.createElement('span');
    span.textContent = item;
    slice.appendChild(span);

    wheelSlices.appendChild(slice);
  });
}

function spinWheel() {
  if (isSpinning) return;
  if (items.length === 0) {
    resultArea.innerHTML = '<span class="result-placeholder">ADICIONE OPÇÕES PRIMEIRO.</span>';
    return;
  }

  isSpinning = true;
  spinBtn.disabled = true;

  const randomIndex = Math.floor(Math.random() * items.length);
  const angleStep = 360 / items.length;
  const targetAngle = 360 - (randomIndex * angleStep + angleStep / 2);
  const extraSpins = 4 + Math.floor(Math.random() * 3);
  const finalAngle = extraSpins * 360 + targetAngle;

  wheelSlices.style.transform = `rotate(${finalAngle}deg)`;

  setTimeout(() => {
    const result = items[randomIndex];
    addCredit();
    saveHistoryEntry(result);
    resultArea.innerHTML = `<span class="result-highlight">RESULTADO: ${result}</span>`;
    isSpinning = false;
    spinBtn.disabled = false;
  }, 3200);
}

// TEMA / PRESET
function changeTheme(newTheme) {
  currentTheme = newTheme;
  localStorage.setItem(THEME_KEY, currentTheme);
  hudTheme.textContent = currentTheme;
  items = [];
  const savedItems = localStorage.getItem(getItemsKey());
  if (savedItems) {
    try { items = JSON.parse(savedItems); } catch { items = []; }
  }
  renderItems();
  loadHistory();
}

function loadPresetForTheme() {
  let preset = [];
  switch (currentTheme) {
    case 'FILMES':
      preset = ['MATRIX', 'JURASSIC PARK', 'TOY STORY', 'STAR WARS', 'TERMINATOR', 'AVATAR'];
      break;
    case 'SÉRIES':
      preset = ['BREAKING BAD', 'STRANGER THINGS', 'THE OFFICE', 'GAME OF THRONES', 'LOST'];
      break;
    case 'JOGOS':
      preset = ['MARIO', 'ZELDA', 'METROID', 'F-ZERO', 'DONKEY KONG', 'STREET FIGHTER'];
      break;
    case 'ANIMES':
      preset = ['NARUTO', 'DRAGON BALL', 'ONE PIECE', 'BLEACH', 'DEMON SLAYER'];
      break;
    case 'MÚSICAS':
      preset = ['ROCK', 'POP', 'JAZZ', 'LO-FI', 'HIP HOP', 'METAL'];
      break;
    case 'COMIDAS':
      preset = ['PIZZA', 'HAMBÚRGUER', 'SUSHI', 'LASANHA', 'CHURRASCO', 'TACOS'];
      break;
  }
  items = preset;
  saveItems();
  renderItems();
}

// EVENTOS
themeSelect.addEventListener('change', () => {
  changeTheme(themeSelect.value);
});

addItemBtn.addEventListener('click', addItemFromInput);
itemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addItemFromInput();
});

clearItemsBtn.addEventListener('click', clearItems);
spinBtn.addEventListener('click', spinWheel);
btnPreset.addEventListener('click', loadPresetForTheme);

// INIT
loadData();
