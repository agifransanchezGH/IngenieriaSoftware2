// Importación de hooks de navegación y ruta
import { useRoute, useNavigation } from "@react-navigation/native"
// Importación de hooks de estado y efecto
import { useEffect, useState } from "react"
// Componentes de React Native
import {View,Text,Image,TouchableOpacity,StyleSheet,ScrollView} from "react-native"
// Función para obtener un producto y su tipo
import { getProducto, Producto } from "../services/Api"
// Tipado para navegación con stack
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"

// Tipado específico para navegación desde esta pantalla
type DetalleProductoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetalleProducto'
>;

// Componente principal de la pantalla de detalle
const DetalleProductoScreen = ({}) => {
  const route = useRoute(); // Hook para acceder a parámetros de la ruta
  const navigation = useNavigation<DetalleProductoScreenNavigationProp>(); // Hook para navegar entre pantallas
  const { id } = route.params as { id: number }; // Extraer el ID del producto desde los parámetros

  // Estado para manejar errores, datos del producto y estado de eliminación
  const [error, setError] = useState<string | null>(null);
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loadingEliminar, setLoadingEliminar] = useState<boolean>(false);

  // Efecto para cargar el producto al montar el componente
  useEffect(() => {
    getProducto(id)
      .then(setProducto) // Guardar el producto en el estado
      .catch(() => setError("Error al cargar el producto")); // Manejo de error
  }, [id]);

  // Función para navegar a la pantalla de edición
  const handleEditar = () => {
    if (!producto) return;
    navigation.navigate('EditarProducto' as any, { id: producto.id });
  };

  // Renderizado condicional mientras se carga o si hay error
  if (!producto)
    return <Text style={{ color: '#fff', padding: 16 }}>Cargando...</Text>;
  if (error)
    return <Text style={{ color: '#ff002fff', padding: 16 }}>{error}</Text>;

  // Renderizado principal del detalle del producto
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        {/* Imagen del producto */}
        <Image source={{ uri: producto.image }} style={styles.image} />

        {/* Título y precio */}
        <Text style={styles.title}>{producto.title}</Text>
        <Text style={styles.price}>{`$${producto.price}`}</Text>

        {/* Descripción */}
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{producto.description}</Text>

        {/* Valoración */}
        <Text style={styles.sectionTitle}>Valoración</Text>
        <Text style={styles.rating}>
          ⭐ {producto.rating.rate} ({producto.rating.count} reviews)
        </Text>

        {/* Botones de acción: Editar y Eliminar */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEditar}
            disabled={loadingEliminar}
          >
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() =>
              navigation.navigate('EliminarProducto' as any, { id: producto.id })
            }
            disabled={loadingEliminar}
          >
            <Text style={styles.actionText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  card: {
    backgroundColor: '#23232a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    borderRadius: 12,
    backgroundColor: '#18181b',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a259ff',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#a259ff',
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 6,
  },
  description: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'left',
    marginBottom: 10,
  },
  rating: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  editButton: {
    backgroundColor: '#0076fdff',
  },
  deleteButton: {
    backgroundColor: '#ff0000ff',
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default DetalleProductoScreen;