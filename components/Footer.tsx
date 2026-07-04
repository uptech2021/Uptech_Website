import Image from "next/image";
import Link from "next/link";
import footerLogo from "@/public/images/footerLogo.svg";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white pt-16 pb-10">
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="flex justify-between items-start gap-10 flex-wrap">
          <div>
            <Image src={footerLogo} alt="UpTech" width={120} height={34} className="h-[34px] mb-4" style={{ width: "auto" }} />
            <p className="text-[rgba(234,242,255,.55)] max-w-[24rem] text-[.95rem]">
              Cooperation, Communication, Teamwork and Commitment. Your strategic partner for business growth.
            </p>
          </div>
          <div className="flex gap-12 flex-wrap max-md:gap-[30px]">
            <div>
              <h4 className="text-[.78rem] tracking-[.12em] uppercase text-accent font-extrabold mb-3.5">Company</h4>
              <Link href="/" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">Home</Link>
              <Link href="/objectives" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">Objectives</Link>
              <Link href="/vacancies" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">Join Us</Link>
              <Link href="/about" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">About Us</Link>
            </div>
            <div>
              <h4 className="text-[.78rem] tracking-[.12em] uppercase text-accent font-extrabold mb-3.5">Services</h4>
              <Link href="/services" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">Graphic Design</Link>
              <Link href="/services" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">Marketing</Link>
              <Link href="/services" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">Web / App</Link>
              <Link href="/cyber-center" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">Cyber Center</Link>
            </div>
            <div>
              <h4 className="text-[.78rem] tracking-[.12em] uppercase text-accent font-extrabold mb-3.5">Contact</h4>
              <a href="tel:+18687104296" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">1 (868) 710-4296</a>
              <a href="mailto:uptechincorp@gmail.com" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">Email Us</a>
              <a href="https://wa.me/18687104296" target="_blank" rel="noopener noreferrer" className="block text-[rgba(234,242,255,.7)] text-[.94rem] mb-[9px] font-medium transition-colors duration-150 hover:text-white">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex justify-between gap-3.5 flex-wrap text-[rgba(234,242,255,.45)] text-[.86rem]">
          <span>&copy; 2026 UpTech Incorporated. All rights reserved.</span>
          <span>Chaguanas, Trinidad &amp; Tobago</span>
        </div>
      </div>
    </footer>
  );
}
