"use client";

import { useEffect, useRef, useState } from "react";
import { featuredBuilds, type FeaturedBuild } from "@/lib/builds";
import { CardArt } from "@/components/card-art";
import { FallbackImage } from "@/components/fallback-image";

export function FeaturedBuilds() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    function updateActive() {
      const current = scrollerRef.current;
      if (!current) {
        return;
      }

      const cards = [...current.querySelectorAll<HTMLElement>("[data-build]")];
      const origin = cards[0]?.offsetLeft ?? 0;
      let next = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - origin - current.scrollLeft);
        if (distance < bestDistance) {
          bestDistance = distance;
          next = index;
        }
      });

      setActive(next);
    }

    updateActive();
    scroller.addEventListener("scroll", updateActive, { passive: true });
    return () => scroller.removeEventListener("scroll", updateActive);
  }, []);

  function showBuild(index: number) {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelectorAll<HTMLElement>("[data-build]")[index];
    if (!scroller || !card) {
      return;
    }

    const first = scroller.querySelector<HTMLElement>("[data-build]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({
      left: card.offsetLeft - (first?.offsetLeft ?? 0),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section className="builds-section" id="builds" aria-labelledby="builds-title">
      <div className="wrap builds-wrap">
        <h2 id="builds-title" className="builds-title">
          Find <span className="scribble">your</span> next build
        </h2>
        <div className="build-scroller" ref={scrollerRef}>
          {featuredBuilds.map((build, index) => (
            <BuildCard key={build.slug} build={build} priority={index === 0} />
          ))}
          <div className="build-spacer" aria-hidden="true" />
        </div>
        <div className="build-dots">
          {featuredBuilds.map((build, index) => (
            <button
              key={build.slug}
              type="button"
              className={index === active ? "dot is-active" : "dot"}
              aria-label={`Show ${build.name}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => showBuild(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildCard({ build, priority }: { build: FeaturedBuild; priority: boolean }) {
  return (
    <article className="build-card" data-build={build.slug}>
      <CardArt theme={build.theme} />
      <div className="build-photo">
        <FallbackImage
          src={build.image}
          fallbackSrc={build.fallbackImage}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 959px) 68vw, 360px"
          style={{ objectFit: "contain", objectPosition: "right bottom" }}
        />
      </div>
      <h3 className="build-name">
        {build.titleLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h3>
      <div className="build-actions">
        <button type="button" className="pill pill-shop">
          Shop Gear
        </button>
        <button type="button" className="pill pill-remix">
          Remix
          <RemixIcon />
        </button>
      </div>
    </article>
  );
}

function RemixIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M13.1 8.2a5.1 5.1 0 0 1-8.6 3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M2.9 7.8a5.1 5.1 0 0 1 8.6-3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M11.1 2.7h2.4V5.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.9 13.3H2.5V10.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
