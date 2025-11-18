// CreateUserModal.jsx (o defínelo fuera del hook si es el mismo archivo)

export const CreateUserModal = ({ modal, user, handleChange, closeModal, handleCreateUser }) => {
    if (!modal || !user) return null;

    return (
      <dialog open={modal}>
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
                handleCreateUser({ user });
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