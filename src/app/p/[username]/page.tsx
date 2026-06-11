import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'
import DefaultTemplate from '@/components/templates/DefaultTemplate'
import ModernTemplate from '@/components/templates/ModernTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'
import BentoTemplate from '@/components/templates/BentoTemplate'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { CustomOptions } from '@/types'

interface Props { params: { username: string }; searchParams: Record<string, string> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await fetchGitHubProfile(params.username)
  if (!profile) return { title: 'Portfolio Not Found' }
  return {
    title: `${profile.name || profile.login} — Developer Portfolio`,
    description: profile.bio || `Check out ${profile.login}'s portfolio.`,
    openGraph: { title: `${profile.name || profile.login} — Developer Portfolio`, description: profile.bio || '' },
  }
}

function parseOptions(params: Record<string, string>): CustomOptions {
  return {
    font: params.font || 'Inter',
    accent: params.accent || '#0ea5e9',
    dark: params.dark === 'true',
    avatarShape: (params.avatarShape as 'circle' | 'rounded' | 'square') || 'circle',
    cardStyle: (params.cardStyle as 'rounded' | 'square' | 'borderless') || 'rounded',
    bgStyle: (params.bgStyle as 'solid' | 'dots' | 'grid' | 'gradient') || 'solid',
    showTechStack: params.showTechStack !== 'false',
    showAllRepos: params.showAllRepos !== 'false',
    showStats: params.showStats !== 'false',
    showFooter: params.showFooter !== 'false',
    projectSort: (params.projectSort as 'stars' | 'updated' | 'forks') || 'stars',
  }
}

export default async function PortfolioPage({ params, searchParams }: Props) {
  const [profile, repos] = await Promise.all([fetchGitHubProfile(params.username), fetchGitHubRepos(params.username)])
  if (!profile) notFound()

  const options = parseOptions(searchParams)
  const templateParam = searchParams.template || 'default'

  switch (templateParam) {
    case 'modern': return <ModernTemplate profile={profile} repos={repos} options={options} />
    case 'minimal': return <MinimalTemplate profile={profile} repos={repos} options={options} />
    case 'bento': return <BentoTemplate profile={profile} repos={repos} options={options} />
    default: return <DefaultTemplate profile={profile} repos={repos} options={options} />
  }
}
