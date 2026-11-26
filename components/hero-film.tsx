"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { images } from "@/lib/builds";

const DESKTOP = "(min-width: 960px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [desktop, setDesktop] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const desktopMedia = window.matchMedia(DESKTOP);
    const motion = window.matchMedia(REDUCED);
    let cancelled = false;

    const arm = () => {
      if (cancelled) {
        return;
      }
      const wide = desktopMedia.matches;
      const src = wide ? images.heroVideo : images.heroVideoMobile;
      setDesktop(wide);
      if (motion.matches) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        setReduced(true);
        setFailed(false);
        return;
      }
      setReduced(false);
      setFailed(false);
      if (video.getAttribute("src") !== src) {
        video.pause();
        video.src = src;
        video.load();
      }
      const attempt = video.play();
      if (attempt) {
        attempt.catch(() => {
          if (!cancelled) {
            setFailed(true);
          }
        });
      }
    };

    arm();
    desktopMedia.addEventListener("change", arm);
    motion.addEventListener("change", arm);
    return () => {
      cancelled = true;
      desktopMedia.removeEventListener("change", arm);
      motion.removeEventListener("change", arm);
    };
  }, []);

  const showStill = reduced || failed;

  return (
    <div className="hero-film">
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        aria-hidden="true"
        style={showStill ? { visibility: "hidden" } : undefined}
        onError={() => {
          if (videoRef.current?.getAttribute("src")) {
            setFailed(true);
          }
        }}
      />
      {showStill ? (
        <Image
          src={desktop ? images.heroBag : images.heroVideoMobileStill}
          alt={
            desktop
              ? "White stand bag with silver irons and white headcovers"
              : "Black Titleist stand bag with red headcovers in a fitting room"
          }
          fill
          sizes={desktop ? "1000px" : "100vw"}
          style={{ objectFit: "contain" }}
        />
      ) : null}
      <p className="sr-only">Preview of a cart screenshot turning into a finished golf bag.</p>
    </div>
  );
}
