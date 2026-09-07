export const config = {
  matcher: [
    '/((?!_vercel|favicon\\.ico|icon\\.svg|icon-192\\.png|icon-512\\.png|manifest\\.webmanifest).*)',
  ],
}

const PASSWORD = process.env.SITE_PASSWORD || 'JpjuJT@%84gPewOTvb6F$9rP1q'

export default function middleware(req) {
  const auth = req.headers.get('authorization') || ''
  if (auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6))
      const idx = decoded.indexOf(':')
      const pass = idx >= 0 ? decoded.slice(idx + 1) : decoded
      if (pass === PASSWORD) return
    } catch {}
  }
  return new Response('Authentification requise', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Dolomites 2026", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
