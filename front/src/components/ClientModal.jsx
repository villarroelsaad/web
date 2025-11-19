export const ModalFormClient = ({
  client,
  modal,
  handleChange,
  closeModal,
  handleCreateClient,
}) => {
  // Si el modal no está abierto o no hay usuario, no renderizamos nada.
  if (!modal || !client) return null;

  // Renderizado del Modal
  return (
    <dialog open={modal}>
      <form
        id={client.id}
        method="dialog"
        className="p-11 border border-sky-500 dark:bg-[#27272a] text-gray-800 dark:text-gray-300 rounded-md shadow-lg "
      >
        <h2 className="text-lg font-semibold mb-4">Crear cliente</h2>

        <label className="block mb-2">
          Cliente:
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            className="w-full p-1 pl-2 font-medium border rounded-lg dark:bg-[#27272a] dark:focus:bg-[#232321] focus:bg-gray-100 bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1 border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            className="w-full p-1 mb-10 pl-2 font-medium border rounded-lg dark:bg-[#27272a] dark:focus:bg-[#232321] focus:bg-gray-100 bg-gray-50 dark:text-gray-300 text-gray-900 outline-none border-1 border-gray-500 active:border-blue-500 focus:border-blue-500 transition-colors"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              handleCreateClient(client);
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
