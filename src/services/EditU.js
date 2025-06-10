export const EditU = async (username, email, role, id) => {
    try {
      const response = await fetch(`http://localhost/3000/user/edit/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email,role })
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Something went wrong')
      }
  
      const user = await response.json()
      return user
    } catch (err) {
      console.error('Fetch error:', err)
      throw new Error('Failed to login')
    }
  }
  