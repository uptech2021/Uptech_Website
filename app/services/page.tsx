'use client'

import Image from "next/image";
import topSer from '@/public/images/Services/topService.png'
import serv1 from '@/public/images/Services/service1.png'
import serv2 from '@/public/images/Services/service2.png'
import serv3 from '@/public/images/Services/service3.png'
import serv4 from '@/public/images/Services/service4.png'
import "@/styles/services/service.css"
import React from "react";
import { useEffect, useState } from 'react';
import PcServices from '@/components/PcServices';
import Navbar from "@/components/Navbar";


export default function Services() {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        checkScreenSize();


        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    return (
        <>
            <div className="services-main-container">
                <div className="outer-layer">
                    <section className="top-container">
                        <header>
                            <Navbar />
                        </header>
                        <h1>UPTECH SERVICES</h1>
                        <div className="wrapper">
                            <p>Yes! <br /> UpTech is offering<br /> services<br /></p>
                            <div className="serviceTop">
                                <Image 
                                    src='/images/Services/topService.svg' 
                                    alt="topServ" 
                                    width={150} height={150}
                                    className="topImg" 
                                />
                            </div>
                        </div>
                    </section>

                    {isLargeScreen ? (
                        <PcServices />
                    ) : (<main className="main-container">
                        <p>Transform your business with our innovative solutions and expert services, tailored to propel your company towards success.</p>
                        <div className="service-container">
                            <h2>ADMINISTRATIVE SERVICE</h2>
                            <div className="blue-box">
                                <div className="service-img">
                                    <Image src={serv1} alt="serv1" className="serv-img" />
                                </div>
                                <p>Boost productivity with an administrator who keeps everything organized and on track.</p>
                                <ul>
                                    <li>PowerPoint presentation</li>
                                    <li>Business planning</li>
                                    <li>Proofreading</li>
                                    <li>Advertisement reading</li>
                                    <li>And Much More <br /> Just for you!</li>
                                </ul>
                            </div>
                        </div>
                        <div className="service-container">
                            <h2>MARKETING SERVICES</h2>
                            <div className="blue-box">
                                <div className="service-img">
                                    <Image src={serv2} alt="serv2" className="serv-img" />
                                </div>
                                <p>Drive growth with a marketer who transforms insights into impactful strategies</p>
                                <ul>
                                    <li>Social Media</li>
                                    <li>Event planning and marketing</li>
                                    <li>Marketing planning</li>
                                    <li>Brand Marketing</li>
                                    <li>And Much More <br /> Just for you! </li>
                                </ul>
                            </div>
                        </div>

                        <div className="service-container">
                            <h2>DEVELOPMENT SERVICES</h2>
                            <div className="blue-box">
                                <div className="service-img">
                                    <Image src={serv3} alt="serv3" className="serv-img" />
                                </div>
                                <p>Unlock innovation and efficiency with a tech developer who turns ideas into cutting-edge solutions.</p>
                                <ul>
                                    <li>Web development and deployment</li>
                                    <li>Mobile app development and deployment</li>
                                </ul>
                            </div>
                        </div>
                        <div className="service-container">
                            <h2>GRAPHIC SERVICES</h2>
                            <div className="blue-box">
                                <div className="service-img">
                                    <Image src={serv4} alt="serv4" className="serv-img" />
                                </div>
                                <p>Hiring a graphic designer can enhance your brand&apos;s visual identity and effectiveness, leading to better engagement and success.</p>
                                <ul>
                                    <li>UI/UX Designing.</li>
                                    <li>Company Branding.</li>
                                    <li>Company Branding.</li>
                                    <li>And Much More designs <br />Just for you!</li>
                                </ul>
                            </div>
                        </div>
                    </main>)}
                </div>
            </div>
        </>

    )
}