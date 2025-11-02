import { useEffect, useState } from "react";
import { getProductos, Producto } from "../services/Api";

export const useProductos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                const data = await getProductos();
                setProductos(data);
                setError(null);
            } catch (err) {
                setError("Error al cargar los productos");
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    return { productos, loading, error };
};

export default useProductos;