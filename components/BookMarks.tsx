import '@/styles/bookmarks.css'

export default function BookMarks() {
    return (
    <aside className='bookmark-container'>
            <div className="bookmark-header">
                <h3>BookMark</h3>
            </div>

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
    </aside>
    )
}
