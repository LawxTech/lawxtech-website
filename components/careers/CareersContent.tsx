"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  slideUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  scaleIn,
} from "@/lib/animations";

const APPLICATION_LINK = "https://surveymars.com/q/y2hFxhumV";

const roles = [
  {
    title: "Graphics & Creative Lead",
    type: "Volunteer · Remote",
    description:
      "Create compelling visual assets that bring the Law x Tech brand to life — from social media graphics and event flyers to presentation decks and digital reports. You will own the visual identity of our content and help us look as sharp as the ideas we champion.",
    responsibilities: [
      "Design social media graphics, banners, and promotional materials",
      "Maintain brand consistency across all visual touchpoints",
      "Collaborate with the communications team on content campaigns",
      "Support design needs for series, summit, and community events",
    ],
    ideal: [
      "Proficiency in Figma, Adobe Illustrator, or Canva Pro",
      "Strong eye for layout, typography, and colour",
      "Ability to turn briefs into polished deliverables quickly",
      "Interest in law, tech, or social impact is a plus",
    ],
  },
  {
    title: "Communications & Social Media Lead",
    type: "Volunteer · Remote",
    description:
      "Be the voice of Law x Tech across our digital channels. You will craft content that educates, excites, and grows our community — turning legal tech conversations into movements that people want to be part of.",
    responsibilities: [
      "Manage and grow Law x Tech's social media presence (LinkedIn, Instagram, X)",
      "Draft newsletters, announcements, and community updates",
      "Develop and execute content calendars aligned with our programs",
      "Track engagement metrics and iterate on what works",
    ],
    ideal: [
      "Strong writing and storytelling skills",
      "Familiarity with social media strategy and analytics",
      "Ability to translate complex legal tech topics into accessible content",
      "Experience with email marketing tools is an advantage",
    ],
  },
  {
    title: "Partnerships & Outreach Lead",
    type: "Volunteer · Remote",
    description:
      "Build the relationships that expand Law x Tech's reach and impact. You will identify, pitch, and nurture partnerships with law firms, tech companies, universities, and organisations who share our vision for Africa's legal tech future.",
    responsibilities: [
      "Identify and approach potential partners, sponsors, and collaborators",
      "Represent Law x Tech in conversations with external stakeholders",
      "Manage partner relationships and track partnership outcomes",
      "Support outreach for summit speakers, panellists, and event guests",
    ],
    ideal: [
      "Strong interpersonal and communication skills",
      "Comfortable reaching out cold and following up persistently",
      "Background or interest in business development, law, or tech",
      "Organised and able to manage multiple relationships simultaneously",
    ],
  },
  {
    title: "Projects Coordinator",
    type: "Volunteer · Remote",
    description:
      "Keep Law x Tech running like a well-oiled machine. You will sit at the centre of our operations — coordinating timelines, keeping teams aligned, and making sure our programs and events actually happen the way they were planned.",
    responsibilities: [
      "Coordinate internal projects across teams and track milestones",
      "Schedule and facilitate team meetings and follow up on action items",
      "Maintain project documentation, trackers, and shared resources",
      "Support the planning and execution of series, mini series, and summit events",
    ],
    ideal: [
      "Highly organised with strong attention to detail",
      "Comfortable with project management tools (Notion, Trello, Asana, etc.)",
      "Clear written and verbal communicator",
      "Proactive problem-solver who takes ownership without being asked",
    ],
  },
];

const perks = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    ),
    title: "Real Experience",
    body: "Work on live programs that reach thousands of legal professionals across Africa.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    ),
    title: "A Community of Builders",
    body: "Collaborate with lawyers, technologists, and creatives who are shaping the future of legal practice.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
      />
    ),
    title: "Recognition & Growth",
    body: "Get credited for your contributions, build your portfolio, and grow your network in the legal tech space.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    ),
    title: "Fully Remote",
    body: "Work from anywhere in Nigeria (or beyond). We operate asynchronously and respect your time.",
  },
];

export default function CareersContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 border-b border-border-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={slideUp}
              className="block text-teal text-sm font-semibold uppercase tracking-widest mb-3"
            >
              Join the Team
            </motion.span>
            <motion.h1
              variants={slideUp}
              className="text-4xl sm:text-5xl font-bold text-navy tracking-tight"
            >
              We Are Building Something Great
            </motion.h1>
            <motion.p
              variants={slideUp}
              className="mt-5 text-muted-brand text-base leading-relaxed"
            >
              Law x Tech is recruiting 4 sharp, driven volunteers to help build
              Africa&apos;s home for law and technology. If you are passionate
              about legal innovation and want your work to matter — this is for
              you.
            </motion.p>
            <motion.div
              variants={slideUp}
              className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Why join us */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              Why Volunteer With Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              What You Get
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {perks.map((perk) => (
              <motion.div
                key={perk.title}
                variants={scaleIn}
                className="bg-white rounded-2xl p-7 border border-border-brand hover:shadow-lg hover:border-teal/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center mb-5">
                  <svg
                    className="w-5 h-5 text-teal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    {perk.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-navy text-base mb-2">
                  {perk.title}
                </h3>
                <p className="text-muted-brand text-sm leading-relaxed">
                  {perk.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              Open Positions
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Roles Available
            </h2>
            <p className="mt-4 text-muted-brand max-w-xl mx-auto text-base">
              All roles are volunteer positions. We are going live on June 1st —
              apply now to be part of the founding team.
            </p>
          </motion.div>

          <div className="space-y-8">
            {roles.map((role, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={role.title}
                  variants={isEven ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="bg-surface rounded-2xl border border-border-brand overflow-hidden"
                >
                  {/* Role header */}
                  <div className="bg-navy px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {role.title}
                      </h3>
                      <span className="text-teal text-xs font-semibold uppercase tracking-wider mt-1 block">
                        {role.type}
                      </span>
                    </div>
                    <Link
                      href={APPLICATION_LINK}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-dark transition-colors shrink-0"
                    >
                      Apply Now
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Role body */}
                  <div className="px-8 py-7 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-3">
                      <p className="text-[#374151] text-sm leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-sm mb-3 uppercase tracking-wider">
                        What You&apos;ll Do
                      </h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-2.5">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                            <span className="text-muted-brand text-sm leading-relaxed">
                              {r}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-2">
                      <h4 className="font-bold text-navy text-sm mb-3 uppercase tracking-wider">
                        What We&apos;re Looking For
                      </h4>
                      <ul className="space-y-2">
                        {role.ideal.map((r) => (
                          <li key={r} className="flex items-start gap-2.5">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-navy/30 shrink-0" />
                            <span className="text-muted-brand text-sm leading-relaxed">
                              {r}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={slideUp}
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Are you built for this?
            </motion.h2>
            <motion.p
              variants={slideUp}
              className="mt-4 text-white/70 text-base leading-relaxed"
            >
              We go live on June 1st. Apply now and help us build Africa&apos;s
              home for law and technology.
            </motion.p>
            <motion.div
              variants={slideUp}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href={APPLICATION_LINK}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors"
              >
                Apply Now
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Have a Question?
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
