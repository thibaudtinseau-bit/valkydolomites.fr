import React, { createContext, useContext } from 'react'
import { useStored } from './hooks'
import { DEFAULT_PLAN } from './data/planning'

const Ctx = createContext(null)

export function StoreProvider({ children }) {
  const [theme, setTheme] = useStored('theme', 'dark')
  const [favs, setFavs] = useStored('favs', [])
  const [notes, setNotes] = useStored('notes', {})
  const [done, setDone] = useStored('done', [])
  const [checklist, setChecklist] = useStored('checklist', [
    { id: 1, text: 'Papiers du chien (passeport UE, antirabique)', done: false },
    { id: 2, text: 'Muselière pour les remontées mécaniques', done: false },
    { id: 3, text: 'Gourde + gamelle pliable', done: false },
    { id: 4, text: 'Bottillons chien (pierriers)', done: false },
    { id: 5, text: 'Vignette autoroute autrichienne (si transit)', done: false },
    { id: 6, text: 'Cales, adaptateur CEE, tuyau eau', done: false },
    { id: 7, text: 'Batterie : contrôle avant départ', done: false },
    { id: 8, text: 'Appli péage Tre Cime / monnaie', done: false },
  ])
  const [plan, setPlan] = useStored('plan', DEFAULT_PLAN)

  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  const toggleDone = (id) => setDone((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  const setNote = (id, text) => setNotes((n) => ({ ...n, [id]: text }))

  const value = { theme, setTheme, favs, toggleFav, notes, setNote, done, toggleDone, checklist, setChecklist, plan, setPlan }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)
