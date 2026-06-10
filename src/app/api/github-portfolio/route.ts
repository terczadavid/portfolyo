import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')
  if (!username) return NextResponse.json({ error: 'Username required' }, { status: 400 })
  try {
    const [profile, repos] = await Promise.all([fetchGitHubProfile(username), fetchGitHubRepos(username)])
    if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ profile, repos })
  } catch { return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 }) }
}