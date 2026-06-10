'use client'

interface BentoBadgeProps {
  label: string
  value: string | number
  className?: string
}

export default function BentoBadge({ label, value, className = '' }: BentoBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm ${className}`}>
      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</span>
      <span className="text-sm font-bold text-gray-900">{value}</span>
    </div>
  )
}
