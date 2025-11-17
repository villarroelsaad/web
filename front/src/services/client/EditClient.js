export const EditClient = async (id, username, email) => {
    try {
      const response = await fetch(`https://web-api-orpin.vercel.app/client/edit/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
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
