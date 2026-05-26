/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { slideInLeft, fadeIn, staggerContainer } from "@/lib/animations";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/series", label: "Series" },
  { href: "/summit-awards", label: "Summit & Awards" },
  // { href: "/blogs", label: "Blogs" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [vh, setVh] = useState(800);
  const [lightText, setLightText] = useState(true);
  const isHome = pathname === "/";

  const { scrollY } = useScroll();

  // Background: transparent → glass (white/15) → solid white
  const bgOpacity = useTransform(scrollY, [0, vh * 0.1, vh], [0, 0.15, 0.97]);
  // Blur: none → 12px (kicks in at glass phase)
  const blurPx = useTransform(scrollY, [0, vh * 0.08, vh * 0.14], [0, 12, 12]);
  // Border: invisible → white-ish (glass) → brand-ish (white phase)
  const borderOpacity = useTransform(
    scrollY,
    [0, vh * 0.1, vh * 0.9, vh],
    [0, 0.25, 0.25, 0.12],
  );
  // Shadow fades in near the white phase
  const shadowOpacity = useTransform(scrollY, [vh * 0.85, vh], [0, 0.08]);

  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;
  const background = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`;
  const borderBottom = useMotionTemplate`1px solid rgba(180, 195, 205, ${borderOpacity})`;
  const boxShadow = useMotionTemplate`0 1px 3px rgba(0, 0, 0, ${shadowOpacity})`;

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Switch text to dark once background is opaque enough (~70vh)
  useEffect(() => {
    if (!isHome) return;
    setLightText(scrollY.get() < vh * 0.7);
    return scrollY.on("change", (y) => setLightText(y < vh * 0.7));
  }, [scrollY, vh, isHome]);

  // Non-home pages keep the original scroll-shadow behaviour
  useEffect(() => {
    if (isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const headerMotionStyle = isHome
    ? {
        background,
        backdropFilter,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        WebkitBackdropFilter: backdropFilter as any,
        borderBottom,
        boxShadow,
      }
    : undefined;

  const headerClassName = isHome
    ? "fixed top-0 left-0 right-0 z-50"
    : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled && isHome
          ? "bg-white/95 backdrop-blur-md border-b border-border-brand shadow-sm"
          : "bg-white"
      }`;

  const logoTextCls = isHome && lightText ? "text-white" : "text-navy";
  const navBaseCls =
    isHome && lightText
      ? "text-white/90 hover:text-white"
      : "text-navy hover:text-teal";
  const navActiveCls = isHome && lightText ? "text-white" : "text-teal";
  const underlineCls = isHome && lightText ? "bg-white" : "bg-teal";
  const menuBtnCls =
    isHome && lightText
      ? "text-white hover:bg-white/10"
      : "text-navy hover:bg-surface";

  return (
    <>
      <motion.header className={headerClassName} style={headerMotionStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/assets/logo/logo_2.JPG"
              alt="Law x Tech"
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
            <span
              className={`font-bold text-lg tracking-tight hidden sm:block transition-colors duration-300 ${logoTextCls}`}
            >
              Law x Tech
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? navActiveCls : navBaseCls
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-colors duration-300 ${underlineCls}`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://forms.gle/P9jUJr3NaAGnS4Je6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-dark transition-colors duration-200"
            >
              Join Community
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-sm transition-colors cursor-pointer ${menuBtnCls}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-100 bg-white flex flex-col"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideInLeft}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-border-brand">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/assets/logo/logo_2.JPG"
                  alt="Law x Tech"
                  width={36}
                  height={36}
                  className="rounded-md object-cover"
                />
                <span className="font-bold text-navy text-lg">Law x Tech</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-navy hover:bg-surface rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <motion.nav
              className="flex flex-col px-6 py-8 gap-2 flex-1"
              variants={staggerContainer(0.07)}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div key={link.href} variants={fadeIn}>
                    <Link
                      href={link.href}
                      className={`block py-4 text-xl font-semibold border-b border-border-brand transition-colors ${
                        isActive ? "text-teal" : "text-navy"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={fadeIn} className="mt-8">
                <Link
                  href="https://forms.gle/P9jUJr3NaAGnS4Je6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors"
                >
                  Join Community
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
