/**
 * Tipado de las rutas del stack de navegación principal.
 * Define los parámetros esperados para cada pantalla.
 */
export type RootStackParamList = {
  /**
   * Pantalla principal que muestra la lista de productos.
   * No recibe parámetros.
   */
  ListaProductos: undefined;

  /**
   * Pantalla de detalle de un producto específico.
   * Requiere el ID del producto.
   */
  DetalleProducto: { id: number };

  /**
   * Pantalla para agregar un nuevo producto.
   * No recibe parámetros.
   */
  AgregarProducto: undefined;

  /**
   * Pantalla para editar un producto existente.
   * Requiere el ID del producto.
   */
  EditarProducto: { id: number };

  /**
   * Pantalla para confirmar y ejecutar la eliminación de un producto.
   * Requiere el ID del producto.
   */
  EliminarProducto: { id: number };
};