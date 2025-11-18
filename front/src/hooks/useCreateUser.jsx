// useModalFormCreateUser.js

import { useState, useCallback } from "react";
import { Register } from "../services/user/Register";

const useModalFormCreateUser = () => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    role: "user",
  });

  const openModal = useCallback(() => {
    // Opcional: Resetear el formulario al abrir
    setUser({ userName: "", email: "", password: "", role: "user" });
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }, []);

  const handleCreateUser = useCallback(
    async (user) => {
      try {
        const { userName, email, password, role } = user.user;
        await Register(userName, email, password, role);
        // Opcional: Volver a resetear el formulario si el registro es exitoso
        setUser({ userName: "", email: "", password: "", role: "user" });
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    [user]
  ); // 'user' en las dependencias para que use el estado actual al llamar a Register

  return {
    modalU: modal, // Devolvemos el estado
    userU: user, // Devolvemos el objeto de usuario
    openModalU: openModal,
    closeModalU: closeModal,
    handleChangeU: handleChange,
    handleCreateUserU: handleCreateUser,
    // Eliminamos ModalFormU para usar el componente <CreateUserModal />
  };
};

export default useModalFormCreateUser;
