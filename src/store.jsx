import React, { createContext, useContext } from 'react'
import { useStored } from './hooks'
import { DEFAULT_PLAN } from './data/planning'
import { DEFAULT_CHECKLIST } from './data/checklist'

const Ctx = createContext(null)

export function StoreProvider({ children }) {
  const [theme, setTheme] = useStored('theme', 'dark')
  const [favs, setFavs] = useStored('favs', [])
  const [notes, setNotes] = useStored('notes', {})
  const [done, setDone] = useStored('done', [])
  // checklist-v2 : blocs thématiques détaillés
  const [checklist, setChecklist] = useStored('checklist-v2', DEFAULT_CHECKLIST)
  // plan-v4 : étapes 3-4 h max + infos trajet (km/temps) par jour
  const [plan, setPlan] = useStored('plan-v4', DEFAULT_PLAN)

  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  const toggleDone = (id) => setDone((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  const setNote = (id, text) => setNotes((n) => ({ ...n, [id]: text }))

  const value = { theme, setTheme, favs, toggleFav, notes, setNote, done, toggleDone, checklist, setChecklist, plan, setPlan }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)
