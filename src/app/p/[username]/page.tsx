import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'
import DefaultTemplate from '@/components/templates/DefaultTemplate'
import ModernTemplate from '@/components/templates/ModernTemplate'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface PortfolioPageProps {
  params: { username: string }
  searchParams: { template?: string; accent?: string; dark?: string }
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const profile = await fetchGitHubProfile(params.username)
  if (!profile) return { title: 'Portfolio Not Found - Portfolyo' }

  return {
    title: `${profile.name || profile.login} — Developer Portfolio`,
    description: profile.bio || `Check out ${profile.login}'s developer portfolio on Portfolyo.`,
    openGraph: {
      title: `${profile.name || profile.login} — Developer Portfolio`,
      description: profile.bio || `Check out ${profile.login}'s developer portfolio on Portfolyo.`,
    },
  }
}

export default async function PortfolioPage({ params, searchParams }: PortfolioPageProps) {
  const username = params.username

  if (!username) {
    notFound()
  }

  const [profile, repos] = await Promise.all([
    fetchGitHubProfile(username),
    fetchGitHubRepos(username),
  ])

  if (!profile) {
    notFound()
  }

  const template = searchParams.template || 'default'
  const accentColor = searchParams.accent || '#0ea5e9'
  const darkMode = searchParams.dark === 'true'

  if (template === 'modern') {
    return <ModernTemplate profile={profile} repos={repos} accentColor={accentColor} darkMode={darkMode} />
  }

  return <DefaultTemplate profile={profile} repos={repos} accentColor={accentColor} darkMode={darkMode} />
}
