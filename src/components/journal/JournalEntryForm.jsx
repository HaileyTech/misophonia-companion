import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IntensitySelector from './IntensitySelector'
import { todayDate } from '../../utils/journalStorage'

const inputClass = 'w-full rounded-lg border border-secondary/40 bg-white px-4 py-3 text-base placeholder:text-secondary/80'

function JournalEntryForm({ entry = null, onSave, storageError }) {
  const navigate = useNavigate()
  const [originalEntry] = useState(entry)
  const [values, setValues] = useState(() => ({
    title: entry?.title ?? '',
    date: entry?.date ?? todayDate(),
    situation: entry?.situation ?? '',
    intensity: entry?.intensity ?? null,
    feelings: entry?.feelings ?? '',
    reflection: entry?.reflection ?? '',
    helpful: entry?.helpful ?? '',
  }))
  const [error, setError] = useState('')

  const cancelPath = entry ? `/journal/${entry.id}` : '/journal'
  function change(field, value) {
    setValues((previous) => ({ ...previous, [field]: value }))
    setError('')
  }

  function submit(event) {
    event.preventDefault()
    try {
      const saved = onSave(values, originalEntry)
      navigate(`/journal/${saved.id}`, { replace: true })
    } catch (error) {
      setError(error.message === 'Entry changed in another tab'
        ? 'This entry was changed in another tab. Your responses are still here. Copy any changes you want to keep before reopening the entry.'
        : 'Your entry could not be saved. Your responses are still here. Check your browser storage settings and try again.')
    }
  }

  return (
    <div className="page-container py-8 sm:py-10">
      <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{entry ? 'Edit Journal Entry' : 'New Journal Entry'}</h1>
      <p className="leading-relaxed">You don't need to fill out every field. Write as much or as little as feels useful.</p>
      <form onSubmit={submit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="entry-title" className="mb-2 block font-semibold">Entry title</label>
          <input id="entry-title" type="text" value={values.title} onChange={(event) => change('title', event.target.value)} placeholder="Give this entry a name…" className={inputClass} />
        </div>
        <div>
          <label htmlFor="entry-date" className="mb-2 block font-semibold">Date</label>
          <input id="entry-date" type="date" value={values.date} onChange={(event) => change('date', event.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="entry-situation" className="mb-2 block font-semibold">What was the situation?</label>
          <input id="entry-situation" type="text" value={values.situation} onChange={(event) => change('situation', event.target.value)} placeholder="e.g., studying, eating with others, commuting…" className={inputClass} />
        </div>
        <IntensitySelector value={values.intensity} onChange={(value) => change('intensity', value)} />
        <div>
          <label htmlFor="entry-feelings" className="mb-2 block font-semibold">How were you feeling?</label>
          <input id="entry-feelings" type="text" value={values.feelings} onChange={(event) => change('feelings', event.target.value)} placeholder="Describe your mood or emotions…" className={inputClass} />
        </div>
        <div>
          <label htmlFor="entry-reflection" className="mb-2 block font-semibold">What happened, and what did you notice?</label>
          <textarea id="entry-reflection" rows={5} value={values.reflection} onChange={(event) => change('reflection', event.target.value)} placeholder="Write your thoughts here…" className={`${inputClass} resize-y`} />
        </div>
        <div>
          <label htmlFor="entry-helpful" className="mb-2 block font-semibold">Was anything helpful?</label>
          <textarea id="entry-helpful" rows={5} value={values.helpful} onChange={(event) => change('helpful', event.target.value)} placeholder="A strategy you tried, something that helped, or nothing in particular…" className={`${inputClass} resize-y`} />
        </div>
        {(storageError || error) && <p role="alert" className="rounded-lg bg-warm-sand p-4 text-sm text-red-800">{storageError || error}</p>}
        <div className="flex flex-wrap justify-between gap-4 pt-2">
          <Link to={cancelPath} className="inline-flex w-full items-center justify-center rounded-full bg-soft-sage px-8 py-3 font-semibold hover:bg-soft-sage-dark sm:w-2/5">Cancel</Link>
          <button type="submit" disabled={Boolean(storageError)} className="w-full rounded-full bg-sage px-8 py-3 font-semibold text-white enabled:hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-2/5">Save</button>
        </div>
      </form>
    </div>
  )
}

export default JournalEntryForm
