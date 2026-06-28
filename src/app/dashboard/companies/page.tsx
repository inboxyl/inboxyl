'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DUMMY_COMPANIES = [
  { domain: 'google.com', name: 'Google LLC', firstEmail: '2019-03-12', lastEmail: '2025-06-01', total: 342 },
  { domain: 'apple.com', name: 'Apple Inc.', firstEmail: '2020-07-04', lastEmail: '2025-05-28', total: 187 },
  { domain: 'stripe.com', name: 'Stripe Inc.', firstEmail: '2021-01-15', lastEmail: '2025-04-10', total: 93 },
  { domain: 'notion.so', name: 'Notion Labs', firstEmail: '2022-09-20', lastEmail: '2025-03-18', total: 61 },
  { domain: 'github.com', name: 'GitHub Inc.', firstEmail: '2018-11-30', lastEmail: '2025-06-15', total: 518 },
]

export default function CompaniesPage() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    sender: '', recipient: '', dateFrom: '', dateTo: '', subject: '', body: ''
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Companies</h1>

      {/* Search filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-6 gap-4 mb-4">
          {[
            { name: 'sender', label: 'Sender' },
            { name: 'recipient', label: 'Recipient' },
            { name: 'dateFrom', label: 'Date From' },
            { name: 'dateTo', label: 'Date To' },
            { name: 'subject', label: 'Subject' },
            { name: 'body', label: 'Body' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
              <input
                type={name.startsWith('date') ? 'date' : 'text'}
                name={name}
                value={filters[name as keyof typeof filters]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Domain</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Company Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">First Email</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Email</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Emails</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {DUMMY_COMPANIES.map(({ domain, name, firstEmail, lastEmail, total }) => (
              <tr
                key={domain}
                onClick={() => router.push(`/dashboard/companies/${domain}`)}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-blue-600">{domain}</td>
                <td className="px-6 py-4 text-gray-900">{name}</td>
                <td className="px-6 py-4 text-gray-500">{firstEmail}</td>
                <td className="px-6 py-4 text-gray-500">{lastEmail}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
