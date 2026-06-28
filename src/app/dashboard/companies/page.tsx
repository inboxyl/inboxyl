'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Company {
  id: string
  domain: string
  name: string
  email_count: number
  first_email: string
  last_email: string
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState({ sender: '', recipient: '', dateFrom: '', dateTo: '', subject: '', body: '' })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadCompanies()
  }, [])

  async function loadCompanies() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }

    const { data } = await supabase
      .from('companies')
      .select('id, domain, name')
      .eq('user_id', session.user.id)
      .order('domain')

    if (!data) { setLoading(false); return }

    const enriched = await Promise.all(data.map(async (c) => {
      const { data: emails } = await supabase
        .from('emails')
        .select('sent_at')
        .eq('company_id', c.id)
        .order('sent_at', { ascending: true })

      return {
        ...c,
        email_count: emails?.length || 0,
        first_email: emails?.[0]?.sent_at?.slice(0, 10) || '-',
        last_email: emails?.[emails.length - 1]?.sent_at?.slice(0, 10) || '-',
      }
    }))

    setCompanies(enriched)
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Companies</h1>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { key: 'sender', label: 'Sender' },
          { key: 'recipient', label: 'Recipient' },
          { key: 'subject', label: 'Subject' },
          { key: 'body', label: 'Body' },
          { key: 'dateFrom', label: 'Date from' },
          { key: 'dateTo', label: 'Date to' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-xs text-gray-400 mb-1">{label}</label>
            <input
              type={key.startsWith('date') ? 'date' : 'text'}
              value={search[key as keyof typeof search]}
              onChange={e => setSearch(s => ({ ...s, [key]: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && loadCompanies()}
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        ))}
        <button
          onClick={loadCompanies}
          className="col-span-2 md:col-span-3 bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600"
        >
          Search
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : companies.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p>No emails yet. <Link href="/dashboard/upload" className="text-orange-500 underline">Upload a file</Link></p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Domain</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">First email</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Last email</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Emails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map(c => (
                <tr key={c.id} onClick={() => router.push(`/dashboard/companies/${c.domain}`)} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.domain}</td>
                  <td className="px-4 py-3 text-gray-500">{c.first_email}</td>
                  <td className="px-4 py-3 text-gray-500">{c.last_email}</td>
                  <td className="px-4 py-3 text-gray-500">{c.email_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
