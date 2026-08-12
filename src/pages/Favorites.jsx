import React, { useState } from 'react'
import { byId, LOCATIONS } from '../data/locations'
import { PlaceCard } from './Places'
import { useStore } from '../store'

export default function Favorites() {
  const { favs, notes, done, checklist, setChecklist, plan } = useStore()
  const [newItem, setNewItem] = useState('')
  const favLocs = favs.map((id) => byId[id]).filter(Boolean)
  const doneLocs = done.map((id) => byId[id]).filter(Boolean)
  const notedIds = Object.keys(notes).filter((id) => notes[id]?.trim() && byId[id])

  const exportJSON = () => {
    const data = { exporte: new Date().toISOString(), favoris: favs, realisees: done, notes, checklist, planning: plan }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'dolomites-2026-carnet.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const toggleCheck = (id) => setChecklist((c) => c.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  const addCheck = () => {
    if (!newItem.trim()) return
    setChecklist((c) => [...c, { id: Date.now(), text: newItem.trim(), done: false }])
    setNewItem('')
  }

  return (
    <div className="page fade-in">
      <div className="eyebrow">Notre carnet de route</div>
      <div className="section-head" style={{ marginBottom: 14 }}>
        <h2>Favoris & carnet</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="rank-tab" onClick={exportJSON}>⬇ JSON</button>
          <button className="rank-tab" onClick={() => window.print()}>🖨 PDF</button>
        </div>
      </div>

      <div className="section" style={{ marginTop: 6 }}>
        <div className="section-head"><h2 style={{ fontSize: 20 }}>♥ Nos favoris ({favLocs.length})</h2></div>
        {favLocs.length === 0
          ? <div className="empty">Touche le ♡ sur une fiche pour la garder ici.</div>
          : <div className="grid cols-3">{favLocs.map((l) => <PlaceCard key={l.id} loc={l} />)}</div>}
      </div>

      <div className="section">
        <div className="section-head"><h2 style={{ fontSize: 20 }}>✓ Randonnées réalisées ({doneLocs.length})</h2></div>
        {doneLocs.length === 0
          ? <div className="empty">Marque une randonnée « réalisée » depuis sa fiche — la liste devient notre palmarès.</div>
          : (
            <div style={{ display: 'grid', gap: 8 }}>
              {doneLocs.map((l) => (
                <a key={l.id} className="card" href={`#/lieu/${l.id}`} style={{ padding: '13px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <b>✓ {l.name}</b>
                  <span style={{ fontSize: 12.5, color: 'var(--text-2)' }}>{l.hike.distanceKm} km · {l.hike.dplusM} m D+</span>
                </a>
              ))}
              <div className="notice">
                Total : {doneLocs.reduce((s, l) => s + l.hike.distanceKm, 0).toFixed(0)} km · {doneLocs.reduce((s, l) => s + l.hike.dplusM, 0)} m D+ 💪
              </div>
            </div>
          )}
      </div>

      <div className="section">
        <div className="section-head"><h2 style={{ fontSize: 20 }}>📝 Nos notes</h2></div>
        {notedIds.length === 0
          ? <div className="empty">Les notes écrites sur les fiches se retrouvent ici.</div>
          : (
            <div style={{ display: 'grid', gap: 10 }}>
              {notedIds.map((id) => (
                <a key={id} className="card pad" href={`#/lieu/${id}`}>
                  <b style={{ fontSize: 14.5 }}>{byId[id].name}</b>
                  <p style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 5, whiteSpace: 'pre-wrap' }}>{notes[id]}</p>
                </a>
              ))}
            </div>
          )}
      </div>

      <div className="section">
        <div className="section-head"><h2 style={{ fontSize: 20 }}>☑️ Checklist départ</h2></div>
        <div className="card pad">
          {checklist.map((c) => (
            <label key={c.id} className={`check-row ${c.done ? 'done' : ''}`}>
              <input type="checkbox" checked={c.done} onChange={() => toggleCheck(c.id)} />
              {c.text}
            </label>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCheck()}
              placeholder="Ajouter un élément…"
              style={{ flex: 1, background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 12, padding: '10px 14px', color: 'var(--text)', font: 'inherit', fontSize: 14 }}
            />
            <button className="rank-tab" onClick={addCheck}>+ Ajouter</button>
          </div>
        </div>
      </div>
    </div>
  )
}
