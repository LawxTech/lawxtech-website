"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { slideInLeft, fadeIn, staggerContainer } from "@/lib/animations";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/series", label: "Series" },
  // { href: "/blogs", label: "Blogs" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#e4e8ef] shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/assets/logo/logo_2.JPG"
              alt="Law x Tech"
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
            <span className="font-bold text-[#113167] text-lg tracking-tight hidden sm:block">
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
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#02807e]"
                      : "text-[#113167] hover:text-[#02807e]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#02807e] rounded-full"
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
              className="px-5 py-2 bg-[#02807e] text-white text-sm font-semibold rounded-lg hover:bg-[#026e6c] transition-colors duration-200"
            >
              Join Community
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-[#113167] rounded-md hover:bg-[#f8f9fb] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-100 bg-white flex flex-col"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideInLeft}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#e4e8ef]">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/assets/logo/logo_2.JPG"
                  alt="Law x Tech"
                  width={36}
                  height={36}
                  className="rounded-md object-cover"
                />
                <span className="font-bold text-[#113167] text-lg">
                  Law x Tech
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#113167] hover:bg-[#f8f9fb] rounded-md transition-colors"
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
                      className={`block py-4 text-xl font-semibold border-b border-[#e4e8ef] transition-colors ${
                        isActive ? "text-[#02807e]" : "text-[#113167]"
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
                  className="block w-full text-center px-6 py-3 bg-[#02807e] text-white font-semibold rounded-lg hover:bg-[#026e6c] transition-colors"
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
