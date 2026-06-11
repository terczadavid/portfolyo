'use client'

import { GitHubProfile, GitHubRepo, CustomOptions } from '@/types'
import { inferTechStack, inferQuickStats, formatNumber, sortRepos } from '@/lib/portfolio'
import { Star, GitFork, MapPin, Building, Twitter, Link2, ArrowUpRight, Code2, Calendar, Github, FileText } from 'lucide-react'
import Image from 'next/image'

interface Props { profile: GitHubProfile; repos: GitHubRepo[]; options: CustomOptions }

function avatarClass(shape: string) {
  if (shape === 'square') return 'rounded-none'
  if (shape === 'rounded') return 'rounded-2xl'
  return 'rounded-full'
}

function cardBorderRadius(style: string) {
  if (style === 'square') return 'rounded-none'
  return 'rounded-2xl'
}

function cardStyleClass(style: string, dark: boolean) {
  if (style === 'borderless') return dark ? 'bg-[#111118]' : 'bg-gray-50'
  if (style === 'square') return dark ? 'bg-[#111118] border-gray-800 border' : 'bg-white border border-gray-100'
  return dark ? 'bg-[#111118] border-gray-800 border' : 'bg-white border border-gray-100'
}

export default function DefaultTemplate({ profile, repos, options }: Props) {
  const accent = options.accent; const dark = options.dark
  const sortedRepos = sortRepos(repos, options.projectSort)
  const techStack = inferTechStack(repos)
  const stats = inferQuickStats(profile, repos)
  const featuredRepos = sortedRepos.filter(r => r.stargazers_count > 0).slice(0, 6)

  const bg = dark ? 'bg-[#0a0a0f]' : 'bg-white'
  const cardBg = cardStyleClass(options.cardStyle, dark)
  const radius = cardBorderRadius(options.cardStyle)
  const text = dark ? 'text-white' : 'text-gray-900'
  const muted = dark ? 'text-gray-400' : 'text-gray-500'
  const bgStyles: Record<string, string> = {
    solid: '', dots: dark
      ? 'bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:20px_20px]'
      : 'bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:20px_20px]',
    grid: dark
      ? 'bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:40px_40px]'
      : 'bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:40px_40px]',
    gradient: dark ? 'bg-gradient-to-br from-[#0a0a0f] to-[#12121e]' : 'bg-gradient-to-br from-white to-gray-50',
  }

  return (
    <div className={`min-h-screen ${bg} ${bgStyles[options.bgStyle] || ''} transition-colors`} style={{ fontFamily: options.font === 'JetBrains Mono' ? 'JetBrains Mono,monospace' : options.font === 'Playfair' ? 'Playfair Display,serif' : options.font === 'Geist' ? 'Geist,system-ui,sans-serif' : 'Inter,system-ui,sans-serif' }}>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`flex items-center justify-between h-16 ${dark ? 'bg-[#0a0a0f]/80' : 'bg-white/80'} backdrop-blur-md rounded-b-2xl mx-2 px-4`}>
            <span className={`font-bold text-lg ${text}`}>{profile.name || profile.login}</span>
            <div className="flex items-center gap-4">
              <a href={`/resume/${profile.login}?accent=${encodeURIComponent(options.accent)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: options.accent }}><FileText className="w-4 h-4" /> Resume</a>
              <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"><Github className="w-4 h-4" /> GitHub</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="absolute -inset-1 rounded-full blur-md opacity-50" style={{ backgroundColor: accent }} />
            <Image src={profile.avatar_url} alt={profile.login} width={128} height={128} className={`relative ${avatarClass(options.avatarShape)} border-4 border-white shadow-xl`} />
          </div>
          <h1 className={`text-4xl sm:text-5xl font-bold ${text} mb-3`}>{profile.name || profile.login}</h1>
          <p className={`text-lg ${muted} max-w-lg mb-6`}>{profile.bio || `Developer passionate about building things that matter.`}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {profile.company && <span className={`flex items-center gap-1.5 ${muted} text-sm`}><Building className="w-4 h-4" /> {profile.company}</span>}
            {profile.location && <span className={`flex items-center gap-1.5 ${muted} text-sm`}><MapPin className="w-4 h-4" /> {profile.location}</span>}
            {profile.twitter_username && <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 ${muted} text-sm hover:underline`}><Twitter className="w-4 h-4" /> @{profile.twitter_username}</a>}
            {profile.blog && <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 ${muted} text-sm hover:underline`}><Link2 className="w-4 h-4" /> Website</a>}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className={`${cardBg} ${radius} px-4 py-2 flex items-center gap-2`}><Star className="w-4 h-4" style={{ color: accent }} /><span className={`font-bold ${text}`}>{formatNumber(stats.totalStars)}</span><span className={muted}>Stars</span></div>
            <div className={`${cardBg} ${radius} px-4 py-2 flex items-center gap-2`}><GitFork className="w-4 h-4" style={{ color: accent }} /><span className={`font-bold ${text}`}>{formatNumber(stats.totalForks)}</span><span className={muted}>Forks</span></div>
            <div className={`${cardBg} ${radius} px-4 py-2 flex items-center gap-2`}><Calendar className="w-4 h-4" style={{ color: accent }} /><span className={`font-bold ${text}`}>{stats.memberSince}</span><span className={muted}>Joined</span></div>
          </div>
        </div>
      </section>

      {options.showTechStack && techStack.length > 0 && (
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8"><Code2 className="w-5 h-5" style={{ color: accent }} /><h2 className={`text-2xl font-bold ${text}`}>Tech Stack</h2></div>
            <div className="flex flex-wrap gap-3">
              {techStack.map(tech => <div key={tech.name} className={`${cardBg} ${radius} px-5 py-3 flex items-center gap-3 hover:shadow-md transition-shadow`}><span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: tech.color }} /><span className={`font-semibold ${text}`}>{tech.name}</span><span className={`text-sm ${muted}`}>{tech.count} repos</span></div>)}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-2"><Star className="w-5 h-5" style={{ color: accent }} /><h2 className={`text-2xl font-bold ${text}`}>Featured Projects</h2></div><span className={`text-sm ${muted}`}>{repos.length} public repositories</span></div>
          {(featuredRepos.length > 0 ? featuredRepos : sortedRepos.slice(0, 6)).map((repo: GitHubRepo) => <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`group ${cardBg} ${radius} p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block`}>
            <div className="flex items-start justify-between mb-3"><h3 className={`font-bold ${text} group-hover:text-primary-600 transition-colors`}>{repo.name}</h3><ArrowUpRight className={`w-4 h-4 ${muted} opacity-0 group-hover:opacity-100 transition-opacity`} /></div>
            {repo.description && <p className={`text-sm ${muted} mb-4 line-clamp-2`}>{repo.description}</p>}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/50">
              <div className="flex items-center gap-4 text-sm">
                {repo.language && <span className={`flex items-center gap-1.5 ${muted}`}><span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />{repo.language}</span>}
                <span className={`flex items-center gap-1 ${muted}`}><Star className="w-3.5 h-3.5" />{repo.stargazers_count}</span>
              </div>
              <span className={`text-xs ${muted}`}>{new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </a>)}
          {(featuredRepos.length === 0 && sortedRepos.length === 0) && <p className={`text-center ${muted} py-12`}>No repositories yet.</p>}
        </div>
      </section>

      {options.showAllRepos && sortedRepos.length > 6 && <section className="py-12 px-4 sm:px-6"><div className="max-w-6xl mx-auto"><h2 className={`text-2xl font-bold ${text} mb-8`}>All Repositories</h2><div className="grid gap-3">{sortedRepos.slice(6).map(repo => <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`${cardBg} ${radius} p-4 flex items-center justify-between hover:shadow-sm transition-all`}><div className="flex-1 min-w-0"><h4 className={`font-semibold ${text} truncate`}>{repo.name}</h4>{repo.description && <p className={`text-sm ${muted} truncate`}>{repo.description}</p>}</div><div className="flex items-center gap-4 text-sm flex-shrink-0 ml-4"><span className={`flex items-center gap-1 ${muted}`}><Star className="w-3.5 h-3.5" />{repo.stargazers_count}</span><ArrowUpRight className={`w-4 h-4 ${muted}`} /></div></a>)}</div></div></section>}

      {options.showStats && <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`${cardBg} ${radius} p-8`}>
            <div className="grid grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold" style={{ color: accent }}>{formatNumber(stats.totalStars)}</div><div className={`text-xs ${muted} uppercase`}>Stars</div></div>
              <div><div className="text-3xl font-bold" style={{ color: accent }}>{formatNumber(stats.totalForks)}</div><div className={`text-xs ${muted} uppercase`}>Forks</div></div>
              <div><div className="text-3xl font-bold" style={{ color: accent }}>{profile.public_repos}</div><div className={`text-xs ${muted} uppercase`}>Repos</div></div>
              <div><div className="text-3xl font-bold" style={{ color: accent }}>{profile.followers}</div><div className={`text-xs ${muted} uppercase`}>Followers</div></div>
            </div>
          </div>
        </div>
      </section>}

      {options.showFooter && <footer className={`py-12 px-4 sm:px-6 border-t ${dark ? 'border-gray-800' : 'border-gray-200'}`}><div className="max-w-6xl mx-auto text-center"><p className={muted}>Generated with <span className="font-semibold text-primary-600">Portfolyo</span></p><a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm text-gray-400 hover:text-gray-600"><Github className="w-4 h-4" /> github.com/{profile.login}</a></div></footer>}
    </div>
  )
}
