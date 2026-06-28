'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const [stats, setStats] = useState({ companies: 0, emails: 0 })
  const [archives, setArchives] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }
    const uid = session.user.id

    const [{ count: companyCount }, { count: emailCount }, { data: archiveData }] = await Promise.all([
      supabase.from('companies').select('*', { count: 'exact', head: true }).eq('user_id', uid),
      supabase.from('emails').select('*', { count: 'exact', head: true }).eq('user_id', uid),
      supabase.from('archives').select('id, source, status, mailbox_email, created_at').eq('user_id', uid).order('created_at', { ascending: false }),
    ])

    setStats({ companies: companyCount || 0, emails: emailCount || 0 })
    setArchives(archiveData || [])
    setLoading(false)
  }

  return (
    <div className="max-w-4xl">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-400 mb-1">🏢 Companies</p>
          <p className="text-4xl font-extrabold text-gray-900">{loading ? '...' : stats.companies}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-400 mb-1">📧 Emails</p>
          <p className="text-4xl font-extrabold text-gray-900">{loading ? '...' : stats.emails}</p>
        </div>
      </div>

      {/* Browse button */}
      <Link href="/dashboard/companies" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 mb-8">
        Browse companies & emails →
      </Link>

      {/* Uploaded files */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Uploaded mailboxes</h2>
        </div>
        {archives.length === 0 ? (
          <p className="px-6 py-8 text-sm text-gray-400">No files uploaded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Mailbox</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Format</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Status</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {archives.map(a => (
                <tr key={a.id}>
                  <td className="px-6 py-3 text-gray-900 font-medium">{a.mailbox_email || '—'}</td>
                  <td className="px-6 py-3 text-gray-500 uppercase">{a.source}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${a.status === 'done' ? 'bg-green-100 text-green-700' : a.status === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-400">{new Date(a.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Upload box */}
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">
        <p className="text-3xl mb-3">📁</p>
        <p className="font-semibold text-gray-700 mb-1">Upload another mailbox</p>
        <p className="text-sm text-gray-400 mb-4">PST or MBOX format</p>
        <Link href="/dashboard/upload" className="inline-block bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-orange-600 text-sm">
          Upload file →
        </Link>
      </div>
    </div>
  )
}
