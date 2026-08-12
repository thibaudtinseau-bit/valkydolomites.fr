import React from 'react'
import { NIGHT_SPOTS } from '../data/nightspots'

const Bar = ({ label, val, invert = false }) => (
  <div style={{ fontSize: 12, fontWeight: 700 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-3)', marginBottom: 2 }}>
      <span>{label}</span><span>{val}/5</span>
    </div>
    <div style={{ height: 5, borderRadius: 5, background: 'var(--stroke)' }}>
      <div style={{ height: '100%', borderRadius: 5, width: `${(val / 5) * 100}%`, background: (invert ? 5 - val : val) >= 3.5 ? 'var(--green)' : (invert ? 5 - val : val) >= 2 ? '#eab308' : 'var(--red)' }} />
    </div>
  </div>
)

export default function NightSpots() {
  return (
    <div className="page fade-in">
      <div className="eyebrow">Où pose-t-on les cales ce soir ?</div>
      <div className="section-head" style={{ marginBottom: 8 }}><h2>Spots de nuit</h2></div>
      <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 16, maxWidth: 680 }}>
        Les {NIGHT_SPOTS.length} spots du voyage, notés honnêtement : bruit, vue, réseau, pente, fréquentation.
        Un tap sur les coordonnées GPS ouvre la navigation. ⚠️ Pour les spots « tolérés », toujours vérifier les panneaux sur place.
      </p>
      <div className="grid cols-2">
        {NIGHT_SPOTS.map((s) => (
          <div key={s.id} className="card pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
              <h3 style={{ fontWeight: 850, fontSize: 15.5 }}>{s.name}</h3>
              <span className="tag" style={{ flexShrink: 0 }}>{s.when}</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', margin: '4px 0 10px' }}>
              {s.type} · {s.places} places · {s.price}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px', marginBottom: 10 }}>
              <Bar label="🤫 Calme" val={5 - s.noise} />
              <Bar label="🏔️ Vue" val={s.view} />
              <Bar label="📶 4G" val={s.sun4g} />
              <Bar label="📐 Plat" val={s.pente} />
              <Bar label="🌅 Lever soleil" val={s.sunrise} />
              <Bar label="🌇 Coucher" val={s.sunset} />
            </div>
            <div className="kv"><span className="k">Services</span><span className="v">{s.services.eau ? '💧' : ''}{s.services.vidange ? ' 🚽' : ''}{s.services.elec ? ' ⚡' : ''}{!s.services.eau && !s.services.vidange && !s.services.elec ? 'Aucun (autonomie)' : ''}</span></div>
            <div className="kv"><span className="k">Starlink</span><span className="v" style={{ fontSize: 12.5 }}>{s.starlink}</span></div>
            <div className="kv"><span className="k">Règles</span><span className="v" style={{ fontSize: 12.5 }}>{s.rules}</span></div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '8px 0 10px', lineHeight: 1.55 }}>💡 {s.note}</p>
            <a className="link-btn" href={`https://www.google.com/maps/search/?api=1&query=${s.coords[0]},${s.coords[1]}`} target="_blank" rel="noreferrer">📍 GPS {s.gps}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
