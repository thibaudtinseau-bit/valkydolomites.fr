import { useState, useEffect, useCallback } from 'react'

// ─── Tiny hash router: '#/lieu/seceda' → ['lieu', 'seceda'] ───
export function useRoute() {
  const parse = () => decodeURIComponent(window.location.hash.replace(/^#\/?/, '')).split('/').filter(Boolean)
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const onHash = () => { setRoute(parse()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}
export const navigate = (path) => { window.location.hash = path }

// ─── Persistent state (localStorage) ───
export function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem('dolo26:' + key)
      return raw != null ? JSON.parse(raw) : initial
    } catch { return initial }
  })
  const set = useCallback((v) => {
    setValue((prev) => {
      const next = typeof v === 'function' ? v(prev) : v
      try { localStorage.setItem('dolo26:' + key, JSON.stringify(next)) } catch {}
      return next
    })
  }, [key])
  return [value, set]
}

// ─── Open-Meteo forecast, cached 30 min per coords ───
const wxCache = {}
export function useWeather(lat, lon) {
  const key = `${lat.toFixed(2)},${lon.toFixed(2)}`
  const [data, setData] = useState(() => wxCache[key]?.data || null)
  const [error, setError] = useState(false)
  useEffect(() => {
    let dead = false
    const cached = wxCache[key]
    if (cached && Date.now() - cached.at < 30 * 60 * 1000) { setData(cached.data); return }
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,snowfall_sum,sunrise,sunset` +
      `&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FRome&forecast_days=7`
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (dead) return
        wxCache[key] = { data: j, at: Date.now() }
        try { localStorage.setItem('dolo26:wx:' + key, JSON.stringify(wxCache[key])) } catch {}
        setData(j)
      })
      .catch(() => {
        // offline: fall back to last stored forecast
        try {
          const raw = localStorage.getItem('dolo26:wx:' + key)
          if (raw && !dead) { setData(JSON.parse(raw).data); return }
        } catch {}
        if (!dead) setError(true)
      })
    return () => { dead = true }
  }, [key])
  return { data, error }
}

export const WMO = {
  0: ['☀️', 'Grand ciel bleu'], 1: ['🌤️', 'Éclaircies'], 2: ['⛅', 'Nuages épars'], 3: ['☁️', 'Couvert'],
  45: ['🌫️', 'Brouillard'], 48: ['🌫️', 'Brouillard givrant'],
  51: ['🌦️', 'Bruine'], 53: ['🌦️', 'Bruine'], 55: ['🌧️', 'Bruine forte'],
  61: ['🌧️', 'Pluie faible'], 63: ['🌧️', 'Pluie'], 65: ['🌧️', 'Pluie forte'],
  66: ['🌧️', 'Pluie verglaçante'], 67: ['🌧️', 'Pluie verglaçante'],
  71: ['🌨️', 'Neige faible'], 73: ['🌨️', 'Neige'], 75: ['❄️', 'Neige forte'], 77: ['🌨️', 'Grains de neige'],
  80: ['🌦️', 'Averses'], 81: ['🌧️', 'Averses'], 82: ['⛈️', 'Fortes averses'],
  85: ['🌨️', 'Averses de neige'], 86: ['❄️', 'Averses de neige'],
  95: ['⛈️', 'Orage'], 96: ['⛈️', 'Orage grêle'], 99: ['⛈️', 'Orage grêle'],
}
export const wmo = (code) => WMO[code] || ['🌡️', '—']

// Score 0-100 : à quel point la journée est belle pour la haute montagne.
export function dayScore(d, i) {
  if (!d) return 50
  const rain = d.precipitation_sum?.[i] ?? 0
  const prob = d.precipitation_probability_max?.[i] ?? 0
  const wind = d.wind_speed_10m_max?.[i] ?? 0
  const snow = d.snowfall_sum?.[i] ?? 0
  const code = d.weather_code?.[i] ?? 3
  let s = 100
  s -= Math.min(45, rain * 9)
  s -= Math.min(20, prob * 0.18)
  s -= Math.min(20, Math.max(0, wind - 20) * 0.9)
  s -= Math.min(30, snow * 15)
  if (code >= 95) s -= 40
  else if (code >= 71 && code <= 86) s -= 25
  else if (code === 3) s -= 8
  else if (code >= 45 && code <= 48) s -= 12
  return Math.max(0, Math.round(s))
}
