import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="pt-4 px-6 flex flex-row items-center justify-between relative z-20">
      <div className="flex items-center gap-2 animate-slide-in" id="slide-in">
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
      <nav className="hidden md:block">
        <ul className="flex flex-row gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/objectives">Objectives</Link>
          </li>
          <li>
            <Link href="/vacancies">Vacancies</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </nav>
      <Image
        src="/images/menu.svg"
        alt="menu"
        className="w-8 h-8 md:hidden cursor-pointer"
        id="menu-button"
        width={32}
        height={32}
      />
      <nav
        className="absolute top-16 right-6 bg-white p-4 rounded shadow-md md:hidden hidden z-30"
        id="mobile-menu"
      >
        <ul className="flex flex-col gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/objectives">Objectives</Link>
          </li>
          <li>
            <Link href="/vacancies">Vacancies</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
