import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-logo">
            <Image src="/images/footerLogo.svg" alt="UpTech" width={120} height={34} />
            <p className="foot-tag">Cooperation, Communication, Teamwork and Commitment. Your strategic partner for business growth.</p>
          </div>
          <div className="foot-nav">
            <div className="foot-col">
              <h4>Company</h4>
              <Link href="/">Home</Link>
              <Link href="/objectives">Objectives</Link>
              <Link href="/vacancies">Join Us</Link>
              <Link href="/about">About Us</Link>
            </div>
            <div className="foot-col">
              <h4>Services</h4>
              <Link href="/services">Graphic Design</Link>
              <Link href="/services">Marketing</Link>
              <Link href="/services">Web / App</Link>
              <Link href="/cyber-center">Cyber Center</Link>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <a href="tel:+18687104296">1 (868) 710-4296</a>
              <a href="mailto:uptechincorp@gmail.com">Email Us</a>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 UpTech Incorporated. All rights reserved.</span>
          <span>Chaguanas, Trinidad &amp; Tobago</span>
        </div>
      </div>
    </footer>
  );
}
