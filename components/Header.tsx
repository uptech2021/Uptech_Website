"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
      <header ref={headerRef} id="site-header">
        <div className="wrap nav">
          <Link href="/" className="logo" aria-label="UpTech home">
            <Image src="/images/uptechlogo.svg" alt="UpTech" width={120} height={34} />
          </Link>
          <nav className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "active" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-right">
            <Link href="/contact" className="btn btn-accent" style={{ padding: ".7rem 1.3rem", fontSize: ".94rem" }}>
              Connect With Us
            </Link>
            <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}>
        <nav>
          <button className="close" onClick={() => setMenuOpen(false)} aria-label="Close">&times;</button>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-blue" style={{ marginTop: 14, justifyContent: "center" }}>
            Connect With Us
          </Link>
        </nav>
      </div>
    </>
  );
}
