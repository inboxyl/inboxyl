'use client'
import { useState } from 'react'

export default function ConnectPage() {
  const [form, setForm] = useState({ email: '', password: '', imap: '', port: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect your email account</h1>
      <p className="text-gray-500 text-sm mb-8">
        Your password is used only once to download your emails and is never stored.
      </p>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">IMAP Server</label>
          <input
            type="text"
            name="imap"
            value={form.imap}
            onChange={handleChange}
            placeholder="imap.gmail.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Port</label>
          <input
            type="text"
            name="port"
            value={form.port}
            onChange={handleChange}
            placeholder="993"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button className="w-full bg-orange-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors mt-2">
          Start Import
        </button>

        <p className="text-xs text-gray-400 text-center leading-relaxed pt-1">
          🔒 Your password is never saved. We connect once, download your emails, then discard it immediately.
        </p>
      </div>
    </div>
  )
}
