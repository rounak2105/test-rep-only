"use client"

import Script from 'next/script'

export default function Analytics() {
  const trackingId = process.env.GOOGLE_ANALYTICS_ID || 'G-ZBESZNY2X0'

  return (
    <>
      {/* Load the gtag.js library */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      {/* Initialize gtag */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  )
}
