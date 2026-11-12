function initExtraGame(id) {
  const stack = '<div class="game-stack">';
  const arrows = (selector, callback) => {
    const controls = document.querySelector(selector);
    [['↑', 0, -1], ['←', -1, 0], ['↓', 0, 1], ['→', 1, 0]].forEach(([label, x, y]) => {
      controls.append(controlButton(label, () => callback(x, y)));
    });
  };
  const keyControls = (callback, keys = { ArrowUp: [0, -1], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowRight: [1, 0] }) => {
    const handler = event => {
      const direction = keys[event.key];
      if (!direction) return;
      event.preventDefault();
      callback(...direction);
    };
    window.addEventListener('keydown', handler);
    registerHandleCleanup(() => window.removeEventListener('keydown', handler));
  };
  const makeBoard = (selector, columns, cellSize, callback, label = 'board-cell') => {
    const board = document.querySelector(selector);
    board.style.gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`;
    return { board, cellSize, callback, label };
  };

  if (id === 'pac-man') {
    const size = 13;
    const walls = new Set();
    for (let i = 0; i < size; i++) {
      walls.add(`${i},0`); walls.add(`${i},${size - 1}`);
      walls.add(`0,${i}`); walls.add(`${size - 1},${i}`);
    }
    [[3, 3], [4, 3], [5, 3], [7, 3], [8, 3], [9, 3], [3, 7], [4, 7], [5, 7], [7, 7], [8, 7], [9, 7], [5, 2], [5, 4], [8, 8], [8, 9], [8, 10]].forEach(([x, y]) => walls.add(`${x},${y}`));
    let player = { x: 1, y: 1 }, ghost = { x: 11, y: 11 }, tick = 0, alive = true;
    const pellets = new Set();
    for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) if (!walls.has(`${x},${y}`)) pellets.add(`${x},${y}`);
    pellets.delete('1,1'); pellets.delete('11,11');
    mount(`${stack}<div class="game-message" id="pac-message">Collect every dot. Use the arrow keys or buttons.</div><div id="pac-board" class="grid-board" style="gap:2px"></div><div class="touch-controls" id="pac-controls"></div></div>`);
    const board = document.querySelector('#pac-board');
    board.style.gridTemplateColumns = `repeat(${size}, 25px)`;
    function draw() {
      board.innerHTML = '';
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const key = `${x},${y}`;
        const cell = document.createElement('div');
        cell.style.cssText = `width:25px;height:25px;display:grid;place-items:center;background:${walls.has(key) ? '#363052' : '#15141c'};color:#f7d96c;font-size:15px`;
        cell.textContent = player.x === x && player.y === y ? '🟡' : ghost.x === x && ghost.y === y ? '👻' : pellets.has(key) ? '·' : '';
        board.append(cell);
      }
    }
    function move(dx, dy) {
      if (!alive) return;
      const nx = player.x + dx, ny = player.y + dy, next = `${nx},${ny}`;
      if (!walls.has(next)) { player = { x: nx, y: ny }; if (pellets.delete(next)) { addScore(10); beep(660, .04); } }
      tick++;
      if (tick % 2 === 0) {
        const options = [[0, -1], [-1, 0], [0, 1], [1, 0]].map(([x, y]) => ({ x: ghost.x + x, y: ghost.y + y })).filter(pos => !walls.has(`${pos.x},${pos.y}`));
        options.sort((a, b) => Math.abs(a.x - player.x) + Math.abs(a.y - player.y) - Math.abs(b.x - player.x) - Math.abs(b.y - player.y));
        if (options.length) ghost = options[0];
      }
      if (player.x === ghost.x && player.y === ghost.y) { alive = false; setStatus('Caught by a chaser'); document.querySelector('#pac-message').textContent = `Game over — you collected ${gameScore} points.`; }
      else if (!pellets.size) { alive = false; scoreTo(gameScore + 100); setStatus('Maze cleared'); document.querySelector('#pac-message').textContent = 'Every dot collected. Maze cleared!'; }
      draw();
    }
    keyControls(move); arrows('#pac-controls', move); draw(); document.querySelector('#score-caption').textContent = 'Dots collected';
    return;
  }

  if (id === 'clicker') {
    let clicks = 0, power = 1, milestoneIndex = 0;
    const milestones = [50, 100, 200, 500];
    mount(`${stack}<div class="game-message" id="clicker-message">Click to earn points. Power-ups unlock at 50, 100, 200, and 500 clicks.</div><button id="clicker-button" class="board-cell" type="button" style="width:min(100%,300px);height:160px;border-radius:12px;font-size:24px;font-weight:800;background:#28233a;color:#a8f0d7">CLICK +1</button><div class="game-label" id="clicker-progress">CLICKS 0 · POWER +1</div></div>`);
    document.querySelector('#score-caption').textContent = 'Points earned';
    document.querySelector('#clicker-button').addEventListener('click', () => {
      clicks++;
      addScore(power);
      if (milestoneIndex < milestones.length && clicks === milestones[milestoneIndex]) {
        power *= 2; milestoneIndex++;
        document.querySelector('#clicker-message').textContent = `Power-up unlocked! Each click is now worth ${power} points.`;
        beep(820, .12);
      }
      document.querySelector('#clicker-progress').textContent = `CLICKS ${clicks} · POWER +${power}`;
      document.querySelector('#clicker-button').textContent = `CLICK +${power}`;
    });
    return;
  }

  if (id === 'space-invaders') {
    const canvas = document.createElement('canvas'); canvas.width = 480; canvas.height = 300; canvas.className = 'game-canvas'; canvas.setAttribute('aria-label', 'Space Invaders playfield');
    mount(`${stack}<div class="game-message" id="invader-message">Move with ← → and fire with Space.</div><div id="invader-holder"></div><div class="game-label">← → MOVE · SPACE FIRE</div></div>`);
    document.querySelector('#invader-holder').append(canvas);
    const ctx = canvas.getContext('2d');
    let player = 240, bullets = [], aliens = [], direction = 1, done = false;
    for (let y = 0; y < 3; y++) for (let x = 0; x < 8; x++) aliens.push({ x: 45 + x * 50, y: 38 + y * 34, alive: true });
    function draw() {
      ctx.fillStyle = '#11131d'; ctx.fillRect(0, 0, 480, 300);
      ctx.fillStyle = '#d6c6ff'; ctx.fillRect(player - 18, 272, 36, 12);
      ctx.fillStyle = '#8edcba'; aliens.forEach(a => { if (a.alive) { ctx.fillRect(a.x - 12, a.y - 8, 24, 16); ctx.fillRect(a.x - 17, a.y - 3, 5, 8); ctx.fillRect(a.x + 12, a.y - 3, 5, 8); } });
      ctx.fillStyle = '#ffe27b'; bullets.forEach(b => ctx.fillRect(b.x - 2, b.y - 6, 4, 12));
      ctx.fillStyle = '#fff'; ctx.font = '12px monospace'; ctx.fillText(`SCORE ${gameScore}`, 12, 18);
    }
    const keydown = event => {
      if (event.key === 'ArrowLeft') { player = Math.max(20, player - 22); event.preventDefault(); }
      if (event.key === 'ArrowRight') { player = Math.min(460, player + 22); event.preventDefault(); }
      if (event.code === 'Space' && !done) { event.preventDefault(); bullets.push({ x: player, y: 268 }); }
    };
    window.addEventListener('keydown', keydown);
    registerHandleCleanup(() => window.removeEventListener('keydown', keydown));
    interval(() => {
      if (!done) {
        const remaining = aliens.filter(a => a.alive);
        const left = Math.min(...remaining.map(a => a.x));
        const right = Math.max(...remaining.map(a => a.x));
        if (remaining.length && (right + direction * 2 > 462 || left + direction * 2 < 18)) { direction *= -1; aliens.forEach(a => { if (a.alive) a.y += 12; }); }
        aliens.forEach(a => { if (a.alive) a.x += direction * 2; });
        bullets.forEach(b => { b.y -= 7; const hit = aliens.find(a => a.alive && Math.abs(a.x - b.x) < 17 && Math.abs(a.y - b.y) < 15); if (hit) { hit.alive = false; b.y = -10; addScore(10); beep(700, .04); } });
        bullets = bullets.filter(b => b.y > -10);
        if (aliens.some(a => a.alive && a.y > 250)) { done = true; setStatus('Fleet reached the ground'); document.querySelector('#invader-message').textContent = 'The fleet landed. Restart to defend again.'; }
        if (aliens.every(a => !a.alive)) { done = true; scoreTo(gameScore + 50); setStatus('Fleet defeated'); document.querySelector('#invader-message').textContent = 'Fleet cleared! Earth is safe.'; }
      }
      draw();
    }, 40);
    draw(); document.querySelector('#score-caption').textContent = 'Aliens hit';
    return;
  }

  if (id === 'tetris') {
    const width = 10, height = 18, shapes = [
      [[1, 1, 1, 1]], [[1, 1], [1, 1]], [[0, 1, 0], [1, 1, 1]],
      [[1, 0, 0], [1, 1, 1]], [[0, 0, 1], [1, 1, 1]],
      [[0, 1, 1], [1, 1, 0]], [[1, 1, 0], [0, 1, 1]]
    ];
    let board = Array.from({ length: height }, () => Array(width).fill(0)), piece = null, over = false, lines = 0;
    mount(`${stack}<div class="game-message" id="tetris-message">Arrow keys move and rotate. Down drops faster.</div><div id="tetris-board" class="grid-board" style="gap:2px"></div><div class="game-label" id="tetris-lines">LINES 0</div></div>`);
    const boardEl = document.querySelector('#tetris-board'); boardEl.style.gridTemplateColumns = `repeat(${width}, 22px)`;
    function spawn() { const shape = shapes[Math.floor(Math.random() * shapes.length)].map(row => [...row]); piece = { shape, x: Math.floor((width - shape[0].length) / 2), y: 0 }; if (collides(piece.x, piece.y, shape)) { over = true; setStatus('Stack reached the top'); } }
    function collides(x, y, shape) { return shape.some((row, dy) => row.some((value, dx) => value && (x + dx < 0 || x + dx >= width || y + dy >= height || (y + dy >= 0 && board[y + dy][x + dx])))); }
    function lock() {
      piece.shape.forEach((row, dy) => row.forEach((value, dx) => { if (value && piece.y + dy >= 0) board[piece.y + dy][piece.x + dx] = 1; }));
      const remaining = board.filter(row => row.some(value => !value)).length;
      const cleared = height - remaining;
      if (cleared) { board = Array.from({ length: cleared }, () => Array(width).fill(0)).concat(board.filter(row => row.some(value => !value))); lines += cleared; addScore([0, 100, 300, 500, 800][cleared] || cleared * 200); document.querySelector('#tetris-lines').textContent = `LINES ${lines}`; }
      spawn();
    }
    function draw() {
      boardEl.innerHTML = '';
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        const active = piece && piece.shape.some((row, dy) => row.some((value, dx) => value && piece.x + dx === x && piece.y + dy === y));
        const cell = document.createElement('div'); cell.style.cssText = `width:22px;height:22px;background:${board[y][x] || active ? '#9a82ee' : '#252230'};border:1px solid #363141`;
        boardEl.append(cell);
      }
    }
    function move(key) {
      if (over) return;
      if (key === 'ArrowLeft' && !collides(piece.x - 1, piece.y, piece.shape)) piece.x--;
      if (key === 'ArrowRight' && !collides(piece.x + 1, piece.y, piece.shape)) piece.x++;
      if (key === 'ArrowDown') { if (!collides(piece.x, piece.y + 1, piece.shape)) piece.y++; else lock(); }
      if (key === 'ArrowUp') { const rotated = piece.shape[0].map((_, x) => piece.shape.map(row => row[x]).reverse()); if (!collides(piece.x, piece.y, rotated)) piece.shape = rotated; }
      draw();
    }
    const keydown = event => { if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); move(event.key); } };
    window.addEventListener('keydown', keydown); registerHandleCleanup(() => window.removeEventListener('keydown', keydown));
    spawn(); interval(() => { if (!over) { if (!collides(piece.x, piece.y + 1, piece.shape)) piece.y++; else lock(); draw(); } }, 520); draw();
    document.querySelector('#score-caption').textContent = 'Points from cleared lines';
    return;
  }

  if (id === 'lights-out') {
    const size = 5; let lights = Array(size * size).fill(false), moves = 0;
    mount(`${stack}<div class="game-message" id="lights-message">Turn off all 25 lights.</div><div id="lights-board" class="grid-board" style="gap:5px"></div><div class="game-label" id="lights-moves">MOVES 0</div></div>`);
    const board = document.querySelector('#lights-board'); board.style.gridTemplateColumns = `repeat(${size}, 48px)`;
    function toggle(index) {
      const row = Math.floor(index / size), col = index % size;
      [[row, col], [row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([y, x]) => { if (x >= 0 && x < size && y >= 0 && y < size) lights[y * size + x] = !lights[y * size + x]; });
      moves++; const off = lights.filter(Boolean).length; scoreTo(size * size - off);
      document.querySelector('#lights-moves').textContent = `MOVES ${moves}`;
      if (off === 0) { setStatus('All lights out'); document.querySelector('#lights-message').textContent = `Solved in ${moves} moves!`; }
      draw();
    }
    function draw() {
      board.innerHTML = '';
      lights.forEach((on, index) => { const btn = controlButton(on ? '●' : '○', () => toggle(index), 'board-cell'); btn.style.cssText = `width:48px;height:48px;background:${on ? '#d9bc62' : '#24212c'};color:${on ? '#251d08' : '#6a6570'}`; board.append(btn); });
    }
    for (let i = 0; i < 14; i++) { const index = Math.floor(Math.random() * lights.length); const row = Math.floor(index / size), col = index % size; [[row,col],[row-1,col],[row+1,col],[row,col-1],[row,col+1]].forEach(([y,x]) => { if (x >= 0 && x < size && y >= 0 && y < size) lights[y * size + x] = !lights[y * size + x]; }); }
    draw(); document.querySelector('#score-caption').textContent = 'Lights switched off';
    return;
  }

  if (id === 'wordle') {
    const words = ['PLANT', 'BRICK', 'CLOUD', 'MOUSE', 'SMILE', 'GHOST', 'BRAIN', 'FLAME'];
    const answer = words[Math.floor(Math.random() * words.length)]; let guesses = 0, done = false;
    mount(`${stack}<div class="game-message" id="wordle-message">Guess the 5-letter word in six tries.</div><form id="wordle-form" class="game-buttons"><input class="game-input" id="wordle-input" maxlength="5" autocomplete="off" placeholder="5-letter guess" required><button class="game-control">Guess</button></form><div id="wordle-rows" style="display:grid;gap:6px"></div></div>`);
    const input = document.querySelector('#wordle-input'), rows = document.querySelector('#wordle-rows');
    document.querySelector('#wordle-form').addEventListener('submit', event => {
      event.preventDefault(); const guess = input.value.trim().toUpperCase();
      if (done || !/^[A-Z]{5}$/.test(guess)) return;
      guesses++;
      const row = document.createElement('div'); row.style.cssText = 'display:flex;gap:5px';
      [...guess].forEach((letter, i) => { const cell = document.createElement('span'); const color = letter === answer[i] ? '#4d987a' : answer.includes(letter) ? '#b3944b' : '#47434e'; cell.style.cssText = `width:40px;height:40px;display:grid;place-items:center;background:${color};font-weight:800;color:#fff`; cell.textContent = letter; row.append(cell); });
      rows.append(row); input.value = '';
      if (guess === answer) { done = true; scoreTo(7 - guesses); setStatus('Word found'); document.querySelector('#wordle-message').textContent = `Solved in ${guesses} ${guesses === 1 ? 'guess' : 'guesses'}!`; }
      else if (guesses === 6) { done = true; setStatus('No guesses left'); document.querySelector('#wordle-message').textContent = `The word was ${answer}.`; }
      input.disabled = done;
    });
    input.focus(); document.querySelector('#score-caption').textContent = 'Points for solving';
    return;
  }

  if (id === 'mastermind') {
    const colors = ['#e66e83', '#79d8bb', '#8e83e9', '#efc866', '#6bb5e5', '#d38ad6'];
    const code = Array.from({ length: 4 }, () => Math.floor(Math.random() * colors.length)); let attempts = 0, done = false;
    mount(`${stack}<div class="game-message" id="mastermind-message">Choose four colors. ● is right color and place; ○ is right color only.</div><div id="mastermind-input" class="game-buttons"></div><button class="game-control" id="mastermind-submit">Check code</button><div id="mastermind-history" style="display:grid;gap:5px"></div></div>`);
    const input = document.querySelector('#mastermind-input'), history = document.querySelector('#mastermind-history');
    const selects = colors.map((color, i) => { const select = document.createElement('select'); select.setAttribute('aria-label', `Color ${i + 1}`); colors.forEach((_, j) => { const option = document.createElement('option'); option.value = j; option.textContent = `Color ${j + 1}`; select.append(option); }); input.append(select); return select; });
    document.querySelector('#mastermind-submit').addEventListener('click', () => {
      if (done) return;
      const guess = selects.map(select => Number(select.value)); attempts++;
      const exact = guess.filter((value, i) => value === code[i]).length;
      const remainingCode = code.filter((_, i) => guess[i] !== code[i]), remainingGuess = guess.filter((_, i) => guess[i] !== code[i]);
      let near = 0; remainingGuess.forEach(value => { const index = remainingCode.indexOf(value); if (index >= 0) { near++; remainingCode.splice(index, 1); } });
      const row = document.createElement('div'); row.className = 'game-label'; row.textContent = `TRY ${attempts}: ${exact} exact · ${near} misplaced`; history.prepend(row);
      if (exact === code.length) { done = true; scoreTo(Math.max(1, 13 - attempts)); setStatus('Code cracked'); document.querySelector('#mastermind-message').textContent = `Code cracked in ${attempts} tries!`; }
      else if (attempts === 10) { done = true; document.querySelector('#mastermind-message').textContent = `Out of tries. Code: ${code.map(i => i + 1).join(' · ')}`; }
    });
    document.querySelector('#score-caption').textContent = 'Points for cracking code';
    return;
  }

  if (id === 'battleship') {
    const size = 7, ships = new Set(['1,1', '2,1', '3,1', '5,4', '5,5']); let shots = new Set(), hits = new Set(), done = false;
    mount(`${stack}<div class="game-message" id="battleship-message">Find both ships. Red marks a hit; gray marks a miss.</div><div id="battleship-board" class="grid-board" style="gap:3px"></div></div>`);
    const board = document.querySelector('#battleship-board'); board.style.gridTemplateColumns = `repeat(${size}, 38px)`;
    function draw() {
      board.innerHTML = '';
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const key = `${x},${y}`, btn = controlButton(hits.has(key) ? '✹' : shots.has(key) ? '·' : '', () => fire(key), 'board-cell');
        btn.style.cssText = `width:38px;height:38px;background:${hits.has(key) ? '#773e58' : shots.has(key) ? '#34313c' : '#242b3d'};color:${hits.has(key) ? '#ff9aa6' : '#b7dafa'}`; btn.disabled = shots.has(key) || done; board.append(btn);
      }
    }
    function fire(key) {
      if (done || shots.has(key)) return;
      shots.add(key);
      if (ships.has(key)) { hits.add(key); addScore(10); beep(700, .05); }
      else beep(270, .05);
      if (hits.size === ships.size) { done = true; scoreTo(gameScore + 50); setStatus('Fleet sunk'); document.querySelector('#battleship-message').textContent = `Fleet sunk in ${shots.size} shots!`; }
      draw();
    }
    draw(); document.querySelector('#score-caption').textContent = 'Points for hits';
    return;
  }

  if (id === 'reversi') {
    const size = 6; let board = Array.from({ length: size }, () => Array(size).fill(0)), player = 1, ended = false;
    board[2][2] = board[3][3] = 1; board[2][3] = board[3][2] = 2;
    mount(`${stack}<div class="game-message" id="reversi-message">Dark plays first. Capture lines of light pieces.</div><div id="reversi-board" class="grid-board" style="gap:3px"></div></div>`);
    const boardEl = document.querySelector('#reversi-board'); boardEl.style.gridTemplateColumns = `repeat(${size}, 42px)`;
    function captures(r, c, color) {
      if (board[r][c]) return [];
      const found = [];
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
        let y = r + dr, x = c + dc, line = [];
        while (y >= 0 && y < size && x >= 0 && x < size && board[y][x] === 3 - color) { line.push([y, x]); y += dr; x += dc; }
        if (line.length && y >= 0 && y < size && x >= 0 && x < size && board[y][x] === color) found.push(...line);
      }
      return found;
    }
    function draw() {
      boardEl.innerHTML = '';
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const btn = controlButton(board[y][x] ? (board[y][x] === 1 ? '●' : '○') : '', () => play(y, x), 'board-cell');
        btn.style.cssText = `width:42px;height:42px;background:#35745f;color:${board[y][x] === 1 ? '#15151a' : '#f5f0e8'};font-size:27px`; btn.disabled = ended || !captures(y, x, player).length; boardEl.append(btn);
      }
      document.querySelector('#reversi-message').textContent = `Dark ${board.flat().filter(v => v === 1).length} · Light ${board.flat().filter(v => v === 2).length} — ${player === 1 ? 'Dark' : 'Light'} to move`;
    }
    function play(y, x) {
      const flipped = captures(y, x, player); if (!flipped.length || ended) return;
      board[y][x] = player; flipped.forEach(([r, c]) => { board[r][c] = player; if (player === 1) addScore(); });
      player = 3 - player;
      if (!board.flat().includes(0) || !board.some((row, r) => row.some((_, c) => captures(r, c, player).length))) {
        player = 3 - player;
        if (!board.flat().includes(0) || !board.some((row, r) => row.some((_, c) => captures(r, c, player).length))) {
          ended = true; const dark = board.flat().filter(v => v === 1).length, light = board.flat().filter(v => v === 2).length;
          if (dark > light) { scoreTo(dark); setStatus('Dark wins'); } else setStatus(dark === light ? 'Draw' : 'Light wins');
        }
      }
      draw();
    }
    draw(); document.querySelector('#score-caption').textContent = 'Pieces flipped as Dark';
    return;
  }

  if (id === 'nim') {
    let stones = 15, playerTurn = true, done = false;
    mount(`${stack}<div class="game-message" id="nim-message">Take 1–3 stones. The player who takes the last stone loses.</div><div id="nim-stones" style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:300px;font-size:29px"></div><div class="game-buttons" id="nim-controls"></div></div>`);
    function draw() {
      const holder = document.querySelector('#nim-stones'); holder.textContent = '🪨 '.repeat(stones);
      const controls = document.querySelector('#nim-controls'); controls.replaceChildren();
      [1, 2, 3].forEach(amount => { const btn = controlButton(`Take ${amount}`, () => take(amount), 'game-control'); btn.disabled = done || !playerTurn || amount > stones; controls.append(btn); });
    }
    function take(amount) {
      if (done || !playerTurn || amount > stones) return;
      stones -= amount; addScore(amount);
      if (stones === 0) { done = true; setStatus('You took the last stone'); document.querySelector('#nim-message').textContent = 'You took the last stone — the computer wins!'; draw(); return; }
      playerTurn = false; draw();
      timeout(() => {
        const cpuTake = stones <= 3 ? Math.max(1, stones - 1) : 1 + Math.floor(Math.random() * 3);
        stones -= cpuTake;
        if (!stones) { done = true; setStatus('Computer took the last stone'); document.querySelector('#nim-message').textContent = 'The computer took the last stone — you win!'; scoreTo(gameScore + 5); }
        else { playerTurn = true; document.querySelector('#nim-message').textContent = `Computer took ${cpuTake}. Your turn.`; }
        draw();
      }, 500);
    }
    draw(); document.querySelector('#score-caption').textContent = 'Stones taken';
    return;
  }

  if (id === 'fifteen-puzzle') {
    let tiles = Array.from({ length: 16 }, (_, i) => (i + 1) % 16);
    function shuffle() { for (let i = 0; i < 120; i++) { const empty = tiles.indexOf(0), candidates = [empty - 4, empty + 4, empty % 4 ? empty - 1 : -1, empty % 4 < 3 ? empty + 1 : -1].filter(n => n >= 0 && n < 16); const next = candidates[Math.floor(Math.random() * candidates.length)]; [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]]; } }
    shuffle();
    mount(`${stack}<div class="game-message" id="fifteen-message">Slide the tiles into order. Score shows correctly placed tiles.</div><div id="fifteen-board" class="grid-board" style="gap:4px"></div><div class="game-label" id="fifteen-moves">MOVES 0</div></div>`);
    const board = document.querySelector('#fifteen-board'); board.style.gridTemplateColumns = 'repeat(4, 56px)'; let moves = 0;
    function draw() {
      board.innerHTML = '';
      tiles.forEach((value, index) => { const btn = controlButton(value ? String(value) : '', () => move(index), 'board-cell'); btn.style.cssText = 'width:56px;height:56px;font-size:20px'; btn.disabled = !value; board.append(btn); });
      const placed = tiles.filter((v, i) => v === (i + 1) % 16).length; scoreTo(placed);
      if (placed === 16) { setStatus('Puzzle solved'); document.querySelector('#fifteen-message').textContent = `Solved in ${moves} moves!`; }
    }
    function move(index) {
      const empty = tiles.indexOf(0);
      if (Math.abs(Math.floor(index / 4) - Math.floor(empty / 4)) + Math.abs(index % 4 - empty % 4) !== 1) return;
      [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]]; moves++; document.querySelector('#fifteen-moves').textContent = `MOVES ${moves}`; draw();
    }
    draw(); document.querySelector('#score-caption').textContent = 'Tiles in correct place';
    return;
  }

  if (id === 'fruit-catcher') {
    const canvas = document.createElement('canvas'); canvas.width = 420; canvas.height = 260; canvas.className = 'game-canvas'; canvas.setAttribute('aria-label', 'Fruit catcher playfield');
    mount(`${stack}<div class="game-message" id="fruit-message">Catch fruit for 30 seconds. Move with ← →.</div><div id="fruit-holder"></div><div class="touch-controls" id="fruit-controls"><button id="fruit-left">←</button><button id="fruit-right">→</button></div></div>`);
    document.querySelector('#fruit-holder').append(canvas);
    const ctx = canvas.getContext('2d'); let basket = 210, fruit = [], done = false, frames = 0;
    function draw() {
      ctx.fillStyle = '#11131d'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#82d8b7'; ctx.fillRect(basket - 28, 230, 56, 13);
      fruit.forEach(item => { ctx.fillStyle = item.color; ctx.beginPath(); ctx.arc(item.x, item.y, 9, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = '#eee'; ctx.font = '12px monospace'; ctx.fillText(`SCORE ${gameScore}`, 10, 18);
    }
    function move(dx) { basket = Math.max(30, Math.min(390, basket + dx)); }
    document.querySelector('#fruit-left').addEventListener('click', () => move(-30)); document.querySelector('#fruit-right').addEventListener('click', () => move(30));
    keyControls((dx) => move(dx * 24));
    interval(() => {
      if (done) return;
      frames++; if (frames % 26 === 0) fruit.push({ x: 20 + Math.random() * 380, y: -8, color: ['#ff8294','#f2ca70','#8fd99f'][Math.floor(Math.random() * 3)] });
      fruit.forEach(item => { item.y += 3; if (item.y > 218 && item.y < 245 && Math.abs(item.x - basket) < 35) { item.caught = true; addScore(); beep(620, .04); } });
      fruit = fruit.filter(item => !item.caught && item.y < 270); draw();
    }, 35);
    const stop = countdown(30, () => { done = true; setStatus('Time is up'); document.querySelector('#fruit-message').textContent = `Time! You caught ${gameScore} fruit.`; });
    registerHandleCleanup(stop); draw(); document.querySelector('#score-caption').textContent = 'Fruit caught';
    return;
  }

  if (id === 'maze-runner') {
    const map = ['#########', '#...#...#', '#.#.#.#.#', '#.#...#.#', '#.#####.#', '#.......#', '###.#.###', '#.......#', '#########'];
    let player = { x: 1, y: 1 }, collected = new Set(), done = false;
    const stars = new Set();
    map.forEach((row, y) => [...row].forEach((cell, x) => { if (cell === '.' && !(x === 1 && y === 1) && !(x === 7 && y === 7)) stars.add(`${x},${y}`); }));
    mount(`${stack}<div class="game-message" id="maze-message">Collect all stars, then reach the green exit.</div><div id="maze-board" class="grid-board" style="gap:2px"></div><div class="touch-controls" id="maze-controls"></div></div>`);
    const board = document.querySelector('#maze-board'); board.style.gridTemplateColumns = 'repeat(9, 28px)';
    function draw() {
      board.innerHTML = '';
      map.forEach((row, y) => [...row].forEach((wall, x) => { const key = `${x},${y}`, cell = document.createElement('div'); cell.style.cssText = `width:28px;height:28px;display:grid;place-items:center;background:${wall === '#' ? '#39314f' : '#17151e'};color:#f5d477`; cell.textContent = player.x === x && player.y === y ? '🟣' : x === 7 && y === 7 ? '🏁' : stars.has(key) ? '✦' : ''; board.append(cell); }));
    }
    function move(dx, dy) {
      if (done) return;
      const x = player.x + dx, y = player.y + dy;
      if (map[y]?.[x] !== '#') { player = { x, y }; const key = `${x},${y}`; if (stars.delete(key)) addScore(); }
      if (player.x === 7 && player.y === 7 && !stars.size) { done = true; scoreTo(gameScore + 10); setStatus('Maze completed'); document.querySelector('#maze-message').textContent = 'All stars collected — you escaped the maze!'; }
      draw();
    }
    keyControls(move); arrows('#maze-controls', move); draw(); document.querySelector('#score-caption').textContent = 'Stars collected';
    return;
  }

  if (id === 'bubble-pop') {
    const size = 7, palette = ['🟣', '🟢', '🔵', '🟠']; let bubbles = Array.from({ length: size * size }, () => palette[Math.floor(Math.random() * palette.length)]);
    mount(`${stack}<div class="game-message" id="bubble-message">Select a group of two or more matching bubbles.</div><div id="bubble-board" class="grid-board" style="gap:3px"></div></div>`);
    const board = document.querySelector('#bubble-board'); board.style.gridTemplateColumns = `repeat(${size}, 40px)`;
    function group(index) {
      const symbol = bubbles[index]; if (!symbol) return [];
      const found = new Set([index]), queue = [index];
      while (queue.length) {
        const current = queue.pop(), x = current % size, y = Math.floor(current / size);
        [current - 1, current + 1, current - size, current + size].forEach(next => {
          if (next < 0 || next >= bubbles.length || found.has(next) || Math.abs(next % size - x) + Math.abs(Math.floor(next / size) - y) !== 1 || bubbles[next] !== symbol) return;
          found.add(next); queue.push(next);
        });
      }
      return [...found];
    }
    function draw() {
      board.innerHTML = '';
      bubbles.forEach((value, index) => { const btn = controlButton(value || '', () => pop(index), 'board-cell'); btn.style.cssText = 'width:40px;height:40px;font-size:19px'; btn.disabled = !value; board.append(btn); });
    }
    function pop(index) {
      const matched = group(index);
      if (matched.length < 2) { setStatus('Choose a larger group'); return; }
      matched.forEach(i => { bubbles[i] = ''; }); addScore(matched.length * 5);
      if (bubbles.every(value => !value)) { scoreTo(gameScore + 50); setStatus('Board cleared'); document.querySelector('#bubble-message').textContent = 'Every bubble popped!'; }
      else document.querySelector('#bubble-message').textContent = `${matched.length} bubbles popped. Find another group.`;
      draw();
    }
    draw(); document.querySelector('#score-caption').textContent = 'Points from bubbles';
    return;
  }

  if (id === 'number-sequence') {
    const rounds = [
      { seq: [2, 4, 6, 8], answer: 10 }, { seq: [3, 6, 12, 24], answer: 48 },
      { seq: [1, 4, 9, 16], answer: 25 }, { seq: [20, 17, 14, 11], answer: 8 },
      { seq: [2, 3, 5, 8, 13], answer: 21 }
    ];
    let round = 0, done = false;
    mount(`${stack}<div class="game-message" id="sequence-message">What number comes next?</div><div id="sequence-values" style="font-size:27px;font-weight:800;color:#d9c7ff"></div><form class="game-buttons" id="sequence-form"><input class="game-input" id="sequence-input" type="number" placeholder="Next number" required><button class="game-control">Answer</button></form><div class="game-label" id="sequence-round">ROUND 1 / ${rounds.length}</div></div>`);
    const show = () => { document.querySelector('#sequence-values').textContent = `${rounds[round].seq.join('  ·  ')}  ·  ?`; document.querySelector('#sequence-input').value = ''; };
    document.querySelector('#sequence-form').addEventListener('submit', event => {
      event.preventDefault(); if (done) return;
      if (Number(document.querySelector('#sequence-input').value) === rounds[round].answer) { addScore(1); document.querySelector('#sequence-message').textContent = 'Correct!'; }
      else document.querySelector('#sequence-message').textContent = `Not quite — the answer was ${rounds[round].answer}.`;
      round++;
      if (round === rounds.length) { done = true; setStatus('Quiz complete'); document.querySelector('#sequence-message').textContent = `Quiz complete — ${gameScore} correct!`; document.querySelector('#sequence-values').textContent = ''; document.querySelector('#sequence-input').disabled = true; document.querySelector('#sequence-form button').disabled = true; }
      else { document.querySelector('#sequence-round').textContent = `ROUND ${round + 1} / ${rounds.length}`; show(); }
    });
    show(); document.querySelector('#score-caption').textContent = 'Correct sequences';
    return;
  }

  if (id === 'dino-dash') {
    const canvas = document.createElement('canvas'); canvas.width = 460; canvas.height = 230; canvas.className = 'game-canvas'; canvas.setAttribute('aria-label', 'Dino Dash playfield');
    mount(`${stack}<div class="game-message" id="dino-message">Jump with Space, tap, or use the button.</div><div id="dino-holder"></div><button id="dino-jump" class="game-control">JUMP</button></div>`);
    document.querySelector('#dino-holder').append(canvas);
    const ctx = canvas.getContext('2d'); let y = 170, velocity = 0, obstacles = [], frame = 0, done = false;
    function jump() { if (y >= 169 && !done) velocity = -8; }
    function draw() {
      ctx.fillStyle = '#13151c'; ctx.fillRect(0, 0, 460, 230); ctx.fillStyle = '#81d88e'; ctx.fillRect(0, 195, 460, 2);
      ctx.fillStyle = '#a6e29e'; ctx.fillRect(55, y, 28, 27);
      ctx.fillStyle = '#f18b91'; obstacles.forEach(o => ctx.fillRect(o.x, 170, 15, 25));
      ctx.fillStyle = '#fff'; ctx.font = '12px monospace'; ctx.fillText(`SCORE ${gameScore}`, 10, 18);
    }
    const keydown = event => { if (event.code === 'Space') { event.preventDefault(); jump(); } };
    window.addEventListener('keydown', keydown); document.querySelector('#dino-jump').addEventListener('click', jump);
    canvas.addEventListener('pointerdown', jump);
    registerHandleCleanup(() => { window.removeEventListener('keydown', keydown); canvas.removeEventListener('pointerdown', jump); });
    interval(() => {
      if (done) return;
      frame++; if (frame % 58 === 0) obstacles.push({ x: 460 });
      velocity += .45; y = Math.min(170, y + velocity); if (y === 170) velocity = 0;
      obstacles.forEach(o => { o.x -= 4; if (!o.scored && o.x < 45) { o.scored = true; addScore(); } if (o.x < 80 && o.x + 15 > 55 && y > 145) { done = true; setStatus('Run ended'); document.querySelector('#dino-message').textContent = `Run over — you dodged ${gameScore} obstacles.`; } });
      obstacles = obstacles.filter(o => o.x > -20); draw();
    }, 30);
    draw(); document.querySelector('#score-caption').textContent = 'Obstacles dodged';
    return;
  }

  if (id === 'color-match') {
    const colors = [{ name: 'RED', hex: '#ee6878' }, { name: 'BLUE', hex: '#71a9ed' }, { name: 'GREEN', hex: '#69cf9c' }, { name: 'YELLOW', hex: '#e9c85d' }];
    let target, running = true;
    mount(`${stack}<div class="game-message" id="color-message">Tap the color named below. You have 30 seconds.</div><div id="color-target" style="font-size:34px;font-weight:900"></div><div id="color-options" class="game-buttons"></div></div>`);
    function next() {
      target = Math.floor(Math.random() * colors.length);
      const ink = colors[Math.floor(Math.random() * colors.length)];
      const title = document.querySelector('#color-target'); title.textContent = colors[target].name; title.style.color = ink.hex;
    }
    colors.forEach((color, index) => document.querySelector('#color-options').append(controlButton(color.name, () => {
      if (!running) return;
      if (index === target) { addScore(); setStatus('Correct color'); beep(640, .04); }
      else setStatus('Try the next one');
      next();
    })));
    next();
    const stop = countdown(30, () => { running = false; document.querySelectorAll('#color-options button').forEach(button => { button.disabled = true; }); setStatus('Time is up'); document.querySelector('#color-message').textContent = `Time! You matched ${gameScore} colors.`; });
    registerHandleCleanup(stop); document.querySelector('#score-caption').textContent = 'Colors matched';
    return;
  }

  if (id === 'blackjack') {
    let player = [], dealer = [], done = false;
    const handValue = cards => { let total = cards.reduce((sum, card) => sum + card.value, 0), aces = cards.filter(card => card.value === 11).length; while (total > 21 && aces) { total -= 10; aces--; } return total; };
    const card = () => { const value = 1 + Math.floor(Math.random() * 13); return { value: value === 1 ? 11 : Math.min(value, 10), label: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][value - 1] }; };
    mount(`${stack}<div class="game-message" id="blackjack-message">Try to beat the dealer without going over 21.</div><div id="blackjack-hands" style="text-align:center;line-height:2"></div><div class="game-buttons"><button id="blackjack-hit" class="game-control">Hit</button><button id="blackjack-stand" class="game-control">Stand</button></div></div>`);
    const hitButton = document.querySelector('#blackjack-hit'), standButton = document.querySelector('#blackjack-stand');
    function draw(reveal = false) {
      document.querySelector('#blackjack-hands').textContent = `YOU ${player.map(c => c.label).join('  ')} = ${handValue(player)}　 ·　 DEALER ${dealer.map((c, i) => i === 1 && !reveal ? '?' : c.label).join('  ')}${reveal ? ` = ${handValue(dealer)}` : ''}`;
    }
    function finish() {
      while (handValue(dealer) < 17) dealer.push(card());
      const p = handValue(player), d = handValue(dealer), win = p <= 21 && (d > 21 || p > d);
      done = true; hitButton.disabled = standButton.disabled = true;
      if (win) { addScore(1); setStatus('Hand won'); }
      else setStatus(p === d ? 'Push' : 'Dealer wins');
      document.querySelector('#blackjack-message').textContent = win ? 'You beat the dealer!' : p === d ? 'A push — same total.' : 'Dealer wins this hand.';
      draw(true);
    }
    player = [card(), card()]; dealer = [card(), card()]; draw();
    hitButton.addEventListener('click', () => { if (done) return; player.push(card()); draw(); if (handValue(player) > 21) { done = true; hitButton.disabled = standButton.disabled = true; setStatus('Bust'); document.querySelector('#blackjack-message').textContent = 'Bust — over 21.'; draw(true); } });
    standButton.addEventListener('click', () => { if (!done) finish(); });
    document.querySelector('#score-caption').textContent = 'Hands won';
    return;
  }

  if (id === 'treasure-hunt') {
    const size = 6, treasure = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) }; let tries = 0, found = false;
    mount(`${stack}<div class="game-message" id="treasure-message">Dig a tile. The clue tells you how close the treasure is.</div><div id="treasure-board" class="grid-board" style="gap:4px"></div><div class="game-label" id="treasure-tries">DIGS 0</div></div>`);
    const board = document.querySelector('#treasure-board'); board.style.gridTemplateColumns = `repeat(${size}, 42px)`;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const btn = controlButton('?', () => {
        if (found || btn.disabled) return;
        tries++; btn.disabled = true;
        const distance = Math.abs(x - treasure.x) + Math.abs(y - treasure.y);
        if (!distance) { found = true; btn.textContent = '💎'; scoreTo(Math.max(1, 37 - tries)); setStatus('Treasure found'); document.querySelector('#treasure-message').textContent = `Treasure found in ${tries} digs!`; }
        else { btn.textContent = distance < 3 ? '🔥' : distance < 6 ? '🌤' : '·'; setStatus(distance < 3 ? 'Very close' : distance < 6 ? 'Getting warmer' : 'Far away'); }
        document.querySelector('#treasure-tries').textContent = `DIGS ${tries}`;
      }, 'board-cell');
      btn.style.cssText = 'width:42px;height:42px'; board.append(btn);
    }
    document.querySelector('#score-caption').textContent = 'Points for finding treasure';
    return;
  }

  if (id === 'quick-draw') {
    let running = true;
    mount(`${stack}<div class="game-message" id="quick-message">Hit the target as many times as you can in 30 seconds.</div><div style="width:300px;height:180px;position:relative;background:#1a1822;border:1px solid #393443;border-radius:5px"><button id="quick-target" class="board-cell" type="button" aria-label="Hit target" style="position:absolute;width:58px;height:58px;border-radius:50%;font-size:26px;background:#743d57;color:#ffdce1">◎</button></div><div class="game-label">TARGETS HIT: <span id="quick-hits">0</span></div></div>`);
    const target = document.querySelector('#quick-target');
    function moveTarget() { target.style.left = `${Math.floor(Math.random() * 238)}px`; target.style.top = `${Math.floor(Math.random() * 118)}px`; }
    moveTarget();
    target.addEventListener('click', () => { if (!running) return; addScore(); document.querySelector('#quick-hits').textContent = gameScore; moveTarget(); beep(700, .04); });
    const stop = countdown(30, () => { running = false; target.disabled = true; setStatus('Time is up'); document.querySelector('#quick-message').textContent = `Time! You hit ${gameScore} targets.`; });
    registerHandleCleanup(stop); document.querySelector('#score-caption').textContent = 'Targets hit';
    return;
  }
}
