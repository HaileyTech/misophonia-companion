import { Image } from 'lucide-react'

function ToolTypeCard({ type }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-secondary/40 bg-white">
      {/* Optional product-type illustration. */}
      <div className="flex aspect-[16/9] items-center justify-center overflow-hidden bg-white">
        {type.image ? (
          <img
            src={type.image.src}
            alt={type.image.alt ?? ''}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-secondary" aria-hidden="true">
            <Image size={32} strokeWidth={1.5} />
            <span className="text-xs">Image to be added</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold">{type.title}</h3>
          <p className="mt-1 text-sm font-medium text-sage">
            {type.subtitle}
          </p>
        </div>

        {type.description.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}

export default ToolTypeCard
