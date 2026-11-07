"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCw,
  Ticket,
} from "lucide-react";
import FlyerLightbox from "@/components/summit/FlyerLightbox";
import { summitSpeakers as speakers } from "@/components/summit/speakers";
import {
  SUMMIT_DATE_LABEL,
  SUMMIT_TICKETS_URL,
  SUMMIT_TIME_LABEL,
  SUMMIT_VENUE_LABEL,
  SUMMIT_VENUE_MAPS_URL,
} from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const AUTOPLAY_MS = 6000;
const SWIPE_PX = 60;
const count = speakers.length;
const bioFlyers = speakers.map((s) => ({ src: s.bio, alt: s.bioAlt }));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

const arrowButton =
  "absolute top-1/2 z-20 -translate-y-1/2 inline-flex size-11 items-center justify-center rounded-full bg-[#030d1a]/60 text-white backdrop-blur-md ring-1 ring-white/20 transition-colors hover:bg-[#030d1a]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal";

/** Wraps a cyclic distance so neighbours of the first/last item count too. */
const isNear = (i: number, index: number) => {
  const d = Math.abs(i - index);
  return Math.min(d, count - d) <= 1;
};

/**
 * Homepage hero for the run-up to the Summit: a rotating "speaker spotlight"
 * card that flips over to show each speaker's bio flyer.
 */
