'use client'
import Image from "next/image";
import rishi from '@/public/images/About Us/Rishii.png'
import aaron from '@/public/images/About Us/Aaron.png'
import '@/styles/about/team/team.css'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';
export default function Team() {

    const pathname = usePathname()
    return (
            <>
            <div className="container">
            <h2>OUR TEAM</h2>
     
        
                            <div className="wrapper">
                        <section className="profile">
                            <div className="name">
                            <p>Rishi Kowlessar</p>
                            </div>
                            <p>FOUNDER /CHAIRMAN/ CEO/MARKETING AND BRAND MANAGEMENT</p>
                            <div className="profile-img">
                                <Image src={rishi} alt = "Image of Rishi" />
                            </div>

                        </section>
                        <section className="profile">
                        <div className="name">
                            <p>Aaron hazzard</p>
                            </div>
                            <p>CO-FOUNDER/DEPUTY CHAIRMAN/SOFTWARE ENGINEERING DIRECTOR</p>
                            <div className="profile-img">
                            <Image src={aaron} alt = "Image of Aaron" />
                            </div>

                        </section>
                        </div>
                        <div className="wrapper">
                        <section className="profile">
                        <div className="name">
                            <p>ANGELO TELEMAQUE</p>
                            </div>
                            <p>CORPORATE COMMUNICATIONS</p>
                           

                        </section>
                        <section className="profile">
                        <div className="name">
                            <p>DANIEL MACKAY </p>
                            </div>
                            <p>APPLICATION DEVELOPMENT</p>
                            
                        </section>
                        <section className="profile">
                        <div className="name">
                            <p>NEOLA HERNANDEZ</p>
                            </div>
                            <p>GRAPHICS AND MULTIMEDIA DIRECTOR</p>
                           
                        </section>
                        </div>
                        <div className="wrapper">
                        <section className="profile">
                        <div className="name">
                            <p>JOSIAH JAMES</p>
                            </div>
                            <p>JUNIOR SOFTWARE ENGINEER</p>
                        
                        </section>
                        <section className="profile">
                        <div className="name">
                            <p>RAUSHAWN MITCHELL</p>
                            </div>
                            <p>JUNIOR SOFTWARE ENGINEER</p>
                            

                        </section>
                        <section className="profile">
                        <div className="name">
                            <p>KYLE NAGEE</p>
                            </div>
                            <p>JUNIOR SOFTWARE ENGINEER</p>
                            
                        </section>
                        </div>
                        </div>
                        </>
    )

}
