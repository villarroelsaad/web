import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../services/context";
import { getPublishes } from "../services/publish/getPublishes";
import { createPublish } from "../services/publish/createPublish";
import { deletePublish } from "../services/publish/deletePublish";

export const Panel = () => {
  const { user } = useContext(UserContext);
  const [announcements, setAnnouncements] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canPublish = user && (user.Role === "admin" || user.Role_u === "admin");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getPublishes();
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los anuncios");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handlePublish = async () => {
    if (!text || !text.trim()) return;
    if (!canPublish) {
      setError("No autorizado para publicar");
      return;
    }
    setLoading(true);
    try {
      await createPublish(text.trim());
      const data = await getPublishes();
      setAnnouncements(data);
      setText("");
    } catch (err) {
      console.error(err);
      setError("No se pudo publicar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este anuncio?")) return;
    setLoading(true);
    try {
      await deletePublish(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el anuncio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-2/3 mx-auto font-medium dark:text-slate-100">
      <h2 className="text-2xl font-semibold mb-4">Tablón de anuncios</h2>

      {canPublish ? (
        <div className="mb-4">
          <label className="block text-sm mb-1 ">Nuevo anuncio</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-2 border transition-all outline-none rounded-md bg-white dark:bg-zinc-700 focus:border-sky-500 dark:text-gray-200"
            placeholder="Escribe tu anuncio aquí..."
          />
          <div className="flex gap-2 mt-2 font-semibold">
            <button
              onClick={handlePublish}
              disabled={loading}
              className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-500 disabled:opacity-60"
            >
              Publicar
            </button>
            <button
              onClick={() => setText("")}
              className="px-4 py-2 rounded-md border"
            >
              Limpiar
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-4 text-sm text-gray-500">
          Solo administradores pueden publicar anuncios.
        </p>
      )}

      {error && <p className="text-red-400 mb-3">{error}</p>}

      <div className="space-y-3">
        {loading && announcements.length === 0 ? (
          <p className="text-gray-600 text-center font-semibold">
            Cargando anuncios...
          </p>
        ) : announcements.length === 0 ? (
          <p className="text-gray-600 text-center font-semibold">
            No hay anuncios publicados.
          </p>
        ) : (
          announcements.map((a) => (
            <div
              key={a.id}
              className="border rounded-md p-3 bg-white dark:bg-zinc-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{a.text}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {a.author} •{" "}
                    {a.date ? new Date(a.date).toLocaleString() : ""}
                  </p>
                </div>
                {canPublish && (
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500 text-sm ml-4"
                    aria-label="Eliminar anuncio"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
