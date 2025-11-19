import {
  HiChevronLeft,
  HiChevronRight,
  HiArchiveBoxXMark,
  HiMiniPencilSquare,
} from "react-icons/hi2";
import { IoIosAdd, IoIosRefresh } from "react-icons/io";
import { useState, useEffect } from "react";
import { getClients } from "../services/client/Clients";
import { ClientDelete } from "../services/client/ClientDelete";
import { EditClient } from "../services/client/EditClient";
import { ModalFormClient } from "./ClientModal";
import useModalFormCreateClient from "../hooks/useCreateClient";
import { ModalFormEditClient } from "./EditClientModal";
import useModalFormClient from "../hooks/useEditClient";

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading true before fetch
      setError(null); // Clear previous errors
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients:", err); // Use console.error
        setError("Error al cargar los clientes."); // Set user-friendly error message
      } finally {
        setLoading(false); // Set loading false after fetch
      }
    };
    fetchData();
  }, [reload]);

const handleReload = () => {
  setReload((prev) => !prev);
};

const {
  openModalC,
  modalC,
  client,
  handleChangeC,
  closeModalC,
  handleCreateClient,
} = useModalFormCreateClient({ handleReload });

const { modalE, clientE, openModalE, closeModalE, handleChangeE } =
  useModalFormClient();

const handleEditClient = async (id, name, email) => {
  try {
    await EditClient(id, name, email); // Assuming EditClient handles API call
    // Update the client in the local state
    handleReload();
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, name, email } : client
      )
    );
    alert("Cliente editado correctamente"); // Consider a toast notification here
  } catch (err) {
    console.error("Error editing client:", err);
    alert("Error al editar el cliente.");
  }
};

// Pass handleEditClient to useModalForm as the callback for when the form is submitted
// Ensure openModal receives the client object

const handleEliminate = async (id) => {
  if (!window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
    return; // Added confirmation dialog
  }
  try {
    await ClientDelete(id); // Assuming ClientDelete handles API call
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
    alert("Cliente eliminado correctamente"); // Consider a toast notification here
  } catch (err) {
    console.error("Error deleting client:", err);
    alert("Error al eliminar el cliente.");
  }
};

return (
  <div className="mx-auto bg-white dark:bg-zinc-800 sm:w-3/5 w-full flex-wrap h-full rounded-xl ">
    <section className="flex flex-col flex-wrap  text-lg text-gray-800 items-center p-6 dark:text-gray-300 dark:shadow-gray-800">
      <h1 className="text-xl font-semibold">Clientes</h1>

      <div className="w-11/12 flex gap-4 mt-10 mb-2 justify-end items-center mr-10">
        <button
          className="hover: active:opacity-55"
          onClick={() => openModalC()}
        >
          <IoIosAdd size={28} color="#38bdf8" />
        </button>
        <button className="hover: active:opacity-55" onClick={handleReload}>
          <IoIosRefresh size={20} color="#38bdf8" />
        </button>
      </div>
      {loading && <p>Cargando clientes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && clients.length === 0 ? (
        <h1>No se encuentran Clientes disponibles</h1>
      ) : (
        !loading &&
        !error && (
          <table className="w-11/12 dark:text-gray-400 ">
            <thead>
              <tr className="dark:text-gray-400 h-10 dark:bg-zinc-700 bg-zinc-100 text-slate-600 font-semibold text-base">
                <th className="rounded-l-lg">Nombre</th>
                <th>Correo</th>
                <th className="rounded-r-lg">Acciones</th>
              </tr>
            </thead>
            <tbody id="data-body">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className=" dark:text-gray-300 text-slate-950 text-center font-semibold text-base"
                >
                  <td className="w-1/3 h-12">{client.name}</td>
                  <td className="w-1/3 h-12">{client.email}</td>
                  <td className="flex h-12 justify-center gap-1">
                    <button
                      onClick={() => openModalE(client)} // Correct way to pass client to openModal
                      className="bg-transparent  hover:opacity-70 transition-all py-1 px-1 rounded-md"
                    >
                      <HiMiniPencilSquare size={22} color="#38bdf8" />
                    </button>
                    <button
                      onClick={() => handleEliminate(client.id)} // Correct way to pass id
                      className="bg-transparent hover:opacity-70 transition-all py-1 px-1 rounded-md"
                    >
                      <HiArchiveBoxXMark size={22} color="#ef4444" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
      <ModalFormClient
        modal={modalC}
        client={client}
        handleChange={handleChangeC}
        closeModal={closeModalC}
        handleCreateClient={handleCreateClient}
        handleReload={handleReload}
      />

      <ModalFormEditClient
        handleEditClient={handleEditClient}
        modal={modalE}
        client={clientE}
        handleChange={handleChangeE}
        closeModal={closeModalE}
      />

      <div className="flex gap-4 mt-5">
        <button className="p-1 rounded">
          <HiChevronLeft size={25} />
        </button>
        <button className="p-1 rounded">
          <HiChevronRight size={25} />
        </button>
      </div>
    </section>
  </div>
);
};
