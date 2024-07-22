import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Detail = ({ route, navigation, addToCollection }) => {
  const { url } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setPokemon(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const handleAddToCollection = () => {
    if (pokemon) {
      addToCollection({
        name: pokemon.name,
        sprites: pokemon.sprites,
        // Add any other necessary Pokémon properties
      });
      navigation.navigate('Koleksi');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>{pokemon.name}</Text>
        <Image 
          source={{ uri: pokemon.sprites.front_default }} 
          style={styles.image} 
        />
        <Text style={styles.detail}>Height: {pokemon.height / 10} m</Text>
        <Text style={styles.detail}>Weight: {pokemon.weight / 10} kg</Text>

        <Text style={styles.subHeader}>Jenis:</Text>
        <View style={styles.grid}>
          {pokemon.types.map((typeInfo) => (
            <Text key={typeInfo.type.name} style={styles.gridItem}>
              {typeInfo.type.name}
            </Text>
          ))}
        </View>

        <Text style={styles.subHeader}>Kemampuan:</Text>
        <View style={styles.grid}>
          {pokemon.abilities.map((abilityInfo) => (
            <Text key={abilityInfo.ability.name} style={styles.gridItem}>
              {abilityInfo.ability.name}
            </Text>
          ))}
        </View>

        <Text style={styles.subHeader}>Statistik:</Text>
        <View style={styles.grid}>
          {pokemon.stats.map((statInfo) => (
            <View key={statInfo.stat.name} style={styles.gridItem}>
              <Text>{statInfo.stat.name}: {statInfo.base_stat}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleAddToCollection}
        >
          <Text style={styles.buttonText}>Tambahkan ke Koleksi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'grey',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  detail: {
    marginTop: 10,
    fontSize: 18,
  },
  subHeader: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  gridItem: {
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: '45%', // Adjust width as needed
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Detail;
