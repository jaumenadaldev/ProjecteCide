const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComandaSchema = new Schema({
    usuariId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        serveiId: { type: String, required: true },
        quantitat: { type: Number, required: true },
        preu: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    estat: { type: String, enum: ['Pendent', 'Aprovada', 'Rebutjada'], default: 'Pendent' },
    dataCreacio: { type: Date, default: Date.now },
    dataActualitzacio: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comanda', ComandaSchema);