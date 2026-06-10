import { GitHubProfile, GitHubRepo } from '@/types'

const GITHUB_API = 'https://api.github.com'

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error('GitHub API error:', res.status)
      return null
    }

    return await res.json()
  } catch (error) {
    console.error('Failed to fetch GitHub profile:', error)
    return null
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
        },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      console.error('GitHub API error:', res.status)
      return []
    }

    const repos = (await res.json()) as GitHubRepo[]
    // Filter out forks and sort by stars
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error)
    return []
  }
}