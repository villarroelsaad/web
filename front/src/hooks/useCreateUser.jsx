import { useState, useCallback } from "react";
import { Register } from "../services/user/Register";

const useModalFormCreateUser = () => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({ UserName: "", email: "", role: "user" }); // Estado para el user a editar en el modal

  const openModal = useCallback(() => {
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  // Puedes añadir un manejador para los cambios en los inputs del formulario
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }, []);

      const handleCreateUser = useCallback(async () => {
    try {
      await Register(user.UserName, user.email, user.role);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }, [user]);
  // Función para renderizar el modal
  const ModalForm = useCallback(() => {
    if (!modal || !user) return null; // No renderizar si el modal no está abierto o no hay usere

    return (
      <dialog open={modal}>
        {" "}
        {/* Usa 'open' para controlar la visibilidad con HTML Dialog Element */}
        <form
          name="create-form"
          method="dialog"
          className="p-11 border border-sky-500 dark:bg-[#27272a] text-gray-800 dark:text-gray-300 rounded-md shadow-lg "
        >
          <h2 className="text-lg font-semibold mb-4">Crear usuario</h2>
          <label className="block mb-2">
            Usuario:
            <input
              type="text"
              name="name" // Añade el atributo 'name' para el handleChange
              defaultValue={user.UserName}
              onChange={handleChange}
              className="w-full p-1 pl-2  font-medium border rounded-lg dark:bg-[#27272a] dark:focus:bg-[#232321] focus:bg-gray-100 bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1  border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email" // Añade el atributo 'name'
              defaultValue={user.email}
              onChange={handleChange}
              className="w-full p-1 pl-2  font-medium border rounded-lg dark:bg-[#27272a] dark:focus:bg-[#232321] focus:bg-gray-100 bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1  border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
            />
          </label>
          <label className="block mb-4">
            Rol:
            <select
              name="role" // Añade el atributo 'name'
              defaultValue={user.role}
              onChange={handleChange}
              className="mb-4 w-full p-1 pl-2 font-medium border rounded-lg dark:bg-[#27272a] bg-gray-50 dark:text-gray-300  text-gray-900 outline-none border-1  border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                handleCreateUser();
                closeModal(); // Cierra el modal después de guardar
              }}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    );
  }, [modal, user, handleChange, closeModal, handleCreateUser]); // Dependencias para useCallback

  return {
    openModalU : openModal,
    closeModalU : closeModal,
    ModalFormU : ModalForm, // Componente para renderizar el modal
  };
};

export default useModalFormCreateUser;
