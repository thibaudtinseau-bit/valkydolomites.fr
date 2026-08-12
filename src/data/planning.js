// Planning du jeudi 17 septembre (départ de Montarnaud en début d'après-midi)
// au vendredi 2 octobre 2026 (retour à Montarnaud dans la soirée).
// Étapes routières limitées à 3-4 h avec balade chien chaque jour. Réorganisable dans l'app.
// Chaque jour : date ISO, base, lieux prévus (ids), plan B météo, note logistique.
// drive : { km, min, label } — estimation de la route du jour (camping-car, pauses non comprises).
export const DEFAULT_PLAN = [
  { date: '2026-09-17', title: 'Étape 1 — Lac du Bourget', base: '', spots: [], planB: null, drive: { km: 330, min: 210, label: 'Montarnaud → Aix-les-Bains' }, note: 'Départ de Montarnaud en début d’après-midi. ~3h30 de route (A9 → A7 → A48/A43) jusqu’à Aix-les-Bains. Balade du soir avec le chien au bord du lac du Bourget (esplanade et Petit Port très agréables). Nuit : aire camping-car d’Aix-les-Bains.' },
  { date: '2026-09-18', title: 'Étape 2 — Turin & Lac d’Iseo', base: '', spots: [], planB: null, drive: { km: 390, min: 250, label: 'Aix-les-Bains → Iseo (Fréjus, Turin)' }, note: 'Tunnel du Fréjus puis Italie. Pause balade à mi-chemin aux lacs d’Avigliana (jolie boucle nature, chiens bienvenus) avant de filer vers le Lago d’Iseo (~4h de route au total, coupée en deux). Promenade du soir sur les rives à Iseo ou Sarnico. Nuit : aire d’Iseo.' },
  { date: '2026-09-19', title: 'Étape 3 — Arrivée aux Dolomites', base: 'fassa', spots: ['lago-di-carezza', 'latemar'], planB: 'lago-di-carezza', drive: { km: 240, min: 180, label: 'Iseo → Obereggen (Vérone, A22)' }, note: '~3h de route (Brescia → Vérone → A22 → Val d’Ega). Arrivée vers 14h : premier bol de dolomie avec le tour du Lago di Carezza (déjà connu, parfait pour dérouiller les pattes) et, si l’énergie suit, l’entrée du labyrinthe du Latemar au-dessus d’Obereggen. Nuit : Obereggen ou aire de Canazei.' },
  { date: '2026-09-20', title: 'La terrasse des Dolomites', base: 'fassa', spots: ['passo-sella', 'lago-fedaia'], planB: 'lago-fedaia', drive: { km: 45, min: 70, label: 'Obereggen → Pordoi → Fedaia' }, note: 'Sass Pordoi tôt, plateau du Sella, Piz Boè si le chien est en forme. Fin de journée : Lago Fedaia au pied de la Marmolada, nuit possible au barrage.' },
  { date: '2026-09-21', title: 'Entrée en Gardena', base: 'val-gardena', spots: ['vallunga'], planB: 'vallunga', drive: { km: 40, min: 65, label: 'Fedaia → Selva (Passo Sella)' }, note: 'Liaison vers Selva par le Passo Sella. Vallunga en après-midi tranquille — le paradis du chien. Nuit : aire de Selva ou Pontives.' },
  { date: '2026-09-22', title: 'Seceda, le graal', base: 'val-gardena', spots: ['seceda'], planB: 'vallunga', drive: { km: 8, min: 15, label: 'Selva → Ortisei' }, note: 'Téléphérique tôt depuis Ortisei, crêtes + descente Cisles–Col Raiser. LE jour à caler sur la meilleure météo de la fenêtre.' },
  { date: '2026-09-23', title: 'Grande boucle au choix', base: 'val-gardena', spots: ['puez', 'sassolungo'], planB: 'armentara', drive: { km: 12, min: 25, label: 'Selva ↔ Vallunga ou Passo Sella' }, note: 'Selon forme et météo : Rifugio Puez par la Vallunga OU tour du Sassolungo. Deux grandes randos sauvages.' },
  { date: '2026-09-24', title: 'Les Odle par le haut', base: 'funes', spots: ['adolf-munkel'], planB: 'santa-maddalena', drive: { km: 35, min: 50, label: 'Selva → Val di Funes (Zans)' }, note: 'Liaison courte vers Funes. Adolf Munkel Weg + Geisler Alm. Golden hour à Santa Maddalena en souvenir. Nuit : aire San Pietro.' },
  { date: '2026-09-25', title: 'Alpage géant', base: 'siusi', spots: ['alpe-di-siusi', 'sciliar'], planB: 'alpe-di-siusi', drive: { km: 45, min: 60, label: 'Funes → Völs → Compatsch' }, note: 'Liaison vers Völs (camping Seiser Alm), montée à Compatsch tôt. Version douce : boucles de l’Alpe di Siusi. Version costaud : Monte Pez – Rifugio Bolzano (Sciliar). Spa du camping le soir.' },
  { date: '2026-09-26', title: 'Cap sur l’Alta Badia', base: 'alta-badia', spots: ['armentara', 'santa-croce'], planB: 'armentara', drive: { km: 55, min: 80, label: 'Völs → Corvara (Passo Gardena)' }, note: 'Liaison par le Passo Gardena. Armentara le matin, montée à La Crusc pour l’embrasement du soir. Nuit : aire de Corvara.' },
  { date: '2026-09-27', title: 'Lagazuoi & la Grande Guerre', base: 'alta-badia', spots: ['lagazuoi', 'cinque-torri'], planB: 'santa-croce', drive: { km: 20, min: 35, label: 'Corvara → Passo Falzarego' }, note: 'Falzarego : Lagazuoi le matin (téléphérique), Cinque Torri l’après-midi, coucher de soleil à l’Averau. Journée dense mais modulable.' },
  { date: '2026-09-28', title: 'Federa, l’or des mélèzes', base: 'cortina', spots: ['lago-federa'], planB: 'cinque-torri', drive: { km: 25, min: 40, label: 'Falzarego → Ru Curto → Cortina' }, note: 'Montée depuis Ru Curto. Pique-nique au bord du lac sous la Croda da Lago. Nuit : camping à Cortina.' },
  { date: '2026-09-29', title: 'Tre Cime, le final', base: 'misurina', spots: ['tre-cime', 'cadini'], planB: 'monte-piana', drive: { km: 35, min: 60, label: 'Cortina → Auronzo → Misurina' }, note: 'Départ 6h30 de Cortina (1h de route), tour des Tre Cime le matin, belvédère des Cadini l’après-midi — coucher de soleil sur les flèches si les jambes suivent. Nuit : aire de Misurina, réveil sur le lac.' },
  { date: '2026-09-30', title: 'Retour 1 — Adieux & Lac de Garde', base: '', spots: ['lago-misurina'], planB: null, drive: { km: 280, min: 225, label: 'Misurina → Riva del Garda' }, note: 'Tour du lac de Misurina au réveil avec le chien, puis ~3h45 de route vers Riva del Garda. Balade du soir sur les rives du Garde, Malcesine en face — souvenirs. Nuit : aire d’Arco ou Riva.' },
  { date: '2026-10-01', title: 'Retour 2 — Briançon', base: '', spots: [], planB: null, drive: { km: 380, min: 255, label: 'Riva → Briançon (Montgenèvre)' }, note: '~4h15 de route : Milan, Turin, montée au col de Montgenèvre. Pause balade aux lacs d’Avigliana en route. Soirée dans la vieille ville Vauban de Briançon ou le long de la Durance. Nuit : aire de Briançon.' },
  { date: '2026-10-02', title: 'Retour 3 — Montarnaud', base: '', spots: [], planB: null, drive: { km: 330, min: 225, label: 'Briançon → Montarnaud (Gap, Sisteron)' }, note: 'Dernière étape tranquille : ~3h45 par Gap et Sisteron (pause déjeuner + balade au pied de la citadelle). Arrivée à Montarnaud en fin d’après-midi ou début de soirée. Fin du voyage 🏔️🐶' },
]

