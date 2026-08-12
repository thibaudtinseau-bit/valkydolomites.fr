import React from 'react'
import { PATOU_LEVELS } from '../data/locations'

export const Stars = ({ n, max = 5 }) => (
  <span className="stars" aria-label={`${n}/${max}`}>{'★'.repeat(n)}{'☆'.repeat(Math.max(0, max - n))}</span>
)

export const RatingChip = ({ loc }) => {
  if (loc.status === 'visited') return <span className="chip visited">✓ Déjà vu</span>
  if (loc.avoidDog) return <span className="chip danger">🐶 À éviter</span>
  return <span className="chip gold"><Stars n={loc.rating} /></span>
}

export const ratingLabel = (loc) =>
  loc.status === 'visited' ? 'Déjà découvert'
    : loc.avoidDog ? 'À éviter avec un chien'
    : loc.rating === 5 ? 'Incontournable'
    : loc.rating === 4 ? 'Très beau' : 'Option'

export const markerColor = (loc) =>
  loc.status === 'visited' ? '#8d99ae'
    : loc.avoidDog ? '#ef4444'
    : loc.rating === 5 ? '#d4af6a'
    : loc.rating === 4 ? '#34d399' : '#60a5fa'

export const PatouBadge = ({ patou, detailed = false }) => {
  const lv = PATOU_LEVELS[patou.level]
  return (
    <div className="patou-banner" style={{ background: lv.color + '14' }}>
      <div className="patou-dot" style={{ background: lv.color, color: lv.color }} />
      <div>
        <div style={{ fontWeight: 800, fontSize: 14.5 }}>{lv.emoji} Risque patous : {lv.label}</div>
        {detailed && <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.55 }}>{patou.reason}</div>}
      </div>
    </div>
  )
}

export const DIFF_COLORS = { Facile: '#34d399', Moyen: '#eab308', Difficile: '#f97316' }
