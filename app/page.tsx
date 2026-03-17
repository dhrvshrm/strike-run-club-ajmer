"use client";

import HeroSection from "@/components/strike/hero-section";
import StatsSection from "@/components/strike/stats-section";
import FeaturedEvent from "@/components/strike/featured-event";
import CommunityGrid from "@/components/strike/community-grid";
import { getNextEvent } from "@/lib/data";

export default function HomePage() {
  const nextEvent = getNextEvent();

  return (
    <>
      <HeroSection />
      <StatsSection />
      {nextEvent && <FeaturedEvent event={nextEvent} />}
      <CommunityGrid />
    </>
  );
}
