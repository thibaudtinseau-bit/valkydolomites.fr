import React, { useState } from 'react'
import { BASES } from '../data/bases'
import { NEW_LOCATIONS, getPhotos } from '../data/locations'
import { useWeather, wmo, dayScore } from '../hooks'
import { Stars } from '../components/ui'

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
