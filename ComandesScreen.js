import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Switch, StyleSheet, Image } from 'react-native';
import { createComanda } from './services/comandesService';
import { useAuth } from './contexts/AuthContext';
import RNPickerSelect from 'react-native-picker-select';
import { CheckBox } from 'react-native-elements';

const ComandesScreen = ({ navigation }) => {
    const { user } = useAuth();

    // Definició de productes, serveis i activitats
    const productos = [
        { id: 'xandal_samarreta', nom: 'Samarreta de Xàndal', preu: 20, discountable: false },
        { id: 'xandal_calçons', nom: 'Calçons d\'Esport', preu: 25, discountable: false },
        { id: 'xandal_jaqueta', nom: 'Jaqueta', preu: 25, discountable: false },
        { id: 'xandal_baberall', nom: 'Baberall', preu: 15, discountable: false },
    ];

    const servicios = [
        { id: 'menjador_diari', nom: 'Menjador (Diario)', preu: 8.5, discountable: true },
        { id: 'menjador_mensual', nom: 'Menjador (Mensual)', preu: 8.5 * 20, discountable: true },
        { id: 'escola_matinera_diaria', nom: 'Escola Matinera (Diaria)', preu: 5, discountable: false },
        { id: 'escola_matinera_mensual', nom: 'Escola Matinera (Mensual)', preu: 5 * 20, discountable: false },
    ];

    const actividades = [
        { id: 'master_chef', nom: 'Master Xef (Mensual)', preu: 25, discountable: true },
        { id: 'arduino', nom: 'Arduino (Mensual)', preu: 25, discountable: true },
        { id: 'gimnasia', nom: 'Gimnàsia (Mensual)', preu: 25, discountable: true },
        { id: 'futbol', nom: 'Fútbol (Mensual)', preu: 25, discountable: true },
        { id: 'basquet', nom: 'Bàsquet (Mensual)', preu: 25, discountable: true },
        { id: 'angles_amb_jocs', nom: 'Anglès amb Jocs (Mensual)', preu: 25, discountable: true },
        { id: 'robotica', nom: 'Robòtica (Mensual)', preu: 25, discountable: true },
    ];

    const [comandaItems, setComandaItems] = useState(initializeComandaItems());

    function initializeComandaItems() {
        return [
            ...productos.map(item => ({ ...item, quantity: 0, isChecked: false })),
            ...servicios.map(item => ({ ...item, quantity: 0, isChecked: false })),
            ...actividades.map(item => ({ ...item, quantity: 0, isChecked: false })),
        ];
    }

    const handleQuantityChange = (itemId, quantity) => {
        const updatedItems = comandaItems.map(item =>
            item.id === itemId ? { ...item, quantity: parseInt(quantity, 10) } : item
        );
        setComandaItems(updatedItems);
    };

    const handleToggleSwitch = (itemId, isChecked) => {
        const updatedItems = comandaItems.map(item =>
            item.id === itemId ? { ...item, isChecked, quantity: isChecked ? 1 : 0 } : item
        );
        setComandaItems(updatedItems);
    };

    const handleCreateComanda = async () => {
        const selectedItems = comandaItems.filter(item => item.isChecked || item.quantity > 0);
        if (!selectedItems.length) {
            alert('Per favor, selecciona al menys un servei.');
            return;
        }

        const itemsWithDiscount = selectedItems.map(item => {
            const preuBase = item.preu * item.quantity;
            if (item.discountable && user.esFamiliaNombrosa) {
                return { ...item, preu: preuBase * 0.8 };
            }
            return { ...item, preu: preuBase };
        });

        const total = itemsWithDiscount.reduce((acc, item) => acc + item.preu, 0);

        const comandaData = {
            usuariId: user.userId,
            items: itemsWithDiscount.map(({ id, nom, quantity, preu }) => ({ serveiId: id, serveiNom: nom, quantitat: quantity, preu })),
            total,
            estat: 'pendent'
        };

        try {
            await createComanda(comandaData);
            alert('Comanda creada amb èxit!');
        } catch (error) {
            alert(`Error al crear la comanda: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image source={require('./assets/CideLlarg.png')} style={styles.logo} />
                    <Text style={styles.badge}>{user.role}</Text>
                </View>
                <Text style={styles.title}>Carrito de comandes</Text>
                <Text style={styles.subtitle}>Productes:</Text>
                {productos.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text>{item.nom} - {item.preu.toFixed(2)}€</Text>
                        <RNPickerSelect
                            onValueChange={quantity => handleQuantityChange(item.id, quantity)}
                            items={[...Array(6).keys()].map(n => ({ label: `${n}`, value: n }))}
                            style={pickerSelectStyles}
                            value={comandaItems.find(comandaItem => comandaItem.id === item.id)?.quantity || 0}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{}}
                        />
                    </View>
                ))}
                <Text style={styles.subtitle}>Serveis:</Text>
                {servicios.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text>{item.nom} - {item.preu.toFixed(2)}€</Text>
                        {item.id.includes('mensual') ? (
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={comandaItems.find(comandaItem => comandaItem.id === item.id)?.isChecked || false}
                                    onPress={() => handleToggleSwitch(item.id, !comandaItems.find(comandaItem => comandaItem.id === item.id)?.isChecked)}
                                    size={40}
                                    checkedColor='green'
                                />
                            </View>
                        ) : (
                            <RNPickerSelect
                                onValueChange={quantity => handleQuantityChange(item.id, quantity)}
                                items={[...Array(6).keys()].map(n => ({ label: `${n}`, value: n }))}
                                style={pickerSelectStyles}
                                value={comandaItems.find(comandaItem => comandaItem.id === item.id)?.quantity || 0}
                                useNativeAndroidPickerStyle={false}
                                placeholder={{}}
                            />
                        )}
                    </View>
                ))}
                <Text style={styles.subtitle}>Activitats extraescolars:</Text>
                {actividades.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text>{item.nom} - {item.preu.toFixed(2)}€</Text>
                        <RNPickerSelect
                            onValueChange={quantity => handleQuantityChange(item.id, quantity)}
                            items={[...Array(6).keys()].map(n => ({ label: `${n}`, value: n }))}
                            style={pickerSelectStyles}
                            value={comandaItems.find(comandaItem => comandaItem.id === item.id)?.quantity || 0}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{}}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: {comandaItems.filter(item => item.isChecked || item.quantity > 0).reduce((acc, item) => acc + (item.preu * item.quantity), 0).toFixed(2)}€</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>TORNA ENRERE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCreateComanda}>
                    <Text style={styles.buttonText}>CREAR COMANDA</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    logo: {
        width: '90%',
        height: 160,
        resizeMode: 'contain',
        marginLeft: -15,
    },
    badge: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 5,
        bottom: 75,
        left: 17,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        left: 50,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        left: -8
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    totalContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        left: 20
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        display: 'flex',
        textAlign: 'center',
        width: 50,
    },
});


export default ComandesScreen;