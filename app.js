const games = [
  { id: 'tic-tac-toe', title: 'Tic Tac Toe', desc: 'A tiny board. A surprisingly big brain battle.', category: 'Multiplayer', icon: '⭕', color: '#b594ff', tip: 'Take the middle early. It opens up the most winning lines.' },
  { id: 'rock-paper-scissors', title: 'Rock Paper Scissors', desc: 'Pick your move and see if luck is on your side.', category: 'Multiplayer', icon: '✊', color: '#ff83ba', tip: 'Rock beats scissors, scissors beat paper, paper beats rock.' },
  { id: 'snake', title: 'Snake Game', desc: 'Eat, grow, and avoid getting tangled up.', category: 'Arcade', icon: '🐍', color: '#74e6ae', tip: 'Use arrow keys or WASD. The on-screen arrows work on touch too.' },
  { id: 'memory', title: 'Memory Card Match', desc: 'Flip the cards and find every matching pair.', category: 'Brain Games', icon: '🧠', color: '#77dce8', tip: 'Try to remember each card location as you turn it over.' },
  { id: 'number-guess', title: 'Number Guessing', desc: 'Can you find the secret number in ten tries?', category: 'Puzzle', icon: '🔢', color: '#f4cb69', tip: 'Each guess tells you whether to go higher or lower.' },
  { id: 'hangman', title: 'Hangman', desc: 'Guess the hidden word before the drawing is complete.', category: 'Brain Games', icon: '🔤', color: '#fa8b9b', tip: 'Start with common vowels, then narrow down the consonants.' },
  { id: 'whack-a-mole', title: 'Whack-a-Mole', desc: 'Catch the moles before the 30-second buzzer.', category: 'Arcade', icon: '🐹', color: '#efa777', tip: 'Keep your eyes moving. A mole can pop up anywhere.' },
  { id: 'flappy-bird', title: 'Flappy Bird', desc: 'Tap to fly through the pipes. One gap at a time.', category: 'Arcade', icon: '🐤', color: '#f3d37b', tip: 'A short tap gives a small lift. Find a steady rhythm.' },
  { id: 'pong', title: 'Pong', desc: 'Keep the rally going against a speedy computer paddle.', category: 'Arcade', icon: '🏓', color: '#73e2e2', tip: 'Move with W/S or the up and down arrow keys.' },
  { id: 'breakout', title: 'Breakout', desc: 'Bounce the ball and clear the whole brick wall.', category: 'Arcade', icon: '🧱', color: '#d28fff', tip: 'Move the paddle with your mouse, finger, or arrow keys.' },
  { id: '2048', title: '2048', desc: 'Slide matching tiles together to reach the big one.', category: 'Puzzle', icon: '🔳', color: '#f1b878', tip: 'Every move adds a tile, so plan around open space.' },
  { id: 'minesweeper', title: 'Minesweeper', desc: 'Read the clues and uncover the safe squares.', category: 'Puzzle', icon: '💣', color: '#ff8e83', tip: 'Numbers show how many mines touch that square. Use flag mode to mark risks.' },
  { id: 'simon', title: 'Simon Says', desc: 'Watch the color sequence and repeat it exactly.', category: 'Brain Games', icon: '🎛️', color: '#a18cff', tip: 'The sequence grows by one after every successful round.' },
  { id: 'word-scramble', title: 'Word Scramble', desc: 'Unscramble the letters before you run out of time.', category: 'Brain Games', icon: '🔠', color: '#81d8aa', tip: 'Look for familiar letter pairs and common word endings.' },
  { id: 'math-quiz', title: 'Math Quiz', desc: 'Solve as many quick-fire sums as you can in 45 seconds.', category: 'Brain Games', icon: '➗', color: '#75c6ed', tip: 'Correct answers add points. Keep the pace, accuracy first.' },
  { id: 'typing-test', title: 'Typing Speed Test', desc: 'Type the words accurately before the timer runs out.', category: 'Brain Games', icon: '⌨️', color: '#e9a1d6', tip: 'Accuracy matters as much as speed. Keep a comfortable rhythm.' },
  { id: 'reaction-test', title: 'Reaction Time Test', desc: 'Wait for green, then click as fast as you can.', category: 'Arcade', icon: '⚡', color: '#f2d371', tip: 'Clicking before the signal counts as a false start.' },
  { id: 'connect-four', title: 'Connect Four', desc: 'Take turns and connect four tokens to win.', category: 'Multiplayer', icon: '🔴', color: '#ef8192', tip: 'Watch for threats in both directions before dropping your piece.' },
  { id: 'sudoku', title: 'Sudoku', desc: 'Fill the grid so every row, column, and box has 1–9.', category: 'Puzzle', icon: '▦', color: '#78d8c6', tip: 'A number can appear only once in each row, column, and 3×3 box.' },
  { id: 'chess', title: 'Chess', desc: 'A local two-player match. Protect your king and think ahead.', category: 'Strategy', icon: '♟️', color: '#d3b1ff', tip: 'Select a piece to see its legal moves. Promotion, castling, and en passant are supported.' },
  { id: 'pac-man', title: 'Pac-Man', desc: 'Clear the maze, collect dots, and steer clear of the chasers.', category: 'Arcade', icon: '🟡', color: '#f4d36f', tip: 'Use arrow keys or the on-screen arrows. Each dot adds points.' },
  { id: 'clicker', title: 'Clicker Champion', desc: 'Click for points and unlock stronger clicks at milestones.', category: 'Arcade', icon: '👆', color: '#7de2bd', tip: 'Every 50 clicks boosts your points per click. Milestones stack.' },
  { id: 'space-invaders', title: 'Space Invaders', desc: 'Move, fire, and clear the descending alien fleet.', category: 'Arcade', icon: '👾', color: '#a18cff', tip: 'Move with the arrow keys and fire with Space.' },
  { id: 'tetris', title: 'Tetris', desc: 'Fit the falling blocks together and clear complete rows.', category: 'Puzzle', icon: '🧩', color: '#75d9e8', tip: 'Use the arrow keys to move and rotate. Down speeds up the fall.' },
  { id: 'lights-out', title: 'Lights Out', desc: 'Turn off every light by toggling tiles and their neighbors.', category: 'Puzzle', icon: '💡', color: '#f4cb69', tip: 'Each move flips the selected tile and the tiles beside it.' },
  { id: 'wordle', title: 'Word Guess', desc: 'Crack the five-letter word in six guesses.', category: 'Brain Games', icon: '🔡', color: '#80d8a9', tip: 'Green letters are in the right spot; yellow letters belong elsewhere.' },
  { id: 'mastermind', title: 'Code Breaker', desc: 'Deduce the hidden four-color code from the clues.', category: 'Puzzle', icon: '🔐', color: '#cf9aff', tip: 'Feedback shows correct colors and correct positions.' },
  { id: 'battleship', title: 'Battleship', desc: 'Find and sink the hidden fleet on a compact grid.', category: 'Strategy', icon: '🚢', color: '#75bfee', tip: 'A hit is marked red. Clear the fleet to finish the round.' },
  { id: 'reversi', title: 'Reversi', desc: 'Flip your opponent’s pieces and claim the most territory.', category: 'Strategy', icon: '⚫', color: '#c4b0ff', tip: 'Place a piece to bracket a line of your opponent’s pieces.' },
  { id: 'nim', title: 'Nim', desc: 'Take one to three stones. Avoid taking the last one.', category: 'Strategy', icon: '🪨', color: '#e9aa7c', tip: 'Plan your turn so your opponent is left with the final stone.' },
  { id: 'fifteen-puzzle', title: '15 Puzzle', desc: 'Slide numbered tiles into order with the empty space.', category: 'Puzzle', icon: '🔢', color: '#f4bd72', tip: 'Only tiles next to the empty space can move.' },
  { id: 'fruit-catcher', title: 'Fruit Catcher', desc: 'Move your basket to catch fruit before it falls.', category: 'Arcade', icon: '🍎', color: '#f38b9b', tip: 'Use the left and right arrow keys or the on-screen buttons.' },
  { id: 'maze-runner', title: 'Maze Runner', desc: 'Find your way through the maze and collect every star.', category: 'Puzzle', icon: '🌀', color: '#79d8c6', tip: 'Use arrow keys or the on-screen arrows to explore.' },
  { id: 'bubble-pop', title: 'Bubble Pop', desc: 'Pop groups of matching bubbles to build your score.', category: 'Arcade', icon: '🫧', color: '#86c9ee', tip: 'Bigger matching groups earn more points.' },
  { id: 'number-sequence', title: 'Sequence Solver', desc: 'Work out the pattern and enter the next number.', category: 'Brain Games', icon: '🧮', color: '#f0cb70', tip: 'Look for a repeated operation or a changing difference.' },
  { id: 'dino-dash', title: 'Dino Dash', desc: 'Jump over obstacles and see how long you can run.', category: 'Arcade', icon: '🦖', color: '#91d78e', tip: 'Press Space, tap, or use the jump button to leap.' },
  { id: 'color-match', title: 'Color Match', desc: 'Race the timer and tap the color named on screen.', category: 'Brain Games', icon: '🎨', color: '#e89fd3', tip: 'Read the word, not the color it is printed in.' },
  { id: 'blackjack', title: 'Blackjack', desc: 'Get closer to 21 than the dealer without going over.', category: 'Strategy', icon: '🃏', color: '#84dbb7', tip: 'Aces count as 1 or 11. Stand when your hand is strong.' },
  { id: 'treasure-hunt', title: 'Treasure Hunt', desc: 'Search the map for treasure while avoiding hidden traps.', category: 'Puzzle', icon: '🗺️', color: '#e7b66f', tip: 'The clues tell you how close you are to the treasure.' },
  { id: 'quick-draw', title: 'Quick Draw', desc: 'Hit the target as it appears and score before time runs out.', category: 'Arcade', icon: '🎯', color: '#f28d84', tip: 'Stay focused: targets move to a new spot after each hit.' },
  { id: 'trivia-quiz', title: 'Trivia Quiz', desc: 'Answer five quick questions across science, nature, and more.', category: 'Brain Games', icon: '❔', color: '#82c6ed', tip: 'Choose the best answer. Each correct answer earns a point.' },
  { id: 'checkers', title: 'Checkers', desc: 'A local two-player match of diagonals, jumps, and kings.', category: 'Strategy', icon: '🔴', color: '#ec8c96', tip: 'Move diagonally. Jump over an opponent to capture a piece.' },
  { id: 'typing-race', title: 'Typing Race', desc: 'Type each word correctly and race through the word list.', category: 'Brain Games', icon: '🏁', color: '#d49bdb', tip: 'Enter the displayed word exactly to score and advance.' },
  { id: 'match-three', title: 'Match Three', desc: 'Swap neighboring gems to make rows of three or more.', category: 'Puzzle', icon: '💎', color: '#8bb6f2', tip: 'Only swaps that make a match are kept.' },
  { id: 'color-flood', title: 'Color Flood', desc: 'Flood the board from the corner and claim every tile.', category: 'Puzzle', icon: '🌈', color: '#a894ef', tip: 'Pick the color that expands your connected region.' },
  { id: 'color-lines', title: 'Color Lines', desc: 'Move matching orbs into lines of five to clear them.', category: 'Puzzle', icon: '🔵', color: '#70c8e0', tip: 'Select an orb, then an open neighboring square.' },
  { id: 'rocket-launch', title: 'Rocket Launch', desc: 'Time each launch when the moving marker hits the target zone.', category: 'Arcade', icon: '🚀', color: '#f3bd75', tip: 'Press Launch when the marker is in the highlighted zone.' },
  { id: 'basketball-shot', title: 'Basketball Shot', desc: 'Time your shots as the hoop moves across the court.', category: 'Arcade', icon: '🏀', color: '#e9a475', tip: 'Shoot when the moving hoop lines up with the target.' },
  { id: 'coin-flip', title: 'Coin Flip Streak', desc: 'Call heads or tails and build a streak of correct calls.', category: 'Arcade', icon: '🪙', color: '#e7cc76', tip: 'Make ten calls. A correct guess earns one point.' },
  { id: 'safe-cracker', title: 'Safe Cracker', desc: 'Crack the three-digit safe code using digit-position clues.', category: 'Puzzle', icon: '🔒', color: '#9ab8cf', tip: 'Feedback tells you how many digits are in the correct position.' },
  { id: 'word-ladder', title: 'Word Ladder', desc: 'Turn CAT into DOG by changing one letter at a time.', category: 'Brain Games', icon: '🪜', color: '#90d4a9', tip: 'Every step must be a real word and change just one letter.' },
  { id: 'spot-difference', title: 'Spot the Difference', desc: 'Find the hidden mismatches between two little picture grids.', category: 'Brain Games', icon: '🔍', color: '#e8a4c7', tip: 'Tap the matching position on the right-hand grid.' },
  { id: 'golf-putt', title: 'Golf Putt', desc: 'Set your power and try to sink three putts.', category: 'Arcade', icon: '⛳', color: '#8ed6a9', tip: 'Match your swing power to the distance shown.' },
  { id: 'pinball', title: 'Pinball', desc: 'Keep the ball in play with well-timed flipper taps.', category: 'Arcade', icon: '🎱', color: '#c69aff', tip: 'Tap the flipper when the ball reaches the lower lane.' },
  { id: 'air-hockey', title: 'Air Hockey', desc: 'Tap the puck as it crosses the goal lane to score.', category: 'Arcade', icon: '🏒', color: '#7fd4e3', tip: 'Tap the puck only when it is close to the opponent’s goal.' },
  { id: 'tower-defense', title: 'Tower Defense', desc: 'Place towers, stop the creeps, and protect your base.', category: 'Strategy', icon: '🏰', color: '#b5a0e9', tip: 'Place towers along the path; they automatically attack nearby creeps.' },
  { id: 'penguin-slide', title: 'Penguin Slide', desc: 'Slide across the ice to collect fish and reach the exit.', category: 'Puzzle', icon: '🐧', color: '#a8d7e8', tip: 'You slide until a wall stops you, so plan each direction.' },
  { id: 'bottle-flip', title: 'Bottle Flip', desc: 'Flip the bottle and land it upright on the platform.', category: 'Arcade', icon: '🧴', color: '#86d2b2', tip: 'Tap near the top of the flip for the best landing chance.' },
  { id: 'word-search', title: 'Word Search', desc: 'Find the hidden word by selecting its letters in order.', category: 'Brain Games', icon: '🔎', color: '#83d7ca', tip: 'The target word runs across a row, forward or backward.' },
  { id: 'connect-dots', title: 'Connect the Dots', desc: 'Trace the numbered path in the right order without mistakes.', category: 'Puzzle', icon: '🔗', color: '#eba6bc', tip: 'Click each numbered dot from 1 through 10.' }
];

