// Importación de hooks y componentes necesarios
import React, { useState, useEffect } from "react";
import {View,Text,TextInput,Button,StyleSheet,Alert,ScrollView, ActivityIndicator} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Hooks personalizados para editar y obtener producto por ID
import useEditar from "../hooks/useEditar";
import useProducto from "../hooks/useProductoID"; // Este hook debe implementarse para obtener un producto por ID

// Componente principal de la pantalla de edición
const EditarProductoScreen = () => {
  const navigation = useNavigation(); // Hook para navegación
  const route = useRoute(); // Hook para acceder a parámetros de la ruta
  const { id } = route.params as { id: number }; // Extraer el ID del producto desde los parámetros

  // Obtener el producto actual y estado de carga
  const { producto, loading: loadingProducto } = useProducto(id);

  // Hook para editar producto y manejar estados
  const { editar, loading: loadingEditar, error } = useEditar();

  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  // Cargar datos del producto en el formulario cuando esté disponible
  useEffect(() => {
    if (producto) {
      setFormData({
        title: producto.title,
        price: producto.price.toString(),
        description: producto.description,
        category: producto.category,
        image: producto.image
      });
    }
  }, [producto]);

  // Función que se ejecuta al presionar "Guardar Cambios"
  const handleEditar = async () => {
    // Validación básica
    if (!formData.title || !formData.price) {
      Alert.alert("Error", "Título y precio son obligatorios");
      return;
    }

    // Construcción del objeto actualizado
    const productoActualizado = {
      id,
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.image,
      rating: producto?.rating || { rate: 0, count: 0 } // Mantener rating original si existe
    };

    // Llamada al hook para editar el producto
    const resultado = await editar(id, productoActualizado);

    // Mostrar resultado al usuario
    if (resultado.success) {
      Alert.alert("Éxito", "Producto actualizado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert("Error", resultado.error || "No se pudo actualizar el producto");
    }
  };

  // Mostrar indicador de carga mientras se obtiene el producto
  if (loadingProducto) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" />
        <Text>Cargando producto...</Text>
      </View>
    );
  }

  // Renderizado del formulario
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>

      {/* Mostrar error si existe */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Campo: Título */}
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
        placeholder="Nombre del producto"
      />

      {/* Campo: Precio */}
      <Text style={styles.label}>Precio *</Text>
      <TextInput
        style={styles.input}
        value={formData.price}
        onChangeText={(text) => setFormData({ ...formData, price: text })}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      {/* Campo: Descripción */}
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        placeholder="Descripción del producto"
        multiline
        numberOfLines={4}
      />

      {/* Campo: Categoría */}
      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={styles.input}
        value={formData.category}
        onChangeText={(text) => setFormData({ ...formData, category: text })}
        placeholder="electronics, jewelery, etc."
      />

      {/* Campo: URL de Imagen */}
      <Text style={styles.label}>URL de Imagen</Text>
      <TextInput
        style={styles.input}
        value={formData.image}
        onChangeText={(text) => setFormData({ ...formData, image: text })}
        placeholder="https://..."
      />

      {/* Botón para guardar cambios */}
      <Button
        title={loadingEditar ? "Guardando..." : "Guardar Cambios"}
        onPress={handleEditar}
        disabled={loadingEditar}
        color="#a259ff"
      />

      {/* Indicador de carga mientras se guarda */}
      {loadingEditar && (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      )}
    </ScrollView>
  );
};

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#18181b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#a259ff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a259ff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#23232a',
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#23232a',
    color: '#fff',
  },
  error: {
    color: '#ff4d6d',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#a259ff',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditarProductoScreen;