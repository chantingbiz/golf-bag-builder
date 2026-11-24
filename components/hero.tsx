import { FallbackImage } from "@/components/fallback-image";
import { images } from "@/lib/builds";

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="wrap hero">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            Meet your
            <br />
            bag.
          </h1>
          <p className="hero-lede">
            Upload a screenshot of your Amazon cart or paste product links. See your golf setup before you buy.
          </p>
          <div className="hero-action">
            <button type="button" className="preview-button">
              Preview My Bag
              <ArrowUpRight />
            </button>
          </div>
        </div>
        <div className="hero-photo">
          <FallbackImage
            src={images.heroBag}
            fallbackSrc={images.heroBagFallback}
            alt="White stand bag with silver irons and white headcovers"
            fill
            priority
            sizes="(max-width: 959px) 92vw, 540px"
            style={{ objectFit: "contain", objectPosition: "center bottom" }}
          />
        </div>
      </div>
    </section>
  );
}

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M4.5 13.5 L13.5 4.5 M7.2 4.5 H13.5 V10.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
