import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, Switch } from 'react-native';
import { registerUser } from './services/userService';
import { Formik } from 'formik';
import * as Yup from 'yup';

function RegisterScreen({ navigation }) {

  const validationSchema = Yup.object().shape({
  nom: Yup.string().required('El nom es obligatori'),
  cognoms: Yup.string().required('Els cognoms són obligatoris'),
  direccio: Yup.string().required('La direcció és obligatòria'),
  dataNaixement: Yup.date().required('La data de naixement és obligatòria'),
  dniNie: Yup.string().required('El DNI/NIE és obligatori'),
  contactePrincipal: Yup.string().required('El contacte principal és obligatori'),
  dniContacte: Yup.string().required('El DNI/NIE del contacte és obligatori'),
  emailContacte: Yup.string().email('Introdueix un email vàlid').required('L\'email del contacte és obligatori'),
  telefonContacte: Yup.string().required('El telèfon del contacte és obligatori'),
  dataMatricula: Yup.date().required('La data de matrícula és obligatòria').nullable(),
  iban: Yup.string().required('L\'IBAN és obligatori'),
  any: Yup.number().required('El año es obligatorio'),
  centre: Yup.string(),
  nomCurs: Yup.string().required('El nombre del curso es obligatorio'),
  tutor: Yup.string().required('El tutor es obligatorio'),
  nomUsuari: Yup.string().required('El nom d\'usuari és obligatori'),
  contrasenya: Yup.string().required('La contrasenya és obligatòria').min(5, 'La contrasenya ha de tenir com a mínim 5 caràcters'),
});

  return (
    <ImageBackground source={require('./assets/cideFondo.png')} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            nom: '',
            cognoms: '',
            direccio: '',
            dataNaixement: '',
            dniNie: '',
            contactePrincipal: '',
            dniContacte: '',
            emailContacte: '',
            telefonContacte: '',
            dataMatricula: '',
            iban: '',
            any: '',
            centre: '',
            nomCurs: '',
            tutor: '',
            nomUsuari: '',
            contrasenya: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const updatedValues = { ...values };
            registerUser(updatedValues)
              .then(() => {
                alert('Registre amb èxit!');
                navigation.navigate('Login');
                resetForm();
              })
              .catch(error => {
                alert(`Error de registre: ${error.message || 'Error de conexió al servidor'}`);
                console.error('Error de registre', error);
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, isValid }) => (
            <>
              <View style={styles.imageContainer}>
                <Image source={require('./assets/CideLlarg.png')} style={styles.leftImage} />
                <Image source={require('./assets/cooperativa.png')} style={styles.rightImage} />
              </View>
              <Text style={styles.title}>FORMULARI PER DONAR-SE D'ALTA</Text>
              {Object.keys(values).map((key) => (
                <View key={key}>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange(key)}
                    onBlur={handleBlur(key)}
                    value={values[key]}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    secureTextEntry={key === 'contrasenya'}
                    autoFocus={key === 'nom'}
                  />
                  {touched[key] && errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
                </View>
              ))}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText}>TORNA ENRERE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, isSubmitting || !isValid ? styles.buttonDisabled : styles.buttonEnabled]} onPress={handleSubmit} disabled={isSubmitting || !isValid}>
                  <Text style={styles.buttonText}>REGISTRAR-SE</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

  },
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftImage: {
    width: '60%',
    height: 150,
    resizeMode: 'contain'
  },
  rightImage: {
    width: '50%',
    height: 100,
    marginTop: 30,
    left: 5,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonEnabled: {
    backgroundColor: 'green',
  }
});

export default RegisterScreen;