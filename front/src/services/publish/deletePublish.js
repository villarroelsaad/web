export const deletePublish = async (id) => {
  const response = await fetch(`http://localhost:3000/publish/${id}`, {
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
