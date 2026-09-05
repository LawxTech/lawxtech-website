"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn } from "@/lib/animations";
import PartnerCard from "@/components/partners/PartnerCard";
import type { Partner } from "@/lib/data/partners";

export default function PartnersGrid({ partners }: { partners: Partner[] }) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {partners.map((partner) => (
        <motion.div key={partner.slug} variants={scaleIn}>
          <PartnerCard partner={partner} />
        </motion.div>
      ))}
    </motion.div>
  );
}
