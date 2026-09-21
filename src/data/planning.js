// Planning du jeudi 17 septembre (départ de Montarnaud en début d'après-midi)
// au vendredi 2 octobre 2026 (retour à Montarnaud dans la soirée).
// Étapes routières limitées à 3-4 h avec balade chien chaque jour. Réorganisable dans l'app.
// Chaque jour : date ISO, base, lieux prévus (ids), plan B météo, note logistique.
// drive : { km, min, label } — estimation de la route du jour (camping-car, pauses non comprises).
//
// ─── Révision du 21/09 (soir, au Passo Lavazè) ───
// Retard réel de 1 jour : Latemar + Torre di Pisa (20/09) et Passo Sella + Marmolada (21/09)
// non faits. Planning reconstruit sur les 8 jours restants (22 → 29/09) en coupant le superflu :
//   ✗ Torre di Pisa — cabinovia Predazzo-Gardonè et télésiège Passo Feudo fermés depuis le 20/09.
//     À pied c'est 1 000 m D+ / 5-6 h : hors format. Abandonné.
//   ✗ Lagazuoi — 2 × téléphérique payant, et la descente par les tunnels de la Grande Guerre
//     (échelles, câbles, frontale) est infaisable avec le chien. Cinque Torri couvre le même
//     thème 14-18 en boucle facile. Abandonné.
//   ✗ Armentara + Santa Croce (journée Alta Badia) — prairies redondantes avec l'Alpe di Siusi.
//     Santa Croce reste possible en arrêt express sur la liaison J11. Journée supprimée.
//   ✗ Vallunga en journée dédiée — rétrogradé en plan B de la Val Gardena.
// Ce qui est sauvé : le Latemar, le Sella/Pordoi, la Marmolada, et surtout Seceda, l'Alpe di Siusi,
// les Odle, Cinque Torri, Federa et les Tre Cime — sans jamais dépasser ~2 h de route par jour.
export const DEFAULT_PLAN = [
  { date: '2026-09-17', title: 'Étape 1 — Lac du Bourget', base: '', spots: [], planB: null, drive: { km: 330, min: 210, label: 'Montarnaud → Aix-les-Bains' }, note: 'Départ de Montarnaud en début d’après-midi. ~3h30 de route (A9 → A7 → A48/A43) jusqu’à Aix-les-Bains. Balade du soir avec le chien au bord du lac du Bourget (esplanade et Petit Port très agréables). Nuit : aire camping-car d’Aix-les-Bains.' },
  { date: '2026-09-18', title: 'Étape 2 — Chamonix, puis bascule en Suisse vers Aoste', base: '', spots: [], planB: null, drive: { km: 220, min: 250, label: 'Aix-les-Bains → Chamonix → Aoste (Forclaz, Grand-Saint-Bernard)' }, note: '~1h45 depuis Aix-les-Bains jusqu’à Chamonix par Annecy et la vallée de l’Arve. Journée à Chamonix : vallée agréable (18°C en milieu de journée), vue sur le glacier des Bossons et l’Aiguille du Midi, balade avec le chien au Lac des Gaillands. La fraîcheur du matin (neige résiduelle relevée en début de journée) reste possible en altitude : se renseigner sur place avant de monter au Plan de l’Aiguille. Pour rejoindre l’Italie sans payer le tunnel du Mont-Blanc (80-130 € en camping-car !), bascule en fin d’après-midi par la Suisse : Col de la Forclaz (gratuit) jusqu’à Martigny, puis Col du Grand-Saint-Bernard (2469 m, gratuit, confirmé ouvert) jusqu’à Aoste — pas de vignette suisse nécessaire en restant hors autoroute. En repli si le col est fermé par la neige : son tunnel juste en dessous, ~48,50 € l’aller en camping-car, bien moins cher que le Mont-Blanc. Nuit : aire camping-car d’Aoste.' },
  { date: '2026-09-19', title: 'Étape 3 — Lac de Côme', base: '', spots: [], planB: null, drive: { km: 175, min: 135, label: 'Aoste → Côme (Ivrea, Novare)' }, note: 'Descente tranquille depuis Aoste par Ivrea et Novare (~2h15) pour rejoindre le Lac de Côme en début d’après-midi. Reste de la journée et soirée au bord du lac : promenade avec le chien sur les rives de Côme ou d’Argegno, gelato obligatoire. Nuit : aire camping-car de Côme ou d’Argegno.' },
  { date: '2026-09-20', title: 'Étape 4 — Arrivée aux Dolomites (pause rando à mi-chemin)', base: 'fassa', spots: ['lago-di-carezza'], planB: 'lago-di-carezza', drive: { km: 310, min: 230, label: 'Côme → Val d’Ega, via Rovereto (rando Lago di Cei)' }, note: '✅ Fait. ~3h50 de route (Lecco/Bergame → Brescia → Vérone → Rovereto → A22 → Val d’Ega), coupée par la boucle du Lago di Cei à mi-chemin et le plein de gasoil à Rovereto. ❌ Non fait : le Labirinto del Latemar et la Torre di Pisa — reportés. Le Latemar est récupéré en J6 ; la Torre di Pisa est abandonnée (remontées de Predazzo fermées depuis ce jour).' },
  { date: '2026-09-21', title: 'Étape 5 — Repli au Passo Lavazè', base: 'fassa', spots: [], planB: null, drive: { km: 35, min: 55, label: 'Val d’Ega → Passo Lavazè' }, note: '❌ Journée blanche côté objectifs : ni Passo Sella, ni Marmolada. Nuit imprévue au Passo Lavazè (1 808 m, entre Val d’Ega et Val di Fiemme). Les deux cols sont récupérés en J7 — la funivia du Sass Pordoi tourne jusqu’au 18 octobre, donc rien n’est perdu. Nuit froide en altitude : gaz plein.' },
  { date: '2026-09-22', title: 'J6 — Ravitaillement, muscu, et le Latemar enfin', base: 'fassa', spots: ['latemar'], planB: 'lago-di-carezza', drive: { km: 80, min: 110, label: 'Lavazè → Ville di Fiemme → Passo Costalunga → Canazei' }, note: 'Lever tôt, descente du Lavazè sur la Val di Fiemme (20-25 min). MATIN — tout est sur le même parking, Via Nazionale à Carano / Ville di Fiemme, juste avant Cavalese : Spartans Gym au n°20 (powerlifting / bodybuilding / calisthenics, lun-ven 7h-22h, ☎ +39 377 0947635 — appeler à 8h pour l’ingresso giornaliero, aucun tarif publié), Eurospin au n°20 (9h-13h30 / 15h30-19h) et la Coop Centro Alimentare au n°18 (ouvre 7h30). Grand parking en bord de nationale, facile en van. Repli muscu sur la route : palestra de la piscine communale de Predazzo (Via Venezia 52, équipement public donc entrée unitaire plus probable) ou Gymnasium Moena (400 m² Technogym). APRÈS-MIDI — montée par Predazzo, Moena et Vigo di Fassa jusqu’au Passo Costalunga (~45 min, aucun retour en arrière) : boucle du Labirinto del Latemar, ~3 h avec le chien. Sentier 17 (ça grimpe), puis 18A vers les Prati del Latemar, sentier 20 et le chaos de blocs, retour par le 21 plat en forêt. La 2e moitié du labyrinthe demande les mains : si le chien bloque, basculer sur le 21 et rentrer tranquille. Pas d’eau dans la pierraille — prévoir la gourde du chien. Nuit : aire de Canazei.' },
  { date: '2026-09-23', title: 'J7 — Rattrapage : Sella, Pordoi et la Marmolada', base: 'fassa', spots: ['passo-sella', 'sassolungo', 'lago-fedaia'], planB: 'lago-fedaia', drive: { km: 60, min: 95, label: 'Canazei → Pordoi → Sella → Fedaia' }, note: 'La journée qui répare hier. 8h30 : montée au Passo Pordoi (20 min). Funivia du Sass Pordoi à la première benne — elle ouvre à 9h00 (et pas 8h30), en service jusqu’au 18 octobre. En haut : plateau lunaire à 2 950 m, Piz Boè en 2h30 A/R si le chien est en forme (caillasse, pas d’ombre, eau obligatoire). Redescente en fin de matinée, puis Passo Sella par Canazei (35 min) : la vue Sassolungo + Sella, courte balade à la Città dei Sassi. Fin d’après-midi : bascule sur Alba puis le Passo Fedaia (40 min), arrivée au barrage face au glacier de la Marmolada pour la lumière du soir. Nuit : barrage du Lago Fedaia (2 057 m) — vent et 0-4°C possibles, sinon repli sur Canazei.' },
  { date: '2026-09-24', title: 'J8 — Seceda, le graal', base: 'val-gardena', spots: ['seceda'], planB: 'vallunga', drive: { km: 45, min: 75, label: 'Fedaia → Passo Sella → Ortisei → Pontives' }, note: 'LE jour à caler sur la meilleure météo de la fenêtre — à échanger sans hésiter avec J9 si le ciel est meilleur vendredi. Départ tôt du Fedaia, remontée par Canazei et le Passo Sella jusqu’à Ortisei (~1h15). Cabinovia Ortisei-Furnes puis funivia Furnes-Seceda (en service jusqu’au 2 novembre, aucun risque de fermeture). Crêtes de Seceda face aux Odle, puis descente par Cisles et Col Raiser. Nuit : Camperpark Pontives (zone artisanale Pontives, entre Ortisei et Laion) — et bonne nouvelle pour la muscu, le Move Fitnesscenter est sur la même zone (Pontives 15, TECA / Technogym / Matrix / Life Fitness, 6h-23h, ☎ +39 351 661 5789, demander le tarif journalier). Plan B météo : Vallunga depuis Selva, vallée plate, paradis du chien.' },
  { date: '2026-09-25', title: 'J9 — L’Alpe di Siusi et la nuit confort', base: 'siusi', spots: ['alpe-di-siusi', 'sciliar'], planB: 'alpe-di-siusi', drive: { km: 30, min: 45, label: 'Pontives → Siusi (cabinovia) → Völs' }, note: '⚠️ Piège 2026 : la route Siusi → Compatsch est interdite 9h-17h, et les parkings P1 Spitzbühl / P2 Compatsch exigent désormais une réservation en ligne jusqu’à 6 jours à l’avance (30 €/jour au P2). On ne monte donc PAS en van : 25 min jusqu’à Siusi, on laisse le van en bas (le stationnement de nuit est toléré au pied de la cabinovia) et on monte en cabinovia (saison jusqu’au 1er novembre). En haut : boucles de l’Alpe di Siusi, le plus grand alpage d’Europe, face au Sciliar. Version costaud si les jambes suivent : Monte Pez – Rifugio Bolzano. Redescente en milieu d’après-midi, 10 min jusqu’au Camping Seiser Alm de Völs (ouvert jusqu’au 1er novembre) : spa, laverie, douches — le grand nettoyage de mi-parcours, et la seule vraie nuit confort du voyage. Réserver dans la journée.' },
  { date: '2026-09-26', title: 'J10 — Les Odle par le haut', base: 'funes', spots: ['adolf-munkel', 'santa-maddalena'], planB: 'santa-maddalena', drive: { km: 50, min: 65, label: 'Völs → Val di Funes (Zans)' }, note: 'Liaison courte par Ponte Gardena et Chiusa (~1h05) jusqu’au fond de la Val di Funes, parking de Zans. Adolf Munkel Weg au pied de la paroi des Odle, arrêt à la Geisler Alm (strudel obligatoire). Fin de journée : golden hour sur l’église de Santa Maddalena depuis le belvédère — la carte postale, déjà vue mais imbattable. Nuit : aire de San Pietro (petite, ~15 places, arriver avant 17h).' },
  { date: '2026-09-27', title: 'J11 — Grande traversée + Cinque Torri', base: 'cortina', spots: ['cinque-torri'], planB: 'santa-croce', drive: { km: 85, min: 130, label: 'Funes → Passo delle Erbe → Val Badia → Passo Valparola → Falzarego' }, note: 'La plus longue liaison de la semaine (~2h10) — départ 8h. Itinéraire panoramique : Passo delle Erbe (Würzjoch, route étroite mais roulante en van), descente sur Longega, remontée de la Val Badia jusqu’à La Villa, puis Passo Valparola et Passo Falzarego. Option en route si on est en avance : Santa Croce / La Crusc depuis Badia (sanctuaire sous 900 m de paroi) — c’est le seul reste de la journée Alta Badia supprimée. Repli plus roulant si la route du Passo delle Erbe inquiète : Bressanone → Brunico → Val Badia, ~20 km de plus, même durée. APRÈS-MIDI : boucle des Cinque Torri (facile, chien OK, musée à ciel ouvert de la Grande Guerre — tranchées et postes reconstitués), coucher de soleil sous l’Averau. Nuit : Passo Falzarego ou Valparola, 2 100 m, très venté — lever de soleil sur les Tofane en prime.' },
  { date: '2026-09-28', title: 'J12 — Federa, l’or des mélèzes', base: 'cortina', spots: ['lago-federa'], planB: 'cinque-torri', drive: { km: 20, min: 30, label: 'Falzarego → Ru Curto → Cortina' }, note: 'Descente du Falzarego jusqu’au départ de Ru Curto (SS48). Montée ~1h30 jusqu’au Lago Federa sous la Croda da Lago, pique-nique au bord de l’eau, ~4-5 h A/R. Fin septembre, c’est LE pic des mélèzes dorés autour du lac — la raison d’avoir gardé cette journée quand d’autres ont sauté. Nuit : camping à Cortina (Rocchetta / Dolomiti) — ⚠️ appeler dans la journée, beaucoup de campings de Cortina ferment fin septembre.' },
  { date: '2026-09-29', title: 'J13 — Tre Cime, le final', base: 'misurina', spots: ['tre-cime', 'cadini'], planB: 'monte-piana', drive: { km: 35, min: 60, label: 'Cortina → Auronzo → Misurina' }, note: 'Départ 6h30 de Cortina (1 h de route + péage de la route d’Auronzo, cher en camping-car — monter tôt évite aussi la file). Tour des Tre Cime le matin (boucle complète ~10 km, chien facile), déjeuner au Rifugio Locatelli. Après-midi : belvédère des Cadini di Misurina, et coucher de soleil sur les flèches si les jambes suivent. Nuit : aire de Misurina, réveil sur le lac. Dernière nuit dans les Dolomites.' },
  { date: '2026-09-30', title: 'J14 — Retour 1 : adieux et Lac de Garde', base: '', spots: ['lago-misurina'], planB: null, drive: { km: 280, min: 225, label: 'Misurina → Riva del Garda' }, note: 'Tour du lac de Misurina au réveil avec le chien, puis ~3h45 de route vers Riva del Garda. Balade du soir sur les rives du Garde, Malcesine en face — souvenirs. Nuit : aire d’Arco ou Riva.' },
  { date: '2026-10-01', title: 'J15 — Retour 2 : Briançon', base: '', spots: [], planB: null, drive: { km: 380, min: 255, label: 'Riva → Briançon (Montgenèvre)' }, note: '~4h15 de route : Milan, Turin, montée au col de Montgenèvre. Pause balade aux lacs d’Avigliana en route. Soirée dans la vieille ville Vauban de Briançon ou le long de la Durance. Nuit : aire de Briançon.' },
  { date: '2026-10-02', title: 'J16 — Retour 3 : Montarnaud', base: '', spots: [], planB: null, drive: { km: 330, min: 225, label: 'Briançon → Montarnaud (Gap, Sisteron)' }, note: 'Dernière étape tranquille : ~3h45 par Gap et Sisteron (pause déjeuner + balade au pied de la citadelle). Arrivée à Montarnaud en fin d’après-midi ou début de soirée. Fin du voyage 🏔️🐶' },
]

