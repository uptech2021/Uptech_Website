'use client'
import Image from "next/image";
import serv3 from '@/public/images/Services/service3.png'
import pcServ1 from '@/public/images/Services/pcService1.png'
import pcServ2 from '@/public/images/Services/pcService2.png'
import pcServ3 from '@/public/images/Services/pcService3.png'
import pcServ4 from '@/public/images/Services/pcService4.png'
import "@/styles/services/service.css"
import { usePathname } from 'next/navigation'
export default function Team() {

    const pathname = usePathname()
    return (
        <>
            <main className="main-container">
                <p>Transform your business with our innovative solutions and expert services, tailored to propel your company towards success.</p>
                <div className="service-container">
                    <div className="blue-box">
                        <h2>ADMINISTRATIVE SERVICE</h2>
                        <div className="wrapper">
                            <div className="servicePc-img">
                                <Image src={pcServ1} alt="ser1" className="ser-img" />
                            </div>
                            <div className="join">
                                <p>Boost productivity with an administrator who keeps everything organized and on track.</p>
                                <ul>
                                    <li>PowerPoint presentation</li>
                                    <li>Business planning</li>
                                    <li>Proofreading</li>
                                    <li>Advertisement reading</li>

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="service-container">
                    <div className="blue-box">
                        <h2>MARKETING SERVICES</h2>
                        <div className="wrapper">
                            <div className="join">
                                <p>Drive growth with a marketer who transforms insights into impactful strategies</p>
                                <ul>
                                    <li>Social Media</li>
                                    <li>Event planning and marketing</li>
                                    <li>Marketing planning</li>
                                    <li>Brand Marketing</li>
                                </ul>
                            </div>
                            <div className="servicePc-img">
                                <Image src={pcServ2} alt="ser2" className="ser-img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="service-container">

                    <div className="blue-box">
                        <h2>DEVELOPMENT SERVICES</h2>
                        <div className="wrapper">
                            <div className="servicePc-img">
                                <Image src={pcServ3} alt="ser3" className="ser-img" />
                            </div>
                            <div className="join">
                                <p>Unlock innovation and efficiency with a tech developer who turns ideas into cutting-edge solutions.</p>

                                <ul>
                                    <li>Web development and deployment</li>
                                    <li>Mobile app development and deployment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="service-container">

                    <div className="blue-box">
                        <h2>GRAPHIC SERVICES</h2>
                        <div className="wrapper">
                            <div className="join">
                                <p>Hiring a graphic designer can enhance your brand&apos;s visual identity and effectiveness, leading to better engagement and success.</p>
                                <ul>
                                    <li>UI/UX Designing.</li>
                                    <li>Company Branding.</li>
                                    <li>Company Branding.</li>

                                </ul>
                            </div>
                            <div className="servicePc-img">
                                <Image src={pcServ4} alt="ser4" className="ser-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}