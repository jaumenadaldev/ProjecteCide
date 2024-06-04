import axiosInstance from '../api/axios';

// Funció per registrar un nou usuari
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('No s`ha pogut completar el registre de l`usuari');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de connexió al servidor');
  }
};

// Funció per iniciar sessió
export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/users/login', {
            nomUsuari: username,
            contrasenya: password
        });
        if (response.data && response.data.user) {
            return response.data.user;
        } else {
            throw new Error('No user data returned');
        }
    } catch (error) {
        console.error('Error d`inici de sessió:', error.response ? error.response.data.message : 'Error desconegut');
        throw new Error('Inici de sessió fallat: ' + (error.response ? error.response.data.message : 'Error desconegut'));
    }
};

// Funció per obtenir la informació d'un usuari
export const getUserInfo = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('No s`ha pogut obtenir la informació de l`usuari');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de conexió al servidor');
  }
};

// Funció per cercar usuaris
export const searchUsers = async (query) => {
  try {
    const response = await axiosInstance.get(`/users/search?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error al cercar usuaris:', error);
    throw error;
  }
};

export const updatePassword = async (username, newPassword) => {
  try {
    const response = await axiosInstance.put('/users/updatePassword', {
      nomUsuari: username,
      novaContrasenya: newPassword
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Ha fallat l`actualització de la contrasenya');
    }
  } catch (error) {
    console.error('Error actualitzant la contrasenya:', error);
    throw new Error('Actualització de constrasenya fallada: ' + error.message);
  }
};