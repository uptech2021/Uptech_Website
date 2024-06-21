'use client'

import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import '../../styles/objectives/objectives.css'
import cyberSecurity from '../../public/images/Objectives/header images.svg'
import safety from '../../public/images/Objectives/user safety.svg'
import dataSecurity from '../../public/images/Objectives/data security.svg'
import privacyLock from '../../public/images/Objectives/Mask group.svg'

import { motion } from 'framer-motion';

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from "next/link"

export default function Objectives() {
    const objectivesControls = useAnimation();
    const cyberControls = useAnimation();
    const dataSecurityControls = useAnimation();
    const privacyControls = useAnimation();
    const userSafetyControls = useAnimation();

  useEffect(() => {
    const handleScroll = (ev: Event) => {
      const checkInView = (ref: HTMLElement | null) => {
        if (ref) {
          const top = ref.getBoundingClientRect().top;
          return top < window.innerHeight && top > 0;
        }
        return false;
      };

      const animateIfInView = (ref: HTMLElement | null, controls: any) => {
        if (ref) {
          const top = ref.getBoundingClientRect().top;
          if (top < window.innerHeight && top > 0) {
            controls.start("visible");
          }
        }
      };

      animateIfInView(
        document.querySelector(".objectives-header"),
        objectivesControls
      );
      animateIfInView(
        document.querySelector(".cybersecurity-img"),
        cyberControls
      );
      animateIfInView(
        document.querySelector(".datasecurity-img"),
        dataSecurityControls
      );
      animateIfInView(document.querySelector(".privacy-img"), privacyControls);
      animateIfInView(
        document.querySelector(".safety-img"),
        userSafetyControls
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(new Event("scroll"));

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    const verticalVariants = {
        hidden: { y: '-100%', opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <div className='objectives-main-container'>
            <div className="outer-layer">
                <div className="objectives-first-container">
                    <div className="objectives-section">
                        <Navbar />

                       
                            <header className="objectives-header">
                            <motion.div
                            initial="hidden"
                            animate={objectivesControls}
                            variants={verticalVariants}
                            transition={{ duration: 1 }}>
                                <h1>Objectives</h1>
                                </motion.div>
                            </header>

                        <motion.div
                            initial="hidden"
                            animate={cyberControls}
                            variants={fadeVariants}
                            transition={{ duration: 1, ease: "easeInOut" }}>
                            <section className="objectives-content">
                                <Image src={cyberSecurity} className="cybersecurity-img" alt="Cyber Security Image" />
                            </section>
                        </motion.div>
                    </div>
                </div>
                <main className='objectives-second-container'>
                    <section className='objectives-info-section'>
                        <section className="usersafety-content">
                            <motion.div
                                initial="hidden"
                                animate={userSafetyControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <header className="usersafety-header">
                                    <h2>USER SAFETY</h2>
                                </header>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate={userSafetyControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <div className="usersafety-img-container">
                                    <Image src={safety} className="safety-img" alt="Safety Image" />
                                </div>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate={userSafetyControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <p>Implementation of algorithms that can recognize sensitive phrases and words as well as duplicate accounts would improve user&apos;s safety. By doing this, we can defend our users and communities from online criminal activities, like cyberbullying, harassment, cyber-stalking etc. Our medium to long term objectives entails, creating a unique feature that users can employ in an emergency.</p>
                            </motion.div>
                        </section>
                        <section className="privacy-content">
                            <motion.div
                                initial="hidden"
                                animate={privacyControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <header className="privacy-header">
                                    <h2>PRIVACY</h2>
                                </header>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate={privacyControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <div className="privacy-img-container">
                                    <Image src={privacyLock} className="privacy-img" alt="Privacy Image" />
                                </div>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate={privacyControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <p>On the Ourlime user profile page, there would be features designed specifically for the user with privacy settings, allowing the user to choose their level of privacy. These specific features would incorporate a &quot;lock code&quot; that only the user would know.</p>
                            </motion.div>
                        </section>
                        <section className="datasecurity-content">
                            <motion.div
                                initial="hidden"
                                animate={dataSecurityControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <header className="datasecurity-header">
                                    <h2>DATA SECURITY</h2>
                                </header>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate={dataSecurityControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <div className="datasecurity-img-container">
                                    <Image src={dataSecurity} className="datasecurity-img" alt="Data Security Image" />
                                </div>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate={dataSecurityControls}
                                variants={verticalVariants}
                                transition={{ duration: 1 }}>
                                <p>Data such as names, addresses, emails, contacts, and date of births would not be used for marketing purposes and would not be sold for profit to any third-party and more is discussed in the Terms and Condition.</p>
                            </motion.div>
                        </section>
                    </section>
                </main>
            </div>

        </div>
    )
}
function handleScroll(this: Window, ev: Event) {
    throw new Error('Function not implemented.');
}

