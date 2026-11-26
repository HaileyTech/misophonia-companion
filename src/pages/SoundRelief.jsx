import { Info } from 'lucide-react'

import NoisePlayer from '../components/sound-relief/NoisePlayer'
import ToolCard from '../components/sound-relief/ToolCard'
import { soundReliefTools } from '../data/soundReliefTools'

function SoundRelief() {
  return (
    <div className="page-container py-8 sm:py-10">

      {/* Page introduction */}
      <div className="mb-7">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          Sound Relief
        </h1>

        <p className="text-base leading-relaxed sm:text-lg">
          Explore background sounds and other tools that may
          help you navigate difficult sound environments.
        </p>
      </div>

      {/* Background sound player */}
      <NoisePlayer />

      {/* Sound player disclaimer */}
      <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-secondary">
        <Info
          size={16}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        <p>
          Background sounds are optional tools. Different sounds
          work differently for different people. Start at a
          comfortable volume and stop if a sound makes you
          uncomfortable.
        </p>
      </div>

      {/* Tool exploration section */}
      <section className="mt-10">
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
          Tools people explore
        </h2>

        <p className="mb-5 leading-relaxed">
          Explore products and sensory tools that some people
          with sound sensitivity have discussed using in their
          everyday lives.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {soundReliefTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Tool disclaimer */}
        <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-secondary">
          <Info
            size={16}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />

          <p>
            Products are suggestions for exploration,
            not endorsements or guaranteed solutions.
          </p>
        </div>
      </section>

    </div>
  )
}

export default SoundRelief