'use client'

import { Github, Settings, Rocket, Share2 } from 'lucide-react'

const steps = [
  {
    icon: Github,
    step: '01',
    title: 'Connect GitHub',
    description: 'Enter your GitHub username. No OAuth required - just your public profile.',
  },
  {
    icon: Settings,
    step: '02',
    title: 'Choose & Customize',
    description: 'Pick a template, select your accent color, and choose which repos to showcase.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Generate',
    description: 'Our generator creates your portfolio in seconds. Preview it in real-time.',
  },
  {
    icon: Share2,
    step: '04',
    title: 'Share',
    description: 'Share your unique URL with employers, recruiters, or on your resume. Done.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From GitHub profile to live portfolio in four simple steps. No coding, no design skills required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div key={item.title} className="text-center">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}