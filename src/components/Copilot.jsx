import React, { useState, useRef, useEffect } from 'react'

// Copilote IA (Gemini) — même intégration que Thyrox : POST /api/chat
// avec {messages:[{role,text}]}, réponse {text, model}.

const SUGGESTIONS = [
  'Quelle rando nous conseilles-tu demain ?',
  'Où vidanger près de Cortina ?',
  'Le Seceda est-il faisable avec Valky ?',
  'Résume-nous la journée J7',
  'Où voir le plus beau coucher de soleil ?',
]

// Mini-rendu : **gras**, liens [texte](#/... ou https://...), puces, sauts de ligne.
function renderMarkdown(text) {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return esc
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\[([^\]]+)\]\((#\/[^\s)]*|https?:\/\/[^\s)]+)\)/g, (m, label, url) =>
      `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noreferrer"' : ''}>${label}</a>`)
    .replace(/^[*-] (.+)$/gm, '• $1')
    .replace(/\n/g, '<br/>')
}

export default function Copilot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('dolo26:copilot')) || [] } catch { return [] }
  })
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    try { sessionStorage.setItem('dolo26:copilot', JSON.stringify(msgs.slice(-40))) } catch {}
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [msgs, open, busy])

  const send = async (textArg) => {
    const text = (textArg || input).trim()
    if (!text || busy) return
    setInput('')
    const next = [...msgs, { role: 'user', text }]
    setMsgs(next)
    setBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.slice(-20).map((m) => ({ role: m.role, text: m.text })),
          page: window.location.hash.replace(/^#\//, '') || 'accueil',
          today: new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Erreur du serveur.')
      setMsgs((m) => [...m, { role: 'model', text: data.text, model: data.model }])
    } catch (e) {
      setMsgs((m) => [...m, { role: 'model', text: '⚠️ ' + (e.message || 'Erreur — réessaie.') }])
    }
    setBusy(false)
  }

  return (
    <>
      <button className={`copilot-fab ${open ? 'hide' : ''}`} onClick={() => setOpen(true)} aria-label="Copilote IA">
        🤖
      </button>

      {open && (
        <div className="copilot-panel" role="dialog" aria-label="Copilote IA">
          <div className="cp-head">
            <div>
              <b>🤖 Copilote</b>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>Gemini · connaît tout le voyage</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {msgs.length > 0 && (
                <button className="icon-btn" style={{ width: 32, height: 32, fontSize: 13 }} onClick={() => setMsgs([])} aria-label="Effacer" title="Nouvelle conversation">🗑</button>
              )}
              <button className="icon-btn" style={{ width: 32, height: 32, fontSize: 13 }} onClick={() => setOpen(false)} aria-label="Fermer">✕</button>
            </div>
          </div>

          <div className="cp-msgs" ref={listRef}>
            {msgs.length === 0 && (
              <div className="cp-welcome">
                <p>Salut ! Je connais tout le voyage : randos, spots de nuit, planning, aires, patous… Pose-moi une question 👇</p>
                <div className="cp-suggests">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`cp-msg ${m.role}`}>
                <div className="cp-bubble" dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }} />
                {m.model && <div className="cp-model">{m.model}</div>}
              </div>
            ))}
            {busy && <div className="cp-msg model"><div className="cp-bubble cp-typing"><span /><span /><span /></div></div>}
          </div>

          <div className="cp-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Demande au copilote…"
              disabled={busy}
            />
            <button className="cp-send" onClick={() => send()} disabled={busy || !input.trim()} aria-label="Envoyer">➤</button>
          </div>
        </div>
      )}
    </>
  )
}
