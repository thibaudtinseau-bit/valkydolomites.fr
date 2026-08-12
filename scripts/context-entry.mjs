// Entrée esbuild : compile un contexte compact du voyage pour l'agent IA (api/_context.js).
import { LOCATIONS } from '../src/data/locations.js'
import { BASES } from '../src/data/bases.js'
import { DEFAULT_PLAN, NIGHT_STOPS, ROUTE_PATH } from '../src/data/planning.js'
import { NIGHT_SPOTS } from '../src/data/nightspots.js'
import { POIS } from '../src/data/pois.js'
import { WEBCAMS } from '../src/data/webcams.js'

const ctx = {
  voyage: {
    depart: 'Montarnaud (Hérault, France), jeudi 17 septembre 2026 en début d’après-midi',
    retour: 'Montarnaud, vendredi 2 octobre 2026 en soirée',
    vehicule: 'Camping-car (< 8 m), 3 jours d’autonomie eau/batterie, chien à bord (Valky)',
    contraintes: 'Étapes routières ≤ 3-4 h avec balade chien quotidienne. Éviter les secteurs à patous. Grandes randonnées privilégiées. Flexibles selon météo.',
  },
  lieux: LOCATIONS.map((l) => ({
    id: l.id, nom: l.name, statut: l.status === 'visited' ? 'déjà visité (pas un objectif)' : 'nouveau',
    note: l.rating || undefined, resume: l.tagline,
    rando: l.hike.distanceKm > 0 ? `${l.hike.distanceKm} km, ${l.hike.dplusM} m D+, ${l.hike.timeH}, alt max ${l.hike.altMaxM} m, ${l.hike.difficulty}, départ ${l.hike.start}` : undefined,
    chien: `${l.dog.stars}/5 — ${l.dog.notes}`,
    patous: `niveau ${l.patou.level}/4 — ${l.patou.reason}`,
    campingCar: `${l.camper.parking} · nuit : ${l.camper.overnight} · aire : ${l.camper.aire}${l.camper.notes ? ' · ' + l.camper.notes : ''}`,
    pratique: `parking ${l.practical.parkingPrice} · téléphérique ${l.practical.cablecarPrice} · ${l.practical.hours} · temps conseillé ${l.practical.suggestedTime}`,
    coucherSoleil: l.sunset, leverSoleil: l.sunrise, frequentation: l.crowd,
    refuge: l.refuge !== '—' ? l.refuge : undefined, resto: l.resto !== '—' ? l.resto : undefined,
    aEviterChien: l.avoidDog || undefined,
  })),
  bases: BASES.map((b) => ({ id: b.id, nom: b.name, resume: b.intro, dormir: b.sleep, courses: b.groceries, eau: b.water, vidange: b.dump, manger: b.eat, baladeChien: b.dogWalk, lieux: b.spots })),
  planning: DEFAULT_PLAN.map((d, i) => ({ jour: `J${i + 1}`, date: d.date, titre: d.title, lieux: d.spots, planB: d.planB, route: d.drive ? `${d.drive.label} — ${d.drive.km} km, ${d.drive.min} min` : 'sur place', note: d.note })),
  spotsNuit: NIGHT_SPOTS.map((s) => ({ id: s.id, nom: s.name, quand: s.when, type: s.type, gps: s.gps, prix: s.price, services: s.services, calme: 5 - s.noise, vue: s.view, reseau4g: s.sun4g, regles: s.rules, note: s.note })),
  poisPratiques: POIS.map((p) => ({ cat: p.cat, nom: p.name, note: p.note || undefined })),
  webcams: WEBCAMS.map((w) => ({ nom: w.name, secteur: w.sector, url: w.url })),
}

console.log('export const TRIP_CONTEXT = ' + JSON.stringify(JSON.stringify(ctx)) + ';')
