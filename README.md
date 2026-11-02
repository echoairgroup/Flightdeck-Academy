# Flightdeck Academy — Airbus A320ceo

Een zelfstandige, uitbreidbare 3D-cockpit leeromgeving gebouwd met Vite en Three.js.

## Wat zit erin?

- Procedureel opgebouwde 3D-cockpit met vrije orbit-, zoom- en camerabediening.
- Klikbare hotspots voor 24 A320ceo-cockpitonderdelen.
- Uitleg per onderdeel: doel, functie, stapsgewijze herkenning, gebruikscontext en gerelateerde onderdelen.
- Zoekfunctie, categorieën, guided tour, begrippenlijst en lokale leerprogressie.
- Modulaire componentendatabase (`src/data/a320ceo.js`) zodat extra vliegtuigen later als aparte datasets kunnen worden toegevoegd.
- Responsive interface voor desktop, tablet en mobiel.

## Lokaal starten

Vereist Node.js 20.19+ of 22.12+.

```bash
npm install
npm run dev
```

Open daarna de URL die Vite toont (standaard `http://localhost:5173`).

Voor een eenvoudige statische preview zonder Vite (Three.js wordt dan via de CDN geladen): `python -m http.server 8000` en open `http://localhost:8000`.

## Productieb build

```bash
npm run build
npm run preview
```

De productieversie wordt in `dist/` geplaatst.

## Projectstructuur

```text
src/
  data/
    a320ceo.js       # A320ceo-onderdelen, uitleg, hotspots en tourstappen
    aircraftRegistry.js # catalogus voor huidige en toekomstige vliegtuigtypes
  scene/
    cockpit.js       # Three.js-scène en procedurele 3D-cockpit
  main.js            # interface, zoekfunctie, navigatie en leerlogica
  styles.css         # volledige interface en responsive layout
```

## Een nieuw vliegtuig toevoegen

1. Voeg een nieuwe dataset toe in `src/data/`, bijvoorbeeld `a320neo.js` of `b737-800.js`.
2. Gebruik voor elk onderdeel dezelfde velden als in `a320ceo.js`: `id`, `title`, `short`, `category`, `zone`, `summary`, `purpose`, `function`, `howTo`, `when`, `note`, `related`, `position`, `hotspot` en `view`.
3. Voeg voor het vliegtuig een eigen 3D-bouwfunctie of model-loader toe. Houd de interface- en datalaag gescheiden van de 3D-scène.
4. Voeg het vliegtuig toe aan de aircraft registry wanneer er meerdere types actief worden.

## Belangrijke beperking van deze eerste versie

Het 3D-model is procedureel opgebouwd uit eigen Three.js-geometrie. Het is een interactieve educatieve visualisatie en geen exacte fabrikant-CAD-replica, gecertificeerde simulator of bron voor operationele procedures. Voor de volgende realismefase is een zorgvuldig gecontroleerd, gelicenseerd A320ceo 3D-model nodig, plus een complete geometrische plaatsing van alle bedieningsorganen.

## GitHub Pages

Inbegrepen is een GitHub Actions-workflow in `.github/workflows/deploy-pages.yml`. Push de repository naar de `main`-branch en stel in GitHub bij **Settings → Pages → Build and deployment** de source in op **GitHub Actions**. Daarna bouwt en publiceert de workflow de `dist/`-map automatisch.
