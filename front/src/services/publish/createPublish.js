export const createPublish = async (text) => {
  const response = await fetch("https://web-api-orpin.vercel.app/publish", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publish: text }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create publish");
  }
  const p = await response.json().catch(() => ({}));
  // Normalize backend fields to the shape used in the frontend
  const id = p.id_p ?? p.id ?? null;
  if (!id) return null;
  return {
    id,
    text: p.publish_p ?? p.publish ?? "",
    userId: p.UserID_u_p ?? p.userId ?? null,
    author: p.Username_u ?? p.Username ?? p.Email_u ?? p.Email ?? "",
    date: p.created_at ?? p.date ?? null,
  };
};
