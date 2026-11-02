/*
 * A320ceo photo atlas.
 * Coordinates are relative percentages over the relevant reference photograph.
 * The photos show representative A320-family aircraft; panel options vary by tail/operator.
 */
export const views = [
  {
    id: 'overview',
    title: 'Cockpitoverzicht',
    subtitle: 'De complete flight deck vanaf de instapzijde',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbus_A320-214_Vueling_EC-HHA_cockpit_%285508849819%29.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Airbus_A320-214_Vueling_EC-HHA_cockpit_(5508849819).jpg',
    author: 'Curimedia',
    licence: 'CC BY 2.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/2.0/',
    note: 'Overzichtsfoto van een Airbus A320-214. Gebruik de andere fotopagina’s voor details die in dit overzicht klein zijn.'
  },
  {
    id: 'main',
    title: 'Main instrument panel',
    subtitle: 'PFD, ND, ECAM, standby-instrumenten en glareshield/FCU',
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Main_panel_taxi_with_one-engine_%285669062307%29.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Main_panel_taxi_with_one-engine_(5669062307).jpg',
    author: 'Curimedia',
    licence: 'CC BY 2.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/2.0/',
    note: 'Detailopname van het A320 main panel. Een deel van de verlichting en scherminformatie is afhankelijk van de gefotografeerde vluchtfase.'
  },
  {
    id: 'overhead',
    title: 'Overhead panel',
    subtitle: 'Elektrisch, hydraulisch, brandstof, air conditioning, bleed, anti-ice en meer',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Overhead_panel_of_an_Airbus_A320_during_cruise.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Overhead_panel_of_an_Airbus_A320_during_cruise.jpg',
    author: 'Olivier Cleynen',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    note: 'Foto van het A320-family overheadpanel. De foto is hoog genoeg om in te zoomen op afzonderlijke labels en schakelaars.'
  },
  {
    id: 'pedestal',
    title: 'Center pedestal',
    subtitle: 'Thrust levers, speed brake, flaps, radio- en invoerpanelen',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Thrust_levers_of_an_Airbus_A320.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Thrust_levers_of_an_Airbus_A320.jpg',
    author: 'Olivier Cleynen',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    note: 'Close-up van de A320-family pedestal. Niet ieder paneel is op deze foto volledig zichtbaar; daarvoor zijn ook de MCDU-detailfoto en de catalogus beschikbaar.'
  },
  {
    id: 'mcdu',
    title: 'MCDU detail',
    subtitle: 'Scherm, line-select keys, functietoetsen en alfabetisch/numeriek toetsenbord',
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/CP_MCDU.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:CP_MCDU.jpg',
    author: 'Christoph Paulus',
    licence: 'Public domain',
    licenceUrl: 'https://commons.wikimedia.org/wiki/File:CP_MCDU.jpg',
    note: 'Detailopname van een A320-200 MCDU. De precieze pagina-indeling en beschikbare functies hangen af van de geïnstalleerde software en vliegtuigconfiguratie.'
  }
];

export const categories = [
  { id: 'main', label: 'Instrumenten & FCU' },
  { id: 'overhead', label: 'Overhead & systemen' },
  { id: 'pedestal', label: 'Center pedestal' },
  { id: 'mcdu', label: 'MCDU toetsen' },
  { id: 'controls', label: 'Flight controls' },
  { id: 'overview', label: 'Overzicht' }
];

export const controls = [];
function add(id, title, view, x, y, description, purpose, context, group = '') {
  controls.push({
    id, title, view, x, y, description, purpose, context,
    group: group || views.find(v => v.id === view)?.title || view
  });
}

/* ───────────────────────── OVERVIEW ───────────────────────── */
[
  ['ov-fcu','Glareshield / FCU',51,13,'Het Flight Control Unit zit centraal boven het main instrument panel.','Hier selecteert de bemanning onder meer snelheid, koers/track, hoogte en verticale geleiding.','Kijk bij het wijzigen van een mode altijd ook naar de Flight Mode Annunciator op de PFD.'],
  ['ov-pfd-cap','Captain PFD',19,31,'Het Primary Flight Display aan captain-zijde.','Toont de primaire vluchttoestand, waaronder attitude, snelheid, hoogte en geleidingsinformatie.','Bekijk voor de afzonderlijke schaalverdelingen en aanduidingen de detailuitleg bij het main panel.'],
  ['ov-nd-cap','Captain ND',30,31,'Het Navigation Display aan captain-zijde.','Toont navigatie- en route-informatie in de gekozen weergavemodus.','De getoonde informatie hangt af van gekozen range, mode en beschikbare navigatiebronnen.'],
  ['ov-standby','Standby instruments',40,33,'De standby-instrumenten bevinden zich tussen de hoofdschermen.','Ze bieden aanvullende vluchtinformatie via een onafhankelijke of afzonderlijke instrumentketen, afhankelijk van de configuratie.','Gebruik de catalogus om de standby attitude-, speed- en altitude-indicaties te herkennen.'],
  ['ov-ecam-upper','ECAM upper display',52,33,'Het bovenste ECAM-scherm toont systeemmeldingen en engine-indicaties.','Het helpt de crew de systeemstatus en relevante waarschuwingen te volgen.','De kleur en inhoud hebben een specifieke betekenis; deze site is geen procedurele checklist.'],
  ['ov-ecam-lower','ECAM lower display',52,53,'Het onderste ECAM-scherm toont systeemoverzichten (synoptics).','Het geeft een schematisch beeld van geselecteerde vliegtuigsystemen.','De detailpagina’s bij overhead en systemen geven extra achtergrond.'],
  ['ov-nd-fo','First Officer ND',69,31,'Het Navigation Display aan first-officer-zijde.','Geeft navigatiegegevens weer voor de rechter cockpitpositie.','De gekozen weergavemodus hoeft niet gelijk te zijn aan die van de captain.'],
  ['ov-pfd-fo','First Officer PFD',82,31,'Het Primary Flight Display aan first-officer-zijde.','Toont de primaire vluchtinformatie aan de rechter cockpitpositie.','Dezelfde hoofdprincipes gelden als bij het captain PFD.'],
  ['ov-mcdu-cap','Captain MCDU',37,69,'De linker Multipurpose Control and Display Unit.','Biedt een invoer- en weergave-interface voor flight-managementfuncties.','Open de aparte MCDU-fotopagina om individuele toetsen te bekijken.'],
  ['ov-mcdu-fo','First Officer MCDU',67,69,'De rechter Multipurpose Control and Display Unit.','Biedt een tweede toegangspunt tot de flight-management- en gegevenspagina’s.','De twee MCDU’s zijn vergelijkbaar, maar de selecties en configuratie kunnen verschillen.'],
  ['ov-thrust','Thrust lever quadrant',52,76,'Het centrale thrust-leverkwadrant.','De twee thrust levers zijn gekoppeld aan motorstuwkracht en autothrust-logica.','Open de pedestal-fotopagina voor de afzonderlijke levers, detents en omliggende bediening.'],
  ['ov-pedestal','Center pedestal',53,89,'De middenconsole tussen de twee piloten.','Hier bevinden zich onder meer radio-, audio-, invoer- en motorgerelateerde bedieningen.','Gebruik de aparte pedestal- en MCDU-fotopagina voor meer detail.'],
  ['ov-side-cap','Captain side console',8,68,'De zijconsole aan captain-zijde.','Bevat aanvullende bediening en opbergruimte rond de captain-werkplek.','De zichtbare uitvoering kan per vliegtuig en operator verschillen.'],
  ['ov-side-fo','First Officer side console',92,68,'De zijconsole aan first-officer-zijde.','Bevat aanvullende bediening en opbergruimte rond de rechter werkplek.','Niet elk onderdeel is op deze overzichtsfoto volledig zichtbaar.']
].forEach(([id,title,x,y,description,purpose,context]) => add(id,title,'overview',x,y,description,purpose,context));

