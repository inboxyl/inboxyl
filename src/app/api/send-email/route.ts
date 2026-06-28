import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request) {
  const { emailId } = await req.json()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: email } = await supabase
    .from('emails')
    .select('sender, recipients, subject, body, attachments(filename, attachment_code, r2_key, file_size)')
    .eq('id', emailId)
    .eq('user_id', user.id)
    .single()

  if (!email) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const attachments = []
  for (const att of (email.attachments || [])) {
    if (!att.r2_key) continue
    try {
      const obj = await s3.send(new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: att.r2_key,
      }))
      const buffer = Buffer.from(await obj.Body!.transformToByteArray())
      attachments.push({
        filename: att.filename,
        content: buffer.toString('base64'),
      })
    } catch {}
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Inboxyl <info@inboxyl.com>',
      to: [user.email],
      subject: `[Forwarded] ${email.subject}`,
      html: `
        <p><strong>Original From:</strong> ${email.sender}</p>
        <p><strong>Original To:</strong> ${email.recipients?.join(', ')}</p>
        <hr/>
        <div style="white-space:pre-wrap">${email.body}</div>
      `,
      attachments,
    }),
  })

  if (!res.ok) return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  return NextResponse.json({ success: true })
}
