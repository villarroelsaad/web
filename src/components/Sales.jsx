import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { getSales } from "../services/Sales";

export const Sales = () => {
  const [ipnData, setIpnData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSales();
        setIpnData(data);
        console.log("hola");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
            <tbody id="data-body">
              {ipnData.map((ipn) => {
                return (
                  <tr key={ipn.id}>
                    <td>{ipn.orden}</td>
                    <td>{ipn.fecha}</td>
                    <td>{ipn.nombre}</td>
                    <td>{ipn.idPaypal}</td>
                    <td>{ipn.montos}</td>
                    <td>{ipn.correo}</td>
                    <td>{ipn.estado}</td>
                  </tr>
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