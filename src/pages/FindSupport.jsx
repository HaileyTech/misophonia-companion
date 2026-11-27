import { useState } from 'react'
import { Info } from 'lucide-react'

import SupportResourceCard from '../components/common/SupportResourceCard'
import { supportCategories, filterResources } from '../data/supportResources'

function FindSupport() {
  const [activeCategory, setActiveCategory] = useState('All resources')
  const visibleResources = filterResources(activeCategory)

  return (
    <div className="page-container py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Find Support</h1>
        <p className="text-base leading-relaxed sm:text-lg">
          Explore organizations, questionnaires, communities, and additional
          resources related to misophonia.
        </p>
      </div>

      <section aria-labelledby="resources-heading">
        <h2 id="resources-heading" className="mb-4 text-2xl font-bold sm:text-3xl">
          Explore resources
        </h2>

        {/* Resource category filters */}
        <div role="group" aria-label="Filter resources by category" className="mb-6 flex flex-wrap gap-3">
          {supportCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-sage text-white'
                  : 'bg-charcoal/10 text-charcoal hover:bg-soft-sage'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Announce changes without adding visual clutter. */}
        <p role="status" aria-atomic="true" className="sr-only">
          Showing {visibleResources.length} resources: {activeCategory}.
        </p>

        <div className="grid gap-4">
          {visibleResources.map((resource) => (
            <SupportResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-secondary">
          <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            Questionnaires and online communities are not substitutes for
            professional evaluation or individualized care. This toolkit does
            not diagnose or treat misophonia.
          </p>
        </div>
      </section>

      <section aria-labelledby="guidance-heading" className="mt-8 rounded-2xl bg-warm-sand p-6 sm:p-8">
        <h2 id="guidance-heading" className="mb-2 text-xl font-bold">
          Looking for individualized guidance?
        </h2>
        <p className="leading-relaxed">
          Online resources can provide general information, but they cannot
          replace personalized advice from a qualified professional. Consider
          speaking with an appropriate healthcare professional about your
          individual needs.
        </p>
      </section>
    </div>
  )
}

export default FindSupport
