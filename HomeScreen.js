import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>BENVINGUDES I BENVINGUTS A L'APP DEL CIDE</Text>
      </View>
      <Image 
        source={require('./assets/cide.png')} 
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  title: {
    fontSize: 29,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: '70%',
    height: 300,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default HomeScreen;
