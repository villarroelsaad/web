import {
  HiChevronLeft,
  HiChevronRight,
  HiArchiveBoxXMark,
  HiAdjustmentsHorizontal,
} from "react-icons/hi2";
import { useState, useEffect } from "react";
import { getClients } from "../services/Clients";
import { ClientDelete } from "../services/ClientDelete";
import useModalForm from "../hooks/useEditClient";
import { EditClient } from "../services/EditClient";

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading true before fetch
      setError(null); // Clear previous errors
      try {
        const data = await getClients();
        console.log(data);
        setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients:", err); // Use console.error
        setError("Error al cargar los clientes."); // Set user-friendly error message
      } finally {
        setLoading(false); // Set loading false after fetch
      }
    };
    fetchData();
  }, []);

  const handleEditClient = async (id, name, email) => {
    try {
      console.log(id, name, email);
      await EditClient(id, name, email); // Assuming EditClient handles API call

      // Update the client in the local state
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
  const { openModal, ModalForm } = useModalForm(null, handleEditClient); // Ensure openModal receives the client object

  const handleEliminate = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este cliente?")
    ) {
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
    <div className="mx-auto bg-white dark:bg-[#27272a] sm:w-3/4 w-full h-full flex justify-center">
      <section className="flex flex-col gap-4 text-lg text-gray-800 items-center justify-center w-full h-full rounded-lg shadow-sm p-10 dark:text-gray-200 dark:shadow-md dark:shadow-gray-800">
        <h1 className="text-xl font-semibold">Clientes</h1>

        {loading && <p>Cargando clientes...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && clients.length === 0 ? (
          <h1>No se encuentran Clientes disponibles</h1>
        ) : (
          !loading &&
          !error && (
            <table className="w-full p-3 text-base  dark:text-gray-400">
              <thead className="border-b dark:border-gray-700">
                <tr className="font-semibold text-lg">
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="data-body">
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-spacing-5 border-separate text-center dark:border-gray-700"
                  >
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td className="flex justify-center gap-3">
                      <button
                        onClick={() => openModal(client)} // Correct way to pass client to openModal
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-md"
                      >
                        <HiAdjustmentsHorizontal />
                      </button>
                      <button
                        onClick={() => handleEliminate(client.id)} // Correct way to pass id
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-md"
                      >
                        <HiArchiveBoxXMark />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
        <ModalForm handleEditClient={handleEditClient} />

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
