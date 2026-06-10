'use client'

import { GitHubProfile, GitHubRepo } from '@/types'
import { inferTechStack, inferQuickStats, formatNumber } from '@/lib/portfolio'
import {
  Star,
  GitFork,
  MapPin,
  Building,
  Twitter,
  Link2,
  ArrowUpRight,
  Code2,
  Calendar,
  Github,
  Rocket,
} from 'lucide-react'
import Image from 'next/image'

interface ModernTemplateProps {
  profile: GitHubProfile
  repos: GitHubRepo[]
  accentColor?: string
  darkMode?: boolean
}

export default function ModernTemplate({
  profile,
  repos,
  accentColor = '#0ea5e9',
  darkMode = false,
}: ModernTemplateProps) {
  const techStack = inferTechStack(repos)
  const stats = inferQuickStats(profile, repos)
  const featuredRepos = repos.filter(r => r.stargazers_count > 0).slice(0, 6)

  const bg = darkMode ? 'bg-[#0c0c12]' : 'bg-gray-50'
  const cardBg = darkMode ? 'bg-[#16161d] border-gray-800' : 'bg-white border-gray-100'
  const text = darkMode ? 'text-white' : 'text-gray-900'
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500'
  const surface = darkMode ? 'bg-[#1e1e28] border-gray-700' : 'bg-white border-gray-200'

  return (
    <div className={`min-h-screen ${bg} transition-colors`}>
      {/* === HERO: Split Layout === */}
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 w-fit"
                style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
              >
                <Rocket className="w-4 h-4" />
                <span>Developer Portfolio</span>
              </div>

              <h1 className={`text-5xl sm:text-6xl font-bold ${text} mb-4 leading-tight`}>
                {profile.name || profile.login}
              </h1>

              <p className={`text-xl ${muted} mb-6 leading-relaxed max-w-lg`}>
                {profile.bio || `Developer building things on the web. Exploring new technologies and shipping code.`}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                {profile.company && (
                  <span className={`flex items-center gap-1.5 ${muted}`}>
                    <Building className="w-4 h-4" /> {profile.company}
                  </span>
                )}
                {profile.location && (
                  <span className={`flex items-center gap-1.5 ${muted}`}>
                    <MapPin className="w-4 h-4" /> {profile.location}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: accentColor }}
                >
                  <Github className="w-4 h-4" />
                  Follow on GitHub
                </a>
                {profile.blog && (
                  <a
                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-gray-200 hover:border-gray-300 transition-colors"
                    style={{ color: accentColor }}
                  >
                    <Link2 className="w-4 h-4" />
                    Website
                  </a>
                )}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="relative">
                  <Image
                    src={profile.avatar_url}
                    alt={profile.login}
                    width={280}
                    height={280}
                    className="rounded-3xl shadow-2xl"
                  />
                  {/* Floating stats cards */}
                  <div className={`absolute -bottom-4 -left-8 ${surface} border rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg`}>
                    <Star className="w-4 h-4" style={{ color: accentColor }} />
                    <span className={`text-sm font-bold ${text}`}>{formatNumber(stats.totalStars)}</span>
                    <span className={`text-xs ${muted}`}>Stars</span>
                  </div>
                  <div className={`absolute -top-4 -right-4 ${surface} border rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg`}>
                    <Calendar className="w-4 h-4" style={{ color: accentColor }} />
                    <span className={`text-sm font-bold ${text}`}>{stats.memberSince}</span>
                    <span className={`text-xs ${muted}`}>Joined</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === TECH STACK: Horizontal Marquee === */}
      {techStack.length > 0 && (
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-5 h-5" style={{ color: accentColor }} />
              <h2 className={`text-sm font-bold uppercase tracking-widest ${muted}`}>Tech Stack</h2>
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-4 animate-marquee whitespace-nowrap px-4">
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className={`${cardBg} border rounded-2xl px-8 py-5 flex items-center gap-3 flex-shrink-0`}
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className={`font-bold ${text} text-lg`}>{tech.name}</span>
                  <span className={`text-sm ${muted}`}>{tech.count} repos</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === FEATURED PROJECTS === */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className={`text-4xl font-bold ${text} mb-2`}>Featured Projects</h2>
              <p className={muted}>{repos.length} public repositories — here are the highlights</p>
            </div>
          </div>

          {featuredRepos.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {featuredRepos.map((repo, i) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${cardBg} border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 ${
                    i === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium`}
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      <Star className="w-3.5 h-3.5" />
                      {repo.stargazers_count} stars
                    </div>
                    <ArrowUpRight className={`w-5 h-5 ${muted} group-hover:text-primary-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
                  </div>

                  <h3 className={`text-2xl font-bold ${text} mb-3 group-hover:text-primary-600 transition-colors`}>
                    {repo.name}
                  </h3>

                  {repo.description && (
                    <p className={`${muted} mb-6 max-w-xl`}>{repo.description}</p>
                  )}

                  <div className="flex items-center gap-4 text-sm mt-auto pt-6 border-t border-gray-100/20">
                    {repo.language && (
                      <span className={`flex items-center gap-1.5 ${muted}`}>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                        {repo.language}
                      </span>
                    )}
                    <span className={`flex items-center gap-1 ${muted}`}>
                      <GitFork className="w-4 h-4" />
                      {repo.forks_count}
                    </span>
                    <span className={`text-xs ${muted}`}>
                      Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : repos.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {repos.slice(0, 6).map((repo, i) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${cardBg} border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 ${i === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <h3 className={`text-2xl font-bold ${text} mb-3 group-hover:text-primary-600 transition-colors`}>
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className={`${muted} mb-6`}>{repo.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm pt-6 border-t border-gray-100/20">
                    {repo.language && <span className={muted}>{repo.language}</span>}
                    <span className={`flex items-center gap-1 ${muted}`}><Star className="w-4 h-4" /> {repo.stargazers_count}</span>
                    <span className={muted}>Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className={`${muted} text-center py-12`}>No public repositories yet.</p>
          )}
        </div>
      </section>

      {/* === GITHUB STATS BAR === */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`${cardBg} border rounded-3xl p-8 sm:p-12`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: accentColor }}>{formatNumber(stats.totalStars)}</div>
                <div className={`text-sm ${muted} uppercase tracking-widest`}>Total Stars</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: accentColor }}>{formatNumber(stats.totalForks)}</div>
                <div className={`text-sm ${muted} uppercase tracking-widest`}>Total Forks</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: accentColor }}>{profile.public_repos}</div>
                <div className={`text-sm ${muted} uppercase tracking-widest`}>Repositories</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: accentColor }}>{profile.followers}</div>
                <div className={`text-sm ${muted} uppercase tracking-widest`}>Followers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === ALL REPOS LIST === */}
      {repos.length > (featuredRepos.length || 0) && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-2xl font-bold ${text} mb-8`}>More Repositories</h2>
            <div className="grid gap-3">
              {repos.slice(featuredRepos.length).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardBg} border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-all`}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold ${text} truncate`}>{repo.name}</h4>
                    {repo.description && <p className={`text-sm ${muted} truncate`}>{repo.description}</p>}
                  </div>
                  <div className="flex items-center gap-4 text-sm flex-shrink-0 ml-4">
                    {repo.language && <span className={muted}>{repo.language}</span>}
                    <span className={muted}><Star className="w-3.5 h-3.5 inline mr-1" />{repo.stargazers_count}</span>
                    <ArrowUpRight className={`w-4 h-4 ${muted}`} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === FOOTER === */}
      <footer className={`py-16 px-4 sm:px-6 lg:px-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: accentColor }}>
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <p className={muted}>
            Generated with <span className="font-semibold" style={{ color: accentColor }}>Portfolyo</span>
          </p>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Github className="w-4 h-4" />
            github.com/{profile.login}
          </a>
        </div>
      </footer>
    </div>
  )
}
