'use client'

import Image from "next/image";
import airBrush from '@/public/images/About Us/aboutUsImg.svg'
import "@/styles/about/about.css"
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import Team from "@/components/Team";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {

        //Refs and inView states for each section
        const [aboutRef, aboutInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [aboutImageRef, aboutImageInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [founderRef, founderInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [founderInfoRef, founderInfoInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [benefitsRef, benefitsInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [benefitsInfoRef, benefitsInfoInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [storyRef, storyInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [storyInfoRef, storyInfoInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [forwardRef, forwardInView] = useInView({triggerOnce: true, threshold: 0.1});
        const [forwardInfoRef, forwardInfoInView] = useInView({triggerOnce: true, threshold: 0.1});



    
    
        const verticalVariants = {
            hidden: { y: '-100%', color: "#32CD32", opacity: 0 },  // Starts above the screen and invisible
            visible: { y: 0, color: "#000", opacity: 1 },    // Ends at its normal position and visible
        };
    
        const leftMidVariants = {
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 }, // Move to the left
            };

            const rightMidVariants = {
                hidden: { opacity: 0, x: 0 },
                visible: { opacity: 1, x: 100 }, // Move to the right
              };
    
        const fadeVariants = {
            hidden: {opacity: 0},
            visible: {opacity: 1},
          };
    
    return (
        <>
            <div className="about-main-container">
                <div className="outer-layer">
                <section className="about-container">
                        <header>
                            <Navbar />
                        </header>
                        <div className="wrapper">
                        <motion.div
                            ref={aboutRef}
                            initial="hidden"
                            animate={aboutInView ? "visible" : "hidden"}
                            variants={verticalVariants}
                            transition={{duration: 1, ease: "easeInOut"}}>
                            <h1>About Us</h1>
                        </motion.div>

                           
                            <div className="about-img">
                            <motion.div
                            ref={aboutImageRef}
                            initial="hidden"
                            animate={aboutImageInView ? "visible" : "hidden"}
                            variants={fadeVariants}
                            transition={{duration: 3, ease: "easeInOut"}}>
                                <Image src={airBrush} alt="air" className="air-img" />
                                </motion.div>
                            </div>
                            

                        </div>
                    </section>
                    <main className="second-main-container">
                            <Team/>
                    <section className="info">
                        <div className="wrapper">
                        <motion.div
                        ref={founderRef}
                        initial="hidden"
                        animate={founderInView ? "visible" : "hidden"}
                        variants={leftMidVariants}
                        transition={{duration: 2}}
                        >
                        <h2>founder&apos;s message</h2>
                        </motion.div>
                        <motion.div
                        ref={founderInfoRef}
                        initial="hidden"
                        animate={founderInfoInView ? "visible" : "hidden"}
                        variants={rightMidVariants}
                        transition={{duration: 2}}
                        >
                        <p>In 2014, I began Ourlime with a focus on sustainable relationships and dating. Facing challenges and an initial setback in 2016, I revisited and revamped the concept. After seven dedicated years, Ourlime is now a reality, reflecting my enduring vision. I hope users see its potential as a safe space for content and community management in their daily lives.</p>
                        </motion.div>
                        </div>

                        <div className="wrapper">
                        <motion.div
                        ref={benefitsRef}
                        initial="hidden"
                        animate={benefitsInView ? "visible" : "hidden"}
                        variants={leftMidVariants}
                        transition={{duration: 2}}
                        >
                        <h2>Benefits of using the Ourlime Community Network</h2>
                        </motion.div>
                        <motion.div
                        ref={benefitsInfoRef}
                        initial="hidden"
                        animate={benefitsInfoInView ? "visible" : "hidden"}
                        variants={rightMidVariants}
                        transition={{duration: 2}}
                        >
                        <p>Being part of a vibrant community enhances mental well-being by fostering a sense of belonging and mutual support. In such communities, everyone, including the vulnerable, becomes interactive and attuned to each other&apos;s needs. Joining the Ourlime Community Network offers exclusive content, ensures member privacy, provides direct feedback avenues, encourages innovative community strategies, and promotes mutual learning and conflict resolution.</p>
                       </motion.div>
                        </div>
                        <div className="wrapper">
                        <motion.div
                        ref={storyRef}
                        initial="hidden"
                        animate={storyInView ? "visible" : "hidden"}
                        variants={leftMidVariants}
                        transition={{duration: 2}}
                        >
                        <h2>our story</h2>
                        </motion.div>
                        <motion.div
                        ref={storyInfoRef}
                        initial="hidden"
                        animate={storyInfoInView ? "visible" : "hidden"}
                        variants={rightMidVariants}
                        transition={{duration: 2}}
                        >
                        <p>Ourlime, founded by Rishi Kowlessar, emerged as a response to the gaps in contemporary social media, which often compromised user data and fostered unproductivity. Conceived after thorough brainstorming, Ourlime was introduced by October 2021 as a Private Communities Network. Rishi identified the need for a platform valuing user safety, data security, and genuine content control. Goals included promoting sustainable relationships, improved communication, robust networking, and tools to boost productivity. Launched online in January 2022 and on the Google Play store by March, Ourlime required significant refinements to match Rishi&apos;s vision. Funding challenges arose, but Rishi remained undeterred in his mission.</p>
                        </motion.div>
                        </div>
                        <div className="wrapper">
                        <motion.div
                        ref={forwardRef}
                        initial="hidden"
                        animate={forwardInView ? "visible" : "hidden"}
                        variants={leftMidVariants}
                        transition={{duration: 2}}
                        >    
                        <h2>the way foward</h2>
                        </motion.div>
                        <motion.div
                        ref={forwardInfoRef}
                        initial="hidden"
                        animate={forwardInfoInView ? "visible" : "hidden"}
                        variants={rightMidVariants}
                        transition={{duration: 2}}
                        >
                        <p>Ourlime is preparing for a local launch in Trinidad and Tobago, aiming for broad accessibility via Google Play Store, Apple Store, and the web. Our focus is on delivering a well-researched, continually evolving product. Plans include introducing the Ourlime Messenger App, 3D capabilities, and AI integrations to enhance user experience and address key issues. A dedicated team is being formed to drive innovation, with ongoing efforts to secure funding for network expansion while ensuring Ourlime&apos;s independence from third parties. Our pioneering &quot;Ourlime Private Communities Network&quot; seeks to meet user needs and uphold unwavering integrity.</p>
                        </motion.div>
                        </div>
                        </section>
                    </main>
                </div>
                <Footer />
            </div>


        </>

    )
}
