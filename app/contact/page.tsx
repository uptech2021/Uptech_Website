'use client'

import '@/styles/contact/contact.css'

import contactUsImage from '@/public/images/Contact Us/ContactUsImage.png'
import contactUsImage_pcView from '@/public/images/Contact Us/ContactUsImage_pcView.png'
import envelope from '@/public/images/Contact Us/envelope.svg'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { useWindowSize } from 'react-use'
export default function Contact() {
    const { width } = useWindowSize()
    return (
        <div className='contact-main-container'>
            <div className="outer-layer">
                <section className="top-section">
                    <Navbar />

                    <div className='wrapper'>
                        <h1>Contact Us</h1>

                        <div className='image-wrapper'>
                            <Image 
                                src={width >= 1200 ? contactUsImage_pcView : contactUsImage}
                                className='contact-us-img'
                                alt='picture of a black woman holding her headphones'
                            />
                        </div>
                    </div>

                </section>

                <main className='main-section'>
                    <div className="contact-information">
                        <div className="information">
                            <div className="email-contact">
                                <p className='email-us'>Email Us:</p>
                                <p className="gmail">rishikowlessar@uptechincorp.com</p>
                            </div>

                            <div className="phone-contact">
                                <p className="phone">Call or Whatsapp:</p>
                                <p className="phone-number">1-868-710-4296</p>
                            </div>
                        </div>

                        <div className="image-wrapper">
                            <Image 
                                src={envelope}
                                className="envelope-img"
                                alt="image of an envelope"
                            />
                        </div>
                    </div>

                    <form className='contact-form'>
                        <p className='form-message'>Leave us a message and we will get back to you</p>
                        
                            <div className="first-name-wrapper wrapper">
                                <label htmlFor="first-name">First Name</label>
                                <input type="text" id="first-name" name="firstName" required/>
                            </div>
                            
                            <div className="last-name-wrapper wrapper">
                                <label htmlFor="last-name">Last Name</label>
                                    <input type="text" id="last-name" name="lastName" required/>
                            </div>

                            <div className="email-wrapper wrapper">
                                <label htmlFor="email">Email</label>
                                    <input type="text" id="email" name="email" required/> 
                            </div>
                            
                            <div className="comment-wrapper wrapper">
                                <label htmlFor="comment">Comment:</label>
                                    <textarea name="comment" id="comment" cols={30} rows={10}></textarea>
                            </div>

                            <div className="btn-wrapper wrapper">
                                <button className="form-btn submit-btn">Submit</button>
                                <button className="form-btn reset-btn">Reset</button>
                            </div>
                
                    </form>
                </main>
            </div>

            <Footer />
        </div>
    )
}
