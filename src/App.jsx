import React, { useEffect, useState } from 'react'
import { useRoute } from './hooks'
import { StoreProvider, useStore } from './store'
import Home from './pages/Home'
import Places from './pages/Places'
import PlaceDetail from './pages/PlaceDetail'
import Planning from './pages/Planning'
import Weather from './pages/Weather'
import Sun from './pages/Sun'
import Rankings from './pages/Rankings'
import Bases, { BaseDetail } from './pages/Bases'
import Camper from './pages/Camper'
import Itineraire from './pages/Itineraire'
import Today from './pages/Today'
import Assistant from './pages/Assistant'
import Autour from './pages/Autour'
import Webcams from './pages/Webcams'
import Costs from './pages/Costs'
import Docs from './pages/Docs'
import NightSpots from './pages/NightSpots'
import Favorites from './pages/Favorites'
import MapView from './components/MapView'

const NAV = [
  ['jour', 'Aujourd’hui', '☀️'],
  ['carte', 'Carte', '🗺️'],
  ['lieux', 'Lieux', '🥾'],
  ['planning', 'Planning', '📅'],
]
const ALL_PAGES = [
  ['jour', 'Aujourd’hui', '☀️'],
  ['carte', 'Carte', '🗺️'],
  ['lieux', 'Randonnées', '🥾'],
  ['planning', 'Planning', '📅'],
  ['assistant', 'Que faire ?', '🤔'],
  ['autour', 'Autour du camp', '📍'],
  ['meteo', 'Météo', '🌤️'],
  ['webcams', 'Webcams', '📷'],
  ['nuits', 'Spots de nuit', '🌙'],
  ['itineraire', 'Itinéraire', '🚗'],
  ['soleil', 'Golden hour', '🌇'],
  ['classements', 'Classements', '🏆'],
  ['bases', 'Bases', '⛺'],
  ['camping-car', 'Camping-car', '🚐'],
  ['couts', 'Coûts', '💶'],
  ['documents', 'Documents', '📄'],
  ['favoris', 'Carnet & favoris', '♥'],
  ['', 'Accueil', '🏔️'],
]
const NAV_DESKTOP = [
  ['jour', 'Aujourd’hui'], ['carte', 'Carte'], ['lieux', 'Randonnées'], ['planning', 'Planning'],
  ['assistant', 'Que faire ?'], ['autour', 'Autour'], ['meteo', 'Météo'], ['webcams', 'Webcams'],
  ['nuits', 'Nuits'], ['itineraire', 'Itinéraire'], ['soleil', 'Golden hour'], ['classements', 'Tops'],
  ['bases', 'Bases'], ['camping-car', 'Camping-car'], ['couts', 'Coûts'], ['documents', 'Docs'], ['favoris', 'Carnet'],
]

function Shell() {
  const route = useRoute()
  const { theme, setTheme } = useStore()
  const [page, param] = route
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [page, param])
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : '' }, [menuOpen])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', theme === 'light' ? '#f2f4f8' : '#0b1220')
  }, [theme])

  const view = (() => {
    switch (page) {
      case undefined: return <Home />
      case 'carte': return <div className="map-shell"><MapView theme={theme} /></div>
      case 'lieux': return <Places />
      case 'lieu': return <PlaceDetail id={param} />
      case 'planning': return <Planning />
      case 'jour': return <Today />
      case 'assistant': return <Assistant />
      case 'autour': return <Autour />
      case 'webcams': return <Webcams />
      case 'nuits': return <NightSpots />
      case 'couts': return <Costs />
      case 'documents': return <Docs />
      case 'itineraire': return <Itineraire />
      case 'meteo': return <Weather />
      case 'soleil': return <Sun />
      case 'classements': return <Rankings />
      case 'bases': return <Bases />
      case 'base': return <BaseDetail id={param} />
      case 'camping-car': return <Camper />
      case 'favoris': return <Favorites />
      default: return <Home />
    }
  })()

  const isActive = (p) => (p === '' ? page === undefined : page === p || (p === 'lieux' && page === 'lieu') || (p === 'bases' && page === 'base'))

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#/">
          <span className="brand-badge">🏔️</span>
          Dolomites <span style={{ color: 'var(--accent)' }}>2026</span>
        </a>
        <nav>
          {NAV_DESKTOP.map(([p, label]) => (
            <a key={p} href={`#/${p}`} className={isActive(p) ? 'active' : ''}>{label}</a>
          ))}
        </nav>
        <div className="top-actions">
          <button className="icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Thème">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {view}

      <nav className="tabbar">
        {NAV.map(([p, label, ico]) => (
          <a key={p} href={`#/${p}`} className={isActive(p) ? 'active' : ''}>
            <span className="t-ico">{ico}</span>
            {label}
          </a>
        ))}
        <a
          href="#menu"
          className={menuOpen ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); setMenuOpen((o) => !o) }}
        >
          <span className="t-ico">☰</span>
          Plus
        </a>
      </nav>

      {menuOpen && (
        <>
          <div className="sheet-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="sheet" role="dialog" aria-label="Toutes les pages">
            <div className="sheet-grab" />
            <div className="sheet-grid">
              {ALL_PAGES.map(([p, label, ico]) => (
                <a key={p} href={`#/${p}`} className={`sheet-tile ${isActive(p) ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                  <span className="st-ico">{ico}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function App() {
  return <StoreProvider><Shell /></StoreProvider>
}
