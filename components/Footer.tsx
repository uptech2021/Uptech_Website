import '../styles/footer.css'

import whatsAppIcon from '../public/Icons/Whatsapp Icon.svg'
import instagramIcon from '../public/Icons/Instagram Icon.svg'
import linkedInIcon from '../public/Icons/LinkedIn Icon.svg'
import twitterIcon from '../public/Icons/Twitter Icon.svg'
import facebookIcon from '../public/Icons/Facebook Icon.svg'
import Image from 'next/image'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer>
      <div className="uptech-details">
        <div className="company-details">
          <div className="company-name">
            <h4>UPTECH</h4>
            <h5>Incorported Ltd</h5>
          </div>

          
          <div className="swap swap-pc">
            <p className="footer-links">Terms & Conditions</p>
            <p className="footer-links">Privacy Policy</p>
            <p className="footer-links">Contact Us</p>
            <p className="footer-links">Help</p>
          </div>
        </div>

        <div className="social-icons">
          <Image src={whatsAppIcon} className='icon' alt="whatsapp icon" />
          <Image src={instagramIcon} className='icon' alt="Instagram icon" />
          <Image src={linkedInIcon} className='icon' alt="LinkedIn icon" />
          <Image src={twitterIcon} className='icon' alt="Twitter icon" />
          <Image src={facebookIcon} className='icon' alt="Facebook icon" />
        </div>

      </div>

        <p className='swap swap-mobile'>Cooperation, Communication, Teamwork and Commitment</p>
    </footer>
  )
}