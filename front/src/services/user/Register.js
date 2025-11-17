export const Register = async (username, email, password, role = 'user') => {
  try {
    const response = await fetch('https://web-api-orpin.vercel.app/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to register user');
    }

    return await response.json();
  } catch (err) {
    console.error('Register error:', err);
    throw err;
  }
};
