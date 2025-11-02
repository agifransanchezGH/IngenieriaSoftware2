import React, { useState } from "react";
import {Text,TextInput,Button,StyleSheet,Alert,ScrollView,ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAgregar from "../hooks/useAgregar"; // Hook personalizado para crear productos

// Pantalla para agregar un nuevo producto
const AgregarProductoScreen = () => {
  const navigation = useNavigation(); // Hook para manejar navegación
  const { crear, loading, error } = useAgregar(); // Función para crear producto + estados

  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  // Función que se ejecuta al presionar "Agregar Producto"
  const handleAgregar = async () => {
    // Validación básica: título y precio son obligatorios
    if (!formData.title || !formData.price) {
      Alert.alert("Error", "Título y precio son obligatorios");
      return;
    }

    // Construcción del objeto producto
    const producto = {
      title: formData.title,
      price: parseFloat(formData.price), // Convertir precio a número
      description: formData.description,
      category: formData.category,
      image: formData.image || "https://via.placeholder.com/150", // Imagen por defecto
      rating: { rate: 0, count: 0 } // Inicialización del rating
    };

    // Llamada al hook para crear el producto
    const resultado = await crear(producto);

    // Mostrar alerta según el resultado
    if (resultado.success) {
      Alert.alert("Éxito", "Producto creado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() } // Volver atrás
      ]);
    } else {
      Alert.alert("Error", resultado.error || "No se pudo crear el producto");
    }
  };

  // Renderizado de la interfaz
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Producto</Text>

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

      {/* Botón para agregar producto */}
      <Button
        title={loading ? "Creando..." : "Agregar Producto"}
        onPress={handleAgregar}
        disabled={loading}
        color={"#a259ff"}
      />

      {/* Indicador de carga */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ffff"
          style={{ marginTop: 20 }}
        />
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

export default AgregarProductoScreen;
