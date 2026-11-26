import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import { ArrowLeft } from 'lucide-react'

import { soundReliefTools } from '../../../data/soundReliefTools'

function ToolDetails() {
  const { toolId } = useParams()

  const tool = soundReliefTools.find(
    (item) => item.id === toolId
  )

  if (!tool) {
    return <Navigate to="/sound-relief" replace />
  }

  return (
    <div className="page-container py-10">

      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-secondary"
      >
        <Link
          to="/sound-relief"
          className="hover:text-sage hover:underline"
        >
          Sound Relief
        </Link>

        <span aria-hidden="true">/</span>

        <span aria-current="page">
          {tool.title}
        </span>
      </nav>

      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
        {tool.title}
      </h1>

      <p className="mb-4 text-lg">
        {tool.description}
      </p>

      <p className="mb-8 text-secondary">
        Detailed exploration content is coming soon.
      </p>

      <Link
        to="/sound-relief"
        className="inline-flex items-center gap-2 font-semibold text-sage hover:underline"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back to Sound Relief
      </Link>

    </div>
  )
}

export default ToolDetails
