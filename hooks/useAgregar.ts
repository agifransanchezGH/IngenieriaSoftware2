import { useState } from "react";
import { agregarProducto, Producto } from "../services/Api";

export const useAgregar = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const crear = async (producto: Omit<Producto, 'id'>): Promise<{ success: boolean; data?: Producto; error?: string }> => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const nuevoProducto = await agregarProducto(producto as Producto);

            setSuccess(true);
            return { success: true, data: nuevoProducto };
        } catch (err) {
            const errorMsg = "Error al agregar el producto";
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

    return { crear, loading, error, success, reset };
};

export default useAgregar;