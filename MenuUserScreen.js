import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getUserInfo } from './services/userService';
import { useAuth } from './contexts/AuthContext';

const UserMenuScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user && user.userId) {
            const fetchUserInfo = async () => {
                try {
                    const data = await getUserInfo(user.userId);
                    setUserInfo(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch user info:', error);
                    setError('Failed to fetch user info');
                    setLoading(false);
                }
            };
            fetchUserInfo();
        } else {
            setError('No user ID found');
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userBadge}>{user.role}</Text>
      </View>
      <Image source={require('./assets/cide.png')} style={styles.image} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Comandes')}>
          <Text style={styles.buttonText}>COMANDES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VeureFactures')}>
          <Text style={styles.buttonText}>FACTURES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerPerfil', { userId: user.userId })}>
          <Text style={styles.buttonText}>VER PERFIL</Text>
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
  userBadge: {
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
    marginTop: 50,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default UserMenuScreen;