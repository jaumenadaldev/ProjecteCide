import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { getPendingComandas, getComandasByStatus, updateComanda } from './services/comandesService';
import { useAuth } from './contexts/AuthContext';

const ValidarFacturesScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [pendingComandas, setPendingComandas] = useState([]);
    const [historialComandas, setHistorialComandas] = useState([]);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        fetchComandas();
    }, []);

    const fetchComandas = async () => {
        fetchPendingComandas();
        fetchHistorialComandas();
    };

    const fetchPendingComandas = async () => {
        try {
            const data = await getPendingComandas();
            setPendingComandas(data);
        } catch (error) {
            console.error('Error fetching pending comandas:', error.message, error.response?.data);
            alert('Error fetching pending comandas: ' + (error.response?.data?.message || error.message));
        }
    };

    const fetchHistorialComandas = async () => {
        try {
            const aprobadas = await getComandasByStatus('Aprovada');
            const rebutjadas = await getComandasByStatus('Rebutjada');
            setHistorialComandas([...aprobadas, ...rebutjadas]);
        } catch (error) {
            console.error('Error fetching historial comandas:', error.message, error.response?.data);
            alert('Error fetching historial comandas: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdateStatus = async (comandaId, newStatus) => {
        try {
            await updateComanda(comandaId, { estat: newStatus });
            fetchComandas();
        } catch (error) {
            console.error('Error updating comanda status:', error);
        }
    };

    const toggleExpand = (id) => {
        setExpanded(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const renderItemPending = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpand(item._id)} style={styles.itemHeader}>
                <Text>Comanda: {item.estat} - Total: {item.total}€</Text>
            </TouchableOpacity>
            {expanded[item._id] && (
                <View style={styles.detailsContainer}>
                    {item.items.map((it, index) => (
                        <Text key={index}>
                            Producte: {it.serveiId}, Quantitat: {it.quantitat}, Preu: {it.preu}€
                        </Text>
                    ))}
                    <TouchableOpacity onPress={() => handleUpdateStatus(item._id, 'Aprovada')} style={styles.button}>
                        <Text style={styles.buttonText}>Aprovar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleUpdateStatus(item._id, 'Rebutjada')} style={styles.buttonRebutjar}>
                        <Text style={styles.buttonText}>Rebutjar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    const renderItemHistorial = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpand(item._id)} style={styles.itemHeader}>
                <Text>Comanda: {item.estat} - Total: {item.total}€</Text>
            </TouchableOpacity>
            {expanded[item._id] && (
                <View style={styles.detailsContainer}>
                    {item.items.map((it, index) => (
                        <Text key={index}>
                            Producte: {it.serveiId}, Quantitat: {it.quantitat}, Preu: {it.preu}€
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.adminBadge}>{user.role}</Text>
            <View style={styles.imageContainer}>
                <Image source={require('./assets/CideLlarg.png')} style={styles.leftImage} />
                <Image source={require('./assets/cooperativa.png')} style={styles.rightImage} />
            </View>
            <Text style={styles.title}>Comandes Pendents</Text>
            <FlatList
                data={pendingComandas}
                keyExtractor={item => item._id.toString()}
                renderItem={renderItemPending}
            />
            <Text style={styles.title}>Historial de Comandes</Text>
            <FlatList
                data={historialComandas}
                keyExtractor={item => item._id.toString()}
                renderItem={renderItemHistorial}
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

export default ValidarFacturesScreen;
