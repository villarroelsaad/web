import { useState, useCallback } from "react";

const useModalFormUser = (initialuser) => {
  const [modal, setModal] = useState(false);
  const [userE, setUserE] = useState(initialuser);

  const openModal = useCallback((userToEdit) => {
    setUserE(userToEdit);

    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserE((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }, []);

  return {
    modal,
    userE,
    openModal,
    closeModal,
    handleChange,
  };
};

export default useModalFormUser;
