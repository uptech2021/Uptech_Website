"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import uptechLogo from "@/public/images/uptechlogo.svg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/objectives", label: "Objectives" },
  { href: "/cyber-center", label: "Cyber Center" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/vacancies", label: "Join Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        id="site-header"
        className="sticky top-0 z-50 bg-white/[.86] backdrop-blur-[14px] border-b border-transparent transition-[border-color,box-shadow] duration-[250ms]"
      >
        <div className="max-w-[1200px] mx-auto px-7 flex items-center justify-between h-[78px]">
          <Link href="/" aria-label="UpTech home">
            <Image src={uptechLogo} alt="UpTech" width={120} height={34} className="h-[34px] w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link font-bold text-[.96rem] text-ink py-[.2rem] ${pathname === link.href ? "active text-brand-700" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-[1.3rem]">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 font-extrabold text-[.94rem] py-[.7rem] px-[1.3rem] rounded-full bg-accent text-accent-ink shadow-glow cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap"
            >
              Connect With Us
            </Link>
            <button
              className="flex lg:hidden flex-col gap-[5px] p-2 bg-transparent border-0 cursor-pointer"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <span className="w-6 h-[2.5px] bg-ink rounded-sm block" />
              <span className="w-6 h-[2.5px] bg-ink rounded-sm block" />
              <span className="w-6 h-[2.5px] bg-ink rounded-sm block" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-navy/55 backdrop-blur-[4px] transition-[opacity,visibility] duration-300 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        <nav className={`absolute top-0 right-0 w-[74%] max-w-[320px] h-full bg-white py-7 px-[26px] flex flex-col gap-1.5 shadow-card-lg transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button className="self-end text-[1.6rem] bg-transparent border-0 cursor-pointer mb-2.5" onClick={() => setMenuOpen(false)} aria-label="Close">&times;</button>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3.5 px-1.5 font-bold border-b border-line ${pathname === link.href ? "text-brand-700" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 font-extrabold text-base py-[.92rem] px-[1.6rem] rounded-full bg-brand text-white shadow-glow-blue cursor-pointer border-0 transition-[transform,box-shadow,background] duration-[180ms] hover:bg-brand-deep hover:-translate-y-0.5 active:translate-y-[1px] whitespace-nowrap mt-3.5"
          >
            Connect With Us
          </Link>
        </nav>
      </div>
    </>
  );
}
