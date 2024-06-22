// RegisterProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db, collection, addDoc } from './firebaseConfigs';

const RegisterProductScreen = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [codigoProducto, setCodigoProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fechaCaducidad, setFechaCaducidad] = useState('');

  const handleGuardarProducto = async () => {
    try {
      const productsCollectionRef = collection(db, 'Products'); 
      await addDoc(productsCollectionRef, {
        nombreProducto,
        codigoProducto,
        cantidad,
        fechaCaducidad,
      });

      Alert.alert('Éxito', 'Producto registrado correctamente');
      setNombreProducto('');
      setCodigoProducto('');
      setCantidad('');
      setFechaCaducidad('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el producto');
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Producto</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre Producto"
          value={nombreProducto}
          onChangeText={setNombreProducto}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Código Producto"
          value={codigoProducto}
          onChangeText={setCodigoProducto}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Fecha caducidad"
          value={fechaCaducidad}
          onChangeText={setFechaCaducidad}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGuardarProducto}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#000',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#871f1f',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RegisterProductScreen;
