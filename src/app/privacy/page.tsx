export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-10">Last updated: June 2026</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
          <p>Inboxyl is an email archiving service operated by [Company name to be added]. We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR).</p>
          <p className="mt-2 text-gray-400 italic">[Data Protection Officer contact and company registration details will be added upon incorporation.]</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. What Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account data:</strong> Email address and password (hashed) when you register.</li>
            <li><strong>Email content:</strong> Emails, attachments, and metadata from mailbox files you upload.</li>
            <li><strong>Usage data:</strong> Log data, IP addresses, and browser information for security and analytics.</li>
            <li><strong>Payment data:</strong> Processed by our payment provider. We do not store card details.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Legal Basis for Processing</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contract performance:</strong> Processing necessary to provide the Service you signed up for.</li>
            <li><strong>Legitimate interests:</strong> Security, fraud prevention, and service improvement.</li>
            <li><strong>Legal obligation:</strong> Compliance with applicable laws.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide and maintain the Service</li>
            <li>To process and store your uploaded email archives</li>
            <li>To send transactional emails (account confirmation, forwarded emails)</li>
            <li>To detect and prevent fraud or abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Storage and Security</h2>
          <p>All data is stored in European data centers (Ireland/EU). We use industry-standard encryption in transit (TLS) and at rest. Email files are stored in Cloudflare R2 (EU region). Database records are stored in Supabase (EU region).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Sharing</h2>
          <p>We do not sell your data. We share data only with the following processors to operate the Service:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Supabase (database and authentication)</li>
            <li>Cloudflare (file storage)</li>
            <li>Railway (email parsing infrastructure)</li>
            <li>Resend (transactional email delivery)</li>
            <li>Vercel (web hosting)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights (GDPR)</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data (data portability)</li>
            <li>Object to or restrict processing</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="mt-3">To exercise your rights, contact us at <a href="mailto:privacy@inboxyl.com" className="text-orange-500 hover:underline">privacy@inboxyl.com</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Cookies</h2>
          <p>We use only essential cookies required for authentication and session management. We do not use tracking or advertising cookies.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Data Retention</h2>
          <p>We retain your data for as long as your account is active. After account deletion, data is permanently removed within 30 days. Backups are purged within 90 days.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you by email of any material changes. Continued use of the Service after changes constitutes acceptance.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
          <p>For privacy-related inquiries: <a href="mailto:privacy@inboxyl.com" className="text-orange-500 hover:underline">privacy@inboxyl.com</a></p>
        </section>

      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <a href="/" className="text-orange-500 hover:underline text-sm">← Back to homepage</a>
      </div>
    </div>
  )
}
