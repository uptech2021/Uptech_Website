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
                        <li><a href="#" className="btn">Introduction</a></li>
                        <li><a href="#" className="btn">Definitions</a></li>
                        <li><a href="#" className="btn">Information collection of data</a></li>
                        <li><a href="#" className="btn">Types of data collected</a></li>
                        <li><a href="#" className="btn">Use of data</a></li>
                        <li><a href="#" className="btn">Retention of data</a></li>
                        <li><a href="#" className="btn">Transfer of data</a></li>
                        <li><a href="#" className="btn">Disclosure of data</a></li>
                        <li><a href="#" className="btn">Security of data</a></li>
                        <li><a href="#" className="btn">Introduction</a></li>
                    </ul>

                    <ul className="right-btns">
                        <li><a href="#" className="btn">California privacy protection</a></li>
                        <li><a href="#" className="btn">Service providers</a></li>
                        <li><a href="#" className="btn">Analytics</a></li>
                        <li><a href="#" className="btn">CI/CD Tools</a></li>
                        <li><a href="#" className="btn">Advertising</a></li>
                        <li><a href="#" className="btn">Behavioral Marketing</a></li>
                        <li><a href="#" className="btn">Payments</a></li>
                        <li><a href="#" className="btn">Links to other websites</a></li>
                        <li><a href="#" className="btn">Children&apos;s privacy</a></li>
                        <li><a href="#" className="btn">Changes to this privacy policy</a></li>
                    </ul>
                    </div>

                    <div className="bottom-btn">
                        <a href="" className="contact-btn">Contact Us</a>
                    </div>
                </div>
            ) : (
                <div className="btns-container">
                    <div className="top-btns">
                        <ul className="left-btns">
                            <li><a href="#" className="btn">Introduction</a></li>
                            <li><a href="#" className="btn">Communication</a></li>
                            <li><a href="#" className="btn">Purchases</a></li>
                            <li><a href="#" className="btn">Contests, Sweepstakes and protion</a></li>
                            <li><a href="#" className="btn">Subscription</a></li>
                            <li><a href="#" className="btn">Free Trial</a></li>
                            <li><a href="#" className="btn">Fee Changes</a></li>
                            <li><a href="#" className="btn">Refunds</a></li>
                            <li><a href="#" className="btn">Contents</a></li>
                            <li><a href="#" className="btn">Prohibited Users</a></li>
                            <li><a href="#" className="btn">Analytics</a></li>
                            <li><a href="#" className="btn">User by Minors</a></li>
                            <li><a href="#" className="btn">Accounts</a></li>
                        </ul>

                        <ul className="right-btns">
                            <li><a href="#" className="btn">Intellectual Property</a></li>
                            <li><a href="#" className="btn">Copy Right Policy</a></li>
                            <li><a href="#" className="btn">DMCA</a></li>
                            <li><a href="#" className="btn">Error Reporting and Feedback</a></li>
                            <li><a href="#" className="btn">Links to other Websites</a></li>
                            <li><a href="#" className="btn">Disclaimer of Warranty</a></li>
                            <li><a href="#" className="btn">Limitation of Liability</a></li>
                            <li><a href="#" className="btn">Termination</a></li>
                            <li><a href="#" className="btn">Governing the Law</a></li>
                            <li><a href="#" className="btn">Changes to Services</a></li>
                            <li><a href="#" className="btn">Amendments to Terms</a></li>
                            <li><a href="#" className="btn">Waiver and Severability</a></li>
                            <li><a href="#" className="btn">Acknowledgment</a></li>
                        </ul>
                    </div>

                    <div className="bottom-btn">
                        <a href="" className="contact-btn">Contact Us</a>
                    </div>
                </div>
            )}
    </aside>
    )
}
