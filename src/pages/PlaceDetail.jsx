import React from 'react'
import { byId, getPhotos } from '../data/locations'
import { basesById } from '../data/bases'
import Gallery from '../components/Gallery'
import { Stars, PatouBadge, ratingLabel, DIFF_COLORS } from '../components/ui'
import { useStore } from '../store'

const TRAIT_LABELS = {
  laisse: ['🐕‍🦺', 'Laisse obligatoire'],
  museliere: ['😷', 'Muselière (remontées)'],
  etroits: ['↔️', 'Passages étroits'],
  cables: ['⛓️', 'Passages câblés'],
  vide: ['🕳️', 'Vide / exposition'],
  pierriers: ['🪨', 'Pierriers'],
  foret: ['🌲', 'Forêt'],
  prairie: ['🌿', 'Prairie'],
  eau: ['💧', 'Eau disponible'],
  ombre: ['⛱️', 'Ombre'],
  demiTour: ['↩️', 'Demi-tour possible'],
}

const MY_CRITERIA = [
  ['paysage', '😍 Paysage'],
  ['interet', '🥾 Intérêt de la rando'],
  ['acces', '🚐 Accès camping-car'],
  ['chien', '🐶 Avec le chien'],
  ['photo', '📷 Photogénique'],
  ['coucher', '🌇 Coucher de soleil'],
  ['lever', '🌅 Lever de soleil'],
  ['famille', '👨‍👩‍👧 Famille'],
  ['difficulte', '💪 Difficulté ressentie'],
  ['retour', '😎 J’y retournerais'],
]

