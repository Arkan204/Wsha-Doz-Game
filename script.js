const WORD_DATA = {
  names: [
    "ئازاد", "سارا", "نارین", "شادی", "باوان", "هێلین", "کاروان", "ڕێبین", "دڵنیا", "سۆران", "کاوە", "شیاو", "ژیان",
    "ئاراس", "شوان", "هەڵۆ", "لانە", "میدیا", "سیروان", "هەڵمەت", "بڵێسە", "ئەوین", "تارا", "هێڤی", "کانی", "لاڤە", "دانا",
    "سامان", "کامەران", "باران", "دیلان", "شێرکۆ", "ئاڵا", "بەرزان", "چۆمان", "هەردی", "زانا",
    "بەختیار", "نیشتمان", "بەیان", "بریندار", "وشیارا", "بێستوون"
  ],
  animals: [
    "پشیلە", "مامز", "ڕێوی", "گورگ", "کۆتر", "ئاسک", "پڵنگ", "مریشک", "ماسی", "زەڕافە", "باڵندە", "ئەسپ", "هێستر", "مەیمون",
    "قرژاڵ", "مێروولە", "نەهەنگ", "کەڵەشێر", "جووچکە", "تاوس", "کەروێشک", "چۆلەکە", "سیسرک",
    "پەپوولە", "مێشوولە", "کیسەڵ", "سیسرکە"
  ],
  food: [
    "ماست", "کەرە", "برنج", "گۆشت", "شۆربا", "یاپراخ", "دۆڵمە", "کەباب", "بریانی", "پەنیر", "تەماتە", "پیاز",
    "قاوە", "شەربەت", "کفتە", "لۆبیا", "نیسک", "بەڕوو", "پەتاتە", "بیبەر", "ساوار", "قیمە",
    "شفتە", "هێلکە", "کنگر", "دۆشاو",
    "پاقلاوە", "ماست", "برنج", "کفتە", "دۆڵمە"
  ],
  fruits: [
    "خەیار", "هەنار", "شووتی", "قەیسی", "هەنجیر", "گێلاس", "شلیک", "هەرمێ", "کاڵەک", "لیمۆ",
    "لالەنگی", "کیوی", "هەڵووژە", "بادەم", "گوێز", "سندی", "نارنج",
    "هەنجیر", "شووتی", "قەیسی"
  ],
  cities: [
    "دهۆک", "زاخۆ", "ڕانیە", "کۆیە", "سمێڵ", "کفری", "ئامێد", "لۆلان",
    "سۆران", "ئاکرێ", "دووکان", "ئامێدی", "شوان", "بانیێ",
    "هەولێر", "هەڵەبجە", "قەڵادزێ", "شەقڵاوە", "پێنجوێن", "خەلیفان", "سیدەکان", "حاجیاوا", "پیرمام",
    "عەربەت", "سیدسادق", "سلێمانی", "کەرکووک", "ڕەواندز"
  ],
  countries: [
    "میسر", "تونس", "سوید", "کوێت", "مالی", "کەنیا", "کوبا", "غانا", "وێڵز", "نوروج", "نەروەج", "قوبرس",
    "عێراق", "ئێران", "قەتەر", "عومان", "سوریا", "یەمەن", "لیبیا", "یۆنان", "ژاپۆن", "نەمسا", "سعوودی", "ئوردن", "لوبنان", "بێلژیک", "پەنەما", "تایلەند",
    "مەغریب", "ئۆردۆن", "کەنەدا", "مەکسیک", "تورکیا", "جۆرجیا", "سویسرا", "بەحرێن", "ڤێتنام", "ڕووسیا", "سوودان", "سۆماڵ", "فلیپین", "ئاڵمان", "مۆناکۆ", "تایوان",
    "بەلجیکا", "فەڕەنسا", "ئیتالیا", "جەزائیر", "بەڕازیل", "پۆڵەندا", "مالیزیا", "ئەمریکا", "ڤاتیکان", "هۆڵەندا", "سورینام"
  ]
};

