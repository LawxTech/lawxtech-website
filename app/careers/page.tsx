import { buildMetadata } from "@/lib/metadata";
import CareersContent from "@/components/careers/CareersContent";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join the Law x Tech team. We are recruiting driven volunteers to help build Africa's home for law and technology.",
});

export default function CareersPage() {
  return <CareersContent />;
}
