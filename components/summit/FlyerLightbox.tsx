"use client";

import type { KeyboardEvent, ReactNode } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Flyer } from "./flyers";

const navButton =
  "absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-navy shadow-lg hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal";

/**
 * Full-size flyer viewer. Wraps its `children` in the dialog root so they can
 * render `Dialog.Trigger`s. With more than one flyer, the arrow keys and the
 * on-screen arrows step through them.
 */
export default function FlyerLightbox({
  flyers,
  index,
  onIndexChange,
  open,
  onOpenChange,
  children,
}: {
  flyers: Flyer[];
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  const count = flyers.length;
  const current = flyers[index];
  const go = (step: number) => onIndexChange((index + step + count) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (count < 2) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-100 bg-black/80 transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0" />
        {/* Fixed 4:5 frame (the shape of most flyers) so the controls never
            move while an image loads or when stepping to a different shape. */}
        <Dialog.Popup
          onKeyDown={onKeyDown}
          className="fixed left-1/2 top-1/2 z-100 aspect-4/5 w-[min(92vw,70vh)] -translate-x-1/2 -translate-y-1/2 outline-none transition-all duration-200 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
        >
          <Dialog.Title className="sr-only">
            Law x Tech Summit & Awards 2026 flyer
            {count > 1 && ` ${index + 1} of ${count}`}
          </Dialog.Title>
          <Image
            key={current.src.src}
            src={current.src}
            alt={current.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 70vh, 92vw"
            className="rounded-xl object-contain"
          />
          {count > 1 &&
            [index - 1, index + 1].map((i) => {
              const flyer = flyers[(i + count) % count];
              return (
                <Image
                  key={`preload-${flyer.src.src}`}
                  src={flyer.src}
                  alt=""
                  aria-hidden
                  fill
                  loading="eager"
                  sizes="(min-width: 768px) 70vh, 92vw"
                  className="invisible"
                />
              );
            })}
          <Dialog.Close
            aria-label="Close flyer"
            className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-navy shadow-lg hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            <X size={18} />
          </Dialog.Close>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous flyer"
                className={`${navButton} left-3`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next flyer"
                className={`${navButton} right-3`}
              >
                <ChevronRight size={20} />
              </button>
              <p
                aria-live="polite"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
              >
                {index + 1} / {count}
              </p>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
