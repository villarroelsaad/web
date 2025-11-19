import { useState, useCallback } from "react";
import { Create } from "../services/client/Create";

const useModalFormCreateClient = ({ handleReload }) => {
  const [modal, setModal] = useState(false);
  const [client, setclient] = useState({
    name: "",
    email: "",
  });

  const openModal = useCallback(() => {
    // Opcional: Resetear el formulario al abrir
    setclient({ name: "", email: "" });
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setclient((prevclient) => ({
      ...prevclient,
      [name]: value,
    }));
  }, []);

  const handleCreateClient = useCallback(
    async (client) => {
      try {
        const { name, email } = client;

        await Create(name, email);
        alert("Cliente creado correctamente");
        handleReload();
      } catch (error) {
        console.error("Error creating client:", error);
      }
    },
    [client, handleReload]
  ); // 'client' en las dependencias para que use el estado actual al llamar a Register

  return {
    modalC: modal, // Devolvemos el estado
    client: client, // Devolvemos el objeto de usuario
    openModalC: openModal,
    closeModalC: closeModal,
    handleChangeC: handleChange,
    handleCreateClient: handleCreateClient,
    // Eliminamos ModalFormU para usar el componente <CreateclientModal />
  };
};

export default useModalFormCreateClient;
