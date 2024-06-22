// HomeScreen.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleRegisterProduct = () => {
    navigation.navigate('RegisterProduct');
  };
  const handleListarProductos = () => {
    navigation.navigate('ListarProductos');
  };
  const handleAprender = () => {
    navigation.navigate('Aprender');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRegisterProduct}>
        <Text style={styles.buttonText}>Registrar Producto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleListarProductos}>
        <Text style={styles.buttonText}>Listar Producto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAprender}>
        <Text style={styles.buttonText}>Aprender+</Text>
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

export default HomeScreen;
