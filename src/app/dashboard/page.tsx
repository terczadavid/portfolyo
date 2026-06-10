'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, Palette, Moon, Sun, Monitor, Layout, LayoutGrid, ExternalLink, Eye, Loader2, ArrowLeft } from 'lucide-react'
import { GitHubProfile, GitHubRepo } from '@/types'

const COLORS = [
  { name: 'Blue', value: '#0ea5e9' }, { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' }, { name: 'Orange', value: '#f97316' },
  { name: 'Green', value: '#22c55e' }, { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#eab308' }, { name: 'Cyan', value: '#06b6d4' },
  { name: 'Indigo', value: '#6366f1' }, { name: 'Slate', value: '#64748b' },
]

const TEMPLATES = [
  { id: 'default', name: 'Default', icon: Layout, desc: 'Clean centered hero' },
  { id: 'modern', name: 'Modern', icon: LayoutGrid, desc: 'Split with side profile' },
]

export default function Dashboard() {
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [template, setTemplate] = useState('default')
  const [accentColor, setAccentColor] = useState(COLORS[0].value)
  const [darkMode, setDarkMode] = useState(false)

  async function fetchProfile() {
    if (!username.trim()) return
    setLoading(true); setError('')
    try {
      const res = await fetch(`/api/github-portfolio?username=${encodeURIComponent(username.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setProfile(data.profile); setRepos(data.repos)
    } catch (err) { setError(err instanceof Error ? err.message : 'Error'); setProfile(null); setRepos([]) }
    finally { setLoading(false) }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') fetchProfile() }
  const url = `/p/${username}?template=${template}&accent=${encodeURIComponent(accentColor)}&dark=${darkMode}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900"><ArrowLeft className="w-4 h-4" /> Back</Link>
            <h1 className="font-semibold">Dashboard</h1>
          </div>
          {profile && <Link href={url} target="_blank" className="flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700"><ExternalLink className="w-4 h-4" /> View</Link>}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><Github className="w-5 h-5" /> GitHub Profile</h2>
              <div className="space-y-3">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} placeholder="e.g. octocat"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none text-sm" />
                <button onClick={fetchProfile} disabled={loading || !username.trim()} className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />} {loading ? 'Loading...' : 'Fetch Profile'}
                </button>
              </div>
              {error && <p className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
            </div>

            {profile && <>
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h2 className="font-semibold mb-4 flex items-center gap-2"><Layout className="w-5 h-5" /> Template</h2>
                <div className="space-y-3">{TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setTemplate(t.id)} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${template === t.id ? 'border-primary-500 bg-primary-50' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${template === t.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100'}`}><t.icon className="w-5 h-5" /></div>
                      <div><div className="font-medium text-sm">{t.name}</div><div className="text-xs text-gray-500">{t.desc}</div></div>
                    </div>
                  </button>
                ))}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h2 className="font-semibold mb-4 flex items-center gap-2"><Palette className="w-5 h-5" /> Accent Color</h2>
                <div className="grid grid-cols-5 gap-2">{COLORS.map(c => (
                  <button key={c.value} onClick={() => setAccentColor(c.value)} className={`w-10 h-10 rounded-xl transition-all ${accentColor === c.value ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : ''}`} style={{ backgroundColor: c.value }} title={c.name} />
                ))}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h2 className="font-semibold mb-4 flex items-center gap-2"><Monitor className="w-5 h-5" /> Appearance</h2>
                <div className="flex gap-2">
                  <button onClick={() => setDarkMode(false)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 ${!darkMode ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-100'}`}><Sun className="w-4 h-4" /><span className="text-sm font-medium">Light</span></button>
                  <button onClick={() => setDarkMode(true)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 ${darkMode ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-100'}`}><Moon className="w-4 h-4" /><span className="text-sm font-medium">Dark</span></button>
                </div>
              </div>
            </>}
          </div>
          <div>
            {profile ? (
              <>
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-6">
                  <div className="border-b px-6 py-3 flex items-center justify-between">
                    <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" /></div>
                    <span className="text-sm text-gray-500 font-mono">Preview</span>
                  </div>
                  <div className="h-[650px] bg-gray-100"><iframe src={url} className="w-full h-full" title="Preview" /></div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h3 className="font-semibold mb-3">Share Your Portfolio</h3>
                  <p className="text-sm text-gray-600 mb-4">Copy this link and share it anywhere.</p>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-gray-50 px-4 py-3 rounded-lg text-sm font-mono text-gray-700 truncate">{typeof window !== 'undefined' ? window.location.origin + url : url}</code>
                    <button onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.origin + url : url)} className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium">Copy</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><Github className="w-8 h-8 text-gray-400" /></div>
                <h3 className="font-semibold mb-2">No Profile Loaded</h3>
                <p className="text-gray-600">Enter a GitHub username to preview their portfolio.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}