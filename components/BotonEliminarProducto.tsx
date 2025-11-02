// components/BotonEliminarProducto.tsx
import React from 'react';
import { Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const BotonEliminarProducto = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const manejarConfirmacion = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que querés eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            Alert.alert('✅ Producto eliminado con éxito');
            navigation.navigate('ListaProductos');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return <Button title="Eliminar producto" onPress={manejarConfirmacion} />;
};

export default BotonEliminarProducto;