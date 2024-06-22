// EjemploApi.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

export default function EjemploApi() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingBottom: 290,
  },
  // Otros estilos aquí si es necesario
});
