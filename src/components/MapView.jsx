import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LOCATIONS, getPhotos } from '../data/locations'
import { markerColor, ratingLabel } from './ui'

const TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  topo: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
}

export default function MapView({ theme, focus, height }) {
  const el = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)

  useEffect(() => {
    const map = L.map(el.current, {
      center: focus || [46.55, 11.95],
      zoom: focus ? 13 : 10,
      zoomControl: false,
      attributionControl: true,
    })
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    map.attributionControl.setPrefix(false)
    mapRef.current = map

    for (const loc of LOCATIONS) {
      const color = markerColor(loc)
      const icon = L.divIcon({
        className: '',
        html: `<div class="marker-pin" style="background:${color}"><span>${loc.status === 'visited' ? '✓' : loc.avoidDog ? '🐾' : loc.rating === 5 ? '★' : ''}</span></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 24],
        popupAnchor: [0, -22],
      })
      const photo = getPhotos(loc.id)[0]
      const m = L.marker(loc.coords, { icon, title: loc.name }).addTo(map)
      m.bindPopup(
        `<div class="map-popup">` +
        (photo ? `<img src="${photo.thumb || photo.url}" alt=""/>` : '') +
        `<h4>${loc.name}</h4>` +
        `<div style="font-size:12px;color:#94a3b8">${ratingLabel(loc)} · ${loc.hike.timeH !== '—' ? loc.hike.timeH : 'étape'}</div>` +
        `<a class="mp-open" href="#/lieu/${loc.id}">Ouvrir la fiche →</a></div>`,
        { maxWidth: 240 }
      )
    }
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

  return (
    <div style={{ position: 'relative', width: '100%', height: height || '100%' }}>
      <div ref={el} style={{ position: 'absolute', inset: 0, borderRadius: height ? 'var(--r-lg)' : 0, overflow: 'hidden' }} />
      <div className="map-legend">
        <div className="lg"><span className="dot" style={{ background: '#d4af6a' }} /> ⭐⭐⭐⭐⭐ Incontournable</div>
        <div className="lg"><span className="dot" style={{ background: '#34d399' }} /> ⭐⭐⭐⭐ Très beau</div>
        <div className="lg"><span className="dot" style={{ background: '#60a5fa' }} /> ⭐⭐⭐ Option</div>
        <div className="lg"><span className="dot" style={{ background: '#8d99ae' }} /> Déjà vu</div>
        <div className="lg"><span className="dot" style={{ background: '#ef4444' }} /> À éviter avec un chien</div>
      </div>
    </div>
  )
}
