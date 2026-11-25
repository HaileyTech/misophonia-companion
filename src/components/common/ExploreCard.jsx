import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function ExploreCard({ title, description, linkText, to }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-secondary/40 bg-white p-6">

      <h3 className="mb-2 text-xl font-bold">
        {title}
      </h3>

      <p className="mb-5 leading-relaxed">
        {description}
      </p>

      <Link
        to={to}
        className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-sage hover:underline"
      >
        {linkText}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>

    </article>
  )
}

export default ExploreCard
