export const LogOut = async () => {
    try {
      const response = await fetch('https://web-api-orpin.vercel.app/user/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Something went wrong')
      }
  
      const mess = await response.json()
      return mess
    } catch (err) {
      console.error('Fetch error:', err)
      throw new Error('Err')
    }
  }
