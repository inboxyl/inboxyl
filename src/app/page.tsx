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
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-14">How it works</h2>
          <div className="grid grid-cols-4 gap-8">
            {[
              { emoji: '🔗', step: '01', title: 'Connect your email', desc: 'Securely connect your Gmail, Outlook, or any IMAP account with your credentials.' },
              { emoji: '📂', step: '02', title: 'Or upload a PST file', desc: 'Already exported your mailbox? Upload a .pst or .mbox file directly — no email login needed.' },
              { emoji: '⬇️', step: '03', title: 'We download everything', desc: 'We fetch every email, attachment, and contact — compressed and encrypted.' },
              { emoji: '♾️', step: '04', title: 'Access forever', desc: 'Your archive lives in your account, searchable and downloadable anytime.' },
            ].map(({ emoji, step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-5xl mb-4">{emoji}</div>
                <div className="text-xs font-semibold text-blue-600 mb-2 tracking-widest">STEP {step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
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
