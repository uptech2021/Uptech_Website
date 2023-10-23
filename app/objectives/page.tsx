import '../../styles/objectives/objectives.css'
import uptechLogo from '../../public/images/uptech logo.png'
// import menu from '../../public/images/menu.svg'
import cyberSecurity from '../../public/images/Objectives/header images.png'

import Image from 'next/image'
import Link from "next/link"

export default function Objectives(){
    return(
        <div className="objectives-first-container">
            <div className="outer-layer">
                <div className="inner-layer">
                    <header className="navbar">
                        <Image src={uptechLogo} className ="uptech-logo" alt="Uptech Logo"/>

                        {/* <Image src={menu} className="menu-dropdown" alt="Navigation Sandwich Menu"/> */}
                    </header>
                    <header className="objectives-header">
                        <h1>Objectives</h1>
                    </header>
                    <section className="objective-content">
                        <Image src={cyberSecurity} className="cybersecurity-img" alt="Cyber Security Image"/>
                    </section>
                </div>
            </div>
            <div className='objectives-second-container'>
                <div className='inner-layer'></div>
            </div>
        </div>
    )
} 