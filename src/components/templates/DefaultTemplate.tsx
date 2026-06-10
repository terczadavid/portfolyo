'use client'

import { GitHubProfile, GitHubRepo } from '@/types'
import {
  Star,
  GitFork,
  ExternalLink,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Building,
  Mail,
} from 'lucide-react'
import Image from 'next/image'

interface DefaultTemplateProps {
  profile: GitHubProfile
  repos: GitHubRepo[]
  accentColor?: string
  darkMode?: boolean
}

export default function DefaultTemplate({
  profile,
  repos,
  accentColor = '#0ea5e9',
  darkMode = false,
}: DefaultTemplateProps) {
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50'
  const card = darkMode ? 'bg-gray-800' : 'bg-white'
  const text = darkMode ? 'text-gray-100' : 'text-gray-900'
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600'

  return (
    <div className={`min-h-screen ${bg} transition-colors`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: accentColor }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <Image
                src={profile.avatar_url}
                alt={profile.login}
                width={120}
                height={120}
                className="rounded-2xl border-4 border-white shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>
                {profile.name || profile.login}
              </h1>
              {profile.bio && (
                <p className={`text-lg ${textSecondary} mb-4`}>{profile.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm">
                {profile.company && (
                  <span className={`flex items-center gap-1.5 ${textSecondary}`}>
                    <Building className="w-4 h-4" />
                    {profile.company}
                  </span>
                )}
                {profile.location && (
                  <span className={`flex items-center gap-1.5 ${textSecondary}`}>
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                )}
                {profile.blog && (
                  <a
                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 ${textSecondary} hover:text-primary-600 transition-colors`}
                  >
                    <LinkIcon className="w-4 h-4" />
                    {profile.blog}
                  </a>
                )}
                {profile.twitter_username && (
                  <a
                    href={`https://twitter.com/${profile.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 ${textSecondary} hover:text-primary-600 transition-colors`}
                  >
                    <Twitter className="w-4 h-4" />
                    @{profile.twitter_username}
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-4 mt-8 ${card} p-6 rounded-2xl shadow-sm`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profile.public_repos}</div>
              <div className={`text-sm ${textSecondary}`}>Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profile.followers}</div>
              <div className={`text-sm ${textSecondary}`}>Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profile.following}</div>
              <div className={`text-sm ${textSecondary}`}>Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositories */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className={`text-2xl font-bold ${text} mb-8`}>Featured Projects</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {repos.slice(0, 6).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card} p-6 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all group`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className={`font-semibold ${text} group-hover:text-primary-600 transition-colors`}>
                  {repo.name}
                </h3>
                < ExternalLink className={`w-4 h-4 ${textSecondary} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              {repo.description && (
                <p className={`text-sm ${textSecondary} mb-4 line-clamp-2`}>{repo.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm">
                {repo.language && (
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <span className="w-3 h-3 rounded-full bg-primary-500" style={{ backgroundColor: accentColor }} />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-500">
                  <Star className="w-4 h-4" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <GitFork className="w-4 h-4" />
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
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-8`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className={`text-sm ${textSecondary}`}>
            Generated with <span className="font-semibold text-primary-600">Portfolyo</span> — Free portfolio generator for developers
          </p>
        </div>
      </footer>
    </div>
  )
}