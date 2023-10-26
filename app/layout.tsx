import './globals.css'
import type { Metadata } from 'next'

export const metadata = {
  title: 'Uptech Incorporated Limited',
  description: 'Corporate Website',
  image: "/public/favicon.ico"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