/* ───────────────────────── MAIN PANEL ───────────────────────── */
[
  ['pfd-cap','Captain PFD',12,59,'Primary Flight Display aan de linkerkant van het main panel.','Presenteert attitude, snelheid, hoogte, verticale snelheid en flight guidance.','Leer eerst de kunstmatige horizon en de snelheids-/hoogteschaal herkennen.'],
  ['nd-cap','Captain ND',29,59,'Navigation Display aan captain-zijde.','Presenteert route, waypoints en navigatie-informatie.','Range- en modekeuze veranderen de kaartweergave.'],
  ['clock','Clock / chronometer',38,47,'Klok en chronometer in het instrumentencluster.','Biedt een tijdreferentie en stopwatchfuncties.','In de luchtvaart wordt vaak UTC gebruikt als gedeelde tijdreferentie.'],
  ['standby-att','Standby attitude indicator',41,59,'Standby attitude-instrument.','Geeft een aanvullende indicatie van de vliegtuigattitude.','De exacte standby-suite verschilt per generatie en avionica-optie.'],
  ['standby-speed','Standby speed indication',41,48,'Standby-snelheidsindicatie in het instrumentcluster.','Geeft een aanvullende snelheidsreferentie.','Vergelijk instrumentpresentaties alleen in hun juiste context.'],
  ['standby-alt','Standby altitude indication',43,70,'Standby-hoogte-informatie.','Geeft een aanvullende hoogte-referentie.','Dit is een herkenningspunt, geen operationele controle-instructie.'],
  ['ecam-upper','ECAM upper display',53,57,'Bovenste ECAM-display.','Toont onder meer motorparameters en systeemmeldingen.','De actuele pagina en meldingen hangen af van de vliegtuigstatus.'],
  ['ecam-lower','ECAM lower display',53,78,'Onderste ECAM-display.','Toont geselecteerde systeem-synoptics en aanvullende informatie.','Een synoptic helpt de relaties binnen een systeem visueel te begrijpen.'],
  ['nd-fo','First Officer ND',72,59,'Navigation Display aan first-officer-zijde.','Toont navigatie-informatie voor de rechter cockpitpositie.','De kaartweergave kan onafhankelijk worden ingesteld.'],
  ['pfd-fo','First Officer PFD',87,59,'Primary Flight Display aan first-officer-zijde.','Toont de primaire vluchttoestand voor de first officer.','De PFD’s zijn vergelijkbaar, maar worden afzonderlijk bediend.'],
  ['fcu-spd-window','FCU speed window',34,22,'Snelheidsvenster van de FCU.','Toont de geselecteerde snelheid wanneer een geselecteerde speed mode wordt gebruikt.','Lees de waarde altijd samen met de actieve flight mode.'],
  ['fcu-spd-knob','FCU speed selector',39,25,'Draaiknop voor de speed-selectie.','Wordt gebruikt om de geselecteerde snelheidswaarde te wijzigen.','De werking van indrukken en trekken hangt samen met managed/selected guidance.'],
  ['fcu-hdg-window','FCU heading / track window',48,22,'Heading- of trackvenster op de FCU.','Toont de geselecteerde laterale koerswaarde.','De aanduiding kan heading of track tonen afhankelijk van de geselecteerde referentie.'],
  ['fcu-hdg-knob','FCU heading selector',50,25,'Draaiknop voor heading/track-selectie.','Wijzigt de geselecteerde laterale referentie.','Let op de bijbehorende lateral mode op de FMA.'],
  ['fcu-alt-window','FCU altitude window',61,22,'Altitude window van de FCU.','Toont de geselecteerde doelhoogte.','De geselecteerde waarde is niet hetzelfde als de actuele hoogte op de PFD.'],
  ['fcu-alt-knob','FCU altitude selector',63,25,'Draaiknop voor de geselecteerde hoogte.','Wijzigt de hoogte-selectie voor het vluchtgeleidingssysteem.','Begrijp het verschil tussen geselecteerde hoogte en verticale mode.'],
  ['fcu-vs-window','FCU vertical speed / FPA window',72,22,'Venster voor verticale snelheid of flight-path angle.','Toont een geselecteerde verticale geleidingsreferentie wanneer die functie is geselecteerd.','De presentatie wisselt afhankelijk van de mode en de geselecteerde schaal.'],
  ['fcu-vs-knob','FCU vertical speed selector',75,25,'Draaiknop voor verticale geleiding.','Wordt gebruikt om een verticale waarde te selecteren.','De precieze bediening is type- en proceduregebonden; hier alleen de functie herkennen.'],
  ['fcu-lateral-pb','Lateral mode pushbuttons',44,32,'Lateral mode pushbuttons op de FCU.','Deze knoppen horen bij de bediening van de laterale flight-guidance-functies.','De actieve mode moet je terugzien op de FMA; leer de modebenamingen afzonderlijk.'],
  ['fcu-vertical-pb','Vertical mode pushbuttons',56,32,'Vertical mode pushbuttons op de FCU.','Deze knoppen horen bij de bediening van verticale geleiding.','De precieze modebeschikbaarheid verschilt per configuratie.'],
  ['fcu-ap1','Autopilot 1 pushbutton',83,24,'Autopilot 1-bediening op de glareshield/FCU.','Hoort bij het inschakelen of uitschakelen van een autopilot-kanaal.','De status en engagement-voorwaarden zijn systeemafhankelijk.'],
  ['fcu-ap2','Autopilot 2 pushbutton',88,24,'Autopilot 2-bediening op de glareshield/FCU.','Hoort bij het tweede autopilot-kanaal.','Gebruik de uitleg uitsluitend voor familiarisatie, niet als operationele procedure.'],
  ['fcu-athr','Autothrust pushbutton',94,24,'Autothrust-bediening op de FCU.','Hoort bij de status van het automatische thrust-systeem.','De A/THR-status is zichtbaar in de flight mode annunciator.'],
  ['efis-cap-range','Captain EFIS range selector',20,26,'Range-selectie aan captain-zijde.','Wijzigt het bereik van de ND-presentatie.','De gekozen range beïnvloedt het afgebeelde navigatiegebied.'],
  ['efis-cap-mode','Captain EFIS mode selector',15,26,'Mode-selectie aan captain-zijde.','Wijzigt de manier waarop navigatie-informatie op de ND wordt weergegeven.','Beschikbare modes hangen af van de vliegtuigconfiguratie.'],
  ['efis-cap-baroset','Captain barometric setting',8,36,'Barometrische instelling aan captain-zijde.','Bepaalt de drukreferentie die bij hoogte-indicaties wordt gebruikt.','Units en referentie-instelling zijn belangrijk voor het correct begrijpen van de PFD.'],
  ['efis-fo-range','First Officer EFIS range selector',80,26,'Range-selectie aan first-officer-zijde.','Wijzigt het bereik van de rechter ND-presentatie.','Deze selectie kan verschillen van de captain-selectie.'],
  ['efis-fo-mode','First Officer EFIS mode selector',85,26,'Mode-selectie aan first-officer-zijde.','Wijzigt de navigatieweergave aan de rechterzijde.','Let op welke bron- en mode-informatie wordt getoond.'],
  ['efis-fo-baroset','First Officer barometric setting',96,36,'Barometrische instelling aan first-officer-zijde.','Stelt de drukreferentie voor de rechter PFD in.','De beide zijden kunnen onafhankelijk worden ingesteld.'],
  ['fma','Flight Mode Annunciator',52,43,'De Flight Mode Annunciator is het bovenste statusgebied van de PFD.','Toont actieve en gewapende flight-guidance-modes en autothruststatus.','Dit is een tekst-/statusgebied op het display, geen fysieke knop.']
].forEach(([id,title,x,y,description,purpose,context]) => add(id,title,'main',x,y,description,purpose,context));

