// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ message: 'Missing RESEND_API_KEY' }, { status: 500 })
    }

    const body = await req.json()

    const name = String(body?.name ?? '').trim()
    const email = String(body?.email ?? '').trim()
    const organisation = String(body?.organisation ?? '').trim()
    const reason = String(body?.reason ?? '').trim()
    const message = String(body?.message ?? '').trim()

    const consentRaw = body?.consent
    const consent =
      consentRaw === true ||
      consentRaw === 'true' ||
      consentRaw === 'on' ||
      consentRaw === 1 ||
      consentRaw === '1'

    if (!name || !email || !reason || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    if (!consent) {
      return NextResponse.json({ message: 'Consent is required' }, { status: 400 })
    }

    const to = process.env.CONTACT_TO_EMAIL
    if (!to) {
      return NextResponse.json({ message: 'Missing CONTACT_TO_EMAIL' }, { status: 500 })
    }

    const subject = `New contact: ${reason} — ${name}`

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="margin:0 0 12px;">New Contact Form Submission</h2>
        <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0 0 6px;"><strong>Organisation:</strong> ${escapeHtml(organisation || 'N/A')}</p>
        <p style="margin:0 0 12px;"><strong>Reason:</strong> ${escapeHtml(reason)}</p>
        <div style="padding:12px; border:1px solid #e5e7eb; border-radius:8px;">
          <strong>Message</strong>
          <p style="margin:8px 0 0; white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      </div>
    `

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to,
      subject,
      replyTo: email,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 })
  }
}