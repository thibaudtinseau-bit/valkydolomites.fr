import React, { useState } from 'react'
import { useStore } from '../store'

const SUGGESTIONS = [
  '🚐 Carte grise (scan)', '📄 Assurance + carte verte', '🆔 Passeports / CNI', '🚗 Permis de conduire',
  '🏥 CEAM (carte européenne maladie)', '🐶 Passeport européen du chien', '💉 Certificat antirabique',
  '🎫 Réservation camping Seiser Alm', '🎫 Badge télépéage', '📑 Contrat d’assistance véhicule',
]

export default function Docs() {
  const { docs, setDocs } = useStore()
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')

  const add = (presetLabel) => {
    const l = (presetLabel || label).trim()
    if (!l) return
    setDocs((d) => [...d, { id: Date.now(), label: l, url: url.trim(), note: '' }])
    setLabel(''); setUrl('')
  }
  const setField = (id, field, value) => setDocs((d) => d.map((x) => (x.id === id ? { ...x, [field]: value } : x)))

  return (
    <div className="page fade-in">
      <div className="eyebrow">Le coffre-fort</div>
      <div className="section-head" style={{ marginBottom: 8 }}><h2>Documents</h2></div>
      <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 16, maxWidth: 680 }}>
        Centralise ici les liens vers tes documents (Google Drive, iCloud, Photos…) pour les retrouver en 2 secondes
        au péage, à la frontière ou au camping. Les liens restent uniquement sur ton appareil — rien n’est envoyé en ligne.
      </p>

      <div className="card pad" style={{ marginBottom: 16 }}>
        <h3 style={{ fontWeight: 850, fontSize: 15.5, marginBottom: 10 }}>+ Ajouter un document</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Nom (ex : Carte grise)"
            style={{ flex: 1, minWidth: 150, background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 12, padding: '10px 13px', color: 'var(--text)', font: 'inherit', fontSize: 14 }} />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Lien (Drive, iCloud…)"
            style={{ flex: 2, minWidth: 190, background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 12, padding: '10px 13px', color: 'var(--text)', font: 'inherit', fontSize: 14 }} />
          <button className="rank-tab active" onClick={() => add()}>Ajouter</button>
        </div>
        <div className="filters" style={{ paddingBottom: 0 }}>
          {SUGGESTIONS.filter((s) => !docs.some((d) => d.label === s)).map((s) => (
            <button key={s} className="rank-tab" onClick={() => add(s)}>+ {s}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        {docs.length === 0 && <div className="empty">Ajoute tes documents essentiels — un tap sur une suggestion suffit.</div>}
        {docs.map((d) => (
          <div key={d.id} className="card" style={{ padding: '12px 15px', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <b style={{ fontSize: 14.5, flex: 1, minWidth: 140 }}>{d.label}</b>
            <input
              value={d.url}
              onChange={(e) => setField(d.id, 'url', e.target.value)}
              placeholder="Coller le lien…"
              style={{ flex: 2, minWidth: 160, background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 10, padding: '7px 11px', color: 'var(--text)', font: 'inherit', fontSize: 12.5 }}
            />
            {d.url && <a className="rank-tab" href={d.url} target="_blank" rel="noreferrer">Ouvrir ↗</a>}
            <button onClick={() => setDocs((x) => x.filter((y) => y.id !== d.id))} style={{ color: 'var(--red)' }} aria-label="Supprimer">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}
