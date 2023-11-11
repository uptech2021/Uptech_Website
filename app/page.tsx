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
import Footer from '@/components/Footer'

import Image from 'next/image'
import { useWindowSize } from 'react-use'; //react package that checks the screen size of the device
import React from 'react'

export default function Home() {

  const { width } = useWindowSize();
  
  return (
    <div className="home-main-container">

      <div className="outer-layer">

        <section className="welcome-section">
          <Navbar />
          <div className="call-to-action">

            <div className="welcome-container">
              <h1>Welcome</h1>

              <p>To UPTECH Incorp. Ltd.</p>
            </div>
            {/* If the screen is > =768px render the pc view image, else render the mobile view image */}

            <div className="image-wrapper">
              <Image 
                src={width >= 768 ?  landingImage : landingImage} 
                className="call-to-action-img" 
                alt="Guy Holding His phone with the Ourlime logo behind him" 
                quality={100}
              />
            </div>

          </div>


        </section>

        <main className="main-section">
          <div className='features'>

            <div className="features-container">
              <h2>FEATURES</h2>

              <p>Ourlime aims to provide our users with not only the features they have come to expect from a social media platform but also introduce concepts that we think will enhance our users.</p>
            
              <div className="dots-wrapper">
                <Image 
                  src={dots} 
                  className="dots-img" 
                  alt="image of dots" 
                  />
              </div>
            </div>
          
            <div className="education-container">
              
              <div className="image-wrapper">
                  {/* <Image src={width >= 768 ? elearning_pc_view : elearning_mobile_view} className='elearning-img' alt="elearning"/> */}
                  <Image 
                    src={width >= 768 ? elearning_mobile_view : elearning_mobile_view} 
                    className='elearning-img' 
                    alt="elearning"
                    
                    // quality={100}
                    />
              </div>

              <div className="information">
                <h3>EDUCATION</h3>
                <p>Virtual Library, <br/>Blogs, etc.</p>
              </div>
            
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
                    <Image 
                      src={boxes_mobile_view} 
                      className='marketplace-img' 
                      alt="marketplace image"
                      quality={100}
                      />
                  </div>
              
                  <div className="information">
                    <h3>MARKETPLACE</h3>
                    <p><b>Buy, Sell, Trade, Explore</b></p>
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
            
                    <div className="information">
                      <p><b>Buy, Sell, Trade, Explore</b></p>
                    </div> 
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
                      {/* <Image src={width >= 768 ? projectManagement_pc_view : projectManagement_mobile_view} className='project-management-img' alt="project management image"/> */}
                      <Image 
                        src={width >= 768 ? projectManagement_mobile_view : projectManagement_mobile_view} 
                        className='project-management-img' 
                        alt="project management image"
                        
                        quality={100}
                        
                        />
                  </div>
                
                  <div className="information">
                    <h3>PROJECT MANAGEMENT</h3>
                    <p>Tools for Teacher(s), Student(s), Business(es)</p>
                  </div>
                </>

              ) : (
                <>
                  <h3>PROJECT MANAGEMENT</h3>

                  <div className="image-wrapper">
                    
                    {/* <Image src={width >= 768 ? projectManagement_pc_view : projectManagement_mobile_view} className='project-management-img' alt="project management image"/> */}
                    <Image 
                      // src={width >= 768 ? projectManagement_mobile_view : projectManagement_mobile_view} 
                      src={projectManagement_mobile_view} 
                      className='project-management-img' 
                      alt="project management image"
                      
                      quality={100}
                      
                      />
                  </div>
              
                  <div className="information">
                    <p>Tools for Teacher(s), Student(s), Business(es)</p>
                  </div>
                </>
              )

              }
            </div>
            
          </div>

            <div className='objectives'>
                <h2>OBJECTIVES</h2>
              
                <div className="privacy-container">

                  <div className="image-wrapper">
                    <Image 
                      src={privacy} 
                      className='privacy-img' 
                      alt="image of laptop" 
                      
                      quality={100}
                      />
                  </div>                
                  
                  <div className="information">
                    <h3>PRIVACY</h3>
                    <p>These specific features would incorporate a &quot;lock code&quot; that only the user would know.</p> 
                  </div>
                              
                </div>

                <div className="user-safety-container">

                  <div className="image-wrapper">
                    <Image 
                      src={userSafety}
                      className='user-safety-img' 
                      alt="image of laptop" 
                      
                      quality={100}
                      
                      />
                  </div>
                  
                  <div className="information">
                    <h3>USER SAFETY</h3>
                    <p>Implementation of algorithms, that can recognize sensitive phrases and words as well as duplicate account would improve user&apos;s safety.</p>
                  </div>

                </div>

                <div className="data-security-container">

                  <div className="image-wrapper">
                    <Image 
                      src={dataSecurity} 
                      className='data-security-img' 
                      alt="image of male and female by a server room"
                      
                      quality={100}
                      
                      />
                  </div>

                  <div className="information">
                    <h3>DATA SECURITY</h3>
                    <p>Data such as names, addresses, emails, contacts, and date of births would not be used for marketing purposes.</p>
                  </div>

                </div>

            </div>
          
            <div className='products'>
                <h3>PRODUCTS</h3>

                <div className="products-container">

                    <div className="image-wrapper">
                      {/* <Image src={width >= 768 ? manHoldingPhoneWithLogoBehindHim_pc_view : manHoldingPhoneWithLogoBehindHim_mobile_view} className='man-holding-phone-with-logo-img' alt="image of man holding phone with logo" /> */}
                      <Image 
                        src={productsImage} 
                        className='man-holding-phone-with-logo-img' 
                        alt="image of man holding phone with logo" 
                        
                        quality={100}
                        
                        />
                    </div>

                    <p>The Purpose Of Ourlime And What UpTech Incorporated Hope To Achieve With Our App.</p>
                
                    <button className='learn-more-btn'>Learn More</button>
                </div>
            </div>

            <div className="about-us">
              <h3>ABOUT US</h3>

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
            </div>
        </main>


      </div>

      <Footer />

    </div>  
)
}
