import Link from "next/link";
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <span className="text-xl font-800 tracking-tight font-extrabold">Inboxyl</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">Sign in</Link>
          <Link href="/signup" className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-orange-600">Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        <div className="relative max-w-6xl mx-auto px-8 py-28 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              No password required — just upload the PST or MBOX file
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 max-w-4xl">
              Former employees' emails.<br />
              <span className="text-orange-200">Not a trouble anymore.</span>
            </h1>
            <p className="text-xl text-orange-100 mb-10 max-w-xl leading-relaxed">
              Upload ex-employees' Outlook or Thunderbird mailbox files. Every email, contact, and attachment — organized by company, searchable forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl text-lg hover:bg-orange-50 transition">
                Get Started Free →
              </Link>
              <a href="#how" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition">
                See how it works
              </a>
            </div>
            <div className="mt-12 flex items-center gap-8 text-sm text-orange-200">
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
          <p className="text-gray-500 text-lg">Three simple steps to archive your former employees' entire email history.</p>
        </div>

        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=600" alt="Export from your email client" className="rounded-2xl shadow-lg w-full object-cover h-64" />
            </div>
            <div className="flex-1">
              <div className="text-5xl font-extrabold text-orange-100 mb-2">01</div>
              <h3 className="text-2xl font-bold mb-3">Export the former employee's mailbox</h3>
              <p className="text-gray-500 leading-relaxed">Export your mailbox from any email client as a <strong>.pst</strong> or <strong>.mbox</strong> file.</p>
              <ul className="mt-4 space-y-2">
                {[
                  'Outlook: File → Open & Export → Import/Export → "Export to a File" → .pst olarak kaydet. Tüm klasörleri, ekleri ve kişileri içerir.',
                  "Gmail: takeout.google.com → Mail seç → .mbox formatında indir. Tüm etiketleri ve konuşmaları içerir.",
                  "Thunderbird: Sol panelde inbox'a sağ tıkla → Export → .mbox olarak kaydet.",
                  "Apple Mail: Üst menü → Mailbox → Export Mailbox → .mbox olarak kaydet.",
                  "Outlook.com / Hotmail: Outlook uygulamasına bağlan → aynı şekilde .pst export al.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600" alt="Upload to Inboxyl" className="rounded-2xl shadow-lg w-full object-cover h-64" />
            </div>
            <div className="flex-1">
              <div className="text-5xl font-extrabold text-orange-100 mb-2">02</div>
              <h3 className="text-2xl font-bold mb-3">Upload to Inboxyl</h3>
              <p className="text-gray-500 leading-relaxed">Drag and drop your <strong>.pst</strong> or <strong>.mbox</strong> file. We parse every email, folder, and attachment automatically — no password required.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-white">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"/>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"/>
                  <div className="w-3 h-3 rounded-full bg-green-400"/>
                  <span className="ml-3 text-xs text-gray-400">Inboxyl — Companies</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { company: "google.com", emails: "1,240", last: "Jun 2025", color: "bg-blue-100 text-blue-700" },
                    { company: "apple.com", emails: "867", last: "May 2025", color: "bg-gray-100 text-gray-700" },
                    { company: "stripe.com", emails: "342", last: "Apr 2025", color: "bg-purple-100 text-purple-700" },
                    { company: "notion.so", emails: "198", last: "Mar 2025", color: "bg-green-100 text-green-700" },
                    { company: "figma.com", emails: "134", last: "Jan 2025", color: "bg-pink-100 text-pink-700" },
                  ].map((row) => (
                    <div key={row.company} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${row.color}`}>{row.company}</span>
                      </div>
                      <div className="flex items-center gap-6 text-xs text-gray-400">
                        <span>{row.emails} emails</span>
                        <span>{row.last}</span>
                        <span className="text-orange-500 font-medium">Export →</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex justify-between items-center">
                  <span className="text-xs text-gray-400">2,781 emails · 4.2 GB</span>
                  <button className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg font-semibold">Download Excel + ZIP</button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-5xl font-extrabold text-orange-100 mb-2">03</div>
              <h3 className="text-2xl font-bold mb-3">Search, browse and export</h3>
              <p className="text-gray-500 leading-relaxed">Employee emails are organized by company and contact. Search by sender, date or subject. Export everything to <strong>Excel + ZIP</strong> with attachment codes anytime.</p>
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
              <div key={plan.name} className={`relative bg-white rounded-2xl p-6 shadow-sm border-2 ${plan.popular ? "border-orange-500" : "border-gray-100"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most popular</div>}
                <div className="text-sm font-semibold text-gray-400 mb-1">{plan.name}</div>
                <div className="text-3xl font-extrabold mb-1">{plan.price}</div>
                <div className="text-sm text-gray-400 mb-5">per month · {plan.gb}</div>
                <Link href="/signup" className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition ${plan.popular ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">Need more than 1 TB? <a href="mailto:hello@inboxyl.com" className="text-orange-500 hover:underline">Contact us</a></p>
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
