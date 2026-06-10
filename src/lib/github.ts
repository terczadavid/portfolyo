import { GitHubProfile, GitHubRepo } from '@/types'

const GITHUB_API = 'https://api.github.com'

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return await res.json()
  } catch { return null }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const repos = (await res.json()) as GitHubRepo[]
    return repos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch { return [] }
}