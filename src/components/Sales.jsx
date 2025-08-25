import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { getSales } from "../services/Sales";

export const Sales = () => {
  const [ipnData, setIpnData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSales();
        setIpnData(data);
      } catch (err) {
        console.log(err);
        setError("Error al cargar las ventas."); // Set user-friendly error message
      } finally {
        setLoading(false); // Set loading false after fetch
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto bg-white dark:bg-zinc-800 sm:w-3/5 w-full h-full ">
      <section className="flex flex-col gap-10 text-lg text-gray-800 items-center rounded-lg  p-10 dark:text-gray-300  dark:shadow-gray-800">
        <h1 className="text-xl mb-8 font-semibold">Ventas</h1>
        {loading && <p>Cargando clientes...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && ipnData.length === 0 ? (
          <h1>No se encuentran datos disponibles</h1>
        ) : (
          !loading &&
          !error && (
            <table className=" w-full dark:bg-zinc-800 dark:text-gray-400 ">
              <thead>
                <tr className="dark:text-gray-400 h-10 dark:bg-zinc-700 bg-zinc-100 text-slate-600 font-semibold text-base">
                  <th className="rounded-l-lg">Orden</th>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>ID PayPal</th>
                  <th>Montos</th>
                  <th>Correo</th>
                  <th className="rounded-r-lg">Estado</th>
                </tr>
              </thead>
              <tbody id="data-body">
                {ipnData.map((ipn) => {
                  return (
                    <tr
                      key={ipn.id}
                      className="border-2 font-medium dark:border-gray-700"
                    >
                      <td>{ipn.id}</td>
                      <td>{ipn.date}</td>
                      <td>{ipn.name}</td>
                      <td>{ipn.idPaypal}</td>
                      <td>{ipn.amount}</td>
                      <td>{ipn.email}</td>
                      <td>{ipn.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
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