"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend("re_eftZaWc4_Nhc3CLxiZrBWtihFb5dZxA1T");

type ContactEmailData = {
  meno: string;
  email: string;
  telefon: string;
  sprava: string;
};

export type ContactFormState = {
  ok: boolean;
  message: string;
};

const emailPhoneSubmissions = new Map<string, number>();
const ipSubmissions = new Map<string, number[]>();
const submissionCooldownMs = 60_000;
const ipWindowMs = 60 * 60 * 1000;
const maxSubmissionsPerIp = 5;
const minRecaptchaScore = 0.5;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sendEmail({ meno, email, telefon, sprava }: ContactEmailData) {
  const html = '<table width:"100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1a1a1a;max-width: 560px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;"><tr><td align="center" style="padding:36px 40px 24px;"><img src="https://plutoprime.tiiny.site/logo.svg" width="120" height="118" alt="PLUTO Prime logo" style="display:block;margin:0 auto 20px;"><div style="font-size:22px;font-weight:700;color:#ECC560;letter-spacing:4px;">PLUTO PRIME</div><div style="font-size:11px;color:#888888;letter-spacing:3px;margin-top:8px;">NOVÝ DOPYT Z WEBU</div></td></tr><tr><td style="padding:0 40px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #2e2e2e;"></td></tr></table></td></tr><tr><td style="padding:28px 40px 8px;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">MENO</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><span style="font-size:14px;color:#ffffff;">{{meno}}</span></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">E-MAIL</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><a href="mailto:{{email}}" style="font-size:14px;color:#ECC560;text-decoration:none;">{{email}}</a></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">TELEFÓN</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><span style="font-size:14px;color:#ffffff;">{{telefon}}</span></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">SPRÁVA</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:14px 14px;"><span style="font-size:14px;color:#cccccc;line-height:1.6;">{{sprava}}</span></td></tr></table></td></tr><tr><td align="center" style="padding:0 40px 36px;"><a href="mailto:{{email}}" style="display:inline-block;background-color:#ECC560;color:#1a1a1a;font-size:13px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:4px;letter-spacing:1px;">ODPOVEDAŤ ZÁUJEMCOVI</a></td></tr><tr><td style="padding:0 40px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #2e2e2e;"></td></tr></table></td></tr><tr><td align="center" style="padding:20px 40px;"><span style="font-size:11px;color:#555555;">© 2025 PLUTO Prime &nbsp;·&nbsp; plutoprime.nl</span></td></tr></table>'
    .replaceAll("{{meno}}", escapeHtml(meno))
    .replaceAll("{{email}}", escapeHtml(email))
    .replaceAll("{{telefon}}", escapeHtml(telefon))
    .replaceAll("{{sprava}}", escapeHtml(sprava));

  return resend.emails.send({
    from: "onboarding@resend.dev",
    to: "spreyyo@gmail.com",
    subject: "Pluto Prime contact form email",
    html,
  });
}

function getFormString(formData: FormData, key: string, maxLength = 1000) {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhonePrefix(value: string) {
  return /^\+\d{1,4}$/.test(value);
}

function isValidPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  return (
    digits.length >= 5 &&
    digits.length <= 14 &&
    /^[\d\s().-]{5,24}$/.test(value)
  );
}

function isEmailPhoneRateLimited(key: string) {
  const now = Date.now();
  const lastSubmissionAt = emailPhoneSubmissions.get(key);

  if (lastSubmissionAt && now - lastSubmissionAt < submissionCooldownMs) {
    return true;
  }

  emailPhoneSubmissions.set(key, now);
  return false;
}

function getClientIp(headersList: Headers) {
  const forwardedFor = headersList.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") ||
    "unknown"
  );
}

function isIpRateLimited(ip: string) {
  const now = Date.now();
  const recentAttempts = (ipSubmissions.get(ip) || []).filter(
    (timestamp) => now - timestamp < ipWindowMs,
  );

  if (recentAttempts.length >= maxSubmissionsPerIp) {
    ipSubmissions.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  ipSubmissions.set(ip, recentAttempts);
  return false;
}

async function verifyRecaptcha(token: string, ip: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return false;
  }

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip !== "unknown") {
    body.set("remoteip", ip);
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };

  return (
    result.success === true &&
    result.action === "contact_form" &&
    typeof result.score === "number" &&
    result.score >= minRecaptchaScore
  );
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const headersList = await headers();
  const ip = getClientIp(headersList);

  if (isIpRateLimited(ip)) {
    return {
      ok: false,
      message: "Príliš veľa pokusov. Skúste to prosím neskôr.",
    };
  }

  const honeypot = getFormString(formData, "company", 200);
  const recaptchaToken = getFormString(formData, "recaptchaToken", 4000);
  const firstName = getFormString(formData, "firstName", 80);
  const lastName = getFormString(formData, "lastName", 80);
  const email = getFormString(formData, "email", 254);
  const phonePrefix = getFormString(formData, "phonePrefix", 5);
  const phone = getFormString(formData, "phone", 24);
  const message = getFormString(formData, "message", 2000);
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const combinedPhone = `${phonePrefix} ${phone}`.trim();
  const combinedPhoneDigits = combinedPhone.replace(/\D/g, "");

  if (honeypot) {
    return { ok: true, message: "Ďakujeme, správa bola odoslaná." };
  }

  const recaptchaPassed = await verifyRecaptcha(recaptchaToken, ip);

  if (!recaptchaPassed) {
    return {
      ok: false,
      message: "Overenie formulára zlyhalo. Skúste to prosím znova.",
    };
  }

  if (
    !fullName ||
    !isValidEmail(email) ||
    !isValidPhonePrefix(phonePrefix) ||
    !isValidPhoneNumber(phone) ||
    combinedPhoneDigits.length < 7 ||
    combinedPhoneDigits.length > 15 ||
    message.length < 10
  ) {
    return {
      ok: false,
      message: "Skontrolujte prosím vyplnené údaje.",
    };
  }

  const rateLimitKey = `${email.toLowerCase()}|${combinedPhoneDigits}`;

  if (isEmailPhoneRateLimited(rateLimitKey)) {
    return {
      ok: false,
      message: "Formulár bol odoslaný príliš rýchlo po sebe.",
    };
  }

  await sendEmail({
    meno: fullName,
    email,
    telefon: combinedPhone,
    sprava: message,
  });

  return {
    ok: true,
    message: "Ďakujeme, správa bola odoslaná.",
  };
}
