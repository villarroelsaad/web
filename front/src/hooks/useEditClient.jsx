import { useState, useCallback } from 'react';

const useModalFormClient = (initialClient) => {
  const [modal, setModal] = useState(false);
  const [client, setClient] = useState(initialClient); // Estado para el cliente a editar en el modal

  const openModal = useCallback((clientToEdit) => {
    setClient(clientToEdit); // Establecer el cliente que se va a editar
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  }, []);

  return {
    modalE: modal,
    clientE: client,
    openModalE: openModal,
    closeModalE: closeModal,
    handleChangeE: handleChange,
  };
};

export default useModalFormClient;
