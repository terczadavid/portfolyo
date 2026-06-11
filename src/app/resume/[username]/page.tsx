import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'
import { inferTechStack, inferQuickStats, formatNumber } from '@/lib/portfolio'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { Star, GitFork, MapPin, Building, Globe, Link2, Github, Mail, Phone, Calendar, Download, Printer } from 'lucide-react'
import { GitHubRepo } from '@/types'

interface Props { params: { username: string }; searchParams: Record<string, string> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await fetchGitHubProfile(params.username)
  if (!profile) return { title: 'Resume Not Found' }
  return { title: `${profile.name || profile.login} — Resume`, description: `Resume for ${profile.login}` }
}

function parseAccent(params: Record<string, string>): string {
  const hex = params.accent || '#0ea5e9'
  return /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : '#0ea5e9'
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

function ResumeContent({ profile, repos, accent }: { profile: any; repos: GitHubRepo[]; accent: string }) {
  const techStack = inferTechStack(repos)
  const stats = inferQuickStats(profile, repos)
  const topRepos = repos.slice(0, 6)

  return (
    <main className="resume-page">
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .resume-container { box-shadow: none !important; border: none !important; min-height: 100vh; }
        }
      `}</style>

      {/* Floating print button */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button onClick={() => window.print()} className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg">
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      <div className="min-h-screen bg-gray-100 py-8 print:py-0 print:bg-white">
        <div className="max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none print:mx-0 print:max-w-none">
          {/* A4 paper: 210mm × 297mm, padding 20mm */}
          <div className="p-[20mm] print:p-0" style={{ minHeight: '277mm' }}>

            {/* === HEADER === */}
            <header className="flex items-start gap-6 pb-6 border-b-2" style={{ borderColor: accent }}>
              <Image
                src={profile.avatar_url}
                alt={profile.login}
                width={100}
                height={100}
                className="rounded-full border-2 flex-shrink-0"
                style={{ borderColor: accent }}
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.name || profile.login}</h1>
                <p className="text-base text-gray-600 mb-3">{profile.bio || 'Software Developer'}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  {profile.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{profile.location}</span>}
                  {profile.company && <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" />{profile.company}</span>}
                  {profile.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{profile.email}</span>}
                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />github.com/{profile.login}</span>
                  {profile.blog && <span className="flex items-center gap-1"><Link2 className="w-3.5 h-3.5" />{profile.blog}</span>}
                </div>
              </div>
            </header>

            {/* === SUMMARY & STATS === */}
            <section className="py-5 grid grid-cols-4 gap-4">
              <div className="text-center"><div className="text-2xl font-bold" style={{ color: accent }}>{stats.totalStars}</div><div className="text-xs text-gray-500 uppercase tracking-wider">Stars</div></div>
              <div className="text-center"><div className="text-2xl font-bold" style={{ color: accent }}>{stats.totalForks}</div><div className="text-xs text-gray-500 uppercase tracking-wider">Forks</div></div>
              <div className="text-center"><div className="text-2xl font-bold" style={{ color: accent }}>{profile.public_repos}</div><div className="text-xs text-gray-500 uppercase tracking-wider">Repos</div></div>
              <div className="text-center"><div className="text-2xl font-bold" style={{ color: accent }}>{stats.memberSince}</div><div className="text-xs text-gray-500 uppercase tracking-wider">Joined</div></div>
            </section>

            {/* === TECH STACK === */}
            {techStack.length > 0 && (
              <section className="pb-5">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(t => (
                    <span key={t.name} className="px-3 py-1.5 text-sm font-medium rounded-lg" style={{ backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}30` }}>
                      {t.name} ({t.count})
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* === TOP PROJECTS === */}
            <section className="pb-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Featured Projects</h2>
              <div className="space-y-3">
                {topRepos.map(repo => (
                  <div key={repo.id} className="group break-inside-avoid">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                          {repo.name}
                        </h3>
                        {repo.description && <p className="text-sm text-gray-600 mt-0.5">{repo.description}</p>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 flex-shrink-0 pt-0.5">
                        {repo.language && <span>{repo.language}</span>}
                        <span className="flex items-center gap-0.5"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                        <span className="flex items-center gap-0.5"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {topRepos.length === 0 && <p className="text-sm text-gray-500 italic">No public repositories.</p>}
              </div>
            </section>

            {/* === STATS SUMMARY === */}
            <section className="pb-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">GitHub Activity</h2>
              <p className="text-sm text-gray-600">
                <strong>{profile.public_repos}</strong> public repositories with a combined <strong>{stats.totalStars}</strong> stars and <strong>{stats.totalForks}</strong> forks. Most used language: <strong>{stats.topLang}</strong>. Member of the GitHub community since <strong>{stats.memberSince}</strong>.
              </p>
            </section>

            {/* === CONTACT === */}
            <section className="pb-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Contact</h2>
              <div className="flex flex-wrap gap-4 text-sm">
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors">
                  <Github className="w-4 h-4" style={{ color: accent }} /> github.com/{profile.login}
                </a>
                {profile.blog && <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"><Link2 className="w-4 h-4" style={{ color: accent }} />{profile.blog}</a>}
                {profile.twitter_username && <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"><Globe className="w-4 h-4" style={{ color: accent }} />@{profile.twitter_username}</a>}
                {profile.email && <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900"><Mail className="w-4 h-4" style={{ color: accent }} />{profile.email}</a>}
              </div>
            </section>

            {/* === FOOTER: Generated === */}
            <footer className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Generated with <span style={{ color: accent }} className="font-medium">Portfolyo</span></span>
                <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </main>
  )
}

export default async function ResumePage({ params, searchParams }: Props) {
  const [profile, repos] = await Promise.all([fetchGitHubProfile(params.username), fetchGitHubRepos(params.username)])
  if (!profile) notFound()

  const accent = parseAccent(searchParams)

  return <ResumeContent profile={profile} repos={repos} accent={accent} />
}
