import { buildMetadata } from "@/lib/metadata";
// Restore HeroSection in place of SpeakerHighlightHero after the summit (28 Nov 2026).
// import HeroSection from "@/components/home/HeroSection";
import SpeakerHighlightHero from "@/components/home/SpeakerHighlightHero";
import StatsStrip from "@/components/home/StatsStrip";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import SeriesPreviewSection from "@/components/home/SeriesPreviewSection";
import PartnersPreviewSection from "@/components/home/PartnersPreviewSection";
import SummitCountdownSection from "@/components/summit/SummitCountdownSection";
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
      <SpeakerHighlightHero />
      <StatsStrip />
      <WhatWeDoSection />
      <SeriesPreviewSection />
      <PartnersPreviewSection />
      <SummitCountdownSection />
      <CommunityVoicesSection />
      <SpeakersWallSection />
      <JoinMovementSection />
      <CommunityChannelsSection />
    </>
  );
}
