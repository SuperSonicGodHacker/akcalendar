import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOtpEmail(to: string, otp: string): Promise<void> {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Your AK Calendar login code",
    text: `Your one-time login code is: ${otp}\n\nThis code expires in 10 minutes. If you did not request this, ignore this email.`,
  })
}
