import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Info } from 'lucide-react'

import ToolCard from '../../../components/sound-relief/ToolCard'
import ToolTypeCard from '../../../components/sound-relief/ToolTypeCard'
import { soundReliefTools } from '../../../data/soundReliefTools'
import { toolDetails } from '../../../data/toolDetails'

function ToolDetails() {
  const { toolId } = useParams()

  const tool = soundReliefTools.find((item) => item.id === toolId)

  if (!tool || !toolDetails[tool.id]) {
    return <Navigate to="/sound-relief" replace />
  }

  const details = toolDetails[tool.id]
  const Icon = tool.icon
  const otherTools = soundReliefTools.filter((item) => item.id !== tool.id)

  return (
    <div className="page-container py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-secondary">
        <Link to="/sound-relief" className="hover:text-sage hover:underline">
          Sound Relief
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{tool.title}</span>
      </nav>

      {/* Tool introduction */}
      <header className="flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
        <div className="flex h-24 w-28 shrink-0 items-center justify-center rounded-xl bg-warm-sand sm:h-28 sm:w-36">
          <Icon size={54} strokeWidth={1.6} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{tool.title}</h1>
          <p className="text-base leading-relaxed">{details.intro}</p>
        </div>
      </header>

      {/* Understanding the tool */}
      <section className="mt-9" aria-labelledby="understanding-heading">
        <h2 id="understanding-heading" className="mb-3 text-2xl font-bold">
          {details.understandingTitle}
        </h2>
        <div className="space-y-3 leading-relaxed">
          {details.understanding.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Types to explore */}
      <section className="mt-9" aria-labelledby="types-heading">
        <h2 id="types-heading" className="mb-4 text-2xl font-bold">
          Types to explore
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {details.types.map((type) => (
            <ToolTypeCard key={type.title} type={type} />
          ))}
        </div>
      </section>

      <div className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-secondary">
        <Info
          size={17}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        <p>
          Images are provided for illustrative purposes and include both
          photographs and AI-generated illustrations.{" "}
          <Link
            to="/sources#image-credits"
            className="font-medium text-sage underline underline-offset-2 hover:text-charcoal"
          >
            View image credits.
          </Link>
        </p>
      </div>

      {/* Practical considerations */}
      <section className="mt-9" aria-labelledby="considerations-heading">
        <h2 id="considerations-heading" className="mb-3 text-2xl font-bold">
          Things to consider
        </h2>
        <p className="leading-relaxed">{details.considerationsIntro}</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed marker:text-sage">
          {details.considerations.map(({ label, text }) => (
            <li key={label}>
              <strong className="font-semibold">{label}:</strong>{' '}{text}
            </li>
          ))}
        </ul>
      </section>

      {/* Additional guidance: currently only on Earplugs */}
      {details.additionalSection && (
        <section className="mt-9" aria-labelledby="additional-heading">
          <h2 id="additional-heading" className="mb-3 text-2xl font-bold">
            {details.additionalSection.title}
          </h2>
          <div className="space-y-3 leading-relaxed">
            {details.additionalSection.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Hearing-health resource: Earplugs and Headphones only */}
      {details.hearingResource && (
        <section className="mt-9" aria-labelledby="hearing-heading">
          <h2 id="hearing-heading" className="mb-3 text-2xl font-bold">
            {details.hearingResource.title}
          </h2>
          <p className="mb-3 leading-relaxed">{details.hearingResource.description}</p>
          <a
            href={details.hearingResource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-semibold text-sage hover:underline"
          >
            {details.hearingResource.linkText}
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      )}

      {/* Closing reminder */}
      <div className="mt-9 rounded-2xl bg-warm-sand px-6 py-5 leading-relaxed">
        <p className="font-medium">{details.takeaway}</p>
      </div>

      {/* Related tools */}
      <section className="mt-9" aria-labelledby="other-tools-heading">
        <h2 id="other-tools-heading" className="mb-4 text-2xl font-bold">
          Explore other tools
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {otherTools.map((otherTool) => (
            <ToolCard key={otherTool.id} tool={otherTool} compact />
          ))}
        </div>
      </section>

      {/* Return to the main Sound Relief page */}
      <Link
        to="/sound-relief"
        className="group mt-8 inline-flex items-center gap-2 font-semibold text-sage hover:underline"
      >
        <ArrowLeft
          size={18}
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:group-hover:-translate-x-1"
        />
        Back to Sound Relief
      </Link>
    </div>
  )
}

export default ToolDetails
