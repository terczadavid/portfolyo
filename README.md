# Portfolyo — Turn Your GitHub Into a Portfolio

A free, fast tool to generate beautiful developer portfolios from your GitHub profile.

## Features

- **Instant generation** — Just enter your GitHub username, get a portfolio in 30 seconds
- **Beautiful templates** — Choose from professionally designed layouts
- **Fully customizable** — Pick your accent color, light/dark mode, template
- **SEO optimized** — Server-rendered pages that rank on Google
- **No-code** — No coding or design skills required
- **Free forever** — Core features are 100% free

## Tech Stack

- **Next.js 14** (App Router, Server Components)
- **Tailwind CSS** + PostCSS
- **Supabase** (Auth + Database for persistence — optional for v1)
- **GitHub REST API** (public data, no auth needed)
- **Vercel** (hosting)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. **Clone & install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials (optional — the app works without Supabase for basic portfolio generation).

3. **Run the dev server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Optional: Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your anon key and URL from Project Settings > API
4. Add them to `.env.local`

### Optional: Set Up GitHub OAuth

1. Go to GitHub Settings > Developer Settings > OAuth Apps
2. Create a new OAuth app
3. Set Authorization callback URL to: `http://localhost:3000/auth/callback`
4. Copy Client ID and Secret to your Supabase Auth settings

## Project Structure

```
src/
  app/
    page.tsx                 # Landing page
    layout.tsx               # Root layout
    dashboard/
      page.tsx               # Dashboard for customization
    p/[username]/
      page.tsx               # Public portfolio page (SSR)
    auth/
      signin/
        page.tsx             # Sign in page
    api/
      github-portfolio/
        route.ts             # API route for fetching GitHub data
  components/
    Navbar.tsx               # App nav
    Hero.tsx                 # Landing hero with username input
    Features.tsx             # Feature grid
    HowItWorks.tsx           # Steps explanation
    Footer.tsx               # Site footer
    templates/
      DefaultTemplate.tsx    # Classic portfolio layout
      ModernTemplate.tsx     # Modern split layout
  lib/
    github.ts                # GitHub API functions
    supabase/                # Supabase client setup
  types/
    index.ts                 # TypeScript types
```

## How It Works

1. User enters their GitHub username on the landing page or dashboard
2. App fetches public profile and repositories via GitHub REST API
3. User selects template, accent color, and dark/light mode
4. Portfolio page is server-rendered at `/p{username}`
5. Anyone can visit the public portfolio URL

## Marketing Tips

- Post your portfolio on Reddit (r/webdev, r/cscareerquestions, r/Frontend)
- Share on TikTok with a "before/after" transition
- Tweet your portfolio URL with hashtags like #buildinpublic
- Add a "Made with Portfolyo" badge at the bottom of portfolios for viral growth

## Roadmap

- [x] Basic portfolio generation from GitHub username
- [x] Two beautiful templates
- [x] Custom accent colors
- [x] Dark/light mode
- [ ] More templates (minimal, creative)
- [ ] Custom domain support (Pro tier)
- [ ] Analytics dashboard (Pro tier)
- [ ] Contact form (Pro tier)
- [ ] Portfolio export as static files
- [ ] Supabase integration for persistence & auth
- [ ] More than 6 repos displayed

## License

MIT — see [LICENSE](LICENSE)

---

Built with ❤️ by a high school developer. If this helps you land a job, let me know!
