import { buildMetadata } from "@/lib/metadata";
import HeroSection from "@/components/home/HeroSection";
import StatsStrip from "@/components/home/StatsStrip";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import SeriesPreviewSection from "@/components/home/SeriesPreviewSection";
import CommunityVoicesSection from "@/components/home/CommunityVoicesSection";
import SpeakersWallSection from "@/components/home/SpeakersWallSection";
import JoinMovementSection from "@/components/home/JoinMovementSection";
import CommunityChannelsSection from "@/components/home/CommunityChannelsSection";

export const metadata = buildMetadata({
  title: "Law x Tech — Africa's Home for Law & Technology",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <WhatWeDoSection />
      <SeriesPreviewSection />
      <CommunityVoicesSection />
      <SpeakersWallSection />
      <JoinMovementSection />
      <CommunityChannelsSection />
    </>
  );
}
