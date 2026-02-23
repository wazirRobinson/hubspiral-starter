// services/emailService.js
const nodemailer = require('nodemailer')

/**
 * FIX B: allow self-signed certificates (works immediately).
 * NOTE: This relaxes TLS verification for SMTP.
 */

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false, // 587 = STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  // IMPORTANT: this is the actual fix for "self-signed certificate in certificate chain"
  tls: {
    rejectUnauthorized: false,
  },
})

async function sendContactEmail({
  fullName,
  email,
  phone,
  company,
  service,
  budget,
  timeline,
  source,
  message,
}) {
  const to = process.env.CONTACT_TO || process.env.EMAIL_USER

  return transporter.sendMail({
    from: `"HubSpiral Contact" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: email,
    subject: `New inquiry: ${fullName} (${service})`,
    text: [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || '-'}`,
      `Company: ${company || '-'}`,
      `Service: ${service}`,
      `Budget: ${budget || '-'}`,
      `Timeline: ${timeline || '-'}`,
      `Source: ${source || '-'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  })
}

module.exports = { sendContactEmail }
