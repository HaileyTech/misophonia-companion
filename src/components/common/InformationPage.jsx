import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const featureLinks = {
  'Sound Relief': '/sound-relief',
  'My Journal': '/journal',
  Learn: '/learn',
  'Find Support': '/find-support',
}

function InformationListItem({ item }) {
  if (item.url) {
    return (
      <>
        {item.text}{' '}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-medium text-sage underline underline-offset-2 hover:text-charcoal"
          aria-label={`View source: ${item.text} (opens in a new tab)`}
        >
          View source
          <ArrowUpRight size={14} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
        </a>
      </>
    )
  }

  const colon = item.text.indexOf(':')
  const label = colon >= 0 ? item.text.slice(0, colon) : ''
  const to = Object.hasOwn(featureLinks, label) ? featureLinks[label] : null

  if (!to) return item.text

  return (
    <>
      <Link to={to} className="font-semibold text-sage underline underline-offset-2 hover:text-charcoal">
        {label}
      </Link>
      <strong>:</strong>{item.text.slice(colon + 1)}
    </>
  )
}

function InformationBlock({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="mt-8 mb-3 text-2xl font-bold">{block.text}</h2>
    case 'subheading':
      return <h3 className="mt-5 mb-2 text-xl font-bold">{block.text}</h3>
    case 'list':
      return (
        <ul className="my-4 list-disc space-y-2 pl-6 marker:text-sage">
          {block.items.map((item, index) => (
            <li key={index} className="pl-1 break-words">
              <InformationListItem item={item} />
            </li>
          ))}
        </ul>
      )
    default: {
      const prefix = 'Please remember:'
      return (
        <p className="my-3 break-words">
          {block.text.startsWith(prefix) ? (
            <><strong>{prefix}</strong>{block.text.slice(prefix.length)}</>
          ) : block.text}
        </p>
      )
    }
  }
}

function InformationPage({ page, children }) {
  return (
    <div className="page-container py-8 sm:py-10">
      <article className="mx-auto max-w-5xl text-base leading-relaxed">
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
          {page.title}
        </h1>

        {page.blocks.map((block, index) => (
          <InformationBlock key={index} block={block} />
        ))}

        {children}
      </article>
    </div>
  )
}

export default InformationPage