/* ───────────────────────── OVERHEAD PANEL ─────────────────────────
   Individual points are placed over the visible switches, guarded controls and selectors.
*/
[
  ['oh-elac1','ELAC 1 pushbutton',9,6,'Flight-control computer ELAC 1.','ELAC staat voor Elevator Aileron Computer en is onderdeel van de flight-control-computerarchitectuur.','De knop en statusindicatie zijn onderdeel van een redundant systeem.'],
  ['oh-sec1','SEC 1 pushbutton',14,6,'SEC 1 flight-control computer.','SEC staat voor Spoiler Elevator Computer.','De exacte functie hangt samen met de flight-control logic.'],
  ['oh-sec2','SEC 2 pushbutton',19,6,'SEC 2 flight-control computer.','Tweede SEC-computer in de redundante flight-control-opzet.','De schakelaar toont een status; dit is geen trainingshandeling.'],
  ['oh-sec3','SEC 3 pushbutton',24,6,'SEC 3 flight-control computer.','Derde SEC-computer in de flight-control-architectuur.','De aanduiding en beschikbaarheid verschillen per subvariant.'],
  ['oh-fac1','FAC 1 pushbutton',31,6,'FAC 1 flight augmentation computer.','FAC ondersteunt onder meer flight-envelope- en yaw-damper-gerelateerde functies.','De term FAC verwijst naar een computer, niet naar een losse mechanische bediening.'],
  ['oh-fac2','FAC 2 pushbutton',36,6,'FAC 2 flight augmentation computer.','Tweede FAC-kanaal voor redundantie.','Lees de statusindicaties als systeemstatus, niet als checklist.'],
  ['oh-adr1','ADR 1 selector',42,6,'Air Data Reference 1-selectie.','ADR levert air-data-informatie zoals luchtsnelheid en hoogte.','De panelindeling kan per standaard verschillen.'],
  ['oh-adr2','ADR 2 selector',47,6,'Air Data Reference 2-selectie.','Tweede air-data-referentiekanaal.','Vergelijk de indicatie met de ECAM-status.'],
  ['oh-adr3','ADR 3 selector',52,6,'Air Data Reference 3-selectie.','Derde air-data-referentiekanaal.','De beschikbaarheid is configuratieafhankelijk.'],
  ['oh-evac','EVAC pushbutton',7,15,'EVAC-evacuatiebediening.','Onderdeel van het systeem voor cabine-evacuatie-alarm/communicatie.','Niet verwarren met een normale cabine-intercomfunctie.'],
  ['oh-emer-elec','Emergency electrical power guarded control',8,27,'Beschermde emergency electrical power-bediening.','Hoort bij de nood-elektrische architectuur van het vliegtuig.','Beschermde bediening is extra afgeschermd vanwege het bijzondere systeemkarakter.'],
  ['oh-gen1','GEN 1 control',30,29,'Generator 1 control.','Onderdeel van de elektrische energievoorziening vanaf motor 1.','De status en busverdeling worden ook op de elektrische synoptic weergegeven.'],
  ['oh-gen2','GEN 2 control',70,29,'Generator 2 control.','Onderdeel van de elektrische energievoorziening vanaf motor 2.','De twee motor-generatoren vormen gescheiden bronnen in het systeemontwerp.'],
  ['oh-idg1','IDG 1 control',28,38,'Integrated Drive Generator 1.','IDG levert een stabiele generatoraandrijving vanaf motor 1.','De functie hoort bij de motor- en elektrische systeemarchitectuur.'],
  ['oh-idg2','IDG 2 control',72,38,'Integrated Drive Generator 2.','IDG levert een stabiele generatoraandrijving vanaf motor 2.','Niet verwarren met een normale generatorstatusindicatie.'],
  ['oh-bat1','BAT 1 pushbutton',38,15,'Battery 1 pushbutton en status.','De batterij is een van de elektrische energiebronnen.','De actuele spanning en status worden op de elektrische systeeminformatie getoond.'],
  ['oh-bat2','BAT 2 pushbutton',62,15,'Battery 2 pushbutton en status.','Tweede batterijbron in de elektrische architectuur.','De status is onderdeel van de bredere elektrische configuratie.'],
  ['oh-bus-tie','BUS TIE control',50,26,'Bus-tie control in het elektrische paneel.','Bus-tie-logica verbindt of scheidt delen van de elektrische distributie.','De verdeling hangt af van beschikbare elektrische bronnen.'],
  ['oh-apu-gen','APU GEN control',49,37,'APU generator control.','De APU kan elektrische energie leveren wanneer de configuratie dat toestaat.','De APU is een aanvullende energiebron; hij is niet hetzelfde als een motor-generator.'],
  ['oh-ext-pwr','External power control',87,29,'External power control.','Externe grondvoeding kan het vliegtuig van elektrische energie voorzien.','De indicatie laat zien of externe voeding beschikbaar is of wordt gebruikt.'],
  ['oh-galley','Galley electrical control',15,34,'Galley electrical load control.','Hoort bij de elektrische voeding van de galley-belasting.','Belastingen kunnen afhankelijk van de elektrische configuratie worden beheerd.'],
  ['oh-emer-gen','Emergency generator section',7,44,'Emergency generator / RAT-related section.','Deze sectie hoort bij de nood-elektrische voorziening.','De RAT en noodgenerator hebben een bijzondere rol bij verlies van normale bronnen.'],
  ['oh-oxygen-pax','Passenger oxygen guarded control',14,68,'Passenger oxygen control.','Onderdeel van de passagierszuurstofvoorziening.','De klep/guard voorkomt onbedoelde bediening.'],
  ['oh-oxygen-crew','Crew oxygen control',31,68,'Crew oxygen control.','Onderdeel van de zuurstofvoorziening voor de cockpitbemanning.','De cockpitzuurstofinstallatie heeft eigen druk- en opslagvoorzieningen.'],
  ['oh-calls','Call / cabin signal section',8,78,'Call- en cabin signal-functies.','Ondersteunt signalering en communicatie met cabinepersoneel.','De exacte labels kunnen per paneelstandaard afwijken.'],
  ['oh-wipers','Wiper controls',18,91,'Cockpit windshield wiper selector.','Regelt de ruitenwissers voor de cockpitruiten.','De bediening heeft verschillende standen afhankelijk van uitvoering.'],
  ['oh-pack1','PACK 1 flow selector',36,51,'Air-conditioning PACK 1.','PACK 1 behandelt lucht voor de air-conditioning- en pressurization-systemen.','De PACK-indicaties zijn terug te vinden op de AIR synoptic.'],
  ['oh-pack2','PACK 2 flow selector',65,51,'Air-conditioning PACK 2.','PACK 2 is de tweede air-conditioning unit.','De twee PACKs ondersteunen de luchtvoorziening met redundantie.'],
  ['oh-cockpit-temp','Cockpit temperature selector',48,52,'Cockpit temperature selector.','Regelt de gevraagde temperatuur voor de cockpitzone.','Temperatuurregeling is gekoppeld aan de luchtverdeling en packs.'],
  ['oh-fwd-cabin-temp','Forward cabin temperature selector',57,52,'Forward cabin temperature selector.','Regelt de temperatuurvraag voor de voorste cabinezone.','De uiteindelijke luchtverdeling hangt af van de air-conditioningregeling.'],
  ['oh-aft-cabin-temp','Aft cabin temperature selector',68,52,'Aft cabin temperature selector.','Regelt de temperatuurvraag voor de achterste cabinezone.','Zones kunnen afzonderlijk worden ingesteld.'],
  ['oh-bleed1','Engine 1 bleed control',35,60,'Engine 1 bleed-air control.','Bleed air van motor 1 wordt gebruikt als bron voor pneumatische systemen.','De status is gekoppeld aan air-conditioning en pressurization.'],
  ['oh-bleed2','Engine 2 bleed control',68,60,'Engine 2 bleed-air control.','Bleed air van motor 2 ondersteunt de pneumatische architectuur.','De systeemlogica is gekoppeld aan motor-, APU- en air-conditioningbronnen.'],
  ['oh-apu-bleed','APU bleed control',50,60,'APU bleed-air control.','De APU kan onder bepaalde condities bleed air leveren.','De indicaties op de AIR synoptic geven aanvullende context.'],
  ['oh-crossbleed','Crossbleed selector',56,60,'Crossbleed selector.','De crossbleed-verbinding kan delen van het pneumatische systeem verbinden.','De stand hoort bij de bleed-air-systeemconfiguratie.'],
  ['oh-hot-air','Hot air control',83,51,'Hot air / trim-air control.','Trim-air wordt gebruikt voor de temperatuurregeling van verschillende zones.','De werking hangt samen met de gekozen zone-temperaturen.'],
  ['oh-cargo-vent','Cargo ventilation controls',89,20,'Cargo ventilation section.','Regelt de ventilatie van de cargo-compartimenten, afhankelijk van configuratie.','De foto toont de bediening van dit systeem rechts op het paneel.'],
  ['oh-cargo-smoke','Cargo smoke detection section',88,43,'Cargo smoke detection section.','Onderdeel van rookdetectie in de cargo-compartimenten.','Rookdetectie en blusfuncties zijn type- en configuratiegebonden.'],
  ['oh-cargo-disch','Cargo discharge guarded controls',95,44,'Cargo fire discharge guarded control.','Hoort bij de cargo fire-protection-architectuur.','Beschermde bedieningen zijn nadrukkelijk geen oefenknoppen.'],
  ['oh-press-mode','Cabin pressurization mode selector',49,78,'Cabin pressurization mode selector.','Selecteert de automatische of alternatieve regeling volgens de systeemarchitectuur.','De actuele cabinedrukinformatie verschijnt op de betreffende systeemweergave.'],
  ['oh-press-landing','Landing elevation selector',60,78,'Landing elevation selector.','Geeft de landing-elevation-referentie voor de drukregeling.','Deze waarde is gekoppeld aan de bestemming en systeemlogica.'],
  ['oh-press-ditch','Ditching pushbutton',75,79,'DITCHING pushbutton.','Onderdeel van een bijzondere noodconfiguratie voor geselecteerde openingen/ventilatie.','Deze functie is bedoeld voor noodsituaties en alleen te leren via officiële training.'],
  ['oh-probe-heat','Probe / window heat controls',49,70,'Probe and window heat section.','Verwarmt geselecteerde pitot-/statische sondes en cockpitruiten volgens de systeemlogica.','De betrokken indicaties zijn gekoppeld aan ijsbescherming en air-data betrouwbaarheid.'],
  ['oh-wai1','Wing anti-ice 1 control',29,76,'Wing anti-ice control.','Onderdeel van de ijsbescherming van de vleugel.','Gebruik en status zijn gekoppeld aan de omgevingscondities en anti-ice-logica.'],
  ['oh-eng1-ice','Engine 1 anti-ice control',36,76,'Engine 1 anti-ice control.','Onderdeel van de ijsbescherming van motor 1.','De werking beïnvloedt de pneumatische en motorgerelateerde systeemstatus.'],
  ['oh-eng2-ice','Engine 2 anti-ice control',42,76,'Engine 2 anti-ice control.','Onderdeel van de ijsbescherming van motor 2.','De indicaties en beperkingen horen bij de officiële aircraft documentation.'],
  ['oh-nav-lights','Navigation lights switch',30,91,'Navigation lights.','Buitenverlichting voor zichtbaarheid en herkenning van het vliegtuig.','De verlichting heeft een eigen positie in de exterior-lighting-rij.'],
  ['oh-beacon','Beacon light switch',39,91,'Beacon lights.','Rode anti-collision-verlichting op het vliegtuig.','De verlichting is onderdeel van de externe signalering.'],
  ['oh-strobe','Strobe light switch',48,91,'Strobe lights.','Witte knipperende anti-collision-verlichting.','De zichtbaarheid ondersteunt herkenning door andere verkeersdeelnemers.'],
  ['oh-wing','Wing lights switch',56,91,'Wing lights.','Verlichting van de vleugelomgeving.','Wordt gebruikt voor zicht op de vleugelomgeving en externe inspectiecontext.'],
  ['oh-landing-l','Left landing light control',64,91,'Landing light control (links).','Onderdeel van de krachtige landingsverlichting.','De exacte grouping verschilt per uitvoering.'],
  ['oh-landing-r','Right landing light control',71,91,'Landing light control (rechts).','Onderdeel van de landingsverlichting aan de andere zijde.','De bediening is onderdeel van de exterior-lighting-sectie.'],
  ['oh-taxi','Taxi light control',79,91,'Taxi light control.','Taxi-verlichting ondersteunt zicht tijdens grondbewegingen.','De naam verwijst naar de functie, niet naar een route- of ATC-toestemming.'],
  ['oh-runway-turnoff','Runway turnoff lights',85,91,'Runway turnoff lights.','Verlichten de omgeving links/rechts van de neus tijdens grondbeweging.','Deze lampen zijn apart herkenbaar in de verlichtingsrij.'],
  ['oh-logo','Logo / nose lights',92,91,'Logo / nose light controls.','Aanvullende buitenverlichting, afhankelijk van de vliegtuigconfiguratie.','Niet elk toestel heeft exact dezelfde opties.'],
  ['oh-apu-master','APU master section',43,98,'APU master section.','Hoort bij de bediening en status van de auxiliary power unit.','De APU heeft eigen start-, generator- en bleed-air-functies.'],
  ['oh-fire-eng1','Engine 1 fire handle / detection area',8,54,'Engine 1 fire-protection area.','Onderdeel van detectie- en beveiligingsfuncties voor motor 1.','Deze groep is een herkenningspunt; volg voor noodsituaties uitsluitend officiële training.'],
  ['oh-fire-eng2','Engine 2 fire-protection area',90,55,'Engine 2 fire-protection area.','Onderdeel van detectie- en beveiligingsfuncties voor motor 2.','De labels en guards horen bij een veiligheidskritisch systeem.'],
  ['oh-fire-apu','APU fire-protection area',50,96,'APU fire-protection area.','Detectie- en blusgerelateerde functies voor de APU.','Deze bediening is niet bedoeld om in een online tutorial te activeren.']
].forEach(([id,title,x,y,description,purpose,context]) => add(id,title,'overhead',x,y,description,purpose,context));

