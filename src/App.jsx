import React, { useEffect, useState } from 'react'
import { useRoute } from './hooks'
import { StoreProvider, useStore } from './store'
import Home from './pages/Home'
import Places from './pages/Places'
import PlaceDetail from './pages/PlaceDetail'
import Planning from './pages/Planning'
import Weather from './pages/Weather'
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
// Navigation groupée : mêmes groupes sur desktop (menus déroulants) et mobile (sections du panneau)
const NAV_GROUPS = [
  { label: 'Aujourd’hui', to: 'jour', icon: '☀️' },
  { label: 'Carte', to: 'carte', icon: '🗺️' },
  {
    label: 'Découvrir', icon: '🥾',
    items: [
      ['lieux', 'Randonnées & lieux', '🥾'],
      ['classements', 'Classements & golden hour', '🏆'],
      ['bases', 'Camps de base', '⛺'],
    ],
  },
  {
    label: 'Planifier', icon: '📅',
    items: [
      ['planning', 'Planning des 16 jours', '📅'],
      ['itineraire', 'Itinéraire & km', '🚗'],
      ['assistant', 'Que faire aujourd’hui ?', '🤔'],
      ['autour', 'Autour du camp', '📍'],
    ],
  },
  {
    label: 'Conditions', icon: '🌤️',
    items: [
      ['meteo', 'Météo détaillée', '🌤️'],
      ['webcams', 'Webcams en direct', '📷'],
    ],
  },
  {
    label: 'Pratique', icon: '🚐',
    items: [
      ['camping-car', 'Guide camping-car', '🚐'],
      ['nuits', 'Spots de nuit', '🌙'],
      ['couts', 'Coûts & budget', '💶'],
      ['documents', 'Documents', '📄'],
    ],
  },
  { label: 'Carnet', to: 'favoris', icon: '♥' },
]
const SHEET_SECTIONS = [
  { title: 'Essentiels', items: [['jour', 'Aujourd’hui', '☀️'], ['carte', 'Carte', '🗺️'], ['lieux', 'Randonnées', '🥾'], ['planning', 'Planning', '📅'], ['favoris', 'Carnet', '♥'], ['', 'Accueil', '🏔️']] },
  { title: 'Planifier', items: [['assistant', 'Que faire ?', '🤔'], ['autour', 'Autour du camp', '📍'], ['itineraire', 'Itinéraire', '🚗']] },
  { title: 'Conditions', items: [['meteo', 'Météo', '🌤️'], ['webcams', 'Webcams', '📷']] },
  { title: 'Découvrir & pratique', items: [['classements', 'Classements', '🏆'], ['bases', 'Bases', '⛺'], ['camping-car', 'Camping-car', '🚐'], ['nuits', 'Spots de nuit', '🌙'], ['couts', 'Coûts', '💶'], ['documents', 'Documents', '📄']] },
]

function Shell() {
  const route = useRoute()
  const { theme, setTheme } = useStore()
  const [page, param] = route
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(null)

  useEffect(() => { setMenuOpen(false); setDropOpen(null) }, [page, param])
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : '' }, [menuOpen])
  useEffect(() => {
    if (dropOpen == null) return
    const close = (e) => { if (!e.target.closest('.navdrop')) setDropOpen(null) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [dropOpen])

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
      case 'soleil': return <Rankings />
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
          {NAV_GROUPS.map((g) => {
            if (g.to != null) {
              return <a key={g.label} href={`#/${g.to}`} className={isActive(g.to) ? 'active' : ''}>{g.label}</a>
            }
            const childActive = g.items.some(([p]) => isActive(p))
            const open = dropOpen === g.label
            return (
              <div key={g.label} className="navdrop">
                <button className={`navdrop-btn ${childActive ? 'active' : ''} ${open ? 'open' : ''}`}
                  onClick={() => setDropOpen(open ? null : g.label)}>
                  {g.label} <span style={{ fontSize: 9, opacity: 0.7 }}>▼</span>
                </button>
                {open && (
                  <div className="navdrop-panel">
                    {g.items.map(([p, label, ico]) => (
                      <a key={p} href={`#/${p}`} className={isActive(p) ? 'active' : ''}>
                        <span style={{ width: 22, display: 'inline-block' }}>{ico}</span>{label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
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
            {SHEET_SECTIONS.map((sec) => (
              <div key={sec.title}>
                <div className="sheet-title">{sec.title}</div>
                <div className="sheet-grid">
                  {sec.items.map(([p, label, ico]) => (
                    <a key={p} href={`#/${p}`} className={`sheet-tile ${isActive(p) ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                      <span className="st-ico">{ico}</span>
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function App() {
  return <StoreProvider><Shell /></StoreProvider>
}
