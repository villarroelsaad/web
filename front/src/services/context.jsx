import { createContext, useState, useEffect } from "react";

// Clave para almacenar en localStorage
export const LOCAL_STORAGE_KEY = "userAuth";

// Crea el contexto
const UserContext = createContext();

// Crea un proveedor de contexto
function UserProvider({ children }) {
  // 1. Inicializa el estado recuperando el valor de localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      // Si existe un valor almacenado, lo parseamos y usamos
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al recuperar 'user' de localStorage:", error);
      // En caso de error, inicializa a null
      return null;
    }
  });

  // 2. Usa useEffect para guardar el estado en localStorage cada vez que 'user' cambie
  useEffect(() => {
    try {
      if (user !== null) {
        // Guardar el objeto 'user' como una cadena JSON
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } else {
        // Si el usuario es 'null' (logout, etc.), eliminar la clave
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error al guardar 'user' en localStorage:", error);
    }
  }, [user]); // El efecto se ejecuta cada vez que 'user' cambia

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
