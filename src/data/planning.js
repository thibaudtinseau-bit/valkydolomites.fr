// Planning par défaut du 17 septembre au 2 octobre 2026 (réorganisable dans l'app).
// Chaque jour : date ISO, base, lieux prévus (ids), plan B météo, note logistique.
export const DEFAULT_PLAN = [
  { date: '2026-09-17', title: 'Arrivée & mise en jambes', base: 'fassa', spots: ['lago-di-carezza', 'latemar'], planB: 'Repos + courses à Canazei', note: 'Route depuis la France. Nuit : aire de Canazei ou Obereggen. Petite balade de dérouillage possible au Lago di Carezza (déjà connu, 30 min).' },
  { date: '2026-09-18', title: 'Latemar sauvage', base: 'fassa', spots: ['latemar'], planB: 'vallunga', note: 'Labyrinthe + Torre di Pisa si grand beau, sinon boucle courte du labyrinthe. Nuit à Obereggen ou Canazei.' },
  { date: '2026-09-19', title: 'La terrasse des Dolomites', base: 'fassa', spots: ['passo-sella', 'lago-fedaia'], planB: 'lago-fedaia', note: 'Sass Pordoi tôt, plateau du Sella, Piz Boè si le chien est en forme. Fin de journée : Lago Fedaia, nuit possible au barrage.' },
  { date: '2026-09-20', title: 'Val Venegia pastorale', base: 'fassa', spots: ['val-venegia'], planB: 'passo-sella', note: 'Se renseigner aux malgas sur les troupeaux avant de monter. Baita Segantini au soleil du soir. Nuit Passo Rolle ou retour Canazei.' },
  { date: '2026-09-21', title: 'Entrée en Gardena', base: 'val-gardena', spots: ['vallunga'], planB: 'vallunga', note: 'Liaison vers Selva. Vallunga en après-midi tranquille (jour de “récupération”). Nuit : aire de Selva ou Pontives.' },
  { date: '2026-09-22', title: 'Seceda, le graal', base: 'val-gardena', spots: ['seceda'], planB: 'vallunga', note: 'Téléphérique tôt depuis Ortisei, crêtes + descente Cisles–Col Raiser. LE jour à caler sur la meilleure météo de la fenêtre.' },
  { date: '2026-09-23', title: 'Grande boucle au choix', base: 'val-gardena', spots: ['puez', 'sassolungo'], planB: 'armentara', note: 'Selon forme et météo : Rifugio Puez par la Vallunga OU tour du Sassolungo. Deux grandes randos sauvages.' },
  { date: '2026-09-24', title: 'Les Odle par le haut', base: 'funes', spots: ['adolf-munkel'], planB: 'santa-maddalena', note: 'Liaison courte vers Funes. Adolf Munkel Weg + Geisler Alm. Golden hour à Santa Maddalena en souvenir. Nuit : aire San Pietro.' },
  { date: '2026-09-25', title: 'Alpage géant', base: 'siusi', spots: ['alpe-di-siusi'], planB: 'alpe-di-siusi', note: 'Liaison vers Völs (camping Seiser Alm). Après-midi douce sur l’Alpe, repérage pour le lendemain. Spa du camping pour nous, sieste pour le chien.' },
  { date: '2026-09-26', title: 'Sciliar au sommet', base: 'siusi', spots: ['sciliar'], planB: 'alpe-di-siusi', note: 'Montée à Compatsch avant 9h. Grande boucle Monte Pez – Rifugio Bolzano. Si météo moyenne : boucles douces de l’Alpe et Völser Weiher.' },
  { date: '2026-09-27', title: 'Cap sur l’Alta Badia', base: 'alta-badia', spots: ['armentara', 'santa-croce'], planB: 'armentara', note: 'Liaison par le Passo Gardena. Armentara le matin, montée à La Crusc pour l’embrasement du soir. Nuit : aire de Corvara.' },
  { date: '2026-09-28', title: 'Lagazuoi & la Grande Guerre', base: 'alta-badia', spots: ['lagazuoi', 'cinque-torri'], planB: 'santa-croce', note: 'Falzarego : Lagazuoi le matin (téléphérique), Cinque Torri l’après-midi, coucher de soleil à l’Averau. Journée dense mais modulable.' },
  { date: '2026-09-29', title: 'Federa, l’or des mélèzes', base: 'cortina', spots: ['lago-federa'], planB: 'cinque-torri', note: 'Montée depuis Ru Curto. Pique-nique au bord du lac sous la Croda da Lago. Nuit : camping à Cortina.' },
  { date: '2026-09-30', title: 'Vers le grand nord', base: 'misurina', spots: ['monte-piana', 'lago-misurina'], planB: 'prato-piazza', note: 'Liaison Cortina → Misurina. Monte Piana l’après-midi (navette possible). Nuit : aire de Misurina, réveil sur le lac.' },
  { date: '2026-10-01', title: 'Tre Cime, le final', base: 'misurina', spots: ['tre-cime', 'cadini'], planB: 'prato-piazza', note: 'LE final : montée tôt à Auronzo, tour des Tre Cime, puis belvédère des Cadini au couchant. Nuit au parking Auronzo si autorisé.' },
  { date: '2026-10-02', title: 'Prato Piazza & route du retour', base: 'misurina', spots: ['prato-piazza'], planB: 'dobbiaco', note: 'Adieu aux Dolomites depuis le Monte Specie face aux Tre Cime, puis route. Vidange/pleins à Dobbiaco avant de partir.' },
]

export const TRIP_START = '2026-09-17'
export const TRIP_END = '2026-10-02'
