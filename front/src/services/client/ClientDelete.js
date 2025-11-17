export const ClientDelete = async (id) => {
    try {
      const response = await fetch(`https://web-api-orpin.vercel.app/client/delete/${id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      if (!response.ok) {
        throw new Error(`Error al eliminar enlace: ${response.statusText}`)
      }
  
      return true
    } catch (err) {
      console.error('Erroel al eliminar el enlace:', err)
      throw err
    }
  }
