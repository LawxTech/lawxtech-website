"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const SAND_SECONDS = 10;

/**
 * Illustration from the "Days to go" graphics: a tilted teal hourglass with
 * draining gold sand, a stopwatch behind it, a frosted star block and floating
 * aqua spheres. Purely decorative; the caller sets its position (it must be
 * `relative` or `absolute` so the spheres stay inside it).
 */
export default function CountdownHourglass({
  className = "",
}: {
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const id = useId().replace(/:/g, "");
  const loop = {
    duration: SAND_SECONDS,
    repeat: Infinity,
    ease: "linear" as const,
  };

  return (
    <div aria-hidden className={`select-none ${className}`}>
      {/* Floating aqua spheres */}
      {[
        "left-[4%] top-[14%] size-[9%]",
        "right-[6%] top-[38%] size-[7%]",
        "left-[18%] bottom-[6%] size-[11%]",
        "right-[22%] top-[4%] size-[6%]",
      ].map((pos, i) => (
        <motion.span
          key={pos}
          className={`absolute ${pos} rounded-full bg-[radial-gradient(circle_at_30%_30%,#b8fbff_0%,#2fd3df_45%,#0a8f9b_100%)] shadow-[0_10px_25px_-8px_rgba(0,106,119,0.6)]`}
          animate={reduce ? undefined : { y: [0, i % 2 ? 10 : -10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.svg
        viewBox="0 0 400 440"
        className="relative h-auto w-full overflow-visible"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id={`${id}-teal`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#24b3bf" />
            <stop offset="0.55" stopColor="#0a8592" />
            <stop offset="1" stopColor="#005a66" />
          </linearGradient>
          <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3cc8d2" />
            <stop offset="1" stopColor="#077784" />
          </linearGradient>
          <linearGradient id={`${id}-sand`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd54a" />
            <stop offset="1" stopColor="#f5a00b" />
          </linearGradient>
          <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id={`${id}-face`} cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#d4eef0" />
          </radialGradient>
          <clipPath id={`${id}-top`}>
            <path d="M-56 -118 C-56 -50 -8 -24 -8 0 L8 0 C8 -24 56 -50 56 -118 Z" />
          </clipPath>
          <clipPath id={`${id}-bottom`}>
            <path d="M-8 0 C-8 24 -56 50 -56 118 L56 118 C56 50 8 24 8 0 Z" />
          </clipPath>
        </defs>

        {/* Stopwatch behind, lower left */}
        <g transform="translate(118 300)">
          <rect
            x="-12"
            y="-104"
            width="24"
            height="22"
            rx="6"
            fill={`url(#${id}-cap)`}
          />
          <rect
            x="44"
            y="-92"
            width="18"
            height="16"
            rx="5"
            fill={`url(#${id}-cap)`}
            transform="rotate(40)"
          />
          <circle r="84" fill={`url(#${id}-teal)`} />
          <circle r="68" fill={`url(#${id}-face)`} />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-50"
            stroke="#0a7d89"
            strokeWidth="7"
            strokeLinecap="round"
          >
            {!reduce && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="12s"
                repeatCount="indefinite"
              />
            )}
          </line>
          <circle r="9" fill="#0a7d89" />
        </g>

        {/* Hourglass, tilted like the graphics */}
        <g transform="translate(236 216) rotate(-14)">
          {/* Glass */}
          <path
            d="M-56 -118 C-56 -50 -8 -24 -8 0 C-8 24 -56 50 -56 118 L56 118 C56 50 8 24 8 0 C8 -24 56 -50 56 -118 Z"
            fill={`url(#${id}-glass)`}
            stroke="#ffffff"
            strokeOpacity="0.85"
            strokeWidth="3"
          />
          {/* Top sand drains */}
          <g clipPath={`url(#${id}-top)`}>
            <motion.rect
              x="-60"
              width="120"
              height="130"
              fill={`url(#${id}-sand)`}
              initial={{ y: -78 }}
              animate={reduce ? { y: -60 } : { y: [-78, 0] }}
              transition={reduce ? undefined : loop}
            />
          </g>
          {/* Falling stream */}
          {!reduce && (
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="112"
              stroke="#f7b41c"
              strokeWidth="3"
              strokeDasharray="6 6"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
            />
          )}
          {/* Bottom sand fills */}
          <g clipPath={`url(#${id}-bottom)`}>
            <motion.path
              fill={`url(#${id}-sand)`}
              initial={{ y: 70 }}
              animate={reduce ? { y: 40 } : { y: [70, 0] }}
              transition={reduce ? undefined : loop}
              d="M-60 120 L-60 60 Q0 28 60 60 L60 120 Z"
            />
          </g>
          {/* Highlight */}
          <path
            d="M-40 -104 C-40 -62 -14 -40 -12 -18"
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Rods */}
          <rect
            x="-82"
            y="-126"
            width="14"
            height="252"
            rx="7"
            fill={`url(#${id}-teal)`}
          />
          <rect
            x="68"
            y="-126"
            width="14"
            height="252"
            rx="7"
            fill={`url(#${id}-teal)`}
          />
          {/* Caps */}
          <rect
            x="-98"
            y="-150"
            width="196"
            height="30"
            rx="15"
            fill={`url(#${id}-cap)`}
          />
          <ellipse
            cx="0"
            cy="-146"
            rx="88"
            ry="7"
            fill="#7fe6ee"
            opacity="0.6"
          />
          <rect
            x="-98"
            y="120"
            width="196"
            height="30"
            rx="15"
            fill={`url(#${id}-cap)`}
          />
        </g>

        {/* Frosted star block, front right */}
        <g transform="translate(318 352) rotate(-8)">
          <rect
            x="-54"
            y="-54"
            width="108"
            height="108"
            rx="18"
            fill="#ffffff"
            fillOpacity="0.55"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <motion.path
            d="M0 -30 L9 -9 L32 -8 L14 7 L20 30 L0 17 L-20 30 L-14 7 L-32 -8 L-9 -9 Z"
            fill="#ffc21a"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinejoin="round"
            animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </motion.svg>
    </div>
  );
}
