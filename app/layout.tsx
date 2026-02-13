import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'CareCompanion - Digital Caregiver for Elders',
  description: 'A simple, elder-friendly digital caregiver app for medication reminders, mood tracking, emergency support, and family monitoring.',
}

export const viewport: Viewport = {
  themeColor: '#6B1FA0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
