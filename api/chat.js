// ============================================================
// Copilote IA (Gemini) — fonction serverless Vercel.
// Même intégration que Thyrox : clé côté serveur, cascade de
// modèles Flash avec doublement du budget si réponse coupée.
// Le contexte complet du voyage est injecté côté serveur.
// ============================================================
import { TRIP_CONTEXT } from './_context.js'

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST uniquement' })

  const key = process.env.GEMINI_API_KEY
  if (!key) return res.status(503).json({ error: 'Clé Gemini non configurée (GEMINI_API_KEY dans Vercel).' })

  const { messages, page, today } = req.body || {}

  const system =
    `Tu tournes sur le modèle Gemini indiqué par l'appli ; si on te demande quel modèle tu es, ` +
    `réponds exactement le nom affiché sous tes réponses dans l'appli et n'invente aucune version. ` +
    `Tu es le copilote de voyage du site valkydolomites.fr : un road-trip dans les Dolomites du 17 septembre ` +
    `au 2 octobre 2026, en camping-car, avec le chien Valky. Tu aides chaque jour : choisir la rando selon la météo, ` +
    `trouver où dormir/vidanger/faire les courses, adapter le planning, éviter les troupeaux et chiens de protection (patous). ` +
    `Réponds en français, de façon concrète et concise (pas de pavés), en t'appuyant sur les données du voyage ci-dessous. ` +
    `Réponds toujours de façon complète : ne coupe jamais une phrase en cours.\n\n` +
    `Pour renvoyer vers une page du site, utilise des liens Markdown avec ces adresses : ` +
    `[nom du lieu](#/lieu/ID) pour une fiche (ID = champ id des lieux), [le planning](#/planning), ` +
    `[la carte](#/carte), [la météo](#/meteo), [les webcams](#/webcams), [les spots de nuit](#/nuits), ` +
    `[autour du camp](#/autour), [que faire aujourd'hui](#/assistant), [l'itinéraire](#/itineraire), ` +
    `[les coûts](#/couts), [le carnet](#/favoris).\n\n` +
    `Règles importantes : le Lago di Sorapis est à éviter avec le chien (passages câblés). ` +
    `Les indicateurs patous sont des estimations, jamais une garantie — recommande toujours laisse courte et distance ` +
    `avec les troupeaux. Les lieux marqués « déjà visité » ne sont pas des objectifs. ` +
    `Tu n'as pas accès à la météo en direct : pour la météo du jour, renvoie vers [la météo](#/meteo) ou les webcams.\n\n` +
    (today ? `Date du jour : ${today}. ` : '') +
    (page ? `L'utilisateur est actuellement sur la page « ${page} » du site.\n\n` : '\n') +
    `Données du voyage : ` + TRIP_CONTEXT.slice(0, 60000)

  const contents = (Array.isArray(messages) ? messages : []).slice(-20).map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: String(m.text || '').slice(0, 4000) }],
  }))
  if (!contents.length) return res.status(400).json({ error: 'Message vide.' })

  // Modèle principal, puis repli si le plus récent est saturé (erreur 429/503)
  const models = (process.env.GEMINI_MODEL || 'gemini-3.6-flash,gemini-3.5-flash,gemini-2.5-flash')
    .split(',').map((s) => s.trim()).filter(Boolean)
  let lastErr = 'Erreur Gemini.'
  // Deux tentatives par modèle : la seconde double le budget si la réponse a été
  // coupée (les modèles « thinking » consomment ce budget avant d'écrire).
  for (const model of models) {
    for (const budget of [4096, 8192]) {
      try {
        const gRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: system }] },
              contents,
              generationConfig: { maxOutputTokens: budget },
            }),
          }
        )
        const data = await gRes.json()
        if (!gRes.ok) {
          lastErr = (data.error && data.error.message) || 'Erreur Gemini.'
          if (gRes.status === 429 || gRes.status === 503 || gRes.status === 500) break // saturé → modèle suivant
          return res.status(502).json({ error: lastErr })
        }
        const cand = (data.candidates || [])[0] || {}
        const text = ((cand.content || {}).parts || []).map((p) => p.text || '').join('').trim()
        const tronque = cand.finishReason === 'MAX_TOKENS'
        if (!text || tronque) {
          lastErr = tronque ? 'Réponse coupée.' : 'Réponse vide.'
          if (budget === 4096) continue // on réessaie avec un budget doublé
          break // sinon on passe au modèle suivant
        }
        // modelVersion vient de l'API : c'est la seule source fiable du modèle réellement utilisé
        return res.status(200).json({ text, model: data.modelVersion || model })
      } catch (e) {
        lastErr = 'Impossible de joindre Gemini.'
        break
      }
    }
  }
  return res.status(502).json({ error: lastErr })
}
