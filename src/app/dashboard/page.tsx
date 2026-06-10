'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Github,
  Palette,
  Moon,
  Sun,
  Monitor,
  LayoutGrid,
  Layout,
  ExternalLink,
  Eye,
  Loader2
} from 'lucide-react'
import { GitHubProfile, GitHubRepo } from '@/types'

const ACCENT_COLORS = [
  { name: 'Blue', value: '#0ea5e9' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Slate', value: '#64748b' },
]

const TEMPLATES = [
  { id: 'default', name: 'Default', icon: Layout, description: 'Clean layout with centered hero' },
  { id: 'modern', name: 'Modern', icon: LayoutGrid, description: 'Split layout with side profile' },
]

export default function Dashboard() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Customization state
  const [selectedTemplate, setSelectedTemplate] = useState('default')
  const [accentColor, setAccentColor] = useState('#0ea5e9')
  const [darkMode, setDarkMode] = useState(false)

  const fetchProfile = useCallback(async () => {
    if (!username.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/github-portfolio?username=${encodeURIComponent(username.trim())}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch profile')
      }

      setProfile(data.profile)
      setRepos(data.repos)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setProfile(null)
      setRepos([])
    } finally {
      setLoading(false)
    }
  }, [username])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchProfile()
    }
  }

  const portfolioUrl = `/p/${username}?template=${selectedTemplate}&accent=${encodeURIComponent(accentColor)}&dark=${darkMode}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            </div>
            {profile && (
              <Link
                href={portfolioUrl}
                target="_blank"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Portfolio
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          {/* Sidebar - Settings */}
          <div className="space-y-6">
            {/* Fetch Profile */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Github className="w-5 h-5" />
                GitHub Profile
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. octocat"
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm"
                  />
                </div>
                <button
                  onClick={fetchProfile}
                  disabled={loading || !username.trim()}
                  className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                  {loading ? 'Loading...' : 'Fetch Profile'}
                </button>
              </div>
              {error && (
                <p className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
              )}
            </div>

            {profile && (
              <>
                {/* Template Selection */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Layout className="w-5 h-5" />
                    Template
                  </h2>
                  <div className="space-y-3">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          selectedTemplate === t.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedTemplate === t.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <t.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{t.name}</div>
                            <div className="text-xs text-gray-500">{t.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Color */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Accent Color
                  </h2>
                  <div className="grid grid-cols-5 gap-2">
                    {ACCENT_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setAccentColor(color.value)}
                        className={`w-10 h-10 rounded-xl transition-all ${
                          accentColor === color.value
                            ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-lg border border-gray-200"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span className="text-sm text-gray-600 font-mono">{accentColor}</span>
                  </div>
                </div>

                {/* Dark Mode Toggle */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Appearance
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                        !darkMode
                          ? 'border-primary-500 bg-primary-50 text-primary-600'
                          : 'border-gray-100 text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                        darkMode
                          ? 'border-primary-500 bg-primary-50 text-primary-600'
                          : 'border-gray-100 text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Preview */}
          <div className="space-y-6">
            {profile ? (
              <>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-sm text-gray-500 font-mono">Preview</span>
                  </div>
                  <div className="h-[600px] overflow-y-auto bg-gray-100">
                    <iframe
                      src={portfolioUrl}
                      className="w-full h-full"
                      title="Portfolio Preview"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Share Your Portfolio</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Copy this link and share it anywhere. Anyone can view your portfolio.
                  </p>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-gray-50 px-4 py-3 rounded-lg text-sm text-gray-700 font-mono truncate">
                      {typeof window !== 'undefined' ? `${window.location.origin}${portfolioUrl}` : portfolioUrl}
                    </code>
                    <button
                      onClick={() => {
                        const url = typeof window !== 'undefined' ? `${window.location.origin}${portfolioUrl}` : portfolioUrl
                        navigator.clipboard.writeText(url)
                      }}
                      className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Github className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Profile Loaded</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter a GitHub username in the sidebar to see a preview of their portfolio.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}