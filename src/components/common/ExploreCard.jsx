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
        className="group mt-auto inline-flex w-fit items-center gap-1.5 px-1 py-2 text-sm font-semibold text-sage hover:underline"
      >
        {linkText}
        <ArrowRight 
          size={16} 
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        />
      </Link>

    </article>
  )
}

export default ExploreCard
