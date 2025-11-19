export const Create = async (name, email,) => {
  console.log("Creating client with:", name, email);
  try {
    const response = await fetch('https://web-api-orpin.vercel.app/client/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to register client');
    }

    return await response.json();
  } catch (err) {
    console.error('Register error:', err);
    throw err;
  }
};
