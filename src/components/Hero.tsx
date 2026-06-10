'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react'

export default function Hero() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      router.push(`/p/${username.trim()}`)
    }
  }

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Free for developers. No credit card required.</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Turn Your GitHub Into a
            <span className="text-primary-600"> Stunning Portfolio</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop spending weeks building a portfolio. Just enter your GitHub username and get a
            beautiful, professional portfolio website in less than 30 seconds.
          </p>

          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-xl mx-auto">
              <div className="relative w-full flex items-center">
                <div className="absolute left-3 top-0 bottom-0 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-medium bg-gray-100 px-2.5 py-1 rounded-md text-sm select-none">
                    github.com/
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="your-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-[9.5rem] pr-4 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200/50 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={!username.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3.5 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-500" />
              Instant deploy
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-500" />
              No coding required
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
