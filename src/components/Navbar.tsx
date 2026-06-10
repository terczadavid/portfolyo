'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold">Portfolyo</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</Link>
            <Link href="/auth/signin" className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700">Get Started Free</Link>
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
        {open && <div className="md:hidden border-t py-3 space-y-2">
          <Link href="#features" className="block py-2 text-gray-600" onClick={() => setOpen(false)}>Features</Link>
          <Link href="#how-it-works" className="block py-2 text-gray-600" onClick={() => setOpen(false)}>How It Works</Link>
          <Link href="/auth/signin" className="block w-full text-center bg-primary-600 text-white py-2.5 rounded-lg font-medium" onClick={() => setOpen(false)}>Get Started Free</Link>
        </div>}
      </div>
    </nav>
  )
}