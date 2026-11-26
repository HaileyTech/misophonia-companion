import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { formatJournalDate } from '../../utils/journalStorage'

function JournalEntryCard({ entry }) {
  const preview = entry.reflection || entry.helpful || entry.feelings
  return (
    <article className="rounded-2xl border border-secondary/50 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="min-w-0 break-words text-xl font-bold">{entry.title}</h3>
        <time dateTime={entry.date} className="shrink-0 text-sm text-secondary">{formatJournalDate(entry.date)}</time>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {entry.intensity !== null && (
          <span className={`rounded-full px-3 py-1 ${entry.intensity >= 4 ? 'bg-warm-sand' : 'bg-soft-sage'}`}>
            {entry.intensity}/5 intensity
          </span>
        )}
        {entry.situation && <span className="max-w-full break-words rounded-full bg-background px-3 py-1">{entry.situation}</span>}
      </div>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3 sm:flex-nowrap">
        <p className="min-w-0 flex-1 break-words text-sm leading-relaxed text-charcoal">
          {preview ? <span className="line-clamp-2">“{preview}”</span> : 'No additional notes recorded.'}
        </p>
        <Link to={`/journal/${entry.id}`} aria-label={`View entry: ${entry.title}`} className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sage hover:underline">
          View Entry <ArrowRight size={16} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export default JournalEntryCard
