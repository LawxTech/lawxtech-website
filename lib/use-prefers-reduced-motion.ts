import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/**
 * Hydration-safe `prefers-reduced-motion`. framer-motion's `useReducedMotion`
 * reads the media query during the first client render, so markup that
 * depends on it mismatches the server HTML. This reports `false` while
 * hydrating and the real preference straight after.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
