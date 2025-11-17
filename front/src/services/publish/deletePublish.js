export const deletePublish = async (id) => {
  const response = await fetch(`https://web-api-orpin.vercel.app/publish/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed to delete publish");
  }
  return await response.json();
};
