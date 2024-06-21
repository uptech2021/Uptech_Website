'use client'

import '../styles/navbar.css'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useWindowSize } from 'react-use'

import upTechLogo from '../public/images/uptech logo.png'
import dropdown from '../public/images/Vector 89.svg'
import menuBtn from '@/public/images/menu.svg'

export default function Navbar() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const { width } = useWindowSize();
    const controls = useAnimation();
    const navRef = useRef(null);

    useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const top = (navRef.current as HTMLElement).getBoundingClientRect().top;
        if (top < window.innerHeight && top > 0) {
          controls.start("visible");
        }
      }
    };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [controls]);

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
                animate={controls}
                variants={verticalVariants}
                transition={{ duration: 1 }}
            >
                <div className="logo-wrapper">
                    <Image
                        src={upTechLogo}
                        alt="logo"
                        priority={true}
                    />
                </div>
            </motion.div>

            <button className='nav-btn' onClick={toggleNav}>
                <Image src={isNavVisible ? dropdown : menuBtn} alt="toggle nav" />
            </button>

            {width >= 768 ? (
                <nav className='navbar'>
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={verticalVariants}
                        transition={{ duration: 1 }}
                    >
                        <ul className="nav-items">
                            <li className="nav-links"><Link href="/">Home</Link></li>
                            <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
                            <li className="nav-links"><Link href="/services">Services</Link></li>
                            <li className="nav-links"><Link href="/about">About us</Link></li>
                            <li className="nav-links"><Link href="/contact">Contact us</Link></li>
                        </ul>
                    </motion.div>
                </nav>
            ) : (
                <nav className={`dropdown ${isNavVisible ? 'show-dropdown' : ''}`}>
                    <ul className="dropdown-menu">
                        <li className="nav-links"><Link href="/">Home</Link></li>
                        <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
                        <li className="nav-links"><Link href="/services">Services</Link></li>
                        <li className="nav-links"><Link href="/about">About us</Link></li>
                        <li className="nav-links"><Link href="/contact">Contact us</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
