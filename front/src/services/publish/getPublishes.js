export const getPublishes = async () => {
  const response = await fetch("https://web-api-orpin.vercel.app/publish", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error fetching publishes");
  const data = await response.json();
  return data.map((p) => ({
    id: p.id_p,
    text: p.publish_p,
    userId: p.UserID_u_p,
    author: p.Username_u || p.Email_u || "",
    date: p.created_at || p.date || null,
  }));
};
