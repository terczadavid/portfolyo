'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, Palette, Moon, Sun, Monitor, Layout, LayoutGrid, Minimize, Grid3x3, ExternalLink, Eye, Loader2, ArrowLeft, Type, Square, ImageIcon, Layers, ArrowDownUp, EyeIcon, EyeOff, FileText } from 'lucide-react'
import { GitHubProfile, GitHubRepo } from '@/types'

const COLORS = [
  { name: 'Blue', value: '#0ea5e9' }, { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' }, { name: 'Orange', value: '#f97316' },
  { name: 'Green', value: '#22c55e' }, { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#eab308' }, { name: 'Cyan', value: '#06b6d4' },
  { name: 'Indigo', value: '#6366f1' }, { name: 'Slate', value: '#64748b' },
]

const TEMPLATES = [
  { id: 'default', name: 'Classic', icon: Layout, desc: 'Clean centered hero' },
  { id: 'modern', name: 'Modern', icon: LayoutGrid, desc: 'Split with side profile' },
  { id: 'minimal', name: 'Minimal', icon: Minimize, desc: 'Ultra clean text-first' },
  { id: 'bento', name: 'Bento', icon: Grid3x3, desc: 'Card-based grid layout' },
]

const FONTS = [
  { id: 'Inter', label: 'Inter (Clean)' },
  { id: 'JetBrains Mono', label: 'JetBrains Mono (Code)' },
  { id: 'Playfair', label: 'Playfair (Elegant)' },
  { id: 'Geist', label: 'Geist (Modern)' },
]

const AVATAR_SHAPES = [
  { id: 'circle', label: 'Circle' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'square', label: 'Square' },
]

const CARD_STYLES = [
  { id: 'rounded', label: 'Rounded' },
  { id: 'square', label: 'Square' },
  { id: 'borderless', label: 'Flat' },
]

const BG_STYLES = [
  { id: 'solid', label: 'Solid' },
  { id: 'dots', label: 'Dots' },
  { id: 'grid', label: 'Grid' },
  { id: 'gradient', label: 'Gradient' },
]

const SORT_OPTIONS = [
  { id: 'stars', label: 'Most Stars' },
  { id: 'updated', label: 'Recently Updated' },
  { id: 'forks', label: 'Most Forks' },
]

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      <span className="text-sm text-gray-700">{label}</span>
      <div className={`w-10 h-6 rounded-full transition-colors ${checked ? 'bg-primary-600' : 'bg-gray-200'}`}><div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform m-0.5 ${checked ? 'translate-x-4' : ''}`} /></div>
    </button>
  )
}

export default function Dashboard() {
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Customization state
  const [template, setTemplate] = useState('default')
  const [font, setFont] = useState('Inter')
  const [accentColor, setAccentColor] = useState(COLORS[0].value)
  const [darkMode, setDarkMode] = useState(false)
  const [avatarShape, setAvatarShape] = useState('circle')
  const [cardStyle, setCardStyle] = useState('rounded')
  const [bgStyle, setBgStyle] = useState('solid')
  const [showTechStack, setShowTechStack] = useState(true)
  const [showAllRepos, setShowAllRepos] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [showFooter, setShowFooter] = useState(true)
  const [projectSort, setProjectSort] = useState('stars')

  const activeOptions = {
    font, accent: accentColor, dark: darkMode, avatarShape, cardStyle, bgStyle,
    showTechStack, showAllRepos, showStats, showFooter, projectSort,
  }

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

  const params = new URLSearchParams({ template, font, accent: accentColor, dark: darkMode.toString(), avatarShape, cardStyle, bgStyle, showTechStack: showTechStack.toString(), showAllRepos: showAllRepos.toString(), showStats: showStats.toString(), showFooter: showFooter.toString(), projectSort })
  const url = `/p/${username}?${params.toString()}`
  const resumeUrl = `/resume/${username}?accent=${encodeURIComponent(accentColor)}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900"><ArrowLeft className="w-4 h-4" /> Back</Link>
            <h1 className="font-semibold">Dashboard</h1>
          </div>
          {profile && <div className="flex items-center gap-2">
              <Link href={url} target="_blank" className="flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700"><ExternalLink className="w-4 h-4" /> View</Link>
              <Link href={resumeUrl} target="_blank" className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors"><FileText className="w-4 h-4" /> Resume</Link>
            </div>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm border">
              <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Github className="w-4 h-4" /> GitHub Profile</h2>
              <div className="space-y-2">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} placeholder="e.g. octocat" className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none text-sm" />
                <button onClick={fetchProfile} disabled={loading || !username.trim()} className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />} {loading ? 'Loading...' : 'Fetch Profile'}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
            </div>

            {profile && <>
              {/* Template */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Layout className="w-4 h-4" /> Template</h2>
                <div className="grid grid-cols-2 gap-2">{TEMPLATES.map(t => <button key={t.id} onClick={() => setTemplate(t.id)} className={`text-left p-3 rounded-xl border-2 transition-all ${template === t.id ? 'border-primary-500 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}><div className="flex items-center gap-2"><div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${template === t.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100'}`}><t.icon className="w-3.5 h-3.5" /></div><div className="text-xs"><div className="font-medium">{t.name}</div><div className="text-gray-500 text-[10px]">{t.desc}</div></div></div></button>)}</div>
              </div>

              {/* Font */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Type className="w-4 h-4" /> Font</h2>
                <div className="grid grid-cols-2 gap-2">{FONTS.map(f => <button key={f.id} onClick={() => setFont(f.id)} className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${font === f.id ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-100 text-gray-600 hover:border-gray-200'}`}>{f.label}</button>)}</div>
              </div>

              {/* Color */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Palette className="w-4 h-4" /> Accent Color</h2>
                <div className="grid grid-cols-5 gap-2">{COLORS.map(c => <button key={c.value} onClick={() => setAccentColor(c.value)} className={`w-8 h-8 rounded-lg transition-all ${accentColor === c.value ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`} style={{ backgroundColor: c.value }} title={c.name} />)}</div>
              </div>

              {/* Appearance */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Monitor className="w-4 h-4" /> Appearance</h2>
                <div className="space-y-3">
                  <Toggle label="Dark Mode" checked={darkMode} onChange={setDarkMode} />
                  <div className="pt-2 border-t"><p className="text-xs font-medium text-gray-500 mb-2">Avatar Shape</p><div className="flex gap-2">{AVATAR_SHAPES.map(s => <button key={s.id} onClick={() => setAvatarShape(s.id)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border-2 ${avatarShape === s.id ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-100'}`}>{s.label}</button>)}</div></div>
                  <div className="pt-2 border-t"><p className="text-xs font-medium text-gray-500 mb-2">Card Style</p><div className="flex gap-2">{CARD_STYLES.map(s => <button key={s.id} onClick={() => setCardStyle(s.id)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border-2 ${cardStyle === s.id ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-100'}`}>{s.label}</button>)}</div></div>
                  <div className="pt-2 border-t"><p className="text-xs font-medium text-gray-500 mb-2">Background</p><div className="flex gap-2">{BG_STYLES.map(s => <button key={s.id} onClick={() => setBgStyle(s.id)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border-2 ${bgStyle === s.id ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-100'}`}>{s.label}</button>)}</div></div>
                </div>
              </div>

              {/* Sections */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Layers className="w-4 h-4" /> Sections</h2>
                <Toggle label="Tech Stack" checked={showTechStack} onChange={setShowTechStack} />
                <Toggle label="All Repositories" checked={showAllRepos} onChange={setShowAllRepos} />
                <Toggle label="Stats Bar" checked={showStats} onChange={setShowStats} />
                <Toggle label="Footer" checked={showFooter} onChange={setShowFooter} />
              </div>

              {/* Sort */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm"><ArrowDownUp className="w-4 h-4" /> Sort Projects</h2>
                <div className="space-y-1">{SORT_OPTIONS.map(s => <button key={s.id} onClick={() => setProjectSort(s.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${projectSort === s.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>{s.label}</button>)}</div>
              </div>
            </>}
          </div>

          {/* Preview */}
          <div>
            {profile ? (
              <>
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-5">
                  <div className="border-b px-5 py-2.5 flex items-center justify-between">
                    <div className="flex gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><div className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
                    <span className="text-xs text-gray-400 font-mono">Preview — {template} mode</span>
                  </div>
                  <div className="h-[650px] bg-gray-100"><iframe src={url} className="w-full h-full" title="Preview" /></div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border">
                  <h3 className="font-semibold mb-2 text-sm">Share Your Portfolio</h3>
                  <p className="text-sm text-gray-600 mb-3">Copy this link and share it anywhere.</p>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-gray-50 px-3 py-2.5 rounded-lg text-xs font-mono text-gray-700 truncate">{typeof window !== 'undefined' ? window.location.origin + url : url}</code>
                    <button onClick={() => navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.origin + url : url)} className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium">Copy</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><Github className="w-8 h-8 text-gray-400" /></div>
                <h3 className="font-semibold mb-2">No Profile Loaded</h3><p className="text-sm text-gray-600">Enter a GitHub username to preview their portfolio.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
