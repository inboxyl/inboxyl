export default function SettingsPage() {
  return (
    <div className="max-w-xl space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Account */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Account</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Email address</p>
            <p className="text-sm font-medium text-gray-900">user@example.com</p>
          </div>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-orange-500 hover:text-orange-500 transition-colors">
            Change Password
          </button>
        </div>
      </div>

      {/* Export */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Export Data</h2>
        <p className="text-sm text-gray-500 mb-5">
          Download all your emails as an Excel spreadsheet along with a ZIP of all attachments.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
          Download Excel + Attachments ZIP
        </button>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 p-6">
        <h2 className="text-base font-semibold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-500 mb-5">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="border border-red-500 text-red-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  )
}
