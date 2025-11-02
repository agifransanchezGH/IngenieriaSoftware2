// Importación de librerías de navegación
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importación de pantallas del stack
import ListaProductosScreen from './screens/ListaProductosScreen';
import DetalleProductoScreen from './screens/DetalleProductoScreen';
import AgregarProductoScreen from './screens/AgregarProductoScreen';
import EditarProductoScreen from './screens/EditarProductoScreen';
import EliminarProductoScreen from './screens/EliminarProductoScreen';

// Tipado de las rutas del stack
import { RootStackParamList } from './types/navigation';

// Creación del stack navigator con tipado
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Componente que define la navegación principal de la aplicación.
 * Utiliza Native Stack Navigator para gestionar las pantallas.
 *
 * @returns {JSX.Element} Contenedor de navegación con configuración de rutas
 */
function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ListaProductos" // Pantalla inicial
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4a1792ff', // Color de fondo del header
          },
          headerTintColor: '#FFFFFF', // Color del texto y botones del header
          headerTitleStyle: {
            fontWeight: 'bold', // Estilo del título
          },
        }}
      >
        {/* Pantalla principal con listado de productos */}
        <Stack.Screen
          name="ListaProductos"
          component={ListaProductosScreen}
          options={{ title: "Catálogo de productos" }}
        />

        {/* Pantalla de detalle de producto */}
        <Stack.Screen
          name="DetalleProducto"
          component={DetalleProductoScreen}
          options={{ title: "Detalle del producto" }}
        />

        {/* Pantalla para agregar un nuevo producto */}
        <Stack.Screen
          name="AgregarProducto"
          component={AgregarProductoScreen}
          options={{ title: "Agregar Producto" }}
        />

        {/* Pantalla para editar un producto existente */}
        <Stack.Screen
          name="EditarProducto"
          component={EditarProductoScreen}
          options={{ title: "Editar Producto" }}
        />

        {/* Pantalla para confirmar y ejecutar la eliminación */}
        <Stack.Screen
          name="EliminarProducto"
          component={EliminarProductoScreen}
          options={{ title: "Eliminar Producto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;