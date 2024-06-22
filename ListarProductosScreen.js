// ListarProductosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator  } from 'react-native';
import { db, collection, getDocs, query, orderBy, deleteDoc, doc, setDoc } from './firebaseConfigs'; 

const ListarProductosScreen = () => {
    const [productos, setProductos] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [nombreProducto, setNombreProducto] = useState('');
    const [codigoProducto, setCodigoProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fechaCaducidad, setFechaCaducidad] = useState('');
    const [loading, setLoading] = useState(false); 
  
    useEffect(() => {
      fetchProductos();
    }, []);
  
    const fetchProductos = async () => {
      try {
        const productsCollectionRef = collection(db, 'Products');
        const q = query(productsCollectionRef, orderBy('nombreProducto'));
  
        const querySnapshot = await getDocs(q);
        const productosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setProductos(productosData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
  
    const handleEliminarProducto = async (id) => {
      try {
        setLoading(true); 
  
        const productDocRef = doc(db, 'Products', id);
        await deleteDoc(productDocRef);
  
        setLoading(false); 
        Alert.alert('Éxito', 'Producto eliminado correctamente');
        fetchProductos(); 
      } catch (error) {
        setLoading(false); 
        console.error('Error al eliminar el producto:', error);
        Alert.alert('Error', 'No se pudo eliminar el producto');
      }
    };
  
    const handleModificarProducto = (producto) => {
      setEditedProduct(producto);
      setEditMode(true);
      setNombreProducto(producto.nombreProducto);
      setCodigoProducto(producto.codigoProducto);
      setCantidad(producto.cantidad.toString());
      setFechaCaducidad(producto.fechaCaducidad);
    };
  
    const handleGuardarCambios = async () => {
      try {
        const productDocRef = doc(db, 'Products', editedProduct.id);
        await setDoc(productDocRef, {
          nombreProducto,
          codigoProducto,
          cantidad: parseInt(cantidad),
          fechaCaducidad,
        });
        Alert.alert('Éxito', 'Producto actualizado correctamente');
        setEditMode(false);
        setEditedProduct(null);
        fetchProductos(); 
      } catch (error) {
        console.error('Error al guardar cambios:', error);
        Alert.alert('Error', 'No se pudo guardar los cambios');
      }
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.productoContainer}>
        <Text style={styles.nombreProducto}>{item.nombreProducto}</Text>
        <Text style={styles.codigoProducto}>Código: {item.codigoProducto}</Text>
        <Text style={styles.otraInformacion}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.otraInformacion}>Fecha caducidad: {item.fechaCaducidad}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#1f87f1' }]}
            onPress={() => handleModificarProducto(item)}
          >
            <Text style={styles.buttonText}>Modificar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#f1871f' }]}
            onPress={() => handleEliminarProducto(item.id)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1f87f1" />
          <Text>Eliminando producto...</Text>
        </View>
      );
    }
  
    if (editMode) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Modificar Producto</Text>
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
              placeholder="Fecha Caducidad"
              value={fechaCaducidad}
              onChangeText={setFechaCaducidad}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#871f1f' }]}
            onPress={handleGuardarCambios}
          >
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Productos</Text>
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.listContainer}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    listContainer: {
      width: '100%',
      paddingHorizontal: 20,
    },
    productoContainer: {
      borderWidth: 1,
      borderColor: '#d9d9d9',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
    },
    nombreProducto: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    codigoProducto: {
      fontSize: 16,
      marginBottom: 3,
    },
    otraInformacion: {
      fontSize: 14,
      marginBottom: 3,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    button: {
      width: 100,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: '#d9d9d9',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default ListarProductosScreen;