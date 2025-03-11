import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await AsyncStorage.getItem('userToken'); // Obtener el usuario
      if (email) {
        setUserEmail(email);
      } else {
        navigation.replace('Login'); // Redirigir si no hay sesión
      }
    };

    getUserEmail();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('userToken'); // Eliminar sesión
    navigation.replace('Login'); // Volver al login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido, {userEmail}!</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
