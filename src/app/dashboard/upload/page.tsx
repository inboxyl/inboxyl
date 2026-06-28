'use client'
import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload() {
    if (!file) return
    setStatus('uploading')
    setError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')

      const fileType = file.name.endsWith('.pst') ? 'pst' : 'mbox'

      const archiveResult = await supabase.table('archives').insert({
        user_id: user.id,
        source: fileType,
        status: 'uploading',
      }).select().single()

      const archive = archiveResult.data
      const r2Key = `${user.id}/${archive.id}/${file.name}`

      const presignRes = await fetch('/api/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: r2Key }),
      })
      const { url } = await presignRes.json()

      await fetch(url, { method: 'PUT', body: file })

      setStatus('parsing')

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

      setStatus('done')
    } catch (e: any) {
      setError(e.message)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
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

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          {status === 'uploading' && <p className="text-orange-500 text-sm mt-4">⬆️ Uploading file...</p>}
          {status === 'parsing' && <p className="text-orange-500 text-sm mt-4">⚙️ Parsing emails... this may take a few minutes.</p>}

          <button
            onClick={handleUpload}
            disabled={!file || status === 'uploading' || status === 'parsing'}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-40 transition"
          >
            {status === 'uploading' ? 'Uploading...' : status === 'parsing' ? 'Parsing...' : 'Upload & Import'}
          </button>
        </>
      )}
    </div>
  )
}
