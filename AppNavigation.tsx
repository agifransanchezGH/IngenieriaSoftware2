import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaProductosScreen from './screens/ListaProductosScreen';
import DetalleProductoScreen from './screens/DetalleProductoScreen';
import AgregarProductoScreen from './screens/AgregarProductoScreen';
import EditarProductoScreen from './screens/EditarProductoScreen';
import EliminarProductoScreen from './screens/EliminarProductoScreen'
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="ListaProductos"
    screenOptions={{
        headerStyle: {
            backgroundColor: '#4a1792ff'
        },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
            fontWeight: 'bold',
        },
    }}
    >
        <Stack.Screen 
            name="ListaProductos" 
            component={ListaProductosScreen}
            options={{ title: "Catálogo de productos" }}
        />
        <Stack.Screen 
            name="DetalleProducto" 
            component={DetalleProductoScreen}
            options={{ title: "Detalle del producto" }}
        />
        <Stack.Screen 
            name="AgregarProducto" 
            component={AgregarProductoScreen}
            options={{ title: "Agregar Producto" }}
        />
        <Stack.Screen 
            name="EditarProducto" 
            component={EditarProductoScreen}
            options={{ title: "Editar Producto" }}
        />
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
