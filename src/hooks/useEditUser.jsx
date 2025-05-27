import { useState, useCallback } from 'react';

const useModalFormUser = (initialuser, handleEdit) => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(initialuser); // Estado para el usere a editar en el modal

  const openModal = useCallback((userToEdit) => {
    setUser(userToEdit); // Establecer el usere que se va a editar
    setModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  // Puedes añadir un manejador para los cambios en los inputs del formulario
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  }, []);

  // Función para renderizar el modal
  const ModalForm = useCallback(() => {
    if (!modal || !user) return null; // No renderizar si el modal no está abierto o no hay usere

    return (
      <dialog open={modal}> {/* Usa 'open' para controlar la visibilidad con HTML Dialog Element */}
        <form id={user.id} method="dialog" className="p-4">
          <h2 className="text-lg font-semibold mb-4">
            Editar usere
          </h2>
          <label className="block mb-2">
            Usuario:
            <input
              type="text"
              name="name" // Añade el atributo 'name' para el handleChange
              defaultValue={user.UserName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email" // Añade el atributo 'name'
              defaultValue={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-4">
            Rol:
            <select
              name="role" // Añade el atributo 'name'
              defaultValue={user.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </label>
          <div className="flex justify-end gap-2"> {/* Agrega un contenedor para los botones */}
            <button
              type="button" // Cambia a type="button" para evitar que envíe el formulario automáticamente
              onClick={() => {
                handleEdit(user.id, user.UserName, user.email, user.role);
                closeModal(); // Cierra el modal después de guardar
              }}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Guardar Cambios
            </button>
            <button
              type="button" // Cambia a type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    );
  }, [modal, user, handleChange, closeModal, handleEdit]); // Dependencias para useCallback

  return {
    openModal,
    closeModal,
    ModalForm, // Componente para renderizar el modal
  };
};

export default useModalFormUser;