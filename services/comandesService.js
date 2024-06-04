import axiosInstance from '../api/axios';

// Funció per crear una nova comanda
export const createComanda = async (comandaData) => {
  try {
    const response = await axiosInstance.post('/comandas', comandaData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('No s`ha pogut completar la creació de la comanda');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de conexió al servidor');
  }
};

// Funció per obtenir totes les comandes d'un usuari específic
export const getComandasByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/comandas/user/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('No s`han pogut obtenir les comandes');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de conexió al servidor');
  }
};

// Funció per obtenir totes les comandes pendents d'aprovació
export const getPendingComandas = async () => {
  try {
    const response = await axiosInstance.get('/comandas/pending');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('No s`han pogut obtenir les comandes');
    }
  } catch (error) {
    console.error('Error fetching comandas:', error.response ? `${error.response.status} - ${error.response.statusText}` : error.message);
    throw new Error(`Error fetching comandas: ${error.response ? error.response.data.message : 'Connection error'}`);
  }
};

// Funció per obtenir comandes per estat
export const getComandasByStatus = async (status) => {
  try {
    const response = await axiosInstance.get(`/comandas/byStatus/${status}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('No s`han pogut obtenir les comandes');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de conexió al servidor');
  }
};

// Funció per actualitzar una comanda
export const updateComanda = async (comandaId, updateData) => {
  try {
    const response = await axiosInstance.put(`/comandas/${comandaId}`, updateData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('No s`ha pogut actualitzar la comanda');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de conexió al servidor');
  }
};

// Funció per eliminar una comanda
export const deleteComanda = async (comandaId) => {
  try {
    const response = await axiosInstance.delete(`/comandas/${comandaId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('No s`ha pogut eliminar la comanda');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de conexió al servidor');
  }
};