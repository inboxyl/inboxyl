import Link from 'next/link'

const navItems = [
  { emoji: '🏠', label: 'Home', href: '/dashboard' },
  { emoji: '📧', label: 'Emails', href: '/dashboard/emails' },
  { emoji: '🏢', label: 'Companies', href: '/dashboard/companies' },
  { emoji: '⚙️', label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col fixed h-full">
        <div className="px-5 py-5 border-b border-gray-100">
          <span className="text-lg font-bold text-gray-900">Inboxyl</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ emoji, label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <span className="text-base">{emoji}</span>
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 truncate mb-2">user@example.com</p>
          <button className="w-full text-left text-xs text-gray-500 hover:text-red-600 transition-colors py-1">
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
