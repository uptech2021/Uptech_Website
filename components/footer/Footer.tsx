'use client'
import '../../styles/footer.css'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Mobile from './Mobile'
import Pc from './Pc'
export default function Footer() {
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window width
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowWidth <= 768 ? <Mobile /> : <Pc />
}
//TODO add ourlime icon when ourlime has been completed