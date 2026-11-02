import { aircraftItems, categories } from './data/a320ceo.js';

const photoMarkers = [
  { id: 'fcu', x: 49, y: 16 },
  { id: 'pfd-captain', x: 20, y: 34 },
  { id: 'nd-captain', x: 30, y: 34 },
  { id: 'ecam-upper', x: 49, y: 35 },
  { id: 'ecam-lower', x: 49, y: 54 },
  { id: 'mcdU-left', x: 36, y: 66 },
  { id: 'thrust-levers', x: 54, y: 77 },
  { id: 'radio-panel', x: 54, y: 66 }
];

const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

let activeCategory = 'all';
let searchValue = '';
let selectedId = null;

const categoryName = (id) => categories.find((category) => category.id === id)?.label || id;
const findItem = (id) => aircraftItems.find((item) => item.id === id);
const markerIndex = (id) => photoMarkers.findIndex((marker) => marker.id === id);

function renderMarkers() {
  const container = $('#photoHotspots');
  container.innerHTML = photoMarkers.map((marker, index) => {
    const item = findItem(marker.id);
    if (!item) return '';
    return `
      <button
        class="hotspot"
        type="button"
        style="left: ${marker.x}%; top: ${marker.y}%"
        data-photo-item="${escapeHTML(marker.id)}"
        aria-label="Bekijk ${escapeHTML(item.title)}"
        title="${escapeHTML(item.title)}"
      >${index + 1}</button>
    `;
  }).join('');

  container.querySelectorAll('[data-photo-item]').forEach((button) => {
    button.addEventListener('click', () => selectItem(button.dataset.photoItem));
  });
}

function renderDetail(item) {
  const panel = $('#detailPanel');
  if (!item) {
    panel.innerHTML = `
      <p class="kicker">ONDERDEEL UITLEG</p>
      <div class="empty-detail">
        <span class="empty-number">A320ceo</span>
        <h2>Kies een onderdeel</h2>
        <p>Klik op een nummer in de foto of kies hieronder een onderdeel uit de lijst. De uitleg verschijnt hier.</p>
      </div>
    `;
    return;
  }

  const number = markerIndex(item.id);
  const howTo = Array.isArray(item.howTo) ? item.howTo : [];
  panel.innerHTML = `
    <p class="kicker">${escapeHTML(categoryName(item.category))}</p>
    <span class="detail-number">${item.short ? escapeHTML(item.short) : 'A320ceo'}</span>
    <h2>${escapeHTML(item.title)}</h2>
    <p class="detail-summary">${escapeHTML(item.summary)}</p>

    <h3>Wat doet dit onderdeel?</h3>
    <p>${escapeHTML(item.purpose)}</p>

    <h3>Hoe werkt het?</h3>
    <p>${escapeHTML(item.function)}</p>

    <h3>Waar moet je op letten?</h3>
    <ol>${howTo.map((step) => `<li>${escapeHTML(step)}</li>`).join('')}</ol>

    <h3>Wanneer is het relevant?</h3>
    <p>${escapeHTML(item.when)}</p>

    <p class="photo-status">${number >= 0 ? `Nummer ${number + 1} is op de foto gemarkeerd.` : 'Dit onderdeel is niet afzonderlijk gemarkeerd op de gebruikte foto.'}</p>
    <p class="photo-status">${escapeHTML(item.note || 'Algemene educatieve uitleg; configuraties kunnen per toestel verschillen.')}</p>
  `;
}

function selectItem(id) {
  const item = findItem(id);
  if (!item) return;
  selectedId = id;
  renderDetail(item);
  updateSelectedStyles();

  if (window.innerWidth <= 700) {
    $('#detailPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function updateSelectedStyles() {
  document.querySelectorAll('[data-photo-item]').forEach((button) => {
    button.classList.toggle('active', button.dataset.photoItem === selectedId);
  });
  document.querySelectorAll('[data-component-item]').forEach((button) => {
    button.classList.toggle('selected', button.dataset.componentItem === selectedId);
  });
}

function filteredItems() {
  const term = searchValue.trim().toLowerCase();
  return aircraftItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const searchable = [
      item.title, item.short, item.zone, item.summary, item.purpose,
      item.function, categoryName(item.category)
    ].join(' ').toLowerCase();
    return matchesCategory && (!term || searchable.includes(term));
  });
}

function renderFilters() {
  const container = $('#categoryFilters');
  const options = [{ id: 'all', label: 'Alles' }, ...categories];
  container.innerHTML = options.map((category) => `
    <button
      type="button"
      class="filter-button ${activeCategory === category.id ? 'active' : ''}"
      data-category="${category.id}"
    >${escapeHTML(category.label)}</button>
  `).join('');

  container.querySelectorAll('[data-category]').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderComponentList();
    });
  });
}

function renderComponentList() {
  const items = filteredItems();
  $('#resultCount').textContent = `${items.length} onderdelen`;
  const container = $('#componentList');

  if (!items.length) {
    container.innerHTML = '<p class="no-results">Geen onderdelen gevonden. Probeer een andere zoekterm.</p>';
    return;
  }

  container.innerHTML = items.map((item) => `
    <button
      class="component-button ${selectedId === item.id ? 'selected' : ''}"
      type="button"
      data-component-item="${escapeHTML(item.id)}"
    >
      <span class="component-index">${String(aircraftItems.indexOf(item) + 1).padStart(2, '0')}</span>
      <span class="component-name">${escapeHTML(item.title)}</span>
      <span class="component-arrow">›</span>
    </button>
  `).join('');

  container.querySelectorAll('[data-component-item]').forEach((button) => {
    button.addEventListener('click', () => selectItem(button.dataset.componentItem));
  });
}

$('#searchInput').addEventListener('input', (event) => {
  searchValue = event.target.value;
  renderComponentList();
});

renderMarkers();
renderFilters();
renderComponentList();
