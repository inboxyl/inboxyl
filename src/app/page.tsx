import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <span className="text-lg font-bold text-gray-900">Inboxyl</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>
          <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex items-center gap-16">
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Leave your job,<br />Keep your contacts
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-md">
            Download and archive all your emails before you go. Forever yours.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[160px] select-none">📬</div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-14">How it works</h2>
          {[
            {
              n: '01',
              img: 'https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=600',
              title: 'Export your mailbox from Outlook',
              desc: 'In Outlook, go to File → Open & Export → Import/Export → Export to a File. Save your emails as a .pst file to your computer.',
            },
            {
              n: '02',
              img: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=600',
              title: 'Or export from Thunderbird, Gmail or Apple Mail',
              desc: 'Thunderbird: Right-click your inbox → Export. Gmail: Use Google Takeout at takeout.google.com. Apple Mail: Mailbox → Export Mailbox.',
            },
            {
              n: '03',
              img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
              title: 'Upload your file to Inboxyl',
              desc: 'Drag and drop your .pst or .mbox file into Inboxyl. We parse every email, folder, and attachment automatically.',
            },
            {
              n: '04',
              img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
              title: 'Search, browse and export forever',
              desc: 'Your emails are organized by company and contact. Search by sender, date or subject. Export to Excel anytime.',
            },
          ].map(({ n, img, title, desc }, i) => (
            <div key={n}>
              <div className="flex items-center gap-12 py-12">
                <div className="w-72 shrink-0 rounded-xl overflow-hidden shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={title} className="w-full h-48 object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-5xl font-bold text-blue-600 mb-3">{n}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
              {i < 3 && <hr className="border-gray-200" />}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Simple pricing</h2>
          <p className="text-gray-500 text-center mb-14">One-time import or ongoing archive — your choice.</p>
          <div className="grid grid-cols-4 gap-6">
            {[
              { name: 'Starter', storage: '5 GB', price: '€9.99', popular: false },
              { name: 'Pro', storage: '50 GB', price: '€19.99', popular: true },
              { name: 'Business', storage: '250 GB', price: '€39.99', popular: false },
              { name: 'Enterprise', storage: '1 TB', price: '€69.99', popular: false },
            ].map(({ name, storage, price, popular }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 flex flex-col ${
                  popular
                    ? 'border-2 border-blue-600 shadow-lg'
                    : 'border border-gray-200'
                }`}
              >
                {popular && (
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full self-start mb-4">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                <p className="text-gray-500 text-sm mb-4">{storage} storage</p>
                <div className="mt-auto">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{price}</div>
                  <div className="text-gray-400 text-xs mb-6">per month</div>
                  <Link
                    href="/signup"
                    className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                    }`}
                  >
                    Get started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-sm text-gray-400">© 2026 Inboxyl</span>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-gray-400 hover:text-gray-700">Terms</Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-700">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
