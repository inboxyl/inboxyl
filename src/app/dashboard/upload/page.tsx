'use client'
import { useState, useRef } from 'react'

export default function UploadPage() {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload your mailbox file</h1>
      <p className="text-gray-500 text-sm mb-8">
        Import your exported mailbox from Outlook (.pst), Thunderbird, or Apple Mail (.mbox).
      </p>

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <div className="text-5xl mb-4">📁</div>
        {file ? (
          <>
            <p className="text-sm font-semibold text-gray-900 mb-1">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-gray-700 mb-1">Drop your PST or MBOX file here</p>
            <p className="text-xs text-gray-400">or click to browse</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pst,.mbox,.eml"
          className="hidden"
          onChange={e => e.target.files?.[0] && setFile(e.target.files[0])}
        />
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">
        Supported formats: <span className="font-mono">.pst</span>, <span className="font-mono">.mbox</span>, <span className="font-mono">.eml</span>
      </p>

      <button
        disabled={!file}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Upload
      </button>
    </div>
  )
}
