import { useState, useEffect } from "react";
import { GetUsers } from "../services/Users";
import {
  HiChevronLeft,
  HiChevronRight,
  HiArchiveBoxXMark,
  HiMiniAdjustmentsHorizontal,
} from "react-icons/hi2";

import { DeleteU } from "../services/DeleteU";
import useModalFormUser from "../hooks/useEditUser";

export const Config = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este elemento?") ===
      true
    ) {
      DeleteU(id);
    }
  };
  const handleEditUser = (id, username, email, role) => {
    if (
      window.confirm("¿Estás seguro de que quieres editar este elemento?") ===
      true
    ) {
      EditU(id, username, email, role);
    }
  };
  const { openModal, ModalForm } = useModalFormUser(null, handleEditUser);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading true before fetch
      setError(null); // Clear previous errors
      try {
        const data = await GetUsers();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch users:", error); // Use console.error
        setError("Error al cargar los clientes."); // Set user-friendly error message
      } finally {
        setLoading(false); // Set loading false after fetch
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mx-auto bg-white dark:bg-zinc-800 sm:w-3/5 w-full flex-wrap h-full rounded-xl ">
      <section className="flex flex-col flex-wrap gap-10 text-lg text-gray-800 items-center p-6 dark:text-gray-300 dark:shadow-gray-800">
        <h1 className="text-xl font-semibold">Configuración de usuarios</h1>
        {loading && <p>Cargando usuarios...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && user.length === 0 ? (
          <h1>No se encuentran Usuarios disponibles</h1>
        ) : (
          !loading &&
          !error && (
            <table className="w-11/12 dark:text-gray-400">
              <thead>
                <tr className="dark:text-gray-400 h-10 dark:bg-zinc-700 bg-zinc-100 text-slate-600 font-semibold text-base">
                  <th className="rounded-l-lg">Usuario</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th className="rounded-r-lg pr-6">Acciones</th>
                </tr>
              </thead>
              <tbody id="data-body">
                {user &&
                  user.map((u) => (
                    <tr
                      key={u.id}
                      className="dark:text-gray-300 text-slate-950 text-center font-semibold text-base"
                    >
                      <td className="w-1/3 h-12">{u.userName}</td>
                      <td className="w-1/3 h-12">{u.email}</td>
                      <td className="w-1/3 h-12">{u.role}</td>
                      <td className="flex h-12 justify-center gap-1">
                        <button
                          onClick={() => openModal(u)}
                          type="button"
                          className="bg-transparent  hover:opacity-70 transition-all py-1 px-1 rounded-m"
                        >
                          <HiMiniAdjustmentsHorizontal
                            size={22}
                            color="#38bdf8"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          type="button"
                          className="bg-transparent  hover:opacity-70 transition-all py-1 px-1  pr-6 rounded-m"
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
        <ModalForm handleEditUser={handleEditUser} />
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