const grid = document.querySelector('#game-grid');
const overlay = document.querySelector('#game-overlay');
const content = document.querySelector('#playfield-content');
const statusLine = document.querySelector('#screen-status');
const searchInput = document.querySelector('#game-search');
let activeFilter = 'All';
let activeGame = null;
let gameScore = 0;
let elapsed = 0;
let elapsedHandle = null;
let gameHandles = [];
let gameCleanup = () => {};
let soundEnabled = localStorage.getItem('gz-muted') !== 'true';

function bestFor(id) { return Number(localStorage.getItem(`gz-best-${id}`) || 0); }
function setStatus(text) { statusLine.textContent = text; }
function scoreTo(value) {
  gameScore = Math.max(0, Math.floor(value));
  document.querySelector('#screen-score').textContent = gameScore.toLocaleString();
  if (activeGame && gameScore > bestFor(activeGame.id)) {
    localStorage.setItem(`gz-best-${activeGame.id}`, String(gameScore));
    document.querySelector('#screen-best').textContent = gameScore.toLocaleString();
  }
}
function addScore(value = 1) { scoreTo(gameScore + value); }
function formatTime(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }
function stopHandles() {
  gameHandles.forEach(handle => { clearInterval(handle); clearTimeout(handle); });
  gameHandles = [];
  if (elapsedHandle) clearInterval(elapsedHandle);
  elapsedHandle = null;
  gameCleanup();
  gameCleanup = () => {};
}
function interval(fn, delay) { const handle = setInterval(fn, delay); gameHandles.push(handle); return handle; }
function timeout(fn, delay) { const handle = setTimeout(fn, delay); gameHandles.push(handle); return handle; }
function startElapsed() {
  elapsed = 0;
  document.querySelector('#screen-timer').textContent = '00:00';
  elapsedHandle = setInterval(() => {
    elapsed += 1;
    document.querySelector('#screen-timer').textContent = formatTime(elapsed);
  }, 1000);
}
function countdown(seconds, onFinish) {
  if (elapsedHandle) clearInterval(elapsedHandle);
  elapsedHandle = null;
  let remaining = seconds;
  document.querySelector('#screen-timer').textContent = formatTime(remaining);
  document.querySelector('#timer-caption').textContent = 'Time remaining';
  const handle = interval(() => {
    remaining -= 1;
    document.querySelector('#screen-timer').textContent = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(handle);
      onFinish();
    }
  }, 1000);
  return () => clearInterval(handle);
}
function beep(freq = 540, duration = 0.07, type = 'sine') {
  if (!soundEnabled) return;
  try {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = type;
    oscillator.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
    oscillator.connect(gain); gain.connect(audio.destination);
    oscillator.start(); oscillator.stop(audio.currentTime + duration);
    oscillator.onended = () => audio.close();
  } catch { /* Audio is optional; the game remains playable without it. */ }
}
function syncSoundButtons() {
  document.querySelectorAll('.sound-toggle').forEach(button => {
    button.setAttribute('aria-label', soundEnabled ? 'Mute sound' : 'Unmute sound');
    button.title = soundEnabled ? 'Mute sound' : 'Unmute sound';
    button.querySelector('.sound-icon').textContent = soundEnabled ? '♪' : '♪̸';
    button.classList.toggle('muted', !soundEnabled);
  });
}
function registerHandleCleanup(fn) { gameCleanup = fn; }

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = games.filter(game => (activeFilter === 'All' || game.category === activeFilter) && `${game.title} ${game.desc} ${game.category}`.toLowerCase().includes(query));
  grid.innerHTML = visible.map((game, index) => `
    <article class="game-card" style="--card-color:${game.color};animation-delay:${Math.min(index * 28, 240)}ms">
      <div class="card-art"><span class="card-index">${String(games.indexOf(game) + 1).padStart(2, '0')}</span><span class="card-category">${game.category}</span><span class="card-icon" aria-hidden="true">${game.icon}</span></div>
      <div class="card-body"><div class="card-title-row"><h3 class="card-title">${game.title}</h3></div><p class="card-desc">${game.desc}</p><div class="card-bottom"><button class="play-button" type="button" data-play="${game.id}">Play now <span aria-hidden="true">→</span></button><span class="card-meta">FREE TO PLAY</span></div></div>
    </article>`).join('');
  document.querySelector('#result-count').textContent = visible.length;
  document.querySelector('.category-tab[data-filter="All"] span').textContent = games.length;
  document.querySelector('.hero-count').textContent = games.length;
  document.querySelector('#game-footer-count').textContent = games.length;
  document.querySelector('#empty-state').hidden = visible.length > 0;
}
function startGame(id) {
  const game = games.find(item => item.id === id);
  if (!game) return;
  stopHandles();
  activeGame = game;
  gameScore = 0;
  document.querySelector('#screen-title').textContent = game.title;
  document.querySelector('#screen-description').textContent = game.desc;
  document.querySelector('#screen-category').textContent = game.category.toUpperCase();
  document.querySelector('#screen-best').textContent = bestFor(game.id).toLocaleString();
  document.querySelector('#screen-score').textContent = '0';
  document.querySelector('#score-caption').textContent = 'Points this round';
  document.querySelector('#timer-caption').textContent = 'Time played';
  document.querySelector('#game-tip').textContent = game.tip;
  content.innerHTML = '';
  setStatus('Let’s play');
  startElapsed();
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  window.location.hash = `play-${game.id}`;
  initGame(game.id);
  syncSoundButtons();
}
function closeGame() {
  stopHandles();
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  activeGame = null;
  renderCards();
  if (window.location.hash.startsWith('#play-')) history.replaceState(null, '', '#games');
}
function restartGame() { if (activeGame) startGame(activeGame.id); }
function controlButton(text, callback, className = 'game-control') {
  const button = document.createElement('button');
  button.type = 'button'; button.className = className; button.textContent = text;
  button.addEventListener('click', callback);
  return button;
}
function mount(markup) { content.innerHTML = markup; return content; }
function initGame(id) {
  const initializers = {
    'tic-tac-toe': initTicTacToe, 'rock-paper-scissors': initRps, snake: initSnake,
    memory: initMemory, 'number-guess': initNumberGuess, hangman: initHangman,
    'whack-a-mole': initWhack, 'flappy-bird': initFlappy, pong: initPong,
    breakout: initBreakout, '2048': init2048, minesweeper: initMinesweeper,
    simon: initSimon, 'word-scramble': initScramble, 'math-quiz': initMathQuiz,
    'typing-test': initTyping, 'reaction-test': initReaction, 'connect-four': initConnectFour,
    sudoku: initSudoku, chess: initChess, 'pac-man': initExtraGame, clicker: initExtraGame,
    'space-invaders': initExtraGame, tetris: initExtraGame, 'lights-out': initExtraGame,
    wordle: initExtraGame, mastermind: initExtraGame, battleship: initExtraGame,
    reversi: initExtraGame, nim: initExtraGame, 'fifteen-puzzle': initExtraGame,
    'fruit-catcher': initExtraGame, 'maze-runner': initExtraGame, 'bubble-pop': initExtraGame,
    'number-sequence': initExtraGame, 'dino-dash': initExtraGame, 'color-match': initExtraGame,
    blackjack: initExtraGame, 'treasure-hunt': initExtraGame, 'quick-draw': initExtraGame,
    'trivia-quiz': initBonusGame, checkers: initBonusGame, 'typing-race': initBonusGame,
    'match-three': initBonusGame, 'color-flood': initBonusGame, 'color-lines': initBonusGame,
    'rocket-launch': initBonusGame, 'basketball-shot': initBonusGame, 'coin-flip': initBonusGame,
    'safe-cracker': initBonusGame, 'word-ladder': initBonusGame, 'spot-difference': initBonusGame,
    'golf-putt': initBonusGame, pinball: initBonusGame, 'air-hockey': initBonusGame,
    'tower-defense': initBonusGame, 'penguin-slide': initBonusGame, 'bottle-flip': initBonusGame,
    'word-search': initBonusGame, 'connect-dots': initBonusGame
  };
  initializers[id]();
}

