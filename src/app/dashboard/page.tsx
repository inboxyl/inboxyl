import Link from 'next/link'

const emailConnected = false
const pstUploaded = false

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Manage your email archive</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Email import card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="text-5xl mb-5">📧</div>
          {emailConnected ? (
            <>
              <p className="text-sm font-semibold text-gray-900 mb-1">user@gmail.com connected</p>
              <p className="text-xs text-gray-500 mb-1">Jan 2020 to Jun 2025</p>
              <p className="text-xs text-gray-500 mb-6">4,521 emails · 2.3 GB</p>
              <button className="text-sm border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors">
                Re-import
              </button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Connect your email</h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Download all your emails directly from Gmail, Outlook or any IMAP account.
              </p>
              <Link
                href="/dashboard/connect"
                className="inline-block bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Connect Mail
              </Link>
            </>
          )}
        </div>

        {/* PST upload card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="text-5xl mb-5">🗄️</div>
          {pstUploaded ? (
            <>
              <p className="text-sm font-semibold text-gray-900 mb-1">archive.pst uploaded</p>
              <p className="text-xs text-gray-500 mb-1">Mar 2018 to Dec 2022</p>
              <p className="text-xs text-gray-500 mb-6">12,840 emails · 8.7 GB</p>
              <button className="text-sm border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors">
                Re-upload
              </button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Upload PST / Thunderbird file</h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Import your exported mailbox file from Outlook, Thunderbird, or Apple Mail.
              </p>
              <Link
                href="/dashboard/upload"
                className="inline-block bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Upload File
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
