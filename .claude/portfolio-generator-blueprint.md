# Portfolio Generator Business Blueprint

> **Your Profile:** High school student, developer, understands internet culture, time-rich but budget-limited.

---

## The Idea and the Problem

**Product Name:** Portfolyo

**What it is:** A web app that turns any developer's GitHub profile into a stunning, modern portfolio website in under 30 seconds.

**The Pain Point:** Every developer is told they *need* a portfolio to get hired or freelance. But building one from scratch takes 10–20+ hours: picking a design, writing copy, pulling in projects, making it responsive, deploying it, buying a domain. Most developers procrastinate for months. Existing solutions (GitHub Pages, WordPress, Notion) either look generic or require too much setup.

**Why People Care:** Junior developers, bootcamp grads, and CS students are actively applying for jobs. Standing out matters. A beautiful portfolio is the difference between getting ghosted and getting an interview. Your tool removes 95% of the friction.

---

## Target Audience

Be laser-focused here. Don't build for "all developers."

**Primary Audience:**
- Bootcamp students (Codecademy, freeCodeCamp, The Odin Project users)
- CS undergrads and high school seniors applying for internships
- Junior devs (0–2 years experience) job hunting
- Self-taught developers trying to break into tech

**Secondary Audience:**
- Freelance developers who need a client-facing presence

**Where they hang out:**
- Reddit: r/webdev, r/cscareerquestions, r/LearnProgramming, r/Frontend
- Twitter/X
- Discord servers (coding bootcamp communities, CS major servers)
- dev.to, IndieHackers

---

## The MVP (Minimum Viable Product)

**Goal:** Build a working version in 10–14 days, spending $0.

### Core Features
1. GitHub OAuth login
2. Automatically pull: profile picture, bio, public repos, stars, programming languages, contribution graph
3. Generate a clean, modern single-page website from a template
4. Host it on a subdomain: `yourname.portfolyo.app`
5. Basic customization: light/dark mode, accent color picker
6. "Deploy" button that publishes instantly

### Tech Stack (100% Free)

| Component | Tool | Why |
|-----------|------|-----|
| **Frontend** | Next.js 14 + Tailwind CSS | Free, fast, modern, great for SEO |
| **UI Components** | shadcn/ui | Free, beautiful, copy-paste components |
| **Database + Auth** | Supabase | Free tier = unlimited projects, 500MB DB, built-in auth |
| **Hosting** | Vercel | Free, auto-deploy from GitHub, edge functions |
| **API** | GitHub REST API | Free, 5000 requests/hour |
| **Email notifications** | Resend | 3,000 emails/month free |

### Build Timeline

**24-Hour MVP Hack:**
- On Day 1, your ONLY goal is to build the GitHub OAuth + repo fetching. If you can pull a user's repos and display them, you've proven the core mechanic. Everything else is polish.

**Day 2–7:**
- Build the template, the generation logic, and the subdomain publishing.

**Day 8–14:**
- Polish the UI, add customization, prepare for launch.

---

## Monetization

### Freemium Model
- **Free Tier:** One portfolio, one default template, Portfolyo subdomain, Portfolyo branding.
- **Pro Tier ($4.99/month or $39/year):** Custom domain, 5+ premium templates, analytics (page views), contact form, no branding, "Hire Me" button, custom sections (Experience, Education, Certificates).

### Step-by-Step Path to $1,000

1. **Week 1–2:** Build and soft-launch. Get 50–100 beta users (friends, school, online communities). Gather feedback.
2. **Week 3:** Launch on Product Hunt and Reddit. Target 500+ free signups.
3. **Week 4:** Release the Pro plan. If you convert 2% of free users: 500 × 2% = 10 paid users = ~$50/month.
4. **Month 2:** Improve templates, add features. Grow to 1,500 users, convert 3% = 45 paid = ~$225/month. Total revenue so far: ~$275.
5. **Month 3:** Add team/B2B features (bootcamps buy bulk licenses). Hit 100 paid users = $500/month. Total: ~$1,000+.

### The "First $100" Shortcut
Pre-sell. Before you build Pro, post in communities: *"I'm building the fastest portfolio generator for developers. The first 20 people to reply 'me' get 50% off Pro for life."* If 20 people pay $10, that's your first $200 and your proof of demand.

---

## Zero-Budget Marketing

### The Growth Hack — The "Before/After" Content Loop

#### TikTok / Reels (Primary Channel)
- Post a 15-second "POV: You need a portfolio for your internship application" video. Show a boring GitHub profile → transition to a stunning Portfolyo site.
- Use trending sounds. Show the "how to" in 30 seconds.
- Post daily for 30 days. At least one will hit the algorithm.

#### Reddit (Conversion Engine)
- Post on r/webdev, r/cscareerquestions, r/LearnProgramming: *"I built a free tool that turns your GitHub into a portfolio in 30 seconds."*
- Include your own portfolio as the demo. Answer every question in the comments.
- **Critical:** Post in "Showoff Saturday" threads. Don't be salesy. Show the tool, ask for feedback.

#### Discord (Niche Penetration)
- Join 10+ coding bootcamp and CS Discord servers.
- Don't spam. Add value: *"I made this for myself when I was applying for internships, thought it might help here too: [link]"*

#### Twitter/X (Credibility)
- Build in public. Tweet daily updates: *"Day 3 of building Portfolyo: Added dark mode. Here's how the animation works..."*
- Tag relevant accounts (@TheOdinProject, @freeCodeCamp, @florinpop1705).
- DM junior developers who are job hunting: *"Saw you're looking for frontend roles. I built this to help devs stand out — free, would love your feedback."*

#### The Viral Hook (Long Play)
- Add a small "Made with Portfolyo" link at the bottom of every free portfolio.
- When someone visits a cool portfolio, they click to see how it's made.
- Organic, exponential loop.

---

## The Very First Step

### What to do in the NEXT 2 HOURS

1. Open your terminal.
2. Create a new Next.js project: `npx create-next-app@latest portfolyo`
3. Set up a GitHub OAuth app (Settings → Developer Settings → OAuth Apps → New OAuth App).
4. Use NextAuth.js or Clerk (free tier) to implement GitHub login.
5. Write the API route that fetches a user's public repos from the GitHub API.
6. Display the repos on the page.

**Your 2-hour goal:** A page where YOU can log in with GitHub and see YOUR repositories listed. That's it. If you can do that, the rest is design, deployment, and distribution.

---

> **Pro Mentor Advice:** Don't wait until it's perfect. Ship when it's embarrassing. Your first users will be other high school students and bootcamp students — they don't need enterprise features. They need something that *works* and makes them look good. Build that. Launch that. Iterate based on what they actually ask for.
>
> **Good luck. Start coding.**
