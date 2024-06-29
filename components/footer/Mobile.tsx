import '../../styles/footer.css'

import Image from 'next/image'
export default function Mobile() {
  return (
    <footer className='mobile-footer'>
      <div className="logo-wrapper">
        <Image
          src='/images/whiteLogo.svg'
          width={150}
          height={150}
          className='logo'
          alt="logo"
        />
      </div>

      <div className='social-icons'>
        <div className="icon-wrapper">
          <Image
            src="/images/Footer/Whatsapp Icon.svg"
            width={150}
            height={150}
            alt="whatsapp icon"
            onClick={() => window.open(`https://wa.me/+18687104296`)}
          />
        </div>

        <div className="icon-wrapper">
          <Image
            src="/images/Footer/Instagram Icon.svg"
            width={150}
            height={150}
            alt='instagram icon'
            onClick={()=> window.open('https://www.instagram.com/uptechincorp/')}
          />
        </div>

        <div className="icon-wrapper">
          <Image
            src="/images/Footer/LinkedIn Icon.svg"
            width={150}
            height={150}
            alt='linkedIn icon'
            onClick={() => window.open('https://www.linkedin.com/in/uptechincorp/')}
          />
        </div>

        <div className="icon-wrapper">
          <Image
            src="/images/Footer/Facebook Icon.svg"
            width={150}
            height={150}
            alt='facebook icon'
            onClick={() => window.open('https://www.facebook.com/uptech.trendz')}
          />
        </div>


        {/* <div className="icon-wrapper">
          <Image
            src="/images/Footer/Ourlime Icon.svg"
            width={150}
            height={150}
            alt='ourlime icon'
            onClick={()=> window.open('https://www.instagram.com/uptechincorp/')}
          />
        </div> */}

      </div>

      <p>Cooperation, Communication, Teamwork and Commitment</p>
    </footer>
  )
}
//TODO add ourlime icon when ourlime has been completed