// ─── Itinéraire pour la carte : nuits numérotées + tracé approximatif ───
export const NIGHT_STOPS = [
  { days: 'Départ', label: 'Montarnaud', coords: [43.649, 3.699], kind: 'home' },
  { days: 'J1', label: 'Aix-les-Bains · lac du Bourget', coords: [45.694, 5.889], kind: 'road' },
  { days: 'J2', label: 'Lago d’Iseo', coords: [45.66, 10.05], kind: 'road' },
  { days: 'J3-J4', label: 'Obereggen / Canazei', coords: [46.407, 11.665], kind: 'mtn' },
  { days: 'J4', label: 'Lago Fedaia', coords: [46.457, 11.863], kind: 'mtn' },
  { days: 'J5-J7', label: 'Val Gardena (Selva / Pontives)', coords: [46.556, 11.758], kind: 'mtn' },
  { days: 'J8', label: 'Val di Funes (San Pietro)', coords: [46.637, 11.681], kind: 'mtn' },
  { days: 'J9', label: 'Völs am Schlern', coords: [46.519, 11.512], kind: 'mtn' },
  { days: 'J10', label: 'Corvara (Alta Badia)', coords: [46.55, 11.874], kind: 'mtn' },
  { days: 'J11-J12', label: 'Falzarego / Cortina', coords: [46.538, 12.137], kind: 'mtn' },
  { days: 'J13', label: 'Misurina', coords: [46.582, 12.254], kind: 'mtn' },
  { days: 'J14', label: 'Riva del Garda', coords: [45.885, 10.841], kind: 'road' },
  { days: 'J15', label: 'Briançon', coords: [44.9, 6.643], kind: 'road' },
  { days: 'J16', label: 'Montarnaud — retour', coords: [43.649, 3.699], kind: 'home' },
]

