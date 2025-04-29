import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useState } from "react";
export const Sales = () => { 
    const [ipnData, setIpnData] = useState([]);
    return (
        <div className=" mx-auto bg-white dark:bg-[#27272a] sm:w-3/4 w-full h-full flex justify-center">
          <section className="flex flex-col gap-4 text-lg text-gray-800 items-center justify-center w-full h-full rounded-lg shadow-sm p-10 dark:text-gray-200 dark:shadow-md dark:shadow-gray-800">
            <h1 className="text-xl font-semibold">Ventas</h1>
           
            {ipnData ? (
              <h1>No se encuentran datos disponibles</h1>
            ) : (
              <table className="w-full p-3 text-sm text-left  dark:text-gray-400">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>ID PayPal</th>
                    <th>Montos</th>
                    <th>Correo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody id="data-body">{/* Fetch */}</tbody>
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