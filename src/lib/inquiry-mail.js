import "server-only";
import nodemailer from "nodemailer";
import { companyProfile } from "@/data/landingpage-content";

let cachedTransporter;

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getMailTransport() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const smtpUser = getRequiredEnv("GMAIL_SMTP_USER");
  const smtpPass = getRequiredEnv("GMAIL_SMTP_PASS");

  cachedTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  return cachedTransporter;
}

function getMailSender() {
  const smtpUser = getRequiredEnv("GMAIL_SMTP_USER");
  const configuredFrom = process.env.MAIL_FROM?.trim();

  return configuredFrom || smtpUser;
}

function getMailReplyTo() {
  const configuredReplyTo = process.env.MAIL_REPLY_TO?.trim();

  if (configuredReplyTo) {
    return configuredReplyTo;
  }

  return getMailSender();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailContent({ fullName, selectedService }) {
  const safeName = fullName || "there";
  const safeHtmlName = escapeHtml(safeName);
  const safeHtmlService = escapeHtml(selectedService);
  const serviceLine = selectedService
    ? ` regarding ${selectedService}`
    : "";
  const subject = `We received your inquiry | ${companyProfile.name}`;
  const text = `Hello ${safeName},

Thank you for contacting ${companyProfile.name}.

This email confirms that we received your inquiry${serviceLine}. Our team will review your request carefully and get back to you soon.

If we need any additional information, we will contact you using this email address.

Best regards,
${companyProfile.name}`;
  const html = `
    <div style="margin:0;padding:24px;background:#f6f7fb;font-family:Arial,sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
        <tr>
          <td style="padding:32px 32px 20px;background:#0f172a;color:#f8fafc;">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#cbd5e1;">Inquiry Confirmation</p>
            <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:700;">We received your inquiry</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Hello ${safeHtmlName},</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
              Thank you for contacting <strong>${companyProfile.name}</strong>.
            </p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
              This email confirms that we received your inquiry${escapeHtml(serviceLine)}. Our team will review your request carefully and get back to you soon.
            </p>
            <p style="margin:0 0 24px;font-size:16px;line-height:1.7;">
              If we need any additional information, we will contact you using this email address.
            </p>
            <div style="padding:18px 20px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;">
              <p style="margin:0 0 6px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Selected Plan</p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#0f172a;">${safeHtmlService}</p>
            </div>
            <p style="margin:24px 0 0;font-size:16px;line-height:1.7;">
              Best regards,<br />
              <strong>${companyProfile.name}</strong>
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;

  return { subject, text, html };
}

export async function sendInquiryConfirmationEmail({
  fullName,
  email,
  selectedService,
}) {
  const transporter = getMailTransport();
  const { subject, text, html } = buildEmailContent({
    fullName,
    selectedService,
  });

  return transporter.sendMail({
    from: getMailSender(),
    to: email,
    replyTo: getMailReplyTo(),
    subject,
    text,
    html,
  });
}
