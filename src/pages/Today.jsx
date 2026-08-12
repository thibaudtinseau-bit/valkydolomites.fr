import React, { useState, useMemo } from 'react'
import { byId, NEW_LOCATIONS, getPhotos } from '../data/locations'
import { basesById } from '../data/bases'
import { NIGHT_SPOTS, NIGHT_BY_DATE, HOME } from '../data/nightspots'
import { POIS } from '../data/pois'
import { WEBCAMS } from '../data/webcams'
import { DAY_CHECKLIST } from '../data/daychecklist'
import { TRIP_START } from '../data/planning'
import { useStore } from '../store'
import { useHourlyWeather, wmo, stormRisk, dayScore } from '../hooks'
import { haversineKm, driveMinEstimate, nearest, fmtMin } from '../geo'
import { Stars } from '../components/ui'

const spotById = Object.fromEntries([...NIGHT_SPOTS, [HOME].find(Boolean)].map((s) => [s.id, s]))
spotById.home = HOME
const nightFor = (dateISO) => spotById[NIGHT_BY_DATE[dateISO]] || null
const prevISO = (iso) => { const d = new Date(iso + 'T12:00'); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10) }

export default function Today() {
  const { plan, dayCheck, setDayCheck, todayOverride, setTodayOverride, done } = useStore()
  const todayISO = new Date().toISOString().slice(0, 10)
  const autoIdx = plan.findIndex((d) => d.date === todayISO)
  const idx = todayOverride != null ? todayOverride : (autoIdx >= 0 ? autoIdx : 0)
  const day = plan[idx]
  const beforeTrip = autoIdx < 0 && todayISO < TRIP_START

  const sleptAt = nightFor(prevISO(day.date))
  const sleepAt = nightFor(day.date)
  const mainSpot = day.spots.map((id) => byId[id]).find((l) => l && l.status === 'new') || (day.spots[0] && byId[day.spots[0]])
  const planB = day.planB && byId[day.planB]
  const wxCoords = mainSpot?.coords || sleepAt?.coords || [46.55, 11.95]
  const wx = useHourlyWeather(wxCoords[0], wxCoords[1])

  // Index météo du jour affiché dans les données horaires
  const wxDayIdx = wx?.daily?.time ? Math.max(0, wx.daily.time.indexOf(day.date)) : 0
  const isForecastReal = wx?.daily?.time?.includes(day.date)
  const storm = wx && isForecastReal ? stormRisk(wx.hourly, wxDayIdx) : null
  const score = wx?.daily && isForecastReal ? dayScore(wx.daily, wxDayIdx) : null

  const origin = sleptAt?.coords || wxCoords
  // Les POI ne couvrent que le corridor du voyage : au-delà de 80 km on n'affiche rien de trompeur.
  const near = (cat) => {
    const r = nearest(origin, POIS.filter((p) => p.cat === cat), (p) => p.coords)
    return r && r.km <= 80 ? r : null
  }
  const fuel = useMemo(() => near('essence'), [origin])
  const market = useMemo(() => near('supermarche'), [origin])
  const service = useMemo(() => near('aire'), [origin])
  const base = basesById[day.base]
  const sectorCams = WEBCAMS.filter((w) => w.img).slice(0, 1)

  // Checklist du matin (remise à zéro si nouvelle date)
  const check = dayCheck.date === day.date ? dayCheck.done : []
  const toggleDayCheck = (id) =>
    setDayCheck({ date: day.date, done: check.includes(id) ? check.filter((x) => x !== id) : [...check, id] })

  const hourly = wx?.hourly
  const hours = useMemo(() => {
    if (!hourly?.time || !isForecastReal) return []
    const from = wxDayIdx * 24
    return Array.from({ length: 16 }, (_, i) => from + 6 + i) // 6h → 21h
      .filter((h) => h < hourly.time.length)
      .map((h) => ({
        t: hourly.time[h].slice(11, 16),
        temp: Math.round(hourly.temperature_2m[h]),
        code: hourly.weather_code[h],
        rain: hourly.precipitation_probability?.[h] ?? 0,
        wind: Math.round(hourly.wind_speed_10m[h]),
        iso0: hourly.freezing_level_height?.[h],
      }))
  }, [hourly, wxDayIdx, isForecastReal])

  const sunrise = wx?.daily?.sunrise?.[wxDayIdx]?.slice(-5)
  const sunset = wx?.daily?.sunset?.[wxDayIdx]?.slice(-5)

  return (
    <div className="page fade-in">
      <div className="eyebrow">{beforeTrip ? 'Aperçu du voyage' : 'Le tableau de bord du matin'}</div>
      <div className="section-head" style={{ marginBottom: 4 }}>
        <h2>Aujourd’hui {autoIdx === idx && autoIdx >= 0 ? '' : `· J${idx + 1}`}</h2>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button className="rank-tab" onClick={() => setTodayOverride(Math.max(0, idx - 1))}>←</button>
          <button className="rank-tab" onClick={() => setTodayOverride(null)} title="Revenir au jour réel">●</button>
          <button className="rank-tab" onClick={() => setTodayOverride(Math.min(plan.length - 1, idx + 1))}>→</button>
        </div>
      </div>
      <p style={{ color: 'var(--text-2)', fontSize: 14.5, marginBottom: 14 }}>
        <b style={{ color: 'var(--accent)' }}>J{idx + 1}</b> · {new Date(day.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} — <b>{day.title}</b>
        {beforeTrip && <> · départ dans <b style={{ color: 'var(--accent)' }}>{Math.ceil((new Date(TRIP_START) - new Date()) / 86400000)} jours</b> (navigue avec ← →)</>}
      </p>

      {/* Nuits + trajet */}
      <div className="grid cols-3" style={{ marginBottom: 14 }}>
        <div className="card pad">
          <div className="eyebrow">📍 On a dormi</div>
          <b style={{ fontSize: 15 }}>{sleptAt?.name || '—'}</b>
          {sleptAt?.gps && <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>GPS {sleptAt.gps}</div>}
        </div>
        <div className="card pad">
          <div className="eyebrow">🚐 Ce soir on dort</div>
          <b style={{ fontSize: 15 }}>{sleepAt?.name || '—'}</b>
          {sleepAt && sleepAt.id !== 'home' && (
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>
              {sleepAt.type} · 📶 4G {sleepAt.sun4g}/5 · <a href={`https://www.google.com/maps/search/?api=1&query=${sleepAt.coords[0]},${sleepAt.coords[1]}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>GPS {sleepAt.gps}</a>
            </div>
          )}
        </div>
        <div className="card pad">
          <div className="eyebrow">🚗 Route du jour</div>
          {day.drive ? (
            <>
              <b style={{ fontSize: 15 }}>{day.drive.km} km · {fmtMin(day.drive.min)}</b>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{day.drive.label}</div>
            </>
          ) : <b style={{ fontSize: 15 }}>Journée sur place</b>}
        </div>
      </div>

      {/* Rando du jour */}
      {mainSpot && (
        <a className="card" href={`#/lieu/${mainSpot.id}`} style={{ display: 'flex', gap: 14, padding: 14, marginBottom: 14, alignItems: 'center' }}>
          {getPhotos(mainSpot.id)[0] && <img src={getPhotos(mainSpot.id)[0].thumb} alt="" style={{ width: 92, height: 92, borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="eyebrow">🥾 {mainSpot.status === 'visited' ? 'Étape du jour' : 'La rando du jour'}</div>
            <b style={{ fontSize: 17 }}>{mainSpot.name}</b>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 3 }}>
              {mainSpot.rating > 0 && <><Stars n={mainSpot.rating} /> · </>}
              {mainSpot.hike.distanceKm > 0 && <>{mainSpot.hike.distanceKm} km · {mainSpot.hike.dplusM} m D+ · {mainSpot.hike.timeH} · </>}
              🐶 {mainSpot.dog.stars}/5
              {done.includes(mainSpot.id) && <b style={{ color: 'var(--green)' }}> · ✓ faite</b>}
            </div>
            {day.spots.length > 1 && (
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>
                + {day.spots.filter((s) => s !== mainSpot.id).map((s) => byId[s]?.name).filter(Boolean).join(' · ')}
              </div>
            )}
          </div>
          <span style={{ color: 'var(--accent)', fontWeight: 800 }}>→</span>
        </a>
      )}

      {/* Météo heure par heure */}
      <div className="card pad" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
          <h3 style={{ fontWeight: 850, fontSize: 16 }}>🌤️ Météo {mainSpot ? `à ${mainSpot.name}` : 'du secteur'}</h3>
          {score != null && <span className="tag" style={{ color: score >= 70 ? 'var(--green)' : score >= 45 ? '#eab308' : 'var(--red)' }}>Score montagne {score}/100</span>}
        </div>
        {!isForecastReal && <p className="notice">Prévisions disponibles à J-7 : cette journée est encore hors fenêtre Open-Meteo. Reviens plus près du départ ✨</p>}
        {storm && (
          <div className="patou-banner" style={{ background: storm.color + '14', marginBottom: 10 }}>
            <div className="patou-dot" style={{ background: storm.color, color: storm.color }} />
            <b style={{ fontSize: 14 }}>{storm.emoji} {storm.label}</b>
          </div>
        )}
        {hours.length > 0 && (
          <div className="wx-strip">
            {hours.map((h) => (
              <div key={h.t} className="wx-day" style={{ minWidth: 72 }}>
                <div className="w-d">{h.t}</div>
                <div className="w-i" style={{ fontSize: 21 }}>{wmo(h.code)[0]}</div>
                <div className="w-t">{h.temp}°</div>
                <div className="w-x">🌧 {h.rain}%</div>
                <div className="w-x">💨 {h.wind}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 10, fontSize: 13.5, color: 'var(--text-2)', fontWeight: 600 }}>
          {sunrise && <span>🌅 Lever {sunrise}</span>}
          {sunset && <span>🌇 Coucher {sunset}</span>}
          {hours[4]?.iso0 != null && <span>❄️ Iso 0° ≈ {Math.round(hours[4].iso0 / 100) * 100} m</span>}
          {wx?.daily?.snowfall_sum?.[wxDayIdx] > 0 && <span style={{ color: 'var(--red)' }}>🌨 Neige {wx.daily.snowfall_sum[wxDayIdx].toFixed(0)} cm</span>}
        </div>
        {planB && score != null && score < 50 && (
          <a href={`#/lieu/${planB.id}`} className="link-btn" style={{ marginTop: 12, borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            ☂️ Météo moyenne → Plan B : {planB.name}
          </a>
        )}
      </div>

      {/* Pratique du jour */}
      {(market || fuel || service || sleepAt?.services?.eau) && (
        <div className="grid cols-3" style={{ marginBottom: 14 }}>
          <div className="card pad">
            <div className="eyebrow">🛒 Courses</div>
            {market
              ? <><b style={{ fontSize: 14 }}>{market.item.name}</b><div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>≈ {Math.round(market.km * 1.4)} km · <a href={market.item.gmaps} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Y aller</a></div></>
              : <b style={{ fontSize: 13.5, color: 'var(--text-2)' }}>Sur la route de l’étape</b>}
            {base && <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6 }}>{base.groceries[0]}</div>}
          </div>
          <div className="card pad">
            <div className="eyebrow">⛽ Essence la + proche</div>
            {fuel
              ? <><b style={{ fontSize: 14 }}>{fuel.item.name}</b><div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>≈ {Math.round(fuel.km * 1.4)} km · <a href={fuel.item.gmaps} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Y aller</a></div></>
              : <b style={{ fontSize: 13.5, color: 'var(--text-2)' }}>Autoroute — pleins aux stations d’étape</b>}
          </div>
          <div className="card pad">
            <div className="eyebrow">💧 Eau & 🚽 vidange</div>
            {sleepAt?.services?.eau
              ? <b style={{ fontSize: 14, color: 'var(--green)' }}>✓ Au spot de ce soir</b>
              : service
                ? <><b style={{ fontSize: 14 }}>{service.item.name}</b><div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>≈ {Math.round(service.km * 1.4)} km · <a href={service.item.gmaps} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Y aller</a></div></>
                : <b style={{ fontSize: 13.5, color: 'var(--text-2)' }}>Aire d’étape ce soir</b>}
          </div>
        </div>
      )}

      {/* Webcam + note du jour */}
      <div className="detail-grid" style={{ marginBottom: 14 }}>
        <div className="card pad">
          <h3 style={{ fontWeight: 850, fontSize: 16, marginBottom: 8 }}>📝 Le plan du jour</h3>
          <p style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.65 }}>{day.note}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            <a className="link-btn" href="#/assistant">🤔 Que faire aujourd’hui ?</a>
            <a className="link-btn" href="#/autour">📍 Autour du camp</a>
            <a className="link-btn" href="#/webcams">📷 Webcams</a>
            <a className="link-btn" href="#/planning">📅 Planning</a>
          </div>
        </div>
        {sectorCams.map((cam) => (
          <a key={cam.id} className="card" href="#/webcams" style={{ overflow: 'hidden' }}>
            <img src={cam.img} alt={cam.name} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} loading="lazy" />
            <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>📷 {cam.name} — en direct<div style={{ fontSize: 11.5, color: 'var(--text-3)', fontWeight: 600, marginTop: 2 }}>Toutes les webcams →</div></div>
          </a>
        ))}
      </div>

      {/* Checklist avant de rouler */}
      <div className="card pad">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
          <h3 style={{ fontWeight: 850, fontSize: 16 }}>✅ Avant de rouler</h3>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: check.length === DAY_CHECKLIST.length ? 'var(--green)' : 'var(--text-3)' }}>
            {check.length}/{DAY_CHECKLIST.length}{check.length === DAY_CHECKLIST.length ? ' — en route ! 🚐💨' : ''}
          </span>
        </div>
        <div className="trait-grid">
          {DAY_CHECKLIST.map((c) => (
            <button key={c.id} className={`trait ${check.includes(c.id) ? '' : 'off'}`} style={check.includes(c.id) ? { borderColor: 'var(--green)', textDecoration: 'none' } : { opacity: 0.6, textDecoration: 'none' }} onClick={() => toggleDayCheck(c.id)}>
              {check.includes(c.id) ? '✅' : '⬜'} {c.text.replace(/^[^ ]+ /, '')}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10 }}>Se remet à zéro automatiquement chaque nouveau jour.</p>
      </div>
    </div>
  )
}
