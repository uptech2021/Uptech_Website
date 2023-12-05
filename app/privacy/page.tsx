import '@/styles/privacy/privacy.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookMarks from '@/components/BookMarks';
import TermsAndPrivacy from '@/components/TermsAndPrivacy';

export default function Privacy() {
  return (
    <>
      <div className='privacy-main-container'>
        <div className='outer-layer'>
          <section className='privacy-container'>

            <Navbar />


            <h1>Privacy Policy</h1>

          </section>

          <TermsAndPrivacy />
        </div>
        <Footer />
      </div>
    </>

  )
}
