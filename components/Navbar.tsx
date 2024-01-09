'use client'

import '../styles/navbar.css'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {FaBars} from "react-icons/fa" 
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import upTechLogo from '../public/images/uptech logo.png'
import dropdown from '../public/images/Vector 89.svg'
import menuBtn from '@/public/images/menu.svg'
import { useWindowSize } from 'react-use'; //react package that checks the screen size of the device


export default function Navbar() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const { width } = useWindowSize();

    const [navRef, navInView] = useInView({triggerOnce: true, threshold: 0.1});
    
    const verticalVariants = {
        hidden: { y: '-100%', opacity: 0 }, // Starts above the screen and invisible
        visible: { y: 0, opacity: 1 },      // Ends at its normal position and visible
      };

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <header className="header">
            <motion.div
                ref={navRef}
                initial="hidden"
                animate={navInView ? "visible" : "hidden"}
                variants={verticalVariants}
                transition={{duration: 1}}>
            <div className="logo-wrapper">
                <Image
                    src={upTechLogo}
                    alt="logo"
                    priority={true}
                />
            </div>
            </motion.div>

            <button className='nav-btn' onClick={toggleNav}>
                <Image src={isNavVisible ?  dropdown : menuBtn} alt="close nav" />
            </button>

            {width >= 768 ? (
                <motion.div
                ref={navRef}
                initial="hidden"
                animate={navInView ? "visible" : "hidden"}
                variants={verticalVariants}
                transition={{duration: 1}}>
                <nav className='navbar'>
                    <ul className="nav-items">
                        <li className="nav-links"><Link href="/">Home</Link></li>
                        <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
                        <li className="nav-links"><Link href="/about">About us</Link></li>
                        <li className="nav-links"><Link href="/contact">Contact us</Link></li>
                    </ul>
                </nav>
                </motion.div>
            ) : (
                <nav className={`dropdown ${isNavVisible ? 'show-dropdown' : ''}`}>
                    <ul className="dropdown-menu">
                        <li className="nav-links"><Link href="/">Home</Link></li>
                        <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
                        <li className="nav-links"><Link href="/about">About us</Link></li>
                        <li className="nav-links"><Link href="/contact">Contact us</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
