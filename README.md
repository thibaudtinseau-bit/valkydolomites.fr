# 🏔️ Dolomites 2026 — Road-trip en camping-car

Compagnon de voyage interactif pour notre road-trip dans les Dolomites du **17 septembre au 2 octobre 2026**, en camping-car, avec notre chien.

## Fonctionnalités

- **Carte interactive** (Leaflet + CARTO) — points colorés par note, fiches complètes au clic
- **22 nouveaux lieux** avec fiche détaillée : distance, D+, difficulté, GPX, prix, horaires
- **🐶 Compatibilité chien** notée sur 5 + 11 critères (laisse, muselière, câbles, pierriers…)
- **Risque patous** : indicateur 5 niveaux avec justification par terrain
- **🚐 Compatibilité camping-car** : hauteur, longueur, nuit sur place, vidange, eau, élec
- **7 camps de base** : dormir, courses, eau, vidange, restaurants, balades chien
- **Planning 16 jours** (Montarnaud → Dolomites → Montarnaud) réorganisable (drag & drop), avec météo par jour
- **Météo Open-Meteo** 7 jours par secteur + suggestions automatiques de randos selon le temps
- **Top 20 couchers / levers de soleil**, 7 classements thématiques
- **Carnet** : favoris, notes, checklist, randos réalisées, export JSON / PDF
- **Section « Déjà découverts »** : les lieux des précédents voyages, en gris sur la carte
- **PWA installable**, cache offline, mode sombre/clair, mobile-first

## Stack

Vite + React 18 + Leaflet. Photos : Wikimedia Commons (libres). Météo : Open-Meteo (sans clé).

```bash
npm install
npm run dev      # développement
npm run build    # production → dist/
```

Pour rafraîchir les photos : `node scripts/harvest-photos.mjs`
