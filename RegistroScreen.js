import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { db, collection, addDoc } from './firebaseConfigs';

const RegistroScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageHeight] = useState(new Animated.Value(1000)); 

  useEffect(() => {
    animateImage();
  }, []);

  const animateImage = () => {
    Animated.timing(imageHeight, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleRegistro = async () => {
    try {
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const usersCollectionRef = collection(db, 'Users');
      await addDoc(usersCollectionRef, {
        nombre: nombre,
        email: email,
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigation.navigate('Login');
    } catch (error) {
      alert('Error al registrar: ' + error.message);
    }
  };

  const windowWidth = Dimensions.get('window').width; 
  const windowHeight = Dimensions.get('window').height; 

  return (
    <View style={styles.container}>
      <Image
        source={require('./images/logo.png')}
        style={styles.logo}
      />
      <Animated.Image
        source={require('./images/background.jpeg')}
        style={[styles.backgroundImage, { width: windowWidth, height: imageHeight }]}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Crear cuenta nueva</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#d9d9d9"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#d9d9d9"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#d9d9d9"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#d9d9d9"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegistro}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', 
  },
  logo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 100,
    zIndex: 1, 
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    zIndex: 0, 
  },
  contentContainer: {
    width: '90%',
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 30, 
    paddingHorizontal: 30, 
    alignItems: 'center',
    justifyContent: 'flex-start', 
    zIndex: 1, 
  },
  formContainer: {
    width: '100%',
    paddingVertical: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff', 
  },
  input: {
    flex: 1,
    height: 50,
    color: '#000',
  },
  button: {
    width: '100%', 
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

export default RegistroScreen;
