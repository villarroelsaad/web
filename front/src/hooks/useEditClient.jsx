import { useState, useCallback } from 'react';

const useModalForm = (initialClient, handleEditClient) => {
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

  // Función para renderizar el modal
  const ModalForm = useCallback(() => {
    if (!modal || !client) return null; // No renderizar si el modal no está abierto o no hay cliente

    return (
      <dialog className="dark:bg-[#27272a]" open={modal}>
        <form
          id={client.id}
          method="dialog"
          className="p-11 border border-sky-500 dark:bg-[#27272a] text-gray-800 dark:text-gray-300 rounded-md shadow-lg "
        >
          <h2 className="text-xl font-bold mb-6">Editar Cliente</h2>
          <label className="block text-base font-bold mb-3">
            Nombre:
            <input
              type="text"
              name="name" // Añade el atributo 'name' para el handleChange
              autoComplete="name"
              value={client.name}
              onChange={handleChange}
              className="w-full p-1 pl-2  font-medium border rounded-lg dark:bg-[#27272a] dark:focus:bg-[#232321] focus:bg-gray-100 bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1  border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
            />
          </label>
          <label className="block text-base font-bold mb-3">
            Correo:
            <input
              type="email"
              name="email" // Añade el atributo 'name'
              autoComplete="email"
              value={client.email}
              onChange={handleChange}
              className="w-full p-1 pl-2 font-medium border rounded-lg dark:bg-[#27272a] dark:focus:bg-[#232321] focus:bg-gray-100 bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1  border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
            />
          </label>
          <label className="block text-base font-bold mb-3">
            Rol:
            <select
              name="role" // Añade el atributo 'name'
              value={client.role}
              onChange={handleChange}
              className="mb-4 w-full p-1 pl-2 font-medium border rounded-lg dark:bg-[#27272a] bg-gray-50 dark:text-gray-300  text-gray-900 outline-none border-1  border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                handleEditClient(client.id, client.name, client.email);
                closeModal(); // Cierra el modal después de guardar
              }}
              className="bg-sky-600 text-base text-white p-2 rounded active:opacity-75 hover:bg-sky-700 transition-colors"
            >
              Guardar
            </button>
            <button
              type="button" // Cambia a type="button"
              onClick={closeModal}
              className="bg-gray-500 text-base text-white p-2 rounded active:opacity-75 hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    );
  }, [modal, closeModal, initialClient, handleChange]); // Dependencias para useCallback

  return {
    openModal,
    closeModal,
    ModalForm, // Componente para renderizar el modal
  };
};

export default useModalForm;