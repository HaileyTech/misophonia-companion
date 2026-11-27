import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { learnArticles } from '../../data/learnArticles'

const internalLinks = {
  'Journal': '/journal',
  'Sound Relief': '/sound-relief',
  'Find Support': '/find-support',
}

// Keep the original prose; make its references to toolkit sections clickable.
function ArticleText({ text, linkSections = false }) {
  if (!linkSections) return text

  return text.split(/(Journal|Sound Relief|Find Support)/g).map((part, index) => (
    Object.hasOwn(internalLinks, part) ? (
      <Link key={index} to={internalLinks[part]} className="font-medium text-sage underline underline-offset-2 hover:text-charcoal">
        {part}
      </Link>
    ) : part
  ))
}

function ListItem({ text, linkSections }) {
  // Emphasize the introductory phrase of the supplied list item.
  const match = text.match(/^([^:?!]+[:?])\s+(.+)$/)

  if (!match) return <ArticleText text={text} linkSections={linkSections} />

  return (
    <>
      <strong className="font-semibold">{match[1]}</strong>{' '}
      <ArticleText text={match[2]} linkSections={linkSections} />
    </>
  )
}

function ArticleBlock({ block, linkSections }) {
  if (block.type === 'list') {
    return (
      <ul className="list-disc space-y-2 pl-6 marker:text-sage">
        {block.items.map((item, index) => (
          <li key={index} className="pl-1">
            <ListItem text={item} linkSections={linkSections} />
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'subheading') {
    return <h3 className="pt-2 text-lg font-bold">{block.text}</h3>
  }

  return <p><ArticleText text={block.text} linkSections={linkSections} /></p>
}

function LearnArticle() {
  const { articleId } = useParams()
  const { hash } = useLocation()
  const articleIndex = learnArticles.findIndex((item) => item.id === articleId)
  const article = learnArticles[articleIndex]

  // Support table-of-contents links, direct section URLs and browser Back/Forward.
  useEffect(() => {
    if (!article || !hash) return
    const frame = window.requestAnimationFrame(() => {
      const section = document.getElementById(hash.slice(1))
      if (section) {
        section.focus({ preventScroll: true })
        section.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [article, hash])

  if (!article) return <Navigate to="/learn" replace />

  const next = learnArticles[(articleIndex + 1) % learnArticles.length]
  const linkSections = article.id === 'coping-approaches'

  return (
    <div className="page-container py-8 sm:py-10">
      <article className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-secondary">
          <Link to="/learn" className="hover:text-sage hover:underline">Learn</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{article.title}</span>
        </nav>

        <header>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{article.title}</h1>
          <div className="space-y-4 text-base leading-relaxed sm:text-lg">
            {article.intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </header>

        <nav aria-labelledby="article-contents" className="my-7 w-full max-w-xl rounded-2xl bg-pale-sage p-5 sm:p-6">
          <h2 id="article-contents" className="mb-3 text-xl font-bold">On this page</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sage">
            {article.sections.map((section) => (
              <li key={section.id}>
                <Link to={`#${section.id}`} className="font-medium underline decoration-transparent underline-offset-4 hover:decoration-current focus-visible:decoration-current">
                  {section.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-8">
          {article.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} tabIndex={-1} className="mb-3 scroll-mt-6 text-2xl font-bold">
                {section.title}
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                {section.blocks.map((block, index) => (
                  <ArticleBlock key={index} block={block} linkSections={linkSections} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside aria-labelledby="key-takeaway" className="mt-8 rounded-2xl bg-warm-sand p-6 sm:p-8">
          <h2 id="key-takeaway" className="mb-2 text-xl font-bold">Key takeaway</h2>
          <p className="leading-relaxed">{article.takeaway}</p>
        </aside>

        <section aria-labelledby="article-sources" className="mt-8">
          <h2 id="article-sources" className="mb-3 text-2xl font-bold">Sources and further reading</h2>
          <p className="mb-3 leading-relaxed">{article.sourceIntro}</p>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed">
            {article.sources.map((source, index) => (
              <li key={index} className="pl-1">
                {source.text}{' '}
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-sage underline underline-offset-2 hover:text-charcoal" aria-label={`Open reference ${index + 1} (opens in a new tab)`}>
                  View source <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </section>

        <nav aria-label="Article navigation" className="mt-10 flex flex-wrap items-center justify-between gap-5">
          <Link to="/learn" className="group inline-flex items-center gap-2 font-semibold text-sage hover:underline">
            <ArrowLeft size={18} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:-translate-x-1" />
            All topics
          </Link>
          <Link to={`/learn/${next.id}`} className="group inline-flex items-center gap-2 font-semibold text-sage hover:underline">
            {next.title}
            <ArrowRight size={18} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
          </Link>
        </nav>
      </article>
    </div>
  )
}

export default LearnArticle
