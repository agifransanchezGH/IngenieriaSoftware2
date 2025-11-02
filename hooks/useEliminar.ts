// Importación de hooks de React y función de servicio
import { useState } from "react";
import { eliminarProducto } from "../services/Api";

// Hook personalizado para manejar la lógica de eliminación de un producto
export const useEliminar = () => {
  // Estado para controlar si se está ejecutando la operación
  const [loading, setLoading] = useState<boolean>(false);

  // Estado para manejar errores durante la eliminación
  const [error, setError] = useState<string | null>(null);

  // Estado para indicar si la eliminación fue exitosa
  const [success, setSuccess] = useState<boolean>(false);

  // Función principal para eliminar un producto por ID
  const eliminar = async (id: number) => {
    try {
      setLoading(true);     // Activar indicador de carga
      setError(null);       // Limpiar errores previos
      setSuccess(false);    // Reiniciar estado de éxito

      await eliminarProducto(id); // Llamada al servicio de eliminación

      setSuccess(true);     // Marcar éxito
      return true;          // Retornar resultado positivo
    } catch (err) {
      setError("Error al eliminar el producto"); // Manejo de error
      return false;         // Retornar resultado negativo
    } finally {
      setLoading(false);    // Finalizar carga
    }
  };

  // Función auxiliar para reiniciar los estados de error y éxito
  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  // Retornar funciones y estados para usar en componentes
  return { eliminar, loading, error, success, reset };
};

export default useEliminar;