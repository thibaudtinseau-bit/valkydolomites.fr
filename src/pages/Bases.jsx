import React from 'react'
import { BASES, basesById } from '../data/bases'
import { byId, getPhotos } from '../data/locations'
import { PlaceCard } from './Places'

export default function Bases() {
  return (
    <div className="page fade-in">
      <div className="eyebrow">Organisation par secteur</div>
      <div className="section-head" style={{ marginBottom: 8 }}><h2>Les camps de base</h2></div>
      <p style={{ color: 'var(--text-2)', fontSize: 14.5, marginBottom: 18, maxWidth: 680 }}>
        Plutôt que d’enchaîner les randonnées en étoile filante, on pose le camping-car dans un secteur quelques jours
        et on rayonne : dormir, ravitailler, vidanger, promener le chien — tout est prévu ici.
      </p>
      <div className="grid cols-2">
        {BASES.map((b) => {
          const photo = b.spots[0] && getPhotos(b.spots[0])[0]
          return (
            <a key={b.id} className="place-card" href={`#/base/${b.id}`} style={{ aspectRatio: '4/2.2' }}>
              {photo && <img src={photo.thumb || photo.url} alt={b.name} loading="lazy" />}
              <div className="veil" />
              <div className="pc-body">
                <h3>{b.name}</h3>
                <div className="pc-sub">{b.intro}</div>
                <div className="meta-row"><span className="meta-pill">{b.spots.length} lieux</span></div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export function BaseDetail({ id }) {
  const b = basesById[id]
  if (!b) return <div className="page"><div className="empty">Base introuvable.</div></div>
  const S = ({ icon, title, items }) => (
    <div className="base-section">
      <h4>{icon} {title}</h4>
      <ul>{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
    </div>
  )
  return (
    <div className="page fade-in">
      <a href="#/bases" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14 }}>← Toutes les bases</a>
      <h2 style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 900, margin: '10px 0 8px' }}>{b.name}</h2>
      <p style={{ color: 'var(--text-2)', fontSize: 15, maxWidth: 680, lineHeight: 1.65 }}>{b.intro}</p>

      <div className="detail-grid" style={{ marginTop: 22 }}>
        <div>
          <div className="section-head"><h2 style={{ fontSize: 21 }}>À faire autour</h2></div>
          <div className="grid cols-2">
            {b.spots.map((sid) => byId[sid] && <PlaceCard key={sid} loc={byId[sid]} />)}
          </div>
        </div>
        <div className="card pad" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 14px)' }}>
          <S icon="🛏️" title="Où dormir" items={b.sleep} />
          <S icon="🛒" title="Où faire les courses" items={b.groceries} />
          <S icon="💧" title="Où remplir l’eau" items={b.water} />
          <S icon="🚽" title="Où vidanger" items={b.dump} />
          <S icon="🍽️" title="Où manger" items={b.eat} />
          <S icon="🐶" title="Où promener le chien" items={b.dogWalk} />
        </div>
      </div>
    </div>
  )
}
