// Importación de hooks de React y tipos necesarios
import { useEffect, useState } from "react";
import { getProducto, Producto } from "../services/Api";

// Hook personalizado para obtener un producto por su ID
export const useProducto = (id: number) => {
  // Estado para almacenar el producto obtenido
  const [producto, setProducto] = useState<Producto | null>(null);

  // Estado para controlar si se está cargando la información
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para manejar errores en la carga
  const [error, setError] = useState<string | null>(null);

  // Efecto que se ejecuta cada vez que cambia el ID
  useEffect(() => {
    // Llamada al servicio para obtener el producto
    getProducto(id)
      .then((data) => {
        setProducto(data);     // Guardar el producto en el estado
        setLoading(false);     // Finalizar carga
      })
      .catch((error) => {
        setError("Error al cargar el producto"); // Manejo de error
        setLoading(false);     // Finalizar carga
      });
  }, [id]); // Dependencia: se ejecuta cuando cambia el ID

  // Retornar los estados y datos para usar en componentes
  return { producto, loading, error };
};

export default useProducto;