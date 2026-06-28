'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setEmail(session.user.email || '')
    })
  }, [])

  async function handlePasswordChange() {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setLoading(false)
    setMessage(error ? error.message : 'Password updated successfully.')
    setNewPassword('')
  }

  async function handleDeleteAccount() {
    if (!confirm('Are you sure? This will permanently delete your account and all data.')) return
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Account</h2>
        <div className="text-sm text-gray-500 mb-1">Email address</div>
        <div className="text-gray-900 font-medium">{email}</div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Change password</h2>
        {message && <div className={`text-sm p-3 rounded-lg mb-4 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{message}</div>}
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
          placeholder="New password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 mb-3" />
        <button onClick={handlePasswordChange} disabled={loading || !newPassword}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50">
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Export data</h2>
        <p className="text-sm text-gray-500 mb-4">Download all your emails and attachments as Excel + ZIP.</p>
        <a href="/api/export" download className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
          Download Excel + ZIP
        </a>
      </div>

      <div className="bg-white rounded-xl border border-red-100 p-6">
        <h2 className="font-bold text-red-600 mb-4">Danger zone</h2>
        <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data.</p>
        <button onClick={handleDeleteAccount}
          className="border border-red-500 text-red-500 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-50">
          Delete account
        </button>
      </div>
    </div>
  )
}
