import React, { useState } from 'react'
import { BASES } from '../data/bases'
import { NEW_LOCATIONS, getPhotos } from '../data/locations'
import { useWeather, useHourlyWeather, wmo, dayScore, stormRisk } from '../hooks'
import { Stars } from '../components/ui'

// Zoom détaillé sur 4 horizons : aujourd'hui, demain, +3 j, +7 j
function DayZoom({ hwx }) {
  if (!hwx?.daily) return null
  const targets = [[0, 'Aujourd’hui'], [1, 'Demain'], [3, 'Dans 3 jours'], [7, 'Dans 7 jours']]
  return (
    <div className="grid cols-2" style={{ marginTop: 14 }}>
      {targets.map(([i, label]) => {
        if (!hwx.daily.time[i]) return null
        const [ico, desc] = wmo(hwx.daily.weather_code[i])
        const storm = stormRisk(hwx.hourly, i)
        const midday = i * 24 + 13
        const iso0 = hwx.hourly?.freezing_level_height?.[midday]
        const visi = hwx.hourly?.visibility?.[midday]
        const score = dayScore(hwx.daily, i)
        return (
          <div key={i} className="card pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <h3 style={{ fontWeight: 850, fontSize: 15.5 }}>{label} <span style={{ color: 'var(--text-3)', fontWeight: 600, fontSize: 12.5 }}>· {new Date(hwx.daily.time[i] + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })}</span></h3>
              <span className="tag" style={{ color: score >= 70 ? 'var(--green)' : score >= 45 ? '#eab308' : 'var(--red)' }}>{score}/100</span>
            </div>
            <div style={{ fontSize: 15, margin: '8px 0 4px' }}>{ico} <b>{desc}</b> · {Math.round(hwx.daily.temperature_2m_max[i])}° / {Math.round(hwx.daily.temperature_2m_min[i])}°</div>
            <div className="kv"><span className="k">💨 Vent / rafales</span><span className="v">{Math.round(hwx.daily.wind_speed_10m_max[i])} / {Math.round(hwx.daily.wind_gusts_10m_max?.[i] || 0)} km/h</span></div>
            <div className="kv"><span className="k">🌧 Pluie</span><span className="v">{hwx.daily.precipitation_sum[i]?.toFixed(1)} mm · {hwx.daily.precipitation_probability_max?.[i] ?? 0}%</span></div>
            {hwx.daily.snowfall_sum[i] > 0 && <div className="kv"><span className="k">❄️ Neige</span><span className="v" style={{ color: 'var(--red)' }}>{hwx.daily.snowfall_sum[i].toFixed(0)} cm</span></div>}
            {storm && <div className="kv"><span className="k">🌩️ Orage</span><span className="v" style={{ color: storm.color }}>{storm.emoji} {storm.label}</span></div>}
            {iso0 != null && <div className="kv"><span className="k">❄️ Iso 0°</span><span className="v">≈ {Math.round(iso0 / 100) * 100} m</span></div>}
            {visi != null && <div className="kv"><span className="k">👁 Visibilité</span><span className="v">{visi >= 20000 ? 'Excellente' : visi >= 10000 ? 'Bonne' : visi >= 4000 ? 'Moyenne' : 'Faible'} ({Math.round(visi / 1000)} km)</span></div>}
          </div>
        )
      })}
    </div>
  )
}

// Suggestion : score météo du jour × profil du lieu.
// Beau temps sec → sommets/crêtes ; moyen → mi-hauteur ; pluie → vallées & forêts.
function suggestFor(daily, i) {
  const score = dayScore(daily, i)
  const wind = daily.wind_speed_10m_max?.[i] ?? 0
  const snow = daily.snowfall_sum?.[i] ?? 0
  const ranked = NEW_LOCATIONS
    .filter((l) => !l.avoidDog && l.hike.distanceKm > 0)
    .map((l) => {
      let s = l.rating * 10
      const high = l.hike.altMaxM >= 2400
      const sheltered = l.dog.traits.foret || l.hike.altMaxM < 2100
      if (score >= 70) s += high ? 25 : 0                    // grand beau : viser haut
      else if (score >= 45) s += !high ? 18 : -8             // mitigé : mi-hauteur
      else s += sheltered ? 30 : -25                          // mauvais : forêt/vallée
      if (wind > 45 && high) s -= 20                          // crêtes ventées
      if (snow > 1 && l.hike.altMaxM > 2500) s -= 25          // neige fraîche en altitude
      s += l.dog.stars * 2
      return { l, s }
    })
    .sort((a, b) => b.s - a.s)
  return { score, top: ranked.slice(0, 3).map((r) => r.l) }
}

