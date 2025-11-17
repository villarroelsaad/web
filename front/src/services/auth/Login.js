export const ULogin = async (username, password) => {
  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Something went wrong');
    }

    const { authUser } = await response.json();

    const data = {
      UserName: authUser?.Username_u,
      Email: authUser?.Email_u,
      Role: authUser?.Role_u
    };
    return data;

  } catch (err) {
    console.error('Fetch error:', err);
    throw new Error('Failed to login');
  }
};
