// AprenderScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const AprenderScreen = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false); 

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch('https://www.fruityvice.com/api/fruit/all');
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      Alert.alert('Error', 'No se pudieron obtener los productos');
    }
  };

  const handleBuscar = async () => {
    try {
      const response = await fetch(`https://www.fruityvice.com/api/fruit/${busqueda.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      const data = await response.json();
      setProductos([data]); // Mostrar solo el producto encontrado
    } catch (error) {
      console.error('Error al buscar el producto:', error);
      Alert.alert('Error', 'Producto no encontrado');
    }
  };

  const handleToggleFavorito = (producto) => {
    const index = favoritos.findIndex((item) => item.name === producto.name);
    if (index === -1) {
      setFavoritos([...favoritos, producto]);
      Alert.alert('Éxito', 'Producto agregado a favoritos');
    } else {
      const newFavoritos = favoritos.filter((item) => item.name !== producto.name);
      setFavoritos(newFavoritos);
      Alert.alert('Éxito', 'Producto eliminado de favoritos');
    }
  };

  const handleMostrarFavoritos = () => {
    setMostrarFavoritos(!mostrarFavoritos); // Alternar la visibilidad de la lista de favoritos
  };

  const renderItem = ({ item }) => (
    <View style={styles.productoContainer}>
      <Text style={styles.nombreProducto}>{item.name}</Text>
      <Text style={styles.infoText}>Familia: {item.family}</Text>
      <Text style={styles.infoText}>Calorías: {item.nutritions.calories}</Text>
      <Text style={styles.infoText}>Grasas: {item.nutritions.fat}</Text>
      <Text style={styles.infoText}>Azúcar: {item.nutritions.sugar}</Text>
      <Text style={styles.infoText}>Carbohidratos: {item.nutritions.carbohydrates}</Text>
      <Text style={styles.infoText}>Proteína: {item.nutritions.protein}</Text>
      <TouchableOpacity onPress={() => handleToggleFavorito(item)} style={styles.favoriteButton}>
        <Icon name={favoritos.some((p) => p.name === item.name) ? 'heart' : 'heart-o'} size={24} color={favoritos.some((p) => p.name === item.name) ? '#f00' : '#000'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
        <TouchableOpacity style={styles.button} onPress={handleBuscar}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoritosButton} onPress={handleMostrarFavoritos}>
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>
      </View>
      {mostrarFavoritos && (
        <FlatList
          data={favoritos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listContainer}
        />
      )}
      {!mostrarFavoritos && (
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#1f87f1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  favoritosButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
  },
  productoContainer: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    position: 'relative', 
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default AprenderScreen;
