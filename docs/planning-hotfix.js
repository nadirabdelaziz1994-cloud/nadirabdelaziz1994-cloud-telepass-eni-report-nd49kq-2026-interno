(() => {
  if (window.__mwPlanningHotfix) return;
  window.__mwPlanningHotfix = true;
  const norm = v => String(v || '').toLowerCase();
  const shown = el => el && el.offsetParent !== null;
  function roots(){ return [...document.querySelectorAll('[id*="planning" i],[class*="planning" i],[id*="pian" i],[class*="pian" i]')].filter(shown); }
  function cards(root){ return [...root.querySelectorAll('[draggable="true"],[class*="pdv" i],[class*="visit" i],[class*="item" i],[class*="block" i],li')].filter(shown); }
  function setup(){
    for (const r of roots()) for (const c of cards(r)) {
      if (c.dataset.mwDrag) continue;
      c.dataset.mwDrag = '1';
      c.style.cursor = 'grab';
      c.draggable = true;
      c.addEventListener('dragstart', e => { window.__mwDragEl = c; c.style.opacity = '.45'; e.dataTransfer.effectAllowed = 'move'; });
      c.addEventListener('dragend', () => { c.style.opacity = ''; window.__mwDragEl = null; });
      c.addEventListener('dragover', e => e.preventDefault());
      c.addEventListener('drop', e => { e.preventDefault(); const d = window.__mwDragEl; if (!d || d === c) return; c.parentNode.insertBefore(d, c); });
    }
  }
  document.addEventListener('dragover', e => e.preventDefault(), true);
  setInterval(setup, 700);
  setup();
})();
