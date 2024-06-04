import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { getComandasByUser } from './services/comandesService';
import { useAuth } from './contexts/AuthContext';

const VeureFacturesScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [userComandas, setUserComandas] = useState([]);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        fetchComandas();
    }, []);

    const fetchComandas = async () => {
        fetchUserComandas();
    };

    const fetchUserComandas = async () => {
        try {
            const data = await getComandasByUser(user.userId);
            setUserComandas(data);
        } catch (error) {
            console.error('Error fetching user comandas:', error.message, error.response?.data);
            alert('Error fetching user comandas: ' + (error.response?.data?.message || error.message));
        }
    };

    const toggleExpand = (id) => {
        setExpanded(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpand(item._id)} style={styles.itemHeader}>
                <Text>Comanda: {item.estat} - Total: {item.total}€</Text>
            </TouchableOpacity>
            {expanded[item._id] && (
                <View style={styles.detailsContainer}>
                    {item.items.map((it, index) => (
                        <Text key={index}>
                            {it.serveiId}, Quantitat: {it.quantitat}, Preu: {it.preu}€
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.userBadge}>{user.role}</Text>
            <View style={styles.imageContainer}>
                <Image source={require('./assets/CideLlarg.png')} style={styles.leftImage} />
                <Image source={require('./assets/cooperativa.png')} style={styles.rightImage} />
            </View>
            <Text style={styles.title}>Les Meves Comandes</Text>
            <FlatList
                data={userComandas}
                keyExtractor={item => item._id.toString()}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>TORNA ENRERE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    userBadge: {
        fontWeight: 'bold',
        backgroundColor: 'green',
        color: 'white',
        padding: 8,
        borderRadius: 5,
        fontSize: 16,
        overflow: 'hidden',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    leftImage: {
        width: '60%',
        height: 150,
        resizeMode: 'contain'
    },
    rightImage: {
        width: '40%',
        height: 100,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    itemHeader: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    detailsContainer: {
        padding: 10,
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    buttonRebutjar: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: 'red',
        borderRadius: 5,
    }
});

export default VeureFacturesScreen;