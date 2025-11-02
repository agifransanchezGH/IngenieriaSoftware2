import { useRoute, useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { getProducto, Producto } from "../services/Api"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"

type DetalleProductoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,
'DetalleProducto'>;

const DetalleProductoScreen = ({}) => {
  const route = useRoute()
  const navigation = useNavigation<DetalleProductoScreenNavigationProp>();
  const { id } = route.params as { id: number }
  const [error, setError] = useState<string | null>(null)
  const [producto, setProducto] = useState<Producto | null>(null)
  const [loadingEliminar, setLoadingEliminar] = useState<boolean>(false)

  useEffect(() => {
    getProducto(id).then(setProducto)
    .catch(() => setError("Error al cargar el producto"))
  }, [id])

  const handleEditar = () => {
    if (!producto) return
    navigation.navigate('EditarProducto' as any, { id: producto.id })
  }

  if (!producto) return <Text style={{ color: '#fff', padding: 16 }}>Cargando...</Text>
  if (error) return <Text style={{ color: '#ff002fff', padding: 16 }}>{error}</Text>

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        <Image source={{ uri: producto.image }} style={styles.image} />

        <Text style={styles.title}>{producto.title}</Text>
        <Text style={styles.price}>{`$${producto.price}`}</Text>

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{producto.description}</Text>

        <Text style={styles.sectionTitle}>Valoración</Text>
        <Text style={styles.rating}>⭐ {producto.rating.rate} ({producto.rating.count} reviews)</Text>

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
            onPress={() => navigation.navigate('EliminarProducto' as any, { id: producto.id })}
            disabled={loadingEliminar}
          >
            <Text style={styles.actionText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

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
})

export default DetalleProductoScreen