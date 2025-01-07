import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black px-5 py-20 flex flex-col gap-3">
        <div className="md:w-2/6 lg:w-1/4">
          <Image
            className="w-full"
            src="/images/footerLogo.svg"
            alt="footer logo"
            width={100}
            height={100}
          />
        </div>

        {/* <div className="flex gap-5">
          <a
            href="https://wa.me/+18687104296"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-8 md:w-6"
              src="/images/whatsapp.svg"
              alt="whatsapp"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://www.instagram.com/uptechincorp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-8 md:w-6"
              src="/images/instagram.svg"
              alt="instagram"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/uptechincorp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-8 md:w-6"
              src="/images/linkedin.svg"
              alt="linkedin"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://www.facebook.com/uptech.trendz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-8 md:w-6"
              src="/images/facebook.svg"
              alt="facebook"
              width={32}
              height={32}
            />
          </a>
        </div> */}

        <p className="text-white">
          Cooperation, Communication, Teamwork and Commitment
        </p>
      </footer>
  )
}
