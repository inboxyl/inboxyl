'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Email {
  id: string
  sender: string
  recipients: string[]
  subject: string
  body: string
  sent_at: string
}

export default function CompanyDetailPage({ params }: { params: { domain: string } }) {
  const [emails, setEmails] = useState<Email[]>([])
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadEmails()
  }, [])

  async function loadEmails() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }
    setUserEmail(session.user.email || '')

    const { data: company } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('domain', decodeURIComponent(params.domain))
      .single()

    if (!company) { setLoading(false); return }

    const { data } = await supabase
      .from('emails')
      .select('id, sender, recipients, subject, body, sent_at')
      .eq('company_id', company.id)
      .order('sent_at', { ascending: true })

    setEmails(data || [])
    setLoading(false)
  }

  function isSent(email: Email) {
    return email.sender?.toLowerCase().includes(userEmail.toLowerCase())
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <button onClick={() => router.back()} className="text-sm text-gray-400 hover:text-gray-700 mb-4 block">← Back</button>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{decodeURIComponent(params.domain)}</h1>
      <p className="text-sm text-gray-400 mb-8">{emails.length} emails</p>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : emails.length === 0 ? (
        <p className="text-gray-400 text-sm">No emails found.</p>
      ) : (
        <div className="space-y-3">
          {emails.map(email => (
            <div key={email.id} className={`flex ${isSent(email) ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isSent(email) ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                <p className={`text-xs mb-1 ${isSent(email) ? 'text-orange-100' : 'text-gray-400'}`}>
                  {isSent(email) ? 'You' : email.sender} · {email.sent_at?.slice(0, 10)}
                </p>
                <p className="font-semibold text-sm mb-1">{email.subject}</p>
                <p className={`text-sm ${isSent(email) ? 'text-orange-50' : 'text-gray-600'}`}>
                  {email.body?.slice(0, 200)}{email.body?.length > 200 ? '...' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
