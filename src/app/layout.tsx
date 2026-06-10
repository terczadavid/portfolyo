import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolyo — Turn Your GitHub Into a Portfolio',
  description: 'Transform your GitHub profile into a stunning portfolio website in seconds. Free, fast, and beautiful.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%230ea5e9%22/%3E%3Ctext x=%2250%22 y=%2270%22 font-size=%2255%22 font-family=%22system-ui, sans-serif%22 font-weight=%22700%22 text-anchor=%22middle%22 fill=%22white%22%3EP%3C/text%3E%3C/svg%3E',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
