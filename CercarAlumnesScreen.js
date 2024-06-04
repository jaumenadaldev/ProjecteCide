import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { searchUsers } from './services/userService';
import { useAuth } from './contexts/AuthContext';

const CercarAlumnesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Per favor, introdueix un element de cerca');
      return;
    }
    try {
      const data = await searchUsers(query);
      setResults(data);
    } catch (error) {
      console.error('Error al realitzar la cerca', error);
      alert('Error al realitzar la cerca');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.adminBadge}>{user.role}</Text>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/CideLlarg.png')} style={styles.leftImage} />
        <Image source={require('./assets/cooperativa.png')} style={styles.rightImage} />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setQuery}
        value={query}
        placeholder="Introdueix el nom de l'alumne a cercar..."
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={styles.button}
      >
        <Text style={styles.buttonText}>CERCAR</Text>
      </TouchableOpacity>
      <FlatList
        data={results}
        keyExtractor={item => item.nomUsuari}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nom:</Text>
              <Text style={styles.value}>{item.nom}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Cognoms:</Text>
              <Text style={styles.value}>{item.cognoms}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Direcció:</Text>
              <Text style={styles.value}>{item.direccio}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Data Naixement:</Text>
              <Text style={styles.value}>{item.dataNaixement && new Date(item.dataNaixement).toLocaleDateString()}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>DNI/NIE:</Text>
              <Text style={styles.value}>{item.dniNie}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Contacte Principal:</Text>
              <Text style={styles.value}>{item.contactePrincipal}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>DNI Contacte:</Text>
              <Text style={styles.value}>{item.dniContacte}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email Contacte:</Text>
              <Text style={styles.value}>{item.emailContacte}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Telèfon Contacte:</Text>
              <Text style={styles.value}>{item.telefonContacte}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Data Matrícula:</Text>
              <Text style={styles.value}>{item.dataMatricula && new Date(item.dataMatricula).toLocaleDateString()}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>IBAN:</Text>
              <Text style={styles.value}>{item.iban}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Any:</Text>
              <Text style={styles.value}>{item.any}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Centre:</Text>
              <Text style={styles.value}>{item.centre}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nom curs:</Text>
              <Text style={styles.value}>{item.nomCurs}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Tutor:</Text>
              <Text style={styles.value}>{item.tutor}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nom d'usuari:</Text>
              <Text style={styles.value}>{item.nomUsuari}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.Backbutton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.BackbuttonText}>TORNA ENRERE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftImage: {
    width: '60%',
    height: 150,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  rightImage: {
    width: '50%',
    height: 100,
    marginTop: 30,
    left: 5,
    resizeMode: 'contain'
  },
  adminBadge: {
    fontWeight: 'bold',
    backgroundColor: 'green',
    color: 'white',
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -30
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    left: 20,
    top: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  value: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    width: '90%',
    alignSelf: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    left: 20,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  Backbutton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    left: 20,
    marginBottom: 20,
  },
  BackbuttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CercarAlumnesScreen;
