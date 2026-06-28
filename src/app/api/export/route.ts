import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import * as XLSX from 'xlsx'
import JSZip from 'jszip'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: emails } = await supabase
    .from('emails')
    .select('id, sender, recipients, subject, body, sent_at, companies(domain), attachments(filename, attachment_code, r2_key)')
    .eq('user_id', user.id)
    .order('sent_at', { ascending: true })

  const zip = new JSZip()
  const attachmentsFolder = zip.folder('attachments')!

  const rows = []
  for (const email of emails || []) {
    const attCodes = []
    for (const att of (email.attachments || [])) {
      attCodes.push(att.attachment_code)
      if (att.r2_key) {
        try {
          const obj = await s3.send(new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: att.r2_key,
          }))
          const buffer = Buffer.from(await obj.Body!.transformToByteArray())
          attachmentsFolder.file(`${att.attachment_code}_${att.filename}`, buffer)
        } catch {}
      }
    }

    rows.push({
      Date: email.sent_at?.slice(0, 10),
      From: email.sender,
      To: email.recipients?.join(', '),
      Subject: email.subject,
      Body: email.body?.slice(0, 500),
      Company: (email.companies as any)?.domain || '',
      Attachments: attCodes.join(', '),
    })
  }

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, 'Emails')
  const xlsxBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  zip.file('emails.xlsx', xlsxBuffer)

  const zipBuffer = await zip.generateAsync({ type: 'uint8array' })
  const blob = new Blob([zipBuffer], { type: 'application/zip' })

  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="inboxyl-export.zip"',
    },
  })
}
