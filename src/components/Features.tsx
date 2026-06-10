import { Zap, Palette, Code2, Shield, ExternalLink, BarChart3 } from 'lucide-react'

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Generate your portfolio in under 30 seconds. No dragging, no coding.' },
  { icon: Palette, title: 'Beautiful Templates', desc: 'Professionally designed templates that showcase your work perfectly.' },
  { icon: Code2, title: 'Auto-Pulls Repos', desc: 'Fetches your repositories, stars, languages, and more automatically.' },
  { icon: Shield, title: 'Always Up-to-Date', desc: 'Your portfolio updates automatically when you push to GitHub.' },
  { icon: ExternalLink, title: 'Custom Domain', desc: 'Connect your own domain for a truly professional presence (Pro).' },
  { icon: BarChart3, title: 'Built-in Analytics', desc: 'See who views your portfolio and what they explore (Pro).' },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">Portfolyo handles the hard stuff so you can focus on coding.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map(f => (
            <div key={f.title} className="bg-white p-8 rounded-2xl border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}