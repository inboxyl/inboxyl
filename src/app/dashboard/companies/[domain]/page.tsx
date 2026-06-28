'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Attachment {
  id: string
  filename: string
  attachment_code: string
  file_size: number
}

interface Email {
  id: string
  sender: string
  recipients: string[]
  subject: string
  body: string
  sent_at: string
  attachments?: Attachment[]
}

function SendButton({ emailId }: { emailId: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSend() {
    setStatus('sending')
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailId }),
    })
    setStatus(res.ok ? 'done' : 'error')
  }

  return (
    <button
      onClick={handleSend}
      disabled={status === 'sending' || status === 'done'}
      className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50"
    >
      {status === 'idle' && '📨 Send to me'}
      {status === 'sending' && 'Sending...'}
      {status === 'done' && '✅ Sent to your email'}
      {status === 'error' && '❌ Failed — try again'}
    </button>
  )
}

export default function CompanyDetailPage({ params }: { params: Promise<{ domain: string }> }) {
  const [emails, setEmails] = useState<Email[]>([])
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [mailboxEmail, setMailboxEmail] = useState('')
  const [selected, setSelected] = useState<Email | null>(null)
  const [page, setPage] = useState(1)
  const [domain, setDomain] = useState('')
  const PAGE_SIZE = 20
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    params.then(p => {
      setDomain(p.domain)
      loadEmails(p.domain)
    })
  }, [])

  async function loadEmails(domainParam: string) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push('/login'); return }
    setUserEmail(session.user.email || '')

    const { data: company } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('domain', decodeURIComponent(domainParam))
      .single()

    if (!company) { setLoading(false); return }

    const { data } = await supabase
      .from('emails')
      .select('id, sender, recipients, subject, body, sent_at')
      .eq('company_id', company.id)
      .order('sent_at', { ascending: true })

    const emailsWithAttachments = await Promise.all((data || []).map(async (email) => {
      const { data: atts } = await supabase
        .from('attachments')
        .select('id, filename, attachment_code, file_size')
        .eq('email_id', email.id)
      return { ...email, attachments: atts || [] }
    }))

    setEmails(emailsWithAttachments)

    const { data: archive } = await supabase
      .from('archives')
      .select('mailbox_email')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (archive?.mailbox_email) setMailboxEmail(archive.mailbox_email)

    setLoading(false)
  }

  function isSent(email: Email) {
    return email.sender?.toLowerCase().includes(mailboxEmail.toLowerCase())
  }

  const visibleEmails = emails.slice(0, page * PAGE_SIZE)
  const hasMore = visibleEmails.length < emails.length

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-2 text-sm">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-700">Dashboard</a>
        <span className="text-gray-300">/</span>
        <a href="/dashboard/companies" className="text-gray-400 hover:text-gray-700">Companies</a>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">{domain}</span>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-3">
        {loading ? (
          <p className="text-gray-400 text-sm text-center pt-10">Loading...</p>
        ) : emails.length === 0 ? (
          <p className="text-gray-400 text-sm text-center pt-10">No emails found.</p>
        ) : (
          <>
            {visibleEmails.map(email => (
              <div key={email.id} className={`flex ${isSent(email) ? 'justify-end' : 'justify-start'}`}>
                <div
                  onClick={() => setSelected(email)}
                  className={`max-w-[60%] rounded-2xl px-5 py-4 cursor-pointer transition hover:opacity-90 ${isSent(email) ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 text-gray-900 shadow-sm'}`}
                >
                  <div className={`flex items-center gap-3 text-xs mb-2 ${isSent(email) ? 'text-orange-100' : 'text-gray-400'}`}>
                    <span>{email.sent_at?.slice(0, 10)}</span>
                    {email.attachments && email.attachments.length > 0 && (
                      <span>📎 {email.attachments.length}</span>
                    )}
                  </div>
                  <p className="font-semibold text-sm mb-1">{email.subject}</p>
                  <p className={`text-sm leading-relaxed ${isSent(email) ? 'text-orange-50' : 'text-gray-600'}`}>
                    {email.body?.slice(0, 120)}{email.body?.length > 120 ? '...' : ''}
                  </p>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="text-sm text-orange-500 hover:underline"
                >
                  Load more ({emails.length - visibleEmails.length} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* POPUP */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg pr-4">{selected.subject}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>
            </div>
            <div className="px-6 py-4 space-y-2 border-b border-gray-100">
              <div className="flex gap-2 text-sm">
                <span className="text-gray-400 w-20">From</span>
                <span className="text-gray-900">{selected.sender}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-400 w-20">To</span>
                <span className="text-gray-900">{selected.recipients?.join(', ')}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-400 w-20">Date</span>
                <span className="text-gray-900">{new Date(selected.sent_at).toLocaleString()}</span>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{selected.body}</p>
            </div>
            {selected.attachments && selected.attachments.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Attachments</p>
                <div className="space-y-2">
                  {selected.attachments.map(att => (
                    <div key={att.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{att.filename}</p>
                        <p className="text-xs text-gray-400">{(att.file_size / 1024).toFixed(1)} KB · Code: {att.attachment_code}</p>
                      </div>
                      <span className="text-xs bg-orange-100 text-orange-600 font-bold px-2 py-1 rounded">{att.attachment_code}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="px-6 py-4 border-t border-gray-100">
              <p className="px-6 pt-4 text-xs text-gray-400">Email will be forwarded to your account address.</p>
              <SendButton emailId={selected.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
