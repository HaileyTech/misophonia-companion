import { ArrowUpRight } from 'lucide-react'

function SupportResourceCard({ resource }) {
  const { title, category, description, url } = resource

  return (
    <article className="rounded-2xl border border-secondary/40 bg-white p-5 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <h3 className="min-w-0 flex-1 basis-52 break-words text-lg font-bold sm:text-xl">
          {title}
        </h3>
        <span className="shrink-0 rounded-full bg-soft-sage px-3 py-1 text-xs font-medium text-charcoal">
          {category}
        </span>
      </div>

      <p className="mt-2 leading-relaxed">{description}</p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit resource: ${title} (opens in a new tab)`}
        className="group mt-3 inline-flex w-fit items-center gap-1 text-sm font-semibold text-sage hover:underline"
      >
        Visit resource
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
        />
      </a>
    </article>
  )
}

export default SupportResourceCard
