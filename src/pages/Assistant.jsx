import React, { useState, useMemo } from 'react'
import { NEW_LOCATIONS, getPhotos } from '../data/locations'
import { NIGHT_SPOTS, HOME } from '../data/nightspots'
import { useHourlyWeather, dayScore, stormRisk, wmo } from '../hooks'
import { driveMinEstimate, fmtMin } from '../geo'
import { Stars, PatouBadge } from '../components/ui'

const DIFFS = [['toutes', 'Peu importe'], ['Facile', 'Facile'], ['Moyen', 'Moyenne'], ['Difficile', 'Sportive']]
const RADII = [[30, '≤ 30 min'], [45, '≤ 45 min'], [60, '≤ 1h'], [999, 'Peu importe']]

export default function Assistant() {
  const [spotId, setSpotId] = useState('selva')
  const [maxDrive, setMaxDrive] = useState(45)
  const [diff, setDiff] = useState('toutes')
  const [avoidCrowd, setAvoidCrowd] = useState(false)
  const [avoidPatou, setAvoidPatou] = useState(true)
  const origin = (NIGHT_SPOTS.find((s) => s.id === spotId) || HOME)
  const wx = useHourlyWeather(origin.coords[0], origin.coords[1])
  const score = wx?.daily ? dayScore(wx.daily, 0) : 60
  const storm = wx ? stormRisk(wx.hourly, 0) : null

  const results = useMemo(() => {
    return NEW_LOCATIONS
      .filter((l) => !l.avoidDog && l.hike.distanceKm > 0)
      .map((l) => {
        const driveMin = driveMinEstimate(origin.coords, l.coords)
        let s = l.rating * 12 + l.dog.stars * 3
        // Météo
        const high = l.hike.altMaxM >= 2400
        const sheltered = l.dog.traits.foret || l.hike.altMaxM < 2100
        if (score >= 70) s += high ? 22 : 0
        else if (score >= 45) s += !high ? 15 : -10
        else s += sheltered ? 28 : -30
        if (storm?.level >= 2 && high) s -= 25
        // Contraintes
        if (driveMin > maxDrive) s -= 1000
        if (diff !== 'toutes' && l.hike.difficulty !== diff) s -= 1000
        if (avoidCrowd) s -= l.crowd * 6
        if (avoidPatou) s -= l.patou.level * 12
        s -= driveMin * 0.25
        return { l, driveMin, s }
      })
      .filter((r) => r.s > -500)
      .sort((a, b) => b.s - a.s)
      .slice(0, 5)
  }, [origin, score, storm, maxDrive, diff, avoidCrowd, avoidPatou])

  return (
    <div className="page fade-in">
      <div className="eyebrow">Le copilote</div>
      <div className="section-head" style={{ marginBottom: 10 }}><h2>Que faire aujourd’hui ?</h2></div>

      <div className="card pad" style={{ marginBottom: 14 }}>
        <div className="base-section">
          <h4>🚐 On dort à</h4>
          <div className="filters" style={{ paddingBottom: 4 }}>
            {NIGHT_SPOTS.map((s) => (
              <button key={s.id} className={`rank-tab ${spotId === s.id ? 'active' : ''}`} onClick={() => setSpotId(s.id)}>
                {s.name.split('(')[0].replace(/^(Aire|Area sosta|Camping|Parking|Barrage) (de |d’|du |des )?/i, '').trim().split(' /')[0]}
              </button>
            ))}
          </div>
          <h4>🚗 Route acceptée</h4>
          <div className="filters" style={{ paddingBottom: 4 }}>
            {RADII.map(([v, label]) => (
              <button key={v} className={`rank-tab ${maxDrive === v ? 'active' : ''}`} onClick={() => setMaxDrive(v)}>{label}</button>
            ))}
          </div>
          <h4>🥾 Difficulté</h4>
          <div className="filters" style={{ paddingBottom: 4 }}>
            {DIFFS.map(([v, label]) => (
              <button key={v} className={`rank-tab ${diff === v ? 'active' : ''}`} onClick={() => setDiff(v)}>{label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
            <button className={`rank-tab ${avoidCrowd ? 'active' : ''}`} onClick={() => setAvoidCrowd(!avoidCrowd)}>🤫 Éviter la foule</button>
            <button className={`rank-tab ${avoidPatou ? 'active' : ''}`} onClick={() => setAvoidPatou(!avoidPatou)}>🐑 Éviter les patous</button>
          </div>
        </div>
        {wx?.daily && (
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 12 }}>
            Météo prise en compte : {wmo(wx.daily.weather_code[0])[0]} {wmo(wx.daily.weather_code[0])[1].toLowerCase()},
            score montagne <b>{score}/100</b>{storm ? <> · {storm.emoji} {storm.label.toLowerCase()}</> : null}.
          </p>
        )}
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {results.map(({ l, driveMin }, i) => {
          const photo = getPhotos(l.id)[0]
          return (
            <a key={l.id} className="card suggest-card" href={`#/lieu/${l.id}`}>
              {photo && <img src={photo.thumb || photo.url} alt="" loading="lazy" />}
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: i === 0 ? 'var(--gold)' : 'var(--text-3)' }}>
                  {i === 0 ? '★ Le meilleur choix' : `Option ${i + 1}`} · 🚗 ≈ {fmtMin(driveMin)}
                </div>
                <div style={{ fontWeight: 800, fontSize: 16.5 }}>{l.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', marginTop: 2 }}>
                  <Stars n={l.rating} /> · {l.hike.distanceKm} km · {l.hike.dplusM} m D+ · {l.hike.difficulty} · 🐶 {l.dog.stars}/5 · patous niv. {l.patou.level}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.tagline}</div>
              </div>
            </a>
          )
        })}
        {results.length === 0 && <div className="empty">Aucune rando ne colle à ces critères — élargis le rayon ou la difficulté 😉</div>}
      </div>
    </div>
  )
}
