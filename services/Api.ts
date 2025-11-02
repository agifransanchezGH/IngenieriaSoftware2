const API_URL = "https://fakestoreapi.com/products";

/**
 * Interfaz que representa un producto del sistema.
 */
export interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Obtiene la lista completa de productos desde la API.
 * @returns {Promise<Producto[]>} Array de productos
 * @throws {Error} Si la respuesta HTTP no es exitosa
 */
export const getProductos = async (): Promise<Producto[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Obtiene un producto específico por su ID.
 * @param {number} id - ID del producto
 * @returns {Promise<Producto>} Producto correspondiente
 * @throws {Error} Si la respuesta HTTP no es exitosa
 */
export const getProducto = async (id: number): Promise<Producto> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Agrega un nuevo producto a la API.
 * @param {Producto} data - Datos del producto a agregar
 * @returns {Promise<Producto>} Producto creado con ID asignado
 */
export const agregarProducto = async (data: Producto): Promise<Producto> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

/**
 * Edita un producto existente por su ID.
 * @param {number} id - ID del producto a editar
 * @param {Producto} data - Datos actualizados del producto
 * @returns {Promise<Producto>} Producto actualizado
 */
export const editarProducto = async (id: number, data: Producto): Promise<Producto> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

/**
 * Elimina un producto por su ID.
 * @param {number} id - ID del producto a eliminar
 * @returns {Promise<any>} Respuesta de la API tras la eliminación
 */
export const eliminarProducto = async (id: number): Promise<any> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};