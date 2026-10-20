"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { summitFlyers as flyers } from "./flyers";
import FlyerLightbox from "./FlyerLightbox";

const AUTOPLAY_MS = 5000;

export default function FlyerCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);

  const count = flyers.length;
  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused || open || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, open, count, go, index]);

  return (
    <div
      className="w-full max-w-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <FlyerLightbox
        flyers={flyers}
        index={index}
        onIndexChange={setIndex}
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className="relative rounded-xl overflow-hidden shadow-2xl bg-navy"
          role="region"
          aria-roledescription="carousel"
          aria-label="Summit flyers"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {flyers.map((flyer, i) => (
              <Dialog.Trigger
                key={flyer.src.src}
                aria-label={`View flyer ${i + 1} of ${count} full size`}
                aria-hidden={i !== index}
                tabIndex={i === index ? 0 : -1}
                className="group relative block w-full shrink-0 aspect-4/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal"
              >
                <Image
                  src={flyer.src}
                  alt={flyer.alt}
                  fill
                  sizes="(min-width: 640px) 384px, 90vw"
                  placeholder="blur"
                  preload={i === 0}
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <Maximize2 size={12} />
                  View full size
                </span>
              </Dialog.Trigger>
            ))}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous flyer"
                className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-navy/70 p-2 text-white backdrop-blur-sm hover:bg-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next flyer"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-navy/70 p-2 text-white backdrop-blur-sm hover:bg-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </FlyerLightbox>

      {count > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {flyers.map((flyer, i) => (
            <button
              key={flyer.src.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show flyer ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                i === index ? "w-6 bg-teal" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