// ─── Itinéraire pour la carte : nuits numérotées + tracé approximatif ───
export const NIGHT_STOPS = [
  { days: 'Départ', label: 'Montarnaud', coords: [43.649, 3.699], kind: 'home' },
  { days: 'J1', label: 'Aix-les-Bains · lac du Bourget', coords: [45.694, 5.889], kind: 'road' },
  { days: 'J2', label: 'Chamonix (jour) → Aoste (nuit, via Suisse)', coords: [45.737, 7.315], kind: 'road' },
  { days: 'J3', label: 'Lac de Côme', coords: [45.808, 9.085], kind: 'road' },
  { days: 'J4', label: 'Obereggen / Val d’Ega', coords: [46.371, 11.522], kind: 'mtn' },
  { days: 'J5', label: 'Passo Lavazè', coords: [46.358, 11.475], kind: 'mtn' },
  { days: 'J6', label: 'Canazei (Val di Fassa)', coords: [46.479, 11.766], kind: 'mtn' },
  { days: 'J7', label: 'Lago Fedaia (Marmolada)', coords: [46.457, 11.863], kind: 'mtn' },
  { days: 'J8', label: 'Camperpark Pontives (Val Gardena)', coords: [46.594, 11.629], kind: 'mtn' },
  { days: 'J9', label: 'Völs am Schlern (Camping Seiser Alm)', coords: [46.519, 11.512], kind: 'mtn' },
  { days: 'J10', label: 'Val di Funes (San Pietro)', coords: [46.637, 11.681], kind: 'mtn' },
  { days: 'J11', label: 'Passo Falzarego / Valparola', coords: [46.519, 12.008], kind: 'mtn' },
  { days: 'J12', label: 'Cortina d’Ampezzo', coords: [46.523, 12.128], kind: 'mtn' },
  { days: 'J13', label: 'Misurina', coords: [46.582, 12.254], kind: 'mtn' },
  { days: 'J14', label: 'Riva del Garda', coords: [45.885, 10.841], kind: 'road' },
  { days: 'J15', label: 'Briançon', coords: [44.9, 6.643], kind: 'road' },
  { days: 'J16', label: 'Montarnaud — retour', coords: [43.649, 3.699], kind: 'home' },
]

