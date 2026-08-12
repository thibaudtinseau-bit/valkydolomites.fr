import React, { useState } from 'react'
import { useStore } from '../store'

const CATS = [
  ['gazole', '⛽ Gazole'], ['peage', '🛣️ Péages'], ['telepherique', '🚡 Téléphériques'],
  ['parking', '🅿️ Parkings'], ['courses', '🛒 Courses'], ['resto', '🍽️ Restaurants'],
  ['camping', '🚐 Aires & campings'], ['autre', '📦 Autre'],
]
const catLabel = Object.fromEntries(CATS)

export default function Costs() {
  const { expenses, setExpenses, budget, setBudget } = useStore()
  const [amount, setAmount] = useState('')
  const [cat, setCat] = useState('gazole')
  const [note, setNote] = useState('')

  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const byCat = CATS.map(([c]) => [c, expenses.filter((e) => e.cat === c).reduce((s, e) => s + e.amount, 0)]).filter(([, v]) => v > 0)
  const remaining = budget - total

  const add = () => {
    const val = parseFloat(String(amount).replace(',', '.'))
    if (!val || val <= 0) return
    setExpenses((e) => [{ id: Date.now(), date: new Date().toISOString().slice(0, 10), cat, amount: val, note: note.trim() }, ...e])
    setAmount(''); setNote('')
  }

  return (
    <div className="page fade-in">
      <div className="eyebrow">Le nerf du voyage</div>
      <div className="section-head" style={{ marginBottom: 12 }}><h2>Coûts & budget</h2></div>

      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <div className="stat"><div className="s-label">Dépensé</div><div className="s-value">{total.toFixed(0)} €</div></div>
        <div className="stat">
          <div className="s-label">Budget</div>
          <div className="s-value" style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <input
              value={budget}
              onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
              type="number"
              style={{ width: 72, background: 'transparent', border: 'none', color: 'var(--text)', font: 'inherit', fontSize: 18, fontWeight: 800, padding: 0 }}
            /> €
          </div>
        </div>
        <div className="stat"><div className="s-label">Restant</div><div className="s-value" style={{ color: remaining >= 0 ? 'var(--green)' : 'var(--red)' }}>{remaining.toFixed(0)} €</div></div>
        <div className="stat"><div className="s-label">Par jour (16 j)</div><div className="s-value">{(total / 16).toFixed(0)} €</div></div>
      </div>

      <div className="card pad" style={{ marginBottom: 16 }}>
        <h3 style={{ fontWeight: 850, fontSize: 15.5, marginBottom: 10 }}>+ Ajouter une dépense</h3>
        <div className="filters" style={{ paddingBottom: 6 }}>
          {CATS.map(([c, label]) => (
            <button key={c} className={`rank-tab ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} type="number" inputMode="decimal" placeholder="Montant €"
            style={{ width: 110, background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 12, padding: '10px 13px', color: 'var(--text)', font: 'inherit', fontSize: 14 }} />
          <input value={note} onChange={(e) => setNote(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Note (ex : plein Brunico)"
            style={{ flex: 1, minWidth: 150, background: 'var(--card)', border: '1px solid var(--stroke)', borderRadius: 12, padding: '10px 13px', color: 'var(--text)', font: 'inherit', fontSize: 14 }} />
          <button className="rank-tab active" onClick={add}>Ajouter</button>
        </div>
      </div>

      {byCat.length > 0 && (
        <div className="card pad" style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 850, fontSize: 15.5, marginBottom: 10 }}>Par catégorie</h3>
          {byCat.sort((a, b) => b[1] - a[1]).map(([c, v]) => (
            <div key={c} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, fontWeight: 700, marginBottom: 3 }}>
                <span>{catLabel[c]}</span><span>{v.toFixed(0)} € · {((v / total) * 100).toFixed(0)}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 6, background: 'var(--stroke)' }}>
                <div style={{ height: '100%', borderRadius: 6, width: `${(v / total) * 100}%`, background: 'var(--accent)' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ padding: '4px 16px' }}>
        {expenses.length === 0 && <div className="empty">Aucune dépense pour l’instant — le compteur démarre le 17 septembre ⛽</div>}
        {expenses.map((e) => (
          <div key={e.id} className="kv" style={{ alignItems: 'center' }}>
            <span className="k" style={{ minWidth: 0 }}>
              <b style={{ color: 'var(--text)' }}>{catLabel[e.cat]}</b>
              {e.note && <span style={{ color: 'var(--text-3)' }}> · {e.note}</span>}
              <span style={{ color: 'var(--text-3)', fontSize: 12 }}> · {new Date(e.date + 'T12:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
            </span>
            <span className="v" style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
              {e.amount.toFixed(2)} €
              <button onClick={() => setExpenses((x) => x.filter((y) => y.id !== e.id))} style={{ color: 'var(--red)', fontSize: 13 }} aria-label="Supprimer">✕</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
