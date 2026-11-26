function IntensitySelector({ value, onChange }) {
  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">How intense did your reaction feel?</legend>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p aria-hidden="true" className="font-semibold">How intense did your reaction feel?</p>
        <button
          type="button"
          onClick={() => onChange(null)}
          disabled={value === null}
          className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-white enabled:hover:bg-sage-dark disabled:invisible"
        >
          Clear
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-5">
        {[1, 2, 3, 4, 5].map((number) => (
          <label key={number} className="cursor-pointer">
            <input
              type="radio"
              name="journal-intensity"
              value={number}
              checked={value === number}
              onChange={() => onChange(number)}
              className="peer sr-only"
            />
            <span className={`flex h-16 items-center justify-center rounded-xl border font-heading text-2xl font-bold transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-sage sm:h-20 sm:text-3xl ${value === number ? 'border-sage bg-soft-sage' : 'border-secondary/50 bg-white hover:bg-soft-sage-dark'}`}>
              {number}
            </span>
          </label>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-sm text-secondary">
        <span>Low intensity</span><span>High intensity</span>
      </div>
    </fieldset>
  )
}

export default IntensitySelector
