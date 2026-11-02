/**
 * Registry for the expandable multi-aircraft academy.
 * Add a separate data module and 3D scene adapter when a cockpit is ready.
 */
export const aircraftRegistry = [
  { id: 'a320ceo', manufacturer: 'Airbus', name: 'A320ceo', fullName: 'Airbus A320ceo', family: 'A320 Family', status: 'available', dataModule: './a320ceo.js' },
  { id: 'a320neo', manufacturer: 'Airbus', name: 'A320neo', fullName: 'Airbus A320neo', family: 'A320 Family', status: 'planned' },
  { id: 'a321ceo', manufacturer: 'Airbus', name: 'A321ceo', fullName: 'Airbus A321ceo', family: 'A320 Family', status: 'planned' },
  { id: 'a321neo', manufacturer: 'Airbus', name: 'A321neo', fullName: 'Airbus A321neo', family: 'A320 Family', status: 'planned' },
  { id: 'a330', manufacturer: 'Airbus', name: 'A330', fullName: 'Airbus A330', family: 'Widebody', status: 'planned' },
  { id: 'a350', manufacturer: 'Airbus', name: 'A350', fullName: 'Airbus A350', family: 'Widebody', status: 'planned' },
  { id: 'a380', manufacturer: 'Airbus', name: 'A380', fullName: 'Airbus A380', family: 'Widebody', status: 'planned' },
  { id: 'b737', manufacturer: 'Boeing', name: '737-800', fullName: 'Boeing 737-800', family: '737 Family', status: 'planned' },
  { id: 'b737max', manufacturer: 'Boeing', name: '737 MAX', fullName: 'Boeing 737 MAX', family: '737 Family', status: 'planned' },
  { id: 'b747', manufacturer: 'Boeing', name: '747-400', fullName: 'Boeing 747-400', family: '747 Family', status: 'planned' },
  { id: 'b777', manufacturer: 'Boeing', name: '777', fullName: 'Boeing 777', family: 'Widebody', status: 'planned' },
  { id: 'b787', manufacturer: 'Boeing', name: '787 Dreamliner', fullName: 'Boeing 787 Dreamliner', family: 'Widebody', status: 'planned' }
];
