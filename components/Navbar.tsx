import '../styles/navbar.css'

import Image from 'next/image'
import Link from 'next/link'

import upTechLogo from '../public/images/uptech logo.png'
import menu from '../public/images/menu.svg'
export default function Navbar() {

  return (
    <header className="header">
        <div className="logo-wrapper">
        <Image 
          className="uptech-logo" 
          src={upTechLogo} 
          alt="logo"
          priority={true}
          />
        </div>

        <nav className="navbar">
        <ul className="nav-items">
            <li className="nav-links"><Link href="/">Home</Link></li>
            <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
            <li className="nav-links"><Link href="/about">About us</Link></li>
            <li className="nav-links"><Link href="/contact">Contact us</Link></li>
        </ul>
        </nav>
        
        <Image className='menu-btn' src={menu} alt="menu"/>
    
  </header>
  )
}