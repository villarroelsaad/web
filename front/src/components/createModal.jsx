

export const ModalFormUser = ({
  user,
  modal,
  handleChange,
  closeModal,
  handleEdit,
}) => {
  // Si el modal no está abierto o no hay usuario, no renderizamos nada.
  if (!modal || !user) return null;

  // Renderizado del Modal
  return (
    <dialog open={modal}>
      <form
        id={user.id}
        method="dialog"
        className="p-11 border border-sky-500 dark:bg-[#27272a] text-gray-800 dark:text-gray-300 rounded-md shadow-lg "
      >
        <h2 className="text-lg font-semibold mb-4">Editar usuario</h2>
        <label className="block mb-2">
          Usuario:
          <input
            type="text"
            name="userName" 
            value={user.userName} 
            onChange={handleChange}
            className="w-full p-1 pl-2 font-medium border rounded-lg dark:bg-[#27272a] dark:focus:bg-[#232321] focus:bg-gray-100 bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1 border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
          />
        </label>
    
        
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-1 pl-2 font-medium border rounded-lg dark:bg-[#27272a] dark:focus:bg-[#232321] focus:bg-gray-100 bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1 border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
          />
        </label>
        <label className="block mb-4">
          Rol:
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="mb-4 w-full p-1 pl-2 font-medium border rounded-lg dark:bg-[#27272a] bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1 border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              handleEdit(user.id, user.userName, user.email, user.role);
              closeModal();
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
};