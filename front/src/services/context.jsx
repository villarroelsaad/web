import { createContext, useState, useEffect } from "react";
// Crea el contexto
const UserContext = createContext();

// Crea un proveedor de contexto

function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error("Error leyendo user de localStorage", err);
      return null;
    }
  });

  // Sincroniza el estado del usuario con localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error("Error guardando user en localStorage", err);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };