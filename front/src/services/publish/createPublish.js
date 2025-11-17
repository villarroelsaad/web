export const createPublish = async (text) => {
  const response = await fetch("https://web-api-orpin.vercel.app/publish", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publish_p: text }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create publish");
  }
  return await response.json();
};
