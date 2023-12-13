'use client'

import '../styles/navbar.css'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {FaBars, FaTimes} from "react-icons/fa" 

import upTechLogo from '../public/images/uptech logo.png'
import menu from '../public/images/menu.svg'
import React from 'react'
export default function Navbar() {

  const navRef = useRef<HTMLElement>(null);

  const showNavbar = () =>{
    if(navRef.current){
    navRef.current.classList.toggle("responsive_nav");
  }
  };

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

        <nav className="navbar" ref={navRef}>
          <ul className="nav-items">
              <li className="nav-links"><Link href="/">Home</Link></li>
              <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
              <li className="nav-links"><Link href="/about">About us</Link></li>
              <li className="nav-links"><Link href="/contact">Contact us</Link></li>
              <li><button className='nav-btn nav-close-btn' onClick={showNavbar}><FaTimes/></button></li>
          </ul>
        </nav>
        
        {/* <Image className='menu-btn' src={menu} alt="menu"/> */}
        <button className='nav-btn' onClick={showNavbar}><FaBars/></button>
  </header>
  )
}