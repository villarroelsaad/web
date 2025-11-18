export const DeleteU = async (id) => {
    try {
      const response = await fetch(`https://web-api-orpin.vercel.app/user/delete/${id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el usuario: ${response.statusText}`)
      }
  
      return true
    } catch (err) {
      console.error('Erroel al eliminar el usuario:', err)
      throw err
    }
  }
