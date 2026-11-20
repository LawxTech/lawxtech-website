import { buildMetadata } from "@/lib/metadata";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import OurStoryTimeline from "@/components/about/OurStoryTimeline";
import FounderSection from "@/components/about/FounderSection";
import TeamGrid from "@/components/about/TeamGrid";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Law x Tech — our mission, vision, story, and the team building Nigeria's leading legal tech community.",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <OurStoryTimeline />
      <FounderSection />
      <TeamGrid />
    </>
  );
}
