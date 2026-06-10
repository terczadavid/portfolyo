import { GitHubProfile, GitHubRepo } from '@/types'

// Infer tech stack from repo languages
export function inferTechStack(repos: GitHubRepo[]): { name: string; count: number; color: string }[] {
  const langMap = new Map<string, number>()

  repos.forEach((repo) => {
    if (repo.language) {
      langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1)
    }
  })

  const colors: Record<string, string> = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3776ab',
    Java: '#007396',
    'C++': '#00599c',
    'C#': '#239120',
    Go: '#00add8',
    Rust: '#dea584',
    Ruby: '#cc342d',
    PHP: '#4f5b93',
    Swift: '#ff3b30',
    Kotlin: '#7f52ff',
    HTML: '#e34f26',
    CSS: '#264de4',
    Shell: '#89e051',
    'Vue.js': '#42b883',
    React: '#61dafb',
    Dart: '#00b4ab',
    Scala: '#dc322f',
    R: '#276dc3',
  }

  return Array.from(langMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({
      name,
      count,
      color: colors[name] || '#0ea5e9',
    }))
}

// Infer a "bento grid" of quick stats
export function inferQuickStats(profile: GitHubProfile, repos: GitHubRepo[]) {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0)
  const topLang = inferTechStack(repos)[0]?.name || 'Unknown'

  return {
    totalStars,
    totalForks,
    topLang,
    memberSince: new Date(profile.created_at).getFullYear(),
  }
}

// Format numbers with K/M
export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}
