import type { Metadata } from 'next';

// use the metadata API per below to manage <head> properties
export const metadata: Metadata = {
  title: 'BB&S',
  description: 'BB&S: Lighting People',
}

// styles
import '@/app/styles/main.scss'

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
