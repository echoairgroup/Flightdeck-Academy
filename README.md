# Flightdeck Academy — Airbus A320ceo cockpit atlas

An educational A320ceo photo atlas. The site uses real cockpit photographs rather than a procedural 3D model. Select the photo tabs, zoom into each panel, and click numbered markers to read about individual controls.

## What is included

- Five photo views: full cockpit overview, main instrument panel, overhead panel, center pedestal, and MCDU close-up.
- Individual clickable markers for visible controls and key groups: FCU selectors, PFD/ND/ECAM displays, overhead system switches, pedestal controls, and MCDU keys.
- Zoom from 100% to 500%, mouse-wheel zoom, drag-to-pan, reset and focus-on-selected-control.
- Component catalogue with search across all photo views.
- Guided eleven-step cockpit tour.
- Local learning progress stored in the browser.
- Responsive layout for desktop, tablet and mobile.

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## GitHub Pages

The repository is a Vite static site. GitHub Pages should use **GitHub Actions** with a build of the `dist/` directory, or the existing Pages branch configuration if maintained separately. The CI workflow in `.github/workflows/ci.yml` runs `npm install` and `npm run build` on every push to `main`.

## Photo sources and licences

- Cockpit overview — Curimedia, Wikimedia Commons, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/): https://commons.wikimedia.org/wiki/File:Airbus_A320-214_Vueling_EC-HHA_cockpit_(5508849819).jpg
- Main panel — Curimedia, Wikimedia Commons, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/): https://commons.wikimedia.org/wiki/File:Main_panel_taxi_with_one-engine_(5669062307).jpg
- Overhead panel — Olivier Cleynen, Wikimedia Commons, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/): https://commons.wikimedia.org/wiki/File:Overhead_panel_of_an_Airbus_A320_during_cruise.jpg
- Center pedestal — Olivier Cleynen, Wikimedia Commons, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/): https://commons.wikimedia.org/wiki/File:Thrust_levers_of_an_Airbus_A320.jpg
- MCDU — Christoph Paulus, Wikimedia Commons, public domain: https://commons.wikimedia.org/wiki/File:CP_MCDU.jpg

Attribution is also displayed below each photo on the website.

## Important limitations

The images are representative A320-family references, not all from the same aircraft registration or operator. A320ceo panels vary with aircraft serial number, modification status, avionics standard and airline options. Markers identify visible controls in these selected reference photographs; they do not claim to cover every possible installed option, hidden circuit breaker or every variant. A marker may describe a named button or switch visible in the photograph; where a photo does not show an item clearly, the catalogue explains the system without implying a precise physical location.

This is an educational familiarisation resource, not a certified simulator, checklist or source for operating procedures. For flight operations, use current approved aircraft documentation and qualified instruction.
