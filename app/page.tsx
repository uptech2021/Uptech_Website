'use client'

import '../styles/home/home.css'
import upTechLogo from '../public/images/uptech logo.png'
import menu from '../public/images/menu.svg'
import aaron_mobile_view from '../public/images/aaron_mobile_view.png'
import aaron_pc_view from '../public/images/aaron_pc_view.png'
import elearning_mobile_view from '../public/images/elearning_mobile_view.png'
import elearning_pc_view from '../public/images/elearning_pc_view.png'
import boxes_mobile_view from '../public/images/boxes_mobile_view.png'
import boxes_pc_view from '../public/images/boxes_pc_view.png'
import projectManagement_mobile_view from '../public/images/projectManagement_mobile_view.png'
import projectManagement_pc_view from '../public/images/projectManagement_pc_view.png'
import privacy from '../public/images/privacy.png'
import userSafety from '../public/images/user safety.png'
import dataSecurity from '../public/images/data security.png'
import manHoldingPhoneWithLogoBehindHim from '../public/images/man holding phone with logo.png'
import manWIthLogoBehindHimHoldingPhone from '../public/images/man with logo behind him holding phone.png'
import whatsAppIcon from '../public/Icons/Whatsapp Icon.svg'
import instagramIcon from '../public/Icons/Instagram Icon.svg'
import linkedInIcon from '../public/Icons/LinkedIn Icon.svg'
import twitterIcon from '../public/Icons/Twitter Icon.svg'
import facebookIcon from '../public/Icons/Facebook Icon.svg'
import dots from '../public/images/dots.png'

import Image from 'next/image'
import { useWindowSize } from 'react-use'; //react package that checks the screen size of the device
import Link from 'next/link'

export default function Home() {

  const { width } = useWindowSize();
  
  return (
    <main className="home-main-container">

    <div className="outer-layer">

      <section className="welcome-section">
        <header className="header">
          <div className="logo-wrapper">
            <Image className="uptech-logo" src={upTechLogo} alt="logo"/>
          </div>

          <nav className="navbar">
            <ul className="nav-items">
              <li className="nav-links">Home</li>
              <li className="nav-links">Objectives</li>
              <li className="nav-links">About us</li>
              <li className="nav-links">Products</li>
              <li className="nav-links">Contact us</li>
            </ul>
          </nav>
          
          <Image className='menu-btn' src={menu} alt="menu"/>
          
        </header>

        <div className="call-to-action">

          <div className="welcome-container">
            <h1>Welcome</h1>

            <p>Sign Up for the 
              <br /><span style={{color: '#06E95C'}}>OURLIME</span><br />
              communities network TODAY!</p>
          </div>
          {/* If the screen is > =768px render the pc view image, else render the mobile view image */}

          <div className="image-wrapper">
            <Image 
              src={width >= 768 ?  aaron_pc_view : aaron_mobile_view} 
              className="call-to-action-img" 
              alt="Guy Holding His phone with the Ourlime logo behind him" 
              unoptimized
            />
          </div>


        </div>


      </section>

      <section className="product-information-section">
        <div className='features'>

          <div className="features-container">
            <h2>FEATURES</h2>

            <p>Ourlime aims to provide our users with not only the features they have come to expect from a social media platform but also introduce concepts that we think will enhance our users.</p>
          
            <div className="dots-wrapper">
              <Image src={dots} className="dots-img" alt="image of dots" />
            </div>
          </div>
        
          <div className="education-container">
            
          <div className="image-wrapper">
              <Image src={width >= 768 ? elearning_pc_view : elearning_mobile_view} className='elearning-img' alt="elearning"/>
          </div>

          <div className="information">
           <h3>EDUCATION</h3>
           <p>Virtual Library, <br/>Blogs, etc.</p>
          </div>
           
          </div>

          <div className="dots-wrapper">
              <Image src={dots} className="dots-img" alt="image of dots" />
          </div>

          <div className="marketplace-container">
            <div className="image-wrapper">
                <Image src={width >= 768 ? boxes_pc_view : boxes_mobile_view} className='marketplace-img' alt="marketplace image"/>
            </div>
            
            <div className="information">
              <h3>MARKETPLACE</h3>
              <p><b>Buy, Sell, Trade, Explore</b></p>
            </div>
          </div>

          <div className="dots-wrapper">
              <Image src={dots} className="dots-img" alt="image of dots" />
          </div>

          <div className="project-management-container">
            <div className="image-wrapper">
                <Image src={width >= 768 ? projectManagement_pc_view : projectManagement_mobile_view} className='project-management-img' alt="project management image"/>
            </div>
          
            <div className="information">
              <h3>PROJECT MANAGEMENT</h3>
              <p>Tools for Teacher(s), Student(s), Business(es)</p>
            </div>
            
          </div>
          
        </div>

          <div className='objectives'>
            <h2>OBJECTIVES</h2>
            <div className="privacy-container">
              <h3>PRIVACY</h3>

              <Image src={privacy} className='privacy-img' alt="image of laptop" />

              <p>These specific features would incorporate a &quot;lock code&quot; that only the user would know.</p>              </div>

            <div className="user-safety-container">
              <h3>USER SAFETY</h3>

              <Image src={userSafety} className='user-safety-img' alt="image of laptop" />

              <p>Implementation of algorithms, that can recognize sensitive phrases and words as well as duplicate account would improve user&apos;s safety.</p>
            </div>

            <div className="data-security-container">
              <h3>DATA SECURITY</h3>

              <Image src={dataSecurity} className='data-security-img' alt="image of male and female by a server room" />

              <p>Data such as names, addresses, emails, contacts, and date of births would not be used for marketing purposes.</p>
            </div>
            

          </div>
        
          <div className='products'>
              <h3>PRODUCTS</h3>

              <div className="products-container">

                  <Image src={manHoldingPhoneWithLogoBehindHim} className='man-holding-phone-with-logo-img' alt="image of man holding phone with logo" />

                  <p>The purpose of Ourlime and what UpTech Incorporated hope to achieve with Our App.</p>
              
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
                src={manWIthLogoBehindHimHoldingPhone} 
                className="man-holding-phone-with-logo-img" 
                alt="image of guy with ourlime logo behind him" 
                unoptimized
                />
              </div>
            </div>
          </div>
      </section>


    </div>

    <footer>
      <div className="uptech-details">
        <div className="company-details">
          <div className="company-name">
            <h4>UPTECH</h4>
            <h5>Incorported Ltd</h5>
          </div>

          
          <div className="swap swap-pc">
            <p className="footer-links">Terms & Conditions</p>
            <p className="footer-links">Privacy Policy</p>
            <p className="footer-links">Contact Us</p>
            <p className="footer-links">Help</p>
          </div>
        </div>

        <div className="social-icons">
          <Image src={whatsAppIcon} className='icon' alt="whatsapp icon" />
          <Image src={instagramIcon} className='icon' alt="Instagram icon" />
          <Image src={linkedInIcon} className='icon' alt="LinkedIn icon" />
          <Image src={twitterIcon} className='icon' alt="Twitter icon" />
          <Image src={facebookIcon} className='icon' alt="Facebook icon" />
        </div>

      </div>

        <p className='swap swap-mobile'>Cooperation, Communication, Teamwork and Commitment</p>
    </footer>

    </main>  
)
}
