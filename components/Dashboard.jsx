import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Dashboard = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
        setData(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    if (!item) return null; // Check for null items

    return (
      <ScrollView>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image 
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }} 
            style={styles.image}
          />
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Detail', { url: item.url })}
          >
            <Text style={styles.buttonText}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerr}>Berikut ini kumpulan pokemon yang tersedia disini</Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'grey',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  headerr: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 10,
    color: 'white'
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Dashboard;
