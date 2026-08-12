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
  // Copilote : checklist du matin { date: 'YYYY-MM-DD', done: [ids] }
  const [dayCheck, setDayCheck] = useStored('daycheck', { date: '', done: [] })
  // Notation personnelle par lieu : { locId: { paysage: 1-5, ... , avis: '' } }
  const [myRatings, setMyRatings] = useStored('myratings', {})
  // Détails des randos réalisées : { locId: { date, realTime, comment } }
  const [doneDetails, setDoneDetails] = useStored('donedetails', {})
  // Dépenses : [{ id, date, cat, amount, note }] + budget total
  const [expenses, setExpenses] = useStored('expenses', [])
  const [budget, setBudget] = useStored('budget', 2500)
  // Coffre à documents : [{ id, label, url, note }]
  const [docs, setDocs] = useStored('docs', [])
  // Jour affiché sur la page Aujourd'hui (null = auto selon la date réelle)
  const [todayOverride, setTodayOverride] = useStored('today-override', null)

  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  const toggleDone = (id) => setDone((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  const setNote = (id, text) => setNotes((n) => ({ ...n, [id]: text }))
  const setMyRating = (locId, crit, val) => setMyRatings((r) => ({ ...r, [locId]: { ...(r[locId] || {}), [crit]: val } }))
  const setDoneDetail = (locId, patch) => setDoneDetails((d) => ({ ...d, [locId]: { ...(d[locId] || {}), ...patch } }))

  const value = {
    theme, setTheme, favs, toggleFav, notes, setNote, done, toggleDone, checklist, setChecklist, plan, setPlan,
    dayCheck, setDayCheck, myRatings, setMyRating, doneDetails, setDoneDetail,
    expenses, setExpenses, budget, setBudget, docs, setDocs, todayOverride, setTodayOverride,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)
