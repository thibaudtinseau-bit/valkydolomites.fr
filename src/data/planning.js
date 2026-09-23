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
//
// ─── Révision du 23/09 (depuis Moena) ───
// J7 : la funivia du Sass Pordoi est écartée (muselière obligatoire en cabine, et le plateau
// sommital n'est pas un terrain confortable pour le chien). Après avoir envisagé la Val San Nicolò
// puis la Val Venegia, la contrainte de route a été assouplie à 1 h et le choix s'est porté sur le
// Viel dal Pan (sentier 601), au départ du Passo Pordoi : un balcon à ~2 400 m face à la Marmolada.
// L'objectif manqué le 21/09 est donc récupéré, à pied. Val Venegia écartée pour son risque patous
// (3/5 sur sa fiche), Val San Nicolò pour sa longue approche, la route de la vallée étant fermée.
//
// ─── Révision du 23/09 (après-midi) — RÈGLE ZÉRO REMONTÉE ───
// Plus aucune journée du planning ne dépend d'un téléphérique, d'une cabinovia ou d'un télésiège.
// Ce qui a changé :
//   J8  Seceda ✗ abandonné (2 remontées enchaînées, ou 1 280 m de D+ à pied) → Col Rodella par le
//       sentier 557 + balcon Friedrich August sous le Sassolungo, ~10-11 km / +450 m. Récupère au
//       passage le Passo Sella manqué le 21/09. C'est la seule vraie perte du voyage.
//   J9  Alpe di Siusi : la cabinovia de Siusi est remplacée par la montée en van avant 9h, la route
//       étant ouverte aux véhicules privés avant 9h et après 17h. Parking P2 Compatsch à réserver
//       en ligne (obligatoire depuis 2026, 30 €/jour).
//   J11 Cinque Torri : le télésiège de Bai de Dones est ignoré, montée par le sentier 425 (+336 m).
// Déjà sans remontée : J6 Latemar, J7 Viel dal Pan, J10 Adolf Munkel, J12 Federa, J13 Tre Cime
// (route à péage d'Auronzo, pas de benne).
// Ce qui est sauvé : le Latemar, le Sella/Pordoi, la Marmolada, et surtout Seceda, l'Alpe di Siusi,
// les Odle, Cinque Torri, Federa et les Tre Cime — sans jamais dépasser ~2 h de route par jour.
export const DEFAULT_PLAN = [
  { date: '2026-09-17', title: 'Étape 1 — Lac du Bourget', base: '', spots: [], planB: null, drive: { km: 330, min: 210, label: 'Montarnaud → Aix-les-Bains' }, note: 'Départ de Montarnaud en début d’après-midi. ~3h30 de route (A9 → A7 → A48/A43) jusqu’à Aix-les-Bains. Balade du soir avec le chien au bord du lac du Bourget (esplanade et Petit Port très agréables). Nuit : aire camping-car d’Aix-les-Bains.' },
  { date: '2026-09-18', title: 'Étape 2 — Chamonix, puis bascule en Suisse vers Aoste', base: '', spots: [], planB: null, drive: { km: 220, min: 250, label: 'Aix-les-Bains → Chamonix → Aoste (Forclaz, Grand-Saint-Bernard)' }, note: '~1h45 depuis Aix-les-Bains jusqu’à Chamonix par Annecy et la vallée de l’Arve. Journée à Chamonix : vallée agréable (18°C en milieu de journée), vue sur le glacier des Bossons et l’Aiguille du Midi, balade avec le chien au Lac des Gaillands. La fraîcheur du matin (neige résiduelle relevée en début de journée) reste possible en altitude : se renseigner sur place avant de monter au Plan de l’Aiguille. Pour rejoindre l’Italie sans payer le tunnel du Mont-Blanc (80-130 € en camping-car !), bascule en fin d’après-midi par la Suisse : Col de la Forclaz (gratuit) jusqu’à Martigny, puis Col du Grand-Saint-Bernard (2469 m, gratuit, confirmé ouvert) jusqu’à Aoste — pas de vignette suisse nécessaire en restant hors autoroute. En repli si le col est fermé par la neige : son tunnel juste en dessous, ~48,50 € l’aller en camping-car, bien moins cher que le Mont-Blanc. Nuit : aire camping-car d’Aoste.' },
  { date: '2026-09-19', title: 'Étape 3 — Lac de Côme', base: '', spots: [], planB: null, drive: { km: 175, min: 135, label: 'Aoste → Côme (Ivrea, Novare)' }, note: 'Descente tranquille depuis Aoste par Ivrea et Novare (~2h15) pour rejoindre le Lac de Côme en début d’après-midi. Reste de la journée et soirée au bord du lac : promenade avec le chien sur les rives de Côme ou d’Argegno, gelato obligatoire. Nuit : aire camping-car de Côme ou d’Argegno.' },
  { date: '2026-09-20', title: 'Étape 4 — Arrivée aux Dolomites (pause rando à mi-chemin)', base: 'fassa', spots: ['lago-di-carezza'], planB: 'lago-di-carezza', drive: { km: 310, min: 230, label: 'Côme → Val d’Ega, via Rovereto (rando Lago di Cei)' }, note: '✅ Fait. ~3h50 de route (Lecco/Bergame → Brescia → Vérone → Rovereto → A22 → Val d’Ega), coupée par la boucle du Lago di Cei à mi-chemin et le plein de gasoil à Rovereto. ❌ Non fait : le Labirinto del Latemar et la Torre di Pisa — reportés. Le Latemar est récupéré en J6 ; la Torre di Pisa est abandonnée (remontées de Predazzo fermées depuis ce jour).' },
  { date: '2026-09-21', title: 'Étape 5 — Repli au Passo Lavazè', base: 'fassa', spots: [], planB: null, drive: { km: 35, min: 55, label: 'Val d’Ega → Passo Lavazè' }, note: '❌ Journée blanche côté objectifs : ni Passo Sella, ni Marmolada. Nuit imprévue au Passo Lavazè (1 808 m, entre Val d’Ega et Val di Fiemme). Les deux sont récupérés à pied, sans aucune remontée : la Marmolada en J7 par le Viel dal Pan, un balcon à 2 400 m qui lui fait face sur toute sa longueur, et le Passo Sella en J8 par le Col Rodella. Rien de perdu. Nuit froide en altitude : gaz plein.' },
  { date: '2026-09-22', title: 'J6 — Ravitaillement, muscu, et le Latemar enfin', base: 'fassa', spots: ['latemar'], planB: 'lago-di-carezza', drive: { km: 80, min: 110, label: 'Lavazè → Ville di Fiemme → Passo Costalunga → Canazei' }, note: 'Lever tôt, descente du Lavazè sur la Val di Fiemme (20-25 min). MATIN — tout est sur le même parking, Via Nazionale à Carano / Ville di Fiemme, juste avant Cavalese : Spartans Gym au n°20 (powerlifting / bodybuilding / calisthenics, lun-ven 7h-22h, ☎ +39 377 0947635 — appeler à 8h pour l’ingresso giornaliero, aucun tarif publié), Eurospin au n°20 (9h-13h30 / 15h30-19h) et la Coop Centro Alimentare au n°18 (ouvre 7h30). Grand parking en bord de nationale, facile en van. Repli muscu sur la route : palestra de la piscine communale de Predazzo (Via Venezia 52, équipement public donc entrée unitaire plus probable) ou Gymnasium Moena (400 m² Technogym). APRÈS-MIDI — montée par Predazzo, Moena et Vigo di Fassa jusqu’au Passo Costalunga (~45 min, aucun retour en arrière) : boucle du Labirinto del Latemar, ~3 h avec le chien. Sentier 17 (ça grimpe), puis 18A vers les Prati del Latemar, sentier 20 et le chaos de blocs, retour par le 21 plat en forêt. La 2e moitié du labyrinthe demande les mains : si le chien bloque, basculer sur le 21 et rentrer tranquille. Pas d’eau dans la pierraille — prévoir la gourde du chien. Nuit : aire de Canazei.' },
  { date: '2026-09-23', title: 'J7 — Viel dal Pan : la Marmolada en face, à pied', base: 'fassa', spots: ['lago-fedaia'], planB: 'lago-fedaia', drive: { km: 55, min: 90, label: 'Moena → Passo Pordoi (45 min) → rando → Passo Fedaia par Canazei (45 min)' }, note: '🔄 Arbitré le 23/09 depuis Moena, contrainte assouplie à 1 h de route : on prend le Viel dal Pan. Il bat la Val San Nicolò et la Val Venegia sur tous les critères sauf la distance de route. MATIN — Moena → Canazei → Passo Pordoi, ~30 km et 40-45 min (28 lacets depuis Canazei, prendre son temps en van). Grand parking gratuit au col (2 239 m). RANDO — sentier 601, le « Viel dal Pan », le chemin du pain des marchands d’autrefois : boucle par le Rifugio Fredarola (2 370 m) puis le Rifugio Viel dal Pan (2 432 m). 9,2 km, +513 m, 3h30-4h. Sentier-balcon large et roulant qui tient l’altitude autour de 2 400 m : aucune remontée, aucun câble, aucun passage exposé, demi-tour possible partout. 🏔️ Il fait face à la Marmolada et au Lago Fedaia sur TOUTE sa longueur — c’est la façon de récupérer la Marmolada manquée le 21/09, et la vue est meilleure que depuis la benne du Sass Pordoi qu’on a écartée. 🐶 À 2 400 m fin septembre les troupeaux sont redescendus : risque patous quasi nul, contrairement aux vallées d’alpage (Val Venegia est notée 3/5 sur ce point). Revers de la médaille : aucune ombre, aucune eau sur la crête, et ça souffle — gourde du chien et coupe-vent obligatoires. ⏰ VERSION COURTE si départ tardif : aller-retour direct au Rifugio Viel dal Pan sans passer par Fredarola, ~6 km et +200 m, 2 h. Coucher de soleil vers 19h15. SOIR — Passo Pordoi → Fedaia : redescendre par Canazei puis Alba (~25 km, 45 min). ⚠️ Ne PAS passer par Arabba, ce versant fait le tour par Caprile et coûte 15 min de plus. Nuit au barrage du Fedaia, face au glacier. 🗺️ Route : https://www.google.com/maps/dir/?api=1&origin=Moena&destination=Passo+Pordoi&travelmode=driving — Rando : https://www.google.com/maps/dir/?api=1&origin=Passo+Pordoi&destination=Rifugio+Viel+dal+Pan&waypoints=Rifugio+Fredarola&travelmode=walking — AllTrails : https://www.alltrails.com/trail/italy/veneto/passo-pordoi-rifugio-viel-dal-pan-rifugio-fredarola — Descente sur Fedaia : https://www.google.com/maps/dir/?api=1&origin=Passo+Pordoi&destination=Lago+di+Fedaia&waypoints=Canazei%7CAlba+di+Canazei&travelmode=driving' },
  { date: '2026-09-24', title: 'J8 — Col Rodella et le balcon du Sassolungo', base: 'val-gardena', spots: ['passo-sella', 'sassolungo'], planB: 'vallunga', drive: { km: 45, min: 75, label: 'Fedaia → Canazei → Passo Sella → Ortisei → Pontives' }, note: '❌ SECEDA EST ABANDONNÉ. Le sommet ne se gagne que par deux remontées enchaînées (cabinovia Ortisei-Furnes + funivia Furnes-Seceda), avec muselière obligatoire en cabine. À pied depuis Ortisei c’est 1 280 m de D+ : hors format. C’est la seule vraie perte du voyage — les Odle restent couvertes par l’Adolf Munkel en J10, vues de l’autre côté. À LA PLACE, et ça récupère le Passo Sella manqué le 21/09 : départ tôt du Fedaia, remontée par Canazei jusqu’au Passo Sella (~45 min), grand parking gratuit au col (2 240 m). RANDO — 1) Col Rodella par le sentier 557 qui part derrière l’Hotel Passo Sella : 2 km, +300 m, ~1 h, les 700 derniers mètres sont raides. En haut (2 484 m), un des trois plus beaux panoramas des Dolomites : le Sella, le Sassolungo à portée de main, la Marmolada et le Catinaccio. C’est le belvédère que tout le monde atteint par la funivia de Campitello — nous on y monte à pied. 2) Redescente sur le sentier Friedrich August (le « Federico Augusto », tracé en 1911) : un balcon quasi horizontal au pied de la paroi sud du Sassolungo, Rifugio Friedrich August (2 293 m) puis Rifugio Pertini (2 300 m), demi-tour là et retour par le même balcon. Total ~10-11 km, +450 m, 3h30-4h. 🐶 Sentier large, aucun câble, aucun vide, refuges pour l’eau. APRÈS-MIDI — descente sur la Val Gardena (~30 min). Si les jambes suivent, crochet à pied dans la Vallunga depuis Selva, vallée plate. Nuit : Camperpark Pontives — et le Move Fitnesscenter est sur la même zone artisanale.' },
  { date: '2026-09-25', title: 'J9 — L’Alpe di Siusi en van, avant 9h', base: 'siusi', spots: ['alpe-di-siusi', 'sciliar'], planB: 'alpe-di-siusi', drive: { km: 35, min: 50, label: 'Pontives → Siusi → Compatsch (avant 9h) → Völs le soir' }, note: '❌ Pas de cabinovia non plus. La route Siusi → Compatsch est interdite 9h-17h, MAIS elle est ouverte aux véhicules privés AVANT 9h et APRÈS 17h : c’est la faille, et elle supprime la benne. 📋 À FAIRE LA VEILLE — réserver en ligne le parking P2 Compatsch sur seiseralm.it/parking : la réservation est obligatoire depuis 2026, ouverte jusqu’à 6 jours à l’avance, 30 €/jour (soit le prix d’un aller-retour en cabinovia, donc rien de perdu). Vérifier au passage que le van passe en tarif « véhicule » et pas en tarif autocar (160 €) — sous 7,5 m ça ne devrait pas poser de problème. ⏰ Réveil 7h à Pontives, 40 min de route, passage du contrôle de St. Valentin AVANT 9h — si les deux parkings sont pleins avant 9h la route est fermée et c’est fini pour la journée, donc ne pas traîner. Une fois en haut on est bloqué jusqu’à 17h : c’est fait pour, on a la journée entière. RANDO — boucles de l’Alpe di Siusi depuis Compatsch, le plus grand alpage d’Europe, face au Sciliar. Version costaud si la forme est là : Monte Pez – Rifugio Bolzano. 🐶 Alpage ouvert, pistes larges, mais troupeaux : laisse. SOIR — redescente après 17h, 10 min jusqu’au Camping Seiser Alm de Völs (ouvert jusqu’au 1er novembre) : spa, laverie, douches, la seule vraie nuit confort du voyage. Réserver dans la journée.' },
  { date: '2026-09-26', title: 'J10 — Les Odle par le haut', base: 'funes', spots: ['adolf-munkel', 'santa-maddalena'], planB: 'santa-maddalena', drive: { km: 50, min: 65, label: 'Völs → Val di Funes (Zans)' }, note: 'Liaison courte par Ponte Gardena et Chiusa (~1h05) jusqu’au fond de la Val di Funes, parking de Zans. Adolf Munkel Weg au pied de la paroi des Odle, arrêt à la Geisler Alm (strudel obligatoire). Fin de journée : golden hour sur l’église de Santa Maddalena depuis le belvédère — la carte postale, déjà vue mais imbattable. Nuit : aire de San Pietro (petite, ~15 places, arriver avant 17h).' },
  { date: '2026-09-27', title: 'J11 — Grande traversée + Cinque Torri', base: 'cortina', spots: ['cinque-torri'], planB: 'santa-croce', drive: { km: 85, min: 130, label: 'Funes → Passo delle Erbe → Val Badia → Passo Valparola → Falzarego' }, note: 'La plus longue liaison de la semaine (~2h10) — départ 8h. Itinéraire panoramique : Passo delle Erbe (Würzjoch, route étroite mais roulante en van), descente sur Longega, remontée de la Val Badia jusqu’à La Villa, puis Passo Valparola et Passo Falzarego. Option en route si on est en avance : Santa Croce / La Crusc depuis Badia (sanctuaire sous 900 m de paroi) — c’est le seul reste de la journée Alta Badia supprimée. Repli plus roulant si la route du Passo delle Erbe inquiète : Bressanone → Brunico → Val Badia, ~20 km de plus, même durée. APRÈS-MIDI : Cinque Torri À PIED — il existe un télésiège depuis Bai de Dones, on l’ignore. Parking de la Baita Bai de Dones (1 889 m), sentier 425 qui part le long de la piste de ski : ~3 km et +336 m jusqu’au Rifugio Scoiattoli (2 225 m), 1h30 de montée, rien de technique. Puis boucle des Cinque Torri et musée à ciel ouvert de la Grande Guerre (tranchées et postes reconstitués), retour par le même sentier. ~8-9 km et +400 m au total, chien facile, coucher de soleil sous l’Averau. Nuit : Passo Falzarego ou Valparola, 2 100 m, très venté — lever de soleil sur les Tofane en prime.' },
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
