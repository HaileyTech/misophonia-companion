import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import DeleteConfirmationModal from '../../components/journal/DeleteConfirmationModal'
import { formatJournalDate } from '../../utils/journalStorage'

function EntryField({ label, children }) {
  return (
    <div>
      <dt className="mb-2 font-semibold">{label}</dt>
      <dd className="whitespace-pre-wrap break-words leading-relaxed">{children}</dd>
    </div>
  )
}

function JournalEntry({ entry, onDelete, storageError }) {
  const navigate = useNavigate()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')

  function deleteEntry() {
    try {
      onDelete(entry.id)
      navigate('/journal', { replace: true })
    } catch {
      setError('This entry could not be deleted. Check your browser storage settings and try again.')
    }
  }

  return (
    <div className="page-container py-8 sm:py-10">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <Link to="/journal" className="group inline-flex items-center gap-2 font-semibold text-sage hover:underline"><ArrowLeft size={19} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:-translate-x-1" />Back to journal</Link>
        <span className="rounded-full bg-pale-sage px-4 py-1.5 text-sm text-sage">Saved entry</span>
      </div>
      <header className="border-b border-secondary/40 pb-5">
        <h1 className="mb-2 break-words text-3xl font-bold sm:text-4xl">{entry.title}</h1>
        <time dateTime={entry.date} className="text-sm text-secondary">{formatJournalDate(entry.date)}</time>
      </header>
      <dl className="space-y-7 pt-7">
        <EntryField label="Situation">{entry.situation || 'Not recorded'}</EntryField>
        <EntryField label="Intensity">{entry.intensity === null ? 'Not rated' : <span className="text-xl font-medium text-sage">{entry.intensity} out of 5</span>}</EntryField>
        <EntryField label="How were you feeling?">{entry.feelings || 'Not recorded'}</EntryField>
        <EntryField label="What happened, and what did you notice?">{entry.reflection || 'Not recorded'}</EntryField>
        <EntryField label="Was anything helpful?">{entry.helpful || 'Not recorded'}</EntryField>
      </dl>
      {storageError && <p role="alert" className="mt-5 text-sm text-red-800">{storageError}</p>}
      <div className="mt-10 flex flex-wrap justify-between gap-4">
        <Link to={`/journal/${entry.id}/edit`} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-soft-sage px-8 py-3 font-semibold hover:bg-soft-sage-dark sm:w-2/5"><Pencil size={19} aria-hidden="true" />Edit</Link>
        <button type="button" disabled={Boolean(storageError)} onClick={() => { setError(''); setConfirmDelete(true) }} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-warm-sand px-8 py-3 font-semibold enabled:hover:bg-warm-sand/70 disabled:opacity-50 sm:w-2/5"><Trash2 size={20} aria-hidden="true" />Delete</button>
      </div>
      {confirmDelete && <DeleteConfirmationModal title={entry.title} error={error} onCancel={() => setConfirmDelete(false)} onConfirm={deleteEntry} />}
    </div>
  )
}

export default JournalEntry
