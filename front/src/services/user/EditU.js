export const EditU = async (id, userName, email, role) => {
    try {
      const response = await fetch(`https://web-api-orpin.vercel.app/user/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userName, email, role)

      })
      console.log(JSON.stringify(userName, email, role))
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Something went wrong')
      }
  
      const user = await response.json()
      return user
    } catch (err) {
      console.error('Fetch error:', err)
      throw new Error('Failed edit user')
    }
  }
