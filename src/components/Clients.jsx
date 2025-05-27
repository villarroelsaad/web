import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { getClients } from "../services/Clients";
import ClientDelete from "../services/ClientDelete";
import useModalForm from "../hooks/useEditClient";
import EditClient from "../services/EditClient";

export const Clients = () => {
  const [Clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClients();
        setClients(data);
        console.log("hola");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const { openModal, ModalForm } = useModalForm(null, handleEditClient);

  const handleEditClient = (id, name, email) => {
    EditClient(id, name, email);
    alert("Cliente editado correctamente");
  };

  const handleEliminate = (id) => {
    ClientDelete(id);
    setClients(Clients.filter((client) => client.id !== id));
    alert("Cliente eliminado correctamente");
  };

  return (
    <div className=" mx-auto bg-white dark:bg-[#27272a] sm:w-3/4 w-full h-full flex justify-center">
      <section className="flex flex-col gap-4 text-lg text-gray-800 items-center justify-center w-full h-full rounded-lg shadow-sm p-10 dark:text-gray-200 dark:shadow-md dark:shadow-gray-800">
        <h1 className="text-xl font-semibold">Ventas</h1>

        {Clients ? (
          <h1>No se encuentran Clientes disponibles</h1>
        ) : (
          <table className="w-full p-3 text-sm text-left  dark:text-gray-400">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="data-body">
              {Clients.map((client) => {
                return (
                  <>
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>
                        <a
                          onClick={openModal(client)}
                          className="bg-slate-700 font-semibold w-4 p-2"
                        >
                          Editar
                        </a>
                        <a
                          onClick={handleEliminate()}
                          className="bg-slate-700 font-semibold w-4 p-2"
                        >
                          Eliminar
                        </a>
                      </td>
                    </tr>
                    <ModalForm handleEditClient={handleEditClient} />
                  </>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="flex gap-4 mt-5">
          <button className="p-1 rounded">
            <HiChevronLeft size={25} />
          </button>
          <button className="p-1 rounded">
            {" "}
            <HiChevronRight size={25} />{" "}
          </button>
        </div>
      </section>
    </div>
  );
};
