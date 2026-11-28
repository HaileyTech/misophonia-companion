const photographCredits = [
  {
    category: "Foam earplugs",
    title: "Pair of Moldex Mellow 6800 Ear Plugs",
    creator: "sleepsugar.com",
    source: "Flickr, via Openverse",
    sourceUrl:
      "https://openverse.org/image/9c754d1d-34e4-4699-be34-ddb8a9e58757",
    license: "CC BY 2.0",
    licenseUrl:
      "https://creativecommons.org/licenses/by/2.0/",
    modifications: null,
  },
  {
    category: "Noise-canceling headphones",
    title: "Black Over-Ear Wireless Bluetooth Headphones",
    creator: "Andrey Matveev",
    source: "Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/black-over-ear-wireless-bluetooth-headphones-33034333/",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    modifications: null,
  },
  {
    category: "Earbuds",
    title: "Black Wireless Earbuds on Yellow Background",
    creator: "Andrey Matveev",
    source: "Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/black-wireless-earbuds-on-yellow-background-33242733/",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    modifications:
      "Background removed and replaced with white.",
  },
  {
    category: "Fidget cubes",
    title: "A close up of a dice on a table",
    creator: "Ben Grant",
    source: "Unsplash",
    sourceUrl:
      "https://unsplash.com/photos/a-close-up-of-a-dice-on-a-table-ey28WQOaTXk",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    modifications:
      "Background and composition adjusted.",
  },
]

const generatedImages = [
  "Silicone earplugs",
  "Filtered earplugs",
  "Noise-isolating headphones",
  "Fidget rings",
  "Stress and sensory objects",
  "Textured objects",
  "Dedicated sound machines",
  "Portable sound machines",
  "Sound machine apps",
]

const linkClass =
  "font-medium text-sage underline underline-offset-2 hover:text-charcoal"

function ImageCredits() {
  return (
    <section
      id="image-credits"
      aria-labelledby="image-credits-heading"
      className="mt-12 scroll-mt-32"
    >
      <h2
        id="image-credits-heading"
        className="font-heading text-2xl font-bold sm:text-3xl"
      >
        Image credits
      </h2>

      <p className="mt-4 leading-relaxed">
        Images throughout the Sound Relief exploration pages
        are provided for educational and illustrative purposes.
        They include photographs licensed for reuse and AI-generated 
        representations of general product types.
        These images are not product endorsements.
      </p>

      {/* Photographs */}
      <div className="mt-7">
        <h3 className="font-heading text-xl font-semibold">
          Photographs
        </h3>

        <p className="mt-3 leading-relaxed">
          The following photographs are used under their
          respective licenses. Credit is provided to the
          original photographers, including where attribution
          is not required.
        </p>

        <ul className="mt-5 space-y-5">
          {photographCredits.map((credit) => (
            <li key={credit.category}>
              <p className="font-semibold">
                {credit.category}
              </p>

              <p className="mt-1 leading-relaxed">
                <a
                  href={credit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {credit.title}
                </a>
                {" "}by {credit.creator}, via {credit.source}.
                Used under the{" "}
                <a
                  href={credit.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {credit.license}
                </a>
                .
              </p>

              {credit.modifications && (
                <p className="mt-1 text-sm text-secondary">
                  {credit.modifications}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* AI-generated illustrations */}
      <div className="mt-8">
        <h3 className="font-heading text-xl font-semibold">
          AI-generated illustrations
        </h3>

        <p className="mt-3 leading-relaxed">
          The following illustrations were created using
          OpenAI's ChatGPT image generation tool in November
          2026. They were created to represent general product
          types where suitable, freely licensed photographs
          were difficult to find.
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          {generatedImages.map((image) => (
            <li key={image}>{image}</li>
          ))}
        </ul>

        <p className="mt-4 leading-relaxed">
          These illustrations are intended to help visitors
          visualize different types of tools. They do not
          represent specific commercial products or guarantee
          particular features or performance. The sound machine
          app illustration depicts a hypothetical application,
          not an actual commercial app or a mobile version of
          Misophonia Companion.
        </p>
      </div>
    </section>
  )
}

export default ImageCredits