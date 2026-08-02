// ELEMENTOS
const themeSelect = document.getElementById('themeSelect');
const statusTheme = document.getElementById('statusTheme');
const statusSpins = document.getElementById('statusSpins');

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
let spins = 0;

// CORES PARA FATIAS
const SLICE_COLORS = [
  '#ff6b6b', '#4ecdc4', '#ffe66d', '#1a9af7',
  '#ff9f1c', '#ff6b9c', '#9b5de5', '#00bbf9'
];

// LOCALSTORAGE KEYS
function getItemsKey() {
  return `rodaDivertida_items_${currentTheme}`;
}
function getHistoryKey() {
  return `rodaDivertida_history_${currentTheme}`;
}
const SPINS_KEY = 'rodaDivertida_spins';
const THEME_KEY = 'rodaDivertida_theme';

// CARREGAR DADOS
function loadData() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) currentTheme = savedTheme;

  themeSelect.value = currentTheme;
  statusTheme.textContent = formatThemeLabel(currentTheme);

  const savedSpins = localStorage.getItem(SPINS_KEY);
  if (savedSpins) spins = parseInt(savedSpins) || 0;
  updateSpins();

  const savedItems = localStorage.getItem(getItemsKey());
  if (savedItems) {
    try { items = JSON.parse(savedItems); } catch { items = []; }
  }

  renderItems();
  loadHistory();
}

function updateSpins() {
  statusSpins.textContent = spins.toString();
}

function addSpin() {
  spins++;
  localStorage.setItem(SPINS_KEY, spins.toString());
  updateSpins();
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
    li.textContent = 'Nenhum sorteio ainda.';
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
    li.textContent = 'Nenhuma opção adicionada.';
    itemList.appendChild(li);
    renderSlices();
    return;
  }
  items.forEach((text, index) => {
    const li = document.createElement('li');
    li.textContent = text;
    const btn = document.createElement('button');
    btn.className = 'item-remove';
    btn.textContent = '✕';
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

function saveItems() {
  localStorage.setItem(getItemsKey(), JSON.stringify(items));
}

function addItemFromInput() {
  const raw = itemInput.value.trim();
  if (!raw) return;

  const parts = raw.split(',').map(p => p.trim()).filter(p => p);
  parts.forEach(p => {
    if (items.length < 16) {
      items.push(p);
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

    const span = document.createElement('span');
    span.textContent = item;
    slice.appendChild(span);

    wheelSlices.appendChild(slice);
  });
}

function spinWheel() {
  if (isSpinning) return;
  if (items.length === 0) {
    resultArea.innerHTML = '<span class="result-placeholder">Adicione opções primeiro.</span>';
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
    addSpin();
    saveHistoryEntry(result);
    resultArea.innerHTML = `<span class="result-highlight">Resultado: ${result}</span>`;
    isSpinning = false;
    spinBtn.disabled = false;
  }, 3200);
}

// TEMA / PRESET
function formatThemeLabel(theme) {
  switch (theme) {
    case 'FILMES': return 'Filmes';
    case 'SÉRIES': return 'Séries';
    case 'JOGOS': return 'Jogos';
    case 'ANIMES': return 'Animes';
    case 'MÚSICAS': return 'Músicas';
    case 'COMIDAS': return 'Comidas';
    default: return theme;
  }
}

function changeTheme(newTheme) {
  currentTheme = newTheme;
  localStorage.setItem(THEME_KEY, currentTheme);
  statusTheme.textContent = formatThemeLabel(currentTheme);
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
      preset = ['Matrix', 'Toy Story', 'Avatar', 'Jurassic Park', 'Star Wars', 'Vingadores'];
      break;
    case 'SÉRIES':
      preset = ['Breaking Bad', 'Stranger Things', 'The Office', 'Game of Thrones', 'Friends'];
      break;
    case 'JOGOS':
      preset = ['Mario', 'Zelda', 'Fortnite', 'Minecraft', 'Street Fighter', 'FIFA'];
      break;
    case 'ANIMES':
      preset = ['Naruto', 'Dragon Ball', 'One Piece', 'Bleach', 'Demon Slayer'];
      break;
    case 'MÚSICAS':
      preset = ['Rock', 'Pop', 'Jazz', 'Lo-fi', 'Hip Hop', 'Metal'];
      break;
    case 'COMIDAS':
      preset = ['Pizza', 'Hambúrguer', 'Sushi', 'Lasanha', 'Churrasco', 'Tacos'];
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
