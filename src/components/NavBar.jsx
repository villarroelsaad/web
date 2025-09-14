import { useState, useRef, useContext } from "react";
import { UserContext } from "../services/context";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../services/logOut";
import { Link } from "react-router-dom";
import useClickOutside from "../hooks/useNavBar";
import { FaPaypal } from "react-icons/fa";
import { DiAptana } from "react-icons/di";
import {
  HiChartPie,
  HiSquares2X2,
  HiPower,
  HiMiniShoppingCart,
  HiUsers,
  HiOutlineBars3,
} from "react-icons/hi2";

export const NabBar = () => {
  const [nav, setNav] = useState(false);
  const menuRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      try {
        await LogOut();
        setUser(null);
        console.log("Sesión cerrada");
        navigate("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  useClickOutside(menuRef, () => {
    setNav(false);
  });

  return (
    <nav>
      <button
        onClick={toggleNav}
        id="toggle-sidebar"
        type="button"
        className="inline-flex relative bottom-12 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none active:ring-2 active:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:ring-gray-600"
      >
        <HiOutlineBars3 size={28} />
      </button>

      <aside
        ref={menuRef}
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 w-64 h-screen transition-transform  -translate-x-full ${
          nav ? "translate-x-0" : ""
        }   sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-[#27272a] border-r-2 border-shadow-md dark:border-r-2 dark:border-gray-500">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/home"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 "
              >
                <HiChartPie size={22} />
                <span className="ms-3">Panel Center</span>
              </Link>
            </li>
            <li>
              <Link
                to="/home/sales"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <HiMiniShoppingCart size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">Ventas</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <HiSquares2X2 size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">Paneles</span>
              </a>
            </li>
            <li>
              <Link
                to="/home/clients"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <HiUsers size={22} />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  Clientes
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/home/paypal"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <FaPaypal size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">Paypal</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  1
                </span>
              </Link>
            </li>

            <div className="flex justify-start ml-3 items-center m-0">
              <hr className="w-5/6 h-0.5 bg-zinc-600 border-none" />
            </div>

            {user.Role === "admin" && (
              <li>
                <Link
                  to="/home/config"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                >
                  <DiAptana size={22} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Configuracion
                  </span>
                </Link>
              </li>
            )}
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <HiPower size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  cerrar sesion
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </nav>
  );
};
