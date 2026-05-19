import express from "express";
import { Resend } from "resend";

const app = express();
const port = Number(process.env.PORT || 3002);
const endpointPath = process.env.CONTACT_ENDPOINT_PATH || "/contact";
const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN || "";
const resendApiKey = process.env.RESEND_API_KEY || "";
const resendFromEmail = process.env.RESEND_FROM_EMAIL || "dev@vktr.me";
const contactToEmail = process.env.CONTACT_TO_EMAIL || "musicgamermail@gmail.com";

const resend = resendApiKey ? new Resend(resendApiKey) : null;
const emailPhoneSubmissions = new Map();
const ipSubmissions = new Map();
const submissionCooldownMs = 60_000;
const ipWindowMs = 60 * 60 * 1000;
const maxSubmissionsPerIp = 5;
const maxPhotoCount = 4;
const maxPhotoSizeBytes = 5 * 1024 * 1024;
const maxMultipartBodyBytes = 22 * 1024 * 1024;
const acceptedPhotoTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

app.use(express.json({ limit: "32kb" }));

app.use((request, response, next) => {
  const requestOrigin = request.headers.origin;
  const responseOrigin = allowedOrigin || requestOrigin || "*";

  response.setHeader("Access-Control-Allow-Origin", responseOrigin);
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (allowedOrigin && requestOrigin && requestOrigin !== allowedOrigin) {
    return response.status(403).json(status(false, "submitFailed"));
  }

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  return next();
});

function status(ok, code) {
  return { ok, code };
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getBodyValue(body, key, maxLength = 1000) {
  return String(body?.[key] ?? "")
    .trim()
    .slice(0, maxLength);
}

function getHeaderValue(headers, key) {
  const value = headers[key];

  return Array.isArray(value) ? value[0] : value || "";
}

function getMultipartBoundary(contentType) {
  const match = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType);

  return match?.[1] || match?.[2] || "";
}

function parseHeaderParams(value) {
  const params = {};
  const paramPattern = /;\s*([^=]+)="([^"]*)"/g;
  let match;

  while ((match = paramPattern.exec(value))) {
    params[match[1].toLowerCase()] = match[2];
  }

  return params;
}

function readRequestBuffer(request, limitBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;

    request.on("data", (chunk) => {
      totalBytes += chunk.length;

      if (totalBytes > limitBytes) {
        reject(new Error("Multipart body exceeds size limit"));
        request.destroy();
        return;
      }

      chunks.push(chunk);
    });

    request.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    request.on("error", reject);
  });
}

function parseMultipartBody(buffer, boundary) {
  const body = {};
  const photos = [];
  const delimiter = Buffer.from(`--${boundary}`);
  const boundaryWithPrefix = Buffer.from(`\r\n--${boundary}`);
  let boundaryIndex = buffer.indexOf(delimiter);

  while (boundaryIndex !== -1) {
    let partStart = boundaryIndex + delimiter.length;

    if (
      buffer[partStart] === "-".charCodeAt(0) &&
      buffer[partStart + 1] === "-".charCodeAt(0)
    ) {
      break;
    }

    if (
      buffer[partStart] === "\r".charCodeAt(0) &&
      buffer[partStart + 1] === "\n".charCodeAt(0)
    ) {
      partStart += 2;
    }

    const headersEnd = buffer.indexOf(Buffer.from("\r\n\r\n"), partStart);

    if (headersEnd === -1) {
      break;
    }

    const contentStart = headersEnd + 4;
    const nextBoundaryIndex = buffer.indexOf(
      boundaryWithPrefix,
      contentStart,
    );

    if (nextBoundaryIndex === -1) {
      break;
    }

    const headers = buffer.slice(partStart, headersEnd).toString("utf8");
    const disposition = headers
      .split("\r\n")
      .find((header) =>
        header.toLowerCase().startsWith("content-disposition:"),
      );
    const contentTypeHeader = headers
      .split("\r\n")
      .find((header) => header.toLowerCase().startsWith("content-type:"));

    if (disposition) {
      const params = parseHeaderParams(disposition);
      const fieldName = params.name;
      const filename = params.filename;
      const content = buffer.slice(contentStart, nextBoundaryIndex);

      if (fieldName === "photos" && filename && content.length > 0) {
        const contentType =
          contentTypeHeader?.split(":").slice(1).join(":").trim() ||
          "application/octet-stream";

        photos.push({
          filename,
          contentType,
          content,
        });
      } else if (fieldName) {
        body[fieldName] = content.toString("utf8");
      }
    }

    boundaryIndex = nextBoundaryIndex + 2;
  }

  return { body, photos };
}

