const requiredFields = ["name", "email", "organization", "prompt"];

function getAll(formData, name) {
  return formData.getAll(name).map((value) => String(value).trim()).filter(Boolean);
}

function getOne(formData, name) {
  return String(formData.get(name) || "").trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function textBlock(label, value) {
  if (Array.isArray(value)) value = value.length ? value.join(", ") : "—";
  if (!value) value = "—";
  return `${label}: ${value}`;
}

function htmlRow(label, value) {
  if (Array.isArray(value)) value = value.length ? value.join(", ") : "—";
  if (!value) value = "—";
  return `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`;
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();

  // Honeypot: real people should never fill this hidden field.
  if (getOne(formData, "website")) {
    return jsonResponse({ ok: true });
  }

  const missing = requiredFields.filter((field) => !getOne(formData, field));
  if (missing.length) {
    return jsonResponse({ ok: false, error: `Missing required fields: ${missing.join(", ")}` }, 400);
  }

  const email = getOne(formData, "email");
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return jsonResponse({ ok: false, error: "Please provide a valid email address." }, 400);
  }

  const submission = {
    name: getOne(formData, "name"),
    email,
    organization: getOne(formData, "organization"),
    role: getOne(formData, "role"),
    audience: getAll(formData, "audience"),
    support: getAll(formData, "support"),
    prompt: getOne(formData, "prompt"),
    trigger: getOne(formData, "trigger"),
    timing: getOne(formData, "timing"),
    utm_source: getOne(formData, "utm_source"),
    utm_medium: getOne(formData, "utm_medium"),
    utm_campaign: getOne(formData, "utm_campaign"),
    utm_content: getOne(formData, "utm_content"),
    utm_term: getOne(formData, "utm_term"),
    referrer: getOne(formData, "referrer"),
    landing_page: getOne(formData, "landing_page") || request.headers.get("referer") || "",
    submitted_at: new Date().toISOString()
  };

  const to = env.CONTACT_TO || "metaviews@gmail.com";
  const from = env.CONTACT_FROM || "MetaViews Trust <onboarding@resend.dev>";
  const subject = `New AI buy-in inquiry — ${submission.organization}`;
  const replyTo = `${submission.name} <${submission.email}>`;

  const text = [
    "New trust.metaviews.ca inquiry",
    "",
    textBlock("Name", submission.name),
    textBlock("Email", submission.email),
    textBlock("Organization", submission.organization),
    textBlock("Role/title", submission.role),
    textBlock("Audience", submission.audience),
    textBlock("Support that might help", submission.support),
    textBlock("What they are trying to work through", submission.prompt),
    textBlock("What prompted this now", submission.trigger),
    textBlock("Preferred timing", submission.timing),
    "",
    "Campaign context",
    textBlock("UTM source", submission.utm_source),
    textBlock("UTM medium", submission.utm_medium),
    textBlock("UTM campaign", submission.utm_campaign),
    textBlock("UTM content", submission.utm_content),
    textBlock("UTM term", submission.utm_term),
    textBlock("Referrer", submission.referrer),
    textBlock("Landing page", submission.landing_page),
    textBlock("Submitted at", submission.submitted_at)
  ].join("\n");

  const html = [
    "<h1>New trust.metaviews.ca inquiry</h1>",
    htmlRow("Name", submission.name),
    htmlRow("Email", submission.email),
    htmlRow("Organization", submission.organization),
    htmlRow("Role/title", submission.role),
    htmlRow("Audience", submission.audience),
    htmlRow("Support that might help", submission.support),
    htmlRow("What they are trying to work through", submission.prompt),
    htmlRow("What prompted this now", submission.trigger),
    htmlRow("Preferred timing", submission.timing),
    "<h2>Campaign context</h2>",
    htmlRow("UTM source", submission.utm_source),
    htmlRow("UTM medium", submission.utm_medium),
    htmlRow("UTM campaign", submission.utm_campaign),
    htmlRow("UTM content", submission.utm_content),
    htmlRow("UTM term", submission.utm_term),
    htmlRow("Referrer", submission.referrer),
    htmlRow("Landing page", submission.landing_page),
    htmlRow("Submitted at", submission.submitted_at)
  ].join("\n");

  if (!env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY for trust.metaviews.ca contact form", submission);
    return jsonResponse({ ok: false, error: "Contact form email is not configured yet." }, 503);
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html
    })
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend contact form failure", resendResponse.status, errorText);
    return jsonResponse({ ok: false, error: "Contact form email could not be sent." }, 502);
  }

  return jsonResponse({ ok: true });
}

export async function onRequestGet() {
  return jsonResponse({ ok: false, error: "Use POST to submit the contact form." }, 405);
}
