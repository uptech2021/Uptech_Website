'use client'

import '@/styles/contact/contact.css'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import contactUsImage from '@/public/images/Contact Us/contactUsImage.png'
import contactUsImage_pcView from '@/public/images/Contact Us/contactUsImage_pcView.png'
import envelope from '@/public/images/Contact Us/envelope.svg'
import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSubmissionAttempt, isRateLimited } from '@/utils/rateLimit'
import Image from 'next/image';

export default function Contact() {
    const [width, setWidth] = useState(0);
    const form = useRef(null);

    const sendEmail = (e) => {
        e.preventDefault();

        if (isRateLimited()) {
            toast.error('You have exceeded the maximum number of submissions. Please try again later.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (form.current) {
            emailjs.sendForm('service_xfnsql8', 'template_tc7imh8', form.current, '5AmHByg4twxtIu8ct')
                .then((result) => {
                    console.log(result.text);
                    toast.success('Message sent successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    addSubmissionAttempt(); // Add the attempt after successful submission
                }, (error) => {
                    console.error(error.text);
                    toast.error('Something went wrong. Please try again.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        } else {
            console.error('Form reference is undefined');
        }
    };

    const resetForm = () => {
        if (form.current) {
            form.current.reset();
        }
    };

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width to state
            setWidth(window.innerWidth);
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    const imageUrl = width >= 1200 ? contactUsImage_pcView : contactUsImage;

    return (
        <div className='contact-main-container'>
            <ToastContainer />

            <div className="outer-layer">
                <section className="top-section">
                    <Navbar />

                    <div className='wrapper'>
                        <h1>Contact Us</h1>

                        <div className='image-wrapper'>
                            <Image
                                src={imageUrl}
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

                    <form className='contact-form' ref={form} onSubmit={sendEmail}>
                        <p className='form-message'>Leave us a message and we will get back to you</p>

                        <div className="first-name-wrapper wrapper">
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" id="first-name" name="firstName" required />
                        </div>

                        <div className="last-name-wrapper wrapper">
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" id="last-name" name="lastName" required />
                        </div>

                        <div className="email-wrapper wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div className="comment-wrapper wrapper">
                            <label htmlFor="comment">Comment:</label>
                            <textarea name="comment" id="comment" cols={30} rows={10}></textarea>
                        </div>

                        <div className="btn-wrapper wrapper">
                            <button className="form-btn submit-btn" type="submit">Submit</button>
                            <button className="form-btn reset-btn" type="button" onClick={resetForm}>Reset</button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}
