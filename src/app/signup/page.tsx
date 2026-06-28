'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const supabase = createClient()

  function validatePassword(p: string) {
    if (p.length < 8) return 'At least 8 characters required.'
    if (!/[A-Z]/.test(p)) return 'Must contain at least one uppercase letter.'
    if (!/[a-z]/.test(p)) return 'Must contain at least one lowercase letter.'
    if (!/[0-9]/.test(p)) return 'Must contain at least one number.'
    if (!/[^A-Za-z0-9]/.test(p)) return 'Must contain at least one symbol (e.g. !@#$%).'
    return ''
  }

  async function handleSignup() {
    setError('')
    const pwError = validatePassword(password)
    if (pwError) { setError(pwError); return }
    if (password !== password2) { setError('Passwords do not match.'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    setDone(true)
  }

  if (done) return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="px-8 py-5 flex items-center">
        <Link href="/" className="text-xl font-extrabold text-gray-900">Inboxyl</Link>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md text-center">
          <div className="text-4xl mb-4">📬</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-gray-500 text-sm">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          <Link href="/login" className="inline-block mt-6 text-sm text-orange-500 hover:underline">Back to login</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="px-8 py-5 flex items-center">
        <Link href="/" className="text-xl font-extrabold text-gray-900">Inboxyl</Link>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create account</h1>
          <p className="text-gray-500 mb-6 text-sm">Start archiving employee emails today.</p>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Min 8 chars, uppercase, number, symbol" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
              <input type="password" value={password2} onChange={e => setPassword2(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSignup()}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Repeat your password" />
            </div>
            <p className="text-xs text-gray-400">Password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.</p>
            <button onClick={handleSignup} disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
