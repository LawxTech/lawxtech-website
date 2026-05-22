"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideUp, staggerContainer, scaleIn } from "@/lib/animations";

const team = [
  { name: "Sopuruchi Rufus", role: "Founder / Project Coordinator", image: "ruchi-rufus.jpeg", dir: "members" },
  { name: "Joel Akonani", role: "Graphics Designer", image: "Joel, Graphics Designer.jpeg", dir: "members" },
  { name: "Favour Babatunde", role: "Community Manager", image: "Favour.jpeg", dir: "members" },
  { name: "Bisi-Aretola Daniel A.", role: "Brand Identity Designer", image: "Daniel Brand Identity Designer.jpg", dir: "members" },
  { name: "Chidimma Chukwuani", role: "Content Creator", image: "Chidimma M. Chukwuani, Content Creator Volunteer.jpeg", dir: "members" },
  { name: "Joy Shehu", role: "Content Writer", image: "Joy, Content Writer Volunteer.jpeg", dir: "members" },
  { name: "Wale Saliu A.", role: "Content Writer", image: "Saliu Waliyat Ayomiotan, Content Writer Volunteer.jpeg", dir: "members" },
  { name: "Bakare Adefolakemi", role: "Email Marketer", image: "BAKARE ADEFOLAKEMI, Email Marketer Volunteer.JPG", dir: "members" },
];

export default function TeamGrid() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            The People
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Our Volunteers
          </h2>
          <p className="mt-4 text-muted-brand max-w-xl mx-auto text-base">
            Law x Tech is powered by passionate volunteers who believe in the
            future of law and technology in Nigeria.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={scaleIn}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-teal transition-all duration-300 group-hover:shadow-lg">
                <Image
                  src={`/assets/${member.dir}/${member.image}`}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4">
                <p className="font-bold text-navy text-sm">{member.name}</p>
                <p className="text-muted-brand text-xs mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
