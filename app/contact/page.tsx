import '@/styles/contact/contact.css'

import contactUsImage from '@/public/images/Contact Us/ContactUsImage.png'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

export default function Contact() {
  return (
    <div className='contact-main-container'>
        <div className="outer-layer">
            <section className="top-section">
                <Navbar />

                <div className='wrapper'>
                    <h1>Contact Us</h1>

                    <div className='image-wrapper'>
                        <Image 
                            src={contactUsImage}
                            className='contact-us-img'
                            alt='picture of a black woman holding her headphones'
                        />
                    </div>
                </div>

            </section>

            <main className='main-section'>
                
            </main>
        </div>
    </div>
  )
}
