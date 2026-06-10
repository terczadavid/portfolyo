'use client'

import { Zap, Palette, Shield, Code, ExternalLink, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate your portfolio in under 30 seconds. No dragging, no coding, just your GitHub username.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Palette,
    title: 'Beautiful Templates',
    description: 'Choose from multiple professionally designed templates that showcase your work perfectly.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Code,
    title: 'Auto-Pulls Repos',
    description: 'Automatically fetches your repositories, stars, languages, and contribution graph.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Shield,
    title: 'Always Up-to-Date',
    description: 'Your portfolio updates automatically when you push to GitHub. Set it and forget it.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: ExternalLink,
    title: 'Custom Domain',
    description: 'Connect your own domain to your portfolio for a truly professional presence.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: BarChart3,
    title: 'Built-in Analytics',
    description: 'See who views your portfolio, where they come from, and what projects they explore.',
    color: 'bg-indigo-100 text-indigo-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Portfolyo is the fastest way to create a developer portfolio. We handle the hard stuff so you can focus on coding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}