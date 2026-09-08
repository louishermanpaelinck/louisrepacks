document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('previewContent');
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');

  if (!gameId) {
    container.innerHTML = `
      <div class="preview-error">
        <h1>No game selected</h1>
        <p>Go back to the overview and choose a game.</p>
        <a href="/louisrepacks/" class="btn">← Back to overview</a>
      </div>
    `;
    return;
  }

  fetch('/louisrepacks/assets/data/games.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load data');
      return res.json();
    })
    .then(data => {
      const games = data.games || data;
      const game = games.find(g => g.id && g.id.toLowerCase() === gameId.toLowerCase());

      if (!game) {
        container.innerHTML = `
          <div class="preview-error">
            <h1>Game not found</h1>
            <p>No game found with id: <strong>${escapeHtml(gameId)}</strong></p>
            <a href="/louisrepacks/" class="btn">← Back to overview</a>
          </div>
        `;
        return;
      }

      document.title = `${game.title} – Louis' Repacks`;

      const screenshots = game.screenshots || [];

      const screenshotsHtml = screenshots.length
        ? `
          <div class="screenshots-section">
            <h2>Screenshots</h2>
            <div class="screenshots-grid">
              ${screenshots.map((ss, index) => `
                <img src="/louisrepacks/${ss}" alt="Screenshot ${index + 1}" class="screenshot" loading="lazy"
                     data-index="${index}"
                     onerror="this.style.display='none'">
              `).join('')}
            </div>
          </div>
        `
        : '';

      container.innerHTML = `
        <a href="/louisrepacks/" class="back-link">← Back to overview</a>

        <div class="preview-hero">
          ${game.cover
            ? `<img src="/louisrepacks/${game.cover}" alt="${escapeHtml(game.title)}" class="hero-cover"
                   onerror="this.style.display='none'">`
            : ''}
          <div class="hero-overlay">
            <div class="hero-content">
              ${game.icon
                ? `<img src="/louisrepacks/${game.icon}" alt="Icon" class="game-icon"
                       onerror="this.style.display='none'">`
                : ''}
              <div>
                <h1>${escapeHtml(game.title)}</h1>
                <div class="hero-meta">
                  ${game.genre ? `<span class="badge">${escapeHtml(game.genre)}</span>` : ''}
                  ${game.date ? `<span class="badge">📅 ${escapeHtml(game.date)}</span>` : ''}
                  ${game.size ? `<span class="badge">📦 ${escapeHtml(game.size)}</span>` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="preview-body">
          <div class="preview-main">
            <div class="preview-description">
              <h2>About this game</h2>
              <p>${escapeHtml(game.longDescription || game.description || '')}</p>
            </div>

            ${screenshotsHtml}
          </div>

          <aside class="preview-sidebar">
            <div class="info-card">
              <h3>Game Info</h3>
              <ul class="info-list">
                ${game.developer ? `<li><span>Developer</span><strong>${escapeHtml(game.developer)}</strong></li>` : ''}
                ${game.publisher ? `<li><span>Publisher</span><strong>${escapeHtml(game.publisher)}</strong></li>` : ''}
                ${game.date ? `<li><span>Release</span><strong>${escapeHtml(game.date)}</strong></li>` : ''}
                ${game.genre ? `<li><span>Genre</span><strong>${escapeHtml(game.genre)}</strong></li>` : ''}
                ${game.language ? `<li><span>Language</span><strong>${escapeHtml(game.language)}</strong></li>` : ''}
                ${game.size ? `<li><span>Size</span><strong>${escapeHtml(game.size)}</strong></li>` : ''}
              </ul>
            </div>

            ${game.repackNotes ? `
              <div class="info-card notes-card">
                <h3>Repack Notes</h3>
                <p>${escapeHtml(game.repackNotes)}</p>
              </div>
            ` : ''}

            <a href="https://louis-repacks.42web.io/download/?id=${gameId || '#'}" class="btn btn-download btn-full" target="_blank" rel="noopener">
              Download Now
            </a>
          </aside>
        </div>
      `;

      // Lightbox functionality
      if (screenshots.length > 0) {
        initLightbox(screenshots);
      }
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `
        <div class="preview-error">
          <h1>Error</h1>
          <p>Could not load game data.</p>
          <a href="/louisrepacks/" class="btn">← Back to overview</a>
        </div>
      `;
    });

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Lightbox logic
  function initLightbox(screenshots) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    let currentIndex = 0;

    // Open lightbox when clicking on a screenshot
    document.querySelectorAll('.screenshot').forEach(img => {
      img.addEventListener('click', () => {
        currentIndex = parseInt(img.dataset.index);
        openLightbox(currentIndex);
      });
    });

    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = `/louisrepacks/${screenshots[currentIndex]}`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
      lightboxImg.src = `/louisrepacks/${screenshots[currentIndex]}`;
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % screenshots.length;
      lightboxImg.src = `/louisrepacks/${screenshots[currentIndex]}`;
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Close with Escape or click outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }
});
