'use client'

import '@/styles/bookmarks.css'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';
export default function BookMarks() {

    const pathname = usePathname()
    return (
    <aside className='bookmark-container'>
            <div className="bookmark-header">
                <h3>BookMark</h3>
            </div>

            {pathname === '/privacy' ? (
                <div className="btns-container">
                    <div className="top-btns">
                    <ul className="left-btns">
                        <li><a href="#Info" className="btn">Introduction</a></li>
                        <li><a href="#Definitions" className="btn">Definitions</a></li>
                        <li><a href="#InfoCollect" className="btn">Information collection of data</a></li>
                        <li><a href="#" className="btn">Types of data collected</a></li>
                        <li><a href="#Data" className="btn">Use of data</a></li>
                        <li><a href="#Ren" className="btn">Retention of data</a></li>
                        <li><a href="#Trans" className="btn">Transfer of data</a></li>
                        <li><a href="#Disclose" className="btn">Disclosure of data</a></li>
                        <li><a href="#Secure" className="btn">Security of data</a></li>
                        <li><a href="#" className="btn">Introduction</a></li>
                    </ul>

                    <ul className="right-btns">
                        <li><a href="#Cali" className="btn">California privacy protection</a></li>
                        <li><a href="#ServiceP" className="btn">Service providers</a></li>
                        <li><a href="#Ana" className="btn">Analytics</a></li>
                        <li><a href="#CI" className="btn">CI/CD Tools</a></li>
                        <li><a href="#Ad" className="btn">Advertising</a></li>
                        <li><a href="#Behave" className="btn">Behavioral Marketing</a></li>
                        <li><a href="#Pay" className="btn">Payments</a></li>
                        <li><a href="#Link" className="btn">Links to other websites</a></li>
                        <li><a href="#Child" className="btn">Children&apos;s privacy</a></li>
                        <li><a href="#Change" className="btn">Changes to this privacy policy</a></li>
                    </ul>
                    </div>

                    <div className="bottom-btn">
                        <a href="#Contact" className="contact-btn">Contact Us</a>
                    </div>
                </div>
            ) : (
                <div className="btns-container">
                    <div className="top-btns">
                        <ul className="left-btns">
                            <li><a href="#intro" className="btn">Introduction</a></li>
                            <li><a href="#comms" className="btn">Communication</a></li>
                            <li><a href="#purchases" className="btn">Purchases</a></li>
                            <li><a href="#contests" className="btn">Contests, Sweepstakes and protion</a></li>
                            <li><a href="#subscriptions" className="btn">Subscription</a></li>
                            <li><a href="#free-tl" className="btn">Free Trial</a></li>
                            <li><a href="#fee-cges" className="btn">Fee Changes</a></li>
                            <li><a href="#refunds" className="btn">Refunds</a></li>
                            <li><a href="#content" className="btn">Contents</a></li>
                            <li><a href="#prohibited-u" className="btn">Prohibited Users</a></li>
                            <li><a href="#analytics" className="btn">Analytics</a></li>
                            <li><a href="#minor-u" className="btn">Use by Minors</a></li>
                            <li><a href="#accounts" className="btn">Accounts</a></li>
                        </ul>

                        <ul className="right-btns">
                            <li><a href="#intellectual-perty" className="btn">Intellectual Property</a></li>
                            <li><a href="#copyright-pcy" className="btn">Copy Right Policy</a></li>
                            <li><a href="#dmca" className="btn">DMCA</a></li>
                            <li><a href="#error-rrt" className="btn">Error Reporting and Feedback</a></li>
                            <li><a href="#links" className="btn">Links to other Websites</a></li>
                            <li><a href="#disclaimer" className="btn">Disclaimer of Warranty</a></li>
                            <li><a href="#liability" className="btn">Limitation of Liability</a></li>
                            <li><a href="#termination" className="btn">Termination</a></li>
                            <li><a href="#governing-l" className="btn">Governing Law</a></li>
                            <li><a href="#service-cge" className="btn">Changes to Services</a></li>
                            <li><a href="#amendments" className="btn">Amendments to Terms</a></li>
                            <li><a href="#waiver" className="btn">Waiver and Severability</a></li>
                            <li><a href="#acknowledgement" className="btn">Acknowledgment</a></li>
                        </ul>
                    </div>

                    <div className="bottom-btn">
                        <a href="#contact" className="contact-btn">Contact Us</a>
                    </div>
                </div>
            )}
    </aside>
    )
}
