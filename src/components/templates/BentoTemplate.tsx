'use client'

import { GitHubProfile, GitHubRepo, CustomOptions } from '@/types'
import { inferTechStack, inferQuickStats, sortRepos, formatNumber } from '@/lib/portfolio'
import { Star, GitFork, MapPin, Building, Twitter, Link2, ArrowUpRight, Code2, Calendar, Github, FileText }
import Image from 'next/image'

interface Props { profile: GitHubProfile; repos: GitHubRepo[]; options: CustomOptions }

export default function BentoTemplate({ profile, repos, options }: Props) {
  const accent = options.accent; const dark = options.dark
  const sorted = sortRepos(repos, options.projectSort)
  const techStack = inferTechStack(repos)
  const stats = inferQuickStats(profile, repos)
  const shape = options.avatarShape === 'square' ? 'rounded-none' : options.avatarShape === 'rounded' ? 'rounded-2xl' : 'rounded-full'
  const card = dark ? 'bg-[#1a1a24] border-gray-800' : 'bg-white border-gray-200'
  const text = dark ? 'text-white' : 'text-gray-900'
  const muted = dark ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`min-h-screen ${dark ? 'bg-[#0a0a10]' : 'bg-gray-50'} p-4 sm:p-8`} style={{ fontFamily: options.font === 'Playfair' ? 'Playfair Display,serif' : options.font === 'JetBrains Mono' ? 'JetBrains Mono,monospace' : options.font === 'Geist' ? 'Geist,system-ui,sans-serif' : 'Inter,system-ui,sans-serif' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className={`md:col-span-2 ${card} border rounded-2xl p-6`}>
            <div className="flex items-center gap-4">
              <Image src={profile.avatar_url} alt={profile.login} width={64} height={64} className={`${shape} border-2 border-white/10`} />
              <div><h1 className={`text-2xl font-bold ${text}`}>{profile.name || profile.login}</h1><p className={`${muted} text-sm`}>{profile.bio || 'Developer'}</p></div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              {profile.company && <span className={muted}><Building className="w-3.5 inline mr-1" />{profile.company}</span>}
              {profile.location && <span className={muted}><MapPin className="w-3.5 inline mr-1" />{profile.location}</span>}
              {profile.blog && <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className={muted}><Link2 className="w-3.5 inline mr-1" />Website</a>}
            </div>
          </div>
          <div className={`${card} border rounded-2xl p-6 flex flex-col justify-center`}>
            <div className="grid grid-cols-2 gap-4"><div><div className="text-2xl font-bold" style={{ color: accent }}>{sorted.length}</div><div className={`text-xs ${muted}`}>Repos</div></div><div><div className="text-2xl font-bold" style={{ color: accent }}>{stats.totalStars}</div><div className={`text-xs ${muted}`}>Stars</div></div></div>
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="mt-4 text-center text-sm font-medium py-2 rounded-lg text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: accent }}><Github className="w-4 h-4 inline mr-1" />GitHub</a>
            <a href={`/resume/${profile.login}?accent=${encodeURIComponent(accent)}`} target="_blank" rel="noopener noreferrer" className="mt-2 text-center text-sm font-medium py-2 rounded-lg border hover:shadow-sm transition-all" style={{ borderColor: `${accent}40`, color: accent }}><FileText className="w-4 h-4 inline mr-1" />Resume</a>
          </div>
        </div>

        {options.showTechStack && techStack.length > 0 && (
          <div className={`${card} border rounded-2xl p-6 mb-6`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${muted}`}>Tech Stack</h3>
            <div className="flex flex-wrap gap-2">{techStack.map(t => <span key={t.name} className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ backgroundColor: `${accent}15`, color: accent }}>{t.name}</span>)}</div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.slice(0, 9).map(repo => <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`group ${card} border rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all`}><div className="flex items-start justify-between mb-3"><h4 className={`font-semibold ${text}`}>{repo.name}</h4><ArrowUpRight className={`w-4 h-4 ${muted} group-hover:text-gray-900`} /></div><p className={`text-sm ${muted} line-clamp-2`}>{repo.description || ''}</p><div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100/20 text-sm">{repo.language && <span className={muted}>{repo.language}</span>}<span className={muted}><Star className="w-3.5 inline mr-1" />{repo.stargazers_count}</span></div></a>)}
        </div>

        {options.showStats && <div className={`${card} border rounded-2xl p-6 mt-6`}>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div><div className="text-2xl font-bold" style={{ color: accent }}>{stats.topLang}</div><div className={`text-xs ${muted}`}>Top Lang</div></div>
            <div><div className="text-2xl font-bold" style={{ color: accent }}>{profile.followers}</div><div className={`text-xs ${muted}`}>Followers</div></div>
            <div><div className="text-2xl font-bold" style={{ color: accent }}>{profile.following}</div><div className={`text-xs ${muted}`}>Following</div></div>
            <div><div className="text-2xl font-bold" style={{ color: accent }}>{stats.memberSince}</div><div className={`text-xs ${muted}`}>Joined</div></div>
          </div>
        </div>}

        {options.showFooter && <footer className={`text-center py-12 ${muted} text-sm`}> Generated with <span style={{ color: accent }} className="font-semibold">Portfolyo</span></footer>}
      </div>
    </div>
  )
}
