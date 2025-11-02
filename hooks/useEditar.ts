// Importación de hooks de React y función de servicio
import { useState } from "react";
import { editarProducto, Producto } from "../services/Api";

// Hook personalizado para manejar la lógica de edición de un producto
export const useEditar = () => {
  // Estado para controlar si se está ejecutando la operación
  const [loading, setLoading] = useState<boolean>(false);

  // Estado para manejar errores durante la edición
  const [error, setError] = useState<string | null>(null);

  // Estado para indicar si la edición fue exitosa
  const [success, setSuccess] = useState<boolean>(false);

  /**
   * Función principal para editar un producto por ID
   * @param id - ID del producto a editar
   * @param producto - Objeto con los datos actualizados
   * @returns Objeto con estado de éxito, datos actualizados o mensaje de error
   */
  const editar = async (
    id: number,
    producto: Producto
  ): Promise<{ success: boolean; data?: Producto; error?: string }> => {
    try {
      setLoading(true);     // Activar indicador de carga
      setError(null);       // Limpiar errores previos
      setSuccess(false);    // Reiniciar estado de éxito

      const productoActualizado = await editarProducto(id, producto); // Llamada al servicio

      setSuccess(true);     // Marcar éxito
      return { success: true, data: productoActualizado }; // Retornar datos actualizados
    } catch (err) {
      const errorMsg = "Error al editar el producto";
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
  return { editar, loading, error, success, reset };
};

export default useEditar;