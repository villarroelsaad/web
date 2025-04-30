import { useState, useEffect } from "react";
import { GetUsers } from "../services/Users";
import {
  HiArchiveBoxXMark,
  HiMiniAdjustmentsHorizontal,
} from "react-icons/hi2";
import { DeleteU } from "../services/DeleteU";

export const Config = () => {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este elemento?") ===
      true
    ) {
      DeleteU(id);
    }
  };
    const handleEdit = (id, username, email, role) => {
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
        console.log("hola");
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
            <th>Contrasena</th>
            <th>Correo</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody id="data-body">
          {user.map((u) => {
            return (
              <tr key={u.userId}>
                <td>{u.UserName}</td>
                <td>{u.UserPassword}</td>
                <td>{u.Email}</td>
                <td>{u.role}</td>
                <button
                  onClick={() => setModal(!modal)}
                  type="button"
                  className="bg-sky-400  mt-7 w-28 p-2 self-center text-center rounded-lg font-semibold active:opacity-85  hover:bg-sky-300 transition-all dark:bg-sky-600 dark:hover:bg-opacity-90"
                >
                  <HiMiniAdjustmentsHorizontal />
                </button>
                {modal && (
                  <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                      <div class="col-span-2">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Usuario
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type product name"
                          required=""
                        />
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                        <label
                          for="price"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Contrasena
                        </label>
                        <input
                          type="text"
                          name="pass"
                          id="pass"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="$2999"
                          required=""
                        />
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                        <label
                          for="price"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="$2999"
                          required=""
                        />
                      </div>
                    </div>
                            <button
                                onSubmit={() => handleEdit(u.userId, u.UserName, u.Email, u.role)}
                      type="submit"
                      class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        class="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Completado
                    </button>
                  </form>
                )}
                <button
                  onClick={() => handleDelete(u.userId)}
                  type="button"
                  className="bg-sky-400  mt-7 w-28 p-2 self-center text-center rounded-lg font-semibold active:opacity-85  hover:bg-sky-300 transition-all dark:bg-sky-600 dark:hover:bg-opacity-90"
                >
                  <HiArchiveBoxXMark />
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
