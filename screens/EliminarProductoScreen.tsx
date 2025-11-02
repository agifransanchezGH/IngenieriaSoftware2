// Importación de librerías y tipos necesarios
import React from "react";
import {View,Text,Image,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,ScrollView} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

// Hooks personalizados para obtener y eliminar producto
import useProducto from "../hooks/useProductoID";
import useEliminar from "../hooks/useEliminar";

// Tipado para navegación y parámetros de ruta
type DetalleProductoRouteProp = RouteProp<RootStackParamList, "DetalleProducto">;
type DetalleProductoNavigationProp = NativeStackNavigationProp<RootStackParamList, "DetalleProducto">;

// Componente principal
const DetalleProductoScreen = () => {
  const route = useRoute<DetalleProductoRouteProp>(); // Acceso a parámetros de ruta
  const navigation = useNavigation<DetalleProductoNavigationProp>(); // Navegación entre pantallas
  const { id } = route.params; // ID del producto recibido por parámetro

  // Obtener producto por ID
  const { producto, loading: loadingProducto, error: errorProducto } = useProducto(id);

  // Hook para eliminar producto
  const { eliminar, loading: loadingEliminar, error: errorEliminar } = useEliminar();

  // Función para confirmar y ejecutar eliminación
  const handleEliminar = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const resultado = await eliminar(id);
            if (resultado) {
              Alert.alert("Éxito", "Producto eliminado correctamente", [
                { text: "OK", onPress: () => navigation.replace("ListaProductos") }
              ]);
            }
          }
        }
      ]
    );
  };

  // Navegar a pantalla de edición
  const handleEditar = () => {
    navigation.navigate("EditarProducto", { id });
  };

  // Mostrar indicador de carga mientras se obtiene el producto
  if (loadingProducto) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando producto...</Text>
      </View>
    );
  }

  // Mostrar error si no se pudo cargar el producto
  if (errorProducto || !producto) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {errorProducto || "No se pudo cargar el producto"}
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Renderizado principal del detalle del producto
  return (
    <ScrollView style={styles.container}>
      {/* Imagen del producto */}
      <Image source={{ uri: producto.image }} style={styles.image} />

      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>{producto.title}</Text>

        {/* Precio y valoración */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${producto.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {producto.rating.rate}</Text>
            <Text style={styles.ratingCount}>({producto.rating.count} reviews)</Text>
          </View>
        </View>

        {/* Categoría */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Categoría:</Text>
          <Text style={styles.category}>{producto.category}</Text>
        </View>

        {/* Descripción */}
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{producto.description}</Text>

        {/* Error al eliminar */}
        {errorEliminar && <Text style={styles.errorText}>{errorEliminar}</Text>}

        {/* Botón de eliminación */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.deleteButton,
              loadingEliminar && styles.buttonDisabled
            ]}
            onPress={handleEliminar}
            disabled={loadingEliminar}
          >
            {loadingEliminar ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Eliminar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Estilos visuales
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#18181b',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: '#23232a',
    borderRadius: 16,
  },
  content: {
    padding: 16,
    backgroundColor: '#23232a',
    borderRadius: 16,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#a259ff',
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4
  },
  ratingCount: {
    fontSize: 14,
    color: "#666"
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
    color: "#666"
  },
  category: {
    fontSize: 14,
    color: "#007AFF",
    textTransform: "capitalize"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: '#a259ff',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    backgroundColor: '#a259ff',
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: '#2323ff',
  },
  deleteButton: {
    backgroundColor: '#ff0000ff',
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    color: '#ff4d6d',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#a259ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetalleProductoScreen;