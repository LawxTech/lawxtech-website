"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const AUTOPLAY_MS = 5000;

const flyers = [
  {
    src: "/assets/events/summit-awards-2026-flyer.jpeg",
    alt: "Law x Tech Summit & Awards 2026 flyer: Spotlighting Nigerian Legal Technology. 28 November 2026, 9am at The Zone, Plot 9, Gbagada Industrial Scheme, beside UPS, Gbagada-Oworonshoki Expressway, Lagos.",
  },
  {
    src: "/assets/events/summit-awards-2026-location.jpeg",
    alt: "Law x Tech Summit & Awards 2026 location confirmed: The Zone, Gbagada, Lagos. 28 November 2026.",
  },
];

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

  const current = flyers[index];

  return (
    <div
      className="w-full max-w-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div
          className="relative rounded-xl overflow-hidden shadow-2xl"
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
                key={flyer.src}
                aria-label={`View flyer ${i + 1} of ${count} full size`}
                aria-hidden={i !== index}
                tabIndex={i === index ? 0 : -1}
                className="group relative block w-full shrink-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal"
              >
                <Image
                  src={flyer.src}
                  alt={flyer.alt}
                  width={1080}
                  height={1350}
                  sizes="(min-width: 640px) 384px, 90vw"
                  priority={i === 0}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
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

        {count > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {flyers.map((flyer, i) => (
              <button
                key={flyer.src}
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

        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/80 transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-[100] w-[min(92vw,70vh)] -translate-x-1/2 -translate-y-1/2 outline-none transition-all duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
            <Dialog.Title className="sr-only">
              Law x Tech Summit & Awards 2026 flyer
            </Dialog.Title>
            <Image
              src={current.src}
              alt={current.alt}
              width={1080}
              height={1350}
              sizes="(min-width: 768px) 70vh, 92vw"
              className="w-full h-auto rounded-xl"
            />
            <Dialog.Close
              aria-label="Close flyer"
              className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-navy shadow-lg hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <X size={18} />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
