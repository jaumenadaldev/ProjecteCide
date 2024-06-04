import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getUserInfo } from './services/userService';
import { useAuth } from './contexts/AuthContext';

const VerPerfilScreen = ({ navigation, route }) => {
    const { userId } = route.params;
    const [userInfo, setUserInfo] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (userId) {
                try {
                    const data = await getUserInfo(userId);
                    setUserInfo(data);
                } catch (error) {
                    console.error('Failed to fetch user info', error);
                }
            } else {
                console.log('No userId provided');
            }
        };
        fetchUserInfo();
    }, [userId]);

    if (!userInfo) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('./assets/CideLlarg.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.badge}>{user.role}</Text>
            </View>
            {userInfo && Object.keys(userInfo)
                .filter(key => !['_id', 'role', '__v'].includes(key))
                .map(key => (
                    <View style={styles.infoRow} key={key}>
                        <Text style={styles.label}>{key}:</Text>
                        <Text style={styles.value}>{userInfo[key]}</Text>
                    </View>
                ))}
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>TORNA ENRERE</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImage: {
        width: '80%',
        height: 150,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    badge: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 5,
        bottom: 50,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        left: 20,
        top: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
        width: 150,
    },
    value: {
        flex: 1,
    },
    button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
        left: 20,
        marginTop: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default VerPerfilScreen;