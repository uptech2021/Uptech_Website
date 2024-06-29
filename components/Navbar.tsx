'use client'

import '../styles/navbar.css'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'

import dropdown from '../public/images/Vector 89.svg'
import menuBtn from '@/public/images/menu.svg'

export default function Navbar() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
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
        handleScroll(); // Call handleScroll initially to check if the navbar is in view on load

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [controls]);


    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const verticalVariants = {
        hidden: { opacity: 0 }, // Starts invisible
        visible: { opacity: 1 }, // Ends visible
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
                transition={{ duration: 0.5 }} // Adjust the duration as needed
            >
                <div className="logo-wrapper">
                    <Image
                        src='images/logo.svg'
                        alt="logo"
                        width={150} height={150}
                        priority={true}
                    />
                </div>
            </motion.div>

            <button className='nav-btn' onClick={toggleNav}>
                <Image
                    src={isNavVisible ? dropdown : menuBtn}
                    width={150} height={150}
                    alt="toggle nav"
                />
            </button>

            <motion.div
                ref={navRef}
                initial="hidden"
                animate={controls}
                variants={verticalVariants}
                transition={{ duration: 0.5 }} // Adjust the duration as needed
            >
            <nav className='navbar'>
                <ul className="nav-items">
                    <li className="nav-links"><Link href="/">Home</Link></li>
                    <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
                    <li className="nav-links"><Link href="/services">Services</Link></li>
                    <li className="nav-links"><Link href="/about">About us</Link></li>
                    <li className="nav-links"><Link href="/contact">Contact us</Link></li>
                </ul>
            </nav>
            </motion.div>

            <nav className={`dropdown ${isNavVisible ? 'show-dropdown' : ''}`}>
                <ul className="dropdown-menu">
                    <li className="nav-links"><Link href="/">Home</Link></li>
                    <li className="nav-links"><Link href="/objectives">Objectives</Link></li>
                    <li className="nav-links"><Link href="/services">Services</Link></li>
                    <li className="nav-links"><Link href="/about">About us</Link></li>
                    <li className="nav-links"><Link href="/contact">Contact us</Link></li>
                </ul>
            </nav>
        </header>
    );
}