export default function SpeakerHighlightHero() {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  // Any touch interaction stops autoplay for good: a visitor who is swiping
  // through by hand shouldn't have the card move under their thumb.
  const [stopped, setStopped] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dragged = useRef(false);

  const speaker = speakers[index];
  const autoplay = !reduceMotion && !stopped;
  const paused = hovered || focused || flipped || tabHidden || lightboxOpen;

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const show = useCallback((i: number) => {
    setIndex(((i % count) + count) % count);
    setFlipped(false);
  }, []);
  const step = useCallback(
    (delta: number) => show(index + delta),
    [index, show],
  );

  const onKeyDown = (e: KeyboardEvent) => {
    if (lightboxOpen) return; // the lightbox handles its own arrows
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") setStopped(true);
  };

  // Pause for keyboard users only; a mouse click also focuses buttons, and
  // that shouldn't freeze autoplay until the visitor clicks elsewhere.
  const onFocus = (e: FocusEvent) => {
    if (e.target.matches(":focus-visible")) setFocused(true);
  };
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setFocused(false);
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_PX) step(1);
    else if (info.offset.x >= SWIPE_PX) step(-1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Law x Tech Summit & Awards 2026 speakers"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
      className="relative -mt-16 flex min-h-svh flex-col justify-center overflow-hidden bg-[#030d1a]"
    >
      {/* Ambient backdrop: the active flyer, heavily blurred, so the hero
          takes on each speaker's colours. Small `sizes`: it is blurred anyway. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={speaker.slug}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0"
        >
          <Image
            src={speaker.spotlight}
            alt=""
            fill
            sizes="20vw"
            className="scale-125 object-cover blur-3xl"
          />
        </motion.div>
      </AnimatePresence>
      {/* Dot field, echoing the flyers' dotted wave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(94, 234, 212, 0.35) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 70% 65%, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 70% 65%, black 10%, transparent 75%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#030d1a] via-[#030d1a]/55 to-[#030d1a]/70" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#030d1a]/80 via-[#030d1a]/20 to-transparent" />

      <FlyerLightbox
        flyers={bioFlyers}
        index={index}
        onIndexChange={setIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      >
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-12 gap-y-8 px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_auto] lg:px-8 lg:pb-16 xl:gap-x-20">
          {/* A — heading */}
          <motion.div
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:self-end"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-[#2dd4bf]" />
              </span>
              Summit &amp; Awards 2026
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Meet the
              <span className="block text-[#5eead4]">speakers</span>
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70 sm:text-base">
              <span>{SUMMIT_DATE_LABEL}</span>
              <span aria-hidden className="text-white/30">
                ·
              </span>
              <span>{SUMMIT_TIME_LABEL}</span>
              <span aria-hidden className="text-white/30">
                ·
              </span>
              <a
                href={SUMMIT_VENUE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SUMMIT_VENUE_LABEL} (opens in Google Maps)`}
                className="rounded-sm transition-colors hover:text-[#5eead4] focus-visible:text-[#5eead4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                {SUMMIT_VENUE_LABEL}
              </a>
            </p>
          </motion.div>

          {/* B — the stage. Sized by width and viewport height so the whole
              card always fits on screen, from small phones to short laptops. */}
          <motion.div
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="justify-self-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
          >
            <div
              className="relative aspect-4/5 w-[max(240px,min(82vw,420px,calc((100svh_-_7rem)*0.8)))] lg:w-[max(320px,min(460px,calc((100svh_-_10rem)*0.8)))]"
              style={{ perspective: 1800 }}
            >
              {/* Glow under the card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 rounded-[40px] bg-teal/30 blur-3xl"
              />

              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                dragSnapToOrigin
                onPointerDownCapture={() => {
                  dragged.current = false;
                }}
                onDragStart={() => {
                  dragged.current = true;
                }}
                onDragEnd={onDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <motion.button
                  type="button"
                  onClick={() => {
                    if (dragged.current) return;
                    setFlipped((f) => !f);
                  }}
                  aria-pressed={flipped}
                  aria-label={
                    flipped
                      ? `Showing ${speaker.name}'s bio. Show spotlight instead`
                      : `Read ${speaker.name}'s bio`
                  }
                  animate={{ rotateY: reduceMotion ? 0 : flipped ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="absolute inset-0 rounded-2xl text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4 focus-visible:ring-offset-[#030d1a]"
                >
                  {/* Front: spotlight flyers, stacked and cross-faded */}
                  <div
                    aria-hidden={flipped}
                    className="absolute inset-0 overflow-hidden rounded-2xl bg-navy transition-opacity duration-500"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      opacity: reduceMotion && flipped ? 0 : 1,
                    }}
                  >
                    {speakers.map((s, i) => (
                      <Image
                        key={s.slug}
                        src={s.spotlight}
                        alt={i === index ? s.spotlightAlt : ""}
                        aria-hidden={i !== index}
                        fill
                        draggable={false}
                        preload={i === 0}
                        placeholder="blur"
                        sizes="(min-width: 1024px) 460px, 82vw"
                        className={`select-none object-cover transition-[opacity,transform] duration-700 ease-out ${
                          i === index
                            ? "scale-100 opacity-100"
                            : "scale-[1.04] opacity-0"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Back: bio flyers. Only the active one and its
                      neighbours are mounted, so they're ready without
                      downloading all five up front. */}
                  <div
                    aria-hidden={!flipped}
                    className="absolute inset-0 overflow-hidden rounded-2xl bg-navy transition-opacity duration-500"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: reduceMotion ? undefined : "rotateY(180deg)",
                      opacity: reduceMotion && !flipped ? 0 : 1,
                    }}
                  >
                    {speakers.map(
                      (s, i) =>
                        isNear(i, index) && (
                          <Image
                            key={s.slug}
                            src={s.bio}
                            alt={i === index ? s.bioAlt : ""}
                            aria-hidden={i !== index}
                            fill
                            draggable={false}
                            placeholder="blur"
                            sizes="(min-width: 1024px) 460px, 82vw"
                            className={`select-none object-cover ${
                              i === index ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        ),
                    )}
                  </div>
                </motion.button>
              </motion.div>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous speaker"
                className={`${arrowButton} left-2 sm:-left-5`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next speaker"
                className={`${arrowButton} right-2 sm:-right-5`}
              >
                <ChevronRight size={20} />
              </button>

              <AnimatePresence>
                {flipped && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: reduceMotion ? 0 : 0.45 }}
                    className="absolute right-2 top-2 z-20"
                  >
                    <Dialog.Trigger
                      aria-label={`Open ${speaker.name}'s bio full size`}
                      className="inline-flex h-11 items-center gap-1.5 rounded-full bg-[#030d1a]/75 px-4 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-[#030d1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    >
                      <Maximize2 size={14} />
                      Expand
                    </Dialog.Trigger>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* C — active speaker, actions, picker */}
          <motion.div
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:self-start"
          >
            <div className="min-h-[5.5rem] sm:min-h-[6.25rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={speaker.slug}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5eead4]">
                    Speaker {String(index + 1).padStart(2, "0")} /{" "}
                    {String(count).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    {speaker.name}
                  </p>
                  <p className="mt-1 text-sm text-white/70 sm:text-base">
                    {speaker.role}, {speaker.org}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <p
              aria-live={autoplay && !paused ? "off" : "polite"}
              className="sr-only"
            >
              {`Speaker ${index + 1} of ${count}: ${speaker.name}, ${speaker.role}, ${speaker.org}.${flipped ? " Showing bio." : ""}`}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={SUMMIT_TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-teal px-9 py-4 text-lg font-bold text-white shadow-[0_12px_40px_-10px_rgba(45,212,191,0.7)] transition-[background-color,box-shadow] duration-200 hover:bg-teal-dark hover:shadow-[0_14px_44px_-8px_rgba(45,212,191,0.85)] sm:w-auto"
              >
                <Ticket size={21} />
                Get Tickets
              </Link>
              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                aria-pressed={flipped}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl border border-white/25 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 sm:w-auto"
              >
                <RotateCw
                  size={19}
                  className={`transition-transform duration-500 ${flipped ? "rotate-180" : ""}`}
                />
                {flipped ? "Back to spotlight" : "Read bio"}
              </button>
            </div>
            {/* Speaker picker */}
            <div
              role="group"
              aria-label="Choose a speaker"
              className="mt-5 flex gap-2"
            >
              {speakers.map((s, i) => {
                const active = i === index;
                return (
                  // The bar is the control; the button's height gives it a
                  // comfortable tap target around the thin track.
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => show(i)}
                    aria-label={`Show ${s.name}`}
                    aria-pressed={active}
                    className="group flex h-11 w-12 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal sm:w-14"
                  >
                    <span
                      aria-hidden
                      className={`relative h-1 w-full overflow-hidden rounded-full transition-colors ${
                        active
                          ? "bg-white/20"
                          : "bg-white/15 group-hover:bg-white/40"
                      }`}
                    >
                      {active && (
                        <span
                          key={`${s.slug}-${index}`}
                          className={`absolute inset-0 origin-left rounded-full bg-[#2dd4bf] ${
                            autoplay ? "animate-speaker-progress" : ""
                          }`}
                          style={
                            autoplay
                              ? {
                                  animationDuration: `${AUTOPLAY_MS}ms`,
                                  animationPlayState: paused
                                    ? "paused"
                                    : "running",
                                }
                              : undefined
                          }
                          // The bar's own animation drives autoplay, so the
                          // visible progress and the slide change never drift.
                          onAnimationEnd={() => step(1)}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </FlyerLightbox>
    </section>
  );
}
