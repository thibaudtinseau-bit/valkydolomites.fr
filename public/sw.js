// Service worker : app shell en cache + cache au fil de l'eau (pages, tuiles, photos, météo).
const VERSION = 'dolo26-v1'
const APP_SHELL = ['/', '/manifest.webmanifest', '/icon.svg']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const { request } = e
  if (request.method !== 'GET') return
  const url = new URL(request.url)

  // Météo : réseau d'abord (données fraîches), cache en secours hors-ligne.
  if (url.hostname.includes('open-meteo.com')) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(VERSION).then((c) => c.put(request, copy))
          return res
        })
        .catch(() => caches.match(request))
    )
    return
  }

  // Navigation : réseau d'abord, repli sur le shell en cache (offline).
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(VERSION).then((c) => c.put('/', copy))
          return res
        })
        .catch(() => caches.match('/'))
    )
    return
  }

  // Assets, photos, tuiles : cache d'abord, sinon réseau puis mise en cache.
  e.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit
      return fetch(request).then((res) => {
        if (res.ok && (url.origin === location.origin || url.hostname.includes('wikimedia') || url.hostname.includes('cartocdn') || url.hostname.includes('opentopomap'))) {
          const copy = res.clone()
          caches.open(VERSION).then((c) => c.put(request, copy))
        }
        return res
      })
    })
  )
})
