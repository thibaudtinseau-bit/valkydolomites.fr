import React, { useState } from 'react'
import { WEBCAMS, WEBCAM_SECTORS } from '../data/webcams'

export default function Webcams() {
  const [sector, setSector] = useState('all')
  const [refresh, setRefresh] = useState(0)
  const list = WEBCAMS.filter((w) => sector === 'all' || w.sector === sector)
  return (
    <div className="page fade-in">
      <div className="eyebrow">Les conditions en direct</div>
      <div className="section-head" style={{ marginBottom: 10 }}>
        <h2>Webcams</h2>
        <button className="rank-tab" onClick={() => setRefresh((r) => r + 1)}>↻ Actualiser</button>
      </div>
      <div className="filters">
        <button className={`rank-tab ${sector === 'all' ? 'active' : ''}`} onClick={() => setSector('all')}>Toutes</button>
        {WEBCAM_SECTORS.map((s) => (
          <button key={s} className={`rank-tab ${sector === s ? 'active' : ''}`} onClick={() => setSector(s)}>{s}</button>
        ))}
      </div>
      <div className="grid cols-2" style={{ marginTop: 8 }}>
        {list.map((w) => (
          <a key={w.id} className="card" href={w.url} target="_blank" rel="noreferrer" style={{ overflow: 'hidden', display: 'block' }}>
            {w.img
              ? <img src={`${w.img}?t=${refresh}`} alt={w.name} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} loading="lazy" />
              : <div style={{ aspectRatio: '16/6', display: 'grid', placeItems: 'center', fontSize: 34, background: 'var(--card)' }}>📷</div>}
            <div style={{ padding: '12px 15px' }}>
              <b style={{ fontSize: 14.5 }}>{w.name}</b>
              <span className="tag" style={{ marginLeft: 8 }}>{w.img ? 'LIVE' : 'Site officiel ↗'}</span>
              <p style={{ fontSize: 12.5, color: 'var(--text-2)', marginTop: 5, lineHeight: 1.5 }}>{w.note}</p>
            </div>
          </a>
        ))}
      </div>
      <p className="notice" style={{ marginTop: 14 }}>
        Les vignettes « LIVE » viennent de foto-webcam.eu (image réactualisée en continu). Les autres ouvrent la page
        webcam officielle de la station — le réflexe du matin avant de choisir la rando.
      </p>
    </div>
  )
}
