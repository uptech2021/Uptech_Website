'use client'

import '../styles/home/home.css'

import aaron_mobile_view from '../public/images/aaron_mobile_view.svg'
import aaron_pc_view from '../public/images/aaron_pc_view.png'
import elearning_mobile_view from '../public/images/elearning_mobile_view.svg'
import elearning_pc_view from '../public/images/elearning_pc_view.png'
import landingImage from '../public/images/landingImage.svg'
import boxes_mobile_view from '../public/images/boxes_mobile_view.svg'
import boxes_pc_view from '../public/images/boxes_pc_view.png'
import projectManagement_mobile_view from '../public/images/projectManagement_mobile_view.svg'
import projectManagement_pc_view from '../public/images/projectManagement_pc_view.png'
import privacy from '../public/images/privacy.svg'
import userSafety from '../public/images/userSafety.svg'
import dataSecurity from '../public/images/dataSecurity.svg'
import productsImage from '../public/images/manHoldingPhone.svg'
import aboutUsImage from '../public/images/aboutUsImage.svg'

import dots from '../public/images/dots.png'

import Navbar from '@/components/Navbar'

import Image from 'next/image'
import { useWindowSize } from 'react-use'; //react package that checks the screen size of the device
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import React from 'react'

export default function Home() {

  const { width } = useWindowSize();

  const [welcomeRef, welcomeInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [educationRef, educationInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [educationImgRef, educationImgInView] = useInView({ triggerOnce: true, threshold: 0.01 });
  const [projectRef, projectInView] = useInView({ triggerOnce: true, threshold: 0.01 });
  const [projectImgRef, projectImgInView] = useInView({ triggerOnce: true, threshold: 0.01 });
  const [marketRef, marketInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [marketImgRef, marketImgInView] = useInView({ triggerOnce: true, threshold: 0.01 });
  const [objectivesRef, objectivesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [safetyRef, safetyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [privacyRef, privacyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [securityRef, securityInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ourlimeRef, ourlimeInView] = useInView({ triggerOnce: true, threshold: 0.1 });





  const rightVariants = {
    hidden: { x: '100%', opacity: 0 }, // Start from the right and hidden
    visible: { x: 0, opacity: 1 }      // End at the original position and visible
  };

  const leftVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const belowVariants = {
    hidden: { x: -100, y: 100, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 },      // Ends at its normal position and visible
  };

  const rightBelowVariants = {
    hidden: { x: 100, y: 100, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 }
  }


  return (
    <div className="home-main-container">

      <div className="outer-layer">

        <section className="welcome-section">
          <Navbar />

          <div className="call-to-action">

            <div className="welcome-container">
              <motion.div
                ref={welcomeRef}
                initial="hidden"
                animate={welcomeInView ? "visible" : "hidden"}
                variants={rightVariants}
                transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
              >
                <h1>Welcome</h1>

                <p>To UPTECH Incorp. Ltd.</p>
              </motion.div>
            </div>

            <div className="image-wrapper">
              <motion.div
                ref={ourlimeRef}
                initial="hidden"
                animate={ourlimeInView ? "visible" : "hidden"}
                variants={belowVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }} // Adjust the duration and easing
              >
                <Image
                  src={landingImage}
                  className="call-to-action-img"
                  alt="Guy Holding His phone with the Ourlime logo behind him"
                  quality={100}
                />
              </motion.div>
            </div>

          </div>

        </section>

        <main className="main-section">
          <section className='features'>

            <div className="features-container">
              <h2>FEATURES</h2>

              <p>&quot;Ourlime&quot; aim&apos;s to provide our users with not only the features they have come to expect from a social media platform but also introduce concepts that we think will enhance our users.</p>

              <div className="dots-wrapper">
                <Image
                  src={dots}
                  className="dots-img"
                  alt="image of dots"
                />
              </div>
            </div>

            <div className="education-container">
              {width >= 768 ? (
                <>
                  <div className="image-wrapper">
                    <motion.div
                      ref={educationImgRef}
                      initial="hidden"
                      animate={educationImgInView ? "visible" : "hidden"}
                      variants={belowVariants}
                      transition={{ duration: 0.5, ease: "easeInOut" }} // Adjust the duration and easing
                    >
                      <Image
                        src={elearning_mobile_view}
                        className='elearning-img'
                        alt="elearning"
                        quality={100}
                      />
                    </motion.div>
                  </div>

                  <div className="information">
                    <motion.div
                      ref={educationRef}
                      initial="hidden"
                      animate={educationInView ? "visible" : "hidden"}
                      variants={rightVariants}
                      transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
                    >
                      <h3>EDUCATION</h3>
                      <p>Virtual Library, <br />Blogs, etc.</p>
                    </motion.div>
                  </div>
                </>
              ) : (
                <>
                  <h3>EDUCATION</h3>

                  <div className="image-wrapper">
                    <Image
                      src={elearning_mobile_view}
                      className='elearning-img'
                      alt="elearning"
                      quality={100}
                    />
                  </div>

                  <p>Virtual Library, <br />Blogs, etc.</p>
                </>
              )}


            </div>

            <div className="dots-wrapper">
              <Image
                src={dots}
                className="dots-img"
                alt="image of dots"


              />
            </div>

            <div className="marketplace-container">
              {width >= 768 ? (
                <>
                  <div className="image-wrapper">
                    <motion.div
                      ref={marketImgRef}
                      initial="hidden"
                      animate={marketImgInView ? (console.log("Animating market image"), "visible") : (console.log("Market image hidden"), "hidden")}
                      variants={rightBelowVariants}
                      transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
                    >
                      <Image
                        src={boxes_mobile_view}
                        className='marketplace-img'
                        alt="marketplace image"
                        quality={100}
                      />
                    </motion.div>
                  </div>

                  <div className="information">
                    <h3>MARKETPLACE</h3>
                    <p>Buy, Sell, Trade, Explore</p>
                  </div>
                </>
              ) : (
                <>
                  <h3>MARKETPLACE</h3>

                  <div className="image-wrapper">
                    <Image
                      src={boxes_mobile_view}
                      className='marketplace-img'
                      alt="marketplace image"
                      quality={100}
                    />
                  </div>

                  <p>Buy, Sell, Trade, Explore</p>
                </>
              )

              }
            </div>

            <div className="dots-wrapper">
              <Image
                src={dots}
                className="dots-img"
                alt="image of dots"


              />
            </div>

            <div className="project-management-container">
              {width >= 768 ? (
                <>
                  <div className="image-wrapper">

                    {/* <motion.div
                      ref={projectRef}
                      initial="hidden"
                    animate={marketImgInView ? (console.log("Animating market image"), "visible") : (console.log("Market image hidden"), "hidden")}
                    variants={belowVariants}
                    transition={{ duration: 1, ease: "easeOut"}} // Adjust the duration and easing
                  > */}

                    {/* <Image src={width >= 768 ? projectManagement_pc_view : projectManagement_mobile_view} className='project-management-img' alt="project management image"/> */}
                    <Image
                      src={width >= 768 ? projectManagement_mobile_view : projectManagement_mobile_view}
                      className='project-management-img'
                      alt="project management image"

                      quality={100}

                    />
                    {/* </motion.div> */}
                  </div>

                  <div className="information">
                    <motion.div
                      ref={projectRef}
                      initial="hidden"
                      animate={projectInView ? "visible" : "hidden"}
                      variants={rightVariants}
                      transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
                    >
                      <h3>PROJECT MANAGEMENT</h3>
                      <p>Tools for Teacher(s), Student(s), Business(es)</p>
                    </motion.div>
                  </div>
                </>

              ) : (
                <>
                  <h3>PROJECT MANAGEMENT</h3>

                  <div className="image-wrapper">

                    <Image
                      src={projectManagement_mobile_view}
                      className='project-management-img'
                      alt="project management image"
                      quality={100}
                    />
                  </div>

                  <p>Tools for Teacher(s), Student(s), Business(es)</p>
                </>
              )

              }
            </div>

          </section>

          <section className='objectives'>
            <motion.div
              ref={objectivesRef}
              initial="hidden"
              animate={objectivesInView ? "visible" : "hidden"}
              variants={leftVariants}
              transition={{ duration: 0.5 }} // Adjust the duration and easing
            >
              <h2>OBJECTIVES</h2>
            </motion.div>
            <div className="privacy-container">

              <div className="image-wrapper">
                <motion.div
                  ref={privacyRef}
                  initial="hidden"
                  animate={privacyInView ? "visible" : "hidden"}
                  variants={fadeVariants}
                  transition={{ duration: 0.5 }} // Adjust the duration and easing
                >
                  <Image
                    src={privacy}
                    className='privacy-img'
                    alt="image of laptop"
                    quality={100}
                  />
                </motion.div>
              </div>

              <div className="information">
                <motion.div
                  ref={privacyRef}
                  initial="hidden"
                  animate={privacyInView ? "visible" : "hidden"}
                  variants={fadeVariants}
                  transition={{ duration: 0.5 }} // Adjust the duration and easing
                >
                  <h3>PRIVACY</h3>
                  <p>These specific features would incorporate a &quot;lock code&quot; that only the user would know.</p>
                </motion.div>
              </div>
            </div>

            <div className="user-safety-container">

              <div className="image-wrapper">
                <motion.div
                  ref={safetyRef}
                  initial="hidden"
                  animate={safetyInView ? "visible" : "hidden"}
                  variants={fadeVariants}
                  transition={{ duration: 0.5 }} // Adjust the duration and easing
                >
                  <Image
                    src={userSafety}
                    className='user-safety-img'
                    alt="image of laptop"

                    quality={100}

                  />
                </motion.div>
              </div>

              <div className="information">
                <motion.div
                  ref={safetyRef}
                  initial="hidden"
                  animate={safetyInView ? "visible" : "hidden"}
                  variants={fadeVariants}
                  transition={{ duration: 0.5 }} // Adjust the duration and easing
                >
                  <h3>USER SAFETY</h3>
                  <p>Implementation of algorithms, that can recognize sensitive phrases and words as well as duplicate account would improve user&apos;s safety.</p>
                </motion.div>
              </div>

            </div>

            <div className="data-security-container">

              <div className="image-wrapper">
                <motion.div
                  ref={securityRef}
                  initial="hidden"
                  animate={securityInView ? "visible" : "hidden"}
                  variants={fadeVariants}
                  transition={{ duration: 0.5 }} // Adjust the duration and easing
                >
                  <Image
                    src={dataSecurity}
                    className='data-security-img'
                    alt="image of male and female by a server room"

                    quality={100}

                  />
                </motion.div>
              </div>

              <div className="information">
                <motion.div
                  ref={securityRef}
                  initial="hidden"
                  animate={securityInView ? "visible" : "hidden"}
                  variants={fadeVariants}
                  transition={{ duration: 0.5 }} // Adjust the duration and easing
                >
                  <h3>DATA SECURITY</h3>
                  <p>Data such as names, addresses, emails, contacts, and date of births would not be used for marketing purposes.</p>
                </motion.div>
              </div>

            </div>

          </section>

          <section className='products'>
            <h2>PRODUCTS</h2>

            <div className="products-container">

              <div className="image-wrapper">

                <Image
                  src={productsImage}
                  className='man-holding-phone-with-logo-img'
                  alt="image of man holding phone with logo"
                  quality={100}

                />
              </div>

              <p>The Purpose Of Ourlime And What UpTech Incorporated Hope To Achieve With Our App.</p>

              <button className='sign-up-btn' onClick={() => {
                window.open('https://ourlime.com', '_blank');
              }
              }>Sign Up</button>
            </div>
          </section>

          <section className="about-us">
            <h2>ABOUT US</h2>

            <div className="about-us-btns">

              <p>Uptech Incorporated created Ourlime and Ourlime Messenger to give our users a new experience.</p>

              <div className="btns-containers">

                <button className='large-btn-group'>OUR STORY</button>
                <button className='large-btn-group'>THE WAY FORWARD</button>
                <button className='large-btn-group'>OURLIME BROCHURE</button>
              </div>

              <div className="about-us-img-wrapper">

                <Image
                  src={aboutUsImage}
                  className="about-us-img"
                  alt="image of guy with ourlime logo behind him"
                />
              </div>

            </div>

          </section>
        </main>


      </div>


    </div>
  )
}
