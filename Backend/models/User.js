const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  cognoms: { type: String, required: true },
  direccio: { type: String, required: true },
  dataNaixement: { type: Date, required: true },
  dniNie: { type: String, required: true },
  contactePrincipal: { type: String, required: true },
  dniContacte: { type: String, required: true },
  emailContacte: { type: String, required: true },
  telefonContacte: { type: String, required: true },
  dataMatricula: { type: Date, required: true },
  iban: { type: String, required: true },
  any: { type: Number, required: true },
  centre: { type: String },
  nomCurs: { type: String, required: true },
  tutor: { type: String, required: true },
  nomUsuari: { type: String, required: true, unique: true },
  contrasenya: { type: String, required: true },
  role: { type: String, default: 'User' },
  esFamiliaNombrosa: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);