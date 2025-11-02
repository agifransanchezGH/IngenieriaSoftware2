import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Button} from "react-native"
import { useNavigation } from "@react-navigation/native"
import useProductos from "../hooks/useProductos"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ListaProductos">

const ListaProductosScreen = () => {
    const navigation = useNavigation<NavigationProp>()
    const { productos, loading, error } = useProductos()
    
    if (loading) return <View><Text style={styles.message}>Cargando productos...</Text></View>
    if (error) return <View><Text style={styles.message}>{error}</Text></View>

    return (
        <View style={styles.container}>
            

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgregarProducto')}>
            <Text style={styles.buttonText}>Agregar nuevo producto</Text>
        </TouchableOpacity>

            
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("DetalleProducto", { id: item.id })}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <Text style={styles.title}>⭐{item.rating.rate}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#18181b',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fff',
    },
    card: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#23232a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 8,
        borderRadius: 12,
        backgroundColor: '#18181b',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#fff',
        textAlign: 'center',
    },
    message: {
        padding: 16,
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#a259ff',
        borderRadius: 12,
        paddingVertical: 12,
        marginBottom: 20,
        alignSelf: 'flex-end'
        
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        margin: 5
    },
    price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a259ff',
    marginBottom: 12,
    },
})

export default ListaProductosScreen