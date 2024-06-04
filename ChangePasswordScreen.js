import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useAuth } from './contexts/AuthContext';
import { updatePassword } from './services/userService';
import { useNavigation } from '@react-navigation/native';

function ChangePasswordScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Les contrasenyes no coincideixen.");
            return;
        }

        try {
            const result = await updatePassword(username, password);
            Alert.alert("Èxit", "Contrasenya actualitzada correctament.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert("Error al actualizar", error.message);
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
                value={username}
                placeholder="Nom d'usuari"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="Nova contrasenya"
            />
            <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={true}
                placeholder="Confirma la nova contrasenya"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>TORNA ENRERE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                    <Text style={styles.buttonText}>ACTUALITZA</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ChangePasswordScreen;