export const JOURNAL_STORAGE_KEY = 'misophonia-companion.journal.v1'

export function todayDate() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export function formatJournalDate(date) {
  if (!date) return 'No date recorded'
  const [year, month, day] = date.split('-').map(Number)
  const value = new Date(year, month - 1, day)
  return Number.isNaN(value.getTime()) ? 'No date recorded' : value.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function readJournal() {
  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY)
    const entries = raw === null ? [] : JSON.parse(raw)
    if (!Array.isArray(entries) || !entries.every((entry) => entry && typeof entry.id === 'string' && ['title', 'date', 'situation', 'feelings', 'reflection', 'helpful', 'createdAt', 'updatedAt'].every((field) => typeof entry[field] === 'string') && (entry.intensity === null || [1, 2, 3, 4, 5].includes(entry.intensity)))) {
      throw new Error('Unexpected journal data')
    }
    return { entries, error: '' }
  } catch {
    return { entries: [], error: 'Your saved journal could not be read. Try reloading this page or checking your browser storage settings. To protect existing entries, changes are disabled until storage can be read.' }
  }
}

// Persist before updating the UI so a failed write is never reported as saved.
export function writeJournal(entries) {
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries))
}

export function buildEntry(values, existing = null) {
  const now = new Date().toISOString()
  return {
    id: existing?.id ?? (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`),
    title: values.title.trim() || 'Untitled entry',
    date: values.date || todayDate(),
    situation: values.situation.trim(),
    intensity: values.intensity,
    feelings: values.feelings.trim(),
    reflection: values.reflection.trim(),
    helpful: values.helpful.trim(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  }
}

export function filterAndSortEntries(entries, filter, value, sort) {
  const filtered = entries.filter((entry) => {
    if (!value || filter === 'all') return true
    if (filter === 'date') return entry.date === value
    if (filter === 'situation') return entry.situation.toLowerCase() === value.toLowerCase()
    if (filter === 'intensity') return value === 'unrated' ? entry.intensity === null : entry.intensity === Number(value)
    return true
  })
  const newest = (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt)
  return filtered.sort((a, b) => {
    if (sort === 'oldest') return -newest(a, b)
    if (sort === 'highest' || sort === 'lowest') {
      // Keep unrated entries at the end in either intensity order.
      if (a.intensity === null && b.intensity !== null) return 1
      if (b.intensity === null && a.intensity !== null) return -1
      if (a.intensity !== null && b.intensity !== null) {
        const difference = sort === 'highest' ? b.intensity - a.intensity : a.intensity - b.intensity
        if (difference) return difference
      }
    }
    return newest(a, b)
  })
}
