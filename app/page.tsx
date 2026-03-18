"use client";

import HeroSection from "@/components/strike/hero-section";
import StatsSection from "@/components/strike/stats-section";
import FeaturedEvent from "@/components/strike/featured-event";
import CommunityGrid from "@/components/strike/community-grid";
import { type Event } from "@/lib/data";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((events: Event[]) => {
        const now = new Date();
        const upcoming = events
          .filter((e) => new Date(e.date) >= now)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setNextEvent(upcoming[0] ?? null);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <HeroSection />
      <StatsSection />
      {nextEvent && <FeaturedEvent event={nextEvent} />}
      <CommunityGrid />
    </>
  );
}
