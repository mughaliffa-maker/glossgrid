(() => {
  const config = window.GLOSSGRID_CONFIG || {};
  const designs = window.GLOSSGRID_DESIGNS || [];
  const base = document.body.dataset.page === 'home' ? '' : '../';
  const savedKey = 'glossgrid-saved';

  const icon = (name, size = 20) => {
    const icons = {
      heart: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>`,
      heartFill: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21 4.2 13.5 3.1 12.4a5.5 5.5 0 0 1 7.8-7.8L12 5.7l1.1-1.1a5.5 5.5 0 0 1 7.8 7.8l-1.1 1.1L12 21Z"/></svg>`,
      menu: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
      search: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
      arrow: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
      copy: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>`,
      share: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.6 6.8-4.1M8.6 13.4l6.8 4.1"/></svg>`
    };
    return icons[name] || '';
  };

  const getSaved = () => {
    try { return JSON.parse(localStorage.getItem(savedKey) || '[]'); }
    catch { return []; }
  };
  const setSaved = (items) => {
    localStorage.setItem(savedKey, JSON.stringify(items));
    updateSavedCount();
  };
  const isSaved = (slug) => getSaved().includes(slug);
  const toggleSaved = (slug) => {
    const items = getSaved();
    const index = items.indexOf(slug);
    if (index >= 0) items.splice(index, 1); else items.unshift(slug);
    setSaved(items);
    document.querySelectorAll(`[data-save="${slug}"]`).forEach(btn => {
      const saved = isSaved(slug);
      btn.classList.toggle('saved', saved);
      btn.innerHTML = saved ? icon('heartFill') : icon('heart');
      btn.setAttribute('aria-label', saved ? 'Remove from saved designs' : 'Save design');
    });
    toast(index >= 0 ? 'Removed from saved designs' : 'Saved for your next appointment');
    if (document.body.dataset.page === 'saved') renderSaved();
  };
  const updateSavedCount = () => {
    const count = getSaved().length;
    document.querySelectorAll('.saved-count').forEach(el => el.textContent = count);
  };

  const pathTo = (path) => `${base}${path}`;
  const designUrl = slug => `${pathTo('design/')}?slug=${encodeURIComponent(slug)}`;

  function header() {
    const target = document.querySelector('[data-site-header]');
    if (!target) return;
    target.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header">
        <div class="container nav-wrap">
          <a class="logo" href="${pathTo('')}">
            <span class="logo-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
            <span>${config.brand || 'GlossGrid'}</span>
          </a>
          <nav class="desktop-nav" aria-label="Main navigation">
            <a href="${pathTo('explore/')}">Discover</a>
            <a href="${pathTo('finder/')}">Nail Finder</a>
            <a href="${pathTo('explore/')}?season=Summer">Summer</a>
            <a href="${pathTo('explore/')}?style=French">French</a>
            <a href="${pathTo('about/')}">About</a>
          </nav>
          <div class="nav-actions">
            <a class="icon-btn" href="${pathTo('explore/')}" aria-label="Search designs">${icon('search')}</a>
            <a class="icon-btn" href="${pathTo('saved/')}" aria-label="Saved designs" style="position:relative">${icon('heart')}<span class="saved-count">0</span></a>
            <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false">${icon('menu')}</button>
          </div>
        </div>
      </header>
      <nav class="mobile-menu" aria-label="Mobile navigation">
        <a href="${pathTo('explore/')}">Discover</a>
        <a href="${pathTo('finder/')}">Nail Finder</a>
        <a href="${pathTo('explore/')}?season=Summer">Summer Nails</a>
        <a href="${pathTo('explore/')}?length=Short">Short Nails</a>
        <a href="${pathTo('explore/')}?occasion=Wedding">Wedding Nails</a>
        <a href="${pathTo('saved/')}">Saved Designs</a>
      </nav>`;

    const menuBtn = target.querySelector('.menu-btn');
    const menu = target.querySelector('.mobile-menu');
    menuBtn?.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    updateSavedCount();
  }

  function footer() {
    const target = document.querySelector('[data-site-footer]');
    if (!target) return;
    target.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="logo" href="${pathTo('')}"><span class="logo-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span><span>${config.brand || 'GlossGrid'}</span></a>
              <p class="muted" style="max-width:360px">A visual nail-idea library built to help you find, save and clearly request your next manicure.</p>
            </div>
            <div class="footer-links"><h3>Discover</h3><a href="${pathTo('explore/')}">All designs</a><a href="${pathTo('finder/')}">Nail Finder</a><a href="${pathTo('explore/')}?season=Summer">Summer nails</a><a href="${pathTo('saved/')}">Saved designs</a></div>
            <div class="footer-links"><h3>Company</h3><a href="${pathTo('about/')}">About</a><a href="${pathTo('contact/')}">Contact</a><a href="${pathTo('editorial-policy/')}">Editorial policy</a><a href="${pathTo('copyright/')}">Image & copyright policy</a></div>
            <div class="footer-links"><h3>Legal</h3><a href="${pathTo('privacy/')}">Privacy policy</a><a href="${pathTo('terms/')}">Terms of use</a><a href="${config.pinterestUrl || '#'}" rel="noopener">Pinterest</a></div>
          </div>
          <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${config.brand || 'GlossGrid'}. All rights reserved.</span><span>Demo images are credited to their respective Pexels contributors.</span></div>
        </div>
      </footer><div class="toast" role="status" aria-live="polite"></div>`;
  }

  function toast(message) {
    const el = document.querySelector('.toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
  }

  function card(d) {
    const saved = isSaved(d.slug);
    return `<article class="design-card">
      <div class="design-image">
        <a href="${designUrl(d.slug)}" aria-label="View ${escapeHtml(d.title)}"><img src="${d.image}" alt="${escapeHtml(d.title)}" loading="lazy" referrerpolicy="no-referrer"></a>
        <button class="save-btn ${saved ? 'saved' : ''}" data-save="${d.slug}" type="button" aria-label="${saved ? 'Remove from saved designs' : 'Save design'}">${saved ? icon('heartFill') : icon('heart')}</button>
      </div>
      <div class="design-meta"><h3><a href="${designUrl(d.slug)}">${escapeHtml(d.title)}</a></h3><div class="meta-row"><span>${d.shape}</span><span>${d.length}</span><span>${d.color}</span></div></div>
    </article>`;
  }

  function attachSaveButtons(scope = document) {
    scope.querySelectorAll('[data-save]').forEach(btn => btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      toggleSaved(btn.dataset.save);
    }));
  }

  function renderHome() {
    if (document.body.dataset.page !== 'home') return;
    const featured = document.querySelector('[data-featured-designs]');
    if (featured) { featured.innerHTML = designs.slice(0, 8).map(card).join(''); attachSaveButtons(featured); }
    document.querySelectorAll('[data-quick-filter]').forEach(el => el.addEventListener('click', () => {
      const [key, value] = el.dataset.quickFilter.split(':');
      location.href = `${pathTo('explore/')}?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }));
  }

  function unique(key) { return [...new Set(designs.map(d => d[key]).filter(Boolean))].sort(); }
  function optionList(values, current, label) { return `<option value="">${label}</option>${values.map(v => `<option ${v === current ? 'selected' : ''}>${escapeHtml(v)}</option>`).join('')}`; }

  function renderExplore() {
    if (document.body.dataset.page !== 'explore') return;
    const params = new URLSearchParams(location.search);
    const filtersEl = document.querySelector('[data-filters]');
    filtersEl.innerHTML = `
      <input class="search-input" type="search" name="q" placeholder="Search nails, colors or occasions" aria-label="Search designs" value="${escapeHtml(params.get('q') || '')}">
      <select class="select" name="color">${optionList(unique('color'), params.get('color'), 'Color')}</select>
      <select class="select" name="shape">${optionList(unique('shape'), params.get('shape'), 'Shape')}</select>
      <select class="select" name="length">${optionList(unique('length'), params.get('length'), 'Length')}</select>
      <select class="select hide-mobile" name="season">${optionList(unique('season'), params.get('season'), 'Season')}</select>
      <select class="select hide-tablet" name="occasion">${optionList(unique('occasion'), params.get('occasion'), 'Occasion')}</select>
      <select class="select hide-tablet" name="style">${optionList(unique('style'), params.get('style'), 'Style')}</select>
      <button class="btn btn-secondary btn-sm" data-clear type="button">Clear</button>`;

    const controls = [...filtersEl.querySelectorAll('input,select')];
    controls.forEach(el => el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', debounce(applyExplore, 120)));
    filtersEl.querySelector('[data-clear]').addEventListener('click', () => { controls.forEach(el => el.value = ''); history.replaceState({}, '', location.pathname); applyExplore(); });
    applyExplore();
  }

  function applyExplore() {
    const form = document.querySelector('[data-filters]');
    const values = Object.fromEntries([...form.querySelectorAll('input,select')].map(el => [el.name, el.value.trim()]));
    let result = designs.filter(d => {
      const hay = `${d.title} ${d.summary} ${d.color} ${d.shape} ${d.length} ${d.season} ${d.occasion} ${d.style} ${d.finish}`.toLowerCase();
      if (values.q && !hay.includes(values.q.toLowerCase())) return false;
      return ['color','shape','length','season','occasion','style'].every(k => !values[k] || d[k] === values[k]);
    });
    const query = new URLSearchParams();
    Object.entries(values).forEach(([k,v]) => { if (v) query.set(k,v); });
    history.replaceState({}, '', `${location.pathname}${query.toString() ? '?' + query : ''}`);
    const grid = document.querySelector('[data-explore-grid]');
    const count = document.querySelector('[data-result-count]');
    count.textContent = `${result.length} design${result.length === 1 ? '' : 's'}`;
    grid.innerHTML = result.length ? result.map(card).join('') : `<div class="empty-state"><span class="eyebrow">No exact match</span><h2 class="display" style="font-size:2.6rem;margin:8px 0">Try a wider combination.</h2><p class="muted">Clear one filter or search for a broader color, shape or occasion.</p></div>`;
    attachSaveButtons(grid);
  }

  function renderFinder() {
    if (document.body.dataset.page !== 'finder') return;
    const steps = [
      { key:'length', title:'What length feels right?', note:'Choose the length you wear now or want next.', options:['Short','Medium'] },
      { key:'shape', title:'Choose a nail shape.', note:'We will prioritize designs that suit this silhouette.', options:['Round','Squoval','Square','Almond'] },
      { key:'color', title:'Pick your color direction.', note:'Choose one family; you can explore variations afterward.', options:['Pink','Blue','Red','White','Yellow','Nude','Purple'] },
      { key:'style', title:'What is the mood?', note:'Select the overall feeling you want.', options:['Minimal','Elegant','Cute','French','Bold','Classic','Romantic','Edgy'] },
      { key:'occasion', title:'Where are you wearing it?', note:'This helps balance practicality and impact.', options:['Everyday','Office','Vacation','Beach','Wedding','Bridal','Party','Date Night'] },
      { key:'finish', title:'Choose a finish.', note:'The finish changes how subtle or statement-making the set feels.', options:['Glossy','Sheer','Pearl','Glitter','Natural'] }
    ];
    let step = 0;
    const answers = {};
    const cardEl = document.querySelector('[data-finder-card]');
    const progress = document.querySelector('[data-progress]');
    const stepText = document.querySelector('[data-step-text]');

    const draw = () => {
      const item = steps[step];
      stepText.textContent = `Step ${step + 1} of ${steps.length}`;
      progress.style.width = `${((step + 1) / steps.length) * 100}%`;
      cardEl.innerHTML = `<span class="eyebrow">${escapeHtml(item.key)}</span><h2>${escapeHtml(item.title)}</h2><p class="muted">${escapeHtml(item.note)}</p><div class="option-grid">${item.options.map(v => `<button type="button" class="quiz-option ${answers[item.key] === v ? 'selected' : ''}" data-value="${escapeHtml(v)}">${escapeHtml(v)}</button>`).join('')}</div><div class="finder-nav"><button class="btn btn-secondary" type="button" data-prev ${step === 0 ? 'disabled' : ''}>Back</button><button class="btn btn-primary" type="button" data-next ${answers[item.key] ? '' : 'disabled'}>${step === steps.length - 1 ? 'Show my matches' : 'Continue'} ${icon('arrow',18)}</button></div>`;
      cardEl.querySelectorAll('[data-value]').forEach(btn => btn.addEventListener('click', () => { answers[item.key] = btn.dataset.value; draw(); }));
      cardEl.querySelector('[data-prev]').addEventListener('click', () => { if (step > 0) { step--; draw(); } });
      cardEl.querySelector('[data-next]').addEventListener('click', () => { if (!answers[item.key]) return; if (step < steps.length - 1) { step++; draw(); } else showFinderResults(answers, cardEl); });
    };
    draw();
  }

  function showFinderResults(answers, cardEl) {
    const scored = designs.map(d => ({ d, score: Object.entries(answers).reduce((s,[k,v]) => s + (d[k] === v ? 2 : 0), 0) })).sort((a,b) => b.score - a.score);
    const top = scored.slice(0, 6).map(x => x.d);
    document.querySelector('[data-step-text]').textContent = 'Your result';
    document.querySelector('[data-progress]').style.width = '100%';
    cardEl.innerHTML = `<div class="result-header"><div><span class="eyebrow">Best matches</span><h2 style="margin-bottom:5px">Your next set is here.</h2><p class="muted">Matched using your length, shape, color, style, occasion and finish.</p></div><button class="btn btn-secondary btn-sm" type="button" data-restart>Start again</button></div><div class="design-grid">${top.map(card).join('')}</div>`;
    cardEl.style.padding = '26px';
    attachSaveButtons(cardEl);
    cardEl.querySelector('[data-restart]').addEventListener('click', () => location.reload());
  }

  function renderSaved() {
    if (document.body.dataset.page !== 'saved') return;
    const slugs = getSaved();
    const selected = slugs.map(slug => designs.find(d => d.slug === slug)).filter(Boolean);
    const grid = document.querySelector('[data-saved-grid]');
    const empty = document.querySelector('[data-saved-empty]');
    const count = document.querySelector('[data-saved-total]');
    count.textContent = `${selected.length} saved design${selected.length === 1 ? '' : 's'}`;
    empty.classList.toggle('hidden', selected.length > 0);
    grid.classList.toggle('hidden', selected.length === 0);
    grid.innerHTML = selected.map(card).join('');
    attachSaveButtons(grid);
  }

  function renderDesign() {
    if (document.body.dataset.page !== 'design') return;
    const slug = new URLSearchParams(location.search).get('slug');
    const d = designs.find(item => item.slug === slug) || designs[0];
    document.title = `${d.title} | ${config.brand}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', d.summary);
    const root = document.querySelector('[data-design-detail]');
    const saved = isSaved(d.slug);
    root.innerHTML = `<div class="detail-layout">
      <div class="detail-image-wrap"><div class="detail-image"><img src="${d.image}" alt="${escapeHtml(d.title)}" referrerpolicy="no-referrer"></div><div class="credit">Demo image: <a href="${d.source}" rel="noopener">${escapeHtml(d.credit)}</a></div></div>
      <div class="detail-copy"><span class="eyebrow">${d.season} · ${d.style}</span><h1 class="display">${escapeHtml(d.title)}</h1><p class="muted" style="font-size:1.08rem">${escapeHtml(d.summary)}</p>
      <div class="detail-actions"><button class="btn ${saved ? 'btn-primary' : 'btn-secondary'}" type="button" data-detail-save data-save="${d.slug}">${saved ? icon('heartFill') : icon('heart')} ${saved ? 'Saved' : 'Save design'}</button><button class="btn btn-secondary" type="button" data-share>${icon('share')} Share</button></div>
      <div class="spec-grid">${[['Color',d.color],['Shape',d.shape],['Length',d.length],['Finish',d.finish],['Difficulty',d.difficulty],['Maintenance',d.maintenance]].map(([k,v]) => `<div class="spec"><span>${k}</span><strong>${v}</strong></div>`).join('')}</div>
      <div class="salon-brief"><span class="eyebrow" style="color:#f1d9dd">Copyable salon brief</span><p>${escapeHtml(d.salonBrief)}</p><button class="btn btn-secondary btn-sm" type="button" data-copy-brief>${icon('copy',17)} Copy brief</button><span class="copy-status" data-copy-status></span></div>
      <div class="info-block"><h2>Why this design works</h2><p class="muted">${escapeHtml(d.why)}</p></div>
      <div class="info-block"><h2>Best suited to</h2><p class="muted">${d.length} ${d.shape.toLowerCase()} nails, ${d.occasion.toLowerCase()} plans and anyone looking for a ${d.style.toLowerCase()} ${d.finish.toLowerCase()} finish.</p></div>
      <div class="info-block"><h2>Make it simpler</h2><p class="muted">Keep the same base color and shape, remove accent details and ask for one uniform finish across all ten nails.</p></div>
      </div></div><section class="section-sm"><div class="section-head"><div><span class="eyebrow">Keep browsing</span><h2 class="display">Similar ideas</h2></div><a class="link-arrow" href="${pathTo('explore/')}?color=${encodeURIComponent(d.color)}">More ${d.color.toLowerCase()} nails</a></div><div class="design-grid" data-similar></div></section>`;
    attachSaveButtons(root);
    const detailBtn = root.querySelector('[data-detail-save]');
    detailBtn.addEventListener('click', () => setTimeout(() => { const now = isSaved(d.slug); detailBtn.className = `btn ${now ? 'btn-primary' : 'btn-secondary'}`; detailBtn.innerHTML = `${now ? icon('heartFill') : icon('heart')} ${now ? 'Saved' : 'Save design'}`; }, 0));
    root.querySelector('[data-copy-brief]').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(d.salonBrief); root.querySelector('[data-copy-status]').textContent = 'Copied'; toast('Salon brief copied'); }
      catch { root.querySelector('[data-copy-status]').textContent = 'Select and copy the text above'; }
    });
    root.querySelector('[data-share]').addEventListener('click', async () => {
      const payload = { title: d.title, text: d.summary, url: location.href };
      if (navigator.share) await navigator.share(payload).catch(() => {}); else { await navigator.clipboard.writeText(location.href); toast('Page link copied'); }
    });
    const similar = designs.filter(x => x.slug !== d.slug && (x.color === d.color || x.style === d.style || x.occasion === d.occasion)).slice(0,4);
    const simEl = root.querySelector('[data-similar]'); simEl.innerHTML = similar.map(card).join(''); attachSaveButtons(simEl);
  }

  function newsletterForms() {
    document.querySelectorAll('[data-email-form]').forEach(form => form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type=email]');
      if (!input.value || !input.checkValidity()) { input.reportValidity(); return; }
      localStorage.setItem('glossgrid-email-demo', input.value);
      toast('You are on the weekly inspiration list');
      input.value = '';
    }));
  }

  function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function debounce(fn, wait) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); }; }

  header(); footer(); renderHome(); renderExplore(); renderFinder(); renderSaved(); renderDesign(); newsletterForms();
})();
