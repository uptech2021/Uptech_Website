'use client'

import '../../styles/objectives/objectives.css'
import uptechLogo from '../../public/images/uptech logo.png'
import menu from '../../public/images/menu.svg'
import cyberSecurity from '../../public/images/Objectives/header images.png'
import safety from '../../public/images/Objectives/user safety.png'
import dataSecurity from '../../public/images/Objectives/data security.png'
import privacyLock from '../../public/images/Objectives/Mask group.png'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import Image from 'next/image'
// import { useWindowSize } from 'react-use'; //react package that checks the screen size of the device
import Link from "next/link"

export default function Objectives(){

    // const { width } = useWindowSize();

    return(
        <div className='objectives-main-container'>
            <div className="outer-layer">
                <div className="objectives-first-container">
                    <div className="objectives-section">
                        <Navbar/>
                        
                        <header className="objectives-header">
                            <h1>Objectives</h1>
                        </header>
                        
                        <section className="objectives-content">
                            <Image src={cyberSecurity} className="cybersecurity-img" alt="Cyber Security Image"/>
                        </section>
                    </div>
                </div>
                <main className='objectives-second-container'>
                        <section className='objectives-info-section'>
                            <section className="usersafety-content">
                                <header className="usersafety-header">
                                    <h2>USER SAFETY</h2>
                                </header>
                                    <div className="usersafety-img-container">
                                        <Image src={safety} className="safety-img" alt="Safety Image"/>
                                    </div>
                                    <p>Implementation of algorithms that can recognize sensitive phrases and words as well as duplicate accounts would improve user&apos;s safety. By doing this, we can defend our users and communities from online criminal activities, like cyberbullying, harassment, cyber-stalking etc. Our medium to long term objectives entails, creating a unique feature that users can employ in an emergency.</p>
                            </section>
                            <section className="privacy-content">
                            <header className="privacy-header">
                                <h2>PRIVACY</h2>
                            </header>
                                <div className="privacy-img-container">
                                    <Image src={privacyLock} className="privacy-img" alt="Privacy Image"/>
                                </div>
                                <p>On the Ourlime user profile page, there would be features designed specifically for the user with privacy settings, allowing the user to choose their level of privacy. These specific features would incorporate a &quot;lock code&quot; that only the user would know.</p>
                            </section>
                            <section className="datasecurity-content">
                                <header className="datasecurity-header">
                                    <h2>DATA SECURITY</h2>
                                </header>
                                    <div className="datasecurity-img-container">
                                        <Image src={dataSecurity} className="datasecurity-img" alt="Data Security Image"/>
                                    </div>    
                                        <p>Data such as names, addresses, emails, contacts, and date of births would not be used for marketing purposes and would not be sold for profit to any third-party and more is discussed in the Terms and Condition.</p>
                            </section>
                        </section>
                </main>
            </div>

            <Footer/>
        </div>
    )
} 