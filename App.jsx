import React, { useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from './components/Dashboard';
import Detail from './components/ditel'; 
import Koleksi from './components/Koleksi';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const App = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const storedCollection = await AsyncStorage.getItem('Koleksi');
        if (storedCollection) {
          setCollection(JSON.parse(storedCollection));
        }
      } catch (error) {
        console.error('Failed to load collection from storage', error);
      }
    };

    loadCollection();
  }, []);

  const addToCollection = async (pokemon) => {
    const newCollection = [...collection, pokemon];
    setCollection(newCollection);
    try {
      await AsyncStorage.setItem('Koleksi', JSON.stringify(newCollection));
    } catch (error) {
      console.error('Gagal untuk menyimpan di penyimpanan', error);
    }
  };

  return (
    <NavigationContainer theme={NavigationDarkTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6C946F', // Dark mode background color for the header
          },
          headerTintColor: '#fff', // White color for header text
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Pokemon Collection App" 
          component={Dashboard} 
          options={({ navigation }) => ({
            headerRight: () => (
              <Icon
                name="albums"
                size={30}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('Koleksi')}
              />
            ),
          })}
        />
        <Stack.Screen name="Detail">
          {props => <Detail {...props} addToCollection={addToCollection} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Koleksi"
          options={({ navigation }) => ({
            headerRight: () => (
              <Icon
                name="home"
                size={30}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('Pokemon Collection App')}
              />
            ),
          })}
        >
          {props => (
            <Koleksi 
              {...props} 
              collection={collection} 
              setCollection={setCollection} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
