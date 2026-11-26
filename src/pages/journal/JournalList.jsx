import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Info, NotebookPen, Plus } from 'lucide-react'
import JournalEntryCard from '../../components/journal/JournalEntryCard'
import { filterAndSortEntries } from '../../utils/journalStorage'

const selectClass = 'w-full appearance-none rounded-xl border border-secondary/50 bg-white py-3 pl-4 pr-11 text-sm'

function JournalSelect({ label, value, onChange, children }) {
  return (
    <div className="relative min-w-0">
      <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className={selectClass}>
        {children}
      </select>
      <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  )
}

function AddEntryLink({ children }) {
  return (
    <Link to="/journal/new" className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white hover:bg-sage-dark">
      <Plus size={17} aria-hidden="true" />{children}
    </Link>
  )
}

function JournalList({ entries, storageError }) {
  const [filter, setFilter] = useState('all')
  const [filterValue, setFilterValue] = useState('')
  const [sort, setSort] = useState('newest')

  const situations = [...new Map(entries.filter((entry) => entry.situation).map((entry) => [entry.situation.toLowerCase(), entry.situation])).values()].sort((a, b) => a.localeCompare(b))
  const visibleEntries = filterAndSortEntries(entries, filter, filterValue, sort)

  function changeFilter(value) {
    setFilter(value)
    setFilterValue('')
  }

  return (
    <div className="page-container py-8 sm:py-10">
      <h1 className="mb-3 text-3xl font-bold sm:text-4xl">My Journal</h1>
      <p className="text-base leading-relaxed sm:text-lg">Record what you're experiencing, reflect on what helps, and look back on your entries whenever you need to.</p>
      <section className="mt-9" aria-labelledby="journal-entries-heading">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 id="journal-entries-heading" className="text-2xl font-bold">Journal entries</h2>
          {entries.length > 0 && <span className="rounded-full bg-pale-sage px-3 py-1 text-xs text-sage">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>}
        </div>
        {storageError ? (
          <p role="alert" className="rounded-xl border border-secondary/40 bg-white p-5 text-sm leading-relaxed">{storageError}</p>
        ) : entries.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-secondary/50 bg-white px-6 py-10 text-center sm:py-12">
            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-soft-sage text-sage"><NotebookPen size={40} strokeWidth={1.6} aria-hidden="true" /></div>
            <h3 className="mb-3 text-xl font-bold sm:text-2xl">Your journal starts here</h3>
            <p className="mb-6 max-w-2xl leading-relaxed">You haven't created any entries yet. Whenever you're ready, you can write about an experience, reflect on how you felt, or record something that helped.</p>
            <AddEntryLink>Create your first entry</AddEntryLink>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="grid min-w-0 flex-1 basis-full grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-2xl lg:basis-auto">
                <JournalSelect label="Filter journal entries" value={filter} onChange={changeFilter}>
                  <option value="all">Filter: All entries</option>
                  <option value="date">Filter: Date</option>
                  <option value="situation">Filter: Situation</option>
                  <option value="intensity">Filter: Intensity</option>
                </JournalSelect>
                <JournalSelect label="Sort journal entries" value={sort} onChange={setSort}>
                  <option value="newest">Sort: Newest first</option>
                  <option value="oldest">Sort: Oldest first</option>
                  <option value="highest">Sort: Highest intensity</option>
                  <option value="lowest">Sort: Lowest intensity</option>
                </JournalSelect>
              </div>
              <AddEntryLink>Add Entry</AddEntryLink>
            </div>
            {filter !== 'all' && (
              <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl bg-pale-sage p-4">
                <div className="min-w-0 w-full max-w-xs">
                  {filter === 'date' && <><label htmlFor="filter-date" className="mb-2 block text-sm font-medium">Choose a date</label><input id="filter-date" type="date" value={filterValue} onChange={(event) => setFilterValue(event.target.value)} className="w-full rounded-xl border border-secondary/50 bg-white px-4 py-3 text-sm" /></>}
                  {filter === 'situation' && <><p className="mb-2 text-sm font-medium">Choose a situation</p><JournalSelect label="Choose a situation" value={filterValue} onChange={setFilterValue}><option value="">All situations</option>{situations.map((situation) => <option key={situation} value={situation}>{situation}</option>)}</JournalSelect></>}
                  {filter === 'intensity' && <><p className="mb-2 text-sm font-medium">Choose an intensity</p><JournalSelect label="Choose an intensity" value={filterValue} onChange={setFilterValue}><option value="">All intensities</option>{[1, 2, 3, 4, 5].map((number) => <option key={number} value={number}>{number} out of 5</option>)}<option value="unrated">Not rated</option></JournalSelect></>}
                </div>
                <button type="button" onClick={() => changeFilter('all')} className="rounded-lg px-3 py-3 text-sm font-semibold text-sage hover:underline">Clear filter</button>
                <p role="status" className="w-full text-sm text-secondary">Showing {visibleEntries.length} of {entries.length} entries</p>
              </div>
            )}
            {visibleEntries.length > 0 ? (
              <div className="space-y-4">{visibleEntries.map((entry) => <JournalEntryCard key={entry.id} entry={entry} />)}</div>
            ) : (
              <div className="rounded-2xl border border-secondary/40 bg-white p-8 text-center">
                <h3 className="text-lg font-bold">No matching entries</h3>
                <p className="mt-2 text-sm">Try changing or clearing your filter to see other entries.</p>
                <button type="button" onClick={() => changeFilter('all')} className="mt-4 font-semibold text-sage hover:underline">Show all entries</button>
              </div>
            )}
          </>
        )}
        <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-secondary">
          <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>Your entries are stored in this browser. <Link to="/privacy" className="font-medium text-sage underline underline-offset-2">Learn more about privacy.</Link></p>
        </div>
      </section>
    </div>
  )
}

export default JournalList
