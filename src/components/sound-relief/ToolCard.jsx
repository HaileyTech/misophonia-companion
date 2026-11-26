import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function ToolCard({ tool, compact = false }) {
  const {
    title,
    description,
    linkText,
    path,
    icon: Icon,
  } = tool

  return (
    <article className="flex h-full flex-col rounded-2xl border border-secondary/40 bg-white p-3">

      {/* Tool illustration */}
      <div
        className={`flex items-center justify-center rounded-xl bg-warm-sand ${
          compact ? 'h-20' : 'h-28'
        }`}
      >
        <Icon
          size={compact ? 40 : 52}
          strokeWidth={1.6}
          className="text-charcoal"
          aria-hidden="true"
        />
      </div>

      {/* Tool information */}
      {!compact && (
        <div className="flex flex-1 flex-col px-1 pt-3">
          <h3 className="mb-2 text-lg font-bold">
            {title}
          </h3>

          <p className="mb-4 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {/* Tool link */}
      <Link
        to={path}
        className="group mt-auto inline-flex w-fit items-center gap-1.5 px-1 py-2 text-sm font-semibold text-sage hover:underline"
      >
        {compact ? title : linkText}

        <ArrowRight
          size={16}
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        />
      </Link>

    </article>
  )
}

export default ToolCard