const DAY_LABELS = ['Aujourd’hui', 'Demain', 'Après-demain']

export default function Weather() {
  const [baseIdx, setBaseIdx] = useState(0)
  const base = BASES[baseIdx]
  const { data: wx, error } = useWeather(base.coords[0], base.coords[1])
  const hwx = useHourlyWeather(base.coords[0], base.coords[1])

  return (
    <div className="page fade-in">
      <div className="eyebrow">Open-Meteo · prévisions 7 jours</div>
      <div className="section-head" style={{ marginBottom: 12 }}>
        <h2>Météo montagne</h2>
      </div>
      <div className="filters">
        {BASES.map((b, i) => (
          <button key={b.id} className={`rank-tab ${i === baseIdx ? 'active' : ''}`} onClick={() => setBaseIdx(i)}>{b.name}</button>
        ))}
      </div>

      {error && <div className="empty">Impossible de charger la météo (hors-ligne ?). Les dernières prévisions consultées s’affichent quand elles existent.</div>}

      {wx?.daily && (
        <>
          <div className="wx-strip" style={{ marginTop: 8 }}>
            {wx.daily.time.map((t, i) => {
              const [ico, label] = wmo(wx.daily.weather_code[i])
              return (
                <div key={t} className="wx-day" title={label}>
                  <div className="w-d">{new Date(t + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}</div>
                  <div className="w-i">{ico}</div>
                  <div className="w-t">{Math.round(wx.daily.temperature_2m_max[i])}° <small>{Math.round(wx.daily.temperature_2m_min[i])}°</small></div>
                  <div className="w-x">💨 {Math.round(wx.daily.wind_speed_10m_max[i])} km/h</div>
                  <div className="w-x">🌧 {wx.daily.precipitation_sum[i]?.toFixed(1)} mm{wx.daily.snowfall_sum[i] > 0 ? ` · ❄️ ${wx.daily.snowfall_sum[i].toFixed(0)} cm` : ''}</div>
                </div>
              )
            })}
          </div>

          <DayZoom hwx={hwx} />

          <div className="section">
            <div className="section-head"><h2>Le site te suggère</h2></div>
            <div style={{ display: 'grid', gap: 12 }}>
              {[0, 1, 2].map((i) => {
                if (!wx.daily.time[i]) return null
                const { score, top } = suggestFor(wx.daily, i)
                const [ico, label] = wmo(wx.daily.weather_code[i])
                return (
                  <div key={i} className="card pad">
                    <div className="suggest-day">
                      {DAY_LABELS[i]} · {ico} {label} · score montagne {score}/100
                    </div>
                    <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
                      {top.map((l, j) => {
                        const photo = getPhotos(l.id)[0]
                        return (
                          <a key={l.id} className="card suggest-card" href={`#/lieu/${l.id}`}>
                            {photo && <img src={photo.thumb || photo.url} alt="" loading="lazy" />}
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: 12, fontWeight: 800, color: j === 0 ? 'var(--gold)' : 'var(--text-3)' }}>{j === 0 ? '★ Premier choix' : `Option ${j + 1}`}</div>
                              <div style={{ fontWeight: 800, fontSize: 16 }}>{l.name}</div>
                              <div style={{ fontSize: 12.5, color: 'var(--text-2)' }}><Stars n={l.rating} /> · {l.hike.distanceKm} km · {l.hike.dplusM} m D+ · 🐶 {l.dog.stars}/5</div>
                            </div>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="notice" style={{ marginTop: 14 }}>
              Logique : grand beau sec → crêtes et sommets (Tre Cime, Seceda, Piz Boè) · temps mitigé → balcons de mi-hauteur ·
              pluie/neige → vallées abritées et forêts (Vallunga, Adolf Munkel). Le vent fort déclasse les crêtes, la neige fraîche déclasse les hauts sommets.
            </p>
          </div>
        </>
      )}
      {!wx && !error && <div className="empty">Chargement des prévisions…</div>}
    </div>
  )
}
