// Favorites. The page loads this before its own script and calls
// CircleFavorites.init({ current, show, thumbnail }), then CircleFavorites.update()
// whenever it shows a new composition. A favorite is { id, urls, seed, thumb,
// saved }: enough to redraw the exact composition. It mounts into the page's
// #controls cluster, whose .bar / .panel / .open styles it relies on.
window.CircleFavorites = (() => {
  const KEY = 'circles-favorites';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const store = list => {
    try { localStorage.setItem(KEY, JSON.stringify(list)); return true; }
    catch { alert('Could not save favorite (browser storage full or blocked).'); return false; }
  };
  const same = (a, b) => a && b && a.seed === b.seed && a.urls.join() === b.urls.join()
    && (a.shape || 'circle') === (b.shape || 'circle');
  let hooks = null, root, heart, count, panel, grid;

  function build() {
    const style = document.createElement('style');
    style.textContent = `
      #favs .heart.on { color: #ff6b81; }
      #favs .panel { width: 560px; padding: 8px; }
      #favs .head { display: flex; justify-content: space-between; align-items: center; margin: 0 0 8px 2px; font-weight: 600; }
      #favs .head .close { all: unset; cursor: pointer; width: 20px; height: 20px; line-height: 20px; text-align: center;
        border-radius: 4px; font-size: 16px; color: #aaa; }
      #favs .head .close:hover { color: #fff; background: rgba(255,255,255,.12); }
      #favs .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
      #favs .item { position: relative; border-radius: 4px; overflow: hidden; outline: 2px solid transparent; }
      #favs .item.cur { outline-color: #ff6b81; }
      #favs .item img { display: block; width: 100%; cursor: pointer; background: #222; }
      #favs .item .meta { padding: 2px 4px; color: #999; font-size: 11px; }
      #favs .item .del { all: unset; cursor: pointer; position: absolute; top: 2px; right: 2px; width: 18px; height: 18px; text-align: center;
        line-height: 18px; border-radius: 50%; background: rgba(0,0,0,.6); opacity: 0; }
      #favs .item:hover .del { opacity: 1; }
      #favs .empty { grid-column: 1 / -1; color: #999; padding: 4px; }
      #favs .tools { display: flex; flex-wrap: wrap; gap: 4px 12px; justify-content: space-between; margin-top: 8px; color: #888; }
      #favs .tools button { all: unset; cursor: pointer; }
      #favs .tools button:hover { color: #fff; }
    `;
    document.head.appendChild(style);

    // use the page's #favs slot if it has one (keeps control order), else make one
    root = document.getElementById('favs') || document.createElement('div');
    root.id = 'favs';
    root.innerHTML = `
      <div class="panel">
        <div class="head"><span>Favorites</span><button class="close" aria-label="Close">×</button></div>
        <div class="grid"></div>
        <div class="tools">
          <span>Press F to favorite. Press L to show/hide favorites.</span>
          <span><button class="export">export</button> · <button class="import">import</button></span>
        </div>
      </div>
      <div class="bar">
        <button class="heart" data-label="Add to favorites">♡</button>
        <button class="count" data-label="Favorites">0</button>
      </div>`;
    panel = root.querySelector('.panel');
    grid = root.querySelector('.grid');
    heart = root.querySelector('.heart');
    count = root.querySelector('.count');
    root.addEventListener('click', e => e.stopPropagation()); // don't advance the images
    heart.addEventListener('click', toggleCurrent);
    count.addEventListener('click', toggleList);
    root.querySelector('.close').addEventListener('click', toggleList);
    root.querySelector('.export').addEventListener('click', exportFavs);
    root.querySelector('.import').addEventListener('click', importFavs);
    if (!root.isConnected) (document.getElementById('controls') || document.body).appendChild(root);

    addEventListener('keydown', e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'f' || e.key === 'F') toggleCurrent();
      if (e.key === 'l' || e.key === 'L') toggleList();
    });
  }

  function toggleCurrent() {
    const cur = hooks?.current();
    if (!cur) return;
    const list = load();
    const i = list.findIndex(f => same(f, cur));
    if (i >= 0) list.splice(i, 1);
    else {
      let thumb = null;
      try { thumb = hooks.thumbnail(); } catch { /* no thumbnail if canvas is unreadable */ }
      list.unshift({ id: Date.now().toString(36), ...cur, thumb, saved: new Date().toISOString() });
    }
    if (store(list)) update();
  }

  function toggleList() {
    document.getElementById('about')?.classList.remove('open');   // one panel at a time
    root.classList.toggle('open');
    update();
  }

  function open(f) {
    history.replaceState(null, '', '#fav=' + f.id);
    hooks.show(f);
  }

  function update() {
    if (!root) return;
    const list = load(), cur = hooks?.current();
    const saved = list.some(f => same(f, cur));
    heart.textContent = saved ? '♥' : '♡';
    heart.classList.toggle('on', saved);
    heart.dataset.label = saved ? 'Remove from favorites' : 'Add to favorites';
    count.textContent = list.length;
    if (!root.classList.contains('open')) return;
    grid.innerHTML = list.length ? '' : '<div class="empty">No favorites yet. Press ♡ or F to save one.</div>';
    for (const f of list) {
      const item = document.createElement('div');
      item.className = 'item' + (same(f, cur) ? ' cur' : '');
      item.innerHTML = `<img alt=""><div class="meta">${new Date(f.saved).toLocaleDateString()}</div>
        <button class="del" title="Remove">×</button>`;
      const img = item.querySelector('img');
      if (f.thumb) img.src = f.thumb; else img.style.aspectRatio = '16 / 10';
      img.addEventListener('click', () => open(f));
      item.querySelector('.del').addEventListener('click', () => {
        if (store(load().filter(x => x.id !== f.id))) update();
      });
      grid.appendChild(item);
    }
  }

  function exportFavs() {
    const blob = new Blob([JSON.stringify(load(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'nibble-favorites.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importFavs() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = async () => {
      try {
        const incoming = JSON.parse(await input.files[0].text());
        const list = load(), ids = new Set(list.map(f => f.id));
        for (const f of incoming) if (f?.id && Array.isArray(f.urls) && !ids.has(f.id)) list.push(f);
        list.sort((a, b) => (b.saved || '').localeCompare(a.saved || ''));
        if (store(list)) update();
      } catch { alert('That file is not a favorites export.'); }
    };
    input.click();
  }

  return {
    init(h) { hooks = h; build(); update(); },
    update,
    // favorite named in the URL (#fav=id), if any
    fromHash() {
      const id = location.hash.match(/^#fav=(.+)$/)?.[1];
      return id ? load().find(f => f.id === id) || null : null;
    },
  };
})();
