/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import {
  getTimeRemaining,
  formatTwoDigits,
  TimeRemaining,
} from "@/lib/countdown";
import { SUMMIT_DATE } from "@/lib/constants";

const units: { key: keyof Omit<TimeRemaining, "isPast">; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function Countdown({
  targetDate = SUMMIT_DATE,
}: {
  targetDate?: Date;
}) {
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    setTime(getTimeRemaining(targetDate));
    const id = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (time?.isPast) {
    return (
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-2xl sm:text-3xl font-bold text-white">
          We&apos;ve arrived! The Law x Tech Summit &amp; Awards is here.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-4 gap-3 sm:gap-6"
    >
      {units.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-2 py-6 sm:px-8 sm:py-10"
        >
          <span className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tabular-nums">
            {time
              ? key === "days"
                ? time[key]
                : formatTwoDigits(time[key])
              : "--"}
          </span>
          <span className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-white/60">
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
