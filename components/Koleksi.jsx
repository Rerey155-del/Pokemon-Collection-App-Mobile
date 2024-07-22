import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const Koleksi = ({ collection, setCollection }) => {
  
  const handleDelete = (index) => {
    const newCollection = collection.filter((_, i) => i !== index);
    setCollection(newCollection);
    // Optionally, save the updated collection to AsyncStorage here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {collection.length > 0 ? (
        collection.map((pokemon, index) => (
          <View key={index} style={styles.card}>
            <Image 
              source={{ uri: pokemon.sprites.front_default }} 
              style={styles.image} 
            />
            <Text style={styles.header}>{pokemon.name}</Text>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => handleDelete(index)}
            >
              <Text style={styles.deleteButtonText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.message}>Tidak ada Pokémon di koleksi.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'grey',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    textTransform: 'capitalize',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Koleksi;
