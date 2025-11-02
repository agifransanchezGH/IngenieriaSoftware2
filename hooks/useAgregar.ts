// Importación de hooks de React y función de servicio
import { useState } from "react";
import { agregarProducto, Producto } from "../services/Api";

// Hook personalizado para manejar la lógica de creación de un nuevo producto
export const useAgregar = () => {
  // Estado para controlar si se está ejecutando la operación
  const [loading, setLoading] = useState<boolean>(false);

  // Estado para manejar errores durante la creación
  const [error, setError] = useState<string | null>(null);

  // Estado para indicar si la creación fue exitosa
  const [success, setSuccess] = useState<boolean>(false);

  /**
   * Función principal para crear un nuevo producto
   * @param producto - Objeto con los datos del producto (sin ID)
   * @returns Objeto con estado de éxito, datos creados o mensaje de error
   */
  const crear = async (
    producto: Omit<Producto, 'id'>
  ): Promise<{ success: boolean; data?: Producto; error?: string }> => {
    try {
      setLoading(true);     // Activar indicador de carga
      setError(null);       // Limpiar errores previos
      setSuccess(false);    // Reiniciar estado de éxito

      // Llamada al servicio para agregar el producto
      const nuevoProducto = await agregarProducto(producto as Producto);

      setSuccess(true);     // Marcar éxito
      return { success: true, data: nuevoProducto }; // Retornar datos creados
    } catch (err) {
      const errorMsg = "Error al agregar el producto";
      setError(errorMsg);   // Guardar mensaje de error
      return { success: false, error: errorMsg }; // Retornar error
    } finally {
      setLoading(false);    // Finalizar carga
    }
  };

  /**
   * Función auxiliar para reiniciar los estados de error y éxito
   */
  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  // Retornar funciones y estados para usar en componentes
  return { crear, loading, error, success, reset };
};

export default useAgregar;