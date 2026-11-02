# Flightdeck Academy — Airbus A320ceo cockpit atlas

Een foto-atlas voor cockpitfamiliarisatie. De website gebruikt echte cockpitfoto's in plaats van een nagebouwd 3D-model. Kies een paneel, zoom in tot 500%, sleep de foto en klik op de afzonderlijke markeringen voor uitleg.

## Inhoud

- Zes fotopanelen: compleet cockpitoverzicht, main instrument panel, overhead panel, center pedestal, MCDU-close-up en circuit-breaker panel.
- 304 individueel selecteerbare markeringen: onder meer displays, FCU-selectors, overheadbediening, thrust levers, pedestal-bediening, MCDU-functietoetsen en de breaker-posities.
- Zoom met muiswiel of knoppen, sleep om te verschuiven, reset en zoom direct naar geselecteerde onderdelen.
- Doorzoekbaar onderdelenregister met filters per paneel.
- Begeleide tutorial met 12 stappen.
- Lokale leerstatus in de browser.
- Werkt op desktop, tablet en mobiel.

## Lokaal starten

Vereist Node.js 20.19+ of 22.12+.

```bash
npm install
npm run dev
```

Productiebuild:

```bash
npm run build
npm run preview
```

## GitHub Pages

De Vite-build wordt door GitHub Actions gebouwd naar de map `dist/`. De CI-workflow `.github/workflows/ci.yml` controleert `npm install` en `npm run build` bij iedere push naar `main`. De GitHub Pages-bron moet op **GitHub Actions** staan.

## Foto's en licenties

- Cockpitoverzicht — Curimedia, Wikimedia Commons, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/): https://commons.wikimedia.org/wiki/File:Airbus_A320-214_Vueling_EC-HHA_cockpit_(5508849819).jpg
- Main instrument panel — Curimedia, Wikimedia Commons, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/): https://commons.wikimedia.org/wiki/File:Main_panel_taxi_with_one-engine_(5669062307).jpg
- Overhead panel — Olivier Cleynen, Wikimedia Commons, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/): https://commons.wikimedia.org/wiki/File:Overhead_panel_of_an_Airbus_A320_during_cruise.jpg
- Center pedestal — Olivier Cleynen, Wikimedia Commons, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/): https://commons.wikimedia.org/wiki/File:Thrust_levers_of_an_Airbus_A320.jpg
- MCDU — Christoph Paulus, Wikimedia Commons, public domain: https://commons.wikimedia.org/wiki/File:CP_MCDU.jpg
- Circuit-breaker panel — Dreznicek009, Wikimedia Commons, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/): https://commons.wikimedia.org/wiki/File:A320_CB_Panel.jpg

De auteur, bron en licentie worden ook direct onder elke foto getoond. De gebruikte circuit-breakerfoto is een A320-panelopname; de individuele circuitnamen moeten altijd worden gelezen vanaf de bijbehorende geprinte labels.

## Belangrijke grenzen

De foto's tonen representatieve A320-family-uitvoeringen en zijn niet allemaal uit hetzelfde vliegtuig. A320ceo-cockpits kunnen verschillen door serienummer, avionica-standaard, modificaties en operatoropties. Markeringen leggen zichtbare bedieningselementen uit. Bij de circuit breakers verwijzen markers naar de afzonderlijke fysieke posities per rij en kolom; gebruik de geprinte circuitnaam om het exacte circuit te bepalen. Er zijn geen claims dat ieder verborgen circuit, iedere optie of elk toesteltype is afgedekt.

Circuit breakers zijn beveiligingen voor elektrische circuits, geen normale bedieningsknoppen. Niet resetten, indrukken of uittrekken zonder de juiste bevoegdheid en goedgekeurde onderhoudsprocedure.

Deze atlas is educatief en geen gecertificeerde simulator, checklist of operationele handleiding. Gebruik voor echte vluchtuitvoering altijd actuele, goedgekeurde documentatie en bevoegde instructeurs.
