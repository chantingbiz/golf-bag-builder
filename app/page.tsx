import { FeaturedBuilds } from "@/components/featured-builds";
import { Hero } from "@/components/hero";
import { HomeChoices } from "@/components/home-choices";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeChoices />
      <FeaturedBuilds />
    </main>
  );
}
