const mongoose = require('mongoose');
const { Schema } = mongoose;

const PruebaSchema = new Schema({
    nombre: {type: String },
    apellido: {type: String}
});

module.exports = mongoose.model('Prueba', PruebaSchema);