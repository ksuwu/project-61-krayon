function initBonusGame(id) {
  const shell = '<div class="game-stack">';
  const setMessage = (selector, text) => { document.querySelector(selector).textContent = text; };

  if (id === 'trivia-quiz') {
    const questions = [
      ['Which planet is known as the Red Planet?', ['Mars', 'Venus', 'Jupiter'], 0],
      ['How many sides does a hexagon have?', ['Five', 'Six', 'Eight'], 1],
      ['What is the largest ocean?', ['Atlantic', 'Indian', 'Pacific'], 2],
      ['Which animal is a mammal?', ['Shark', 'Dolphin', 'Trout'], 1],
      ['What is 9 × 7?', ['56', '63', '72'], 1]
    ];
    let question = 0, locked = false;
    mount(`${shell}<div class="game-message" id="trivia-question"></div><div id="trivia-options" class="game-buttons"></div><div class="game-label" id="trivia-progress"></div></div>`);
    function show() {
      locked = false;
      const [text, options] = questions[question];
      setMessage('#trivia-question', text);
      document.querySelector('#trivia-progress').textContent = `QUESTION ${question + 1} / ${questions.length}`;
      const buttons = document.querySelector('#trivia-options'); buttons.replaceChildren();
      options.forEach((option, index) => buttons.append(controlButton(option, () => {
        if (locked) return; locked = true;
        if (index === questions[question][2]) addScore();
        question++;
        if (question === questions.length) {
          setStatus('Quiz complete'); setMessage('#trivia-question', `Quiz complete — ${gameScore} correct answers!`);
          buttons.replaceChildren();
        } else timeout(show, 450);
      })));
    }
    show(); document.querySelector('#score-caption').textContent = 'Correct answers';
    return;
  }

  if (id === 'checkers') {
    const size = 8, board = Array.from({ length: size }, () => Array(size).fill(0));
    for (let y = 0; y < 3; y++) for (let x = 0; x < size; x++) if ((x + y) % 2) board[y][x] = 2;
    for (let y = 5; y < size; y++) for (let x = 0; x < size; x++) if ((x + y) % 2) board[y][x] = 1;
    let turn = 1, selected = null, finished = false;
    mount(`${shell}<div class="game-message" id="checkers-message">Dark moves first. Local two-player checkers.</div><div id="checkers-board" class="grid-board" style="gap:0"></div><div class="game-label">DARK CAPTURES EARN POINTS</div></div>`);
    const grid = document.querySelector('#checkers-board'); grid.style.gridTemplateColumns = `repeat(${size}, 36px)`;
    const teamOf = piece => piece === 1 || piece === 3 ? 1 : piece === 2 || piece === 4 ? 2 : 0;
    function movesFrom(y, x) {
      const piece = board[y][x], color = teamOf(piece), king = piece === 3 || piece === 4, out = [];
      if (!color) return out;
      const directions = king ? [-1, 1] : [color === 1 ? -1 : 1];
      for (const dy of directions) for (const dx of [-1, 1]) {
        const ny = y + dy, nx = x + dx;
        if (ny >= 0 && ny < size && nx >= 0 && nx < size && !board[ny][nx]) out.push([ny, nx, null]);
        const jy = y + 2 * dy, jx = x + 2 * dx;
        if (jy >= 0 && jy < size && jx >= 0 && jx < size && board[ny]?.[nx] && teamOf(board[ny][nx]) !== color && !board[jy][jx]) out.push([jy, jx, [ny, nx]]);
      }
      return out;
    }
    function draw() {
      grid.replaceChildren();
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const piece = board[y][x], btn = controlButton(piece ? (Math.abs(piece) === 1 ? '●' : '♛') : '', () => play(y, x), 'board-cell');
        btn.style.cssText = `width:36px;height:36px;border:0;border-radius:0;background:${(x + y) % 2 ? '#51445c' : '#dbd1c5'};color:${teamOf(piece) === 1 ? '#201b25' : '#a54757'};font-size:23px;${selected?.[0] === y && selected?.[1] === x ? 'box-shadow:inset 0 0 0 3px #8dddc1' : ''}`;
        grid.append(btn);
      }
      setMessage('#checkers-message', `${turn === 1 ? 'Dark' : 'Red'} to move · Dark captures: ${gameScore}`);
    }
    function play(y, x) {
      if (finished) return;
      if (selected) {
        const [sy, sx] = selected, move = movesFrom(sy, sx).find(([my, mx]) => my === y && mx === x);
        if (move) {
          const [ny, nx, captured] = move, piece = board[sy][sx]; board[sy][sx] = 0; board[ny][nx] = piece;
          if (captured) { board[captured[0]][captured[1]] = 0; if (turn === 1) addScore(); }
          if (ny === 0 && piece === 1) board[ny][nx] = 3;
          if (ny === size - 1 && piece === 2) board[ny][nx] = 4;
          turn = 3 - turn; selected = null;
          const remaining = board.flat().filter(p => teamOf(p) === turn).length;
          if (!remaining) { finished = true; setStatus(`${turn === 1 ? 'Red' : 'Dark'} wins`); }
          draw(); return;
        }
      }
      selected = teamOf(board[y][x]) === turn ? [y, x] : null;
      draw();
    }
    draw(); document.querySelector('#score-caption').textContent = 'Dark captures';
    return;
  }

  if (id === 'typing-race') {
    const words = ['planet', 'quick', 'garden', 'bright', 'puzzle', 'silver', 'rocket', 'window', 'memory', 'victory'];
    let index = 0, done = false;
    mount(`${shell}<div class="game-message" id="typing-race-message">Type each word exactly, then press Enter.</div><div id="typing-race-word" style="font-size:32px;font-weight:800;color:#d4c3ff"></div><form id="typing-race-form" class="game-buttons"><input id="typing-race-input" class="game-input" autocomplete="off" placeholder="Type the word" required><button class="game-control">Next</button></form><div class="game-label" id="typing-race-progress"></div></div>`);
    const input = document.querySelector('#typing-race-input');
    const show = () => { document.querySelector('#typing-race-word').textContent = words[index]; document.querySelector('#typing-race-progress').textContent = `WORD ${index + 1} / ${words.length}`; input.value = ''; input.focus(); };
    document.querySelector('#typing-race-form').addEventListener('submit', event => {
      event.preventDefault(); if (done) return;
      if (input.value.trim().toLowerCase() !== words[index]) { setMessage('#typing-race-message', 'Not quite — try that word again.'); return; }
      addScore(words[index].length); index++;
      if (index === words.length) { done = true; setStatus('Race finished'); setMessage('#typing-race-message', `Finish! You earned ${gameScore} points.`); input.disabled = true; document.querySelector('#typing-race-form button').disabled = true; }
      else { setMessage('#typing-race-message', 'Nice! Next word:'); show(); }
    });
    show(); document.querySelector('#score-caption').textContent = 'Correct letters typed';
    return;
  }

  if (id === 'match-three') {
    const size = 6, gems = ['🔴', '🔵', '🟢', '🟡', '🟣']; let selected = -1;
    let board = Array.from({ length: size * size }, () => gems[Math.floor(Math.random() * gems.length)]);
    function matches() {
      const found = new Set();
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const i = y * size + x, value = board[i]; if (!value) continue;
        if (x < size - 2 && board[i + 1] === value && board[i + 2] === value) { let j = x; while (j < size && board[y * size + j] === value) found.add(y * size + j++); }
        if (y < size - 2 && board[i + size] === value && board[i + size * 2] === value) { let j = y; while (j < size && board[j * size + x] === value) found.add(j++ * size + x); }
      }
      return [...found];
    }
    while (matches().length) matches().forEach(i => { board[i] = gems[Math.floor(Math.random() * gems.length)]; });
    mount(`${shell}<div class="game-message" id="match-three-message">Select two neighboring gems to swap.</div><div id="match-three-board" class="grid-board" style="gap:3px"></div></div>`);
    const grid = document.querySelector('#match-three-board'); grid.style.gridTemplateColumns = `repeat(${size}, 42px)`;
    function draw() {
      grid.replaceChildren();
      board.forEach((gem, i) => { const btn = controlButton(gem || '', () => choose(i), 'board-cell'); btn.style.cssText = `width:42px;height:42px;font-size:19px;${selected === i ? 'box-shadow:inset 0 0 0 2px #fff' : ''}`; btn.disabled = !gem; grid.append(btn); });
    }
    function choose(i) {
      if (selected < 0) { selected = i; draw(); return; }
      if (selected === i) { selected = -1; draw(); return; }
      const a = selected, adjacent = Math.abs(a % size - i % size) + Math.abs(Math.floor(a / size) - Math.floor(i / size)) === 1;
      if (!adjacent) { selected = i; draw(); return; }
      [board[a], board[i]] = [board[i], board[a]]; selected = -1;
      const matched = matches();
      if (!matched.length) { [board[a], board[i]] = [board[i], board[a]]; setStatus('That swap makes no match'); }
      else {
        addScore(matched.length * 10);
        matched.forEach(index => { board[index] = ''; });
        for (let x = 0; x < size; x++) { const values = []; for (let y = size - 1; y >= 0; y--) if (board[y * size + x]) values.push(board[y * size + x]); while (values.length < size) values.push(gems[Math.floor(Math.random() * gems.length)]); for (let y = size - 1; y >= 0; y--) board[y * size + x] = values[size - 1 - y]; }
        setStatus(`${matched.length} gems matched`);
      }
      draw();
    }
    draw(); document.querySelector('#score-caption').textContent = 'Points from matched gems';
    return;
  }

  if (id === 'color-flood') {
    const size = 9, colors = ['#e87983', '#e3bd62', '#70ca9d', '#72b8df', '#a88be6'];
    let board = Array.from({ length: size * size }, () => Math.floor(Math.random() * colors.length)), moves = 20;
    mount(`${shell}<div class="game-message" id="flood-message">Choose colors to flood the board from the top-left.</div><div id="flood-board" class="grid-board" style="gap:2px"></div><div class="game-buttons" id="flood-colors"></div><div class="game-label" id="flood-moves"></div></div>`);
    const grid = document.querySelector('#flood-board'), controls = document.querySelector('#flood-colors'); grid.style.gridTemplateColumns = `repeat(${size}, 27px)`;
    colors.forEach((color, i) => { const button = controlButton('●', () => flood(i), 'board-cell'); button.style.cssText = `width:28px;height:28px;color:${color};font-size:20px`; controls.append(button); });
    function region() {
      const found = new Set([0]), queue = [0], color = board[0];
      while (queue.length) { const i = queue.pop(), x = i % size, y = Math.floor(i / size); [i - 1, i + 1, i - size, i + size].forEach(n => { if (n < 0 || n >= board.length || found.has(n) || Math.abs(n % size - x) + Math.abs(Math.floor(n / size) - y) !== 1 || board[n] !== color) return; found.add(n); queue.push(n); }); }
      return found;
    }
    function draw() {
      grid.replaceChildren(); board.forEach((color, i) => { const cell = document.createElement('span'); cell.style.cssText = `width:27px;height:27px;background:${colors[color]};border-radius:3px`; cell.setAttribute('aria-label', `Tile ${i + 1}`); grid.append(cell); });
      document.querySelector('#flood-moves').textContent = `MOVES LEFT ${moves} · REGION ${region().size}/${board.length}`;
    }
    function flood(color) {
      if (moves <= 0 || color === board[0]) return;
      const current = region(); current.forEach(i => { board[i] = color; }); moves--; scoreTo(current.size);
      if (region().size === board.length) { scoreTo(board.length); setStatus('Board flooded'); setMessage('#flood-message', 'The whole board is yours!'); }
      else if (!moves) { setStatus('No moves left'); setMessage('#flood-message', `Out of moves — you claimed ${region().size} tiles.`); }
      draw();
    }
    draw(); document.querySelector('#score-caption').textContent = 'Tiles claimed';
    return;
  }

  if (id === 'color-lines') {
    const size = 7, colors = ['🔴', '🟡', '🔵', '🟢', '🟣', '🟠']; let board = Array(size * size).fill(''), selected = -1;
    function spawn(count = 3) { for (let n = 0; n < count; n++) { const empty = board.map((v, i) => v ? -1 : i).filter(i => i >= 0); if (!empty.length) return; board[empty[Math.floor(Math.random() * empty.length)]] = colors[Math.floor(Math.random() * colors.length)]; } }
    mount(`${shell}<div class="game-message" id="lines-message">Move an orb. A line of five or more scores points.</div><div id="lines-board" class="grid-board" style="gap:3px"></div></div>`);
    const grid = document.querySelector('#lines-board'); grid.style.gridTemplateColumns = `repeat(${size}, 39px)`;
    function lineAt(index) {
      const color = board[index]; if (!color) return [];
      const x = index % size, y = Math.floor(index / size), all = new Set();
      for (const [dx, dy] of [[1,0],[0,1],[1,1],[1,-1]]) {
        const line = [index];
        for (const sign of [-1, 1]) { let nx = x + dx * sign, ny = y + dy * sign; while (nx >= 0 && nx < size && ny >= 0 && ny < size && board[ny * size + nx] === color) { line.push(ny * size + nx); nx += dx * sign; ny += dy * sign; } }
        if (line.length >= 5) line.forEach(i => all.add(i));
      }
      return [...all];
    }
    function pathExists(from, to) {
      const seen = new Set([from]), queue = [from];
      while (queue.length) { const i = queue.shift(); if (i === to) return true; const x = i % size, y = Math.floor(i / size); [i - 1, i + 1, i - size, i + size].forEach(n => { if (n < 0 || n >= board.length || Math.abs(n % size - x) + Math.abs(Math.floor(n / size) - y) !== 1 || seen.has(n) || board[n]) return; seen.add(n); queue.push(n); }); }
      return false;
    }
    function draw() { grid.replaceChildren(); board.forEach((v, i) => { const b = controlButton(v || '', () => click(i), 'board-cell'); b.style.cssText = `width:39px;height:39px;font-size:19px;${selected === i ? 'box-shadow:inset 0 0 0 2px #fff' : ''}`; grid.append(b); }); }
    function click(i) {
      if (board[i]) { selected = i; draw(); return; }
      if (selected < 0 || !pathExists(selected, i)) { setStatus('Choose a reachable empty square'); return; }
      board[i] = board[selected]; board[selected] = ''; selected = -1;
      let line = lineAt(i);
      if (line.length) { line.forEach(n => { board[n] = ''; }); addScore(line.length * 10); }
      else { spawn(); for (let n = 0; n < board.length; n++) { line = lineAt(n); if (line.length) { line.forEach(j => { board[j] = ''; }); addScore(line.length * 10); break; } } }
      draw();
    }
    spawn(5); draw(); document.querySelector('#score-caption').textContent = 'Points from cleared lines';
    return;
  }

  if (id === 'rocket-launch') {
    let position = 0, direction = 1, rounds = 0, running = true;
    mount(`${shell}<div class="game-message" id="rocket-message">Launch when the marker reaches the green zone.</div><div style="width:min(100%,360px);height:34px;background:#282431;border-radius:4px;position:relative;overflow:hidden"><span style="position:absolute;left:45%;width:10%;height:100%;background:#286d53"></span><span id="rocket-marker" style="position:absolute;top:0;width:5px;height:100%;background:#fff"></span></div><button id="rocket-launch" class="game-control">LAUNCH</button><div class="game-label" id="rocket-progress">LAUNCH 1 / 10</div></div>`);
    const marker = document.querySelector('#rocket-marker');
    interval(() => { if (!running) return; position += direction * 2.5; if (position >= 100 || position <= 0) direction *= -1; marker.style.left = `${Math.max(0, Math.min(98, position))}%`; }, 35);
    document.querySelector('#rocket-launch').addEventListener('click', () => {
      if (!running) return;
      rounds++; const hit = position >= 43 && position <= 57;
      if (hit) { addScore(10); beep(760, .06); setStatus('Perfect launch'); }
      else setStatus('Missed the target zone');
      if (rounds === 10) { running = false; setMessage('#rocket-message', `Launch sequence complete — ${gameScore} points.`); }
      document.querySelector('#rocket-progress').textContent = `LAUNCH ${Math.min(rounds + 1, 10)} / 10`;
    });
    document.querySelector('#score-caption').textContent = 'Launch points';
    return;
  }

  if (id === 'basketball-shot') {
    let position = 0, direction = 1, shots = 0, running = true;
    mount(`${shell}<div class="game-message" id="basket-message">Shoot when the hoop is inside the highlighted lane.</div><div style="position:relative;width:min(100%,340px);height:70px;background:#211e2c;border-radius:5px"><span style="position:absolute;left:44%;width:12%;height:100%;background:#2c634f;opacity:.65"></span><span id="basket-hoop" style="position:absolute;top:19px;width:32px;height:32px;border:4px solid #f1a46e;border-radius:50%"></span></div><button id="basket-shoot" class="game-control">SHOOT</button><div class="game-label" id="basket-round">SHOT 1 / 10</div></div>`);
    const hoop = document.querySelector('#basket-hoop');
    interval(() => { if (!running) return; position += direction * 2; if (position >= 90 || position <= 0) direction *= -1; hoop.style.left = `${position}%`; }, 35);
    document.querySelector('#basket-shoot').addEventListener('click', () => {
      if (!running) return;
      shots++; const made = position >= 44 && position <= 56;
      if (made) { addScore(2); setStatus('Basket!'); beep(680, .06); } else setStatus('Shot missed');
      if (shots === 10) { running = false; setMessage('#basket-message', `Final score: ${gameScore} points.`); }
      document.querySelector('#basket-round').textContent = `SHOT ${Math.min(shots + 1, 10)} / 10`;
    });
    document.querySelector('#score-caption').textContent = 'Points from baskets';
    return;
  }

  if (id === 'coin-flip') {
    let turns = 0, locked = false;
    mount(`${shell}<div class="game-message" id="coin-message">Call the flip. Correct calls add a point.</div><div id="coin-face" style="font-size:76px">🪙</div><div class="game-buttons" id="coin-buttons"></div><div class="game-label" id="coin-turns">FLIP 1 / 10</div></div>`);
    ['Heads', 'Tails'].forEach(choice => document.querySelector('#coin-buttons').append(controlButton(choice, () => {
      if (locked) return; locked = true; turns++;
      const result = Math.random() < .5 ? 'Heads' : 'Tails', correct = choice === result;
      if (correct) addScore();
      document.querySelector('#coin-face').textContent = result === 'Heads' ? '🪙' : '🔄';
      setMessage('#coin-message', `${result}! ${correct ? 'Good call!' : 'Not this time.'}`);
      if (turns === 10) { setStatus('Flips complete'); document.querySelector('#coin-buttons').replaceChildren(); setMessage('#coin-message', `Game over — ${gameScore} correct calls.`); }
      else timeout(() => { locked = false; document.querySelector('#coin-turns').textContent = `FLIP ${turns + 1} / 10`; }, 600);
    })));
    document.querySelector('#score-caption').textContent = 'Correct calls';
    return;
  }

  if (id === 'safe-cracker') {
    const code = String(100 + Math.floor(Math.random() * 900)); let attempts = 0, done = false;
    mount(`${shell}<div class="game-message" id="safe-message">Guess the three-digit code in eight tries.</div><form id="safe-form" class="game-buttons"><input id="safe-input" class="game-input" type="number" min="100" max="999" placeholder="Three digits" required><button class="game-control">Try code</button></form><div class="game-label" id="safe-attempts">TRIES 8</div><div id="safe-history" style="display:grid;gap:4px"></div></div>`);
    const input = document.querySelector('#safe-input'), history = document.querySelector('#safe-history');
    document.querySelector('#safe-form').addEventListener('submit', event => {
      event.preventDefault(); if (done) return;
      const guess = input.value; if (!/^[0-9]{3}$/.test(guess)) return;
      attempts++;
      const exact = [...guess].filter((digit, i) => digit === code[i]).length;
      const row = document.createElement('div'); row.className = 'game-label'; row.textContent = `${guess} — ${exact} digit${exact === 1 ? '' : 's'} in the right place`; history.prepend(row);
      if (guess === code) { done = true; scoreTo(9 - attempts); setStatus('Safe cracked'); setMessage('#safe-message', `Safe opened in ${attempts} tries!`); }
      else if (attempts === 8) { done = true; setStatus('Safe stayed locked'); setMessage('#safe-message', `Out of tries — the code was ${code}.`); }
      document.querySelector('#safe-attempts').textContent = `TRIES ${Math.max(8 - attempts, 0)}`;
      input.value = ''; input.disabled = done;
    });
    document.querySelector('#score-caption').textContent = 'Points for cracking the safe';
    return;
  }

  if (id === 'word-ladder') {
    const path = ['CAT', 'COT', 'DOT', 'DOG']; let step = 0, done = false;
    mount(`${shell}<div class="game-message" id="ladder-message">Change one letter at a time to turn CAT into DOG.</div><div class="game-label">START: CAT　·　FINISH: DOG</div><form id="ladder-form" class="game-buttons"><input id="ladder-input" class="game-input" maxlength="3" autocomplete="off" placeholder="Next word" required><button class="game-control">Step</button></form><div id="ladder-steps" class="game-buttons"></div></div>`);
    const input = document.querySelector('#ladder-input'), steps = document.querySelector('#ladder-steps');
    steps.append(document.createElement('span')); steps.firstChild.textContent = 'CAT';
    document.querySelector('#ladder-form').addEventListener('submit', event => {
      event.preventDefault(); if (done) return;
      const word = input.value.trim().toUpperCase(), previous = path[step];
      if (word !== path[step + 1] || [...word].filter((letter, i) => letter !== previous[i]).length !== 1) { setMessage('#ladder-message', 'Try a real word that changes only one letter.'); return; }
      step++; addScore(); const chip = document.createElement('span'); chip.className = 'game-control'; chip.textContent = word; steps.append(chip); input.value = '';
      if (word === 'DOG') { done = true; scoreTo(gameScore + 3); setStatus('Ladder complete'); setMessage('#ladder-message', `You made the ladder in ${step} steps!`); input.disabled = true; }
      else setMessage('#ladder-message', 'Good step. Keep going!');
    });
    document.querySelector('#score-caption').textContent = 'Valid ladder steps';
    return;
  }

  if (id === 'spot-difference') {
    const size = 5, differences = new Set([2, 8, 14, 17, 23]), found = new Set();
    mount(`${shell}<div class="game-message" id="difference-message">Find the five different cells in the right grid.</div><div style="display:flex;gap:12px"><div><div class="game-label">LEFT</div><div id="difference-left" class="grid-board" style="gap:2px"></div></div><div><div class="game-label">RIGHT</div><div id="difference-right" class="grid-board" style="gap:2px"></div></div></div></div>`);
    const left = document.querySelector('#difference-left'), right = document.querySelector('#difference-right');
    left.style.gridTemplateColumns = right.style.gridTemplateColumns = `repeat(${size}, 28px)`;
    for (let i = 0; i < size * size; i++) {
      const a = document.createElement('span'), b = controlButton('', () => {
        if (differences.has(i)) { if (!found.has(i)) { found.add(i); addScore(); b.textContent = '✦'; b.disabled = true; } }
        else { b.textContent = '×'; b.disabled = true; }
        if (found.size === differences.size) { scoreTo(10); setStatus('Differences found'); setMessage('#difference-message', 'All five differences found!'); }
      }, 'board-cell');
      a.style.cssText = b.style.cssText = 'width:28px;height:28px;border-radius:2px;background:#302a3c;color:#ded6ef;font-size:15px';
      a.textContent = differences.has(i) ? '●' : '◆'; b.textContent = differences.has(i) ? '◆' : '◆';
      left.append(a); right.append(b);
    }
    document.querySelector('#score-caption').textContent = 'Differences found';
    return;
  }

  if (id === 'golf-putt') {
    const distances = [70, 125, 95]; let hole = 0;
    mount(`${shell}<div class="game-message" id="golf-message">Set power close to the distance, then putt.</div><div id="golf-distance" style="font-size:25px;font-weight:800;color:#a8e0b0"></div><input id="golf-power" type="range" min="20" max="180" value="80" aria-label="Putt power"><div class="game-label" id="golf-progress"></div><button id="golf-putt" class="game-control">PUTT</button></div>`);
    const show = () => { document.querySelector('#golf-distance').textContent = `HOLE DISTANCE ${distances[hole]}`; document.querySelector('#golf-progress').textContent = `HOLE ${hole + 1} / ${distances.length} · SCORE ${gameScore}`; };
    document.querySelector('#golf-putt').addEventListener('click', () => {
      if (hole >= distances.length) return;
      const power = Number(document.querySelector('#golf-power').value), hit = Math.abs(power - distances[hole]) <= 15;
      if (hit) { addScore(10); setStatus('Putt sunk'); setMessage('#golf-message', 'In the hole! Nice putt.'); } else { setStatus('Putt missed'); setMessage('#golf-message', `Missed — power was ${power}, distance was ${distances[hole]}.`); }
      hole++;
      if (hole === distances.length) { setStatus('Round complete'); document.querySelector('#golf-putt').disabled = true; document.querySelector('#golf-distance').textContent = 'ROUND COMPLETE'; }
      else show();
    });
    show(); document.querySelector('#score-caption').textContent = 'Points from sunk putts';
    return;
  }

  if (id === 'pinball') {
    const canvas = document.createElement('canvas'); canvas.width = 360; canvas.height = 300; canvas.className = 'game-canvas'; canvas.setAttribute('aria-label', 'Pinball table');
    mount(`${shell}<div class="game-message" id="pinball-message">Press Launch, then flip when the ball nears the flippers.</div><div id="pinball-holder"></div><div class="game-buttons"><button id="pinball-launch" class="game-control">LAUNCH</button><button id="pinball-flip" class="game-control">FLIP</button></div><div class="game-label" id="pinball-balls">BALLS 3</div></div>`);
    document.querySelector('#pinball-holder').append(canvas);
    const ctx = canvas.getContext('2d'); let ball = null, balls = 3, frame = 0, ready = true;
    function draw() {
      ctx.fillStyle = '#17131f'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#9876c5'; ctx.lineWidth = 3; ctx.strokeRect(20, 10, 320, 280);
      ctx.fillStyle = '#efc86c'; [[95,90],[260,90],[180,155]].forEach(([x,y]) => { ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = '#9b86eb'; ctx.fillRect(65, 265, 90, 8); ctx.fillRect(205, 265, 90, 8);
      if (ball) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ball.x, ball.y, 7, 0, Math.PI * 2); ctx.fill(); }
    }
    document.querySelector('#pinball-launch').addEventListener('click', () => { if (!ready || balls <= 0) return; ready = false; ball = { x: 180, y: 30, vx: (Math.random() - .5) * 4, vy: 2 }; });
    document.querySelector('#pinball-flip').addEventListener('click', () => {
      if (!ball || ball.y < 225) return;
      addScore(10); ball.vy = -5; ball.vx = (Math.random() - .5) * 6; setStatus('Flipper hit'); beep(700, .05);
    });
    interval(() => {
      frame++;
      if (ball) {
        ball.x += ball.vx; ball.y += ball.vy; ball.vy += .12;
        if (ball.x < 30 || ball.x > 330) ball.vx *= -1;
        if (ball.y > 290) { ball = null; balls--; ready = true; document.querySelector('#pinball-balls').textContent = `BALLS ${balls}`; if (!balls) { setStatus('Game over'); setMessage('#pinball-message', `Game over — ${gameScore} points.`); } }
        if (ball && frame % 36 === 0) { addScore(1); beep(560, .03); }
      }
      draw();
    }, 30);
    document.querySelector('#score-caption').textContent = 'Pinball points';
    return;
  }

  if (id === 'air-hockey') {
    let position = 0, direction = 1, shots = 0, running = true;
    mount(`${shell}<div class="game-message" id="hockey-message">Shoot when the puck reaches the opponent’s goal zone.</div><div style="width:min(100%,360px);height:120px;position:relative;background:#285c58;border:3px solid #d5f1e7;border-radius:8px;overflow:hidden"><div style="position:absolute;left:44%;width:12%;height:100%;border:2px solid rgba(255,255,255,.55)"></div><span id="hockey-puck" style="position:absolute;top:43px;width:30px;height:30px;border-radius:50%;background:#f4f0e9"></span></div><button id="hockey-hit" class="game-control">HIT PUCK</button><div class="game-label" id="hockey-round">SHOTS 0 / 10</div></div>`);
    const puck = document.querySelector('#hockey-puck');
    interval(() => { if (!running) return; position += direction * 2.4; if (position >= 90 || position <= 0) direction *= -1; puck.style.left = `${position}%`; }, 30);
    document.querySelector('#hockey-hit').addEventListener('click', () => {
      if (!running) return;
      shots++; if (position >= 44 && position <= 56) { addScore(2); setStatus('Goal!'); } else setStatus('Saved by the goalie');
      if (shots === 10) { running = false; setMessage('#hockey-message', `Match over — ${gameScore} points.`); }
      document.querySelector('#hockey-round').textContent = `SHOTS ${shots} / 10`;
    });
    document.querySelector('#score-caption').textContent = 'Goals scored';
    return;
  }

  if (id === 'tower-defense') {
    const width = 7, height = 5, pathRow = 2; let towers = new Set(), creeps = [], tick = 0, spawned = 0, kills = 0, lives = 3, done = false;
    mount(`${shell}<div class="game-message" id="tower-message">Place towers off the road. Stop ten creeps before they escape.</div><div id="tower-board" class="grid-board" style="gap:3px"></div><div class="game-label" id="tower-status">LIVES 3 · KILLS 0 / 10</div></div>`);
    const grid = document.querySelector('#tower-board'); grid.style.gridTemplateColumns = `repeat(${width}, 42px)`;
    function draw() {
      grid.replaceChildren();
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        const key = `${x},${y}`, creep = creeps.find(c => c.x === x);
        const btn = controlButton(towers.has(key) ? '🏰' : y === pathRow ? (creep ? '👾' : '·') : '', () => {
          if (done || y === pathRow || towers.has(key)) return;
          towers.add(key); draw();
        }, 'board-cell');
        btn.style.cssText = `width:42px;height:42px;background:${y === pathRow ? '#564538' : '#252831'};font-size:18px`; grid.append(btn);
      }
      document.querySelector('#tower-status').textContent = `LIVES ${lives} · KILLS ${kills} / 10`;
    }
    interval(() => {
      if (done) return; tick++;
      if (spawned < 10 && tick % 5 === 1) { creeps.push({ x: 0 }); spawned++; }
      creeps = creeps.filter(creep => {
        const guarded = [...towers].some(key => { const [x, y] = key.split(',').map(Number); return Math.abs(x - creep.x) <= 1 && Math.abs(y - pathRow) === 1; });
        if (guarded && tick % 2 === 0) { kills++; addScore(10); return false; }
        creep.x++;
        if (creep.x >= width) { lives--; return false; }
        return true;
      });
      if (!lives || (kills >= 10 && !creeps.length)) { done = true; setStatus(lives ? 'Wave defended' : 'Base overrun'); setMessage('#tower-message', lives ? 'All creeps defeated — well defended!' : 'The creeps got through. Restart to try again.'); }
      draw();
    }, 500);
    draw(); document.querySelector('#score-caption').textContent = 'Points from defeated creeps';
    return;
  }

  if (id === 'penguin-slide') {
    const size = 7, walls = new Set();
    for (let i = 0; i < size; i++) { walls.add(`${i},0`); walls.add(`${i},6`); walls.add(`0,${i}`); walls.add(`6,${i}`); }
    [[3,1],[3,2],[3,4],[3,5]].forEach(([x,y]) => walls.add(`${x},${y}`));
    let player = { x: 1, y: 1 }, fish = new Set(['5,1','1,5','5,5']), done = false;
    mount(`${shell}<div class="game-message" id="penguin-message">Slide until a wall stops you. Collect the fish, then reach the exit.</div><div id="penguin-board" class="grid-board" style="gap:3px"></div><div class="touch-controls" id="penguin-controls"></div></div>`);
    const grid = document.querySelector('#penguin-board'); grid.style.gridTemplateColumns = `repeat(${size}, 38px)`;
    function draw() { grid.replaceChildren(); for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) { const key = `${x},${y}`, cell = document.createElement('div'); cell.style.cssText = `width:38px;height:38px;display:grid;place-items:center;background:${walls.has(key) ? '#39465a' : '#233443'};font-size:19px`; cell.textContent = player.x === x && player.y === y ? '🐧' : x === 2 && y === 5 ? '🚪' : fish.has(key) ? '🐟' : ''; grid.append(cell); } }
    function move(dx, dy) {
      if (done) return;
      let x = player.x, y = player.y;
      while (!walls.has(`${x + dx},${y + dy}`)) { x += dx; y += dy; }
      player = { x, y };
      if (fish.delete(`${x},${y}`)) addScore(5);
      if (x === 2 && y === 5 && !fish.size) { done = true; scoreTo(gameScore + 10); setStatus('Penguin escaped'); setMessage('#penguin-message', 'All fish collected — you made it out!'); }
      draw();
    }
    const buttons = document.querySelector('#penguin-controls');
    [[0,-1,'↑'],[-1,0,'←'],[0,1,'↓'],[1,0,'→']].forEach(([dx,dy,label]) => buttons.append(controlButton(label, () => move(dx,dy))));
    const keydown = event => { const map = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0] }; if (map[event.key]) { event.preventDefault(); move(...map[event.key]); } };
    window.addEventListener('keydown', keydown); registerHandleCleanup(() => window.removeEventListener('keydown', keydown));
    draw(); document.querySelector('#score-caption').textContent = 'Fish collected';
    return;
  }

  if (id === 'bottle-flip') {
    let angle = 0, velocity = 0, flips = 0, running = true;
    mount(`${shell}<div class="game-message" id="bottle-message">Launch, then tap when the bottle is almost upright.</div><div style="height:150px;display:grid;place-items:center"><span id="bottle" style="font-size:66px;display:inline-block">🧴</span></div><button id="bottle-launch" class="game-control">FLIP</button><div class="game-label" id="bottle-count">FLIPS 0 / 10</div></div>`);
    const bottle = document.querySelector('#bottle');
    interval(() => { if (!running) return; if (velocity) { angle += velocity; velocity *= .96; if (Math.abs(velocity) < .7) velocity = 0; bottle.style.transform = `rotate(${angle}deg)`; } }, 30);
    document.querySelector('#bottle-launch').addEventListener('click', () => {
      if (!running) return;
      if (velocity) {
        flips++;
        const upright = Math.min(Math.abs(angle % 360), 360 - Math.abs(angle % 360)) < 22;
        if (upright) { addScore(2); setStatus('Clean landing'); } else setStatus('Bottle tipped over');
        velocity = 0; angle = upright ? 0 : 90; bottle.style.transform = `rotate(${angle}deg)`;
      } else velocity = 21 + Math.random() * 10;
      if (flips >= 10) { running = false; setMessage('#bottle-message', `Challenge complete — ${gameScore} points.`); }
      document.querySelector('#bottle-count').textContent = `FLIPS ${flips} / 10`;
    });
    document.querySelector('#score-caption').textContent = 'Successful landings';
    return;
  }

  if (id === 'word-search') {
    const words = ['MINT', 'STAR', 'MOON', 'PLAY']; let round = 0, position = 0, done = false;
    const size = 7, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; let letters = Array(size * size).fill('').map(() => alphabet[Math.floor(Math.random() * alphabet.length)]), start = 0, row = 0;
    function placeWord() { const word = words[round]; row = 1 + Math.floor(Math.random() * 5); start = Math.floor(Math.random() * (size - word.length + 1)); [...word].forEach((letter, i) => { letters[row * size + start + i] = letter; }); position = 0; }
    mount(`${shell}<div class="game-message" id="word-search-message">Click the letters of the target word in order.</div><div id="word-search-target" style="font-size:25px;font-weight:800;color:#a9e3ca"></div><div id="word-search-board" class="grid-board" style="gap:3px"></div></div>`);
    const grid = document.querySelector('#word-search-board'); grid.style.gridTemplateColumns = `repeat(${size}, 37px)`;
    function draw() {
      grid.replaceChildren();
      letters.forEach((letter, i) => { const btn = controlButton(letter, () => {
        if (done || i !== row * size + start + position || letter !== words[round][position]) { setStatus('Not that letter — keep looking'); return; }
        addScore(); position++; btn.disabled = true; btn.style.background = '#28674f';
        if (position === words[round].length) {
          round++;
          if (round === words.length) { done = true; setStatus('All words found'); setMessage('#word-search-message', 'All hidden words found!'); document.querySelector('#word-search-target').textContent = ''; }
          else { setMessage('#word-search-message', 'Word found! Find the next one.'); placeWord(); document.querySelector('#word-search-target').textContent = words[round]; draw(); }
        }
      }, 'board-cell'); btn.style.cssText = 'width:37px;height:37px;font-size:14px'; grid.append(btn); });
    }
    placeWord(); document.querySelector('#word-search-target').textContent = words[round]; draw(); document.querySelector('#score-caption').textContent = 'Letters found';
    return;
  }

  if (id === 'connect-dots') {
    const points = [0, 3, 5, 6, 9, 10, 12, 13, 14, 15]; let next = 0, done = false;
    mount(`${shell}<div class="game-message" id="dots-message">Connect dots 1 through 10 in order.</div><div id="dots-board" class="grid-board" style="gap:8px"></div><div class="game-label" id="dots-progress">NEXT DOT 1 / 10</div></div>`);
    const grid = document.querySelector('#dots-board'); grid.style.gridTemplateColumns = 'repeat(4, 58px)';
    for (let i = 0; i < 16; i++) {
      const order = points.indexOf(i), button = controlButton(order >= 0 ? String(order + 1) : '·', () => {
        if (done || order < 0) return;
        if (order === next) { next++; addScore(); button.style.background = '#34735b'; setStatus('Connected'); }
        else { setStatus('Connect the next number'); return; }
        document.querySelector('#dots-progress').textContent = `NEXT DOT ${Math.min(next + 1, 10)} / 10`;
        if (next === points.length) { done = true; scoreTo(10); setStatus('Path complete'); setMessage('#dots-message', 'You connected the whole path!'); }
      }, 'board-cell');
      button.style.cssText = `width:58px;height:58px;font-size:${order >= 0 ? 20 : 13}px;color:${order >= 0 ? '#e2d5ff' : '#625d6b'}`; grid.append(button);
    }
    document.querySelector('#score-caption').textContent = 'Dots connected';
    return;
  }
}
