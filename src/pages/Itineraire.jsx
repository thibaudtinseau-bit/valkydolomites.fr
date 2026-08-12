import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { NIGHT_STOPS, ROUTE_PATH } from '../data/planning'
import { useStore } from '../store'

const fmtTime = (min) => (min >= 60 ? `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}` : `${min} min`)

const TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
}

function RouteMap({ theme }) {
  const el = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)

  useEffect(() => {
    const map = L.map(el.current, { zoomControl: false, attributionControl: true })
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    map.attributionControl.setPrefix(false)
    mapRef.current = map

    const line = L.polyline(ROUTE_PATH, { color: '#d4af6a', weight: 3, opacity: 0.85, dashArray: '7 7' }).addTo(map)
    map.fitBounds(line.getBounds(), { padding: [30, 30] })

    NIGHT_STOPS.forEach((s, i) => {
      const isHome = s.kind === 'home'
      const icon = L.divIcon({
        className: '',
        html: `<div class="route-dot ${s.kind}">${isHome ? '🏠' : s.days.replace('J', '').split('-')[0]}</div>`,
        iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14],
      })
      L.marker(s.coords, { icon, title: s.label, zIndexOffset: i })
        .addTo(map)
        .bindPopup(`<b>${s.days}</b> · ${s.label}`)
    })
    return () => map.remove()
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (layerRef.current) map.removeLayer(layerRef.current)
    layerRef.current = L.tileLayer(theme === 'light' ? TILES.light : TILES.dark, {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',
    }).addTo(map)
  }, [theme])

  return <div ref={el} style={{ position: 'absolute', inset: 0 }} />
}

export default function Itineraire() {
  const { theme, plan } = useStore()
  const driveDays = plan.filter((d) => d.drive)
  const totalKm = driveDays.reduce((s, d) => s + d.drive.km, 0)
  const totalMin = driveDays.reduce((s, d) => s + d.drive.min, 0)
  const bigLegs = driveDays.filter((d) => d.drive.km >= 100)
  const liaisons = driveDays.filter((d) => d.drive.km < 100)

  return (
    <div className="page fade-in">
      <div className="eyebrow">La route, en un coup d’œil</div>
      <div className="section-head" style={{ marginBottom: 10 }}>
        <h2>Itinéraire & trajets</h2>
      </div>

      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <div className="stat"><div className="s-label">Distance totale</div><div className="s-value">≈ {totalKm.toLocaleString('fr-FR')} km</div></div>
        <div className="stat"><div className="s-label">Volant cumulé</div><div className="s-value">≈ {Math.round(totalMin / 60)} h</div></div>
        <div className="stat"><div className="s-label">Grandes étapes</div><div className="s-value">{bigLegs.length} × ≤ 4h15</div></div>
        <div className="stat"><div className="s-label">Liaisons montagne</div><div className="s-value">{liaisons.length} × ≤ 1h20</div></div>
      </div>

      <div className="card" style={{ position: 'relative', height: 'min(62dvh, 560px)', overflow: 'hidden', borderRadius: 'var(--r-lg)', marginBottom: 18 }}>
        <RouteMap theme={theme} />
      </div>

      <div className="card" style={{ padding: '6px 14px', marginBottom: 14 }}>
        {plan.map((d, i) => {
          const date = new Date(d.date + 'T12:00')
          return (
            <div key={d.date} className="kv" style={{ alignItems: 'center' }}>
              <span className="k" style={{ display: 'flex', gap: 10, alignItems: 'baseline', minWidth: 0 }}>
                <b style={{ color: 'var(--accent)', flexShrink: 0 }}>J{i + 1}</b>
                <span style={{ color: 'var(--text-3)', fontSize: 12, flexShrink: 0 }}>{date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}</span>
                <span style={{ fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.drive ? d.drive.label : d.title}</span>
              </span>
              <span className="v" style={{ flexShrink: 0 }}>
                {d.drive
                  ? <>🚗 {d.drive.km} km · <b>{fmtTime(d.drive.min)}</b></>
                  : <span style={{ color: 'var(--text-3)' }}>sur place</span>}
              </span>
            </div>
          )
        })}
      </div>

      <p className="notice">
        Temps estimés en camping-car, hors pauses (compter +30-45 min de pauses chien par grande étape).
        Le tracé sur la carte est schématique — la navigation précise se fait sur Google Maps / Waze le jour J.
        Péages notables : tunnel du Fréjus (A/R ~€130 en camping-car ≤ 3,5 t — vérifier votre catégorie), autoroutes italiennes, route des Tre Cime (~45 €).
      </p>
    </div>
  )
}
