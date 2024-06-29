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
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react'

export default function Home() {


  const welcomeControls = useAnimation();
  const educationControls = useAnimation();
  const educationImgControls = useAnimation();
  const projectControls = useAnimation();
  const projectImgControls = useAnimation();
  const marketControls = useAnimation();
  const marketImgControls = useAnimation();
  const objectivesControls = useAnimation();
  const safetyControls = useAnimation();
  const privacyControls = useAnimation();
  const securityControls = useAnimation();
  const ourlimeControls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const checkInView = (ref: HTMLElement) => {
        const top = ref.getBoundingClientRect().top;
        return top < window.innerHeight && top > 0;
      };

      const animateIfInView = (ref: HTMLElement | null, controls: any) => {
        if (ref && checkInView(ref)) {
          controls.start("visible");
        }
      };

      animateIfInView(document.querySelector('.welcome-container'), welcomeControls);
      animateIfInView(document.querySelector('.education-container'), educationControls);
      animateIfInView(document.querySelector('.education-container .image-wrapper'), educationImgControls);
      animateIfInView(document.querySelector('.project-management-container'), projectControls);
      animateIfInView(document.querySelector('.project-management-container .image-wrapper'), projectImgControls);
      animateIfInView(document.querySelector('.marketplace-container'), marketControls);
      animateIfInView(document.querySelector('.marketplace-container .image-wrapper'), marketImgControls);
      animateIfInView(document.querySelector('.objectives'), objectivesControls);
      animateIfInView(document.querySelector('.privacy-container'), privacyControls);
      animateIfInView(document.querySelector('.user-safety-container'), safetyControls);
      animateIfInView(document.querySelector('.data-security-container'), securityControls);
      animateIfInView(document.querySelector('.call-to-action .image-wrapper'), ourlimeControls);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [educationControls, educationImgControls, marketControls, marketImgControls, objectivesControls, ourlimeControls, privacyControls, projectControls, projectImgControls, safetyControls, securityControls, welcomeControls]);

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
    <div className="home-main-container">

      <div className="outer-layer">

        <section className="welcome-section">
          <Navbar />

          <div className="call-to-action">

            <div className="welcome-container">
              <motion.div
                initial="hidden"
                animate={welcomeControls}
                variants={rightVariants}
                transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
              >
                <h1>Welcome</h1>

                <p>To UPTECH Incorp. Ltd.</p>
              </motion.div>
            </div>

            <div className="image-wrapper">
              <motion.div
                initial="hidden"
                animate={ourlimeControls}
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
              {isLargeScreen  ? (
                <div>
                  <div className="image-wrapper">
                    <motion.div
                      initial="hidden"
                      animate={educationImgControls}
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
                      initial="hidden"
                      animate={educationControls}
                      variants={rightVariants}
                      transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
                    >
                      <h3>EDUCATION</h3>
                      <p>Virtual Library, <br />Blogs, etc.</p>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div>
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
                </div>
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
              {isLargeScreen  ? (
                <div>
                  <div className="image-wrapper">
                    <motion.div
                      initial="hidden"
                      animate={marketImgControls}
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
                </div>
              ) : (
                <div>
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
                </div>
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
              {isLargeScreen  ? (
                <div>
                  <div className="image-wrapper">
                    <Image
                      src={projectManagement_mobile_view}
                      className='project-management-img'
                      alt="project management image"
                      quality={100}
                    />
                  </div>

                  <div className="information">
                    <h3>PROJECT MANAGEMENT</h3>
                    <p>Task Management</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>PROJECT MANAGEMENT</h3>

                  <div className="image-wrapper">
                    <Image
                      src={projectManagement_mobile_view}
                      className='project-management-img'
                      alt="project management image"
                      quality={100}
                    />
                  </div>

                  <p>Task Management</p>
                </div>
              )}
            </div>

            <div className="dots-wrapper">
              <Image
                src={dots}
                className="dots-img"
                alt="image of dots"


              />
            </div>

            <div className="objectives">
              <motion.div
                initial="hidden"
                animate={objectivesControls}
                variants={fadeVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }} // Adjust the duration and easing
              >
                <h3>Our Objectives</h3>
                <p>We aim to ensure that our users are kept safe while using our platform by prioritizing data protection, educating our users, and guaranteeing that their personal information is secure.</p>
              </motion.div>
            </div>

          </section>

          <section className="security">

            <div className="security-container">

              <div className="privacy-container">

                <motion.div
                  initial="hidden"
                  animate={privacyControls}
                  variants={rightVariants}
                  transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
                >
                  <Image
                    src={privacy}
                    className='security-img'
                    alt="privacy image"
                    quality={100}
                  />
                  <h3>PRIVACY</h3>
                  <p>Our users privacy is our top priority.</p>
                </motion.div>
              </div>

              <div className="user-safety-container">
                <motion.div
                  initial="hidden"
                  animate={safetyControls}
                  variants={rightVariants}
                  transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
                >
                  <Image
                    src={userSafety}
                    className='security-img'
                    alt="privacy image"
                    quality={100}
                  />
                  <h3>USER SAFETY</h3>
                  <p>Educating our users about internet safety.</p>
                </motion.div>
              </div>

              <div className="data-security-container">
                <motion.div
                  initial="hidden"
                  animate={securityControls}
                  variants={rightVariants}
                  transition={{ duration: 1, ease: "easeOut" }} // Adjust the duration and easing
                >
                  <Image
                    src={dataSecurity}
                    className='security-img'
                    alt="privacy image"
                    quality={100}
                  />
                  <h3>DATA SECURITY</h3>
                  <p>We aim to use the best and most reliable data protection solutions.</p>
                </motion.div>
              </div>
            </div>

          </section>

          <section className="about-us">

            <div className="about-us-container">
              {isLargeScreen  ? (
                <div>
                  <div className="about-us-text">

                    <h3>About Us</h3>
                    <p>Our goal is to provide the best service to our users while ensuring their privacy, security, and overall satisfaction. Join us and be part of a safe and engaging community.</p>
                  </div>

                  <div className="about-us-image">
                    <Image
                      src={aboutUsImage}
                      alt="About Us"
                      quality={100}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="about-us-image">
                    <Image
                      src={aboutUsImage}
                      alt="About Us"
                      quality={100}
                    />
                  </div>

                  <div className="about-us-text">
                    <h3>About Us</h3>
                    <p>Our goal is to provide the best service to our users while ensuring their privacy, security, and overall satisfaction. Join us and be part of a safe and engaging community.</p>
                  </div>
                </div>
              )}
            </div>

          </section>

        </main>

      </div>
    </div>
  );
}
