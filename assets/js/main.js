document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gamesGrid');
    const searchInput = document.getElementById('searchInput');
    let allGames = [];

    fetch('assets/data/games.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load data');
            return res.json();
        })
        .then(data => {
            allGames = data.games || data;
            renderGames(allGames);

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase().trim();
                    const filtered = allGames.filter(game =>
                        game.title.toLowerCase().includes(query) ||
                        (game.description && game.description.toLowerCase().includes(query)) ||
                        (game.genre && game.genre.toLowerCase().includes(query))
                    );
                    renderGames(filtered);
                });
            }
        })
        .catch(err => {
            console.error(err);
            if (grid) {
                grid.innerHTML = '<div class="empty">Could not load games. Please try again later.</div>';
            }
        });

    function renderGames(games) {
        if (!games.length) {
            grid.innerHTML = '<div class="empty"><p class="empty-title">No games found</p><p class="empty-hint">Try a different keyword or clear the search to see all available repacks.</p></div>';
            return;
        }

        grid.innerHTML = games.map(game => `
      <article class="game-card">
        ${game.cover
          ? `<img class="game-cover" src="${game.cover}" alt="${escapeHtml(game.title)}" loading="lazy">`
          : `<div class="game-cover placeholder">No Cover</div>`
        }
        <div class="game-body">
          <h2>${escapeHtml(game.title)}</h2>
          <p class="desc">${escapeHtml(game.description || '')}</p>
          <div class="game-meta">
            ${game.date ? `<span>📅 ${escapeHtml(game.date)}</span>` : ''}
            ${game.size ? `<span>📦 ${escapeHtml(game.size)}</span>` : ''}
            ${game.genre ? `<span>${escapeHtml(game.genre)}</span>` : ''}
          </div>
          <a href="preview.html?id=${encodeURIComponent(game.id || '')}" class="btn btn-full">
            Preview & Download
          </a>
        </div>
      </article>
    `).join('');
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
