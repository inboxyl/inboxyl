export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-gray-400 text-sm mb-10">Last updated: June 2026</p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using Inboxyl ("Service"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
          <p>Inboxyl is a cloud-based email archiving service that allows users to upload, store, search, and export email mailbox files in PST and MBOX formats. The Service is intended for business use, including archiving emails of current and former employees.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Responsibilities</h2>
          <p>You are solely responsible for ensuring that you have the legal right to upload and process the email data you submit to Inboxyl. This includes obtaining any necessary consents from employees or former employees whose emails you upload, in accordance with applicable data protection laws including the GDPR.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Processing</h2>
          <p>We process your data as a data processor on your behalf. You remain the data controller for all personal data contained in the email files you upload. We store uploaded files and parsed email data securely in European data centers.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Subscription and Payment</h2>
          <p>Inboxyl offers paid subscription plans based on storage usage. Fees are billed monthly. Failure to pay may result in suspension of access. All prices are in EUR and exclude applicable VAT.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
          <p>Your data is retained for as long as your subscription is active. Upon cancellation, your data will be retained for 30 days before permanent deletion. You may export your data at any time before cancellation.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
          <p>Inboxyl is provided "as is". We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount paid by you in the 3 months preceding the claim.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Termination</h2>
          <p>We reserve the right to suspend or terminate your account if you violate these Terms, use the Service for unlawful purposes, or fail to pay applicable fees.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Governing Law</h2>
          <p>These Terms are governed by the laws of Germany. Any disputes shall be subject to the exclusive jurisdiction of the courts of Germany.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
          <p>For questions regarding these Terms, please contact us at <a href="mailto:legal@inboxyl.com" className="text-orange-500 hover:underline">legal@inboxyl.com</a>.</p>
          <p className="mt-2 text-gray-400 italic">[Company name, address, and registration details will be added upon incorporation.]</p>
        </section>

      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <a href="/" className="text-orange-500 hover:underline text-sm">← Back to homepage</a>
      </div>
    </div>
  )
}
