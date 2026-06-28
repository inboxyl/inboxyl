import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <span className="text-xl font-800 tracking-tight font-extrabold">Inboxyl</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">Sign in</Link>
          <Link href="/signup" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <div className="relative max-w-6xl mx-auto px-8 py-28 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              No password required — just upload your mailbox file
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Leave your job.<br />
              <span className="text-blue-200">Keep your contacts.</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-xl leading-relaxed">
              Upload your Outlook or Thunderbird mailbox file. We organize every email, contact, and attachment — forever yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition">
                Get Started Free →
              </Link>
              <a href="#how" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition">
                See how it works
              </a>
            </div>
            <div className="mt-12 flex items-center gap-8 text-sm text-blue-200">
              <span>✓ No email password needed</span>
              <span>✓ PST & MBOX supported</span>
              <span>✓ Export to Excel anytime</span>
            </div>
          </div>
          <div className="flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/head.jpg" alt="Leave your job happy" className="w-full h-[500px] object-cover rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-5xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">How it works</h2>
          <p className="text-gray-500 text-lg">Three simple steps to archive your entire email history.</p>
        </div>

        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=600" alt="Export from Outlook" className="rounded-2xl shadow-lg w-full object-cover h-64" />
            </div>
            <div className="flex-1">
              <div className="text-5xl font-extrabold text-blue-100 mb-2">01</div>
              <h3 className="text-2xl font-bold mb-3">Export from Outlook</h3>
              <p className="text-gray-500 leading-relaxed">In Outlook, go to <strong>File → Open & Export → Import/Export</strong>. Choose "Export to a File" and save as a <strong>.pst</strong> file. This contains all your emails, folders, and attachments.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=600" alt="Export from Thunderbird or Gmail" className="rounded-2xl shadow-lg w-full object-cover h-64" />
            </div>
            <div className="flex-1">
              <div className="text-5xl font-extrabold text-blue-100 mb-2">02</div>
              <h3 className="text-2xl font-bold mb-3">Or export from Gmail, Thunderbird & Apple Mail</h3>
              <p className="text-gray-500 leading-relaxed"><strong>Gmail:</strong> Use <a href="https://takeout.google.com" className="text-blue-600 underline">Google Takeout</a> and select Mail → download as <strong>.mbox</strong>. <strong>Thunderbird:</strong> Right-click your inbox → Export. <strong>Apple Mail:</strong> Mailbox → Export Mailbox.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600" alt="Upload to Inboxyl" className="rounded-2xl shadow-lg w-full object-cover h-64" />
            </div>
            <div className="flex-1">
              <div className="text-5xl font-extrabold text-blue-100 mb-2">03</div>
              <h3 className="text-2xl font-bold mb-3">Upload to Inboxyl</h3>
              <p className="text-gray-500 leading-relaxed">Drag and drop your <strong>.pst</strong> or <strong>.mbox</strong> file. We parse every email, folder, and attachment automatically — organized by company and contact.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600" alt="Search and export" className="rounded-2xl shadow-lg w-full object-cover h-64" />
            </div>
            <div className="flex-1">
              <div className="text-5xl font-extrabold text-blue-100 mb-2">04</div>
              <h3 className="text-2xl font-bold mb-3">Search, browse and export</h3>
              <p className="text-gray-500 leading-relaxed">Your emails are organized by company and contact. Search by sender, date or subject. Export everything to <strong>Excel + ZIP</strong> with attachment codes anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4">Simple pricing</h2>
            <p className="text-gray-500 text-lg">Pay for what you store. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Starter", gb: "5 GB", price: "€9.99" },
              { name: "Pro", gb: "50 GB", price: "€19.99", popular: true },
              { name: "Business", gb: "250 GB", price: "€39.99" },
              { name: "Enterprise", gb: "1 TB", price: "€69.99" },
            ].map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-2xl p-6 shadow-sm border-2 ${plan.popular ? "border-blue-600" : "border-gray-100"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most popular</div>}
                <div className="text-sm font-semibold text-gray-400 mb-1">{plan.name}</div>
                <div className="text-3xl font-extrabold mb-1">{plan.price}</div>
                <div className="text-sm text-gray-400 mb-5">per month · {plan.gb}</div>
                <Link href="/signup" className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">Need more than 1 TB? <a href="mailto:hello@inboxyl.com" className="text-blue-600 hover:underline">Contact us</a></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <span className="font-bold text-gray-700 mb-2 md:mb-0">Inboxyl</span>
          <span>© 2026 Inboxyl. All rights reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/terms" className="hover:text-gray-700">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
