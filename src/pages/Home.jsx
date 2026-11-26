import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import ExploreCard from '../components/common/ExploreCard'
import GentleReminder from '../components/common/GentleReminder'

const exploreOptions = [
  {
    title: 'Sound Relief',
    description:
      'Explore background sounds and sensory tools that some people find helpful when navigating sound sensitivity.',
    linkText: 'Explore sound relief',
    to: '/sound-relief',
  },
  {
    title: 'My Journal',
    description:
      'Reflect on your experiences, recognize patterns, and keep track of what may help.',
    linkText: 'Open my journal',
    to: '/journal',
  },
  {
    title: 'Learn',
    description:
      'Explore what misophonia is, how it can affect everyday life, and what research tells us.',
    linkText: 'Browse topics',
    to: '/learn',
  },
  {
    title: 'Find Support',
    description:
      'Find professional guidance, peer communities, and additional trusted resources.',
    linkText: 'Explore resources',
    to: '/find-support',
  },
]

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-pale-sage">
        <div className="page-container py-12 sm:py-16">

          <p className="mb-8 text-xl font-medium text-sage">
            Welcome to Misophonia Companion
          </p>

          <h1 className="mb-3 max-w-5xl text-3xl font-bold leading-tight sm:text-4xl">
            Support for navigating sound sensitivity, at your own pace
          </h1>

          <p className="max-w-4xl text-base leading-relaxed sm:text-lg">
            Explore practical tools, learn about misophonia,
            and discover resources to help you better understand
            and navigate sound sensitivity.
          </p>

          {/* Hero Buttons */}
          <div className="mt-9 flex flex-wrap gap-4 sm:gap-8">

            <Link
              to="/sound-relief"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-sage px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-sage-dark"
            >
              Explore sound relief
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/learn"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-charcoal transition-colors hover:bg-soft-sage"
            >
              Learn about misophonia
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>
      </section>

      {/* Explore Options */}
      <section className="page-container pt-9">

        <h2 className="mb-5 text-2xl font-bold sm:text-3xl">
          Explore your options
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {exploreOptions.map((option) => (
            <ExploreCard
              key={option.to}
              {...option}
            />
          ))}
        </div>

      </section>

      {/* Gentle Reminder Carousel */}
      <div className="page-container">
        <GentleReminder />
      </div>
    </>
  )
}

export default Home
