import type { Metadata } from 'next'
import './globals.css'
import MotionProvider from '@/components/motion/MotionProvider'

export const metadata: Metadata = {
  title: 'Quant Desk Theses | DRAFT',
  description: 'Agentic trading desk daily theses dashboard - DRAFT NOT FOR PUBLIC',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Motion renders its `initial` state as an inline style, so without
            JavaScript the revealed sections would never fade in. */}
        <noscript>
          <style>{
            '[data-desk-reveal]{opacity:1!important;filter:none!important;transform:none!important}'
          }</style>
        </noscript>
      </head>
      <body className="antialiased">
        {/* One ambient wash behind the whole desk, fixed so it never scrolls. */}
        <div
          aria-hidden
          className="desk-ambient pointer-events-none fixed inset-0 -z-10"
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
