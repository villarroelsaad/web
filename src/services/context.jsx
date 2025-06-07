import { createContext, useState } from "react";
// Crea el contexto
const UserContext = createContext();

// Crea un proveedor de contexto

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
