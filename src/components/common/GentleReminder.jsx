import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const reminders = [
  "You don't have to figure everything out at once. Take things one moment at a time.",
  "It's okay to step away from a difficult sound environment when you need to.",
  "Your experiences are valid, even when others don't understand them.",
  "Not every strategy works for everyone. Give yourself room to find what feels right.",
  "Take a moment to notice what you need right now. It's okay if a particular strategy doesn't work for you.",
]

function GentleReminder() {
  const [activeIndex, setActiveIndex] = useState(0)

  function previousReminder() {
    setActiveIndex(
      (current) => (current - 1 + reminders.length) % reminders.length
    )
  }

  function nextReminder() {
    setActiveIndex(
      (current) => (current + 1) % reminders.length
    )
  }

  return (
    <section
      className="mx-auto mt-12 w-full max-w-3xl px-5"
      aria-label="Gentle reminders"
    >

      {/* Stacked Cards */}
      <div className="relative isolate">

        {/* Decorative Back Cards */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-5 inset-y-6 -z-20 rounded-2xl bg-warm-sand/35"
        />

        <div
          aria-hidden="true"
          className="absolute -inset-x-3 inset-y-3 -z-10 rounded-2xl bg-warm-sand/65"
        />

        {/* Main Reminder Card */}
        <div className="flex min-h-52 flex-col justify-center gap-7 rounded-2xl bg-warm-sand px-8 py-7 sm:px-12">

          <span className="w-fit rounded-full bg-black/5 px-4 py-2 text-sm">
            A gentle reminder
          </span>

          <p
            aria-live="polite"
            className="font-heading text-xl font-semibold leading-relaxed sm:text-2xl"
          >
            {reminders[activeIndex]}
          </p>

        </div>
      </div>

      {/* Carousel Controls */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2 rounded-lg bg-warm-sand px-2 py-1">

          <button
            type="button"
            onClick={previousReminder}
            aria-label="Previous reminder"
            className="rounded-md p-1 hover:bg-black/5"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Pagination Indicators */}
          {reminders.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show reminder ${index + 1} of ${reminders.length}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="flex h-8 min-w-5 items-center justify-center rounded-full"
            >
              <span
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-7 bg-sage'
                    : 'w-2 bg-secondary/30'
                }`}
              />
            </button>
          ))}

          <button
            type="button"
            onClick={nextReminder}
            aria-label="Next reminder"
            className="rounded-md p-1 hover:bg-black/5"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </div>

    </section>
  )
}

export default GentleReminder
