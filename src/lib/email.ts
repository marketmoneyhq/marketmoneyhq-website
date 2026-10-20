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

export type QuestionnairePayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  helpWith: string;
  why: string;
  readyToday: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildQuestionnaireHtml(data: QuestionnairePayload) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const rows = [
    ["First name", data.firstName],
    ["Last name", data.lastName],
    ["Phone", data.phone],
    ["Email", data.email],
    ["What do you need help with?", data.helpWith],
    ['What is your "WHY"?', data.why],
    ["Are you ready to get started today?", data.readyToday],
  ];

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New Mentorship Questionnaire</h2>
      <p style="margin:0 0 8px;padding:12px;background:#eff7ff;border:1px solid #bfd9ff;border-radius:8px">
        <strong>From:</strong> ${escapeHtml(fullName)}<br/>
        <strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a><br/>
        <strong>Phone:</strong> ${escapeHtml(data.phone)}<br/>
        <span style="color:#555;font-size:13px">Hit Reply to respond directly to this person.</span>
      </p>
      <p style="margin:0 0 16px;color:#555">Submitted from the Market Money HQ homepage questionnaire.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:10px 12px;border:1px solid #e5e5e5;background:#f7f7f7;font-weight:600;width:38%;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:10px 12px;border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;
}

export async function sendQuestionnaireEmail(
  data: QuestionnairePayload
): Promise<EmailResult> {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const subject = "New Mentorship Questionnaire";
  const html = buildQuestionnaireHtml(data);
  // Gmail requires sending as the authenticated inbox address. Using the
  // visitor's name as the From display name; Reply-To is their email.
  const fromName = fullName.replace(/"/g, "");
  const replyTo = `"${fromName}" <${data.email}>`;

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"${fromName}" <${process.env.GMAIL_USER}>`,
        to: siteConfig.email,
        replyTo,
        subject,
        html,
      });

      return { sent: true, provider: "gmail" };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gmail send failed";
      if (!process.env.RESEND_API_KEY) {
        return { sent: false, reason: message };
      }
    }
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from =
      process.env.RESEND_FROM_EMAIL ||
      "Market Money HQ <onboarding@resend.dev>";
    const result = await resend.emails.send({
      from,
      to: siteConfig.email,
      replyTo: data.email,
      subject,
      html,
    });

    if (result.error) {
      return {
        sent: false,
        reason: result.error.message || "Failed to send questionnaire email",
      };
    }

    return { sent: true, provider: "resend" };
  }

  return {
    sent: false,
    reason:
      "Email is not configured. Add GMAIL_USER + GMAIL_APP_PASSWORD (recommended) or RESEND_API_KEY to .env.local",
  };
}
