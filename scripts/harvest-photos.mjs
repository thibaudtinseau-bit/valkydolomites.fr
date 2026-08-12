// Harvest real, freely-licensed photos from Wikimedia Commons for each location.
// Writes src/data/photos.json  { locationId: [{url, thumb, title, page}] }
import { writeFileSync, mkdirSync } from 'node:fs'

const QUERIES = {
  'tre-cime': ['Tre Cime di Lavaredo', 'Drei Zinnen panorama', 'Rifugio Locatelli'],
  'cadini': ['Cadini di Misurina', 'Cadini Gruppe'],
  'seceda': ['Seceda ridge', 'Seceda Odle', 'Seceda Val Gardena'],
  'alpe-di-siusi': ['Alpe di Siusi', 'Seiser Alm panorama'],
  'sassolungo': ['Sassolungo', 'Langkofel'],
  'cinque-torri': ['Cinque Torri', 'Cinque Torri Dolomites'],
  'lago-sorapis': ['Lago di Sorapis', 'Sorapis lake'],
  'lago-federa': ['Lago Federa', 'Croda da Lago'],
  'lagazuoi': ['Lagazuoi', 'Passo Falzarego'],
  'adolf-munkel': ['Adolf Munkel Weg', 'Geisler Gruppe Villnoss', 'Odle di Funes'],
  'vallunga': ['Vallunga Selva', 'Langental Wolkenstein', 'Vallunga'],
  'puez': ['Rifugio Puez', 'Puez Geisler'],
  'passo-sella': ['Passo Sella', 'Sass Pordoi', 'Piz Boe'],
  'lago-fedaia': ['Lago Fedaia', 'Marmolada glacier'],
  'prato-piazza': ['Prato Piazza', 'Plätzwiese', 'Monte Specie'],
  'monte-piana': ['Monte Piana', 'Monte Piana Dolomites'],
  'lago-misurina': ['Lago di Misurina', 'Misurina'],
  'santa-croce': ['La Crusc', 'Santa Croce Badia', 'Sasso della Croce'],
  'armentara': ['Armentara meadows', 'Armentara Wiesen'],
  'sciliar': ['Sciliar', 'Schlern', 'Rifugio Bolzano Schlernhaus'],
  'latemar': ['Latemar', 'Latemar labyrinth Obereggen'],
  'val-venegia': ['Val Venegia', 'Pale di San Martino Baita Segantini'],
  'malcesine': ['Malcesine'],
  'lago-di-garda': ['Lago di Garda north', 'Lake Garda Riva'],
  'lago-di-braies': ['Lago di Braies', 'Pragser Wildsee'],
  'dobbiaco': ['Dobbiaco', 'Toblach'],
  'sexten': ['Sexten Dolomites', 'Sesto Dolomiti'],
  'lago-di-carezza': ['Lago di Carezza', 'Karersee'],
  'santa-maddalena': ['Santa Maddalena Funes', 'St. Magdalena Villnoss'],
  'passo-giau': ['Passo Giau'],
  'val-di-zoldo': ['Val di Zoldo', 'Monte Pelmo'],
  'pecol': ['Pecol Zoldo', 'Civetta'],
}

const BAD = /\.(svg|png|gif|tif|tiff|pdf|webm|ogv)$/i
const BADWORDS = /(map|karte|mappa|diagram|logo|coat|wappen|stamp|flag)/i

async function search(term, limit = 12) {
  const u = new URL('https://commons.wikimedia.org/w/api.php')
  u.searchParams.set('action', 'query')
  u.searchParams.set('format', 'json')
  u.searchParams.set('generator', 'search')
  u.searchParams.set('gsrsearch', term)
  u.searchParams.set('gsrnamespace', '6')
  u.searchParams.set('gsrlimit', String(limit))
  u.searchParams.set('prop', 'imageinfo')
  u.searchParams.set('iiprop', 'url|size')
  u.searchParams.set('iiurlwidth', '1400')
  const r = await fetch(u, { headers: { 'User-Agent': 'Dolomites2026-Trip-Planner/1.0 (contact@tnbwebfluence.com)' } })
  if (!r.ok) return []
  const j = await r.json()
  const pages = Object.values(j?.query?.pages || {})
  pages.sort((a, b) => (a.index || 99) - (b.index || 99))
  const out = []
  for (const p of pages) {
    const ii = p.imageinfo?.[0]
    if (!ii) continue
    if (BAD.test(p.title) || BADWORDS.test(p.title)) continue
    if ((ii.width || 0) < 1000 || (ii.height || 0) < 600) continue
    // prefer landscape-ish photos
    const thumb = (ii.thumburl || '').split('?')[0]
    if (!thumb) continue
    out.push({
      url: thumb,
      thumb: thumb.replace('/1400px-', '/640px-'),
      title: p.title.replace(/^File:/, '').replace(/\.(jpe?g|JPG)$/i, ''),
      page: ii.descriptionurl || '',
      w: ii.thumbwidth, h: ii.thumbheight,
    })
  }
  return out
}

const result = {}
for (const [id, terms] of Object.entries(QUERIES)) {
  const seen = new Set()
  const photos = []
  for (const t of terms) {
    if (photos.length >= 12) break
    try {
      const found = await search(t)
      for (const f of found) {
        if (seen.has(f.url)) continue
        seen.add(f.url)
        photos.push(f)
        if (photos.length >= 12) break
      }
    } catch (e) {
      console.error(`  ! ${id} "${t}": ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 250))
  }
  result[id] = photos
  console.log(`${id}: ${photos.length} photos`)
}

mkdirSync('src/data', { recursive: true })
writeFileSync('src/data/photos.json', JSON.stringify(result, null, 1))
console.log('OK -> src/data/photos.json')
