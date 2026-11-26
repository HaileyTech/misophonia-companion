import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import JournalList from './journal/JournalList'
import JournalEntry from './journal/JournalEntry'
import JournalEntryForm from '../components/journal/JournalEntryForm'
import { buildEntry, JOURNAL_STORAGE_KEY, readJournal, writeJournal } from '../utils/journalStorage'

function EntryRoute({ entries, storageError, editing = false, onSave, onDelete }) {
  const { entryId } = useParams()
  const entry = entries.find((item) => item.id === entryId)
  if (!entry) {
    return (
      <div className="page-container py-10">
        <h1 className="text-3xl font-bold">Journal entry unavailable</h1>
        <p className="mt-3 leading-relaxed">{storageError || 'This entry may have been deleted or may not exist in this browser.'}</p>
        <Link to="/journal" className="mt-5 inline-block font-semibold text-sage hover:underline">Back to journal</Link>
      </div>
    )
  }
  return editing
    ? <JournalEntryForm key={`edit-${entry.id}`} entry={entry} onSave={onSave} storageError={storageError} />
    : <JournalEntry key={entry.id} entry={entry} onDelete={onDelete} storageError={storageError} />
}

function Journal() {
  const [journal, setJournal] = useState(readJournal)
  const { entries, error: storageError } = journal

  // Keep other open tabs in sync when the browser reports a storage change.
  useEffect(() => {
    function sync(event) {
      if (event.key === JOURNAL_STORAGE_KEY || event.key === null) setJournal(readJournal())
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  function saveEntry(values, existing) {
    const latest = readJournal()
    if (latest.error) throw new Error(latest.error)
    // Don't recreate a deleted entry or silently overwrite an externally edited entry.
    if (existing && !latest.entries.some((entry) => entry.id === existing.id && entry.updatedAt === existing.updatedAt)) throw new Error('Entry changed in another tab')
    const saved = buildEntry(values, existing)
    const next = existing
      ? latest.entries.map((entry) => entry.id === saved.id ? saved : entry)
      : [...latest.entries, saved]
    writeJournal(next)
    setJournal({ entries: next, error: '' })
    return saved
  }

  function deleteEntry(id) {
    const latest = readJournal()
    if (latest.error) throw new Error(latest.error)
    const next = latest.entries.filter((entry) => entry.id !== id)
    writeJournal(next)
    setJournal({ entries: next, error: '' })
  }

  return (
    <Routes>
      <Route index element={<JournalList entries={entries} storageError={storageError} />} />
      <Route path="new" element={<JournalEntryForm key="new" onSave={saveEntry} storageError={storageError} />} />
      <Route path=":entryId" element={<EntryRoute entries={entries} storageError={storageError} onDelete={deleteEntry} />} />
      <Route path=":entryId/edit" element={<EntryRoute entries={entries} storageError={storageError} editing onSave={saveEntry} />} />
      <Route path="*" element={<Navigate to="/journal" replace />} />
    </Routes>
  )
}

export default Journal
