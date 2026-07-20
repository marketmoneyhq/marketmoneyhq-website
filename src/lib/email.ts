import nodemailer from "nodemailer";
import { Resend } from "resend";
import { siteConfig } from "@/lib/metadata";

type EmailResult =
  | { sent: true; provider: "gmail" | "resend" }
  | { sent: false; reason: string };

function buildHtml(fullName: string, email: string, signedAt: string) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">Trading Disclosure Form signed</h2>
      <p>A signed copy of the Trading Disclosure Form is attached for your records.</p>
      <p><strong>Signer:</strong> ${fullName}<br/>
      <strong>Email:</strong> ${email}<br/>
      <strong>Date:</strong> ${signedAt}</p>
      <p style="color:#555;font-size:13px">This PDF includes the electronic signature image.</p>
    </div>
  `;
}

async function sendWithGmail({
  fullName,
  email,
  pdfBuffer,
  signedAt,
}: {
  fullName: string;
  email: string;
  pdfBuffer: Buffer;
  signedAt: string;
}): Promise<EmailResult> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return { sent: false, reason: "Gmail credentials not configured" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const filename = `Trading-Disclosure-${fullName.replace(/\s+/g, "-")}.pdf`;
  const html = buildHtml(fullName, email, signedAt);
  const attachment = {
    filename,
    content: pdfBuffer,
    contentType: "application/pdf",
  };

  await transporter.sendMail({
    from: `"Market Money HQ" <${user}>`,
    to: email,
    bcc: siteConfig.email,
    subject: "Signed Trading Disclosure Form — Market Money HQ",
    html,
    attachments: [attachment],
  });

  // Ensure company inbox always gets a dedicated copy even if BCC is filtered
  if (email.toLowerCase() !== siteConfig.email.toLowerCase()) {
    await transporter.sendMail({
      from: `"Market Money HQ" <${user}>`,
      to: siteConfig.email,
      subject: `[Signed Agreement] ${fullName}`,
      html,
      attachments: [attachment],
    });
  }

  return { sent: true, provider: "gmail" };
}

async function sendWithResend({
  fullName,
  email,
  pdfBuffer,
  signedAt,
}: {
  fullName: string;
  email: string;
  pdfBuffer: Buffer;
  signedAt: string;
}): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { sent: false, reason: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM_EMAIL || "Market Money HQ <onboarding@resend.dev>";
  const filename = `Trading-Disclosure-${fullName.replace(/\s+/g, "-")}.pdf`;
  const html = buildHtml(fullName, email, signedAt);
  const attachment = {
    filename,
    content: pdfBuffer,
  };

  const [customer, company] = await Promise.all([
    resend.emails.send({
      from,
      to: email,
      subject: "Signed Trading Disclosure Form — Market Money HQ",
      html,
      attachments: [attachment],
    }),
    resend.emails.send({
      from,
      to: siteConfig.email,
      subject: `[Signed Agreement] ${fullName}`,
      html,
      attachments: [attachment],
    }),
  ]);

  if (customer.error || company.error) {
    return {
      sent: false,
      reason:
        customer.error?.message ||
        company.error?.message ||
        "Failed to send signed agreement emails",
    };
  }

  return { sent: true, provider: "resend" };
}

export async function sendSignedAgreementEmails(args: {
  fullName: string;
  email: string;
  pdfBuffer: Buffer;
  signedAt: string;
}): Promise<EmailResult> {
  // Prefer Gmail when configured — best fit for marketmoneyhq@gmail.com
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      return await sendWithGmail(args);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gmail send failed";
      // Fall through to Resend if available
      if (!process.env.RESEND_API_KEY) {
        return { sent: false, reason: message };
      }
    }
  }

  if (process.env.RESEND_API_KEY) {
    return sendWithResend(args);
  }

  return {
    sent: false,
    reason:
      "Email is not configured. Add GMAIL_USER + GMAIL_APP_PASSWORD (recommended) or RESEND_API_KEY to .env.local",
  };
}
