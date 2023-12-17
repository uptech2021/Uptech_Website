'use client'

import '../styles/navbar.css'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useWindowSize } from 'react-use'; //react package that checks the screen size of the device

import {FaBars, FaTimes} from "react-icons/fa" 

import upTechLogo from '../public/images/uptech logo.png'
import dropdown from '../public/images/Vector 89.svg'
import React from 'react'

export default function Navbar() {
    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <header className="header">
            <div className="logo-wrapper">
                <Image
                    src={upTechLogo}
                    alt="logo"
                    priority={true}
                    layout="responsive"
                />
            </div>

            <button className='nav-btn' onClick={toggleNav}>
                {isNavVisible ? <Image src={dropdown} alt="close nav" layout="responsive" /> : <FaBars />}
            </button>

            <nav className={`navbar ${isNavVisible ? 'show' : ''}`}>
                <ul className="nav-items">
                    <li className="nav-links"><Link href="/">Home</Link></li>
                    <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
                    <li className="nav-links"><Link href="/about">About us</Link></li>
                    <li className="nav-links"><Link href="/contact">Contact us</Link></li>
                </ul>
            </nav>

            <nav className={`dropdown ${isNavVisible ? 'show-dropdown' : ''}`}>
                <ul className="dropdown-menu">
                    <header className='top-line'>
                        <h2 className="nav-head">NavBar</h2>
                        <button className='nav-close-btn' onClick={toggleNav}>
                        </button>
                    </header>
                    <li className="nav-links"><Link href="/">Home</Link></li>
                    <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
                    <li className="nav-links"><Link href="/about">About us</Link></li>
                    <li className="nav-links"><Link href="/contact">Contact us</Link></li>
                </ul>
            </nav>
        </header>
    );
}
