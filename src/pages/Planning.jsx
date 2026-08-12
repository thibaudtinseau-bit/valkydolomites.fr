import React, { useRef, useState } from 'react'
import { byId } from '../data/locations'
import { basesById } from '../data/bases'
import { DEFAULT_PLAN } from '../data/planning'
import { useStore } from '../store'
import { useWeather, wmo, dayScore } from '../hooks'

// Le planning garde les DATES fixes ; on réordonne le CONTENU des journées.
export default function Planning() {
  const { plan, setPlan } = useStore()
  const { data: wx } = useWeather(46.55, 11.95)
  const dragIdx = useRef(null)
  const [over, setOver] = useState(null)

  const move = (from, to) => {
    if (to < 0 || to >= plan.length || from === to) return
    setPlan((p) => {
      const next = [...p]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    })
  }

  const wxFor = (dateISO) => {
    if (!wx?.daily) return null
    const i = wx.daily.time.indexOf(dateISO)
    if (i < 0) return null
    return { ico: wmo(wx.daily.weather_code[i])[0], max: Math.round(wx.daily.temperature_2m_max[i]), score: dayScore(wx.daily, i) }
  }

  return (
    <div className="page fade-in">
      <div className="eyebrow">17 septembre → 2 octobre 2026</div>
      <div className="section-head" style={{ marginBottom: 6 }}>
        <h2>Planning — Montarnaud → Dolomites → Montarnaud</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <a className="rank-tab" href="#/itineraire">🗺️ Itinéraire & km</a>
          <button className="rank-tab" onClick={() => { if (confirm('Restaurer le planning d’origine ?')) setPlan(DEFAULT_PLAN) }}>↺</button>
        </div>
      </div>
      <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 16, maxWidth: 640 }}>
        Fais glisser une journée (ou utilise les flèches) pour réorganiser : les dates restent, le contenu bouge.
        La pastille météo apparaît quand la date entre dans la fenêtre de prévision à 7 jours.
      </p>
      <div style={{ display: 'grid', gap: 12 }}>
        {plan.map((day, i) => {
          const date = new Date(day.date + 'T12:00')
          const w = wxFor(day.date)
          const planB = day.planB && byId[day.planB]
          return (
            <div
              key={day.date}
              className={`card day-card ${over === i ? 'drag-over' : ''}`}
              draggable
              onDragStart={() => { dragIdx.current = i }}
              onDragOver={(e) => { e.preventDefault(); setOver(i) }}
              onDragLeave={() => setOver(null)}
              onDrop={(e) => { e.preventDefault(); move(dragIdx.current, i); setOver(null) }}
            >
              <div className="day-num">
                <div className="dn">J{i + 1}</div>
                <div className="dd">{date.toLocaleDateString('fr-FR', { weekday: 'short' })}<br />{date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                {w && <div style={{ marginTop: 6, fontSize: 17 }} title={`Score montagne ${w.score}/100`}>{w.ico}<div style={{ fontSize: 11, fontWeight: 700 }}>{w.max}°</div></div>}
              </div>
              <div className="day-body">
                <h3>{day.title}</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
                  {basesById[day.base] && (
                    <span style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700 }}>
                      Base : {basesById[day.base].name}
                    </span>
                  )}
                  {day.drive && (
                    <span className="drive-chip" title={day.drive.label}>
                      🚗 {day.drive.km} km · {day.drive.min >= 60 ? `${Math.floor(day.drive.min / 60)}h${String(day.drive.min % 60).padStart(2, '0')}` : `${day.drive.min} min`}
                    </span>
                  )}
                </div>
                <div className="day-spots">
                  {day.spots.map((id) => byId[id] && (
                    <a key={id} className="day-spot" href={`#/lieu/${id}`}>
                      {byId[id].status === 'visited' ? '✓ ' : ''}{byId[id].name}
                    </a>
                  ))}
                  {planB && <a className="day-spot" href={`#/lieu/${planB.id}`} style={{ opacity: .65 }}>☂️ Plan B : {planB.name}</a>}
                </div>
                <p className="day-note">{day.note}</p>
              </div>
              <div className="day-tools">
                <span className="drag-handle" title="Glisser pour réordonner">⠿</span>
                <button onClick={() => move(i, i - 1)} aria-label="Monter">↑</button>
                <button onClick={() => move(i, i + 1)} aria-label="Descendre">↓</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
