import { aircraftItems, categories, tours } from './data/a320ceo.js';
import { aircraftRegistry } from './data/aircraftRegistry.js';
import { CockpitScene } from './scene/cockpit.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const byId = id => aircraftItems.find(item => item.id === id);
const categoryName = id => categories.find(category => category.id === id)?.label || id;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

let activeCategory = 'all';
let activeItem = null;
let activeTab = 'overview';
let searchTerm = '';
let tourIndex = 0;
let learned = new Set();
let cockpit;
let toastTimer;

try { learned = new Set(JSON.parse(localStorage.getItem('flightdeck-learned') || '[]')); } catch { learned = new Set(); }

const inspector = $('#inspectorContent');
const heading = $('#inspectorHeading');
const searchInput = $('#searchInput');
const modal = $('#modalBackdrop');
const modalBody = $('#modalBody');

function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('visible'), 2600);
}

function updateProgress() {
  const count = learned.size;
  const percent = Math.round(count / aircraftItems.length * 100);
  $('#progressPercent').textContent = percent + '%';
  $('#progressBar').style.width = percent + '%';
  $('#progressText').textContent = count ? count + ' van ' + aircraftItems.length + ' onderdelen bekeken.' : 'Ontdek onderdelen om te beginnen.';
}

function markLearned(id) {
  if (!learned.has(id)) {
    learned.add(id);
    try { localStorage.setItem('flightdeck-learned', JSON.stringify([...learned])); } catch {}
  }
  updateProgress();
}

function updateSelected(item) {
  $('#selectedIndicatorText').textContent = item ? 'SELECTED · ' + (item.short || item.title).toUpperCase() : 'SELECT AN AIRCRAFT COMPONENT';
  $('#selectedIndicator').classList.toggle('has-selection', Boolean(item));
}

function setView(view) {
  const label = cockpit.focusView(view);
  $('#viewLabel').textContent = label;
  $$('.view-preset').forEach(button => button.classList.toggle('active', button.dataset.view === view));
}

function selectItem(id, options = {}) {
  const item = byId(id);
  if (!item) return;
  activeItem = item;
  activeTab = 'overview';
  cockpit?.select(id);
  updateSelected(item);
  heading.textContent = item.title;
  markLearned(id);
  renderItem(item);
  if (options.focus) setView(item.view || 'captain');
}

function renderItem(item) {
  const related = (item.related || []).map(byId).filter(Boolean);
  inspector.innerHTML = `
    <div class="component-hero"><div class="component-monogram">${escapeHTML(item.short)}</div><div class="component-hero-copy"><span class="component-zone">${escapeHTML(item.zone)}</span><span class="component-category">${escapeHTML(categoryName(item.category))}</span></div><span class="component-index">A320 / ${String(aircraftItems.indexOf(item) + 1).padStart(2, '0')}</span></div>
    <h3 class="component-title">${escapeHTML(item.title)}</h3><p class="component-summary">${escapeHTML(item.summary)}</p>
    <div class="component-meta-row"><span class="meta-pill"><i></i> COCKPIT COMPONENT</span><span class="meta-code">${escapeHTML(item.short)}</span></div>
    <div class="detail-tabs" role="tablist"><button class="detail-tab ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview">Overzicht</button><button class="detail-tab ${activeTab === 'howto' ? 'active' : ''}" data-tab="howto">Hoe werkt het?</button><button class="detail-tab ${activeTab === 'context' ? 'active' : ''}" data-tab="context">Gebruik & context</button></div>
    <div class="detail-body">${renderTab(item)}</div>
    <div class="inspector-divider"></div><div class="related-header"><span class="mini-heading">GERELATEERDE ONDERDELEN</span><span class="related-count">${String(related.length).padStart(2, '0')}</span></div>
    <div class="related-list">${related.length ? related.map(part => `<button class="related-item" data-related="${part.id}"><span class="related-dot"></span><span>${escapeHTML(part.title)}</span><b>↗</b></button>`).join('') : '<p class="empty-related">Verken ook de andere cockpitonderdelen.</p>'}</div>
    <div class="inspector-note caution-note"><span>i</span><p><strong>Educatieve toelichting</strong><br>${escapeHTML(item.note)}</p></div>
    <button class="mark-read-button ${learned.has(item.id) ? 'is-read' : ''}" id="markReadButton"><span>${learned.has(item.id) ? '✓' : '○'}</span>${learned.has(item.id) ? 'Onderdeel bekeken' : 'Markeer als bekeken'}</button>
  `;
  $$('.detail-tab', inspector).forEach(button => button.addEventListener('click', () => { activeTab = button.dataset.tab; renderItem(item); }));
  $$('[data-related]', inspector).forEach(button => button.addEventListener('click', () => selectItem(button.dataset.related, { focus: true })));
  $('#markReadButton', inspector)?.addEventListener('click', () => { markLearned(item.id); renderItem(item); });
}

