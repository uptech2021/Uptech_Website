import '../styles/footer.css'

import whatsAppIcon from '../public/Icons/Whatsapp Icon.svg'
import instagramIcon from '../public/Icons/Instagram Icon.svg'
import linkedInIcon from '../public/Icons/LinkedIn Icon.svg'
import twitterIcon from '../public/Icons/Twitter Icon.svg'
import facebookIcon from '../public/Icons/Facebook Icon.svg'
import ourlimeIcon from '../public/Icons/Ourlime Icon.svg'
import Image from 'next/image'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer>
      <div className="uptech-details">
        <div className="company-details">
          <div className="company-name">
            <h4>UPTECH</h4>
            <h5>Incorporated Ltd</h5>
          </div>

          
          <ul className="swap swap-pc">
            <li><Link className="footer-links" href="/terms">Terms & Conditions</Link> </li>
            <li><Link className="footer-links" href="/privacy">Privacy Policy</Link> </li>
            <li><Link className="footer-links" href="/contact">Contact Us</Link> </li>
          </ul>
        </div>

        <ul className="social-icons">
          <li><Image src={whatsAppIcon} className='icon' alt="whatsapp icon" /> </li>
          <li><Image src={instagramIcon} className='icon' alt="Instagram icon" /> </li>
          <li><Image src={linkedInIcon} className='icon' alt="LinkedIn icon" /> </li>
          <li><Image src={twitterIcon} className='icon' alt="Twitter icon" /> </li>
          <li><Image src={facebookIcon} className='icon' alt="Facebook icon" /> </li>
          <li><Image src={ourlimeIcon} className='icon' alt="Facebook icon" /> </li>
        </ul>

      </div>

        <p className='swap swap-mobile'>Cooperation, Communication, Teamwork and Commitment</p>
    </footer>
  )
}