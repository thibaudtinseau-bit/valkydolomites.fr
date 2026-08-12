import React, { useState, useEffect, useRef, useCallback } from 'react'

// Galerie + lightbox plein écran : flèches, clavier, swipe mobile, pincer/double-tap zoom.
export default function Gallery({ photos, name }) {
  const [open, setOpen] = useState(-1)
  if (!photos.length) return null
  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => (
          <button key={i} className="g-item" onClick={() => setOpen(i)} aria-label={`Photo ${i + 1}`}>
            <img src={p.thumb || p.url} alt={p.title || name} loading="lazy" />
          </button>
        ))}
      </div>
      {open >= 0 && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </>
  )
}

function Lightbox({ photos, index, onIndex, onClose }) {
  const [zoom, setZoom] = useState(1)
  const [off, setOff] = useState({ x: 0, y: 0 })
  const touch = useRef(null)
  const p = photos[index]

  const go = useCallback((d) => {
    setZoom(1); setOff({ x: 0, y: 0 })
    onIndex((index + d + photos.length) % photos.length)
  }, [index, photos.length, onIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [go, onClose])

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const [a, b] = e.touches
      touch.current = { pinch: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), startZoom: zoom }
    } else {
      const t = e.touches[0]
      touch.current = { x: t.clientX, y: t.clientY, ox: off.x, oy: off.y, at: Date.now() }
    }
  }
  const onTouchMove = (e) => {
    const st = touch.current
    if (!st) return
    if (e.touches.length === 2 && st.pinch) {
      const [a, b] = e.touches
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
      setZoom(Math.min(4, Math.max(1, st.startZoom * (d / st.pinch))))
    } else if (e.touches.length === 1 && st.x != null) {
      const t = e.touches[0]
      if (zoom > 1) setOff({ x: st.ox + (t.clientX - st.x), y: st.oy + (t.clientY - st.y) })
      else st.dx = t.clientX - st.x
    }
  }
  const onTouchEnd = () => {
    const st = touch.current
    if (st && zoom === 1 && st.dx != null && Math.abs(st.dx) > 60) go(st.dx < 0 ? 1 : -1)
    else if (st && st.x != null && st.dx == null && Date.now() - st.at < 250) {
      // double-tap zoom
      if (st.lastTap && Date.now() - st.lastTap < 350) { setZoom((z) => (z > 1 ? 1 : 2.2)); setOff({ x: 0, y: 0 }) }
      touch.current = { lastTap: Date.now() }
      return
    }
    touch.current = null
  }

  return (
    <div className="lightbox" role="dialog" aria-label="Galerie plein écran">
      <div className="lb-top">
        <span>{index + 1} / {photos.length}</span>
        <button className="icon-btn" onClick={onClose} aria-label="Fermer" style={{ background: 'rgba(255,255,255,.1)' }}>✕</button>
      </div>
      <div className="lb-stage" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <button className="lb-arrow prev" onClick={() => go(-1)} aria-label="Précédente">‹</button>
        <img
          src={p.url} alt={p.title || ''}
          style={{ transform: `translate(${off.x}px, ${off.y}px) scale(${zoom})`, cursor: zoom > 1 ? 'grab' : 'zoom-in' }}
          onDoubleClick={() => { setZoom((z) => (z > 1 ? 1 : 2.2)); setOff({ x: 0, y: 0 }) }}
        />
        <button className="lb-arrow next" onClick={() => go(1)} aria-label="Suivante">›</button>
      </div>
      <div className="lb-caption">
        {p.title}
        {p.page && <> · <a href={p.page} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>Wikimedia Commons</a></>}
      </div>
    </div>
  )
}
