"use client";

import { useEffect, useRef, useState } from "react";
import { featuredBuilds, type FeaturedBuild } from "@/lib/builds";
import { CardArt } from "@/components/card-art";
import { FallbackImage } from "@/components/fallback-image";

const TICKER_SPEED = 25;

export function FeaturedBuilds() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) {
      return;
    }

    const desktop = window.matchMedia("(min-width: 960px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let offset = 0;
    let last = 0;
    let frame = 0;
    let hovering = false;
    let focused = false;
    let tabbing = false;

    const originals = () => [...track.querySelectorAll<HTMLElement>("[data-build]")];

    const loopWidth = () => {
      const first = originals()[0];
      const copy = track.querySelector<HTMLElement>("[data-copy]");
      if (!first || !copy) {
        return 0;
      }
      return copy.offsetLeft - first.offsetLeft;
    };

    const paint = () => {
      if (!desktop.matches || reduce.matches) {
        track.style.transform = "";
        return;
      }
      const loop = loopWidth();
      if (loop > 0) {
        offset = ((offset % loop) + loop) % loop;
      }
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const bringIntoView = (card: HTMLElement) => {
      const loop = loopWidth();
      const view = scroller.clientWidth;
      const width = card.offsetWidth;
      if (loop <= 0 || view <= 0 || width <= 0) {
        return;
      }
      const current = ((offset % loop) + loop) % loop;
      const left = card.offsetLeft - current;
      const right = left + width;
      if (left >= -1 && right <= view + 1) {
        return;
      }
      offset = width >= view ? card.offsetLeft : left < 0 ? card.offsetLeft : card.offsetLeft + width - view;
      paint();
    };

    const tick = (now: number) => {
      frame = window.requestAnimationFrame(tick);
      if (!last) {
        last = now;
        return;
      }
      const elapsed = Math.min(Math.max(now - last, 0), 1000);
      last = now;
      if (hovering || focused || !desktop.matches || reduce.matches) {
        return;
      }
      const loop = loopWidth();
      if (loop <= 0) {
        return;
      }
      offset = (offset + (TICKER_SPEED * elapsed) / 1000) % loop;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const control = target.closest("a, button");
      if (!control || !scroller.contains(control) || control.closest("[data-copy]")) {
        return;
      }
      if (!tabbing && !control.matches(":focus-visible")) {
        return;
      }
      focused = true;
      const card = control.closest<HTMLElement>("[data-build]");
      if (card) {
        bringIntoView(card);
      }
    };

    const onFocusOut = () => {
      window.requestAnimationFrame(() => {
        const activeElement = document.activeElement;
        const inside =
          activeElement instanceof Element &&
          scroller.contains(activeElement) &&
          !!activeElement.closest("a, button") &&
          !activeElement.closest("[data-copy]");
        if (!inside) {
          focused = false;
        }
      });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }
      tabbing = true;
      window.setTimeout(() => {
        tabbing = false;
      }, 0);
    };

    const onMedia = () => {
      if (!desktop.matches || reduce.matches) {
        offset = 0;
      }
      paint();
    };

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    paint();
    frame = window.requestAnimationFrame(tick);
    const resize = new ResizeObserver(() => paint());
    resize.observe(scroller);
    scroller.addEventListener("pointerenter", onEnter);
    scroller.addEventListener("pointerleave", onLeave);
    scroller.addEventListener("focusin", onFocusIn);
    scroller.addEventListener("focusout", onFocusOut);
    document.addEventListener("keydown", onKeyDown, true);
    desktop.addEventListener("change", onMedia);
    reduce.addEventListener("change", onMedia);

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      track.style.transform = "";
      scroller.removeEventListener("pointerenter", onEnter);
      scroller.removeEventListener("pointerleave", onLeave);
      scroller.removeEventListener("focusin", onFocusIn);
      scroller.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("keydown", onKeyDown, true);
      desktop.removeEventListener("change", onMedia);
      reduce.removeEventListener("change", onMedia);
    };
  }, []);

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
    <section className="builds-section" id="builds" aria-label="Curated bag combos">
      <div className="wrap builds-wrap">
        <h2 id="builds-title" className="builds-title">
          Find <span className="scribble">your</span> next build
        </h2>
        <div className="build-scroller" ref={scrollerRef}>
          <div className="build-track" ref={trackRef}>
            {featuredBuilds.map((build, index) => (
              <BuildCard key={build.slug} build={build} priority={index === 0} />
            ))}
            <div className="build-track-copy" aria-hidden="true">
              {featuredBuilds.map((build) => (
                <BuildCard key={`${build.slug}-copy`} build={build} copy />
              ))}
            </div>
          </div>
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

function BuildCard({
  build,
  priority = false,
  copy = false,
}: {
  build: FeaturedBuild;
  priority?: boolean;
  copy?: boolean;
}) {
  return (
    <article
      className="build-card"
      data-build={copy ? undefined : build.slug}
      data-copy={copy ? build.slug : undefined}
      aria-hidden={copy ? true : undefined}
    >
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
        <button type="button" className="pill pill-shop" tabIndex={copy ? -1 : undefined}>
          Shop Gear
        </button>
        <button type="button" className="pill pill-remix" tabIndex={copy ? -1 : undefined}>
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
