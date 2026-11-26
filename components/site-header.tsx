"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FallbackImage } from "@/components/fallback-image";
import { images } from "@/lib/builds";

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");

    function closeOnDesktop() {
      if (media.matches) {
        setOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    closeOnDesktop();
    media.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      media.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className={home ? "site-header site-header-home" : "site-header"}>
      <div className="wrap header-bar">
        <Link className="brand brand-legacy" href="/" onClick={() => setOpen(false)}>
          <FallbackImage
            className="brand-mark"
            src={images.logo}
            fallbackSrc={images.logoFallback}
            alt=""
            width={80}
            height={80}
            priority
          />
          <span>Golf Bag Builder</span>
        </Link>
        <Link className="brand brand-envy" href="/" aria-label="Bag Envy" onClick={() => setOpen(false)}>
          <Image className="brand-mark" src={images.brand} alt="" width={1536} height={1024} priority />
        </Link>
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <MenuIcon open={open} />
        </button>
        <nav id="site-nav" className={open ? "site-nav is-open" : "site-nav"}>
          <a href="#builds" onClick={() => setOpen(false)}>
            Explore Builds
          </a>
          <button type="button" onClick={() => setOpen(false)}>
            My Builds
          </button>
        </nav>
      </div>
      {home ? (
        <div className="wrap home-banner">
          <Link className="brand brand-envy" href="/" aria-label="Dream Golf Bag">
            <Image className="brand-mark" src={images.dream} alt="" width={1536} height={1024} priority />
          </Link>
          <h1 className="home-banner-title">
            Your golf bag deserves to <span className="home-banner-accent">look cool</span>.
          </h1>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      {open ? (
        <path d="M5 5 L17 17 M17 5 L5 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : (
        <path d="M3 6.5 H19 M3 11 H19 M3 15.5 H19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  );
}
