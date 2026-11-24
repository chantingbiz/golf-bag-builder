export const images = {
  logo: "/images/golf-bag-builder-logo.png",
  logoFallback: "/images/logo.png",
  heroBag: "/images/white-hero-bag.png",
  heroBagFallback: "/images/hero-bag.png",
} as const;

export type BuildTheme = "outlaw" | "after-dark" | "azalea" | "angry-flower";

export type FeaturedBuild = {
  slug: string;
  name: string;
  titleLines: readonly [string, string];
  image: string;
  fallbackImage?: string;
  theme: BuildTheme;
};

export const featuredBuilds: readonly FeaturedBuild[] = [
  {
    slug: "the-outlaw",
    name: "The Outlaw",
    titleLines: ["The", "Outlaw"],
    image: "/images/the-outlaw.png",
    fallbackImage: "/images/build-the-outlaw.png",
    theme: "outlaw",
  },
  {
    slug: "after-dark",
    name: "After Dark",
    titleLines: ["After", "Dark"],
    image: "/images/after-dark.png",
    fallbackImage: "/images/build-after-dark.png",
    theme: "after-dark",
  },
  {
    slug: "azalea-club",
    name: "Azalea Club",
    titleLines: ["Azalea", "Club"],
    image: "/images/azalea-club.png.png",
    fallbackImage: "/images/build-azalea-club.png",
    theme: "azalea",
  },
  {
    slug: "angry-flower",
    name: "Angry Flower",
    titleLines: ["Angry", "Flower"],
    image: "/images/angry-flower.png",
    theme: "angry-flower",
  },
];
