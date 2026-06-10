import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const [profile, repos] = await Promise.all([
      fetchGitHubProfile(username),
      fetchGitHubRepos(username),
    ])

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ profile, repos })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile data' }, { status: 500 })
  }
}