import React, { useEffect } from 'react'
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
import Favorites from './pages/Favorites'
import MapView from './components/MapView'

const NAV = [
  ['', 'Accueil', '🏔️'],
  ['carte', 'Carte', '🗺️'],
  ['lieux', 'Lieux', '🥾'],
  ['planning', 'Planning', '📅'],
  ['favoris', 'Carnet', '♥'],
]
const NAV_DESKTOP = [
  ['', 'Accueil'], ['carte', 'Carte'], ['lieux', 'Randonnées'], ['planning', 'Planning'],
  ['itineraire', 'Itinéraire'], ['meteo', 'Météo'], ['soleil', 'Golden hour'], ['classements', 'Classements'],
  ['bases', 'Bases'], ['camping-car', 'Camping-car'], ['favoris', 'Carnet'],
]

function Shell() {
  const route = useRoute()
  const { theme, setTheme } = useStore()
  const [page, param] = route

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
      </nav>
    </div>
  )
}

export default function App() {
  return <StoreProvider><Shell /></StoreProvider>
}
