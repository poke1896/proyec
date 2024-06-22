import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const LoginScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('./images/background.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('./images/logo.png')} style={styles.logo} />
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={24} color="#837b7b" style={styles.icon} />
          <TextInput
            style={[styles.input, { backgroundColor: '#d9d9d9', color: '#837b7b' }]}
            placeholder="Correo electrónico"
            placeholderTextColor="#837b7b"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={24} color="#837b7b" style={styles.icon} />
          <TextInput
            style={[styles.input, { backgroundColor: '#d9d9d9', color: '#837b7b' }]}
            placeholder="Contraseña"
            placeholderTextColor="#837b7b"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={styles.registerLink}>
          <Text style={[styles.registerText, { color: '#fff' }]}>
            Crear cuenta nueva <Text style={[styles.registerLinkText, { color: '#fff' }]}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordLink}>
          <Text style={[styles.forgotPasswordText, { color: '#fff' }]}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscurecido
    width: '100%',
    padding: 20,
  },
  logo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#d9d9d9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#837b7b',
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 20,
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
  registerLink: {
    marginVertical: 10,
  },
  registerText: {
    color: '#837b7b',
  },
  registerLinkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#837b7b',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
