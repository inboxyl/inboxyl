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
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }

    const { data } = await supabase
      .from('emails')
      .select('company_id, sent_at, companies(id, domain, name)')
      .eq('user_id', session.user.id)

    if (!data) { setLoading(false); return }

    let filtered = data
    if (search.sender) filtered = filtered.filter(e => (e as any).sender?.toLowerCase().includes(search.sender.toLowerCase()))
    if (search.subject) filtered = filtered.filter(e => (e as any).subject?.toLowerCase().includes(search.subject.toLowerCase()))
    if (search.dateFrom) filtered = filtered.filter(e => e.sent_at >= search.dateFrom)
    if (search.dateTo) filtered = filtered.filter(e => e.sent_at <= search.dateTo)

    const map: Record<string, any> = {}
    for (const e of filtered) {
      const c = (e as any).companies
      if (!c) continue
      if (!map[c.id]) map[c.id] = { ...c, dates: [] }
      map[c.id].dates.push(e.sent_at)
    }

    const enriched = Object.values(map).map((c: any) => {
      const sorted = c.dates.sort()
      return {
        id: c.id,
        domain: c.domain,
        name: c.name,
        email_count: sorted.length,
        first_email: sorted[0]?.slice(0, 10) || '-',
        last_email: sorted[sorted.length - 1]?.slice(0, 10) || '-',
      }
    }).sort((a, b) => b.email_count - a.email_count)

    setCompanies(enriched)
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-8">
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