function renderTab(item) {
  if (activeTab === 'howto') return `<div class="detail-section"><span class="detail-section-label">STAP VOOR STAP HERKENNEN</span><ol class="howto-list">${item.howTo.map((step, index) => `<li><span class="step-number">${String(index + 1).padStart(2, '0')}</span><p>${escapeHTML(step)}</p></li>`).join('')}</ol></div><div class="detail-section function-box"><span class="detail-section-label">HOE HET WERKT</span><p>${escapeHTML(item.function)}</p></div>`;
  if (activeTab === 'context') return `<div class="detail-section"><span class="detail-section-label">WANNEER KOM JE DIT TEGEN?</span><p>${escapeHTML(item.when)}</p></div><div class="detail-section function-box"><span class="detail-section-label">SYSTEEMCONTEXT</span><p>${escapeHTML(item.function)}</p></div><div class="detail-section"><span class="detail-section-label">WAAROM IS DIT BELANGRIJK?</span><p>${escapeHTML(item.purpose)}</p></div>`;
  return `<div class="detail-section"><span class="detail-section-label">WAT IS HET?</span><p>${escapeHTML(item.purpose)}</p></div><div class="detail-section function-box"><span class="detail-section-label">FUNCTIE IN DE COCKPIT</span><p>${escapeHTML(item.function)}</p></div><div class="detail-section"><span class="detail-section-label">WAAR VIND JE HET?</span><p>Dit onderdeel bevindt zich in de zone <strong>${escapeHTML(item.zone)}</strong> van de Airbus A320ceo-cockpit. Selecteer de bijbehorende hotspot om de locatie in 3D te bekijken.</p></div>`;
}

function getFiltered() {
  const needle = searchTerm.trim().toLowerCase();
  return aircraftItems.filter(item => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    const searchMatch = !needle || [item.title, item.short, item.zone, item.summary, item.purpose, categoryName(item.category)].join(' ').toLowerCase().includes(needle);
    return categoryMatch && searchMatch;
  });
}

function renderDirectory() {
  activeItem = null;
  cockpit?.select(null);
  updateSelected(null);
  const items = getFiltered();
  heading.textContent = searchTerm ? 'Zoekresultaten' : (activeCategory === 'all' ? 'Cockpit directory' : categoryName(activeCategory));
  if (!items.length) {
    inspector.innerHTML = '<div class="search-empty"><span>⌕</span><h3>Geen onderdelen gevonden</h3><p>Probeer een andere zoekterm of kies een categorie.</p><button class="soft-button" id="clearSearch">Wis zoekopdracht</button></div>';
    $('#clearSearch')?.addEventListener('click', () => { searchInput.value = ''; searchTerm = ''; renderDirectory(); });
    return;
  }
  inspector.innerHTML = `<div class="directory-intro"><span class="eyebrow">A320ceo COMPONENT DATABASE</span><p>Een overzicht van de cockpitonderdelen. Selecteer een onderdeel voor uitleg, functie en context.</p><div class="directory-result-count">${items.length} ONDERDELEN</div></div><div class="directory-list">${items.map(item => `<button class="directory-item ${activeItem?.id === item.id ? 'active' : ''}" data-open-item="${item.id}"><span class="directory-symbol">${escapeHTML(item.short)}</span><span class="directory-item-copy"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.zone)} · ${escapeHTML(categoryName(item.category))}</small></span><span class="directory-status">${learned.has(item.id) ? '✓' : '↗'}</span></button>`).join('')}</div>`;
  $$('[data-open-item]', inspector).forEach(button => button.addEventListener('click', () => selectItem(button.dataset.openItem, { focus: true })));
}