function initTicTacToe() {
  let board = Array(9).fill(''); let turn = 'X'; let over = false;
  mount(`<div class="game-stack"><div class="game-message" id="ttt-message">Player X’s turn</div><div class="grid-board" id="ttt-board" style="grid-template-columns:repeat(3,76px);gap:8px"></div><div class="game-label">LOCAL TWO-PLAYER</div></div>`);
  const boardEl = document.querySelector('#ttt-board');
  const draw = () => { boardEl.innerHTML = ''; board.forEach((value, i) => { const cell = controlButton(value || ' ', () => play(i), 'board-cell'); cell.style.cssText = `width:76px;height:76px;font-size:30px;color:${value === 'X' ? '#b79aff' : '#72dfe1'}`; cell.disabled = !!value || over; boardEl.append(cell); }); };
  const play = index => {
    if (board[index] || over) return;
    board[index] = turn; beep(turn === 'X' ? 510 : 660);
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const winner = wins.find(line => line.every(cell => board[cell] === turn));
    if (winner) { over = true; scoreTo(1); setStatus(`${turn} wins`); document.querySelector('#ttt-message').textContent = `Player ${turn} wins!`; }
    else if (board.every(Boolean)) { over = true; document.querySelector('#ttt-message').textContent = 'A draw. Nice match!'; setStatus('Draw game'); }
    else { turn = turn === 'X' ? 'O' : 'X'; document.querySelector('#ttt-message').textContent = `Player ${turn}’s turn`; }
    draw();
  };
  draw();
}
function initRps() {
  const options = [{ name: 'Rock', icon: '✊' }, { name: 'Paper', icon: '✋' }, { name: 'Scissors', icon: '✌️' }];
  let wins = 0; let rounds = 0;
  mount(`<div class="game-stack"><div class="game-message" id="rps-result">Choose your move</div><div class="game-buttons" id="rps-buttons"></div><div class="game-label" id="rps-score">YOU 0　·　TIES 0　·　CPU 0</div></div>`);
  let cpuWins = 0; let ties = 0;
  options.forEach(option => document.querySelector('#rps-buttons').append(controlButton(`${option.icon} ${option.name}`, () => {
    const cpu = options[Math.floor(Math.random() * 3)]; rounds++;
    const won = option.name === cpu.name ? null : (option.name === 'Rock' && cpu.name === 'Scissors') || (option.name === 'Paper' && cpu.name === 'Rock') || (option.name === 'Scissors' && cpu.name === 'Paper');
    if (won) { wins++; addScore(); setStatus('Round won'); beep(720); } else if (won === false) { cpuWins++; setStatus('CPU takes the round'); beep(250, .1); } else { ties++; setStatus('Round tied'); }
    document.querySelector('#rps-result').textContent = `You: ${option.name}　·　CPU: ${cpu.name}　·　${won === null ? 'Tie!' : won ? 'You win!' : 'CPU wins!'}`;
    document.querySelector('#rps-score').textContent = `YOU ${wins}　·　TIES ${ties}　·　CPU ${cpuWins}`;
  })));
  document.querySelector('#score-caption').textContent = 'Rounds won';
}
function initSnake() {
  const size = 18, tile = 18, canvas = document.createElement('canvas'); canvas.width = canvas.height = size * tile; canvas.className = 'game-canvas'; canvas.setAttribute('aria-label', 'Snake game board');
  const stack = mount(`<div class="game-stack"><div class="game-message">Eat the glowing fruit. Don’t hit the edge or yourself.</div><div id="snake-canvas"></div><div class="touch-controls" aria-label="Snake controls"></div></div>`);
  document.querySelector('#snake-canvas').append(canvas);
  const ctx = canvas.getContext('2d'); const touch = document.querySelector('.touch-controls');
  let snake, direction, nextDirection, food, alive;
  function placeFood() { do { food = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) }; } while (snake.some(piece => piece.x === food.x && piece.y === food.y)); }
  function draw() {
    ctx.fillStyle = '#10121b'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#6ce4b2'; ctx.shadowColor = '#6ce4b2'; ctx.shadowBlur = 12; ctx.fillRect(food.x * tile + 4, food.y * tile + 4, tile - 8, tile - 8); ctx.shadowBlur = 0;
    snake.forEach((piece, i) => { ctx.fillStyle = i ? '#49b992' : '#a9f1c8'; ctx.fillRect(piece.x * tile + 1, piece.y * tile + 1, tile - 2, tile - 2); });
  }
  function move(dir) { if ((dir.x !== -direction.x || dir.y !== -direction.y) && alive) nextDirection = dir; }
  function tick() {
    direction = nextDirection; const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x < 0 || head.y < 0 || head.x >= size || head.y >= size || snake.some(part => part.x === head.x && part.y === head.y)) { alive = false; setStatus('Game over'); document.querySelector('.game-message').textContent = `Game over! You ate ${gameScore} fruit${gameScore === 1 ? '' : 's'}.`; beep(190, .16); return; }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) { addScore(); placeFood(); beep(680); } else snake.pop();
    draw();
  }
  const dirs = [{ label: '↑', x: 0, y: -1 }, { label: '←', x: -1, y: 0 }, { label: '↓', x: 0, y: 1 }, { label: '→', x: 1, y: 0 }];
  dirs.forEach(dir => touch.append(controlButton(dir.label, () => move({ x: dir.x, y: dir.y }))));
  const keyHandler = event => { const map = { ArrowUp: dirs[0], w: dirs[0], ArrowLeft: dirs[1], a: dirs[1], ArrowDown: dirs[2], s: dirs[2], ArrowRight: dirs[3], d: dirs[3] }; if (map[event.key]) { event.preventDefault(); move({ x: map[event.key].x, y: map[event.key].y }); } };
  window.addEventListener('keydown', keyHandler); registerHandleCleanup(() => window.removeEventListener('keydown', keyHandler));
  snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }]; direction = { x: 1, y: 0 }; nextDirection = direction; alive = true; placeFood(); draw(); interval(() => { if (alive) tick(); }, 115);
}
function initMemory() {
  const symbols = ['🍋','🚀','🍉','🎧','🌈','🪐','🍄','🦋']; let deck = [...symbols, ...symbols].sort(() => Math.random() - .5);
  let first = null, lock = false, matched = 0, moves = 0;
  mount(`<div class="game-stack"><div class="game-message" id="memory-message">Find all 8 pairs</div><div class="grid-board" id="memory-board" style="grid-template-columns:repeat(4,58px)"></div><div class="game-label" id="memory-moves">MOVES 0</div></div>`);
  const board = document.querySelector('#memory-board');
  deck.forEach((symbol, index) => {
    const card = controlButton('?', () => {
      if (lock || card.disabled || card === first) return;
      card.textContent = symbol; card.style.background = '#383048'; card.dataset.open = 'true'; beep(500);
      if (!first) { first = card; return; }
      moves++; document.querySelector('#memory-moves').textContent = `MOVES ${moves}`;
      if (first.textContent === card.textContent) {
        first.disabled = card.disabled = true; first.style.color = card.style.color = '#7ce4c5'; matched += 2; first = null; scoreTo(matched / 2);
        if (matched === deck.length) { setStatus('All pairs found'); document.querySelector('#memory-message').textContent = `All matched in ${moves} moves!`; }
      } else {
        lock = true; const old = first; timeout(() => { old.textContent = card.textContent = '?'; old.style.background = card.style.background = ''; delete old.dataset.open; delete card.dataset.open; first = null; lock = false; }, 700);
      }
    }, 'board-cell');
    card.style.cssText = 'width:58px;height:64px;font-size:22px;border-radius:4px'; card.setAttribute('aria-label', `Memory card ${index + 1}`); board.append(card);
  });
  document.querySelector('#score-caption').textContent = 'Pairs matched';
}
function initNumberGuess() {
  const target = Math.floor(Math.random() * 100) + 1; let attempts = 0; let finished = false;
  mount(`<div class="game-stack"><div class="game-message" id="guess-message">I’m thinking of a number from 1 to 100.</div><form class="game-buttons" id="guess-form"><input class="game-input" id="guess-input" type="number" min="1" max="100" placeholder="Your guess" required><button class="game-control">Guess</button></form><div class="game-label" id="guess-attempts">10 GUESSES LEFT</div></div>`);
  document.querySelector('#guess-input').focus();
  document.querySelector('#guess-form').addEventListener('submit', event => {
    event.preventDefault(); if (finished) return;
    const value = Number(document.querySelector('#guess-input').value); if (!Number.isInteger(value) || value < 1 || value > 100) return;
    attempts++; const remaining = 10 - attempts; const msg = document.querySelector('#guess-message');
    if (value === target) { finished = true; const points = Math.max(1, 11 - attempts); scoreTo(points); setStatus('Number found'); msg.textContent = `You got it! ${target} was the number.`; }
    else if (attempts >= 10) { finished = true; setStatus('Out of guesses'); msg.textContent = `Out of guesses. The number was ${target}.`; }
    else msg.textContent = `${value < target ? 'Go higher' : 'Go lower'} — ${remaining} guesses left.`;
    document.querySelector('#guess-attempts').textContent = `${Math.max(remaining, 0)} GUESSES LEFT`;
    document.querySelector('#guess-input').value = ''; document.querySelector('#guess-input').focus();
  });
}
function initHangman() {
  const words = ['KEYBOARD','GALAXY','PUZZLE','ARCADE','PLANET','RAINBOW','PIXEL','CHALLENGE']; const word = words[Math.floor(Math.random() * words.length)]; let guessed = new Set(); let misses = 0; const max = 6;
  mount(`<div class="game-stack"><div class="game-message" id="hangman-status">Guess the word</div><div id="hangman-drawing" style="font:22px var(--mono);color:#bfabff;letter-spacing:5px;text-align:center;min-height:32px"></div><div id="hangman-word" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"></div><div class="game-buttons" id="hangman-letters" style="max-width:390px"></div></div>`);
  const drawWord = () => { document.querySelector('#hangman-word').innerHTML = [...word].map(letter => `<span style="width:23px;border-bottom:1px solid #9992aa;text-align:center;padding-bottom:5px;font:16px var(--mono);color:#fff">${guessed.has(letter) ? letter : '&nbsp;'}</span>`).join(''); document.querySelector('#hangman-drawing').textContent = `WRONG ${misses}/${max}`; };
  const letters = document.querySelector('#hangman-letters');
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => letters.append(controlButton(letter, () => {
    const btn = [...letters.children].find(item => item.textContent === letter); if (btn.disabled) return;
    btn.disabled = true; guessed.add(letter);
    if (!word.includes(letter)) misses++;
    drawWord();
    if ([...word].every(char => guessed.has(char))) { scoreTo(max - misses + 1); setStatus('Word solved'); document.querySelector('#hangman-status').textContent = `Solved! The word was ${word}.`; [...letters.children].forEach(item => { item.disabled = true; }); beep(760); }
    else if (misses >= max) { setStatus('Round over'); document.querySelector('#hangman-status').textContent = `The word was ${word}. Try again!`; [...letters.children].forEach(item => { item.disabled = true; }); }
  }, 'game-control')));
  drawWord();
}
function initWhack() {
  let active = -1, playing = true;
  mount(`<div class="game-stack"><div class="game-message" id="whack-message">Tap the mole. You have 30 seconds!</div><div class="grid-board" id="mole-board" style="grid-template-columns:repeat(3,76px);gap:9px"></div><div class="game-label">QUICK EYES, QUICK HANDS</div></div>`);
  const board = document.querySelector('#mole-board');
  const holes = Array.from({ length: 9 }, (_, i) => { const cell = controlButton('·', () => { if (!playing || i !== active) return; addScore(); beep(740); choose(); }, 'board-cell'); cell.style.cssText = 'width:76px;height:76px;border-radius:50%;font-size:30px;color:#887994;background:#17151e'; board.append(cell); return cell; });
  function choose() { holes.forEach(hole => { hole.textContent = '·'; hole.style.background = '#17151e'; }); active = Math.floor(Math.random() * holes.length); holes[active].textContent = '🐹'; holes[active].style.background = '#363049'; }
  choose(); const stopCountdown = countdown(30, () => { playing = false; active = -1; holes.forEach(hole => { hole.disabled = true; }); document.querySelector('#whack-message').textContent = `Time! You caught ${gameScore} moles.`; setStatus('Time is up'); });
  interval(() => { if (playing) choose(); }, 700);
  registerHandleCleanup(() => stopCountdown()); document.querySelector('#score-caption').textContent = 'Moles caught';
}
function initFlappy() {
  const canvas = document.createElement('canvas'); canvas.width = 480; canvas.height = 300; canvas.className = 'game-canvas'; canvas.setAttribute('aria-label', 'Flappy Bird game');
  mount(`<div class="game-stack"><div class="game-message">Click, tap, or press Space to flap</div><div id="flappy-holder"></div><div class="game-label">SPACE / TAP TO FLY</div></div>`); document.querySelector('#flappy-holder').append(canvas);
  const ctx = canvas.getContext('2d'); let birdY = 145, velocity = 0, pipes = [], frame = 0, alive = true, started = false;
  function addPipe() {
    const gap = 108 + Math.random() * 40;
    const top = 36 + Math.random() * (260 - gap - 36);
    pipes.push({ x: canvas.width + 10, top, gap, passed: false });
  }
  addPipe();
  function flap() { if (!alive) return; started = true; velocity = -5.8; beep(540, .045); }
  const clickHandler = () => flap(); canvas.addEventListener('pointerdown', clickHandler);
  const keyHandler = event => { if (event.code === 'Space') { event.preventDefault(); flap(); } }; window.addEventListener('keydown', keyHandler);
  registerHandleCleanup(() => { canvas.removeEventListener('pointerdown', clickHandler); window.removeEventListener('keydown', keyHandler); });
  function end() { alive = false; setStatus('Flight over'); document.querySelector('.game-message').textContent = `Flight over. You passed ${gameScore} pipe${gameScore === 1 ? '' : 's'}. Tap restart to fly again.`; }
  function draw() {
    ctx.fillStyle = '#121a2a'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(147,154,207,.12)'; for (let i = 0; i < 9; i++) ctx.fillRect((i * 61 + 17) % canvas.width, (i * 37 + 25) % 115, 2, 2);
    ctx.fillStyle = '#27243a'; ctx.fillRect(0, 272, canvas.width, 28); ctx.fillStyle = '#8b77ab'; ctx.fillRect(0, 271, canvas.width, 2);
    pipes.forEach(pipe => { ctx.fillStyle = '#69d3ae'; ctx.fillRect(pipe.x, 0, 43, pipe.top); ctx.fillRect(pipe.x, pipe.top + pipe.gap, 43, 272 - pipe.top - pipe.gap); ctx.fillStyle = '#469f84'; ctx.fillRect(pipe.x - 4, pipe.top - 9, 51, 9); ctx.fillRect(pipe.x - 4, pipe.top + pipe.gap, 51, 9); });
    ctx.fillStyle = '#ffdb76'; ctx.beginPath(); ctx.arc(93, birdY, 11, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#30202a'; ctx.beginPath(); ctx.arc(97, birdY - 2, 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ff9b72'; ctx.fillRect(101, birdY, 9, 4);
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.font = '12px monospace'; ctx.fillText(`SCORE ${gameScore}`, 14, 21);
  }
  const handle = interval(() => {
    if (!alive) return;
    frame++; if (started) { velocity += .28; birdY += velocity; pipes.forEach(pipe => pipe.x -= 2.3); if (frame % 110 === 0) addPipe(); pipes = pipes.filter(pipe => pipe.x > -55); }
    for (const pipe of pipes) {
      if (pipe.x < 104 && pipe.x + 43 > 82 && (birdY - 10 < pipe.top || birdY + 10 > pipe.top + pipe.gap)) end();
      if (!pipe.passed && pipe.x + 43 < 82) { pipe.passed = true; addScore(); beep(680); }
    }
    if (birdY > 264 || birdY < 7) end(); draw();
  }, 30);
  registerHandleCleanup(() => { clearInterval(handle); canvas.removeEventListener('pointerdown', clickHandler); window.removeEventListener('keydown', keyHandler); }); draw();
}
function initPong() {
  const canvas = document.createElement('canvas'); canvas.width = 520; canvas.height = 320; canvas.className = 'game-canvas'; canvas.setAttribute('aria-label', 'Pong game');
  mount(`<div class="game-stack"><div class="game-message" id="pong-message">First to 5 wins. Move with W/S or ↑/↓.</div><div id="pong-holder"></div><div class="touch-controls"><button data-paddle="up">↑</button><button data-paddle="down">↓</button></div></div>`); document.querySelector('#pong-holder').append(canvas);
  const ctx = canvas.getContext('2d'); let py = 120, cy = 120, bx = 260, by = 160, vx = 3.2, vy = 2, player = 0, cpu = 0, keys = new Set(), done = false;
  function draw() { ctx.fillStyle = '#11131d'; ctx.fillRect(0, 0, 520, 320); ctx.setLineDash([6,8]); ctx.strokeStyle = '#454157'; ctx.beginPath(); ctx.moveTo(260, 0); ctx.lineTo(260, 320); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#a894ff'; ctx.fillRect(17, py, 9, 68); ctx.fillStyle = '#70e0df'; ctx.fillRect(494, cy, 9, 68); ctx.fillStyle = '#f4efff'; ctx.fillRect(bx - 6, by - 6, 12, 12); ctx.font = '24px monospace'; ctx.fillStyle = '#d6c6ff'; ctx.fillText(player, 218, 34); ctx.fillStyle = '#72dfe1'; ctx.fillText(cpu, 285, 34); }
  const keydown = event => { keys.add(event.key.toLowerCase()); if (['ArrowUp','ArrowDown'].includes(event.key)) event.preventDefault(); };
  const keyup = event => keys.delete(event.key.toLowerCase()); window.addEventListener('keydown', keydown); window.addEventListener('keyup', keyup);
  document.querySelectorAll('[data-paddle]').forEach(button => { button.addEventListener('pointerdown', () => keys.add(button.dataset.paddle)); button.addEventListener('pointerup', () => keys.delete(button.dataset.paddle)); button.addEventListener('pointerleave', () => keys.delete(button.dataset.paddle)); });
  registerHandleCleanup(() => { window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup); });
  interval(() => {
    if (done) return;
    if (keys.has('w') || keys.has('arrowup') || keys.has('up')) py = Math.max(0, py - 5);
    if (keys.has('s') || keys.has('arrowdown') || keys.has('down')) py = Math.min(252, py + 5);
    cy += (by - (cy + 34)) * .075; cy = Math.max(0, Math.min(252, cy)); bx += vx; by += vy;
    if (by < 6 || by > 314) vy *= -1;
    if (bx < 31 && by > py - 4 && by < py + 72) { vx = Math.abs(vx) * 1.04; vy += (by - (py + 34)) * .08; beep(550); }
    if (bx > 489 && by > cy - 4 && by < cy + 72) { vx = -Math.abs(vx) * 1.04; vy += (by - (cy + 34)) * .08; beep(550); }
    if (bx < 0 || bx > 520) { if (bx < 0) cpu++; else { player++; addScore(); } setStatus(`${player} - ${cpu}`); bx = 260; by = 160; vx = player > cpu ? -3.2 : 3.2; vy = Math.random() < .5 ? 2 : -2; }
    if (player >= 5 || cpu >= 5) { done = true; setStatus(player >= 5 ? 'You win' : 'Computer wins'); document.querySelector('#pong-message').textContent = player >= 5 ? 'You win the match! Restart for another rally.' : 'The computer takes this match. Give it another go!'; }
    draw();
  }, 20); draw(); document.querySelector('#score-caption').textContent = 'Points scored';
}
function initBreakout() {
  const canvas = document.createElement('canvas'); canvas.width = 520; canvas.height = 340; canvas.className = 'game-canvas'; canvas.setAttribute('aria-label', 'Breakout game');
  mount(`<div class="game-stack"><div class="game-message" id="breakout-message">Clear the bricks. Move the paddle to bounce the ball.</div><div id="breakout-holder"></div><div class="game-label">MOUSE / TOUCH / ← →</div></div>`); document.querySelector('#breakout-holder').append(canvas);
  const ctx = canvas.getContext('2d'); const colors = ['#d997ff','#8d91ff','#71d9e3','#74dfb4','#f3c874']; let bricks, ball, paddle, alive = true, won = false, keys = new Set();
  function resetBall() { ball = { x: 260, y: 260, vx: 3, vy: -3 }; paddle = 218; }
  function resetBricks() { bricks = Array.from({ length: 5 }, (_, row) => Array.from({ length: 9 }, (_, col) => ({ x: 22 + col * 53, y: 32 + row * 22, live: true, color: colors[row] }))); }
  function draw() { ctx.fillStyle = '#11131d'; ctx.fillRect(0, 0, 520, 340); bricks.flat().forEach(b => { if (b.live) { ctx.fillStyle = b.color; ctx.fillRect(b.x, b.y, 47, 13); } }); ctx.fillStyle = '#ad98ff'; ctx.fillRect(paddle, 312, 84, 9); ctx.fillStyle = '#e4def5'; ctx.beginPath(); ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2); ctx.fill(); }
  resetBricks(); resetBall();
  const pointer = event => { const rect = canvas.getBoundingClientRect(); paddle = Math.max(0, Math.min(436, (event.clientX - rect.left) / rect.width * 520 - 42)); };
  const down = event => { keys.add(event.key); if (['ArrowLeft','ArrowRight'].includes(event.key)) event.preventDefault(); }; const up = event => keys.delete(event.key);
  canvas.addEventListener('pointermove', pointer); canvas.addEventListener('pointerdown', pointer); window.addEventListener('keydown', down); window.addEventListener('keyup', up);
  registerHandleCleanup(() => { canvas.removeEventListener('pointermove', pointer); canvas.removeEventListener('pointerdown', pointer); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); });
  interval(() => {
    if (!alive || won) return;
    if (keys.has('ArrowLeft')) paddle = Math.max(0, paddle - 6); if (keys.has('ArrowRight')) paddle = Math.min(436, paddle + 6);
    ball.x += ball.vx; ball.y += ball.vy;
    if (ball.x < 6 || ball.x > 514) ball.vx *= -1; if (ball.y < 6) ball.vy *= -1;
    if (ball.y > 303 && ball.y < 326 && ball.x > paddle - 5 && ball.x < paddle + 89) { ball.vy = -Math.abs(ball.vy); ball.vx = (ball.x - (paddle + 42)) * .09; beep(460); }
    if (ball.y > 340) { alive = false; setStatus('Ball lost'); document.querySelector('#breakout-message').textContent = `Ball lost. You cleared ${gameScore} bricks.`; }
    for (const brick of bricks.flat()) if (brick.live && ball.x > brick.x - 6 && ball.x < brick.x + 53 && ball.y > brick.y - 6 && ball.y < brick.y + 19) { brick.live = false; ball.vy *= -1; addScore(); beep(620); break; }
    if (bricks.flat().every(brick => !brick.live)) { won = true; setStatus('Wall cleared'); document.querySelector('#breakout-message').textContent = 'Wall cleared! Nice control.'; }
    draw();
  }, 16); draw(); document.querySelector('#score-caption').textContent = 'Bricks cleared';
}
function init2048() {
  let board = Array.from({ length: 4 }, () => Array(4).fill(0)); let over = false; let won = false;
  mount(`<div class="game-stack"><div class="game-message" id="tile-message">Join the tiles and make 2048.</div><div class="grid-board" id="tile-board" style="grid-template-columns:repeat(4,64px);padding:7px;background:#282431;border-radius:5px;gap:6px"></div><div class="touch-controls" id="tile-controls"><button data-move="up">↑</button><button data-move="left">←</button><button data-move="down">↓</button><button data-move="right">→</button></div></div>`);
  const boardEl = document.querySelector('#tile-board');
  function spawn() { const empty = []; board.forEach((row, y) => row.forEach((value, x) => { if (!value) empty.push([y, x]); })); if (empty.length) { const [y, x] = empty[Math.floor(Math.random() * empty.length)]; board[y][x] = Math.random() < .9 ? 2 : 4; } }
  function draw() { boardEl.innerHTML = ''; board.flat().forEach(value => { const cell = document.createElement('div'); cell.className = 'board-cell'; cell.style.cssText = `width:64px;height:64px;border:0;border-radius:4px;font-size:${value > 512 ? 17 : 21}px;font-weight:700;background:${value ? `hsl(${35 + Math.log2(value) * 19} 63% ${Math.min(67, 25 + Math.log2(value) * 5)}%)` : '#34313c'};color:${value > 4 ? '#19151c' : '#faf7f0'};cursor:default`; cell.textContent = value || ''; boardEl.append(cell); }); }
  function slide(row) { const values = row.filter(Boolean); for (let i = 0; i < values.length - 1; i++) if (values[i] === values[i + 1]) { values[i] *= 2; values.splice(i + 1, 1); addScore(values[i]); if (values[i] === 2048 && !won) { won = true; setStatus('2048 reached!'); document.querySelector('#tile-message').textContent = 'You made 2048! Keep going or restart.'; } } while (values.length < 4) values.push(0); return values; }
  function move(dir) {
    if (over) return; const old = JSON.stringify(board);
    for (let i = 0; i < 4; i++) {
      let row = dir === 'left' || dir === 'right' ? [...board[i]] : board.map(line => line[i]); if (dir === 'right' || dir === 'down') row.reverse(); row = slide(row); if (dir === 'right' || dir === 'down') row.reverse();
      for (let j = 0; j < 4; j++) { if (dir === 'left' || dir === 'right') board[i][j] = row[j]; else board[j][i] = row[j]; }
    }
    if (old !== JSON.stringify(board)) { spawn(); draw(); beep(430); if (board.flat().every(Boolean) && !board.some((row, y) => row.some((value, x) => (x < 3 && value === row[x + 1]) || (y < 3 && value === board[y + 1][x])))) { over = true; setStatus('No more moves'); document.querySelector('#tile-message').textContent = 'No moves left. Restart to try again.'; } }
  }
  const keyHandler = event => { const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }; if (map[event.key]) { event.preventDefault(); move(map[event.key]); } };
  window.addEventListener('keydown', keyHandler); registerHandleCleanup(() => window.removeEventListener('keydown', keyHandler));
  document.querySelectorAll('#tile-controls button').forEach(button => button.addEventListener('click', () => move(button.dataset.move)));
  board[1][1] = 2; spawn(); draw(); document.querySelector('#score-caption').textContent = 'Tile points';
}
function initMinesweeper() {
  const n = 9, count = 10; let cells, revealed = new Set(), flags = new Set(), ended = false, flagMode = false;
  mount(`<div class="game-stack"><div class="game-message" id="mine-message">Find all safe squares. Flag mode: <button id="flag-toggle" class="game-control" style="padding:4px 8px">Off</button></div><div class="grid-board" id="mine-board" style="grid-template-columns:repeat(9,34px);gap:2px"></div><div class="game-label">${count} MINES IN THE FIELD</div></div>`);
  cells = Array.from({ length: n * n }, (_, index) => ({ mine: false, number: 0, index }));
  let planted = 0; while (planted < count) { const index = Math.floor(Math.random() * cells.length); if (!cells[index].mine) { cells[index].mine = true; planted++; } }
  cells.forEach(cell => { if (cell.mine) return; const x = cell.index % n, y = Math.floor(cell.index / n); cell.number = around(x, y).filter(i => cells[i].mine).length; });
  function around(x, y) { const out = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const nx = x + dx, ny = y + dy; if ((dx || dy) && nx >= 0 && nx < n && ny >= 0 && ny < n) out.push(ny * n + nx); } return out; }
  const board = document.querySelector('#mine-board');
  const squares = cells.map(cell => { const btn = controlButton('', () => click(cell.index), 'board-cell'); btn.style.cssText = 'width:34px;height:34px;font-size:13px;border-radius:2px'; board.append(btn); return btn; });
  document.querySelector('#flag-toggle').addEventListener('click', event => { flagMode = !flagMode; event.currentTarget.textContent = flagMode ? 'On' : 'Off'; event.currentTarget.style.borderColor = flagMode ? '#e69c6d' : ''; });
  function reveal(index) { if (revealed.has(index) || flags.has(index) || ended) return; revealed.add(index); const cell = cells[index], btn = squares[index]; btn.disabled = true; btn.style.background = '#373341'; if (cell.mine) { btn.textContent = '✹'; btn.style.color = '#ff797f'; end(false); return; } if (cell.number) { btn.textContent = cell.number; btn.style.color = ['','#6edbe0','#79dfa6','#fdad7e','#c5a1ff','#f17d90'][cell.number] || '#f4d276'; } else around(index % n, Math.floor(index / n)).forEach(reveal); }
  function click(index) { if (ended) return; if (flagMode) { if (revealed.has(index)) return; if (flags.has(index)) { flags.delete(index); squares[index].textContent = ''; } else { flags.add(index); squares[index].textContent = '⚑'; squares[index].style.color = '#ffb56e'; } return; } reveal(index); if (revealed.size === n * n - count) end(true); }
  function end(win) { if (ended) return; ended = true; cells.forEach((cell, index) => { if (cell.mine) { squares[index].textContent = '✹'; squares[index].style.color = '#ff797f'; } }); if (win) { scoreTo(1); setStatus('Field cleared'); document.querySelector('#mine-message').textContent = 'Every safe square found. Nicely done!'; } else { setStatus('Mine hit'); document.querySelector('#mine-message').textContent = 'Boom. Start a fresh field and try again.'; beep(180, .15); } }
}
function initSimon() {
  let sequence = [], inputIndex = 0, accepting = false, round = 0;
  mount(`<div class="game-stack"><div class="game-message" id="simon-message">Watch the pattern, then repeat it.</div><div id="simon-board" style="display:grid;grid-template-columns:repeat(2,100px);gap:8px"></div><button class="game-control" id="simon-start">Start sequence</button></div>`);
  const colors = [{ name: 'mint', sound: 400, color: '#57c99b' }, { name: 'pink', sound: 510, color: '#ed74a9' }, { name: 'blue', sound: 610, color: '#6aa6ed' }, { name: 'gold', sound: 730, color: '#edc15c' }];
  const board = document.querySelector('#simon-board');
  colors.forEach((color, i) => { const pad = controlButton('', () => press(i), 'board-cell'); pad.dataset.pad = i; pad.style.cssText = `width:100px;height:100px;border-radius:8px;background:${color.color};opacity:.58`; board.append(pad); });
  function flash(index) { const pad = board.children[index]; pad.style.opacity = '1'; beep(colors[index].sound, .13, 'triangle'); timeout(() => { pad.style.opacity = '.58'; }, 260); }
  function playSequence() { accepting = false; inputIndex = 0; let i = 0; const tick = () => { if (i >= sequence.length) { accepting = true; document.querySelector('#simon-message').textContent = 'Your turn. Repeat the pattern.'; return; } flash(sequence[i++]); timeout(tick, 550); }; timeout(tick, 500); }
  function press(index) { if (!accepting) return; flash(index); if (sequence[inputIndex] !== index) { accepting = false; setStatus('Sequence ended'); document.querySelector('#simon-message').textContent = `Not quite! You reached round ${round}.`; return; } inputIndex++; if (inputIndex === sequence.length) { accepting = false; round++; scoreTo(round); setStatus(`Round ${round} cleared`); document.querySelector('#simon-message').textContent = 'Correct! Next pattern…'; timeout(() => { sequence.push(Math.floor(Math.random() * 4)); playSequence(); }, 700); } }
  document.querySelector('#simon-start').addEventListener('click', event => { event.currentTarget.disabled = true; sequence = [Math.floor(Math.random() * 4)]; round = 0; playSequence(); });
}
function initScramble() {
  const words = ['ARCADE','GALAXY','PUZZLE','PLANET','KEYBOARD','RAINBOW','PIXEL','CHALLENGE','MEMORY','STRATEGY']; let index = 0, solved = 0, timeLeft = 60;
  mount(`<div class="game-stack"><div class="game-message" id="scramble-message">Unscramble as many words as you can.</div><div id="scramble-letters" style="font-size:28px;font-weight:800;letter-spacing:7px;color:#bda4ff"></div><form class="game-buttons" id="scramble-form"><input id="scramble-input" class="game-input" autocomplete="off" placeholder="Type the word" required><button class="game-control">Check</button></form><div class="game-label" id="scramble-progress">WORD 1 / ${words.length}</div></div>`);
  const scrambled = word => { let letters = word.split(''); for (let i = letters.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [letters[i], letters[j]] = [letters[j], letters[i]]; } if (letters.join('') === word) letters.reverse(); return letters.join(''); };
  let current = words[index]; const draw = () => { document.querySelector('#scramble-letters').textContent = scrambled(current); document.querySelector('#scramble-progress').textContent = `WORD ${Math.min(index + 1, words.length)} / ${words.length}　·　${timeLeft}s`; };
  const stop = countdown(60, finish); registerHandleCleanup(() => stop());
  interval(() => { if (timeLeft > 0) timeLeft--; document.querySelector('#scramble-progress').textContent = `WORD ${Math.min(index + 1, words.length)} / ${words.length}　·　${timeLeft}s`; }, 1000);
  function finish() { document.querySelector('#scramble-form button').disabled = true; document.querySelector('#scramble-input').disabled = true; setStatus('Time is up'); document.querySelector('#scramble-message').textContent = `Time! You solved ${solved} word${solved === 1 ? '' : 's'}.`; }
  document.querySelector('#scramble-form').addEventListener('submit', event => { event.preventDefault(); if (document.querySelector('#scramble-input').disabled) return; const answer = document.querySelector('#scramble-input').value.trim().toUpperCase(); if (answer === current) { solved++; addScore(); beep(720); document.querySelector('#scramble-message').textContent = 'That’s right! Next one…'; index = (index + 1) % words.length; current = words[index]; draw(); } else { document.querySelector('#scramble-message').textContent = 'Not quite. Give it another try.'; beep(240, .08); } document.querySelector('#scramble-input').value = ''; });
  draw(); document.querySelector('#score-caption').textContent = 'Words solved';
}
function initMathQuiz() {
  let correct = 0, question = 0, answer = 0, locked = false;
  mount(`<div class="game-stack"><div class="game-message" id="math-message">45 seconds. Solve as many as you can!</div><div id="math-question" style="font-size:38px;font-weight:800;letter-spacing:-1px;color:#d4c2ff"></div><form class="game-buttons" id="math-form"><input class="game-input" id="math-answer" type="number" placeholder="Answer" required><button class="game-control">Submit</button></form><div class="game-label" id="math-count">QUESTION 0</div></div>`);
  function newQuestion() { question++; const a = Math.floor(Math.random() * 12) + 2, b = Math.floor(Math.random() * 12) + 2; const operation = ['+', '−', '×'][Math.floor(Math.random() * 3)]; answer = operation === '+' ? a + b : operation === '−' ? Math.abs(a - b) : a * b; document.querySelector('#math-question').textContent = `${a} ${operation} ${b} = ?`; document.querySelector('#math-count').textContent = `QUESTION ${question}`; document.querySelector('#math-answer').value = ''; document.querySelector('#math-answer').focus(); }
  const stop = countdown(45, () => { locked = true; document.querySelector('#math-form button').disabled = true; document.querySelector('#math-answer').disabled = true; setStatus('Time is up'); document.querySelector('#math-message').textContent = `Time! ${correct} correct answer${correct === 1 ? '' : 's'}.`; }); registerHandleCleanup(() => stop());
  document.querySelector('#math-form').addEventListener('submit', event => { event.preventDefault(); if (locked) return; if (Number(document.querySelector('#math-answer').value) === answer) { correct++; addScore(); setStatus('Correct'); beep(700); document.querySelector('#math-message').textContent = 'Correct. Keep going!'; } else { setStatus('Try the next one'); document.querySelector('#math-message').textContent = `Not quite. The answer was ${answer}.`; } newQuestion(); });
  newQuestion(); document.querySelector('#score-caption').textContent = 'Correct answers';
}
function initTyping() {
  const bank = 'quick bright planets travel through distant skies while curious minds find new worlds and clever ideas'.split(' '); let typed = 0, correct = 0, current = '', active = true;
  mount(`<div class="game-stack"><div class="game-message" id="typing-message">Type each word, then press Space. 30 seconds!</div><div id="typing-word" style="font-size:35px;font-weight:800;color:#d5c1ff;letter-spacing:1px"></div><input class="game-input" id="typing-input" autocomplete="off" placeholder="Start typing..." aria-label="Type the displayed word"><div class="game-label" id="typing-stats">ACCURACY 100%　·　WPM 0</div></div>`);
  const input = document.querySelector('#typing-input');
  function next() { current = bank[Math.floor(Math.random() * bank.length)]; document.querySelector('#typing-word').textContent = current; input.value = ''; }
  const startedAt = Date.now(); next(); input.focus();
  input.addEventListener('input', () => { if (!active) return; if (input.value.endsWith(' ')) { const value = input.value.trim(); typed += value.length; if (value === current) { correct += current.length; addScore(current.length); beep(620, .04); } next(); } });
  const stop = countdown(30, () => { active = false; input.disabled = true; const accuracy = typed ? Math.round(correct / typed * 100) : 0; const wpm = Math.round(correct / 5 / ((Date.now() - startedAt) / 60000)); setStatus('Test complete'); document.querySelector('#typing-message').textContent = `Time! ${wpm} WPM at ${accuracy}% accuracy.`; document.querySelector('#typing-stats').textContent = `ACCURACY ${accuracy}%　·　WPM ${wpm}`; }); registerHandleCleanup(() => stop());
  document.querySelector('#score-caption').textContent = 'Characters typed correctly';
}
function initReaction() {
  let phase = 'ready', trigger = null, startedAt = 0, times = [];
  mount(`<div class="game-stack"><button class="board-cell" id="reaction-pad" type="button" style="width:min(100%,360px);height:190px;border-radius:6px;background:#292638;color:#eee;font-size:18px;font-weight:700">Click to start</button><div class="game-message" id="reaction-message">Wait for the color to turn green</div><div class="game-label" id="reaction-average">BEST OF 5</div></div>`);
  const pad = document.querySelector('#reaction-pad');
  pad.addEventListener('click', () => {
    if (phase === 'ready' || phase === 'result') { phase = 'waiting'; pad.style.background = '#a34858'; pad.textContent = 'Wait for green…'; document.querySelector('#reaction-message').textContent = 'Do not click yet!'; trigger = timeout(() => { phase = 'go'; startedAt = performance.now(); pad.style.background = '#2c9b73'; pad.textContent = 'CLICK NOW'; document.querySelector('#reaction-message').textContent = 'Now!'; beep(810, .1); }, 1000 + Math.random() * 2400); }
    else if (phase === 'waiting') { clearTimeout(trigger); phase = 'result'; pad.style.background = '#50434c'; pad.textContent = 'Too soon! Click to try again'; document.querySelector('#reaction-message').textContent = 'False start. Wait for green next time.'; setStatus('False start'); }
    else if (phase === 'go') { const ms = Math.round(performance.now() - startedAt); times.push(ms); gameScore = Math.min(...times); document.querySelector('#screen-score').textContent = String(gameScore); const previous = bestFor(activeGame.id); if (!previous || gameScore < previous) { localStorage.setItem(`gz-best-${activeGame.id}`, String(gameScore)); document.querySelector('#screen-best').textContent = String(gameScore); } phase = 'result'; pad.style.background = '#292638'; pad.textContent = `${ms} ms — click to go again`; document.querySelector('#reaction-message').textContent = times.length >= 5 ? `Average: ${Math.round(times.reduce((a, b) => a + b, 0) / times.length)} ms` : `${5 - times.length} more ${times.length === 4 ? 'try' : 'tries'} for your average`; document.querySelector('#reaction-average').textContent = `ATTEMPT ${Math.min(times.length, 5)} / 5`; setStatus(`${ms} ms reaction`); beep(700); }
  });
  document.querySelector('#score-caption').textContent = 'Best reaction time (ms)';
  scoreTo(0);
  registerHandleCleanup(() => { if (trigger) clearTimeout(trigger); });
}
function initConnectFour() {
  const cols = 7, rows = 6; let board = Array.from({ length: rows }, () => Array(cols).fill(0)); let player = 1, over = false;
  mount(`<div class="game-stack"><div class="game-message" id="connect-message">Red goes first. Connect four to win.</div><div class="grid-board" id="connect-board" style="grid-template-columns:repeat(7,42px);gap:4px;padding:8px;background:#242239;border-radius:5px"></div><div class="game-label">LOCAL TWO-PLAYER</div></div>`);
  const boardEl = document.querySelector('#connect-board');
  function win(r, c) { for (const [dr, dc] of [[0,1],[1,0],[1,1],[1,-1]]) { let total = 1; for (const sign of [-1,1]) { let rr = r + dr * sign, cc = c + dc * sign; while (rr >= 0 && rr < rows && cc >= 0 && cc < cols && board[rr][cc] === player) { total++; rr += dr * sign; cc += dc * sign; } } if (total >= 4) return true; } return false; }
  function draw() { boardEl.innerHTML = ''; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const cell = controlButton(board[r][c] === 1 ? '●' : board[r][c] === 2 ? '●' : '', () => drop(c), 'board-cell'); cell.style.cssText = `width:42px;height:42px;border-radius:50%;font-size:32px;line-height:1;background:#171621;color:${board[r][c] === 1 ? '#ff737b' : '#f3ce68'}`; cell.setAttribute('aria-label', `Row ${r + 1}, column ${c + 1}`); boardEl.append(cell); } }
  function drop(col) { if (over) return; let row = rows - 1; while (row >= 0 && board[row][col]) row--; if (row < 0) return; board[row][col] = player; beep(player === 1 ? 520 : 630); if (win(row, col)) { over = true; setStatus(player === 1 ? 'Red wins' : 'Yellow wins'); document.querySelector('#connect-message').textContent = `${player === 1 ? 'Red' : 'Yellow'} connects four!`; scoreTo(1); } else if (board[0].every(Boolean)) { over = true; setStatus('Draw game'); document.querySelector('#connect-message').textContent = 'A full board. Good game!'; } else { player = player === 1 ? 2 : 1; document.querySelector('#connect-message').textContent = `${player === 1 ? 'Red' : 'Yellow'} to play`; } draw(); }
  draw();
}
function initSudoku() {
  const puzzle = '530070000600195000098000060800060003400803001700020006060000280000419005000080079'.split('').map(Number);
  const solution = '534678912672195348198342567859761423426853791713924856961537284287419635345286179'.split('').map(Number);
  let mistakes = 0;
  mount(`<div class="game-stack"><div class="game-message" id="sudoku-message">Fill every blank. Select a cell and enter 1–9.</div><div class="grid-board" id="sudoku-board" style="grid-template-columns:repeat(9,34px);gap:1px;background:#57515e;border:1px solid #57515e"></div><div class="game-label">${puzzle.filter(Boolean).length} GIVEN CLUES</div></div>`);
  const board = document.querySelector('#sudoku-board');
  puzzle.forEach((value, index) => {
    const cell = document.createElement(value ? 'div' : 'input'); cell.className = 'board-cell';
    cell.style.cssText = `width:34px;height:34px;border:0;border-radius:0;font:14px var(--mono);background:${value ? '#24212c' : '#17151e'};color:${value ? '#a999d0' : '#fff'};text-align:center;${index % 3 === 2 && index % 9 !== 8 ? 'border-right:2px solid #716882;' : ''}${Math.floor(index / 9) % 3 === 2 && index < 54 ? 'border-bottom:2px solid #716882;' : ''}`;
    if (value) { cell.textContent = value; cell.setAttribute('aria-label', `Fixed ${value}`); }
    else { cell.type = 'text'; cell.inputMode = 'numeric'; cell.maxLength = 1; cell.dataset.index = index; cell.setAttribute('aria-label', `Sudoku row ${Math.floor(index / 9) + 1} column ${index % 9 + 1}`); cell.addEventListener('input', () => { const v = Number(cell.value); if (!/^[1-9]$/.test(cell.value)) { cell.value = ''; return; } if (v !== solution[index]) { cell.style.color = '#ff7d89'; mistakes++; document.querySelector('#sudoku-message').textContent = `Not quite. ${mistakes} incorrect ${mistakes === 1 ? 'entry' : 'entries'}.`; } else { cell.style.color = '#77dfc0'; cell.disabled = true; addScore(); beep(640, .05); } if ([...board.querySelectorAll('input')].every(input => input.disabled)) { scoreTo(Math.max(1, 81 - mistakes)); setStatus('Puzzle solved'); document.querySelector('#sudoku-message').textContent = `Solved with ${mistakes} incorrect ${mistakes === 1 ? 'entry' : 'entries'}!`; } }); }
    board.append(cell);
  });
  document.querySelector('#score-caption').textContent = 'Correct entries';
}
function initChess() {
  const initial = ['rnbqkbnr','pppppppp','........','........','........','........','PPPPPPPP','RNBQKBNR'].map(row => row.split(''));
  let board = initial.map(row => [...row]); let turn = 'w', selected = null, legal = [], over = false, enPassant = null; let moved = new Set();
  const glyph = { K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙', k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
  mount(`<div class="game-stack"><div class="game-message" id="chess-message">White to move. Select a piece to see legal moves.</div><div class="grid-board" id="chess-board" style="grid-template-columns:repeat(8,42px);gap:0;border:2px solid #726781"></div><div class="game-label">LOCAL TWO-PLAYER · WHITE MOVES FIRST</div></div>`);
  const boardEl = document.querySelector('#chess-board');
  const colorOf = piece => piece === '.' ? null : piece === piece.toUpperCase() ? 'w' : 'b';
  const inside = (r,c) => r >= 0 && r < 8 && c >= 0 && c < 8;
  function findKing(color, position = board) { for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (position[r][c] === (color === 'w' ? 'K' : 'k')) return [r,c]; return null; }
  function attacked(r, c, by, position = board) {
    const pawnRow = r + (by === 'w' ? 1 : -1);
    for (const dc of [-1,1]) if (inside(pawnRow,c+dc) && position[pawnRow][c+dc] === (by === 'w' ? 'P' : 'p')) return true;
    for (const [dr,dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) if (inside(r+dr,c+dc) && position[r+dr][c+dc] === (by === 'w' ? 'N' : 'n')) return true;
    for (const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) { let rr=r+dr,cc=c+dc,step=1; while(inside(rr,cc)){const p=position[rr][cc];if(p!=='.'){if(colorOf(p)===by){const kind=p.toLowerCase();if(kind==='q'||(step===1&&kind==='k')||(dr===0||dc===0?kind==='r':kind==='b'))return true;}break;}rr+=dr;cc+=dc;step++;} }
    return false;
  }
  function inCheck(color, position = board) { const king=findKing(color,position); return king ? attacked(king[0],king[1],color==='w'?'b':'w',position) : false; }
  function pseudo(r,c,position=board,includeCastle=true) {
    const piece=position[r][c], color=colorOf(piece); if(!color)return []; const kind=piece.toLowerCase(), moves=[]; const add=(rr,cc)=>{if(inside(rr,cc)&&colorOf(position[rr][cc])!==color)moves.push([rr,cc]);};
    if(kind==='p'){const d=color==='w'?-1:1,start=color==='w'?6:1;if(inside(r+d,c)&&position[r+d][c]==='.'){moves.push([r+d,c]);if(r===start&&position[r+2*d][c]==='.')moves.push([r+2*d,c]);}for(const dc of [-1,1])if(inside(r+d,c+dc)&&colorOf(position[r+d][c+dc])&&colorOf(position[r+d][c+dc])!==color)moves.push([r+d,c+dc]);if(enPassant&&enPassant[0]===r+d&&Math.abs(enPassant[1]-c)===1)moves.push([...enPassant]);}
    if(kind==='n')for(const [dr,dc]of[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])add(r+dr,c+dc);
    if(kind==='k')for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++)if(dr||dc)add(r+dr,c+dc);
    if(['r','b','q'].includes(kind)){const dirs=[];if(kind!=='b')dirs.push([1,0],[-1,0],[0,1],[0,-1]);if(kind!=='r')dirs.push([1,1],[1,-1],[-1,1],[-1,-1]);for(const[dr,dc]of dirs){let rr=r+dr,cc=c+dc;while(inside(rr,cc)){if(position[rr][cc]==='.'){moves.push([rr,cc]);}else{if(colorOf(position[rr][cc])!==color)moves.push([rr,cc]);break;}rr+=dr;cc+=dc;}}}
    if(kind==='k'&&includeCastle&&!inCheck(color,position)){const row=color==='w'?7:0,rook=color==='w'?'R':'r',kingHome=color==='w'?'K':'k';if(r===row&&c===4&&piece===kingHome){for(const side of ['king','queen']){const rookCol=side==='king'?7:0,key=`${color}${side}`;const between=side==='king'?[5,6]:[1,2,3],path=side==='king'?[5,6]:[3,2];if(!moved.has(key)&&position[row][rookCol]===rook&&between.every(col=>position[row][col]==='.')&&path.every(col=>!attacked(row,col,color==='w'?'b':'w',position)))moves.push([row,side==='king'?6:2]);}}}
    return moves;
  }
  // Filter pseudo-legal moves by simulating each position and rejecting exposed kings.
  function legalMoves(r,c,position=board){return pseudo(r,c,position).filter(([rr,cc])=>{const copy=position.map(row=>[...row]);const piece=copy[r][c];copy[rr][cc]=piece;copy[r][c]='.';if(piece.toLowerCase()==='p'&&enPassant&&rr===enPassant[0]&&cc===enPassant[1]&&c!==cc)copy[colorOf(piece)==='w'?rr+1:rr-1][cc]='.';if(piece.toLowerCase()==='k'&&Math.abs(cc-c)===2){const row=r,rookFrom=cc>c?7:0,rookTo=cc>c?5:3;copy[row][rookTo]=copy[row][rookFrom];copy[row][rookFrom]='.';}return !inCheck(colorOf(piece),copy);});}
  function allMoves(color){const out=[];for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(colorOf(board[r][c])===color)for(const move of legalMoves(r,c))out.push(move);return out;}
  function render(){boardEl.innerHTML='';for(let r=0;r<8;r++)for(let c=0;c<8;c++){const sq=controlButton(glyph[board[r][c]]||'',()=>choose(r,c),'board-cell');const light=(r+c)%2===0;const isSelected=selected&&selected[0]===r&&selected[1]===c;const isLegal=legal.some(([rr,cc])=>rr===r&&cc===c);sq.style.cssText=`width:42px;height:42px;border:0;border-radius:0;background:${isSelected?'#a28bd2':light?'#d8c9bc':'#6a5c70'};color:${colorOf(board[r][c])==='w'?'#fbf8f2':'#17131d'};font-size:28px;position:relative;cursor:pointer;${isLegal?'box-shadow:inset 0 0 0 3px #68dec5':''}`;sq.setAttribute('aria-label',`${String.fromCharCode(97+c)}${8-r}${board[r][c]==='.'?' empty':` ${board[r][c]}`}`);boardEl.append(sq);}}
  function choose(r,c){if(over)return;const piece=board[r][c];if(selected&&legal.some(([rr,cc])=>rr===r&&cc===c)){move(selected[0],selected[1],r,c);return;}if(colorOf(piece)===turn){selected=[r,c];legal=legalMoves(r,c);}else{selected=null;legal=[];}render();}
  function move(r,c,rr,cc){const piece=board[r][c],kind=piece.toLowerCase(),color=colorOf(piece),target=board[rr][cc];if(kind==='p'&&enPassant&&rr===enPassant[0]&&cc===enPassant[1]&&c!==cc)board[color==='w'?rr+1:rr-1][cc]='.';if(kind==='k'&&Math.abs(cc-c)===2){const rookFrom=cc>c?7:0,rookTo=cc>c?5:3;board[r][rookTo]=board[r][rookFrom];board[r][rookFrom]='.';moved.add(`${color}${cc>c?'king':'queen'}`);}if(kind==='k'){moved.add(`${color}king`);moved.add(`${color}queen`);}if(kind==='r'){if(r===7&&c===0)moved.add('wqueen');if(r===7&&c===7)moved.add('wking');if(r===0&&c===0)moved.add('bqueen');if(r===0&&c===7)moved.add('bking');}board[rr][cc]=piece;board[r][c]='.';enPassant=kind==='p'&&Math.abs(rr-r)===2?[(rr+r)/2,c]:null;if(kind==='p'&&(rr===0||rr===7)){board[rr][cc]=color==='w'?'Q':'q';setStatus('Pawn promoted to queen');}selected=null;legal=[];turn=turn==='w'?'b':'w';beep(target!=='.'?700:530);const check=inCheck(turn);const moves=allMoves(turn);if(!moves.length){over=true;if(check){scoreTo(color==='w'?1:0);setStatus('Checkmate');document.querySelector('#chess-message').textContent=`Checkmate! ${color==='w'?'White':'Black'} wins.`;}else{setStatus('Stalemate');document.querySelector('#chess-message').textContent='Stalemate. The match is a draw.';}}else{setStatus(check?'Check':'Game in progress');document.querySelector('#chess-message').textContent=`${turn==='w'?'White':'Black'} to move${check?' — check!':''}`;}render();}
  render(); document.querySelector('#score-caption').textContent='Wins as White';
}

grid.addEventListener('click', event => { const button = event.target.closest('[data-play]'); if (button) startGame(button.dataset.play); });
document.querySelectorAll('.category-tab').forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; document.querySelectorAll('.category-tab').forEach(tab => tab.classList.toggle('active', tab === button)); renderCards(); }));
searchInput.addEventListener('input', renderCards);
document.querySelector('.random-game').addEventListener('click', () => { const candidates = games.filter(game => game.id !== activeGame?.id); startGame(candidates[Math.floor(Math.random() * candidates.length)].id); });
document.querySelector('#back-to-games').addEventListener('click', closeGame);
document.querySelector('#restart-game').addEventListener('click', restartGame);
document.querySelectorAll('.sound-toggle').forEach(button => button.addEventListener('click', () => { soundEnabled = !soundEnabled; localStorage.setItem('gz-muted', String(!soundEnabled)); syncSoundButtons(); if (soundEnabled) beep(660); }));
document.querySelector('.mobile-menu').addEventListener('click', event => { const nav = document.querySelector('.main-nav'); const open = nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', String(open)); event.currentTarget.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => { document.querySelector('.main-nav').classList.remove('open'); document.querySelector('.mobile-menu').setAttribute('aria-expanded', 'false'); }));
document.querySelector('[data-category-link]').addEventListener('click', () => { activeFilter = 'All'; document.querySelectorAll('.category-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.filter === 'All')); renderCards(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay.classList.contains('open')) closeGame(); if (event.key === '/' && !overlay.classList.contains('open') && document.activeElement !== searchInput && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); searchInput.focus(); } });
renderCards(); syncSoundButtons();