/* ───────────────────────── PEDESTAL ───────────────────────── */
[
  ['ped-thrust1','Engine 1 thrust lever',50,47,'Thrust lever voor motor 1.','De leverstand wordt gebruikt in de stuwkrachtregeling en is gekoppeld aan de autothrust-logica.','De detents en modes moeten in de context van het A320-systeem worden begrepen.'],
  ['ped-thrust2','Engine 2 thrust lever',57,47,'Thrust lever voor motor 2.','Tweede thrust lever voor de motorstuwkracht.','De twee levers worden als paar bediend.'],
  ['ped-reverse1','Reverse thrust lever 1',49,35,'Reverse-thrust-bediening voor motor 1.','Onderdeel van de reverserbediening na landing.','De werking hangt af van de thrust-lever-mechaniek en motorregeling.'],
  ['ped-reverse2','Reverse thrust lever 2',58,35,'Reverse-thrust-bediening voor motor 2.','Onderdeel van de reverserbediening voor de tweede motor.','Dit is uitsluitend een uitleg van de fysieke herkenningsplek.'],
  ['ped-speedbrake','Speed brake / spoiler lever',23,84,'Speed-brake-lever.','Bedient de selectie van spoiler-/speed-brake-functies.','De spoilers beïnvloeden lift en weerstand en hebben meerdere systeemrollen.'],
  ['ped-flaps','Flap lever',82,86,'Flap selector lever.','Selecteert een high-lift-configuratie voor slats en flaps.','De indicatie en de fysieke positie hangen samen met de vleugelconfiguratie.'],
  ['ped-parking-brake','Parking brake control',72,90,'Parking brake control.','Hoort bij de parkeerremfunctie van het remsysteem.','Statusinformatie is ook op de systeemindicaties terug te vinden.'],
  ['ped-rudder-trim','Rudder trim control',82,75,'Rudder trim control.','Hoort bij de trim-instelling van het richtingsroer.','Trimfuncties zijn te onderscheiden van primaire stuurinvoer.'],
  ['ped-eng1-master','Engine 1 master control',42,88,'Engine 1 master control area.','Hoort bij de motormanagement- en start/stop-interface.','De knop is onderdeel van een veiligheidskritische motorketen.'],
  ['ped-eng2-master','Engine 2 master control',61,88,'Engine 2 master control area.','Hoort bij de tweede motorbedieningsketen.','Niet gebruiken als interactieve simulatie; dit is een fotoatlas.'],
  ['ped-mode-selector','Engine mode selector',51,92,'Engine mode selector.','Selecteert een engine-control-mode in de A320-configuratie.','De modes zijn gekoppeld aan start- en motormanagementsystemen.'],
  ['ped-mcdu-left','Captain MCDU',25,40,'Linker MCDU op de pedestal.','Flight-managementinvoer en navigatie-/performancepagina’s.','Open de MCDU-detailpagina om de toetsen afzonderlijk te leren kennen.'],
  ['ped-mcdu-right','First Officer MCDU',78,40,'Rechter MCDU op de pedestal.','Tweede MCDU-interface voor flight-managementinformatie.','De beschikbaarheid van bepaalde pagina’s is software- en operatorafhankelijk.'],
  ['ped-rmp-left','Radio Management Panel 1',19,65,'Radio Management Panel aan linkerzijde.','Interface voor radiofrequenties en radio-/navigatiebronselectie.','De precieze radio-uitrusting hangt af van de vliegtuigconfiguratie.'],
  ['ped-rmp-right','Radio Management Panel 2',84,64,'Radio Management Panel aan rechterzijde.','Tweede radio-managementinterface.','De panels kunnen als alternatieve bedieningspunten dienen.'],
  ['ped-acp-left','Captain Audio Control Panel',12,57,'Audio Control Panel captain.','Selecteert en beheert audio-bronnen voor radio en intercom.','De bediening van luisteren, zenden en volume zijn verschillende functies.'],
  ['ped-acp-right','First Officer Audio Control Panel',93,57,'Audio Control Panel first officer.','Audioselectie aan first-officer-zijde.','De exacte knoppenlayout verschilt per standaard.'],
  ['ped-transponder','ATC / transponder controls',76,74,'Transponder/ATC-panelgebied.','Hoort bij surveillance-identificatie en geselecteerde ATC-functies.','Gebruik geen echte codes of instellingen zonder bevoegde instructie.'],
  ['ped-ecam-ctl','ECAM control panel',50,16,'ECAM control panel boven de pedestal.','Geeft toegang tot ECAM-systeemweergaven en bepaalde displayfuncties.','De knoppen selecteren weergaven; ze voeren geen vervanging voor procedures uit.'],
  ['ped-radio-select','Radio source selection area',34,66,'Radio- en audio-selectiegebied.','Hier bevinden zich geselecteerde communicatiegerelateerde bedieningselementen.','Kijk naar de labels op de foto; exacte configuratie verschilt per toestel.'],
  ['ped-hand-mic','Hand microphone',7,74,'Handmicrofoon op de console.','Voor radiocommunicatie wanneer de handmicrofoon als audiobron is geselecteerd.','De microfoon zelf is een invoerapparaat, geen radiozender.'],
  ['ped-interphone','Interphone / cabin communication',91,80,'Interphone/cabin communication controls.','Onderdeel van interne communicatie met cockpit of cabine.','De functie hangt af van de geselecteerde audio-route.'],
  ['ped-audio-volume','Audio volume controls',13,48,'Audio volume control section.','Regelt het luistervolume van geselecteerde bronnen.','Volume en bronselectie zijn afzonderlijke instellingen.'],
  ['ped-xpdr-selector','Transponder mode selector',73,66,'Transponder mode selector.','Selecteert de operationele weergave-/statusmodus van de transponder.','De feitelijke werking hangt af van de surveillance-installatie.'],
  ['ped-xpdr-code','Transponder code controls',79,69,'Transponder code display/keys.','Code-invoer voor vliegtuigidentificatie in secundaire surveillance.','Dit is alleen een uitleg van het onderdeel; gebruik actuele ATC-instructies.'],
  ['ped-mcdubrt','MCDU brightness/dim control',30,31,'MCDU brightness/dim controls.','Regelen de schermhelderheid van de MCDU.','De specifieke knop zit ook op de close-up MCDU-fotopagina.'],
  ['ped-ecam-bright','ECAM brightness controls',46,19,'Display brightness controls.','Regelen de helderheid van cockpitdisplays.','Helderheid is afhankelijk van de lichtomstandigheden en displayconfiguratie.'],
  ['ped-park-area','Parking brake status area',72,96,'Parking brake status/handle area.','Fysieke parkeerrembediening en bijbehorende statuscontext.','De remstatus kan ook op ECAM-indicaties worden teruggevonden.'],
  ['ped-gear-area','Landing gear related panel area',95,92,'Landingsgestel-gerelateerd bedieningsgebied.','De cockpit bevat aanvullende gear- en ground-control-indicaties.','Niet ieder toestel heeft exact dezelfde zichtbare paneelindeling.'],
  ['ped-comm-area','Communication panel area',18,78,'Communicatiepaneelgebied.','Groepeert radio-, intercom- en audiofuncties.','Leer de aparte functies kennen voordat je de bediening in een simulator gebruikt.']
].forEach(([id,title,x,y,description,purpose,context]) => add(id,title,'pedestal',x,y,description,purpose,context));

