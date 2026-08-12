import React from 'react'
import { NEW_LOCATIONS } from '../data/locations'
import { BASES } from '../data/bases'

const AIRES = [
  { name: 'Camperpark Pontives (Val Gardena)', what: 'Aire complète — eau, vidange, élec, navette Ortisei', note: 'Notre base Gardena. Ouvert à l’année.' },
  { name: 'Area sosta Selva Val Gardena', what: 'Aire au pied de la Vallunga', note: 'Idéal Vallunga/Puez tôt le matin.' },
  { name: 'Area sosta Corvara (Alta Badia)', what: 'Aire officielle, services complets', note: 'Pivot Falzarego / La Crusc.' },
  { name: 'Camping Seiser Alm (Völs am Schlern)', what: 'Camping premium, spa, chiens bienvenus', note: 'Le grand confort à mi-voyage — réserver.' },
  { name: 'Camping Rocchetta / Dolomiti (Cortina)', what: 'Campings simples sous les Tofane', note: 'Fermetures automnales : vérifier début octobre.' },
  { name: 'Area sosta Misurina', what: 'Aire avec vue sur le lac — eau, vidange, élec', note: 'Camp de base Tre Cime/Cadini.' },
  { name: 'Parking Rifugio Auronzo (2 320 m)', what: 'Nuit tolérée avec supplément au péage', note: 'Lever de soleil sur les Tre Cime au réveil.' },
  { name: 'Area sosta Canazei – Ischia', what: 'Grande aire officielle du Val di Fassa', note: 'Base sud : Sella, Fedaia, Venegia.' },
  { name: 'Area sosta Funes (San Pietro)', what: 'Aire simple — eau, vidange', note: 'Étape Odle / Adolf Munkel.' },
  { name: 'Aire de Dobbiaco & Caravan Park Sexten', what: 'Services complets (déjà connus de vous)', note: 'Ravitaillement du secteur nord.' },
]

const RULES = [
  ['⛽ Autonomie 3 jours', 'Eau + batterie : viser une aire avec services tous les 2-3 jours. Le planning alterne nuits d’altitude (tolérées) et aires officielles.'],
  ['🌙 Nuits en altitude', 'Aux cols (Sella, Pordoi, Falzarego, Fedaia, Giau), la nuit est souvent tolérée hors panneaux d’interdiction — toujours vérifier la signalisation sur place, partir tôt, ne rien laisser dehors.'],
  ['🚫 Camping sauvage', 'Interdit dans les parcs naturels (Puez-Odle, Tre Cime, Sciliar…) et dans les zones “divieto sosta camper”. Le stationnement (sans sortir table/chaises/cales) reste distinct du camping.'],
  ['❄️ Fin septembre', 'Premières gelées possibles au-dessus de 1 800 m : vidanger de jour, penser au gaz pour le chauffage, pneus corrects pour les cols.'],
  ['🏔️ Cols & gabarits', 'Tous les grands cols passent en < 8 m. Attention aux routes de fond de vallée (Zans, Venegia, La Val) : < 7,5 m conseillé.'],
  ['🛒 Gaz & GPL', 'Bouteilles italiennes différentes des françaises : partir plein. GPL carburant dispo à Bolzano/Brunico.'],
]

export default function Camper() {
  const overnightOk = NEW_LOCATIONS.filter((l) => /oui|tolérée|supplément/i.test(l.camper.overnight))
  return (
    <div className="page fade-in">
      <div className="eyebrow">La maison roulante</div>
      <div className="section-head" style={{ marginBottom: 8 }}><h2>Camping-car</h2></div>
      <p style={{ color: 'var(--text-2)', fontSize: 14.5, maxWidth: 680, marginBottom: 20 }}>
        3 jours d’autonomie (eau, batterie), un chien à bord, et l’envie d’alterner aires officielles et stationnements
        autorisés en altitude. Voici notre plan de bataille.
      </p>

      <div className="grid cols-2" style={{ marginBottom: 26 }}>
        {RULES.map(([t, d]) => (
          <div key={t} className="card pad">
            <h3 style={{ fontWeight: 850, fontSize: 15.5, marginBottom: 7 }}>{t}</h3>
            <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{d}</p>
          </div>
        ))}
      </div>

      <div className="section-head"><h2 style={{ fontSize: 21 }}>Aires & campings du parcours</h2></div>
      <div className="card" style={{ padding: '4px 18px', marginBottom: 26 }}>
        {AIRES.map((a) => (
          <div key={a.name} className="kv" style={{ alignItems: 'flex-start' }}>
            <span className="k" style={{ fontWeight: 800, color: 'var(--text)' }}>{a.name}<br /><small style={{ color: 'var(--text-3)', fontWeight: 600 }}>{a.what}</small></span>
            <span className="v" style={{ color: 'var(--text-2)', fontWeight: 500, maxWidth: '46%' }}>{a.note}</span>
          </div>
        ))}
      </div>

      <div className="section-head"><h2 style={{ fontSize: 21 }}>🌙 Où la nuit est possible sur place</h2></div>
      <div style={{ display: 'grid', gap: 8 }}>
        {overnightOk.map((l) => (
          <a key={l.id} className="card" href={`#/lieu/${l.id}`} style={{ padding: '13px 16px', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
            <b style={{ fontSize: 14.5 }}>{l.name}</b>
            <span style={{ fontSize: 12.5, color: 'var(--text-2)', textAlign: 'right' }}>{l.camper.overnight}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
