export interface GitHubProfile {
  login: string; id: number; avatar_url: string; html_url: string
  name: string | null; company: string | null; blog: string | null
  location: string | null; email: string | null; bio: string | null
  twitter_username: string | null; public_repos: number; public_gists: number
  followers: number; following: number; created_at: string
}

export interface GitHubRepo {
  id: number; name: string; full_name: string; html_url: string
  description: string | null; fork: boolean; created_at: string; updated_at: string
  pushed_at: string; homepage: string | null; stargazers_count: number
  language: string | null; forks_count: number; topics: string[]
}