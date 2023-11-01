import '../styles/navbar.css'

import Image from 'next/image'
import Link from 'next/link'

import { useWindowSize } from 'react-use'; //react package that checks the screen size of the device
import upTechLogo from '../public/images/uptech logo.png'
import menu from '../public/images/menu.svg'
export default function Navbar() {
  const { width } = useWindowSize();

  return (
    <header className="header">
        <div className="logo-wrapper">
        <Image className="uptech-logo" src={upTechLogo} alt="logo"/>
        </div>

        <nav className="navbar">
        <ul className="nav-items">
            <li className="nav-links"><Link href="/">Home</Link></li>
            <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
            <li className="nav-links"><Link href="/about">About us</Link></li>
            <li className="nav-links"><Link href="/">Products</Link></li>
            <li className="nav-links"><Link href="/contact">Contact us</Link></li>
        </ul>
        </nav>
        
        <Image className='menu-btn' src={menu} alt="menu"/>
    
  </header>
  )
}