const NUMBER_OF_GUESSES = 6;
let WORD_LENGTH = 5; // Default, will change
let currentGuess = 0;
let currentTile = 0;
let secretWord = "";
let guesses = [[]];
let isGameOver = false;
let validWords = [];

const board = document.getElementById('board');
const startScreen = document.getElementById('start-screen');
const gameUI = document.getElementById('game-ui');
const gameInput = document.getElementById('game-input');
const startBtn = document.getElementById('start-game-btn');
const endGameActions = document.getElementById('end-game-actions');
const playAgainBtn = document.getElementById('play-again-btn');
const goToMenuBtn = document.getElementById('go-to-menu-btn');

// Start Game Listener
startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', playAgain);
goToMenuBtn.addEventListener('click', resetToMenu);

function startGame() {
  const category = document.getElementById('category-select').value;
  const lengthInput = parseInt(document.getElementById('length-select').value);

  if (lengthInput < 4 || lengthInput > 7) {
    alert("تکایە ژمارەی پیتەکان لە نێوان ٤ بۆ ٧ بێت");
    return;
  }

  // Filter words
  const allCategoryWords = WORD_DATA[category];
  validWords = allCategoryWords.filter(w => w.length === lengthInput);

  if (validWords.length === 0) {
    alert(`هیچ وشەیەک نەدۆزرایەوە بە درێژی ${lengthInput} بۆ ئەم بەشە.`);
    return;
  }

  WORD_LENGTH = lengthInput;
  secretWord = validWords[Math.floor(Math.random() * validWords.length)];
  guesses = [[]];
  currentGuess = 0;
  currentTile = 0;
  isGameOver = false;

  // Update UI
  startScreen.classList.remove('active');
  startScreen.classList.add('hidden');
  gameUI.classList.remove('hidden');
  gameUI.classList.add('active'); // Ensure flex display

  // Set Category Display
  const categoryLabel = document.querySelector(`#category-select option[value="${category}"]`).textContent;
  document.getElementById('current-category').textContent = categoryLabel.split('(')[0].trim();

  // Update Input MaxLength
  gameInput.maxLength = WORD_LENGTH;
  gameInput.value = "";
  gameInput.focus();

  endGameActions.classList.add('hidden');
  initBoard();
}

function playAgain() {
  secretWord = validWords[Math.floor(Math.random() * validWords.length)];
  guesses = [[]];
  currentGuess = 0;
  currentTile = 0;
  isGameOver = false;

  gameInput.value = "";
  gameInput.focus();
  endGameActions.classList.add('hidden');

  initBoard();
}

function initBoard() {
  board.innerHTML = ''; // Clear previous
  // Update grid columns CSS variable
  document.documentElement.style.setProperty('--cols', WORD_LENGTH);

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < WORD_LENGTH; j++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

// Native Input Logic
// Keep focus on input for mobile
document.addEventListener('click', (e) => {
  // Only text inputs or board clicks should focus
  if (!isGameOver && gameUI.classList.contains('active')) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'BUTTON') {
      gameInput.focus();
    }
  }
});
document.addEventListener('touchstart', (e) => {
  if (!isGameOver && gameUI.classList.contains('active')) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'BUTTON') {
      gameInput.focus();
    }
  }
});

// Sync input value with game state
gameInput.addEventListener('input', (e) => {
  if (isGameOver) return;

  const val = gameInput.value;
  const char = val.slice(-1);

  // We handle Backspace separate via keydown for better reliability
  if (e.inputType === 'insertText' && char) {
    // Regex for Kurdish/Arabic chars
    if (/^[\u0600-\u06FF\u0750-\u077F]$/.test(char)) {
      addLetter(char);
    }
  }

  gameInput.value = '';
});

