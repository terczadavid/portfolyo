export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-xl font-bold">Portfolyo</span>
        </div>
        <p className="text-gray-400 text-sm">Built by developers, for developers. Free to use.</p>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Portfolyo</p>
      </div>
    </footer>
  )
}