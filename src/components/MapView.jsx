import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LOCATIONS, getPhotos } from '../data/locations'
import { POIS, POI_CATS } from '../data/pois'
import { markerColor, ratingLabel } from './ui'
import { useStore } from '../store'

const TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
}

const HIKE_FILTERS = [
  { id: 'randos', label: '🥾 Randos', on: true },
  { id: 'visited', label: '✓ Déjà vus', on: false },
]
const DEFAULT_ON = ['randos', 'aire', 'bivouac']

export default function MapView({ theme, height }) {
  const el = useRef(null)
  const mapRef = useRef(null)
  const tileRef = useRef(null)
  const groupsRef = useRef({})
  const { done } = useStore()
  const [active, setActive] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dolo26:mapfilters')) || DEFAULT_ON } catch { return DEFAULT_ON }
  })
  const [legendOpen, setLegendOpen] = useState(false)

  const toggle = (id) => {
    setActive((a) => {
      const next = a.includes(id) ? a.filter((x) => x !== id) : [...a, id]
      try { localStorage.setItem('dolo26:mapfilters', JSON.stringify(next)) } catch {}
      return next
    })
  }

  useEffect(() => {
    const map = L.map(el.current, { center: [46.55, 11.95], zoom: 10, zoomControl: false, attributionControl: true })
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    map.attributionControl.setPrefix(false)
    mapRef.current = map
    const groups = groupsRef.current

    // Randonnées / lieux
    groups.randos = L.layerGroup()
    groups.visited = L.layerGroup()
    for (const loc of LOCATIONS) {
      const isDone = done.includes(loc.id)
      const color = isDone ? '#22c55e' : markerColor(loc)
      const icon = L.divIcon({
        className: '',
        html: `<div class="marker-pin" style="background:${color}"><span>${isDone ? '✓' : loc.status === 'visited' ? '✓' : loc.avoidDog ? '🐾' : loc.rating === 5 ? '★' : ''}</span></div>`,
        iconSize: [26, 26], iconAnchor: [13, 24], popupAnchor: [0, -22],
      })
      const photo = getPhotos(loc.id)[0]
      const m = L.marker(loc.coords, { icon, title: loc.name })
      m.bindPopup(
        `<div class="map-popup">` +
        (photo ? `<img src="${photo.thumb || photo.url}" alt=""/>` : '') +
        `<h4>${loc.name}</h4>` +
        `<div style="font-size:12px;color:#94a3b8">${isDone ? '✓ Réalisée · ' : ''}${ratingLabel(loc)}${loc.hike.timeH !== '—' ? ' · ' + loc.hike.timeH : ''}</div>` +
        `<a class="mp-open" href="#/lieu/${loc.id}">Ouvrir la fiche →</a></div>`,
        { maxWidth: 240 }
      )
      m.addTo(loc.status === 'visited' ? groups.visited : groups.randos)
    }

    // POIs par catégorie
    for (const [cat, meta] of Object.entries(POI_CATS)) {
      groups[cat] = L.layerGroup()
      for (const p of POIS.filter((x) => x.cat === cat)) {
        const icon = L.divIcon({
          className: '',
          html: `<div class="poi-dot" style="background:${meta.color}">${meta.emoji}</div>`,
          iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -12],
        })
        L.marker(p.coords, { icon, title: p.name })
          .bindPopup(
            `<div class="map-popup"><h4>${meta.emoji} ${p.name}</h4>` +
            (p.note ? `<div style="font-size:12px;color:#94a3b8;line-height:1.45">${p.note}</div>` : '') +
            `<a class="mp-open" href="${p.gmaps}" target="_blank" rel="noreferrer">Itinéraire Google Maps ↗</a></div>`,
            { maxWidth: 240 }
          )
          .addTo(groups[cat])
      }
    }
    return () => map.remove()
  }, [done])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    for (const [id, g] of Object.entries(groupsRef.current)) {
      if (active.includes(id)) g.addTo(map)
      else map.removeLayer(g)
    }
  }, [active, done])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (tileRef.current) map.removeLayer(tileRef.current)
    tileRef.current = L.tileLayer(theme === 'light' ? TILES.light : TILES.dark, {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',
    }).addTo(map)
  }, [theme])

  return (
    <div style={{ position: 'relative', width: '100%', height: height || '100%' }}>
      <div ref={el} style={{ position: 'absolute', inset: 0, borderRadius: height ? 'var(--r-lg)' : 0, overflow: 'hidden' }} />

      <div className="map-filters">
        {HIKE_FILTERS.map((f) => (
          <button key={f.id} className={`map-chip ${active.includes(f.id) ? 'on' : ''}`} onClick={() => toggle(f.id)}>{f.label}</button>
        ))}
        {Object.entries(POI_CATS).map(([cat, meta]) => (
          <button key={cat} className={`map-chip ${active.includes(cat) ? 'on' : ''}`} onClick={() => toggle(cat)} style={active.includes(cat) ? { borderColor: meta.color } : {}}>
            {meta.emoji} {meta.label}
          </button>
        ))}
      </div>

      <div className="map-legend" style={{ maxWidth: legendOpen ? 240 : undefined }}>
        <button onClick={() => setLegendOpen(!legendOpen)} style={{ fontWeight: 800, fontSize: 12.5, textAlign: 'left' }}>
          {legendOpen ? '▾' : '▸'} Légende
        </button>
        {legendOpen && (
          <>
            <div className="lg"><span className="dot" style={{ background: '#d4af6a' }} /> ⭐⭐⭐⭐⭐ Incontournable</div>
            <div className="lg"><span className="dot" style={{ background: '#34d399' }} /> ⭐⭐⭐⭐ Très beau</div>
            <div className="lg"><span className="dot" style={{ background: '#60a5fa' }} /> ⭐⭐⭐ Option</div>
            <div className="lg"><span className="dot" style={{ background: '#22c55e' }} /> ✓ Réalisée</div>
            <div className="lg"><span className="dot" style={{ background: '#8d99ae' }} /> Déjà vu (avant 2026)</div>
            <div className="lg"><span className="dot" style={{ background: '#ef4444' }} /> À éviter avec un chien</div>
          </>
        )}
      </div>
    </div>
  )
}
