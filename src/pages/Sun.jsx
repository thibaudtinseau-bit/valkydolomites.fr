import React, { useState } from 'react'
import { LOCATIONS, getPhotos } from '../data/locations'
import { useWeather } from '../hooks'

export default function Sun() {
  const [mode, setMode] = useState('sunset')
  const { data: wx } = useWeather(46.55, 11.95)
  const key = mode === 'sunset' ? 'sunset' : 'sunrise'
  const list = [...LOCATIONS]
    .filter((l) => l[key] >= 5)
    .sort((a, b) => b[key] - a[key])
    .slice(0, 20)

  const todaySun = wx?.daily?.[key]?.[0]?.slice(-5)

  return (
    <div className="page fade-in">
      <div className="eyebrow">Golden hours</div>
      <div className="section-head" style={{ marginBottom: 12 }}>
        <h2>{mode === 'sunset' ? 'Couchers' : 'Levers'} de soleil</h2>
        <div className="pill-toggle">
          <button className={mode === 'sunset' ? 'on' : ''} onClick={() => setMode('sunset')}>🌇 Couchers</button>
          <button className={mode === 'sunrise' ? 'on' : ''} onClick={() => setMode('sunrise')}>🌅 Levers</button>
        </div>
      </div>
      {todaySun && (
        <p style={{ color: 'var(--text-2)', fontSize: 14.5, marginBottom: 16 }}>
          Aujourd’hui dans les Dolomites, le {mode === 'sunset' ? 'coucher' : 'lever'} est à <b style={{ color: 'var(--accent)' }}>{todaySun}</b>.
          Être en place 45 min avant, partir 30 min après : c’est là que la dolomie s’embrase (enrosadira).
        </p>
      )}
      <div className="card" style={{ padding: '6px 10px' }}>
        {list.map((l, i) => {
          const photo = getPhotos(l.id)[0]
          return (
            <a key={l.id} className="rank-row" href={`#/lieu/${l.id}`}>
              <div className={`rank-pos ${i < 3 ? 'top' : ''}`}>{i + 1}</div>
              {photo && <img src={photo.thumb || photo.url} alt="" loading="lazy" />}
              <div className="rank-main">
                <h4>{l.name}{l.status === 'visited' ? ' · ✓ déjà vu' : ''}</h4>
                <p>{l.tagline}</p>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)', flexShrink: 0 }}>{l[key]}/10</div>
            </a>
          )
        })}
      </div>
      <p className="notice" style={{ marginTop: 14 }}>
        Nos scores {mode === 'sunset' ? 'couchers' : 'levers'} privilégient l’orientation des parois, l’accès possible à l’heure dorée
        (nuit en camping-car à proximité, téléphérique tardif…) et le premier plan. Les lieux « déjà vus » restent listés à titre de mémoire.
      </p>
    </div>
  )
}
