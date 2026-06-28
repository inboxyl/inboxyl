'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      setEmail(user.email || '')
    })
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white flex flex-col py-6 px-4 fixed h-full">
        <span className="text-xl font-extrabold mb-8 px-2">Inboxyl</span>
        <nav className="flex-1 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 text-sm">🏠 Home</Link>
          <Link href="/dashboard/upload" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 text-sm">📤 Upload</Link>
          <Link href="/dashboard/companies" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 text-sm">🏢 Companies</Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 text-sm">⚙️ Settings</Link>
        </nav>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400 px-2 mb-2 truncate">{email}</p>
          <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded-lg">Sign out</button>
        </div>
      </aside>
      <main className="ml-56 flex-1 bg-gray-50 min-h-screen p-8">
        {children}
      </main>
    </div>
  )
}