function MyRating({ locId }) {
  const { myRatings, setMyRating } = useStore()
  const r = myRatings[locId] || {}
  const rated = MY_CRITERIA.filter(([k]) => r[k]).length
  return (
    <div className="card pad">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <h3 style={{ fontWeight: 850 }}>⭐ Notre note</h3>
        {rated > 0 && <span className="tag">{(MY_CRITERIA.reduce((s, [k]) => s + (r[k] || 0), 0) / rated).toFixed(1)}/5</span>}
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: '4px 0 8px' }}>Pas une note Google — la nôtre, après y être allés.</p>
      {MY_CRITERIA.map(([k, label]) => (
        <div key={k} className="myrate-row">
          <span className="mr-label">{label}</span>
          <span className="myrate-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className={(r[k] || 0) >= n ? 'on' : ''} onClick={() => setMyRating(locId, k, r[k] === n ? 0 : n)} aria-label={`${n}/5`}>★</button>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function PlaceDetail({ id }) {
  const loc = byId[id]
  const { favs, toggleFav, done, toggleDone, notes, setNote, doneDetails, setDoneDetail } = useStore()
  if (!loc) return <div className="page"><div className="empty">Lieu introuvable. <a href="#/lieux" style={{ color: 'var(--accent)' }}>Retour aux lieux</a></div></div>
  const photos = getPhotos(loc.id)
  const base = basesById[loc.area]
  const isFav = favs.includes(loc.id)
  const isDone = done.includes(loc.id)

  return (
    <div className="fade-in">
      <div className="detail-hero">
        {photos[0] && <img src={photos[0].url} alt={loc.name} />}
        <div className="veil" />
        <a className="btn back-btn" href="#/lieux" style={{ padding: '9px 16px', fontSize: 13.5 }}>← Retour</a>
        <div className="dh-body">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <span className="chip gold">{ratingLabel(loc)}</span>
            {loc.status === 'new' && <span className="chip">🐶 {loc.dog.stars}/5</span>}
            {loc.hike.difficulty && loc.hike.distanceKm > 0 && (
              <span className="chip" style={{ color: DIFF_COLORS[loc.hike.difficulty] }}>{loc.hike.difficulty}</span>
            )}
          </div>
          <h1>{loc.name}</h1>
          <p style={{ color: 'rgba(255,255,255,.85)', marginTop: 4, fontSize: 15 }}>{loc.tagline}</p>
        </div>
      </div>

      <div className="detail-wrap">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          <button className={`link-btn ${isFav ? 'fav-btn on' : ''}`} onClick={() => toggleFav(loc.id)}>
            {isFav ? '♥ Dans les favoris' : '♡ Ajouter aux favoris'}
          </button>
          <button className="link-btn" onClick={() => toggleDone(loc.id)} style={isDone ? { color: 'var(--green)', borderColor: 'var(--green)' } : {}}>
            {isDone ? '✓ Réalisée !' : '○ Marquer comme réalisée'}
          </button>
        </div>

        {loc.hike.distanceKm > 0 && (
          <div className="stat-grid" style={{ marginBottom: 18 }}>
            <div className="stat"><div className="s-label">Distance</div><div className="s-value">{loc.hike.distanceKm} km</div></div>
            <div className="stat"><div className="s-label">Dénivelé</div><div className="s-value">{loc.hike.dplusM} m</div></div>
            <div className="stat"><div className="s-label">Temps</div><div className="s-value" style={{ fontSize: 15 }}>{loc.hike.timeH}</div></div>
            <div className="stat"><div className="s-label">Altitude max</div><div className="s-value">{loc.hike.altMaxM} m</div></div>
            <div className="stat"><div className="s-label">Difficulté</div><div className="s-value" style={{ color: DIFF_COLORS[loc.hike.difficulty], fontSize: 15 }}>{loc.hike.difficulty}</div></div>
          </div>
        )}

        <div className="detail-grid">
          <div style={{ display: 'grid', gap: 18 }}>
            <div className="card pad">
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--text-2)' }}>{loc.description}</p>
              {loc.hike.start && loc.hike.start !== '—' && (
                <div className="kv" style={{ marginTop: 12 }}><span className="k">Départ</span><span className="v">{loc.hike.start}</span></div>
              )}
            </div>

            <div className="card pad">
              <h3 style={{ fontWeight: 850, marginBottom: 12 }}>Pourquoi y aller</h3>
              <ul className="why-list">{loc.why.filter((w) => w !== '—').map((w, i) => <li key={i}>{w}</li>)}</ul>
              {loc.whyNot.filter((w) => w !== '—').length > 0 && (
                <>
                  <h3 style={{ fontWeight: 850, margin: '18px 0 12px' }}>Pourquoi hésiter</h3>
                  <ul className="why-list no">{loc.whyNot.map((w, i) => <li key={i}>{w}</li>)}</ul>
                </>
              )}
            </div>

            <div className="card pad">
              <h3 style={{ fontWeight: 850, marginBottom: 4 }}>🐶 Compatibilité chien</h3>
              <div style={{ fontSize: 22 }}><Stars n={loc.dog.stars} /></div>
              <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '10px 0 4px', lineHeight: 1.6 }}>{loc.dog.notes}</p>
              <div className="trait-grid">
                {Object.entries(TRAIT_LABELS).map(([k, [emoji, label]]) => (
                  <div key={k} className={`trait ${loc.dog.traits[k] ? '' : 'off'}`}>
                    <span>{emoji}</span> {label}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14 }}>
                <PatouBadge patou={loc.patou} detailed />
                <p className="notice" style={{ marginTop: 10 }}>
                  ⚠️ Cet indicateur est une estimation basée sur le type de terrain et les usages habituels des alpages.
                  Il ne garantit jamais l’absence de troupeaux ou de chiens de protection. En présence d’un troupeau :
                  chien en laisse courte, contourner largement, ne jamais s’interposer.
                </p>
              </div>
            </div>

            <div className="card pad">
              <h3 style={{ fontWeight: 850, marginBottom: 12 }}>🚐 Compatibilité camping-car</h3>
              <div className="kv"><span className="k">Hauteur max</span><span className="v">{loc.camper.maxHeight}</span></div>
              <div className="kv"><span className="k">Longueur conseillée</span><span className="v">{loc.camper.maxLength}</span></div>
              <div className="kv"><span className="k">Parking</span><span className="v">{loc.camper.parking}</span></div>
              <div className="kv"><span className="k">Nuit sur place</span><span className="v">{loc.camper.overnight}</span></div>
              <div className="kv"><span className="k">Aire la plus proche</span><span className="v">{loc.camper.aire}</span></div>
              <div className="kv"><span className="k">Vidange</span><span className="v">{loc.camper.services.vidange}</span></div>
              <div className="kv"><span className="k">Eau</span><span className="v">{loc.camper.services.eau}</span></div>
              <div className="kv"><span className="k">Électricité</span><span className="v">{loc.camper.services.elec}</span></div>
              {loc.camper.notes && <p style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 10, lineHeight: 1.6 }}>💡 {loc.camper.notes}</p>}
            </div>

            <div className="card pad">
              <h3 style={{ fontWeight: 850, marginBottom: 12 }}>📸 Galerie ({photos.length})</h3>
              <Gallery photos={photos} name={loc.name} />
              <p className="notice" style={{ marginTop: 12 }}>Photos Wikimedia Commons (libres) — elles seront remplacées par les nôtres au fil du voyage.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
            <div className="card pad">
              <h3 style={{ fontWeight: 850, marginBottom: 12 }}>Infos pratiques</h3>
              <div className="kv"><span className="k">Parking</span><span className="v">{loc.practical.parkingPrice}</span></div>
              <div className="kv"><span className="k">Téléphérique</span><span className="v">{loc.practical.cablecarPrice}</span></div>
              <div className="kv"><span className="k">Horaires</span><span className="v">{loc.practical.hours}</span></div>
              <div className="kv"><span className="k">Temps conseillé</span><span className="v">{loc.practical.suggestedTime}</span></div>
              {loc.refuge !== '—' && <div className="kv"><span className="k">Refuge</span><span className="v">{loc.refuge}</span></div>}
              {loc.resto !== '—' && <div className="kv"><span className="k">Où manger</span><span className="v">{loc.resto}</span></div>}
            </div>

            <div className="card pad">
              <h3 style={{ fontWeight: 850, marginBottom: 12 }}>Liens</h3>
              <div className="link-row">
                {loc.links.gpx && <a className="link-btn" href={loc.links.gpx} target="_blank" rel="noreferrer">🗺️ Trace GPX</a>}
                <a className="link-btn" href={loc.links.gmaps} target="_blank" rel="noreferrer">📍 Google Maps</a>
                {loc.links.official && <a className="link-btn" href={loc.links.official} target="_blank" rel="noreferrer">🌐 Site officiel</a>}
              </div>
            </div>

            {base && (
              <a className="card pad" href={`#/base/${base.id}`} style={{ display: 'block' }}>
                <div className="eyebrow">Camp de base</div>
                <h3 style={{ fontWeight: 850 }}>{base.name} →</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.55 }}>{base.intro}</p>
              </a>
            )}

            {isDone && (
              <div className="card pad" style={{ borderColor: 'var(--green)' }}>
                <h3 style={{ fontWeight: 850, color: 'var(--green)', marginBottom: 10 }}>✓ On l’a faite !</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-3)' }}>Date
                    <input type="date" value={doneDetails[loc.id]?.date || ''} onChange={(e) => setDoneDetail(loc.id, { date: e.target.value })}
                      style={{ display: 'block', width: '100%', marginTop: 4, background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 10, padding: '9px 12px', color: 'var(--text)', font: 'inherit', fontSize: 14 }} />
                  </label>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-3)' }}>Temps réel
                    <input placeholder="ex : 4h10 avec pauses" value={doneDetails[loc.id]?.realTime || ''} onChange={(e) => setDoneDetail(loc.id, { realTime: e.target.value })}
                      style={{ display: 'block', width: '100%', marginTop: 4, background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 10, padding: '9px 12px', color: 'var(--text)', font: 'inherit', fontSize: 14 }} />
                  </label>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-3)' }}>Notre commentaire
                    <textarea className="notes" style={{ marginTop: 4, minHeight: 64 }} placeholder="Le meilleur moment, ce qu’on referait autrement…"
                      value={doneDetails[loc.id]?.comment || ''} onChange={(e) => setDoneDetail(loc.id, { comment: e.target.value })} />
                  </label>
                </div>
              </div>
            )}

            <MyRating locId={loc.id} />

            <div className="card pad">
              <h3 style={{ fontWeight: 850, marginBottom: 10 }}>📝 Nos notes</h3>
              <textarea
                className="notes"
                placeholder="Impressions, horaires réels, spots trouvés sur place…"
                value={notes[loc.id] || ''}
                onChange={(e) => setNote(loc.id, e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
