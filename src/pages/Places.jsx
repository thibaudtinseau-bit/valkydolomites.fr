import React, { useState } from 'react'
import { LOCATIONS, getPhotos } from '../data/locations'
import { RatingChip, ratingLabel } from '../components/ui'
import { useStore } from '../store'

export function PlaceCard({ loc }) {
  const { favs, toggleFav } = useStore()
  const photo = getPhotos(loc.id)[0]
  return (
    <a className="place-card" href={`#/lieu/${loc.id}`}>
      {photo && <img src={photo.thumb || photo.url} alt={loc.name} loading="lazy" />}
      <div className="veil" />
      <div className="pc-badges">
        <RatingChip loc={loc} />
        <button
          className={`chip fav-btn ${favs.includes(loc.id) ? 'on' : ''}`}
          onClick={(e) => { e.preventDefault(); toggleFav(loc.id) }}
          aria-label="Favori"
        >{favs.includes(loc.id) ? '♥' : '♡'}</button>
      </div>
      <div className="pc-body">
        <h3>{loc.name}</h3>
        <div className="pc-sub">{loc.tagline}</div>
        {loc.status === 'new' && (
          <div className="meta-row">
            {loc.hike.distanceKm > 0 && <span className="meta-pill">{loc.hike.distanceKm} km</span>}
            {loc.hike.dplusM > 0 && <span className="meta-pill">{loc.hike.dplusM} m D+</span>}
            <span className="meta-pill">🐶 {loc.dog.stars}/5</span>
          </div>
        )}
      </div>
    </a>
  )
}

const FILTERS = [
  { id: 'all', label: 'Tout' },
  { id: '5', label: '⭐⭐⭐⭐⭐' },
  { id: '4', label: '⭐⭐⭐⭐' },
  { id: '3', label: '⭐⭐⭐' },
  { id: 'dog', label: '🐶 Top chien' },
  { id: 'big', label: '🥾 Grandes randos' },
  { id: 'visited', label: '✓ Déjà vus' },
]

export default function Places() {
  const [filter, setFilter] = useState('all')
  const list = LOCATIONS.filter((l) => {
    if (filter === 'all') return l.status === 'new'
    if (filter === 'visited') return l.status === 'visited'
    if (filter === 'dog') return l.status === 'new' && l.dog.stars >= 4 && !l.avoidDog
    if (filter === 'big') return l.status === 'new' && l.hike.distanceKm >= 12
    return l.status === 'new' && l.rating === Number(filter)
  })
  return (
    <div className="page fade-in">
      <div className="eyebrow">Explorer</div>
      <div className="section-head" style={{ marginBottom: 10 }}>
        <h2>Randonnées & lieux</h2>
        <span style={{ color: 'var(--text-3)', fontSize: 13.5, fontWeight: 600 }}>{list.length} lieux</span>
      </div>
      <div className="filters">
        {FILTERS.map((f) => (
          <button key={f.id} className={`rank-tab ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>{f.label}</button>
        ))}
      </div>
      <div className="grid cols-3" style={{ marginTop: 8 }}>
        {list.map((l) => <PlaceCard key={l.id} loc={l} />)}
      </div>
      {filter === 'all' && (
        <div className="section">
          <div className="section-head"><h2>Déjà découverts</h2></div>
          <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 14 }}>
            Nos souvenirs des précédents voyages — visibles sur la carte en gris, jamais proposés comme objectifs.
          </p>
          <div className="grid cols-3">
            {LOCATIONS.filter((l) => l.status === 'visited').map((l) => <PlaceCard key={l.id} loc={l} />)}
          </div>
        </div>
      )}
    </div>
  )
}