/* ───────────────────────── MCDU ───────────────────────── */
[
  ['mcdu-display','MCDU display',49,28,'Het MCDU-display toont de actieve flight-managementpagina.','Pagina’s presenteren route-, performance-, navigatie- en systeemgerelateerde gegevens.','De precieze pagina’s zijn afhankelijk van FMGC-software en operatoropties.'],
  ['mcdu-lsk1l','Left line select key 1',31,33,'Linker line-select key naast de bovenste schermregel.','Koppelt de betreffende schermregel aan invoer of selectie.','De functie verandert met de pagina die op het scherm staat.'],
  ['mcdu-lsk2l','Left line select key 2',29,40,'Linker line-select key naast schermregel 2.','Selecteert of koppelt informatie aan de tweede linker regel.','Er bestaat geen vaste functie voor elke line-select key.'],
  ['mcdu-lsk3l','Left line select key 3',27,47,'Linker line-select key naast schermregel 3.','Selecteert de inhoud op de corresponderende schermregel.','De context wordt bepaald door de actieve pagina.'],
  ['mcdu-lsk4l','Left line select key 4',25,54,'Linker line-select key naast schermregel 4.','Koppelt de vierde schermregel aan een selectie.','Dezelfde fysieke toets kan per pagina een andere actie hebben.'],
  ['mcdu-lsk5l','Left line select key 5',23,61,'Linker line-select key naast schermregel 5.','Selecteert een veld naast de vijfde schermregel.','Gebruik de displayed prompt om de actie te begrijpen.'],
  ['mcdu-lsk6l','Left line select key 6',21,68,'Left line-select key onderaan het scherm.','Koppelt de onderste linker regel aan selectie of invoer.','De context verandert afhankelijk van de actieve pagina.'],
  ['mcdu-lsk1r','Right line select key 1',68,33,'Rechter line-select key naast de bovenste schermregel.','Selecteert de informatie op de corresponderende rechter regel.','De key is contextgevoelig.'],
  ['mcdu-lsk2r','Right line select key 2',70,40,'Rechter line-select key naast schermregel 2.','Koppelt de tweede rechter schermregel aan selectie of invoer.','De functie staat naast de schermregel beschreven.'],
  ['mcdu-lsk3r','Right line select key 3',72,47,'Rechter line-select key naast schermregel 3.','Selecteert de corresponderende regel op de pagina.','De betekenis is pagina-afhankelijk.'],
  ['mcdu-lsk4r','Right line select key 4',74,54,'Rechter line-select key naast schermregel 4.','Koppelt de vierde rechter regel aan selectie.','Kijk naar de prompt op het scherm.'],
  ['mcdu-lsk5r','Right line select key 5',76,61,'Rechter line-select key naast schermregel 5.','Selecteert de vijfde rechter schermregel.','De toets kan data overnemen of een pagina openen.'],
  ['mcdu-lsk6r','Right line select key 6',78,68,'Rechter line-select key onderaan het scherm.','Koppelt de onderste rechter regel aan de invoer.','De betekenis wordt bepaald door de zichtbare prompt.'],
  ['mcdu-dir','DIR key',35,53,'DIR-toets voor direct-to-gerelateerde pagina’s.','Opent de direct-to-functies van de flight-managementinterface.','Het is een pagina-/functieknop; routekeuzes moeten altijd in de juiste context worden beoordeeld.'],
  ['mcdu-prog','PROG key',43,52,'PROG-toets voor flight progress.','Opent voortgangs- en navigatiegerelateerde informatie.','De getoonde informatie hangt af van de softwareconfiguratie.'],
  ['mcdu-perf','PERF key',52,51,'PERF-toets voor performancepagina’s.','Opent performancegerelateerde pagina’s.','Performancegegevens zijn toestel- en vluchtconfiguratieafhankelijk.'],
  ['mcdu-init','INIT key',61,50,'INIT-toets voor initialisatiepagina’s.','Opent de initialisatie- en vluchtgegevenspagina’s.','De invoer op deze pagina’s hoort bij formele vluchtvoorbereiding.'],
  ['mcdu-data','DATA key',70,49,'DATA-toets voor data- en statuspagina’s.','Opent data-/statusinformatie die beschikbaar is in de FMS.','De inhoud verschilt tussen versies en operators.'],
  ['mcdu-fpln','F-PLN key',35,61,'F-PLN-toets voor flight plan.','Toont de route- en flight-plan-pagina.','Waypoints en routegegevens worden als pagina-informatie weergegeven.'],
  ['mcdu-radnav','RAD NAV key',43,60,'RAD NAV-toets voor radio-navigatiegegevens.','Opent navigatieradio-gerelateerde pagina’s.','Bronselectie en beschikbaarheid verschillen per avionica-stand.'],
  ['mcdu-fuelpred','FUEL PRED key',52,59,'FUEL PRED-toets.','Opent brandstofvoorspellingsinformatie.','De weergegeven voorspelling is afhankelijk van vlucht- en prestatiegegevens.'],
  ['mcdu-secflp','SEC F-PLN key',61,58,'SEC F-PLN-toets voor secundair flight plan.','Geeft toegang tot de secundaire flight-plan-functie.','Dit is een afzonderlijke routepagina en geen tweede onafhankelijke navigatiecomputer.'],
  ['mcdu-atc','ATC COMM key',70,57,'ATC COMM-toets.','Opent ATC-datalink- of communicatiegerelateerde pagina’s wanneer beschikbaar.','De beschikbaarheid hangt af van de geïnstalleerde communicatie-uitrusting.'],
  ['mcdu-menu','MCDU MENU key',61,65,'MCDU MENU-toets.','Opent het menu met beschikbare MCDU-applicaties of functies.','Welke applicaties verschijnen hangt af van software en operatorconfiguratie.'],
  ['mcdu-brt','BRT key',70,65,'BRT brightness key.','Verhoogt de helderheid van de MCDU-display.','Helderheid beïnvloedt alleen de zichtbaarheid, niet de flight-managementgegevens.'],
  ['mcdu-dim','DIM key',78,65,'DIM key.','Verlaagt de helderheid van de MCDU-display.','Samen met BRT helpt dit om de display helderheid aan te passen.'],
  ['mcdu-alpha-a','A key',43,68,'Alfabetische invoertoets A.','Voert de letter A in het scratchpad of geselecteerde veld in.','Welke tekens zijn toegestaan hangt af van het actieve veld.'],
  ['mcdu-alpha-b','B key',52,67,'Alfabetische invoertoets B.','Voert de letter B in.','De toets wordt gebruikt bij tekst- en identifier-invoer.'],
  ['mcdu-alpha-c','C key',61,67,'Alfabetische invoertoets C.','Voert de letter C in.','De invoer verschijnt doorgaans in het scratchpad.'],
  ['mcdu-alpha-d','D key',70,66,'Alfabetische invoertoets D.','Voert de letter D in.','De betekenis wordt bepaald door het actieve invoerveld.'],
  ['mcdu-alpha-e','E key',79,66,'Alfabetische invoertoets E.','Voert de letter E in.','Bij sommige pagina’s worden letters gebruikt voor identificaties of namen.'],
  ['mcdu-alpha-f','F key',36,75,'Alfabetische invoertoets F.','Voert de letter F in.','De letters vormen een deel van het alfanumerieke toetsenbord.'],
  ['mcdu-alpha-g','G key',45,74,'Alfabetische invoertoets G.','Voert de letter G in.','De sleutel is contextafhankelijk op basis van het invoerveld.'],
  ['mcdu-alpha-h','H key',54,73,'Alfabetische invoertoets H.','Voert de letter H in.','De invoer is zichtbaar in het scratchpad.'],
  ['mcdu-alpha-i','I key',63,72,'Alfabetische invoertoets I.','Voert de letter I in.','De toets is onderdeel van de letterinvoer.'],
  ['mcdu-alpha-j','J key',72,71,'Alfabetische invoertoets J.','Voert de letter J in.','Gebruik de toets alleen om de fysieke MCDU-indeling te leren.'],
  ['mcdu-alpha-k','K key',37,82,'Alfabetische invoertoets K.','Voert de letter K in.','De letters worden in het actieve scratchpad ingevoerd.'],
  ['mcdu-alpha-l','L key',46,81,'Alfabetische invoertoets L.','Voert de letter L in.','De exacte invoermogelijkheden zijn veldafhankelijk.'],
  ['mcdu-alpha-m','M key',55,80,'Alfabetische invoertoets M.','Voert de letter M in.','Wordt gebruikt voor tekstuele invoer.'],
  ['mcdu-alpha-n','N key',64,79,'Alfabetische invoertoets N.','Voert de letter N in.','Een toets op het alfanumerieke gedeelte van het keypad.'],
  ['mcdu-alpha-o','O key',73,78,'Alfabetische invoertoets O.','Voert de letter O in.','Het veld bepaalt hoe de letter wordt verwerkt.'],
  ['mcdu-alpha-p','P key',29,88,'Alfabetische invoertoets P.','Voert de letter P in.','De toets is een van de tekstinvoertoetsen.'],
  ['mcdu-alpha-q','Q key',38,87,'Alfabetische invoertoets Q.','Voert de letter Q in.','De toets werkt samen met het scratchpad.'],
  ['mcdu-alpha-r','R key',47,86,'Alfabetische invoertoets R.','Voert de letter R in.','De toets is onderdeel van de alfanumerieke matrix.'],
  ['mcdu-alpha-s','S key',56,85,'Alfabetische invoertoets S.','Voert de letter S in.','Gebruik de key bij uitleg over identifier-invoer.'],
  ['mcdu-alpha-t','T key',65,84,'Alfabetische invoertoets T.','Voert de letter T in.','De toets is contextgevoelig zoals de rest van het keypad.'],
  ['mcdu-alpha-u','U key',74,83,'Alfabetische invoertoets U.','Voert de letter U in.','De toets vormt onderdeel van de lettergroep.'],
  ['mcdu-alpha-v','V key',30,94,'Alfabetische invoertoets V.','Voert de letter V in.','De invoer wordt in het scratchpad opgebouwd.'],
  ['mcdu-alpha-w','W key',39,93,'Alfabetische invoertoets W.','Voert de letter W in.','De toets maakt deel uit van de alfanumerieke invoer.'],
  ['mcdu-alpha-x','X key',48,92,'Alfabetische invoertoets X.','Voert de letter X in.','De key heeft geen vaste routefunctie; hij voert tekst in.'],
  ['mcdu-alpha-y','Y key',57,91,'Alfabetische invoertoets Y.','Voert de letter Y in.','De key is onderdeel van de alfanumerieke matrix.'],
  ['mcdu-alpha-z','Z key',66,90,'Alfabetische invoertoets Z.','Voert de letter Z in.','De toets wordt gebruikt bij tekstuele velden.'],
  ['mcdu-num-1','Numeric key 1',20,78,'Numerieke invoertoets 1.','Voert het cijfer 1 in.','De betekenis van een numerieke waarde hangt af van het geselecteerde veld.'],
  ['mcdu-num-2','Numeric key 2',29,77,'Numerieke invoertoets 2.','Voert het cijfer 2 in.','Getallen kunnen bijvoorbeeld deel uitmaken van een identifier of waarde.'],
  ['mcdu-num-3','Numeric key 3',38,76,'Numerieke invoertoets 3.','Voert het cijfer 3 in.','De MCDU valideert invoer afhankelijk van de actieve pagina.'],
  ['mcdu-num-4','Numeric key 4',20,86,'Numerieke invoertoets 4.','Voert het cijfer 4 in.','De toets is onderdeel van de numerieke invoergroep.'],
  ['mcdu-num-5','Numeric key 5',29,85,'Numerieke invoertoets 5.','Voert het cijfer 5 in.','De key wordt gebruikt om numerieke velden te vullen.'],
  ['mcdu-num-6','Numeric key 6',38,84,'Numerieke invoertoets 6.','Voert het cijfer 6 in.','De betekenis hangt af van de pagina en het veld.'],
  ['mcdu-num-7','Numeric key 7',20,94,'Numerieke invoertoets 7.','Voert het cijfer 7 in.','Een numerieke invoer wordt meestal eerst in het scratchpad gezet.'],
  ['mcdu-num-8','Numeric key 8',29,93,'Numerieke invoertoets 8.','Voert het cijfer 8 in.','De MCDU verwerkt invoer volgens veldvalidatie.'],
  ['mcdu-num-9','Numeric key 9',38,92,'Numerieke invoertoets 9.','Voert het cijfer 9 in.','Gebruik de toets voor getallen in toegestane invoervelden.'],
  ['mcdu-num-0','Numeric input 0',20,101,'Numerieke invoertoets 0.','Voert het cijfer 0 in.','De toets zit onderaan het numerieke deel van het keypad.'],
  ['mcdu-plusminus','Plus / minus key',47,99,'Plus/min-toets.','Voegt een plus- of minteken toe aan een numerieke invoer.','De geldigheid van het teken is afhankelijk van het veld.'],
  ['mcdu-dot','Decimal point key',56,98,'Decimal point key.','Voert een decimaalteken in.','Notatie en toegestane precisie zijn veldafhankelijk.'],
  ['mcdu-slash','Slash key',65,97,'Slash key.','Voert een schuine streep in.','Wordt gebruikt in velden die deze notatie ondersteunen.'],
  ['mcdu-space','Space key',74,96,'Space key.','Voert een spatie in.','Niet elk veld accepteert spaties.'],
  ['mcdu-overfly','OVFY key',82,99,'OVFY key.','Hoort bij een specifieke route-/waypointfunctie.','Leer deze toets in de context van de F-PLN-pagina.'],
  ['mcdu-clr','CLR key',90,97,'CLR key.','Wist invoer in het scratchpad of een geselecteerd veld, afhankelijk van context.','De werking is afhankelijk van de huidige cursor-/pagina-status.'],
  ['mcdu-arrow','Arrow / slew keys',18,68,'Arrow/slew keys.','Bieden cursor- of scrollbediening in ondersteunde MCDU-pagina’s.','De precieze werking hangt af van de gebruikte pagina.'],
  ['mcdu-scratch','Scratchpad line',49,17,'Scratchpad-regel op het display.','Toont ingevoerde tekst en meldingen voor gegevensinvoer.','Het scratchpad is geen fysieke toets, maar een belangrijk displaygebied.']
].forEach(([id,title,x,y,description,purpose,context]) => add(id,title,'mcdu',x,y,description,purpose,context));

