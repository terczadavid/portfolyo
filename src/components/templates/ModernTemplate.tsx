'use client'

import { GitHubProfile, GitHubRepo, CustomOptions } from '@/types'
import { inferTechStack, inferQuickStats, formatNumber, sortRepos } from '@/lib/portfolio'
import { Star, GitFork, MapPin, Building, Twitter, Link2, ArrowUpRight, Code2, Calendar, Github, Rocket, FileText } from 'lucide-react'
import Image from 'next/image'

interface Props { profile: GitHubProfile; repos: GitHubRepo[]; options: CustomOptions }

function avatarClass(shape: string) {
  if (shape === 'square') return 'rounded-none'
  if (shape === 'rounded') return 'rounded-2xl'
  return 'rounded-full'
}

function cardRadius(style: string) {
  if (style === 'square') return 'rounded-none'
  return 'rounded-2xl'
}

function cardBg(style: string, dark: boolean) {
  if (style === 'borderless') return dark ? 'bg-[#16161d]' : 'bg-gray-50'
  if (style === 'square') return dark ? 'bg-[#16161d] border-gray-800 border' : 'bg-white border border-gray-100'
  return dark ? 'bg-[#16161d] border-gray-800 border' : 'bg-white border border-gray-100'
}

export default function ModernTemplate({ profile, repos, options }: Props) {
  const accent = options.accent; const dark = options.dark
  const sortedRepos = sortRepos(repos, options.projectSort)
  const techStack = inferTechStack(repos)
  const stats = inferQuickStats(profile, repos)
  const featuredRepos = sortedRepos.filter(r => r.stargazers_count > 0).slice(0, 6)

  const bg = dark ? 'bg-[#0c0c12]' : 'bg-gray-50'
  const card = cardBg(options.cardStyle, dark)
  const radius = cardRadius(options.cardStyle)
  const text = dark ? 'text-white' : 'text-gray-900'
  const muted = dark ? 'text-gray-400' : 'text-gray-500'
  const surface = dark ? 'bg-[#1e1e28] border-gray-700' : 'bg-white border-gray-200'
  const bgImage: Record<string, string> = {
    solid: '', dots: dark ? 'bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px]' : 'bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px]',
    grid: dark ? 'bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px]' : 'bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:40px_40px]',
    gradient: dark ? 'bg-gradient-to-br from-[#0c0c12] to-[#181825]' : 'bg-gradient-to-br from-gray-50 to-white',
  }

  return (
    <div className={`min-h-screen ${bg} ${bgImage[options.bgStyle] || ''} transition-colors`} style={{ fontFamily: options.font === 'JetBrains Mono' ? 'JetBrains Mono,monospace' : options.font === 'Playfair' ? 'Playfair Display,serif' : options.font === 'Geist' ? 'Geist,system-ui,sans-serif' : 'Inter,system-ui,sans-serif' }}>
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 w-fit" style={{ backgroundColor: `${accent}15`, color: accent }}>
                <Rocket className="w-4 h-4" /><span>Developer Portfolio</span>
              </div>
              <h1 className={`text-5xl sm:text-6xl font-bold ${text} mb-4 leading-tight`}>{profile.name || profile.login}</h1>
              <p className={`text-xl ${muted} mb-6 leading-relaxed max-w-lg`}>{profile.bio || `Developer building things on the web.`}</p>
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                {profile.company && <span className={`flex items-center gap-1.5 ${muted}`}><Building className="w-4 h-4" /> {profile.company}</span>}
                {profile.location && <span className={`flex items-center gap-1.5 ${muted}`}><MapPin className="w-4 h-4" /> {profile.location}</span>}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: accent }}><Github className="w-4 h-4" /> Follow on GitHub</a>
                <a href={`/resume/${profile.login}?accent=${encodeURIComponent(accent)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-gray-200 hover:border-gray-300 transition-colors" style={{ color: accent }}><FileText className="w-4 h-4" /> Resume</a>
                {profile.blog && <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-gray-200 hover:border-gray-300 transition-colors" style={{ color: accent }}><Link2 className="w-4 h-4" /> Website</a>}
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30" style={{ backgroundColor: accent }} />
                <div className="relative">
                  <Image src={profile.avatar_url} alt={profile.login} width={280} height={280} className={`${avatarClass(options.avatarShape)} shadow-2xl`} />
                  <div className={`absolute -bottom-4 -left-8 ${surface} border rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg`}><Star className="w-4 h-4" style={{ color: accent }} /><span className={`text-sm font-bold ${text}`}>{formatNumber(stats.totalStars)}</span><span className={`text-xs ${muted}`}>Stars</span></div>
                  <div className={`absolute -top-4 -right-4 ${surface} border rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg`}><Calendar className="w-4 h-4" style={{ color: accent }} /><span className={`text-sm font-bold ${text}`}>{stats.memberSince}</span><span className={`text-xs ${muted}`}>Joined</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {options.showTechStack && techStack.length > 0 && (
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"><div className="flex items-center gap-2 mb-2"><Code2 className="w-5 h-5" style={{ color: accent }} /><h2 className={`text-sm font-bold uppercase tracking-widest ${muted}`}>Tech Stack</h2></div></div>
          <div className="relative">
            <div className="flex gap-4 whitespace-nowrap px-4">
              {[...techStack, ...techStack].map((tech, i) => <div key={`${tech.name}-${i}`} className={`${card} ${radius} px-8 py-5 flex items-center gap-3 flex-shrink-0`}><span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: tech.color }} /><span className={`font-bold ${text} text-lg`}>{tech.name}</span><span className={`text-sm ${muted}`}>{tech.count} repos</span></div>)}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12"><div><h2 className={`text-4xl font-bold ${text} mb-2`}>Featured Projects</h2><p className={muted}>{repos.length} repositories</p></div></div>
          {featuredRepos.length > 0 ? <div className="grid sm:grid-cols-2 gap-6">{featuredRepos.map((repo, i) => <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`group ${card} ${radius} p-8 hover:shadow-xl transition-all ${i === 0 ? 'sm:col-span-2' : ''}`}><div className="flex items-start justify-between mb-4"><div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: `${accent}15`, color: accent }}><Star className="w-3.5 h-3.5" />{repo.stargazers_count} stars</div><ArrowUpRight className={`w-5 h-5 ${muted} group-hover:text-primary-600 transition-all`} /></div><h3 className={`text-2xl font-bold ${text} mb-3 group-hover:text-primary-600 transition-colors`}>{repo.name}</h3>{repo.description && <p className={`${muted} mb-6 max-w-xl`}>{repo.description}</p>}<div className="flex items-center gap-4 text-sm mt-auto pt-6 border-t border-gray-100/20">{repo.language && <span className={`flex items-center gap-1.5 ${muted}`}><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />{repo.language}</span>}<span className={`flex items-center gap-1 ${muted}`}><GitFork className="w-4 h-4" />{repo.forks_count}</span><span className={`text-xs ${muted}`}>Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div></a>)}</div> : <p className={`${muted} text-center py-12`}>No repositories.</p>}
        </div>
      </section>

      {options.showStats && <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto"><div className={`${card} ${radius} p-8 sm:p-12`}><div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"><div><div className="text-4xl font-bold mb-2" style={{ color: accent }}>{formatNumber(stats.totalStars)}</div><div className={`text-sm ${muted} uppercase tracking-widest`}>Total Stars</div></div><div><div className="text-4xl font-bold mb-2" style={{ color: accent }}>{formatNumber(stats.totalForks)}</div><div className={`text-sm ${muted} uppercase`}>Total Forks</div></div><div><div className="text-4xl font-bold mb-2" style={{ color: accent }}>{profile.public_repos}</div><div className={`text-sm ${muted} uppercase`}>Repositories</div></div><div><div className="text-4xl font-bold mb-2" style={{ color: accent }}>{profile.followers}</div><div className={`text-sm ${muted} uppercase`}>Followers</div></div></div></div></div></section>}

      {options.showAllRepos && repos.length > (featuredRepos.length || 0) && <section className="py-12 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto"><h2 className={`text-2xl font-bold ${text} mb-8`}>More Repositories</h2><div className="grid gap-3">{sortedRepos.slice(featuredRepos.length).map(repo => <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`${card} ${radius} p-4 flex items-center justify-between hover:shadow-sm transition-all`}><div className="flex-1 min-w-0"><h4 className={`font-semibold ${text} truncate`}>{repo.name}</h4></div><div className="flex items-center gap-4 text-sm flex-shrink-0 ml-4">{repo.language && <span className={muted}>{repo.language}</span>}<span className={muted}><Star className="w-3.5 h-3.5 inline mr-1" />{repo.stargazers_count}</span><ArrowUpRight className={`w-4 h-4 ${muted}`} /></div></a>)}</div></div></section>}

      {options.showFooter && <footer className={`py-16 px-4 sm:px-6 lg:px-8 border-t ${dark ? 'border-gray-800' : 'border-gray-200'}`}><div className="max-w-7xl mx-auto text-center"><div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: accent }}><span className="text-white font-bold text-xl">P</span></div><p className={muted}>Generated with <span className="font-semibold" style={{ color: accent }}>Portfolyo</span></p><a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-gray-600"><Github className="w-4 h-4" />github.com/{profile.login}</a></div></footer>}
    </div>
  )
}