async function getSubmissionData(request) {
  const contentType = getHeaderValue(request.headers, "content-type");

  if (contentType.toLowerCase().startsWith("multipart/form-data")) {
    const boundary = getMultipartBoundary(contentType);

    if (!boundary) {
      throw new Error("Missing multipart boundary");
    }

    const buffer = await readRequestBuffer(request, maxMultipartBodyBytes);

    return parseMultipartBody(buffer, boundary);
  }

  return {
    body: request.body || {},
    photos: [],
  };
}

function isValidEmail(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhonePrefix(value) {
  return /^\+\d{1,4}$/.test(value);
}

function isValidPhoneNumber(value) {
  const digits = value.replace(/\D/g, "");

  return (
    digits.length >= 5 &&
    digits.length <= 14 &&
    /^[\d\s().-]{5,24}$/.test(value)
  );
}

function sanitizeFilename(value, fallback) {
  const filename = String(value || fallback)
    .split(/[\\/]/)
    .pop()
    .replace(/[^\w.-]/g, "_")
    .slice(0, 120);

  return filename || fallback;
}

function hasValidImageSignature(photo) {
  const { content, contentType } = photo;

  if (contentType === "image/jpeg") {
    return content[0] === 0xff && content[1] === 0xd8 && content[2] === 0xff;
  }

  if (contentType === "image/png") {
    return content.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );
  }

  if (contentType === "image/gif") {
    const signature = content.subarray(0, 6).toString("ascii");

    return signature === "GIF87a" || signature === "GIF89a";
  }

  if (contentType === "image/webp") {
    return (
      content.subarray(0, 4).toString("ascii") === "RIFF" &&
      content.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  return false;
}

function normalizePhotos(photos) {
  if (photos.length > maxPhotoCount) {
    return null;
  }

  const normalizedPhotos = photos.map((photo, index) => ({
    filename: sanitizeFilename(photo.filename, `photo-${index + 1}`),
    contentType: photo.contentType.toLowerCase(),
    content: photo.content,
    contentId: `contact-photo-${index + 1}@plutoprime`,
  }));

  if (
    normalizedPhotos.some(
      (photo) =>
        photo.content.length > maxPhotoSizeBytes ||
        !acceptedPhotoTypes.has(photo.contentType) ||
        !hasValidImageSignature(photo),
    )
  ) {
    return null;
  }

  return normalizedPhotos;
}

function buildPhotosHtml(photos) {
  if (!photos.length) {
    return "";
  }

  const images = photos
    .map(
      (photo) =>
        `<tr><td style="padding:0 0 14px;"><img src="cid:${escapeHtml(photo.contentId)}" alt="${escapeHtml(photo.filename)}" style="display:block;width:100%;max-width:480px;height:auto;border-radius:4px;border:1px solid #333333;"><div style="font-size:11px;color:#888888;margin-top:6px;">${escapeHtml(photo.filename)}</div></td></tr>`,
    )
    .join("");

  return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">FOTKY</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:14px;"><table width="100%" cellpadding="0" cellspacing="0" border="0">${images}</table></td></tr></table>`;
}

function isEmailPhoneRateLimited(key) {
  const now = Date.now();
  const lastSubmissionAt = emailPhoneSubmissions.get(key);

  if (lastSubmissionAt && now - lastSubmissionAt < submissionCooldownMs) {
    return true;
  }

  emailPhoneSubmissions.set(key, now);
  return false;
}

function getClientIp(request) {
  const forwardedFor = request.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers["x-real-ip"] ||
    request.headers["cf-connecting-ip"] ||
    request.ip ||
    "unknown"
  );
}

function isIpRateLimited(ip) {
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

async function sendEmail({ meno, email, telefon, sprava, photos }) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const photosHtml = buildPhotosHtml(photos);
  const html = '<table width:"100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1a1a1a;max-width: 560px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;"><tr><td align="center" style="padding:36px 40px 24px;"><img src="https://plutoprime.tiiny.site/logo.svg" width="120" height="118" alt="PLUTO Prime logo" style="display:block;margin:0 auto 20px;"><div style="font-size:22px;font-weight:700;color:#ECC560;letter-spacing:4px;">PLUTO PRIME</div><div style="font-size:11px;color:#888888;letter-spacing:3px;margin-top:8px;">NOVÝ DOPYT Z WEBU</div></td></tr><tr><td style="padding:0 40px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #2e2e2e;"></td></tr></table></td></tr><tr><td style="padding:28px 40px 8px;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">MENO</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><span style="font-size:14px;color:#ffffff;">{{meno}}</span></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">E-MAIL</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><a href="mailto:{{email}}" style="font-size:14px;color:#ECC560;text-decoration:none;">{{email}}</a></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">TELEFÓN</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><span style="font-size:14px;color:#ffffff;">{{telefon}}</span></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">SPRÁVA</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:14px 14px;"><span style="font-size:14px;color:#cccccc;line-height:1.6;">{{sprava}}</span></td></tr></table></td></tr><tr><td align="center" style="padding:0 40px 36px;"><a href="mailto:{{email}}" style="display:inline-block;background-color:#ECC560;color:#1a1a1a;font-size:13px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:4px;letter-spacing:1px;">ODPOVEDAŤ ZÁUJEMCOVI</a></td></tr><tr><td style="padding:0 40px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #2e2e2e;"></td></tr></table></td></tr><tr><td align="center" style="padding:20px 40px;"><span style="font-size:11px;color:#555555;">© 2025 PLUTO Prime &nbsp;·&nbsp; plutoprime.nl</span></td></tr></table>'
    .replaceAll("{{meno}}", escapeHtml(meno))
    .replaceAll("{{email}}", escapeHtml(email))
    .replaceAll("{{telefon}}", escapeHtml(telefon))
    .replaceAll("{{sprava}}", escapeHtml(sprava))
    .replace("</td></tr><tr><td align=\"center\"", `${photosHtml}</td></tr><tr><td align="center"`);

  return resend.emails.send({
    from: resendFromEmail,
    to: contactToEmail,
    subject: `PLUTO PRIME - Nový dopyt - ${meno}`,
    html,
    attachments: photos.length
      ? photos.map((photo) => ({
          filename: photo.filename,
          content: photo.content,
          contentType: photo.contentType,
          contentId: photo.contentId,
        }))
      : undefined,
  });
}

app.post(endpointPath, async (request, response) => {
  const ip = getClientIp(request);

  if (isIpRateLimited(ip)) {
    return response.status(200).json(status(false, "ipRateLimited"));
  }

  try {
    const { body, photos } = await getSubmissionData(request);
    const normalizedPhotos = normalizePhotos(photos);
    const honeypot = getBodyValue(body, "company", 200);
    const firstName = getBodyValue(body, "firstName", 80);
    const lastName = getBodyValue(body, "lastName", 80);
    const email = getBodyValue(body, "email", 254);
    const phonePrefix = getBodyValue(body, "phonePrefix", 5);
    const phone = getBodyValue(body, "phone", 24);
    const message = getBodyValue(body, "message", 2000);
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const combinedPhone = `${phonePrefix} ${phone}`.trim();
    const combinedPhoneDigits = combinedPhone.replace(/\D/g, "");

    if (honeypot) {
      return response.status(200).json(status(true, "success"));
    }

    if (
      !fullName ||
      !isValidEmail(email) ||
      !isValidPhonePrefix(phonePrefix) ||
      !isValidPhoneNumber(phone) ||
      combinedPhoneDigits.length < 7 ||
      combinedPhoneDigits.length > 15 ||
      message.length < 10 ||
      !normalizedPhotos
    ) {
      return response.status(200).json(status(false, "validationFailed"));
    }

    const rateLimitKey = `${email.toLowerCase()}|${combinedPhoneDigits}`;

    if (isEmailPhoneRateLimited(rateLimitKey)) {
      return response.status(200).json(status(false, "emailPhoneRateLimited"));
    }

    await sendEmail({
      meno: fullName,
      email,
      telefon: combinedPhone,
      sprava: message,
      photos: normalizedPhotos,
    });

    return response.status(200).json(status(true, "success"));
  } catch {
    return response.status(500).json(status(false, "submitFailed"));
  }
});

app.get("/health", (_request, response) => {
  response.status(200).json({ ok: true });
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}${endpointPath}`);
});