// Handle keys (Enter & Backspace) reliably via keydown
gameInput.addEventListener('keydown', (e) => {
  if (isGameOver) return;

  if (e.key === 'Enter') {
    checkGuess();
    e.preventDefault();
  } else if (e.key === 'Backspace') {
    deleteLetter();
  }
});

function addLetter(letter) {
  if (currentTile < WORD_LENGTH && guesses[currentGuess].length < WORD_LENGTH) {
    guesses[currentGuess].push(letter);

    const row = board.children[currentGuess];
    const tile = row.children[currentTile];
    tile.textContent = letter;
    tile.setAttribute('data-state', 'active');

    tile.classList.add('bounce');
    tile.addEventListener('animationend', () => {
      tile.classList.remove('bounce');
    }, { once: true });

    currentTile++;
  }
}

function deleteLetter() {
  if (currentTile > 0) {
    guesses[currentGuess].pop();
    currentTile--;

    const row = board.children[currentGuess];
    const tile = row.children[currentTile];
    tile.textContent = '';
    tile.setAttribute('data-state', 'empty');
  }
}

function checkGuess() {
  const guessWord = guesses[currentGuess];
  const row = board.children[currentGuess];

  if (guessWord.length !== WORD_LENGTH) {
    showMessage(`تکایە ${WORD_LENGTH} پیت بنووسە`);
    row.classList.add('shake');
    row.addEventListener('animationend', () => {
      row.classList.remove('shake');
    }, { once: true });
    return;
  }

  const guessString = guessWord.join('');

  // Check if word exists in valid list? Maybe optional strict mode.
  // For now, allow any combo.

  const secretWordChars = secretWord.split('');
  const guessChars = [...guessWord];

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessChars[i] === secretWordChars[i]) {
      row.children[i].setAttribute('data-state', 'correct');
      guessChars[i] = null;
      secretWordChars[i] = null;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessChars[i]) {
      const indexInSecret = secretWordChars.indexOf(guessChars[i]);
      if (indexInSecret > -1) {
        row.children[i].setAttribute('data-state', 'present');
        secretWordChars[indexInSecret] = null;
      } else {
        row.children[i].setAttribute('data-state', 'absent');
      }
    }
    row.children[i].classList.add('flip');
  }

  if (guessString === secretWord) {
    showMessage("پیرۆزە! بردتەوە 👏");
    isGameOver = true;
    gameInput.blur();
    setTimeout(() => endGameActions.classList.remove('hidden'), 500);
  } else {
    if (currentGuess === NUMBER_OF_GUESSES - 1) {
      showMessage("دۆڕایت! وشەکە بریتی بوو لە: " + secretWord);
      isGameOver = true;
      gameInput.blur();
      setTimeout(() => endGameActions.classList.remove('hidden'), 500);
    } else {
      currentGuess++;
      currentTile = 0;
      guesses.push([]);
    }
  }
}

function showMessage(msg) {
  const container = document.getElementById('message-container');
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.backgroundColor = '#fff';
  el.style.color = '#000';
  el.style.padding = '10px 20px';
  el.style.borderRadius = '4px';
  el.style.position = 'absolute';
  el.style.top = '10%';
  el.style.left = '50%';
  el.style.transform = 'translate(-50%, 0)';
  el.style.zIndex = '2000';

  container.appendChild(el);
  setTimeout(() => {
    if (container.contains(el)) container.removeChild(el);
  }, 2500);
}

// Restart Game Logic
const restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener("click", resetToMenu);

function resetToMenu() {
  // Go back to start screen to choose new settings?
  // Or restart with same settings?
  // Let's restart with same settings if within active game
  // But honestly, going back to menu is more flexible.

  isGameOver = false;
  startScreen.classList.remove('hidden');
  startScreen.classList.add('active');
  gameUI.classList.remove('active');
  gameUI.classList.add('hidden');
  endGameActions.classList.add('hidden');
}

// Help Modal Logic
const modal = document.getElementById("help-modal");
const btn = document.getElementById("help-btn");
const span = document.getElementsByClassName("close-btn")[0];

btn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
