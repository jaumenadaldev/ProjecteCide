const express = require('express');
const User = require('../models/User');
const Comanda = require('../models/Comanda');
const router = express.Router();

async function checkAndUpdateFamilyStatus(dniContacte) {
  try {
    const users = await User.find({ dniContacte });
    if (users.length >= 3) {
      await User.updateMany(
        { dniContacte: dniContacte },
        { $set: { esFamiliaNombrosa: true } }
      );
      console.log("Usuaris actualitzats a familia nombrosa:", users.length);
    }
  } catch (error) {
    console.error("Error actualitzando usuaris a familia nombrosa:", error);
  }
}

router.post('/register', async (req, res) => {
  console.log("Dades recibudes per registre:", req.body);
  const { nom, cognoms, direccio, dataNaixement, dniNie, contactePrincipal, dniContacte, emailContacte, telefonContacte, dataMatricula, iban, any, centre, nomCurs, tutor, nomUsuari, contrasenya, role} = req.body;
  const newUser = new User({
    nom,
    cognoms,
    direccio,
    dataNaixement,
    dniNie,
    contactePrincipal,
    dniContacte,
    emailContacte,
    telefonContacte,
    dataMatricula,
    iban,
    any,
    centre,
    nomCurs,
    tutor,
    nomUsuari,
    contrasenya,
    role: role || 'User',
    esFamiliaNombrosa: false
  });

  try {
    await newUser.save();
    await checkAndUpdateFamilyStatus(dniContacte);
    const newComanda = new Comanda({
      usuariId: newUser._id,
      items: [{ serveiId: 'id_del_servei_assegurança', quantitat: 1, preu: 23 }],
      total: 23,
      estat: 'Pendent'
    });
    await newComanda.save();
    res.status(201).json({ message: "Usuari registrat amb èxit i sol·licitud d'assegurança creada", userId: newUser._id, role: newUser.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar l'usuari", error: error.toString() });
  }
});

router.post('/login', async (req, res) => {
  const { nomUsuari, contrasenya } = req.body;
  try {
    const user = await User.findOne({ nomUsuari });
    if (!user) {
      return res.status(404).json({ message: 'Usuari no trobat.' });
    }

    if (user.contrasenya !== contrasenya) {
      return res.status(401).json({ message: 'Contrasenya incorrecte.' });
    }

    res.json({ message: 'Inici de sessió exitos', user: { ...user.toObject(), userId: user._id, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});


router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const results = await User.find({
      nomUsuari: { $regex: query, $options: 'i' }
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error al cercar alumnes', error });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuari no trobat.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
})

router.put('/updatePassword', async (req, res) => {
  const { nomUsuari, novaContrasenya } = req.body;
  try {
    const user = await User.findOne({ nomUsuari });
    if (!user) {
      return res.status(404).send('Usuari no trobat.');
    }
    user.contrasenya = novaContrasenya;
    await user.save();
    res.send('Contrasenya actualitzada correctament');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualitzar la contrasenya');
  }
});

module.exports = router;