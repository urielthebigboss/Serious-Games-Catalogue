// main.js

// Image d'un jeu : og:image stockée en priorité ; sinon capture d'écran de la page
// (sauf sites protégés par Cloudflare comme mobygames -> placeholder propre avec le titre).
window.gameImage = function (link, title, w, h) {
  const label = encodeURIComponent((title || 'Serious Game').slice(0, 40));
  const ph = `https://placehold.co/${w}x${h}/e5e7eb/9ca3af?text=${label}`;
  if (!link) return ph;
  if (/mobygames\.com/i.test(link)) return ph;            // Cloudflare -> pas de screenshot
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(link)}?w=${w}&h=${h}`;
};

// Avatars de profil (PNG gaming stockés dans le front : assets/avatars/avatar-<id>.png)
window.PROFILE_AVATAR_COUNT = 12;
window.avatarUrl = function (id) {
  const n = parseInt(id, 10);
  const ok = (n >= 1 && n <= window.PROFILE_AVATAR_COUNT) ? n : 1;
  return `assets/avatars/avatar-${ok}.png`;
};

const carouselData = [
  {
    id: "latest",
    label: "Latest Added",
    icon: "clock",
    color: "blue",
    items: [
      {
        id: 1,
        title: "Quantum Minds",
        subtitle: "Physics & Critical Thinking",
        description: "An immersive quantum physics simulator designed for university students. Explore entanglement, superposition, and wave functions through interactive 3D experiments. Built in collaboration with CERN researchers.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800",
        tag: "Science",
        meta: "Added 2 days ago",
        badge: "NEW",
      },
      {
        id: 2,
        title: "EcoSphere",
        subtitle: "Environmental Science",
        description: "Manage entire ecosystems and understand the delicate balance of biodiversity. Players make real-time decisions affecting climate, species, and human settlements across 12 distinct biomes.",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800",
        tag: "Ecology",
        meta: "Added 5 days ago",
        badge: "NEW",
      },
      {
        id: 3,
        title: "CodeCraft Academy",
        subtitle: "Programming & Logic",
        description: "Learn computational thinking through visual puzzles and narrative challenges. From variables to algorithms, this game turns abstract coding concepts into tangible, memorable experiences.",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800",
        tag: "Technology",
        meta: "Added 1 week ago",
        badge: "NEW",
      },
    ],
  },
  {
    id: "popular",
    label: "Most Viewed",
    icon: "eye",
    color: "orange",
    items: [
      {
        id: 4,
        title: "MedSim Pro",
        subtitle: "Medical Education",
        description: "The most-used surgical training platform in Europe. Used by 200+ medical schools, MedSim Pro allows students to practice complex procedures in a zero-risk virtual environment with haptic feedback.",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800",
        tag: "Medicine",
        meta: "1.2M views this month",
        badge: "🔥 TRENDING",
      },
      {
        id: 5,
        title: "Historia",
        subtitle: "World History",
        description: "Walk through pivotal moments in history as an active participant. From ancient civilizations to modern conflicts, make decisions that shaped the world and see alternate timelines unfold.",
        imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800",
        tag: "History",
        meta: "890K views this month",
        badge: "🔥 TRENDING",
      },
      {
        id: 6,
        title: "LinguaWorld",
        subtitle: "Language Learning",
        description: "Master a new language through full cultural immersion. 18 languages available, adaptive difficulty, speech recognition feedback, and culturally authentic scenarios from native speakers.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
        tag: "Languages",
        meta: "750K views this month",
        badge: "🔥 TRENDING",
      },
    ],
  },
  {
    id: "award",
    label: "GALA Award Winners",
    icon: "trophy",
    color: "yellow",
    items: [
      {
        id: 7,
        title: "NeuralPath",
        subtitle: "Neuroscience & Psychology",
        description: "GALA 2024 Grand Prix winner. NeuralPath revolutionizes how we teach brain science through a narrative adventure that places players inside a patient's neural network during cognitive therapy.",
        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800",
        tag: "Neuroscience",
        meta: "GALA 2024 — Grand Prix",
        badge: "🏆 GRAND PRIX",
      },
      {
        id: 8,
        title: "CivicQuest",
        subtitle: "Civics & Democracy",
        description: "GALA 2024 Best Civic Impact award. Players navigate the full legislative process, run for office, manage a city budget, and understand the mechanics of democratic governance firsthand.",
        imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800",
        tag: "Civics",
        meta: "GALA 2024 — Best Civic Impact",
        badge: "🏆 AWARD",
      },
      {
        id: 9,
        title: "FinanceLab",
        subtitle: "Financial Literacy",
        description: "GALA 2023 Best Innovation award. Designed for teens and young adults, FinanceLab turns personal finance into a strategy game — budgeting, investing, entrepreneurship, and risk management.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800",
        tag: "Finance",
        meta: "GALA 2023 — Best Innovation",
        badge: "🏆 AWARD",
      },
    ],
  },
];

let games = [
  {
    id: 1,
    title: "Linguistic Laboratory",
    price: "12,99 €",
    domaine: "Science",
    age: "18 ans",
    ageNum: 18,
    publicType: "Étudiants",
    platform: ["Web", "Windows"],
    keywords: ["science", "lab", "experiment"],
    motivation: "exploration",
    knowledgeValidation: "quiz",
    gameMode: "solo",
    rights: "open",
    gameplay: "simulation",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600",
  },
  {
    id: 2,
    title: "Bio-Tech Simulator",
    price: "",
    domaine: "Linguistics",
    age: "15 ans",
    ageNum: 15,
    publicType: "Scolaire",
    platform: ["Android", "Web"],
    keywords: ["biology", "technology", "simulation"],
    motivation: "discovery",
    knowledgeValidation: "evaluation",
    gameMode: "solo",
    rights: "free",
    gameplay: "strategy",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600",
  },
  {
    id: 3,
    title: "Space Exploration",
    price: "12,99 €",
    domaine: "Astronomy",
    age: "18 ans",
    ageNum: 18,
    publicType: "Tous publics",
    platform: ["Windows", "Web"],
    keywords: ["space", "astronomy", "exploration"],
    motivation: "curiosity",
    knowledgeValidation: "challenge",
    gameMode: "solo",
    rights: "commercial",
    gameplay: "adventure",
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=600",
  },
  {
    id: 4,
    title: "History Chronicles",
    price: "12,99 €",
    domaine: "History",
    age: "12 ans",
    ageNum: 12,
    publicType: "Enfants",
    platform: ["Android", "Windows"],
    keywords: ["history", "culture", "storytelling"],
    motivation: "memory",
    knowledgeValidation: "quiz",
    gameMode: "multi",
    rights: "commercial",
    gameplay: "narrative",
    imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600",
  },
];

const tabColors = {
  blue: { bg: "bg-blue-500", text: "text-blue-600", ring: "ring-blue-300", shadow: "shadow-blue-100" },
  orange: { bg: "bg-orange-500", text: "text-orange-600", ring: "ring-orange-300", shadow: "shadow-orange-100" },
  yellow: { bg: "bg-yellow-500", text: "text-yellow-600", ring: "ring-yellow-300", shadow: "shadow-yellow-100" },
};

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ================= NAVIGATION AND SIDEBAR ================= */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
  const sidebarContainer = document.getElementById('sidebar-container');
  const mainLayoutContainer = document.getElementById('main-layout-container');
  const toggleSidebarText = document.getElementById('toggle-sidebar-text');
  const toggleSidebarIcon = document.getElementById('toggle-sidebar-icon');

  if (toggleSidebarBtn && sidebarContainer) {
    toggleSidebarBtn.addEventListener('click', () => {
      const isVisible = sidebarContainer.style.display !== 'none';
      if (isVisible) {
        sidebarContainer.style.display = 'none';
        mainLayoutContainer.classList.remove('sidebar-open');
        mainLayoutContainer.classList.add('sidebar-closed');
        toggleSidebarText.innerText = "Show Sidebar";
        toggleSidebarIcon.classList.remove('text-blue-500');
        toggleSidebarIcon.style.color = '#9ca3af';
      } else {
        sidebarContainer.style.display = 'block';
        mainLayoutContainer.classList.add('sidebar-open');
        mainLayoutContainer.classList.remove('sidebar-closed');
        toggleSidebarText.innerText = "Hide Sidebar";
        toggleSidebarIcon.classList.add('text-blue-500');
        toggleSidebarIcon.style.color = '';
      }
    });
  }

  /* ================= ADVANCED FILTER TOGGLE ================= */
  const advToggleBtn = document.getElementById('toggle-advanced-btn');
  const advContent = document.getElementById('advanced-filters-content');
  const advChevron = document.getElementById('advanced-chevron');
  if (advToggleBtn && advContent && advChevron) {
    advToggleBtn.addEventListener('click', () => {
      const isHidden = advContent.style.display === 'none';
      if (isHidden) {
        advContent.style.display = 'flex';
        advChevron.setAttribute('data-lucide', 'chevron-up');
        advToggleBtn.style.color = '#2563eb';
      } else {
        advContent.style.display = 'none';
        advChevron.setAttribute('data-lucide', 'chevron-down');
        advToggleBtn.style.color = '#374151';
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  /* ================= GAME DISPLAY ================= */
  const gamesGrid = document.getElementById('games-grid');
  const paginationEl = document.getElementById('pagination');
  const PAGE_SIZE = 10;          // 10 jeux par page
  let currentList = [];
  let currentPage = 1;

  function cardHtml(game) {
    return `
      <a href="game.html?id=${game.id}" class="game-card-link">
        <div class="game-card group">
          <div class="game-card-image-wrap">
            <img src="${game.imageUrl}" alt="${game.title}" class="game-card-image" />
            ${game.price ? `<div class="game-card-price">${game.price}</div>` : ''}
            <div class="game-card-title-wrap">
              <h3 class="game-card-title" style="margin:0; line-height:1.15;">${game.title}</h3>
              <div style="display:flex; align-items:center; gap:0.25rem; color:#facc15; margin-top:0.1rem;">
                ${[1,2,3,4,5].map(n => `<i data-lucide="star" style="width:12px; height:12px; ${game.rating && n <= Math.round(game.rating) ? 'fill:currentColor;' : ''}"></i>`).join('')}
                <span style="color:white; font-size:0.75rem; font-weight:700; opacity:0.9;">${game.rating != null ? game.rating.toFixed(1) : '—'}</span>
              </div>
            </div>
          </div>
          <div class="game-card-info">
            <div>
              <p class="game-info-label" style="margin-bottom:0.6rem;">Domaine</p>
              <p class="game-info-value blue">${game.domaine}</p>
            </div>
            <div style="text-align:right;">
              <p class="game-info-label" style="margin-bottom:0.6rem;">Age</p>
              <p class="game-info-value">${game.age}</p>
            </div>
            <div class="col-span-2">
              <p class="game-info-label" style="margin-bottom:0.6rem;">Public</p>
              <p class="game-info-value">${game.publicType}</p>
            </div>
          </div>
        </div>
      </a>`;
  }

  // Reçoit la liste filtrée complète, repart à la page 1 et affiche la 1re page
  function renderGames(list) {
    currentList = list || [];
    currentPage = 1;
    const countEl = document.getElementById('games-count');
    if (countEl) countEl.textContent = currentList.length;
    renderPage();
  }

  function renderPage() {
    if (!gamesGrid) return;
    if (currentList.length === 0) {
      gamesGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:#9ca3af; font-weight:700;">No game matches your filters.</div>`;
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }
    const totalPages = Math.ceil(currentList.length / PAGE_SIZE);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = currentList.slice(start, start + PAGE_SIZE);
    gamesGrid.innerHTML = pageItems.map(cardHtml).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
    renderPagination(totalPages);
  }

  function gotoPage(p) {
    currentPage = p;
    renderPage();
    if (gamesGrid) gamesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;
    if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }

    const btn = (label, page, opts = {}) => {
      const disabled = opts.disabled ? 'opacity:0.4;cursor:not-allowed;' : 'cursor:pointer;';
      const active = opts.active
        ? 'background:#2563eb;color:#fff;border-color:#2563eb;'
        : 'background:#fff;color:#374151;border-color:#e5e7eb;';
      return `<button class="page-btn" data-page="${page}" ${opts.disabled ? 'disabled' : ''}
        style="min-width:38px;height:38px;padding:0 0.6rem;border:1.5px solid;border-radius:10px;
        font-weight:800;font-size:0.85rem;${active}${disabled}">${label}</button>`;
    };

    // Fenêtre de pages autour de la page courante
    const pages = [];
    const win = 1;
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= currentPage - win && p <= currentPage + win)) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== '…') {
        pages.push('…');
      }
    }

    let html = btn('‹', currentPage - 1, { disabled: currentPage === 1 });
    html += pages.map(p => p === '…'
      ? `<span style="padding:0 0.3rem;color:#9ca3af;font-weight:800;">…</span>`
      : btn(p, p, { active: p === currentPage })).join('');
    html += btn('›', currentPage + 1, { disabled: currentPage === totalPages });

    paginationEl.innerHTML = html;
    paginationEl.querySelectorAll('.page-btn').forEach(b => {
      if (b.disabled) return;
      b.addEventListener('click', () => gotoPage(parseInt(b.dataset.page, 10)));
    });
  }

  // ===== Charger les vrais jeux depuis le backend =====
  const GAMES_API = (window.adminAuth && window.adminAuth.API_BASE) || 'https://urielthebigboss-seirousgamecatalogue.hf.space';

  function mapApiGame(g) {
    const priceNum = g.price != null ? Number(g.price) : null;
    let priceLabel = '';
    if (priceNum && priceNum > 0) priceLabel = priceNum.toFixed(2).replace('.', ',') + ' €';
    return {
      id: g.id,
      title: g.title || 'Sans titre',
      description: g.description || '',
      price: priceLabel,
      domaine: g.domaine || '',
      age: g.age || '',
      ageNum: parseInt(g.age, 10) || 0,
      publicType: g.target_audience || '',
      platform: g.plateforme ? g.plateforme.split(',').map(s => s.trim()).filter(Boolean) : [],
      keywords: g.mot_cles ? g.mot_cles.split(',').map(s => s.toLowerCase().trim()).filter(Boolean) : [],
      motivation: g.motivation || '',
      knowledgeValidation: g.knowledge_validation || '',
      gameMode: g.game_mode || '',
      rights: g.right || '',
      gameplay: g.game_play || '',
      rating: g.rating != null ? Number(g.rating) : null,
      imageUrl: g.image || window.gameImage(g.link, g.title, 600, 400),
      competition: g.competition || '',
      prix: g.prix || '',
      anneeNomination: g.annee_nomination || '',
      commentaire: g.commentaire || '',
    };
  }

  // Pour afficher TOUS les jeux (peu importe le statut) : remplace par  () => true
  const PUBLIC_FILTER = g => g.status === 'approved';

  // Mélange un tableau (Fisher-Yates) sans modifier l'original
  function shuffleArr(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Transforme un jeu du catalogue en "slide" du hero
  function heroItemFromGame(g, badge, metaText) {
    return {
      id: g.id,
      title: g.title || 'Serious Game',
      subtitle: g.publicType || g.domaine || 'Serious Game',
      description: g.description || `${g.title || 'This game'} — ${g.domaine || 'serious game'} for ${g.publicType || 'all audiences'}.`,
      imageUrl: g.imageUrl,
      tag: g.domaine || 'Serious Game',
      meta: metaText,
      badge: badge,
    };
  }

  // Remplit "Latest Added" (les plus récents) et "Most Viewed" (aléatoire) avec de vrais jeux
  function buildHeroFromGames() {
    if (!games || games.length === 0) return;   // sinon on garde les exemples par défaut
    const latest = [...games].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 5);
    carouselData[0].items = latest.map(g => heroItemFromGame(g, 'NEW', 'Recently added'));
    const random = shuffleArr(games).slice(0, 5);
    carouselData[1].items = random.map(g => heroItemFromGame(g, '🔥 TRENDING', 'Popular right now'));

    // GALA Award Winners : uniquement les jeux taggés par l'admin (compétition / prix / année)
    const awardGames = games.filter(g => (g.competition || g.prix || g.anneeNomination));
    if (carouselData[2]) {
      if (awardGames.length > 0) {
        carouselData[2].items = awardGames.slice(0, 8).map(g => ({
          id: g.id,
          title: g.title || 'Serious Game',
          subtitle: g.prix || g.domaine || 'Award',
          description: g.commentaire || g.description || `${g.title || 'This game'} — award-winning.`,
          imageUrl: g.imageUrl,
          tag: g.domaine || 'Award',
          meta: [g.competition, g.anneeNomination].filter(Boolean).join(' — ') || 'GALA Award',
          badge: g.prix ? ('🏆 ' + g.prix) : '🏆 AWARD',
        }));
      } else {
        // No awarded game: show a placeholder instead of fake examples
        carouselData[2].items = [{
          id: null,
          title: 'No awarded games yet',
          subtitle: 'GALA Award Winners',
          description: "Awarded games are selected by the administrator. Check back soon!",
          imageUrl: window.gameImage(null, 'GALA Awards', 600, 400),
          tag: 'Award',
          meta: 'GALA Awards',
          badge: '🏆',
        }];
      }
    }

    activeSlideIdx = 0;
    if (activeTabIdx >= carouselData.length) activeTabIdx = 0;
    if (typeof renderCarousel === 'function') { renderCarousel(); resetAutoplay(); }
  }

  async function loadGamesFromAPI() {
    try {
      const res = await fetch(`${GAMES_API}/games/`);
      if (res.ok) {
        const data = await res.json();
        games = (data.games || []).filter(PUBLIC_FILTER).map(mapApiGame);
      } else {
        games = [];
      }
    } catch (_) {
      games = [];
    }
    renderGames(games);
    buildHeroFromGames();
  }

  loadGamesFromAPI();

  /* ================= FILTER LOGIC ================= */
  let activePlatforms = new Set();
  let activeRating = 0;

  // Platform toggle buttons
  const platformBtns = document.querySelectorAll('.platform-btn[data-platform]');
  platformBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.platform;
      if (activePlatforms.has(p)) {
        activePlatforms.delete(p);
        btn.classList.remove('active');
      } else {
        activePlatforms.add(p);
        btn.classList.add('active');
      }
      applyFilters();
    });
  });

  // Star rating filter (boutons persistants, fiables même après le rendu Lucide)
  const ratingStars = Array.from(document.querySelectorAll('#rating-filter .rating-star'));
  const ratingLabel = document.getElementById('rating-filter-label');
  function paintRatingStars() {
    ratingStars.forEach((btn, i) => {
      const svg = btn.querySelector('svg');
      if (svg) svg.style.fill = i < activeRating ? 'currentColor' : 'none';
      btn.classList.toggle('active', i < activeRating);
    });
    if (ratingLabel) ratingLabel.textContent = activeRating > 0 ? `${activeRating}+ ★` : '';
  }
  ratingStars.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.dataset.val, 10);
      activeRating = (activeRating === val) ? 0 : val;   // re-cliquer désactive
      paintRatingStars();
      applyFilters();
    });
  });

  // Text/select filter inputs
  const allFilterInputs = ['filter-domaine','filter-keywords','filter-public',
    'filter-motivation','filter-knowledge','filter-gamemode','filter-rights','filter-gameplay']
    .map(id => document.getElementById(id)).filter(Boolean);

  allFilterInputs.forEach(el => {
    el.addEventListener('input', applyFilters);
    el.addEventListener('change', applyFilters);
  });

  // Age range (interactif des deux côtés : min ET max)
  const ageMin = document.getElementById('filter-age-min');
  const ageMax = document.getElementById('filter-age-max');
  const ageDisplay = document.getElementById('age-display');
  const ageFill = document.getElementById('age-range-fill');
  function syncAgeDisplay() {
    if (!ageMin || !ageMax) return;
    let lo = parseInt(ageMin.value, 10);
    let hi = parseInt(ageMax.value, 10);
    if (lo > hi) {                       // empêche les curseurs de se croiser
      if (document.activeElement === ageMin) { hi = lo; ageMax.value = hi; }
      else { lo = hi; ageMin.value = lo; }
    }
    if (ageDisplay) ageDisplay.textContent = `${lo} – ${hi} ans`;
    if (ageFill) {
      const max = parseInt(ageMax.max, 10) || 45;
      const leftPct = (lo / max) * 100;
      const rightPct = (hi / max) * 100;
      ageFill.style.left = leftPct + '%';
      ageFill.style.width = (rightPct - leftPct) + '%';
    }
  }
  if (ageMin && ageMax) {
    [ageMin, ageMax].forEach(s => s.addEventListener('input', () => { syncAgeDisplay(); applyFilters(); }));
    syncAgeDisplay();   // position initiale du remplissage
  }

  // Global search input
  const globalSearch = document.querySelector('.main-search-input');
  if (globalSearch) globalSearch.addEventListener('input', applyFilters);

  // Reset button
  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      allFilterInputs.forEach(el => { el.value = ''; });
      if (ageMin && ageMax) { ageMin.value = 0; ageMax.value = 45; syncAgeDisplay(); }
      activePlatforms.clear();
      activeRating = 0;
      platformBtns.forEach(btn => btn.classList.remove('active'));
      paintRatingStars();
      if (globalSearch) globalSearch.value = '';
      renderGames(games);
    });
  }

  function applyFilters() {
    const domaine = (document.getElementById('filter-domaine')?.value || '').toLowerCase().trim();
    const keywords = (document.getElementById('filter-keywords')?.value || '')
      .split(',').map(k => k.toLowerCase().trim()).filter(Boolean);
    const publicVal = document.getElementById('filter-public')?.value || '';
    const motivation = (document.getElementById('filter-motivation')?.value || '').toLowerCase().trim();
    const knowledge = (document.getElementById('filter-knowledge')?.value || '').toLowerCase().trim();
    const gamemode = (document.getElementById('filter-gamemode')?.value || '').toLowerCase().trim();
    const rights = (document.getElementById('filter-rights')?.value || '').toLowerCase().trim();
    const gameplay = (document.getElementById('filter-gameplay')?.value || '').toLowerCase().trim();
    const globalQ = (globalSearch?.value || '').toLowerCase().trim();

    const filtered = games.filter(g => {
      if (domaine && !g.domaine.toLowerCase().includes(domaine)) return false;
      if (keywords.length > 0 && !keywords.some(k => g.keywords.some(gk => gk.includes(k)))) return false;
      if (publicVal && g.publicType !== publicVal) return false;
      if (activePlatforms.size > 0 && ![...activePlatforms].some(p => g.platform.some(gp => gp.toLowerCase().includes(p.toLowerCase())))) return false;
      const loAge = ageMin ? parseInt(ageMin.value, 10) : 0;
      const hiAge = ageMax ? parseInt(ageMax.value, 10) : 45;
      if (g.ageNum && (g.ageNum < loAge || g.ageNum > hiAge)) return false;
      if (motivation && !(g.motivation || '').toLowerCase().includes(motivation)) return false;
      if (knowledge && !(g.knowledgeValidation || '').toLowerCase().includes(knowledge)) return false;
      if (gamemode && !(g.gameMode || '').toLowerCase().includes(gamemode)) return false;
      if (rights && !(g.rights || '').toLowerCase().includes(rights)) return false;
      if (gameplay && !(g.gameplay || '').toLowerCase().includes(gameplay)) return false;
      if (activeRating > 0 && (g.rating == null || g.rating < activeRating)) return false;
      if (globalQ && !g.title.toLowerCase().includes(globalQ) && !g.domaine.toLowerCase().includes(globalQ)) return false;
      return true;
    });

    renderGames(filtered);
  }


  /* ================= HERO CAROUSEL ================= */
  let activeTabIdx = 0;
  let activeSlideIdx = 0;
  let autoPlayRef = null;

  const tabsContainer = document.getElementById('carousel-tabs');
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  function renderCarousel() {
    if (!tabsContainer || !track) return;

    // Display tabs
    tabsContainer.innerHTML = carouselData.map((tab, idx) => {
      const isActive = activeTabIdx === idx;
      const tBg = isActive ? `tab-color-${tab.color} active` : '';
      return `
        <button class="hero-tab-btn ${tBg}" data-idx="${idx}">
          <i data-lucide="${tab.icon}" style="width:13px; height:13px;"></i> ${tab.label}
        </button>
      `;
    }).join('');

    // Rebind tab events
    tabsContainer.querySelectorAll('.hero-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeTabIdx = parseInt(e.currentTarget.dataset.idx);
        activeSlideIdx = 0;
        resetAutoplay();
        renderCarousel();
      });
    });

    // Display slide
    const currentTab = carouselData[activeTabIdx];
    const currentItem = currentTab.items[activeSlideIdx];
    const tcBg = tabColors[currentTab.color].bg;
    const tcText = tabColors[currentTab.color].text;

    let badgeHtml = currentItem.badge ? `<div class="carousel-badge ${tcBg}">${currentItem.badge}</div>` : '';
    let dotsHtml = currentTab.items.map((_, i) => `<button class="carousel-dot ${i === activeSlideIdx ? `${tcBg} active` : ''}" data-i="${i}"></button>`).join('');

    track.innerHTML = `
      <div class="carousel-slide" style="animation: zoomIn 0.35s;">
        <div class="carousel-image-part">
          <img src="${currentItem.imageUrl}" alt="${currentItem.title}" />
          <div class="carousel-gradient"></div>
          ${badgeHtml}
        </div>
        <div class="carousel-content-part">
          <span class="carousel-tag ${tcText}">
            <span class="carousel-tag-dot ${tcBg}"></span> ${currentItem.tag}
          </span>
          <h3 class="carousel-title">${currentItem.title}</h3>
          <p class="carousel-subtitle">${currentItem.subtitle}</p>
          <p class="carousel-description">${currentItem.description}</p>
          <div class="carousel-action-row">
            <button class="carousel-view-btn ${tcBg}">
              View Details <i data-lucide="arrow-right" style="width:13px; height:13px;"></i>
            </button>
            <span class="carousel-meta">${currentItem.meta}</span>
          </div>
          <div class="carousel-dots">
            ${dotsHtml}
          </div>
        </div>
      </div>
    `;

    track.querySelectorAll('.carousel-dot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeSlideIdx = parseInt(e.currentTarget.dataset.i);
        resetAutoplay();
        renderCarousel();
      });
    });

    const viewBtn = track.querySelector('.carousel-view-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        if (window.openGameDetailModal) {
          window.openGameDetailModal(currentItem);
        }
      });
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function nextSlide() {
    activeSlideIdx = (activeSlideIdx + 1) % carouselData[activeTabIdx].items.length;
    renderCarousel();
  }

  function prevSlide() {
    const len = carouselData[activeTabIdx].items.length;
    activeSlideIdx = (activeSlideIdx - 1 + len) % len;
    renderCarousel();
  }

  function resetAutoplay() {
    if (autoPlayRef) clearInterval(autoPlayRef);
    autoPlayRef = setInterval(nextSlide, 8000);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    renderCarousel();
    resetAutoplay();
  }

  /* ================= AUTHENTICATION MODAL ================= */
  let isLoggedIn = false;
  const modal = document.getElementById('auth-modal');
  const authBtn = document.getElementById('authBtn');
  const closeAuthBtns = [document.getElementById('close-auth-modal'), document.getElementById('close-auth-btn')];

  // Persistance : si un token existe déjà, on reste connecté (même après rechargement / navigation)
  if (localStorage.getItem('user_token')) {
    isLoggedIn = true;
    if (authBtn) { authBtn.style.backgroundColor = '#eff6ff'; authBtn.style.color = '#2563eb'; }
  }

  function openModal() {
    if (modal) modal.classList.remove('hidden');
  }

  if (authBtn) {
    authBtn.addEventListener('click', () => {
      if (isLoggedIn) {
        window.location.href = 'profile.html';
      } else {
        openModal();
      }
    });
  }

  if (modal) {
    closeAuthBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => modal.classList.add('hidden'));
    });
    // Close on backdrop click
    document.getElementById('close-auth-modal')?.addEventListener('click', () => modal.classList.add('hidden'));
  }

  // ===== Connexion utilisateur (réelle, via le backend) =====
  const AUTH_API = (window.adminAuth && window.adminAuth.API_BASE) || 'https://urielthebigboss-seirousgamecatalogue.hf.space';
  const authForm = document.getElementById('auth-form');

  // Affiche un message (erreur/succès) en haut d'un formulaire de modal
  function setModalMsg(form, text, ok) {
    let el = form.querySelector('.modal-msg');
    if (!el) {
      el = document.createElement('div');
      el.className = 'modal-msg';
      el.style.cssText = 'margin:0 0 1rem;padding:.6rem .8rem;border-radius:10px;font-size:.8rem;font-weight:600;text-align:center;';
      form.insertBefore(el, form.firstChild);
    }
    el.textContent = text || '';
    el.style.display = text ? 'block' : 'none';
    el.style.background = ok ? '#ecfdf5' : '#fef2f2';
    el.style.color = ok ? '#059669' : '#dc2626';
    el.style.border = '1px solid ' + (ok ? '#a7f3d0' : '#fecaca');
  }

  async function doLogin() {
    if (!authForm) return;
    const email = authForm.querySelector('input[type=email]').value.trim();
    const password = (document.getElementById('login-password') || {}).value || '';
    const btn = document.getElementById('auth-submit-btn');
    setModalMsg(authForm, '', false);
    if (!email || !password) { setModalMsg(authForm, 'Renseigne ton email et ton mot de passe.', false); return; }
    if (btn) btn.disabled = true;
    try {
      const res = await fetch(`${AUTH_API}/user/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setModalMsg(authForm, data.detail || 'Connexion impossible.', false); return; }
      localStorage.setItem('user_token', data.access_token);
      isLoggedIn = true;
      modal.classList.add('hidden');
      if (authBtn) { authBtn.style.backgroundColor = '#eff6ff'; authBtn.style.color = '#2563eb'; }
    } catch (_) {
      setModalMsg(authForm, 'Serveur injoignable. Le backend est-il démarré ?', false);
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  if (authForm) authForm.addEventListener('submit', (e) => { e.preventDefault(); doLogin(); });
  document.getElementById('auth-submit-btn')?.addEventListener('click', (e) => { e.preventDefault(); doLogin(); });

  /* ================= FORGOT PASSWORD MODAL ================= */
  const forgotModal = document.getElementById('forgot-pwd-modal');
  const forgotFormView = document.getElementById('forgot-form-view');
  const forgotSuccessView = document.getElementById('forgot-success-view');

  function openForgotModal() {
    // Reset to form view when opening
    if (forgotFormView) forgotFormView.style.display = 'block';
    if (forgotSuccessView) forgotSuccessView.style.display = 'none';
    if (forgotModal) forgotModal.classList.remove('hidden');
  }

  function closeForgotModal() {
    if (forgotModal) forgotModal.classList.add('hidden');
  }

  // Open forgot modal from "Forgot Password?" link
  document.getElementById('forgot-pwd-link')?.addEventListener('click', () => {
    modal.classList.add('hidden'); // close auth modal first
    openForgotModal();
  });

  // Close forgot modal buttons
  document.getElementById('close-forgot-modal-btn')?.addEventListener('click', closeForgotModal);
  document.getElementById('close-forgot-modal-bg')?.addEventListener('click', closeForgotModal);

  // Back to login
  document.getElementById('back-to-login-btn')?.addEventListener('click', () => {
    closeForgotModal();
    openModal(); // reopen auth modal
  });

  // Forgot password form submit → show success
  document.getElementById('forgot-pwd-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (forgotFormView) forgotFormView.style.display = 'none';
    if (forgotSuccessView) forgotSuccessView.style.display = 'block';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  // DONE button on success view
  document.getElementById('close-success-btn')?.addEventListener('click', closeForgotModal);

  /* ================= SIGN UP MODAL (JOIN SOCIETY) ================= */
  const signupModal = document.getElementById('signup-modal');

  function openSignupModal() {
    if (signupModal) signupModal.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function closeSignupModal() {
    if (signupModal) signupModal.classList.add('hidden');
  }

  // Open signup from login modal link
  document.getElementById('open-signup-link')?.addEventListener('click', () => {
    modal.classList.add('hidden');
    openSignupModal();
  });

  // Close signup modal
  document.getElementById('close-signup-modal-btn')?.addEventListener('click', closeSignupModal);
  document.getElementById('close-signup-modal-bg')?.addEventListener('click', closeSignupModal);

  // "Already have an account? Login" → back to login modal
  document.getElementById('open-login-from-signup')?.addEventListener('click', () => {
    closeSignupModal();
    openModal();
  });

  // ===== Inscription utilisateur (réelle, via le backend) =====
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (document.getElementById('signup-email')?.value || '').trim();
      const pseudo = (document.getElementById('signup-pseudo')?.value || '').trim();
      const country = (document.getElementById('signup-country')?.value || '').trim();
      const yearBorn = (document.getElementById('signup-year-born')?.value || '').trim();
      const password = document.getElementById('signup-password')?.value || '';
      const confirm = document.getElementById('signup-confirm')?.value || '';
      const btn = signupForm.querySelector('button[type=submit]');
      setModalMsg(signupForm, '', false);
      if (!email || !pseudo || !country || !password) {
        setModalMsg(signupForm, 'Remplis tous les champs (email, pseudo, pays, mot de passe).', false); return;
      }
      if (password.length < 6) { setModalMsg(signupForm, 'Le mot de passe doit faire au moins 6 caractères.', false); return; }
      if (password !== confirm) { setModalMsg(signupForm, 'Les deux mots de passe ne correspondent pas.', false); return; }
      if (btn) btn.disabled = true;
      try {
        const res = await fetch(`${AUTH_API}/user/signup`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, pays: country, img_profil: selectedSignupAvatar, pseudo, year_born: yearBorn })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) { setModalMsg(signupForm, data.detail || 'Inscription impossible.', false); return; }
        setModalMsg(signupForm, data.message || 'Compte créé. Vérifie ta boîte mail pour confirmer ton adresse.', true);
        signupForm.reset();
      } catch (_) {
        setModalMsg(signupForm, 'Serveur injoignable. Le backend est-il démarré ?', false);
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }


  /* ============ LISTE DÉROULANTE DES PAYS (Choices.js) ============ */
  const COUNTRIES = [
    "Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola",
    "Antigua-et-Barbuda","Arabie saoudite","Argentine","Arménie","Australie","Autriche",
    "Azerbaïdjan","Bahamas","Bahreïn","Bangladesh","Barbade","Belgique","Belize","Bénin",
    "Bhoutan","Biélorussie","Birmanie (Myanmar)","Bolivie","Bosnie-Herzégovine","Botswana",
    "Brésil","Brunei","Bulgarie","Burkina Faso","Burundi","Cambodge","Cameroun","Canada",
    "Cap-Vert","Chili","Chine","Chypre","Colombie","Comores","Congo (Brazzaville)",
    "Congo (RDC)","Corée du Nord","Corée du Sud","Costa Rica","Côte d'Ivoire","Croatie",
    "Cuba","Danemark","Djibouti","Dominique","Égypte","Émirats arabes unis","Équateur",
    "Érythrée","Espagne","Estonie","Eswatini","États-Unis","Éthiopie","Fidji","Finlande",
    "France","Gabon","Gambie","Géorgie","Ghana","Grèce","Grenade","Guatemala","Guinée",
    "Guinée-Bissau","Guinée équatoriale","Guyana","Haïti","Honduras","Hongrie",
    "Îles Marshall","Îles Salomon","Inde","Indonésie","Irak","Iran","Irlande","Islande",
    "Israël","Italie","Jamaïque","Japon","Jordanie","Kazakhstan","Kenya","Kirghizistan",
    "Kiribati","Koweït","Laos","Lesotho","Lettonie","Liban","Liberia","Libye",
    "Liechtenstein","Lituanie","Luxembourg","Macédoine du Nord","Madagascar","Malaisie",
    "Malawi","Maldives","Mali","Malte","Maroc","Maurice","Mauritanie","Mexique",
    "Micronésie","Moldavie","Monaco","Mongolie","Monténégro","Mozambique","Namibie",
    "Nauru","Népal","Nicaragua","Niger","Nigeria","Norvège","Nouvelle-Zélande","Oman",
    "Ouganda","Ouzbékistan","Pakistan","Palaos","Palestine","Panama",
    "Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas","Pérou","Philippines","Pologne",
    "Portugal","Qatar","République centrafricaine","République dominicaine",
    "République tchèque","Roumanie","Royaume-Uni","Russie","Rwanda","Saint-Kitts-et-Nevis",
    "Saint-Marin","Saint-Vincent-et-les-Grenadines","Sainte-Lucie","Salvador","Samoa",
    "Sao Tomé-et-Principe","Sénégal","Serbie","Seychelles","Sierra Leone","Singapour",
    "Slovaquie","Slovénie","Somalie","Soudan","Soudan du Sud","Sri Lanka","Suède","Suisse",
    "Suriname","Syrie","Tadjikistan","Tanzanie","Tchad","Thaïlande","Timor oriental",
    "Togo","Tonga","Trinité-et-Tobago","Tunisie","Turkménistan","Turquie","Tuvalu",
    "Ukraine","Uruguay","Vanuatu","Vatican","Venezuela","Vietnam","Yémen","Zambie","Zimbabwe"
  ];
  const countrySelect = document.getElementById('signup-country');
  if (countrySelect) {
    COUNTRIES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      countrySelect.appendChild(opt);
    });
    if (typeof Choices !== 'undefined') {
      new Choices(countrySelect, {
        searchEnabled: true,
        searchPlaceholderValue: 'Rechercher un pays...',
        itemSelectText: '',
        shouldSort: false,
        placeholder: true,
        placeholderValue: 'Select your country',
      });
    }
  }

  // Sélecteur d'année de naissance (de l'année courante jusqu'à 1940)
  const yearSelect = document.getElementById('signup-year-born');
  if (yearSelect) {
    const nowY = new Date().getFullYear();
    for (let y = nowY; y >= 1940; y--) {
      const opt = document.createElement('option');
      opt.value = String(y); opt.textContent = String(y);
      yearSelect.appendChild(opt);
    }
  }

  /* ============ PHOTO DE PROFIL (avatars gaming) ============ */
  let selectedSignupAvatar = 1;
  (function setupProfileAvatars() {
    const N = window.PROFILE_AVATAR_COUNT || 12;

    // Grille de choix d'avatar dans la modale d'inscription
    const grid = document.getElementById('signup-avatar-grid');
    if (grid) {
      for (let i = 1; i <= N; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'avatar-option' + (i === 1 ? ' selected' : '');
        b.dataset.id = i;
        b.innerHTML = '<img src="' + window.avatarUrl(i) + '" alt="Avatar ' + i + '">';
        b.addEventListener('click', () => {
          selectedSignupAvatar = i;
          grid.querySelectorAll('.avatar-option').forEach(x => x.classList.remove('selected'));
          b.classList.add('selected');
        });
        grid.appendChild(b);
      }
    }

    // Affiche l'avatar choisi dans la navbar : immediat via cache local, puis rafraichi depuis l'API.
    // Si l'utilisateur n'a rien choisi (ou est deconnecte), l'icone par defaut reste affichee.
    const token = localStorage.getItem('user_token');
    const navBtn = document.getElementById('authBtn');
    function setNavAvatar(id) {
      const n = parseInt(id, 10);
      if (!navBtn || !(n >= 1)) return;
      navBtn.innerHTML = '<img src="' + window.avatarUrl(n) + '" alt="Profil" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;">';
      navBtn.style.padding = '0';
      navBtn.style.overflow = 'hidden';
    }
    if (token && navBtn) {
      // 1) Affichage instantane depuis le cache (avatar deja connu)
      setNavAvatar(localStorage.getItem('user_avatar'));
      // 2) Rafraichissement depuis le backend
      const API = (window.adminAuth && window.adminAuth.API_BASE) || 'https://urielthebigboss-seirousgamecatalogue.hf.space';
      fetch(API + '/user/me', { headers: { Authorization: 'Bearer ' + token } })
        .then(r => r.ok ? r.json() : null)
        .then(me => {
          if (!me) return;
          if (me.img_profil) {
            window.currentUserAvatar = me.img_profil;
            localStorage.setItem('user_avatar', me.img_profil);
            setNavAvatar(me.img_profil);
          } else {
            localStorage.removeItem('user_avatar');   // rien choisi -> icone par defaut
          }
        })
        .catch(() => {});
    } else {
      localStorage.removeItem('user_avatar');          // deconnecte -> icone par defaut
    }
  })();

  /* ============ AFFICHER / MASQUER LE MOT DE PASSE (œil) ============ */
  const EYE_OPEN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  const EYE_OFF = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
  document.querySelectorAll('.pw-eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      btn.innerHTML = showing ? EYE_OPEN : EYE_OFF;
      btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    });
  });

  /* ================= GAME DETAIL MODAL ================= */
  const gdModal = document.getElementById('game-detail-modal');
  if (gdModal) {
    const gdBg = document.getElementById('close-game-detail-bg');
    const gdBtn1 = document.getElementById('close-game-detail-btn');
    const gdBtn2 = document.getElementById('close-game-detail-btn2');

    function closeGd() { gdModal.style.display = 'none'; }
    if (gdBg) gdBg.addEventListener('click', closeGd);
    if (gdBtn1) gdBtn1.addEventListener('click', closeGd);
    if (gdBtn2) gdBtn2.addEventListener('click', closeGd);
  }

  window.openGameDetailModal = function (item) {
    if (!gdModal) return;
    document.getElementById('game-detail-img').src = item.imageUrl || '';

    const badgeEl = document.getElementById('game-detail-badge');
    if (item.badge) {
      badgeEl.style.display = 'block';
      badgeEl.innerText = item.badge;
      badgeEl.className = 'game-detail-badge ' + (tabColors[carouselData[activeTabIdx].color].bg || 'bg-blue-500');
    } else {
      badgeEl.style.display = 'none';
    }

    document.getElementById('game-detail-tag').innerText = item.tag || '';
    document.getElementById('game-detail-title').innerText = item.title || '';
    document.getElementById('game-detail-subtitle').innerText = item.subtitle || '';
    document.getElementById('game-detail-meta').innerText = item.meta || '';
    document.getElementById('game-detail-desc').innerText = item.description || '';

    // update btn url
    const viewGameBtn = gdModal.querySelector('.game-detail-btn-view');
    if (item.id) {
      viewGameBtn.href = 'game.html?id=' + item.id;
    } else {
      viewGameBtn.href = 'game.html';
    }

    gdModal.style.display = 'flex';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

});
