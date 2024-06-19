'use client'

import '../../styles/objectives/objectives.css'
import uptechLogo from '../../public/images/uptech logo.png'
import menu from '../../public/images/menu.svg'
import cyberSecurity from '../../public/images/Objectives/header images.svg'
import safety from '../../public/images/Objectives/user safety.svg'
import dataSecurity from '../../public/images/Objectives/data security.svg'
import privacyLock from '../../public/images/Objectives/Mask group.svg'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Image from 'next/image'
// import { useWindowSize } from 'react-use'; //react package that checks the screen size of the device
import Link from "next/link"

export default function Objectives(){

    // const { width } = useWindowSize();

    //Refs and inView states for each section
    const [cyberRef, cyberInView] = useInView({triggerOnce: true, threshold: 0.1});
    const [datasecurityRef, dataSecurityInView] = useInView({triggerOnce: true, threshold: 0.1});
    const [datasecurityImageRef, dataSecurityImageInView] = useInView({triggerOnce: true, threshold: 0.5});
    const [datasecurityInfoRef, dataSecurityInfoInView] = useInView({triggerOnce: true, threshold: 0.1});
    const [privacyRef, privacyInview] = useInView({triggerOnce: true, threshold: 0.1});
    const [privacyImageRef, privacyImageInview] = useInView({triggerOnce: true, threshold: 0.1});
    const [privacyInfoRef, privacyInfoInview] = useInView({triggerOnce: true, threshold: 0.1});
    const [usersafetyRef, userSafetyInView] = useInView({triggerOnce: true, threshold: 0.1});
    const [usersafetyImageRef, userSafetyImageInView] = useInView({triggerOnce: true, threshold: 0.1});
    const [usersafetyInfoRef, userSafetyInfoInView] = useInView({triggerOnce: true, threshold: 0.1});
    const [objectivesRef, objectivesInView] = useInView({triggerOnce: true, threshold: 0.1});



    const verticalVariants = {
        hidden: { y: '-100%', opacity: 0 }, // Starts above the screen and invisible
        visible: { y: 0, opacity: 1 },      // Ends at its normal position and visible
      };

      const fadeVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
      };
      


    return(
        <div className='objectives-main-container'>
            <div className="outer-layer">
                <div className="objectives-first-container">
                    <div className="objectives-section">
                        <Navbar/>
                        
                        <motion.div
                            ref={objectivesRef}
                            initial="hidden"
                            animate={objectivesInView ? "visible" : "hidden"}
                            variants={verticalVariants}
                            transition={{duration: 1}}>
                                <header className="objectives-header">
                                    <h1>Objectives</h1>
                                </header>
                        </motion.div>
                        
                        <motion.div
                            ref={cyberRef}
                            initial="hidden"
                            animate={cyberInView ? "visible" : "hidden"}
                            variants={fadeVariants}
                            transition={{duration: 1, ease: "easeInOut"}}>
                        <section className="objectives-content">
                            <Image src={cyberSecurity} className="cybersecurity-img" alt="Cyber Security Image"/>
                        </section>
                        </motion.div>
                    </div>
                </div>
                <main className='objectives-second-container'>
                        <section className='objectives-info-section'>
                            <section className="usersafety-content">
                            <motion.div
                            ref={usersafetyRef}
                            initial="hidden"
                            animate={userSafetyInView ? "visible" : "hidden"}
                            variants={verticalVariants}
                            transition={{duration: 1}}>  
                                <header className="usersafety-header">
                                    <h2>USER SAFETY</h2>
                                </header>
                            </motion.div>
                            <motion.div
                            ref={usersafetyImageRef}
                            initial="hidden"
                            animate={userSafetyImageInView ? "visible" : "hidden"}
                            variants={verticalVariants}
                            transition={{duration: 1}}>  
                                    <div className="usersafety-img-container">
                                        <Image src={safety} className="safety-img" alt="Safety Image"/>
                                    </div>
                                </motion.div>
                                <motion.div
                            ref={usersafetyInfoRef}
                            initial="hidden"
                            animate={userSafetyInfoInView ? "visible" : "hidden"}
                            variants={verticalVariants}
                            transition={{duration: 1}}>  
                                    <p>Implementation of algorithms that can recognize sensitive phrases and words as well as duplicate accounts would improve user&apos;s safety. By doing this, we can defend our users and communities from online criminal activities, like cyberbullying, harassment, cyber-stalking etc. Our medium to long term objectives entails, creating a unique feature that users can employ in an emergency.</p>
                                </motion.div>
                            </section>
                            <section className="privacy-content">
                            <motion.div
                            ref={privacyRef}
                            initial="hidden"
                            animate={privacyInview ? "visible" : "hidden"}
                            variants={verticalVariants}
                            transition={{duration: 1}}>    
                            <header className="privacy-header">
                                <h2>PRIVACY</h2>
                            </header>
                            </motion.div>
                            <motion.div
                            ref={privacyImageRef}
                            initial="hidden"
                            animate={privacyImageInview ? "visible" : "hidden"}
                            variants={verticalVariants}
                            transition={{duration: 1}}>   
                                <div className="privacy-img-container">
                                    <Image src={privacyLock} className="privacy-img" alt="Privacy Image"/>
                                </div>
                            </motion.div>
                            <motion.div
                            ref={privacyInfoRef}
                            initial="hidden"
                            animate={privacyInfoInview ? "visible" : "hidden"}
                            variants={verticalVariants}
                            transition={{duration: 1}}>   
                                <p>On the Ourlime user profile page, there would be features designed specifically for the user with privacy settings, allowing the user to choose their level of privacy. These specific features would incorporate a &quot;lock code&quot; that only the user would know.</p>
                            </motion.div>
                            </section>
                            <section className="datasecurity-content">
                                <motion.div
                                ref={datasecurityRef}
                                initial="hidden"
                                animate={dataSecurityInView ? "visible" : "hidden"}
                                variants={verticalVariants}
                                transition={{duration: 1}}>
                                    <header className="datasecurity-header">
                                        <h2>DATA SECURITY</h2>
                                    </header>
                                </motion.div>
                                <motion.div
                                ref={datasecurityImageRef}
                                initial="hidden"
                                animate={dataSecurityImageInView ? "visible" : "hidden"}
                                variants={verticalVariants}
                                transition={{duration: 1}}>
                                    <div className="datasecurity-img-container">
                                        <Image src={dataSecurity} className="datasecurity-img" alt="Data Security Image"/>
                                    </div>    
                                </motion.div>  
                                <motion.div
                                ref={datasecurityInfoRef}
                                initial="hidden"
                                animate={dataSecurityInfoInView ? "visible" : "hidden"}
                                variants={verticalVariants}
                                transition={{duration: 1}}>  
                                        <p>Data such as names, addresses, emails, contacts, and date of births would not be used for marketing purposes and would not be sold for profit to any third-party and more is discussed in the Terms and Condition.</p>
                                </motion.div>
                            </section>
                        </section>
                </main>
            </div>

            <Footer/>
        </div>
    )
} 