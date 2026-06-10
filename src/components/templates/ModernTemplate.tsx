'use client'

import { GitHubProfile, GitHubRepo } from '@/types'
import {
  Star,
  GitFork,
  ExternalLink,
  MapPin,
  Building,
  Link as LinkIcon,
  Twitter,
  Code2,
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
  const bg = darkMode ? 'bg-slate-950' : 'bg-white'
  const card = darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-gray-50 border-gray-200'
  const text = darkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = darkMode ? 'text-slate-400' : 'text-gray-500'

  return (
    <div className={`min-h-screen ${bg} transition-colors`}>
      {/* Hero Section - Left aligned */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
          <div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${text} mb-6 tracking-tight`}>
              {profile.name || profile.login}
            </h1>
            {profile.bio && (
              <p className={`text-xl ${textSecondary} mb-8 leading-relaxed max-w-2xl`}>
                {profile.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-3 mb-8">
              {profile.company && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${card} border ${text}`}>
                  <Building className="w-4 h-4" />
                  {profile.company}
                </span>
              )}
              {profile.location && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${card} border ${text}`}>
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
              {profile.twitter_username && (
                <a
                  href={`https://twitter.com/${profile.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${card} ${text} hover:opacity-80`}
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              )}
              {profile.blog && (
                <a
                  href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${card} ${text} hover:opacity-80`}
                >
                  <LinkIcon className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>

          {/* Profile card */}
          <div className={`${card} border rounded-2xl p-6 text-center`}>
            <div className="relative inline-block mb-4">
              <Image
                src={profile.avatar_url}
                alt={profile.login}
                width={160}
                height={160}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.public_repos}</div>
                <div className={`text-xs ${textSecondary}`}>Repos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.followers}</div>
                <div className={`text-xs ${textSecondary}`}>Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profile.following}</div>
                <div className={`text-xs ${textSecondary}`}>Following</div>
              </div>
            </div>
            <p className={`text-sm ${textSecondary}`}>
              Member since {new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>
      </div>

      {/* Repositories Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <Code2 className="w-6 h-6" style={{ color: accentColor }} />
          <h2 className={`text-2xl font-bold ${text}`}>Projects</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.slice(0, 9).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card} border rounded-2xl p-6 hover:shadow-lg transition-all group`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className={`font-semibold ${text} group-hover:text-primary-600 transition-colors`}>
                  {repo.name}
                </h3>
                <ExternalLink className={`w-4 h-4 ${textSecondary} opacity-0 group-hover:opacity-100 transition-all`} />
              </div>
              {repo.description && (
                <p className={`text-sm ${textSecondary} mb-4 line-clamp-2`}>{repo.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm mt-auto">
                {repo.language && (
                  <span className="flex items-center gap-1.5" style={{ color: accentColor }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    {repo.language}
                  </span>
                )}
                <span className={`flex items-center gap-1 ${textSecondary}`}>
                  <Star className="w-3.5 h-3.5" />
                  {repo.stargazers_count}
                </span>
                <span className={`flex items-center gap-1 ${textSecondary}`}>
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>

        {repos.length === 0 && (
          <p className={`text-center ${textSecondary} py-12`}>
            No public repositories found.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'} py-8`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className={`text-sm ${textSecondary}`}>
            Generated with <span className="font-semibold" style={{ color: accentColor }}>Portfolyo</span>
          </p>
        </div>
      </footer>
    </div>
  )
}