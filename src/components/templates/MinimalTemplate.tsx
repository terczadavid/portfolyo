'use client'

import { GitHubProfile, GitHubRepo, CustomOptions } from '@/types'
import { inferTechStack, sortRepos, formatNumber } from '@/lib/portfolio'
import { Star, ArrowUpRight, Link2, FileText } from 'lucide-react'
import Image from 'next/image'

interface Props { profile: GitHubProfile; repos: GitHubRepo[]; options: CustomOptions }

export default function MinimalTemplate({ profile, repos, options }: Props) {
  const accent = options.accent; const dark = options.dark
  const sorted = sortRepos(repos, options.projectSort)
  const techStack = inferTechStack(repos)
  const shape = options.avatarShape === 'square' ? 'rounded-none' : options.avatarShape === 'rounded' ? 'rounded-2xl' : 'rounded-full'

  return (
    <div className={`min-h-screen ${dark ? 'bg-[#0a0a0f]' : 'bg-white'} transition-colors`} style={{ fontFamily: options.font === 'Playfair' ? 'Playfair Display,serif' : options.font === 'JetBrains Mono' ? 'JetBrains Mono,monospace' : options.font === 'Geist' ? 'Geist,system-ui,sans-serif' : 'Inter,system-ui,sans-serif' }}>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="flex items-start gap-6 mb-12">
          <Image src={profile.avatar_url} alt={profile.login} width={80} height={80} className={`${shape} object-cover`} />
          <div>
            <h1 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-gray-900'} mb-2`}>{profile.name || profile.login}</h1>
            <p className={`text-base ${dark ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>{profile.bio || 'Developer'}</p>
            <a href={`/resume/${profile.login}?accent=${encodeURIComponent(options.accent)}`} target="_blank" rel="noopener noreferrer" className="text-sm mt-2 inline-flex items-center gap-1 hover:underline" style={{ color: accent }}><FileText className="w-3.5 h-3.5" />View Resume</a>
            {profile.blog && <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className="text-sm mt-1 inline-flex items-center gap-1 hover:underline" style={{ color: accent }}><Link2 className="w-3.5 h-3.5" />{profile.blog}</a>}
          </div>
        </div>

        {options.showTechStack && techStack.length > 0 && <div className="mb-12"><h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Tech</h3><div className="flex flex-wrap gap-2">{techStack.map(t => <span key={t.name} className="text-sm font-medium" style={{ color: accent }}>{t.name}</span>)}</div></div>}

        <div className="mb-12">
          <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Projects</h3>
          <div className="space-y-4">
            {sorted.map(repo => <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-3 border-b border-gray-100/10 hover:border-gray-200/30 transition-colors"><div><h4 className={`font-medium ${dark ? 'text-white' : 'text-gray-900'} group-hover:underline underline-offset-4`}>{repo.name}</h4><p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'} mt-0.5`}>{repo.language || ''}</p></div><ArrowUpRight className={`w-4 h-4 ${dark ? 'text-gray-600' : 'text-gray-400'} group-hover:text-gray-900 transition-colors`} /></a>)}
            {sorted.length === 0 && <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No public repositories.</p>}
          </div>
        </div>

        {options.showFooter && <footer className={`pt-8 text-sm ${dark ? 'text-gray-600' : 'text-gray-400'}`}><p>Generated with <span style={{ color: accent }}>Portfolyo</span> — github.com/{profile.login}</p></footer>}
      </div>
    </div>
  )
}
