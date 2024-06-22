// StarWarsApi.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native';

export default function StarWarsApi() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  const getPeople = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people');
      const json = await response.json();
      setData(json.results);
      setFilteredData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const newData = data.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a character"
        value={search}
        onChangeText={handleSearch}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {search.length > 0 && (
            <FlatList
              data={filteredData}
              keyExtractor={({ name }) => name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleSearch(item.name)}
                >
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{item.name}</Text>
                  <Text style={styles.label}>Height:</Text>
                  <Text style={styles.value}>{item.height}</Text>
                  <Text style={styles.label}>Mass:</Text>
                  <Text style={styles.value}>{item.mass}</Text>
                  <Text style={styles.label}>Hair Color:</Text>
                  <Text style={styles.value}>{item.hair_color}</Text>
                  <Text style={styles.label}>Skin Color:</Text>
                  <Text style={styles.value}>{item.skin_color}</Text>
                  <Text style={styles.label}>Eye Color:</Text>
                  <Text style={styles.value}>{item.eye_color}</Text>
                  <Text style={styles.label}>Birth Year:</Text>
                  <Text style={styles.value}>{item.birth_year}</Text>
                  <Text style={styles.label}>Gender:</Text>
                  <Text style={styles.value}>{item.gender}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});
