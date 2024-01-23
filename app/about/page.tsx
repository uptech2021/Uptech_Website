import Image from "next/image";
import airBrush from '@/public/images/About Us/aboutUsImg.svg'
import "@/styles/about/about.css"
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import Team from "@/components/Team";

export default function About() {
    return (
        <>
            <div className="about-main-container">
                <div className="outer-layer">
                    <section className="about-container">
                        <header>
                            <Navbar />
                        </header>
                        <div className="wrapper">
                            <h1>About Us</h1>


                            <div className="about-img">
                                <Image src={airBrush} alt="air" className="air-img" />
                            </div>

                        </div>
                    </section>
                    <main className="second-main-container">
                            <Team/>
                    <section className="info">
                        <div className="wrapper">
                        <h2>founder&apos;s message</h2>

                        <p>In 2014, I began Ourlime with a focus on sustainable relationships and dating. Facing challenges and an initial setback in 2016, I revisited and revamped the concept. After seven dedicated years, Ourlime is now a reality, reflecting my enduring vision. I hope users see its potential as a safe space for content and community management in their daily lives.</p>
                        </div>

                        <div className="wrapper">
                        <h2>Benefits of using the Ourlime Community Network</h2>

                        <p>Being part of a vibrant community enhances mental well-being by fostering a sense of belonging and mutual support. In such communities, everyone, including the vulnerable, becomes interactive and attuned to each other&apos;s needs. Joining the Ourlime Community Network offers exclusive content, ensures member privacy, provides direct feedback avenues, encourages innovative community strategies, and promotes mutual learning and conflict resolution.</p>
                        </div>
                        <div className="wrapper">
                        <h2>our story</h2>

                        <p>Ourlime, founded by Rishi Kowlessar, emerged as a response to the gaps in contemporary social media, which often compromised user data and fostered unproductivity. Conceived after thorough brainstorming, Ourlime was introduced by October 2021 as a Private Communities Network. Rishi identified the need for a platform valuing user safety, data security, and genuine content control. Goals included promoting sustainable relationships, improved communication, robust networking, and tools to boost productivity. Launched online in January 2022 and on the Google Play store by March, Ourlime required significant refinements to match Rishi&apos;s vision. Funding challenges arose, but Rishi remained undeterred in his mission.</p>
                        </div>
                        <div className="wrapper">
                        <h2>the way foward</h2>

                        <p>Ourlime is preparing for a local launch in Trinidad and Tobago, aiming for broad accessibility via Google Play Store, Apple Store, and the web. Our focus is on delivering a well-researched, continually evolving product. Plans include introducing the Ourlime Messenger App, 3D capabilities, and AI integrations to enhance user experience and address key issues. A dedicated team is being formed to drive innovation, with ongoing efforts to secure funding for network expansion while ensuring Ourlime&apos;s independence from third parties. Our pioneering &quot;Ourlime Private Communities Network&quot; seeks to meet user needs and uphold unwavering integrity.</p>
                        </div>
                        </section>
                    </main>
                </div>
                <Footer />
            </div>


        </>

    )
}
