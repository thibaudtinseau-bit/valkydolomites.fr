import React from 'react'
import { LOCATIONS, getPhotos, NEW_LOCATIONS } from '../data/locations'
import { BASES } from '../data/bases'
import { PlaceCard } from './Places'
import { useStore } from '../store'
import { useWeather, wmo, dayScore } from '../hooks'
import { TRIP_START } from '../data/planning'

function daysToGo() {
  const d = Math.ceil((new Date(TRIP_START + 'T00:00:00') - new Date()) / 86400000)
  return d
}

export default function Home() {
  const heroPhoto = getPhotos('seceda')[0]
  const { data: wx } = useWeather(46.55, 11.95)
  const top = NEW_LOCATIONS.filter((l) => l.rating === 5)
  const dtg = daysToGo()

  return (
    <div className="fade-in">
      <div className="hero">
        <div className="hero-bg" style={{ backgroundImage: heroPhoto ? `url(${heroPhoto.url})` : 'linear-gradient(160deg,#101a2e,#1f4d3a)' }} />
        <div className="hero-veil" />
        <div className="hero-inner">
          <span className="hero-kicker">🚐 17 septembre → 2 octobre 2026 · 🐶 avec Valky</span>
          <h1>Dolomites 2026</h1>
          <p>Notre road-trip en camping-car avec notre chien.</p>
          <div className="hero-cta">
            <a className="btn gold" href="#/lieux">Explorer</a>
            <a className="btn" href="#/carte">🗺️ Carte</a>
            <a className="btn" href="#/planning">📅 Planning</a>
            <a className="btn" href="#/lieux">🥾 Randonnées</a>
            <a className="btn" href="#/camping-car">🚐 Camping-car</a>
          </div>
        </div>
        <div className="hero-scroll">⌄</div>
      </div>

      <div className="page" style={{ paddingTop: 10 }}>
        {dtg > 0 && (
          <div className="card pad" style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow">Compte à rebours</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>J−{dtg} avant le départ</div>
            </div>
            {wx?.current && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 700 }}>En ce moment dans les Dolomites</div>
                <div style={{ fontSize: 19, fontWeight: 800 }}>{wmo(wx.current.weather_code)[0]} {Math.round(wx.current.temperature_2m)}°C · vent {Math.round(wx.current.wind_speed_10m)} km/h</div>
              </div>
            )}
          </div>
        )}

        <div className="section">
          <div className="section-head">
            <h2>Les incontournables</h2>
            <a className="more" href="#/lieux">Tout voir →</a>
          </div>
          <div className="grid cols-3">
            {top.map((l) => <PlaceCard key={l.id} loc={l} />)}
          </div>
        </div>

        <div className="section">
          <div className="section-head">
            <h2>Nos camps de base</h2>
            <a className="more" href="#/bases">Tout voir →</a>
          </div>
          <div className="grid cols-3">
            {BASES.filter((b) => b.id !== 'garda').map((b) => {
              const photo = b.spots[0] && getPhotos(b.spots[0])[1]
              return (
                <a key={b.id} className="place-card" href={`#/base/${b.id}`} style={{ aspectRatio: '4/2.4' }}>
                  {photo && <img src={photo.thumb || photo.url} alt={b.name} loading="lazy" />}
                  <div className="veil" />
                  <div className="pc-body">
                    <h3>{b.name}</h3>
                    <div className="pc-sub">{b.spots.length} lieux autour</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {wx?.daily && (
          <div className="section">
            <div className="section-head">
              <h2>Météo & suggestions</h2>
              <a className="more" href="#/meteo">Détails →</a>
            </div>
            <div className="wx-strip">
              {wx.daily.time.slice(0, 7).map((t, i) => {
                const [ico] = wmo(wx.daily.weather_code[i])
                const score = dayScore(wx.daily, i)
                return (
                  <div key={t} className="wx-day">
                    <div className="w-d">{new Date(t + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}</div>
                    <div className="w-i">{ico}</div>
                    <div className="w-t">{Math.round(wx.daily.temperature_2m_max[i])}° <small>{Math.round(wx.daily.temperature_2m_min[i])}°</small></div>
                    <div className="w-x">{score >= 70 ? '🏔️ Haute montagne' : score >= 45 ? '🌲 Mi-hauteur' : '☂️ Vallée'}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="section">
          <div className="section-head">
            <h2>Déjà découverts</h2>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: 14.5, marginBottom: 14, maxWidth: 640 }}>
            Braies, Carezza, Santa Maddalena, le Passo Giau… Ces lieux qu’on aime déjà restent sur la carte en gris —
            le but de 2026 est de vivre pleinement ce qu’on ne connaît pas encore.
          </p>
          <div className="grid cols-3">
            {LOCATIONS.filter((l) => l.status === 'visited').slice(0, 3).map((l) => <PlaceCard key={l.id} loc={l} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
