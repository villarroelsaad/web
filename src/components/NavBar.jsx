import { useState, useRef } from "react";
import { Link } from "react-router-dom"
import useClickOutside from "../hooks/useNavBar";
import { FaPaypal } from "react-icons/fa";
import { DiAptana } from "react-icons/di";
import {
  HiChartPie,
  HiSquares2X2,
  HiPower,
  HiMiniShoppingCart,
  HiUsers,
   HiChevronDown,
   HiOutlineBars3,
} from "react-icons/hi2";

export const NabBar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [isOpen2, setIsOpen2] = useState(false);
   const [nav, setNav] = useState(false);
  const menuRef = useRef(null);

   const toggleNav = () => {
      setNav(!nav);
  };

  useClickOutside(menuRef, () => {
    setNav(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <nav>
        <button
           onClick={toggleNav}
         id="toggle-sidebar"
        type="button"
        className="inline-flex relative bottom-12 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none active:ring-2 active:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:ring-gray-600"
      >
        <HiOutlineBars3 size={28}/>
      </button>
    
        <aside
        ref={menuRef}
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 w-64 h-screen transition-transform  -translate-x-full ${ nav ? "translate-x-0" : ""  }   sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-[#27272a] border-r-2 border-shadow-md dark:border-r-2 dark:border-gray-500">
          <ul className="space-y-4 font-medium">
            <li>
              <Link to='/' className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ">
                <HiChartPie size={22} />
                <span className="ms-3">Panel Center</span>
               
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-ventas"
                data-collapse-toggle="dropdown-ventas"
                onClick={toggleDropdown}
              >
                <HiMiniShoppingCart size={22} />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Ventas
                </span>
                <HiChevronDown size={20} />
              </button>
              {isOpen && (
                <ul id="ventas" className="py-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      3
                    </a>
                  </li>
                </ul>
              )}
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
              <button
                type="button"
                className="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-clients"
                data-collapse-toggle="dropdown-clients"
                onClick={toggleDropdown2}
              >
                <HiUsers size={22} />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  Clientes
                </span>
                <HiChevronDown size={20} />
              </button>
              {isOpen2 && (
                <ul id="clients" className="py-2 space-y-2 ">
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      3
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to='/paypal'
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                <FaPaypal size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">Paypal</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  1
                </span>
                </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <DiAptana size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Configuracion
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              >
                <HiPower size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </nav>
  );
};
