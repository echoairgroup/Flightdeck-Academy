import { views, controls, tutorial, categories, allControlsCount } from './data/a320ceo.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const byId = (id) => controls.find((control) => control.id === id);
const getView = (id) => views.find((view) => view.id === id);
const viewName = (id) => getView(id)?.title || id;

let activeView = 'overview';
let selectedId = null;
let searchTerm = '';
let directoryFilter = 'all';
let markersVisible = true;
let tutorialIndex = 0;
let seen = new Set();

try {
  seen = new Set(JSON.parse(localStorage.getItem('flightdeck-atlas-seen') || '[]'));
} catch {
  seen = new Set();
}

/* Photo viewer state */
let zoom = 1;
let panX = 0;
let panY = 0;
let drag = null;
let pointerMoved = false;
const stage = $('#photoStage');
const canvas = $('#photoCanvas');
const photo = $('#panelPhoto');

function saveProgress() {
  try { localStorage.setItem('flightdeck-atlas-seen', JSON.stringify([...seen])); } catch {}
}

function updateProgress() {
  $('#controlTotal').textContent = controls.length.toString();
}

function getViewControls(viewId = activeView) {
  return controls.filter((control) => control.view === viewId);
}

function applyPhotoTransform() {
  canvas.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`;
  $('#zoomLabel').textContent = `${Math.round(zoom * 100)}%`;
}

function clampPan() {
  const rect = stage.getBoundingClientRect();
  const maxX = Math.max(0, (rect.width * zoom - rect.width) / 2);
  const maxY = Math.max(0, (rect.height * zoom - rect.height) / 2);
  panX = Math.min(maxX, Math.max(-maxX, panX));
  panY = Math.min(maxY, Math.max(-maxY, panY));
  if (zoom <= 1) { panX = 0; panY = 0; }
}

function setZoom(nextZoom, anchorX = null, anchorY = null) {
  const previous = zoom;
  zoom = Math.max(1, Math.min(5, nextZoom));
  const rect = stage.getBoundingClientRect();

  if (anchorX !== null && anchorY !== null && previous !== zoom) {
    const x = anchorX - rect.left - rect.width / 2;
    const y = anchorY - rect.top - rect.height / 2;
    const ratio = zoom / previous;
    panX = x - (x - panX) * ratio;
    panY = y - (y - panY) * ratio;
  }

  clampPan();
  applyPhotoTransform();
}

function resetZoom() {
  zoom = 1;
  panX = 0;
  panY = 0;
  applyPhotoTransform();
}

function setView(viewId) {
  const view = getView(viewId);
  if (!view) return;

  activeView = viewId;
  selectedId = null;
  resetZoom();

  $$('.view-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.view === viewId);
    button.setAttribute('aria-selected', button.dataset.view === viewId ? 'true' : 'false');
  });

  $('#viewTitle').textContent = view.title;
  $('#viewSubtitle').textContent = view.subtitle;
  $('#photoNote').textContent = view.note;
  $('#openOriginal').href = view.src;
  $('#openOriginal').setAttribute('aria-label', `Open originele foto: ${view.title}`);
  $('#photoCredit').innerHTML = `Foto: <a href="${escapeHTML(view.source)}" target="_blank" rel="noopener">${escapeHTML(view.author)}</a> · ${escapeHTML(view.licence)} · <a href="${escapeHTML(view.licenceUrl)}" target="_blank" rel="noopener">licentie</a>`;

  $('#photoLoading').classList.remove('error');
  $('#photoLoading').textContent = 'Foto laden…';
  $('#photoLoading').hidden = false;
  photo.alt = `${view.title} — foto van een Airbus A320-family cockpitpaneel. Klik op de genummerde punten voor uitleg.`;
  photo.src = view.src;

  photo.onload = () => {
    stage.style.aspectRatio = `${photo.naturalWidth} / ${photo.naturalHeight}`;
    $('#photoLoading').hidden = true;
    resetZoom();
  };
  photo.onerror = () => {
    $('#photoLoading').hidden = false;
    $('#photoLoading').classList.add('error');
    $('#photoLoading').innerHTML = `De foto kon niet worden geladen. <a href="${escapeHTML(view.src)}" target="_blank" rel="noopener">Open de foto rechtstreeks</a>.`;
  };

  renderHotspots();
  renderDetail(null);
  $('#markerCount').textContent = `${getViewControls().length} gemarkeerde punten in deze foto`;
  renderDirectory();
}

function renderHotspots() {
  const items = getViewControls();
  const container = $('#hotspots');

  container.innerHTML = items.map((item, index) => `
    <button
      class="hotspot ${selectedId === item.id ? 'selected' : ''}"
      type="button"
      style="left:${item.x}%;top:${item.y}%"
      data-hotspot="${escapeHTML(item.id)}"
      aria-label="${index + 1}. ${escapeHTML(item.title)}"
      title="${escapeHTML(item.title)}"
    >${index + 1}</button>
  `).join('');

  container.querySelectorAll('[data-hotspot]').forEach((button) => {
    button.addEventListener('click', () => selectControl(button.dataset.hotspot));
  });

  container.classList.toggle('markers-hidden', !markersVisible);
  $('#markerCount').textContent = `${items.length} gemarkeerde punten in deze foto`;
}

function renderDetail(item) {
  const panel = $('#detailPanel');

  if (!item) {
    panel.innerHTML = `
      <div class="detail-empty">
        <p class="eyebrow">ONDERDEEL UITLEG</p>
        <span class="empty-symbol">A320</span>
        <h2>Klik op een gemarkeerd onderdeel</h2>
        <p>Elk genummerd punt hoort bij een specifiek bedieningselement. Klik op een punt of zoek een onderdeel in het register.</p>
      </div>
    `;
    return;
  }

  const index = getViewControls(item.view).findIndex((control) => control.id === item.id);
  panel.innerHTML = `
    <div class="detail-topline"><span class="eyebrow">${escapeHTML(viewName(item.view))}</span><span class="detail-index">#${String(index + 1).padStart(2, '0')}</span></div>
    <h2>${escapeHTML(item.title)}</h2>
    <p class="detail-group">${escapeHTML(item.group)}</p>
    <section class="detail-section">
      <h3>Wat is dit?</h3>
      <p>${escapeHTML(item.description)}</p>
    </section>
    <section class="detail-section">
      <h3>Wat doet het?</h3>
      <p>${escapeHTML(item.purpose)}</p>
    </section>
    <section class="detail-section">
      <h3>Wanneer kom je het tegen?</h3>
      <p>${escapeHTML(item.context)}</p>
    </section>
    <div class="detail-note"><strong>Let op</strong><p>Dit is uitleg voor herkenning en algemene systeemkennis. Het is geen bedieningsinstructie of checklist. De uitvoering kan per vliegtuig verschillen.</p></div>
    <div class="detail-actions">
      <button type="button" class="small-button" id="focusButton">Zoom op dit punt</button>
      <button type="button" class="small-button next-control" id="nextControl">Volgend onderdeel →</button>
    </div>
    <p class="seen-status">${seen.has(item.id) ? '✓ Bekeken' : 'Nog niet bekeken'}</p>
  `;

  $('#focusButton').addEventListener('click', () => zoomToControl(item));
  $('#nextControl').addEventListener('click', () => selectNextControl(item.id));
}

function markSeen(id) {
  if (!seen.has(id)) {
    seen.add(id);
    saveProgress();
  }
}

function selectControl(id) {
  const item = byId(id);
  if (!item) return;

  if (item.view !== activeView) setView(item.view);
  selectedId = id;
  markSeen(id);
  renderHotspots();
  renderDetail(item);
  updateDirectorySelection();

  const index = getViewControls(item.view).findIndex((control) => control.id === id);
  $('#markerCount').textContent = `Geselecteerd: punt ${index + 1} van ${getViewControls().length}`;
}

function selectNextControl(currentId) {
  const list = getViewControls();
  const currentIndex = list.findIndex((control) => control.id === currentId);
  const next = list[(currentIndex + 1) % list.length];
  if (next) {
    selectControl(next.id);
    zoomToControl(next);
  }
}

function zoomToControl(item) {
  const nextZoom = Math.max(zoom, 2.2);
  const rect = stage.getBoundingClientRect();
  const targetX = rect.left + (item.x / 100) * rect.width;
  const targetY = rect.top + (item.y / 100) * rect.height;
  setZoom(nextZoom, targetX, targetY);
}

/* Directory: search all controls, not just the active photo. */
function renderFilters() {
  const container = $('#directoryFilters');
  const filters = [{ id: 'all', label: 'Alle onderdelen' }, ...views.map((view) => ({ id: view.id, label: view.title }))];
  container.innerHTML = filters.map((filter) => `
    <button type="button" class="filter-button ${directoryFilter === filter.id ? 'active' : ''}" data-filter="${filter.id}">${escapeHTML(filter.label)}</button>
  `).join('');

  container.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      directoryFilter = button.dataset.filter;
      renderFilters();
      renderDirectory();
    });
  });
}

function getFilteredControls() {
  const term = searchTerm.trim().toLowerCase();
  return controls.filter((item) => {
    const filterMatch = directoryFilter === 'all' || item.view === directoryFilter;
    const searchText = [item.title, item.description, item.purpose, item.context, item.group, viewName(item.view)].join(' ').toLowerCase();
    return filterMatch && (!term || searchText.includes(term));
  });
}

function renderDirectory() {
  const items = getFilteredControls();
  $('#resultCount').textContent = `${items.length} van ${controls.length} onderdelen`;
  const container = $('#componentList');

  if (!items.length) {
    container.innerHTML = '<p class="no-results">Geen resultaten. Probeer een andere zoekterm.</p>';
    return;
  }

  container.innerHTML = items.map((item) => `
    <button type="button" class="component-row ${selectedId === item.id ? 'selected' : ''}" data-component="${escapeHTML(item.id)}">
      <span class="row-number">${String(controls.indexOf(item) + 1).padStart(3, '0')}</span>
      <span class="row-copy"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(viewName(item.view))}</small></span>
      <span class="row-arrow">›</span>
    </button>
  `).join('');

  container.querySelectorAll('[data-component]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = byId(button.dataset.component);
      if (!item) return;
      setView(item.view);
      selectControl(item.id);
      if (window.innerWidth < 850) $('#cockpit').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function updateDirectorySelection() {
  $$('.component-row').forEach((button) => button.classList.toggle('selected', button.dataset.component === selectedId));
}

/* Learning tour */
function openTutorial(index = 0) {
  tutorialIndex = Math.max(0, Math.min(index, tutorial.length - 1));
  renderTutorialStep();
  $('#tutorialOverlay').hidden = false;
  document.body.classList.add('modal-open');
}

function closeTutorial() {
  $('#tutorialOverlay').hidden = true;
  document.body.classList.remove('modal-open');
}

function renderTutorialStep() {
  const step = tutorial[tutorialIndex];
  const item = byId(step.item);
  if (step.view !== activeView) setView(step.view);
  if (item) selectControl(item.id);

  $('#tutorialStep').textContent = `STAP ${tutorialIndex + 1} / ${tutorial.length}`;
  $('#tutorialProgress').style.width = `${((tutorialIndex + 1) / tutorial.length) * 100}%`;
  $('#tutorialTitle').textContent = step.title;
  $('#tutorialBody').textContent = step.body;
  $('#tutorialSelected').textContent = item ? `Bekijk nu: ${item.title}` : viewName(step.view);
  $('#tutorialBack').disabled = tutorialIndex === 0;
  $('#tutorialNext').textContent = tutorialIndex === tutorial.length - 1 ? 'Rondleiding afronden ✓' : 'Volgende stap →';
}

function buildSourceList() {
  $('#sourceList').innerHTML = views.map((view) => `
    <div class="source-entry">
      <strong>${escapeHTML(view.title)}</strong>
      <span>${escapeHTML(view.author)} · ${escapeHTML(view.licence)}</span>
      <a href="${escapeHTML(view.source)}" target="_blank" rel="noopener">Oorspronkelijke foto / bron</a>
    </div>
  `).join('');
}

/* Event listeners */
$$('.view-tab').forEach((button) => {
  button.addEventListener('click', () => setView(button.dataset.view));
});

$('#toggleMarkers').addEventListener('click', () => {
  markersVisible = !markersVisible;
  $('#toggleMarkers').textContent = markersVisible ? 'Markeringen verbergen' : 'Markeringen tonen';
  $('#hotspots').classList.toggle('markers-hidden', !markersVisible);
});

$('#zoomIn').addEventListener('click', () => setZoom(zoom + 0.25));
$('#zoomOut').addEventListener('click', () => setZoom(zoom - 0.25));
$('#zoomReset').addEventListener('click', resetZoom);

stage.addEventListener('wheel', (event) => {
  event.preventDefault();
  setZoom(zoom + (event.deltaY < 0 ? 0.18 : -0.18), event.clientX, event.clientY);
}, { passive: false });

stage.addEventListener('pointerdown', (event) => {
  if (event.target.closest('.hotspot') || event.target.closest('.zoom-controls')) return;
  drag = { x: event.clientX, y: event.clientY, panX, panY, pointerId: event.pointerId };
  pointerMoved = false;
  stage.classList.add('dragging');
  stage.setPointerCapture?.(event.pointerId);
});

stage.addEventListener('pointermove', (event) => {
  if (!drag || drag.pointerId !== event.pointerId || zoom <= 1) return;
  const dx = event.clientX - drag.x;
  const dy = event.clientY - drag.y;
  if (Math.abs(dx) + Math.abs(dy) > 3) pointerMoved = true;
  panX = drag.panX + dx;
  panY = drag.panY + dy;
  clampPan();
  applyPhotoTransform();
});

function finishDrag(event) {
  if (!drag) return;
  if (stage.hasPointerCapture?.(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  drag = null;
  stage.classList.remove('dragging');
}
stage.addEventListener('pointerup', finishDrag);
stage.addEventListener('pointercancel', finishDrag);
stage.addEventListener('lostpointercapture', () => { drag = null; stage.classList.remove('dragging'); });

$('#searchInput').addEventListener('input', (event) => {
  searchTerm = event.target.value;
  directoryFilter = 'all';
  renderFilters();
  renderDirectory();
});

$('#startTutorial').addEventListener('click', () => openTutorial(0));
$('#startTutorialBottom').addEventListener('click', () => openTutorial(0));
$('#closeTutorial').addEventListener('click', closeTutorial);
$('#tutorialBack').addEventListener('click', () => {
  if (tutorialIndex > 0) { tutorialIndex -= 1; renderTutorialStep(); }
});
$('#tutorialNext').addEventListener('click', () => {
  if (tutorialIndex === tutorial.length - 1) closeTutorial();
  else { tutorialIndex += 1; renderTutorialStep(); }
});

$('#tutorialOverlay').addEventListener('click', (event) => {
  if (event.target === $('#tutorialOverlay')) closeTutorial();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !$('#tutorialOverlay').hidden) closeTutorial();
  if (event.key === '+' || event.key === '=') setZoom(zoom + 0.25);
  if (event.key === '-') setZoom(zoom - 0.25);
  if (event.key === '0') resetZoom();
});

/* Initialise */
function init() {
  updateProgress();
  buildSourceList();
  renderFilters();
  renderDirectory();
  setView('overview');
  window.addEventListener('resize', () => { clampPan(); applyPhotoTransform(); });
}

init();
