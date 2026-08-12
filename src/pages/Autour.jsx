import React, { useState, useMemo, useEffect, useRef } from 'react'
import L from 'leaflet'
import { LOCATIONS, getPhotos } from '../data/locations'
import { NIGHT_SPOTS } from '../data/nightspots'
import { POIS, POI_CATS } from '../data/pois'
import { driveMinEstimate, fmtMin } from '../geo'
import { markerColor, Stars } from '../components/ui'
import { useStore } from '../store'

const TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
}
const RING_COLORS = ['#22c55e', '#eab308', '#f97316']

function RadiusMap({ theme, spot }) {
  const el = useRef(null)
  const mapRef = useRef(null)
  const tileRef = useRef(null)
  const layerRef = useRef(null)

  useEffect(() => {
    const map = L.map(el.current, { zoomControl: false, attributionControl: false })
    mapRef.current = map
    return () => map.remove()
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (tileRef.current) map.removeLayer(tileRef.current)
    tileRef.current = L.tileLayer(theme === 'light' ? TILES.light : TILES.dark, { maxZoom: 18 }).addTo(map)
  }, [theme])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (layerRef.current) map.removeLayer(layerRef.current)
    const g = L.layerGroup().addTo(map)
    layerRef.current = g
    // 15/30/45 min ≈ rayon vol d'oiseau (38 km/h ÷ détour 1,5)
    ;[15, 30, 45].forEach((min, i) => {
      const radiusKm = (min / 60) * 38 / 1.5
      L.circle(spot.coords, { radius: radiusKm * 1000, color: RING_COLORS[i], weight: 1.5, fillOpacity: 0.03, dashArray: '5 6' }).addTo(g)
    })
    L.marker(spot.coords, {
      icon: L.divIcon({ className: '', html: '<div class="route-dot home">🚐</div>', iconSize: [28, 28], iconAnchor: [14, 14] }),
    }).addTo(g)
    for (const loc of LOCATIONS.filter((l) => l.status === 'new')) {
      const min = driveMinEstimate(spot.coords, loc.coords)
      if (min > 50) continue
      L.marker(loc.coords, {
        icon: L.divIcon({ className: '', html: `<div class="marker-pin" style="background:${markerColor(loc)}"><span>${loc.rating === 5 ? '★' : ''}</span></div>`, iconSize: [26, 26], iconAnchor: [13, 24], popupAnchor: [0, -22] }),
      }).addTo(g).bindPopup(`<b>${loc.name}</b><br/>🚗 ≈ ${fmtMin(min)}<br/><a class="mp-open" href="#/lieu/${loc.id}">Ouvrir →</a>`)
    }
    map.setView(spot.coords, 11)
  }, [spot])

  return <div ref={el} style={{ position: 'absolute', inset: 0 }} />
}

export default function Autour() {
  const { theme } = useStore()
  const [spotId, setSpotId] = useState('selva')
  const spot = NIGHT_SPOTS.find((s) => s.id === spotId) || NIGHT_SPOTS[0]

  const groups = useMemo(() => {
    const items = LOCATIONS
      .filter((l) => l.status === 'new')
      .map((l) => ({ l, min: driveMinEstimate(spot.coords, l.coords) }))
      .sort((a, b) => a.min - b.min)
    return [
      { label: '🟢 À moins de 15 min', items: items.filter((x) => x.min <= 15) },
      { label: '🟡 15 à 30 min', items: items.filter((x) => x.min > 15 && x.min <= 30) },
      { label: '🟠 30 à 45 min', items: items.filter((x) => x.min > 30 && x.min <= 45) },
    ]
  }, [spot])

  const practical = useMemo(() => {
    const cats = ['supermarche', 'essence', 'laverie', 'aire']
    return cats.map((cat) => {
      const best = POIS.filter((p) => p.cat === cat)
        .map((p) => ({ p, min: driveMinEstimate(spot.coords, p.coords) }))
        .sort((a, b) => a.min - b.min)[0]
      return best ? { cat, ...best } : null
    }).filter(Boolean)
  }, [spot])

  return (
    <div className="page fade-in">
      <div className="eyebrow">Vue camp de base</div>
      <div className="section-head" style={{ marginBottom: 10 }}><h2>Autour du camp</h2></div>
      <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 12, maxWidth: 660 }}>
        Choisis ton spot de nuit : tout ce qui est faisable à 15, 30 ou 45 minutes de route s’affiche. Temps estimés (routes de montagne).
      </p>
      <div className="filters">
        {NIGHT_SPOTS.map((s) => (
          <button key={s.id} className={`rank-tab ${spotId === s.id ? 'active' : ''}`} onClick={() => setSpotId(s.id)}>
            {s.name.split('(')[0].replace(/^(Aire|Area sosta|Camping|Parking|Barrage) (de |d’|du |des )?/i, '').trim().split(' /')[0]}
          </button>
        ))}
      </div>

      <div className="card" style={{ position: 'relative', height: 'min(48dvh, 440px)', overflow: 'hidden', borderRadius: 'var(--r-lg)', margin: '10px 0 14px' }}>
        <RadiusMap theme={theme} spot={spot} />
      </div>

      <div className="grid cols-2" style={{ marginBottom: 16 }}>
        {practical.map(({ cat, p, min }) => (
          <a key={cat} className="card" href={p.gmaps} target="_blank" rel="noreferrer" style={{ padding: '12px 15px', display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{POI_CATS[cat].emoji} {p.name}</span>
            <span style={{ fontSize: 12.5, color: 'var(--text-3)', flexShrink: 0 }}>≈ {fmtMin(min)}</span>
          </a>
        ))}
      </div>

      {groups.map((gr) => gr.items.length > 0 && (
        <div key={gr.label} className="section" style={{ margin: '20px 0' }}>
          <div className="section-head"><h2 style={{ fontSize: 18 }}>{gr.label}</h2></div>
          <div style={{ display: 'grid', gap: 8 }}>
            {gr.items.map(({ l, min }) => {
              const photo = getPhotos(l.id)[0]
              return (
                <a key={l.id} className="card" href={`#/lieu/${l.id}`} style={{ display: 'flex', gap: 12, padding: 10, alignItems: 'center' }}>
                  {photo && <img src={photo.thumb} alt="" style={{ width: 58, height: 58, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <b style={{ fontSize: 14.5 }}>{l.name}</b>
                    <div style={{ fontSize: 12, color: 'var(--text-2)' }}><Stars n={l.rating} /> · {l.hike.distanceKm} km · {l.hike.dplusM} m D+ · 🐶 {l.dog.stars}/5</div>
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--accent)', flexShrink: 0 }}>🚗 {fmtMin(min)}</span>
                </a>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
