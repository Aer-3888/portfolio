export async function sendContactEmail({ name, email, message, time }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const toEmail = import.meta.env.VITE_CONTACT_TO;

  if (!serviceId || !templateId || !userId) {
    throw new Error("EMAILJS_NOT_CONFIGURED");
  }

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: userId,
    template_params: {
      from_name: name,
      from_email: email,
      message,
      time,
      ...(toEmail ? { to_email: toEmail } : {}),
    },
  };

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || "Email send failed");
  }

  return true;
}

export default sendContactEmail;
