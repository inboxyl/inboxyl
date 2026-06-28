const DUMMY_EMAILS = [
  { id: 1, direction: 'received', from: 'Sarah Johnson', subject: 'Q3 Partnership Proposal', date: 'Mar 12, 2024', body: 'Hi, I wanted to reach out regarding a potential partnership opportunity for Q3. We believe our platforms could work great together...' },
  { id: 2, direction: 'sent', from: 'You', subject: 'Re: Q3 Partnership Proposal', date: 'Mar 13, 2024', body: "Thanks Sarah, this sounds very interesting. Could you send over more details about what you have in mind? I'd love to schedule a call..." },
  { id: 3, direction: 'received', from: 'Sarah Johnson', subject: 'Re: Q3 Partnership Proposal', date: 'Mar 13, 2024', body: 'Absolutely! I\'ll have our team put together a detailed brief. In the meantime, here are some high-level thoughts on integration...' },
  { id: 4, direction: 'sent', from: 'You', subject: 'Meeting invite — Wednesday 3pm', date: 'Mar 14, 2024', body: "I've sent a calendar invite for Wednesday at 3pm PST. Looking forward to connecting and exploring this further with your team..." },
  { id: 5, direction: 'received', from: 'Mike Chen', subject: 'Invoice #4521 — April', date: 'Apr 2, 2024', body: 'Please find attached the invoice for April services. Payment is due within 30 days. Let me know if you have any questions...' },
  { id: 6, direction: 'sent', from: 'You', subject: 'Re: Invoice #4521 — April', date: 'Apr 3, 2024', body: "Got it, thank you Mike. I'll process this today and you should see the payment within 5 business days. Appreciate the quick turnaround..." },
  { id: 7, direction: 'received', from: 'Sarah Johnson', subject: 'Partnership update', date: 'May 10, 2024', body: "Just a quick update — our legal team has reviewed the terms and we're ready to move forward. Excited to get this across the finish line!" },
]

export default async function CompanyDetailPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{domain}</h1>
        <p className="text-gray-500 text-sm">{DUMMY_EMAILS.length} emails in archive</p>
      </div>

      {/* Chat view */}
      <div className="space-y-4 max-w-2xl">
        {DUMMY_EMAILS.map(({ id, direction, from, subject, date, body }) => {
          const isSent = direction === 'sent'
          return (
            <div key={id} className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-sm rounded-2xl px-4 py-3 shadow-sm ${
                  isSent
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
                }`}
              >
                <div className={`text-xs font-semibold mb-1 ${isSent ? 'text-blue-100' : 'text-gray-500'}`}>
                  {from} · {date}
                </div>
                <div className={`text-sm font-medium mb-1 ${isSent ? 'text-white' : 'text-gray-900'}`}>
                  {subject}
                </div>
                <div className={`text-xs leading-relaxed ${isSent ? 'text-blue-100' : 'text-gray-500'}`}>
                  {body.slice(0, 100)}{body.length > 100 ? '…' : ''}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
