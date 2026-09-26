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
// Bindelweg, en boucle depuis le Passo Pordoi jusqu'à Porta Vescovo (13,2 km, +534 m, retour par le
// sentier 680) : un balcon à ~2 400 m face à la Marmolada, sans aucune remontée.
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
  { date: '2026-09-23', title: 'J7 — Bindelweg : boucle du Viel dal Pan à Porta Vescovo', base: 'fassa', spots: ['lago-fedaia'], planB: 'lago-fedaia', drive: { km: 55, min: 90, label: 'Moena → Passo Pordoi (45 min) → boucle → Passo Fedaia par Canazei (45 min)' }, note: '✅ Version retenue : la BOUCLE complète jusqu’à Porta Vescovo, pas l’aller-retour court. MATIN — Moena → Canazei → Passo Pordoi, ~30 km et 40-45 min (28 lacets depuis Canazei). Grand parking gratuit au col (2 239 m). LA BOUCLE — 13,2 km, +534 m, 4h30-5h, cotée facile. Départ plein sud-est derrière le Rifugio Savoia, montée sous le Sas Bece jusqu’au Rifugio Fredarola (2 370 m), puis le Bindelweg proprement dit — le « Viel dal Pan », chemin du pain des marchands — jusqu’au Rifugio Viel dal Pan (2 432 m). Ensuite traversée sous le Sas Ciapel et le Col de Pausa, courte descente puis montée raide sur la selle de Porta Vescovo (2 478 m), point haut du jour, avec Arabba en contrebas. RETOUR par le sentier 680 qui referme la boucle sur le Passo Pordoi : pas besoin de refaire le balcon à l’envers, et surtout pas besoin de la funivia d’Arabba. 🏔️ Tout le tronçon Fredarola → Porta Vescovo fait face à la Marmolada et au Lago Fedaia : l’objectif manqué le 21/09 est récupéré à pied, sur 8 km de balcon. ⚠️ NE PAS CONFONDRE avec la Via Ferrata delle Creste, qui relie les deux mêmes points mais par la crête, avec câbles — infaisable avec le chien. Le Bindelweg reste toujours EN CONTREBAS de la crête, sur un sentier large. 🚵 Attention, c’est un itinéraire très fréquenté par les VTT (tracé de la Sellaronda Hero) : chien tenu court sur les portions roulantes. 🐶 Aucun câble, aucun vide, demi-tour possible partout, et à 2 400 m fin septembre les troupeaux sont redescendus — risque patous quasi nul. Revers : zéro ombre, zéro eau sur la crête, et ça souffle. Gourde du chien et coupe-vent obligatoires. ⏰ TIMING — 4h30-5h de marche, coucher de soleil vers 19h15 : il faut être au départ vers 13h30-14h au plus tard. Si c’est trop juste, replier sur l’aller-retour Fredarola / Rifugio Viel dal Pan (9,2 km, +513 m, 3h30) ou l’aller-retour direct au refuge (6 km, +200 m, 2 h). 🆘 Échappatoire depuis Porta Vescovo : la funivia d’Arabba tourne jusqu’au 4 octobre, 8h30-16h — mais elle dépose à Arabba, à 12 km du van resté au Pordoi. Secours uniquement. SOIR — Passo Pordoi → Fedaia par Canazei puis Alba (~25 km, 45 min). Ne pas passer par Arabba, ce versant fait le tour par Caprile et coûte 15 min de plus. Nuit au barrage du Fedaia, face au glacier. 🗺️ AllTrails : https://www.alltrails.com/trail/italy/trentino/bindelweg-passo-pordoi-porta-vescovo — Route : https://www.google.com/maps/dir/?api=1&origin=Moena&destination=Passo+Pordoi&travelmode=driving — Descente sur Fedaia : https://www.google.com/maps/dir/?api=1&origin=Passo+Pordoi&destination=Lago+di+Fedaia&waypoints=Canazei%7CAlba+di+Canazei&travelmode=driving' },
  { date: '2026-09-24', title: 'J8 — Journée banalisée (travail)', base: 'alta-badia', spots: [], planB: null, drive: { km: 0, min: 0, label: 'Aucun déplacement' }, note: '💻 Journée de travail dans le van, aucune rando. Le Col Rodella et le sentier Friedrich August qui étaient prévus ici sautent : on a basculé en Val Badia entre-temps et le Passo Sella est maintenant à 1h30 derrière nous. Deuxième nuit d’affilée au Sitting Bull Ranch de Longiarù.' },
  { date: '2026-09-25', title: 'J9 — Passo Göma, puis repli sur Bolzano', base: '', spots: [], planB: null, drive: { km: 120, min: 150, label: 'Longiarù → Passo delle Erbe (rando) → Bolzano' }, note: '✅ Fait : boucle Passo delle Erbe → Passo Göma, 9,2 km et +434 m, sentiers 8A puis 8B à travers les Peitlerwiesen face au Sass de Putia. ❌ SOIR IMPRÉVU — aucun emplacement trouvé pour la nuit dans le secteur Val Gardena : Selva interdit le stationnement nocturne sur les parkings publics et en bord de route, et l’aire de Strada Ruacia n’autorise plus la nuit d’après les avis récents. Repli sur BOLZANO. Ça tombe bien : on était déjà passé au plan « retour par l’ouest », et Bolzano est pile sur cet axe.' },
  { date: '2026-09-26', title: 'J10 — L’altopiano del Salto, les mélèzes dorés', base: '', spots: [], planB: null, drive: { km: 60, min: 80, label: 'Bolzano → San Genesio (rando) → Naturno' }, note: '✅ Fait : l’ALTOPIANO DEL SALTO depuis San Genesio Atesino, le plus grand plateau de mélèzes d’Europe, entre 1 100 et 1 500 m au-dessus de Bolzano. ~11 km. Pile la saison : le mélèze est le seul conifère qui jaunit à l’automne, tout le plateau vire à l’or. Terrain idéal pour le chien, pistes larges et prés, zéro passage technique. SOIR — descente sur Naturno, à l’entrée de la Val Venosta (~50 min), pour se rapprocher du retour. Nuit : Camper Park Caregnato, 28 € les 24 h services et électricité compris, plus 1 € de taxe de séjour par personne de 16 ans et plus. Ouvert 24h/24.' },
  { date: '2026-09-27', title: 'J11 — Val Martello : la journée en altitude', base: '', spots: [], planB: null, drive: { km: 110, min: 135, label: 'Naturno → Val Martello (rando) → Curon Venosta' }, note: '🏔️ ENFIN UNE JOURNÉE ENTIÈREMENT AU-DESSUS DE 2 000 M, après trois sorties en fond de vallée. MATIN — Naturno → Silandro → Coldrano, puis la route de la VAL MARTELLO, ~1h. ✅ Tout est vérifié : route goudronnée praticable toute l’année jusqu’à 2 051 m, parking de Hintermartell au bout, aucun péage, et le Rifugio Genziana est au parking même, ouvert 365 jours par an. Aucun risque de fermeture de fin de saison. LA RANDO — on est dans le PARC NATIONAL DU STELVIO, sous le groupe Ortles-Cevedale. Sentier muletier 150, coté T (facile) : 45 min jusqu’au RIFUGIO NINO CORSI / ZUFALLHÜTTE (2 265 m), posé sur un verrou rocheux au fond de la vallée. Ça continue ensuite jusqu’au RIFUGIO MARTELLO (2 610 m), face aux glaciers du Cevedale. Environ 12 km aller-retour et +559 m si on pousse jusqu’en haut. Les deux refuges sont ouverts. 🐶 Haute montagne mais sentier muletier large : rien de technique, pas de câble, pas d’à-pic, demi-tour possible partout. 💨 2 600 m fin septembre : coupe-vent et gourde du chien. SOIR — on remonte la Val Venosta jusqu’à Curon (~1h15). Nuit : aire du Lago di Resia. 🗺️ Route : https://www.google.com/maps/dir/?api=1&origin=Naturno&destination=Parcheggio+Hintermartell+Val+Martello&waypoints=Silandro%7CColdrano&travelmode=driving' },
  { date: '2026-09-28', title: 'J12 — Lago di Resia, Glorenza et l’Autriche', base: '', spots: [], planB: null, drive: { km: 60, min: 70, label: 'Curon ↔ Passo Resia ↔ Nauders (Autriche) ↔ Glorenza' }, note: '🇦🇹 LA JOURNÉE AUTRICHIENNE. MATIN — le LAGO DI RESIA et son campanile émergé : en 1950 le barrage a noyé le vieux village de Curon, il n’en reste que ce clocher du XIVe planté dans l’eau. Deux façons de le voir : le tour du lac, 15,2 km de sentier plat moitié asphalte moitié piste depuis le barrage — on fait le tour complet ou on coupe ; ou la MALGA DI RESIA, 1 km de piste depuis le village de Resia puis ~1 h de montée et +200 m jusqu’à 2 000 m, pour la vue plongeante sur le lac et le campanile. La chapelle Sant’Anna sur la butte donne le même cadrage en 20 min. APRÈS-MIDI — LA FRONTIÈRE EST À 5 KM : le Passo Resia (1 507 m) est un col bas et roulant, ouvert toute l’année. Côté autrichien, NAUDERS et sa forteresse, et surtout ALTFINSTERMÜNZ, un passage fortifié médiéval au fond des gorges de l’Inn — pont, tours et douane au bord de la rivière, site étonnant et très peu couru. 💶 Pas d’autoroute sur ce trajet, donc pas de vignette autrichienne. EN REDESCENDANT — GLORENZA (Glurns), le plus petit bourg fortifié des Alpes : remparts entiers, tours et arcades, une heure à pied avec le chien. Nuit : aire du Lago di Resia.' },
  { date: '2026-09-29', title: 'J13 — Le Stelvio, dernier grand col', base: '', spots: [], planB: null, drive: { km: 230, min: 270, label: 'Curon → Prato allo Stelvio → Passo Stelvio → Bormio → Lac de Côme' }, note: '🏔️ LA ROUTE DE CARTE POSTALE POUR RENTRER. Redescente de la Val Venosta jusqu’à Prato allo Stelvio (30 min), puis le PASSO DELLO STELVIO, 2 758 m, le plus haut col routier d’Italie : 48 lacets numérotés côté Bolzano. Confirmé ouvert — les trois versants tournent jusqu’au 7 novembre 2026, sauf fermeture anticipée pour neige. ⚠️ À VÉRIFIER LA VEILLE : météo et état du col (neige possible à 2 758 m fin septembre), et monter tôt, dans le frais, quand il n’y a personne — les lacets sont serrés en van. Le Gavia voisin interdit les camping-cars, le Stelvio non. 🚫 REPLI SI LE COL EST FERMÉ OU SI LA ROUTE INQUIÈTE : passer par la Suisse, Müstair puis le col du Fuorn à travers le Parc National, l’Engadine, le col de la Maloja et Chiavenna. Aussi beau, bien plus roulant, et sans vignette en restant hors autoroute. Puis Bormio, la Valtellina et le lac de Côme. Longue journée (~4h30). Nuit : aire de Côme ou d’Argegno — on boucle la boucle, c’était l’étape J3 à l’aller.' },
  { date: '2026-09-30', title: 'J14 — Journée tampon au lac de Côme', base: '', spots: [], planB: null, drive: { km: 20, min: 30, label: 'Autour du lac' }, note: '🎁 Journée de marge avant les deux gros jours de route. Elle sert de filet : si le Stelvio a été fermé la veille et qu’il a fallu passer par la Suisse, elle absorbe le retard. Sinon : rives du lac avec le chien, Argegno, Bellagio, gelato, ravitaillement et lessive pour la fin. 20-24°C au bord du lac à cette saison, l’exact inverse des 2 600 m de la Val Martello. Nuit : aire de Côme ou d’Argegno.' },
  { date: '2026-10-01', title: 'J15 — Retour 2 : Briançon', base: '', spots: [], planB: null, drive: { km: 400, min: 270, label: 'Lac de Côme → Milan → Turin → Montgenèvre → Briançon' }, note: '~4h30 de route, la plus longue du retour : Milan, Turin, puis la montée au col de Montgenèvre. Pause balade aux lacs d’Avigliana avant Turin pour couper. Soirée dans la vieille ville Vauban de Briançon ou le long de la Durance. Nuit : aire de Briançon.' },
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
  { days: 'J7-J8', label: 'Sitting Bull Ranch · Longiarù (Val Badia)', coords: [46.676, 11.873], kind: 'mtn' },
  { days: 'J9-J10', label: 'Val Gardena (Pontives / Selva)', coords: [46.594, 11.629], kind: 'mtn' },
  { days: 'J11', label: 'Völs am Schlern (Camping Seiser Alm)', coords: [46.519, 11.512], kind: 'mtn' },
  { days: 'J12-J13', label: 'Lago di Resia · Curon (frontière 🇦🇹)', coords: [46.802, 10.54], kind: 'mtn' },
  { days: 'J14', label: 'Lac de Côme (via le Stelvio)', coords: [45.808, 9.085], kind: 'road' },
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
  // J6 : Ville di Fiemme → Predazzo → Passo Costalunga (Latemar) → Canazei
  [46.287, 11.434], [46.312, 11.599], [46.378, 11.661], [46.419, 11.669], [46.403, 11.597], [46.419, 11.669], [46.479, 11.766],
  // J7 : Bindelweg au Passo Pordoi, puis bascule en Val Badia
  [46.488, 11.813], [46.52, 11.87], [46.548, 11.871], [46.6, 11.9], [46.676, 11.873],
  // J9 : Passo delle Erbe (Passo Göma), retour, puis Passo Gardena vers la Val Gardena
  [46.657, 11.789], [46.676, 11.873], [46.6, 11.9], [46.548, 11.871], [46.547, 11.805], [46.552, 11.755], [46.594, 11.629],
  // J10 : Vallunga depuis Selva
  [46.552, 11.755], [46.565, 11.79], [46.552, 11.755], [46.594, 11.629],
  // J11 : Siusi → Alpe di Siusi → Völs
  [46.542, 11.556], [46.519, 11.512],
  // J12 : cap à l’ouest — Bolzano, Merano, Val Venosta, Glorenza, Curon
  [46.49, 11.35], [46.67, 11.16], [46.63, 10.86], [46.671, 10.554], [46.802, 10.54],
  // J13 : passage en Autriche — Passo Resia, Nauders, Altfinstermünz
  [46.845, 10.507], [46.888, 10.503], [46.802, 10.54],
  // J14 : le Stelvio — Prato allo Stelvio, col, Bormio, Valtellina, lac de Côme
  [46.671, 10.554], [46.617, 10.593], [46.528, 10.453], [46.467, 10.373], [46.17, 10.03], [46.01, 9.52], [45.808, 9.085],
  // Retour : Milan, Turin, Montgenèvre, Briançon, Montarnaud
  [45.46, 9.19], [45.07, 7.68], [45.06, 7.39], [45.03, 6.83], [44.932, 6.726], [44.9, 6.643],
  [44.559, 6.079], [44.19, 5.94], [43.95, 4.85], [43.83, 4.36], [43.61, 3.87], [43.649, 3.699],
]

export const TRIP_START = '2026-09-17'
export const TRIP_END = '2026-10-02'
