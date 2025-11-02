// Importación de hooks de React y tipos de producto
import { useEffect, useState } from "react";
import { getProductos, Producto } from "../services/Api";

// Hook personalizado para obtener la lista de productos
export const useProductos = () => {
  // Estado para almacenar los productos obtenidos
  const [productos, setProductos] = useState<Producto[]>([]);

  // Estado para controlar si se está cargando la información
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para manejar errores en la carga
  const [error, setError] = useState<string | null>(null);

  // Efecto que se ejecuta una sola vez al montar el componente
  useEffect(() => {
    // Función asincrónica para obtener los productos
    const fetchProductos = async () => {
      try {
        setLoading(true); // Activar indicador de carga
        const data = await getProductos(); // Llamada al servicio
        setProductos(data); // Guardar productos en el estado
        setError(null); // Limpiar errores previos
      } catch (err) {
        setError("Error al cargar los productos"); // Manejo de error
        setProductos([]); // Limpiar productos en caso de error
      } finally {
        setLoading(false); // Desactivar indicador de carga
      }
    };

    fetchProductos(); // Ejecutar la función al montar
  }, []);

  // Retornar los estados y datos para usar en componentes
  return { productos, loading, error };
};

export default useProductos;