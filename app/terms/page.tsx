'use client'

import '../../styles/terms/terms.css'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@components/footer/Footer'
import BookMarks from '@/components/BookMarks'
import TermsAndPrivacy from '@/components/TermsAndPrivacy'

export default function Terms() {

    return (
        <div className="terms-main-container">
            <div className="outer-layer">
                <section className="terms-first-container">
                    <section className="terms-section">
                        <Navbar />

                        <div className="terms-header">
                            <h1>Terms and Conditions</h1>
                        </div>
                    </section>
                </section>
                <TermsAndPrivacy />
            </div>
        </div>
    )
}