export const ROUTE_PATH = [
  // Aller : Montarnaud → Aix-les-Bains → Chamonix → Suisse → Aoste → Côme → Rovereto → Val d’Ega
  [43.649, 3.699], [43.61, 3.87], [43.83, 4.36], [44.14, 4.81], [44.93, 4.89], [45.19, 5.72], [45.56, 5.92], [45.694, 5.889],
  [45.83, 6.15], [45.9, 6.5], [45.9237, 6.8694], [46.021, 6.949], [46.0967, 7.0729], [45.9436, 7.2078], [45.8694, 7.1706], [45.737, 7.315], [45.468, 7.874],
  [45.55, 8.6], [45.75, 9.0], [45.808, 9.085],
  [45.54, 10.22], [45.44, 10.99], [46.07, 11.12], [46.49, 11.35], [46.371, 11.522],
  // J5 : repli au Passo Lavazè
  [46.358, 11.475],
  // J6 : Ville di Fiemme (ravito + muscu) → Predazzo → Moena → Passo Costalunga (Latemar) → Canazei
  [46.287, 11.434], [46.29, 11.461], [46.312, 11.599], [46.378, 11.661], [46.419, 11.669], [46.403, 11.597], [46.419, 11.669], [46.479, 11.766],
  // J7 : Pordoi → Sella → Fedaia
  [46.488, 11.813], [46.479, 11.766], [46.512, 11.762], [46.479, 11.766], [46.457, 11.863],
  // J8 : retour Sella → Ortisei (Seceda) → Pontives
  [46.479, 11.766], [46.512, 11.762], [46.576, 11.672], [46.594, 11.629],
  // J9 : Siusi → Alpe di Siusi → Völs
  [46.542, 11.556], [46.519, 11.512],
  // J10 : Val di Funes
  [46.6, 11.53], [46.637, 11.681],
  // J11 : Passo delle Erbe → Val Badia → Passo Valparola → Falzarego
  [46.657, 11.789], [46.717, 11.914], [46.6, 11.9], [46.583, 11.9], [46.526, 12.007], [46.519, 12.008],
  // J12-J13 : Federa, Cortina, Tre Cime, Misurina
  [46.513, 12.082], [46.523, 12.128], [46.558, 12.198], [46.582, 12.254],
  // Retour : Misurina → Riva del Garda → Briançon → Montarnaud
  [46.62, 12.21], [46.735, 12.221], [46.715, 11.657], [46.49, 11.35], [46.07, 11.12], [45.89, 11.04], [45.885, 10.841],
  [45.54, 10.22], [45.46, 9.19], [45.07, 7.68], [45.06, 7.39], [45.03, 6.83], [44.932, 6.726], [44.9, 6.643],
  [44.559, 6.079], [44.19, 5.94], [43.95, 4.85], [43.83, 4.36], [43.61, 3.87], [43.649, 3.699],
]

export const TRIP_START = '2026-09-17'
export const TRIP_END = '2026-10-02'
