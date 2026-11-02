# Flightdeck Academy — Airbus A320ceo

Een uitbreidbare cockpit-familiarisatieomgeving met een interactieve, procedureel opgebouwde 3D-weergave. De eerste module is de Airbus A320ceo.

## Wat bevat deze versie?

- Three.js-cockpit met orbit-, zoom- en camerastandpunten voor captain, overhead, pedestal en wide view.
- 27 selecteerbare cockpitonderdelen en hotspots.
- Per onderdeel uitleg over doel, functie, herkenning, context en gerelateerde onderdelen.
- Zoeken, categorieën, populaire onderdelen, begrippenlijst en een rondleiding van acht stappen.
- Leerprogressie die lokaal in de browser wordt bewaard.
- Een vliegtuigregister als basis voor toekomstige Airbus- en Boeing-modules.
- Responsive interface voor desktop, tablet en mobiel.

## Lokaal starten

Vereist Node.js 20.19+ of 22.12+.

```bash
npm install
npm run dev
```

Open daarna de URL die Vite toont (standaard `http://localhost:5173`).

Voor een productiebuild:

```bash
npm run build
npm run preview
```

De productieversie komt in `dist/`.

## Projectstructuur

```text
index.html
.nojekyll
src/
  main.js                  # Interface, zoeken, navigatie en leerlogica
  styles.css               # Volledige responsive vormgeving
  data/
    a320ceo.js             # A320ceo-onderdelen, uitleg, categorieën en tour
    aircraftRegistry.js    # Catalogus van huidige en geplande vliegtuigtypes
  scene/
    cockpit.js             # Three.js-scène en procedurele cockpitgeometrie
```

## Een nieuw vliegtuig toevoegen

1. Maak een eigen datamodule in `src/data/`, bijvoorbeeld `a320neo.js` of `b737-800.js`.
2. Gebruik dezelfde componentvelden als in `a320ceo.js`: `id`, `title`, `short`, `category`, `zone`, `summary`, `purpose`, `function`, `howTo`, `when`, `position` en `view`.
3. Maak een bijbehorende scene of modeladapter in `src/scene/`.
4. Registreer het type in `aircraftRegistry.js` en activeer het pas nadat de eigen data en cockpit klaar zijn.

## Publiceren op GitHub Pages

Deze repository is geschikt voor rechtstreekse statische publicatie. In GitHub:

1. Open **Settings → Pages**.
2. Kies bij **Build and deployment** voor **Deploy from a branch**.
3. Selecteer branch **main** en map **/(root)**.
4. Sla de instelling op.

De website gebruikt de Three.js-module via de import map in `index.html`; voor de statische Pages-versie is dus geen aparte Vite-buildactie nodig. De `.nojekyll`-file zorgt ervoor dat de bronmappen rechtstreeks worden meegenomen.

## Grenzen van deze versie

De cockpit is procedureel opgebouwd uit eigen Three.js-geometrie. Het is een interactieve educatieve visualisatie, geen exacte fabrikant-CAD-replica, gecertificeerde simulator of bron voor operationele procedures. De indeling en systeemweergaven kunnen per toestelconfiguratie en operator verschillen. Voor echte vluchtuitvoering zijn actuele, goedgekeurde vliegtuigdocumentatie en bevoegde instructeurs leidend.
