export const ULogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Something went wrong')
      }
  
      const user = await response.json()
      const data = user.map(user => ({
        id: user.ID_u,
        userName: user.Username_u,
        email: user.Email_u,
        role: user.Role_u
      }));
      return data
    } catch (err) {
      console.error('Fetch error:', err)
      throw new Error('Failed to login')
    }
  }
  