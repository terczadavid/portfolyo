'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, ArrowLeft } from 'lucide-react'

export default function SignIn() {
  const [username, setUsername] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Get Started</h1>
            <p className="text-gray-600">Enter your GitHub username to generate your portfolio.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (username.trim()) window.location.href = `/p/${username.trim()}` }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">GitHub Username</label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. octocat"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none text-sm" />
              </div>
            </div>
            <button type="submit" disabled={!username.trim()} className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50">
              Generate Portfolio
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}