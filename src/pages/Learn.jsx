import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ExploreCard from '../components/common/ExploreCard'
import { learnArticles } from '../data/learnArticles'

function Learn() {
  return (
    <div className="page-container py-8 sm:py-10">
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          Learn About Misophonia
        </h1>
        <p className="text-base leading-relaxed sm:text-lg">
          Explore what misophonia is, how it can affect everyday life, what
          research tells us, and strategies some people find helpful.
        </p>
      </header>

      <section aria-labelledby="explore-topics">
        <h2 id="explore-topics" className="mb-5 text-2xl font-bold sm:text-3xl">
          Explore Topics
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {learnArticles.map((article) => (
            <ExploreCard
              key={article.id}
              title={article.title}
              description={article.description}
              linkText="Explore topic"
              to={`/learn/${article.id}`}
            />
          ))}
        </div>
      </section>

      <aside className="mt-8 rounded-2xl bg-warm-sand p-6 sm:p-8">
        <h2 className="mb-2 text-xl font-bold sm:text-2xl">
          Looking for additional guidance?
        </h2>
        <p className="mb-4 leading-relaxed">
          Learn provides general information about misophonia. Find Support
          connects you with questionnaires, peer communities, research
          organizations, and information about professional guidance.
        </p>
        <Link to="/find-support" className="group inline-flex w-fit items-center gap-2 font-semibold text-sage hover:underline">
          Explore support resources
          <ArrowRight size={18} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
        </Link>
      </aside>
    </div>
  )
}

export default Learn
