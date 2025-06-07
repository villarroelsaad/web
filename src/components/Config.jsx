import { useState, useEffect } from "react";
import { GetUsers } from "../services/Users";
import {
  HiArchiveBoxXMark,
  HiMiniAdjustmentsHorizontal,
} from "react-icons/hi2";
import { DeleteU } from "../services/DeleteU";
import useModalFormUser from "../hooks/useEditUser";

export const Config = () => {
  const [user, setUser] = useState({});

  const { openModal, ModalForm } = useModalFormUser(null, handleEditUser);

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUsers();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <table className="w-full p-3 text-sm text-left  dark:text-gray-400">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody id="data-body">
          {user.map((u) => {
            return (
              <>
                <tr key={u.id}>
                  <td>{u.userName}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <button
                    onClick={openModal(u)}
                    type="button"
                    className="bg-sky-400  mt-7 w-28 p-2 self-center text-center rounded-lg font-semibold active:opacity-85  hover:bg-sky-300 transition-all dark:bg-sky-600 dark:hover:bg-opacity-90"
                  >
                    <HiMiniAdjustmentsHorizontal />
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    type="button"
                    className="bg-sky-400  mt-7 w-28 p-2 self-center text-center rounded-lg font-semibold active:opacity-85  hover:bg-sky-300 transition-all dark:bg-sky-600 dark:hover:bg-opacity-90"
                  >
                    <HiArchiveBoxXMark />
                  </button>
                </tr>
                <ModalForm handleEditUser={handleEditUser} />
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
