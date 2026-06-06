import Link from "next/link";
import Image from "next/image";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/series", label: "Series" },
  { href: "/careers", label: "Careers" },
  { href: "/contact-us", label: "Contact Us" },
];

const getInvolvedLinks = [
  {
    href: "https://forms.gle/P9jUJr3NaAGnS4Je6",
    label: "Join the Community",
  },
  {
    href: "https://forms.gle/Uba4R8QKKeiufVUj6",
    label: "Volunteer With Us",
  },
  {
    href: "https://surveymars.com/q/y2hFxhumV",
    label: "Apply for Careers",
  },
  {
    href: "https://luma.com/ftzpb2ki",
    label: "Register for Summit",
  },
  {
    href: "https://forms.gle/ee4eCViprcSn4DE87",
    label: "Register for Series",
  },
];

const socialLinks = [
  {
    label: "Twitter / X",
    href: "https://twitter.com/lawxtech",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L2.25 2.25h6.848l4.259 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/law-x-tech/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lawxtech",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/assets/logo/logo_2.JPG"
                alt="Law x Tech"
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
              <span className="font-bold text-xl">Law x Tech</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Empowering lawyers and tech enthusiasts to thrive at the
              intersection of law and technology.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-5">
              Pages
            </h4>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-5">
              Get Involved
            </h4>
            <ul className="space-y-3">
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-teal text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-5">
              Connect
            </h4>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:info@lawxtech.org"
                className="flex items-center gap-3 text-white/80 hover:text-teal text-sm transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-teal"
              >
                info@lawxtech.org
              </a>
              <a
                href="tel:+2349099030433"
                className="flex items-center gap-3 text-white/80 hover:text-white text-sm transition-colors"
              >
                +234 909 903 0433
              </a>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-teal flex items-center justify-center transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">
            © 2026 Law x Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