function setCategory(category) {
  activeCategory = category;
  $$('.nav-item[data-category]').forEach(button => button.classList.toggle('selected', button.dataset.category === category));
  renderDirectory();
}

function renderWelcome() {
  heading.textContent = 'Cockpit guide';
  inspector.innerHTML = `<div class="welcome-visual"><div class="welcome-orbit orbit-one"></div><div class="welcome-orbit orbit-two"></div><div class="welcome-plane">✈</div><span class="welcome-cross cross-one">+</span><span class="welcome-cross cross-two">+</span></div><span class="eyebrow">WELCOME ABOARD</span><h3>Jouw cockpit, jouw leeromgeving.</h3><p>Selecteer een onderdeel in de 3D-cockpit of zoek hierboven naar een instrument, paneel of systeem.</p><div class="inspector-divider"></div><div class="mini-heading">SNEL NAAR</div><div class="quick-links" id="quickLinks">${['pfd-captain','nd-captain','fcu','overhead-electrical'].map(id => { const item = byId(id); return `<button class="quick-link" data-quick="${id}"><span>${escapeHTML(item.short)}</span><strong>${escapeHTML(item.title)}</strong><b>↗</b></button>`; }).join('')}</div><div class="inspector-note"><span>✦</span><p><strong>Leertip</strong><br>Begin bij de PFD en ND. Deze displays vormen een belangrijk deel van de vluchtinformatie in de cockpit.</p></div>`;
  $$('[data-quick]', inspector).forEach(button => button.addEventListener('click', () => selectItem(button.dataset.quick, { focus: true })));
}

function renderPopular() {
  const ids = ['pfd-captain','nd-captain','fcu','overhead-electrical','sidestick-captain','thrust-levers'];
  $('#popularGrid').innerHTML = ids.map((id, index) => {
    const item = byId(id);
    return `<button class="popular-item" data-popular="${id}"><span class="popular-number">0${index + 1}</span><span class="popular-copy"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.zone)}</small></span><span class="popular-arrow">↗</span></button>`;
  }).join('');
  $$('[data-popular]').forEach(button => button.addEventListener('click', () => selectItem(button.dataset.popular, { focus: true })));
}

function openModal() { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }

function showTour(index = 0) {
  tourIndex = Math.max(0, Math.min(index, tours.length - 1));
  const step = tours[tourIndex];
  const item = byId(step.item);
  if (item) selectItem(item.id, { focus: true });
  modalBody.innerHTML = `<div class="modal-kicker">GUIDED COCKPIT TOUR · STEP ${String(tourIndex + 1).padStart(2, '0')} / ${String(tours.length).padStart(2, '0')}</div><div class="tour-progress">${tours.map((_, i) => `<span class="${i <= tourIndex ? 'done' : ''}"></span>`).join('')}</div><div class="tour-emblem">✈</div><h2 id="modalTitle">${escapeHTML(step.title)}</h2><p class="modal-lead">${escapeHTML(step.text)}</p><div class="tour-detail"><p><strong>${escapeHTML(item?.title || '')}</strong></p><p class="tour-purpose">${escapeHTML(item?.summary || '')}</p></div><div class="modal-actions"><button class="soft-button" id="tourBack" ${tourIndex === 0 ? 'disabled' : ''}>← Vorige</button><button class="primary-button" id="tourNext">${tourIndex === tours.length - 1 ? 'Rondleiding afronden' : 'Volgende stap'} <span>→</span></button></div>`;
  $('#tourBack').addEventListener('click', () => showTour(tourIndex - 1));
  $('#tourNext').addEventListener('click', () => { if (tourIndex === tours.length - 1) { closeModal(); toast('Guided tour afgerond. Goed gedaan!'); } else showTour(tourIndex + 1); });
  openModal();
}

