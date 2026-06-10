'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, ArrowLeft } from 'lucide-react'

export default function SignIn() {
  const [username, setUsername] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Get Started with Portfolyo
            </h1>
            <p className="text-gray-600">
              Enter your GitHub username to generate your portfolio instantly.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (username) {
                window.location.href = `/p/${username.trim()}`
              }
            }}
          >
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Github className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. octocat"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              Generate Portfolio
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Or try it for someone else{' '}
            <Link href="/p/torvalds" className="text-primary-600 hover:underline font-medium">
              View a Demo
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}