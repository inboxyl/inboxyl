'use client'
import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [mailboxEmail, setMailboxEmail] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleUpload() {
    if (!file || !mailboxEmail) return
    setStatus('uploading')
    setError('')

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user
      if (!user) { router.push('/login'); return }

      const fileType = file.name.endsWith('.pst') ? 'pst' : 'mbox'

      const archiveResult = await supabase.from('archives').insert({
        user_id: user.id,
        source: fileType,
        status: 'uploading',
        mailbox_email: mailboxEmail,
      }).select().single()

      if (archiveResult.error) throw new Error('Archive insert failed: ' + archiveResult.error.message)

      const archive = archiveResult.data
      const r2Key = `${user.id}/${archive.id}/${file.name}`

      const presignRes = await fetch('/api/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: r2Key }),
      })
      const { url } = await presignRes.json()

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', url)
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUploadProgress(Math.round((e.loaded / e.total) * 100))
          }
        }
        xhr.onload = () => xhr.status === 200 ? resolve() : reject(new Error('Upload failed'))
        xhr.onerror = () => reject(new Error('Upload failed'))
        xhr.send(file)
      })

      setStatus('parsing')
      setUploadProgress(100)

      await fetch(`${process.env.NEXT_PUBLIC_PARSER_URL}/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          archive_id: archive.id,
          r2_key: r2Key,
          file_type: fileType,
        }),
      })

      await supabase.from('archives').update({ status: 'done' }).eq('id', archive.id)
      setStatus('done')
    } catch (e: any) {
      setError(e.message)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload your mailbox file</h1>
      <p className="text-gray-500 mb-8 text-sm">Supported formats: .pst (Outlook), .mbox (Gmail, Thunderbird, Apple Mail)</p>

      {status === 'done' ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="text-lg font-bold text-green-800 mb-1">Import complete!</h2>
          <p className="text-green-600 text-sm mb-4">Your emails have been parsed and organized.</p>
          <a href="/dashboard/companies" className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">View emails →</a>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mailbox email address
            </label>
            <input
              type="email"
              value={mailboxEmail}
              onChange={e => setMailboxEmail(e.target.value)}
              placeholder="owner@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <p className="text-xs text-gray-400 mt-1">The email address this mailbox belongs to — used to identify sent vs received emails.</p>
          </div>

          <div
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); setFile(e.dataTransfer.files[0]) }}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition ${dragging ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'}`}
          >
            <input ref={inputRef} type="file" accept=".pst,.mbox" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
            <div className="text-5xl mb-4">📁</div>
            {file ? (
              <div>
                <p className="font-semibold text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-gray-700">Drop your file here</p>
                <p className="text-sm text-gray-400 mt-1">or click to browse</p>
              </div>
            )}
          </div>

          {status === 'uploading' && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-orange-500">Uploading...</span>
                <span className="text-gray-400">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
          {status === 'parsing' && (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-orange-500 text-sm">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Parsing emails... this may take a few minutes for large files.
              </div>
            </div>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || !mailboxEmail || status === 'uploading' || status === 'parsing'}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-40 transition"
          >
            {status === 'uploading' ? 'Uploading...' : status === 'parsing' ? 'Parsing...' : 'Upload & Import'}
          </button>
        </>
      )}
    </div>
  )
}
