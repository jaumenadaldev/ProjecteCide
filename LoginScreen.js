import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useAuth } from './contexts/AuthContext';
import { login as userServiceLogin } from './services/userService';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
  const [nomUsuari, setUsername] = useState('');
  const [contrasenya, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (nomUsuari.trim() && contrasenya.trim()) {
      try {
        const userData = await userServiceLogin(nomUsuari.trim(), contrasenya.trim());
        if (userData) {
          login(userData);
          if (userData.role === 'Admin') {
            navigation.navigate('AdminMenu');
          } else {
            navigation.navigate('UserMenu');
          }
        } else {
          throw new Error('Login failed: No user data returned');
        }
      } catch (error) {
        Alert.alert('Error d`Inici de Sessió', error.message || 'Un error ha ocorregut durant el procés de login. Si us plau, intenta-ho de nou.');
      }
    } else {
      Alert.alert('Error', 'Per favor, introdueix el nom d\'usuari i la contrasenya');
    }
  };


  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/cide.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={nomUsuari}
        placeholder="Nom Usuari*"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={contrasenya}
        secureTextEntry={true}
        placeholder="Contrasenya*"
      />
      <View style={styles.forgotPasswordContainer}>
        <Text
          style={styles.forgotPassword}
          onPress={ () => navigation.navigate('ChangePassword') }
        >
          Has oblidat la contrasenya?
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={ handleLogin }
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Si no estàs donat d'alta,{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Registre't
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '70%',
    height: 300,
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 50,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  forgotPasswordContainer: {
    width: '90%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    width: '90%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'green',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    textDecorationLine: 'underline',
    color: 'green',
  }
});

export default LoginScreen;