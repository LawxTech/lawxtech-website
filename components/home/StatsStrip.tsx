"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/animations";

const stats = [
  { value: 12, label: "Mini Series", suffix: "+" },
  { value: 12, label: "Major Series", suffix: "+" },
  { value: 300, label: "Community Members", suffix: "+" },
  { value: 10, label: "Team Members", suffix: "+" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <section className="bg-[#113167] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={slideUp}
              className="flex flex-col items-center text-center"
            >
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-2 text-sm font-medium text-white/60 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
