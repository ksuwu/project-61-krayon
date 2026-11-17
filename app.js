const games = [];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#game-grid');
  if (grid) {
    grid.innerHTML = '';
    grid.setAttribute('aria-live', 'polite');
  }

  const emptyState = document.querySelector('#empty-state');
  if (emptyState) {
    emptyState.hidden = false;
    emptyState.innerHTML = '<span>◌</span><h3>No games available</h3><p>The arcade is currently empty.</p>';
  }

  document.querySelectorAll('.category-tab').forEach(button => {
    button.disabled = true;
    button.classList.toggle('active', button.dataset.filter === 'All');
  });

  document.querySelectorAll('#result-count, .hero-count, #game-footer-count').forEach(element => {
    if (element) element.textContent = '0';
  });

  const allGamesCounter = document.querySelector('.category-tab[data-filter="All"] span');
  if (allGamesCounter) allGamesCounter.textContent = '0';

  const status = document.querySelector('#screen-status');
  if (status) status.textContent = 'No games available';

  const overlay = document.querySelector('#game-overlay');
  if (overlay) overlay.classList.remove('open');

  document.querySelectorAll('.random-game').forEach(button => {
    if (button) button.disabled = true;
  });
});