/* Add individual, visible overhead controls omitted from the main named groups. */
[
  ['oh-rain-rplnt','Rain repellent control',5,88,'Rain repellent bediening.','Hoort bij de zicht- en ruitgerelateerde functies.','De voorziening is afhankelijk van de vliegtuigstandaard.'],
  ['oh-probe-window-left','Probe/window heat left section',42,70,'Linker probe/window heat bediening.','Onderdeel van verwarming voor geselecteerde sondes en ruiten.','De status is onderdeel van het anti-ice- en air-data-overzicht.'],
  ['oh-probe-window-right','Probe/window heat right section',57,70,'Rechter probe/window heat bediening.','Onderdeel van de probe/window heat-functies.','De afzonderlijke indicaties tonen de betreffende systeemstatus.'],
  ['oh-cabin-fans','Cabin fans controls',94,63,'Cabin fans bediening.','Onderdeel van de luchtcirculatie in de cabine.','De exacte configuratie verschilt per A320-standaard.'],
  ['oh-blower','Blower control',83,62,'Blower control.','Onderdeel van de ventilatie/air-conditioning-architectuur.','De status is gekoppeld aan de geselecteerde ventilatieconfiguratie.'],
  ['oh-extract','Extract control',91,63,'Extract control.','Onderdeel van de lucht-extractie/ventilatie.','De functie werkt samen met de cabineventilatie.'],
  ['oh-ram-air','RAM AIR control',43,61,'RAM AIR control.','Hoort bij de alternatieve ventilatie-/luchttoevoerfunctie.','Alleen bedoeld als systeemherkenning.'],
  ['oh-pack-flow','PACK FLOW selector',28,51,'PACK FLOW selector.','Selecteert de gewenste luchtstroomconfiguratie van de packs.','De weergave hangt samen met de passagiers- en cabineconfiguratie.'],
  ['oh-ground-control','Ground control section',8,60,'Ground control section.','Groep van grondgerelateerde systeemfuncties en indicaties.','Raadpleeg de specifieke labels in de bronfoto voor de exacte uitvoering.'],
  ['oh-cvr-test','CVR test control',25,67,'Cockpit Voice Recorder test control.','Hoort bij de test-/statusfuncties van de cockpit voice recorder.','Recorder-tests zijn onderdeel van formele procedures.'],
  ['oh-cvr-erase','CVR erase guarded control',18,67,'CVR erase guarded control.','Beschermde erase-functie voor de cockpit voice recorder.','Dit is een beveiligde functie en geen knop om in de praktijk uit te proberen.']
].forEach(([id,title,x,y,description,purpose,context]) => add(id,title,'overhead',x,y,description,purpose,context));

