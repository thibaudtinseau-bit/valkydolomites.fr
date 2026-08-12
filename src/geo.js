// Géo-utilitaires : distance à vol d'oiseau et estimation route montagne.
export function haversineKm([lat1, lon1], [lat2, lon2]) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

// Vol d'oiseau → estimation minutes de route en zone alpine :
// détour moyen ×1.5 et ~38 km/h de moyenne cols compris.
export function driveMinEstimate(a, b) {
  const km = haversineKm(a, b)
  return Math.round((km * 1.5) / 38 * 60)
}

export function nearest(from, items, getCoords) {
  let best = null, bestD = Infinity
  for (const it of items) {
    const d = haversineKm(from, getCoords(it))
    if (d < bestD) { bestD = d; best = it }
  }
  return best ? { item: best, km: bestD } : null
}

export const fmtMin = (min) => (min >= 60 ? `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}` : `${min} min`)
