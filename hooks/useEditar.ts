import { useState } from "react";
import { editarProducto, Producto } from "../services/Api";

export const useEditar = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const editar = async (id: number, producto: Producto): Promise<{ success: boolean; data?: Producto; error?: string }> => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            
            const productoActualizado = await editarProducto(id, producto);
            
            setSuccess(true);
            return { success: true, data: productoActualizado };
        } catch (err) {
            const errorMsg = "Error al editar el producto";
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setError(null);
        setSuccess(false);
    };

    return { editar, loading, error, success, reset };
};

export default useEditar;