export const ROUTE_PATH = [
  [43.649, 3.699], [43.61, 3.87], [43.83, 4.36], [44.14, 4.81], [44.93, 4.89], [45.19, 5.72], [45.56, 5.92], [45.694, 5.889],
  [45.2, 6.67], [45.14, 7.05], [45.06, 7.39], [45.07, 7.68], [45.46, 9.19], [45.7, 9.67], [45.66, 10.05],
  [45.54, 10.22], [45.44, 10.99], [46.07, 11.12], [46.49, 11.35], [46.363, 11.523], [46.41, 11.575], [46.477, 11.771],
  [46.488, 11.812], [46.457, 11.863], [46.477, 11.771], [46.509, 11.756], [46.556, 11.758], [46.575, 11.672],
  [46.637, 11.681], [46.6, 11.53], [46.519, 11.512], [46.56, 11.65], [46.556, 11.758], [46.549, 11.809], [46.55, 11.874],
  [46.535, 11.99], [46.518, 12.008], [46.538, 12.137], [46.558, 12.198], [46.582, 12.254],
  [46.62, 12.21], [46.735, 12.221], [46.715, 11.657], [46.49, 11.35], [46.07, 11.12], [45.89, 11.04], [45.885, 10.841],
  [45.54, 10.22], [45.46, 9.19], [45.07, 7.68], [45.06, 7.39], [45.03, 6.83], [44.932, 6.726], [44.9, 6.643],
  [44.559, 6.079], [44.19, 5.94], [43.95, 4.85], [43.83, 4.36], [43.61, 3.87], [43.649, 3.699],
]

export const TRIP_START = '2026-09-17'
export const TRIP_END = '2026-10-02'
