// AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './LoginScreen';
import RegistroScreen from './RegistroScreen';
import HomeScreen from './HomeScreen';
import RegisterProductScreen from './RegisterProductScreen';
import ListarProductosScreen from './ListarProductosScreen';
import AprenderScreen from './AprenderScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RegisterProduct" component={RegisterProductScreen} />
        <Stack.Screen name="ListarProductos" component={ListarProductosScreen} /> 
        <Stack.Screen name="Aprender" component={AprenderScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