function showInfo(kind) {
  const views = {
    help: `<div class="modal-kicker">FLIGHTDECK ACADEMY · HELP</div><h2 id="modalTitle">Zo bedien je de cockpit</h2><p class="modal-lead">Sleep om de 3D-cockpit te draaien, gebruik het scrollwiel om in of uit te zoomen en selecteer de hotspots voor uitleg.</p><div class="help-grid"><div><b>↔</b><strong>Draaien</strong><p>Sleep met de muis om rond de cockpit te draaien.</p></div><div><b>⌕</b><strong>Zoomen</strong><p>Gebruik het scrollwiel of de plus- en minknoppen.</p></div><div><b>◎</b><strong>Selecteren</strong><p>Klik op een lichtgevende hotspot om uitleg te openen.</p></div><div><b>T</b><strong>Labels</strong><p>Schakel labels in om hotspotnamen te tonen.</p></div></div><div class="modal-actions"><button class="primary-button" id="modalDone">Begrepen <span>✓</span></button></div>`,
    about: `<div class="modal-kicker">ABOUT THE PROJECT</div><h2 id="modalTitle">Flightdeck Academy</h2><p class="modal-lead">Een modulaire leeromgeving om vliegtuigcockpits, instrumenten en systemen te verkennen.</p><div class="about-specs"><div><span>HUIDIG TOESTEL</span><strong>Airbus A320ceo</strong></div><div><span>3D ENGINE</span><strong>Three.js / WebGL</strong></div><div><span>MODULE</span><strong>Component explorer</strong></div><div><span>VERSIE</span><strong>0.2.0 · A320ceo</strong></div></div><p class="modal-footnote">De cockpit is procedureel gemodelleerd voor educatieve oriëntatie. Het is geen exacte fabrikant-CAD-replica, gecertificeerde simulator of bron voor operationele procedures.</p><div class="modal-actions"><button class="primary-button" id="modalDone">Sluiten <span>✓</span></button></div>`,
    lessons: `<div class="modal-kicker">LEARNING CENTER</div><h2 id="modalTitle">Leerpaden</h2><p class="modal-lead">Verken de A320ceo stap voor stap. De modules zijn gericht op cockpitfamiliarisatie.</p><div class="learning-path-list"><button data-start-tour><span class="path-number">01</span><span><strong>Maak kennis met de flight deck</strong><small>8 stappen · Beginner · ± 10 minuten</small></span><b>→</b></button><button data-open-category="instruments"><span class="path-number">02</span><span><strong>Instrumenten begrijpen</strong><small>PFD, ND en ECAM · Introductie</small></span><b>→</b></button><button data-open-category="overhead"><span class="path-number">03</span><span><strong>Systemen op het overheadpanel</strong><small>ELEC, HYD, FUEL, AIR · Introductie</small></span><b>→</b></button><button data-open-category="pedestal"><span class="path-number">04</span><span><strong>Center pedestal verkennen</strong><small>Motorbediening en communicatie · Introductie</small></span><b>→</b></button></div>`,
    aircraft: `<div class="modal-kicker">AIRCRAFT LIBRARY · MULTI-TYPE ROADMAP</div><h2 id="modalTitle">Aircraft collection</h2><p class="modal-lead">De academy gebruikt aparte datasets en 3D-modellen per vliegtuigtype. De A320ceo is de eerste beschikbare cockpit.</p><div class="aircraft-library-list">${aircraftRegistry.map(aircraft => `<div class="aircraft-library-item ${aircraft.status}"><span class="aircraft-library-mark">${aircraft.manufacturer === 'Airbus' ? 'A' : 'B'}</span><span class="aircraft-library-copy"><strong>${escapeHTML(aircraft.fullName)}</strong><small>${escapeHTML(aircraft.family)}</small></span><span class="aircraft-library-status">${aircraft.status === 'available' ? 'BESCHIKBAAR' : 'GEPLAND'}</span></div>`).join('')}</div><p class="modal-footnote">Een toestel verschijnt pas als beschikbaar wanneer de eigen cockpitweergave en leerinhoud klaar zijn.</p>`,
    glossary: `<div class="modal-kicker">REFERENCE LIBRARY</div><h2 id="modalTitle">Cockpit begrippenlijst</h2><p class="modal-lead">Veelgebruikte afkortingen uit de Airbus-cockpit.</p><div class="glossary-list">${[['ACP','Audio Control Panel'],['A/THR','Autothrust'],['ECAM','Electronic Centralized Aircraft Monitor'],['FCU','Flight Control Unit'],['FMGC','Flight Management and Guidance Computer'],['MCDU','Multipurpose Control and Display Unit'],['ND','Navigation Display'],['PFD','Primary Flight Display'],['RMP','Radio Management Panel'],['XPDR','Transponder']].map(([a,b]) => `<div><strong>${a}</strong><span>${b}</span></div>`).join('')}</div>`
  };
  modalBody.innerHTML = views[kind] || views.about;
  $('#modalDone')?.addEventListener('click', closeModal);
  $('[data-start-tour]')?.addEventListener('click', () => showTour(0));
  $$('[data-open-category]').forEach(button => button.addEventListener('click', () => { closeModal(); setCategory(button.dataset.openCategory); }));
  openModal();
}

