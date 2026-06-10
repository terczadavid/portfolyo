import { Github, Settings, Rocket, Share2 } from 'lucide-react'

const steps = [
  { icon: Github, step: '01', title: 'Connect GitHub', desc: 'Enter your GitHub username. No OAuth required.' },
  { icon: Settings, step: '02', title: 'Choose & Customize', desc: 'Pick a template, accent color, and select repos to showcase.' },
  { icon: Rocket, step: '03', title: 'Generate', desc: 'Our generator creates your portfolio instantly. Preview in real-time.' },
  { icon: Share2, step: '04', title: 'Share', desc: 'Share your unique URL with employers, recruiters, or on your resume.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">From GitHub profile to live portfolio in four steps. No design skills required.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(s => (
            <div key={s.title} className="text-center">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <s.icon className="w-8 h-8 text-primary-600" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{s.step}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}