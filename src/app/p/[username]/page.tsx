import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'
import DefaultTemplate from '@/components/templates/DefaultTemplate'
import ModernTemplate from '@/components/templates/ModernTemplate'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props { params: { username: string }; searchParams: { template?: string; accent?: string; dark?: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await fetchGitHubProfile(params.username)
  if (!profile) return { title: 'Portfolio Not Found' }
  return {
    title: `${profile.name || profile.login} — Developer Portfolio`,
    description: profile.bio || `Check out ${profile.login}'s portfolio.`,
    openGraph: { title: `${profile.name || profile.login} — Developer`, description: profile.bio || '' },
  }
}

export default async function PortfolioPage({ params, searchParams }: Props) {
  const [profile, repos] = await Promise.all([fetchGitHubProfile(params.username), fetchGitHubRepos(params.username)])
  if (!profile) notFound()

  const template = searchParams.template || 'default'
  const accentColor = searchParams.accent || '#0ea5e9'
  const darkMode = searchParams.dark === 'true'

  if (template === 'modern') return <ModernTemplate profile={profile} repos={repos} accentColor={accentColor} darkMode={darkMode} />
  return <DefaultTemplate profile={profile} repos={repos} accentColor={accentColor} darkMode={darkMode} />
}