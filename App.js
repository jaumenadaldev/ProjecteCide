import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './contexts/AuthContext';
import HomeScreen from './HomeScreen'; 
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import AdminMenuScreen from './MenuAdminScreen';
import UserMenuScreen from './MenuUserScreen';
import CercarAlumnesScreen from './CercarAlumnesScreen';
import VerPerfilScreen from './VerPerfilScreen';
import ComandesScreen from './ComandesScreen';
import ValidarFacturesScreen from './ValidarFacturesScreen';
import VeureFacturesScreen from './VeureFacturesScreen';
import ChangePasswordScreen from './ChangePasswordScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registre' }} />
          <Stack.Screen name="AdminMenu" component={AdminMenuScreen} options={{ title: 'Menú Admin' }} />
          <Stack.Screen name="UserMenu" component={UserMenuScreen} options={{ title: 'Menú Usuari' }} />
          <Stack.Screen name="CercarAlumnes" component={CercarAlumnesScreen} options={{ title: 'Cercar Alumnes' }} />
          <Stack.Screen name="VerPerfil" component={VerPerfilScreen} options={{ title: 'Perfil' }} />
          <Stack.Screen name="Comandes" component={ComandesScreen} options={{ title: 'Comandes' }} />
          <Stack.Screen name="ValidarFactures" component={ValidarFacturesScreen} options={{ title: 'Validar Factures' }} />
          <Stack.Screen name="VeureFactures" component={VeureFacturesScreen} options={{ title: 'Veure Factures' }} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Canviar Contrasenya' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
