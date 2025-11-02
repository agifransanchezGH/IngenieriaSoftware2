import { useState } from "react";
import { eliminarProducto } from "../services/Api";

export const useEliminar = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const eliminar = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            
            await eliminarProducto(id);
            
            setSuccess(true);
            return true;
        } catch (err) {
            setError("Error al eliminar el producto");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setError(null);
        setSuccess(false);
    };

    return { eliminar, loading, error, success, reset };
};

export default useEliminar;