function init() {
  $('#allCount').textContent = aircraftItems.length;
  $('#statComponents').textContent = String(aircraftItems.length).padStart(2, '0');
  updateProgress();
  renderPopular();
  cockpit = new CockpitScene($('#threeMount'), aircraftItems, id => selectItem(id));
  $('#loadingOverlay').classList.add('loaded');
  setTimeout(() => $('#loadingOverlay')?.remove(), 650);
  renderWelcome();

  $$('.nav-item[data-category]').forEach(button => button.addEventListener('click', () => {
    searchTerm = ''; searchInput.value = ''; setCategory(button.dataset.category);
  }));
  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value; activeCategory = 'all';
    $$('.nav-item[data-category]').forEach(button => button.classList.toggle('selected', button.dataset.category === 'all'));
    renderDirectory();
  });
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') { const first = getFiltered()[0]; if (first) selectItem(first.id, { focus: true }); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); searchInput.focus(); }
    if (event.key === 'Escape') closeModal();
  });

  $('#hotspotToggle').addEventListener('click', event => {
    const button = event.currentTarget; const visible = !button.classList.contains('active');
    button.classList.toggle('active', visible); cockpit.setHotspotsVisible(visible);
    if (!visible) $('#labelsToggle').classList.remove('active');
  });
  $('#labelsToggle').addEventListener('click', event => {
    const button = event.currentTarget; const visible = !button.classList.contains('active');
    button.classList.toggle('active', visible); cockpit.setLabelsVisible(visible);
    if (visible) { $('#hotspotToggle').classList.add('active'); cockpit.setHotspotsVisible(true); }
  });
  $('#resetCamera').addEventListener('click', () => setView('captain'));
  $('#zoomIn').addEventListener('click', () => cockpit.zoom(-0.8));
  $('#zoomOut').addEventListener('click', () => cockpit.zoom(0.8));
  $$('.view-preset').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  $('#fullscreenButton').addEventListener('click', async () => {
    const target = $('.viewer-card');
    try { if (!document.fullscreenElement) await target.requestFullscreen(); else await document.exitFullscreen(); }
    catch { toast('Volledig scherm wordt niet ondersteund in deze browser.'); }
  });

  $('#startTourButton').addEventListener('click', () => showTour(0));
  $('#tourNav').addEventListener('click', () => showTour(0));
  $('#lessonsNav').addEventListener('click', () => showInfo('lessons'));
  $('#glossaryNav').addEventListener('click', () => showInfo('glossary'));
  $('#helpButton').addEventListener('click', () => showInfo('help'));
  $('#aboutButton').addEventListener('click', () => showInfo('about'));
  $('#aircraftSelect').addEventListener('click', () => showInfo('aircraft'));
  $('#showAllItems').addEventListener('click', () => { searchTerm = ''; searchInput.value = ''; setCategory('all'); inspector.scrollTop = 0; });
  $('#closeInspector').addEventListener('click', () => {
    $('.workspace').classList.toggle('inspector-collapsed');
    toast($('.workspace').classList.contains('inspector-collapsed') ? 'Detailpaneel verborgen.' : 'Detailpaneel geopend.');
  });
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
}

init();