export const tutorial = [
  { view: 'overview', item: 'ov-fcu', title: 'Welkom op de flight deck', body: 'Je begint met het volledige cockpitoverzicht. De cockpit bestaat uit een main instrument panel, overhead panel, zijconsoles en de center pedestal. Gebruik de tabbladen om tussen de echte detailfoto’s te wisselen.' },
  { view: 'main', item: 'pfd-cap', title: 'Begin bij de PFD', body: 'Het Primary Flight Display toont de belangrijkste vluchttoestand. Je herkent onder meer de kunstmatige horizon, snelheidsband, hoogteschaal en flight-guidance-aanduidingen.' },
  { view: 'main', item: 'nd-cap', title: 'Leer het ND kennen', body: 'Het Navigation Display geeft de route en navigatiecontext weer. De gekozen range en mode bepalen hoeveel informatie zichtbaar is.' },
  { view: 'main', item: 'fcu-spd-knob', title: 'De FCU en automatisering', body: 'De FCU is de bedieningsinterface voor geselecteerde vluchtgeleidingswaarden. Let op de samenhang tussen de gekozen instelling en de Flight Mode Annunciator op de PFD.' },
  { view: 'main', item: 'ecam-upper', title: 'ECAM: systeeminformatie', body: 'ECAM presenteert systeemmeldingen, motorinformatie en synoptics. Het helpt je te begrijpen waar de crew de systeemstatus afleest.' },
  { view: 'overhead', item: 'oh-bat1', title: 'Boven je hoofd: overheadpanel', body: 'Het overheadpanel groepeert veel systeemschakelaars. De indeling is per systeem gegroepeerd: elektrisch, hydraulisch, brandstof, lucht, anti-ice, verlichting en beveiliging.' },
  { view: 'overhead', item: 'oh-pack1', title: 'Air conditioning en bleed air', body: 'De PACK-, bleed- en temperatuurregelaars horen bij de luchtvoorziening en cabineconditionering. Bekijk hoe de onderdelen per sectie zijn gegroepeerd.' },
  { view: 'pedestal', item: 'ped-thrust1', title: 'De center pedestal', body: 'Hier vind je thrust levers, speed brake, flaps, MCDU’s en radio-/audio-bediening. Open de close-up om de fysieke onderdelen afzonderlijk te bekijken.' },
  { view: 'mcdu', item: 'mcdu-display', title: 'De MCDU leren lezen', body: 'Het MCDU-scherm toont de actieve pagina. De line-select keys aan weerszijden zijn contextgevoelig: hun functie volgt uit de tekst op dezelfde regel.' },
  { view: 'mcdu', item: 'mcdu-clr', title: 'Het toetsenbord', body: 'De MCDU heeft aparte functietoetsen, line-select keys en een alfanumeriek toetsenbord. Elke gemarkeerde toets heeft een eigen uitleg in deze atlas.' },
  { view: 'overview', item: 'ov-pedestal', title: 'Zelf verder ontdekken', body: 'Je hebt nu de hoofdgebieden gezien. Gebruik de zoekfunctie of de volledige onderdelenlijst om de overige gemarkeerde bedieningselementen te verkennen.' }
];

export const allControlsCount = controls.length;
