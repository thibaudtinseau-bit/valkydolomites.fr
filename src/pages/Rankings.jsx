import React, { useState } from 'react'
import { NEW_LOCATIONS, LOCATIONS, getPhotos } from '../data/locations'

const RANKINGS = [
  { id: 'scenery', label: '🏔️ Plus beaux paysages', pick: (ls) => ls.filter((l) => l.status === 'new').sort((a, b) => (b.rating * 10 + b.sunset + b.sunrise) - (a.rating * 10 + a.sunset + a.sunrise)), sub: (l) => l.tagline },
  { id: 'hikes', label: '🥾 Meilleures randonnées', pick: (ls) => ls.filter((l) => l.status === 'new' && l.hike.distanceKm >= 6).sort((a, b) => (b.rating * 10 + b.hike.distanceKm / 2) - (a.rating * 10 + a.hike.distanceKm / 2)), sub: (l) => `${l.hike.distanceKm} km · ${l.hike.dplusM} m D+ · ${l.hike.difficulty}` },
  { id: 'dog', label: '🐶 Plus adaptées au chien', pick: (ls) => ls.filter((l) => l.status === 'new' && !l.avoidDog).sort((a, b) => (b.dog.stars * 10 - b.patou.level * 3) - (a.dog.stars * 10 - a.patou.level * 3)), sub: (l) => `Chien ${l.dog.stars}/5 · patous : niveau ${l.patou.level}` },
  { id: 'camper', label: '🚐 Plus adaptées au camping-car', pick: (ls) => ls.filter((l) => l.status === 'new').sort((a, b) => camperScore(b) - camperScore(a)), sub: (l) => l.camper.overnight },
  { id: 'quiet', label: '🤫 Moins fréquentées', pick: (ls) => ls.filter((l) => l.status === 'new' && l.hike.distanceKm > 0).sort((a, b) => (a.crowd - b.crowd) || (b.rating - a.rating)), sub: (l) => ['—', 'Confidentiel', 'Calme', 'Fréquenté', 'Très fréquenté', 'Foule'][l.crowd] },
  { id: 'refuges', label: '⛺ Meilleurs refuges', pick: (ls) => ls.filter((l) => l.refuge && l.refuge !== '—').sort((a, b) => b.rating - a.rating), sub: (l) => l.refuge },
  { id: 'food', label: '🍝 Meilleures tables', pick: (ls) => ls.filter((l) => l.resto && l.resto !== '—').sort((a, b) => b.rating - a.rating), sub: (l) => l.resto },
]
const camperScore = (l) => {
  let s = 0
  if (/oui|tolérée|supplément/i.test(l.camper.overnight)) s += 20
  if (/aucune/i.test(l.camper.maxHeight)) s += 5
  if (l.camper.services.vidange !== '—' && !/non/i.test(l.camper.services.vidange)) s += 4
  return s + l.rating * 3
}

export default function Rankings() {
  const [tab, setTab] = useState('scenery')
  const r = RANKINGS.find((x) => x.id === tab)
  const list = r.pick(LOCATIONS).slice(0, 10)
  return (
    <div className="page fade-in">
      <div className="eyebrow">Tops du voyage</div>
      <div className="section-head" style={{ marginBottom: 12 }}><h2>Classements</h2></div>
      <div className="rank-tabs">
        {RANKINGS.map((x) => (
          <button key={x.id} className={`rank-tab ${tab === x.id ? 'active' : ''}`} onClick={() => setTab(x.id)}>{x.label}</button>
        ))}
      </div>
      <div className="card" style={{ padding: '6px 10px', marginTop: 10 }}>
        {list.map((l, i) => {
          const photo = getPhotos(l.id)[0]
          return (
            <a key={l.id} className="rank-row" href={`#/lieu/${l.id}`}>
              <div className={`rank-pos ${i < 3 ? 'top' : ''}`}>{i + 1}</div>
              {photo && <img src={photo.thumb || photo.url} alt="" loading="lazy" />}
              <div className="rank-main">
                <h4>{l.name}</h4>
                <p>{r.sub(l)}</p>
              </div>
              {l.status === 'new' && l.rating > 0 && <div className="stars" style={{ flexShrink: 0, fontSize: 13 }}>{'★'.repeat(l.rating)}</div>}
            </a>
          )
        })}
      </div>
    </div>
  )
}
