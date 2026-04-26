"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="pt-4 px-6 flex flex-row items-center justify-between relative z-20">
      
      {/* LOGO (UNCHANGED) */}
      <div className="flex items-center gap-2 animate-slide-in">
        <div className="w-15 h-15">
          <Link href="/">
            <Image
              className="w-1/2 h-1/2"
              src="/images/uptechlogo.svg"
              alt="uptech logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>

      {/* DESKTOP NAV (UNCHANGED) */}
      <nav className="hidden md:block">
        <ul className="flex flex-row gap-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/objectives">Objectives</Link></li>
          <li><Link href="/vacancies">Join Us</Link></li>
          <li><Link href="/about">About Us</Link></li>
        </ul>
      </nav>

      {/* MOBILE BUTTON (ONLY CHANGE HERE) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden cursor-pointer"
      >
        <Image
          src="/images/menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </button>

      {/* MOBILE MENU (CONTROLLED BY STATE) */}
      {isMenuOpen && (
        <nav className="absolute top-16 right-6 bg-white p-4 rounded shadow-md md:hidden z-30">
          <ul className="flex flex-col gap-4">
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/objectives" onClick={() => setIsMenuOpen(false)}>Objectives</Link></li>
            <li><Link href="/vacancies" onClick={() => setIsMenuOpen(false)}>Join Us</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
          </ul>
        </nav>
      )}

    </header>
  );
}