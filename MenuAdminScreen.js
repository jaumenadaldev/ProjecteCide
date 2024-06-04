import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from './contexts/AuthContext';

const AdminMenuScreen = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.adminBadge}>{user.role}</Text>
      </View>
      <Image source={require('./assets/cide.png')} style={styles.image} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CercarAlumnes')}>
          <Text style={styles.buttonText}>CERCAR ALUMNE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ValidarFactures')}>
          <Text style={styles.buttonText}>VALIDAR FACTURES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 20,
  },
  adminBadge: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
  },
  image: {
    width: '70%',
    height: 300,
    marginBottom: 200,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '70%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default AdminMenuScreen;