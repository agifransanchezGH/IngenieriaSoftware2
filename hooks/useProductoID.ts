import { useEffect, useState } from "react";
import { getProducto, Producto } from "../services/Api";


export const useProducto = (id: number) => {
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProducto(id)
        .then((data) => {
            setProducto(data);
            setLoading(false);
        })
        .catch((error) => {
            setError("Error al cargar el producto");
            setLoading(false);
        });
    }, [id]);

    return { producto, loading, error };
};
export default useProducto;