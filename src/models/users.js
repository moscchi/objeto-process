const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
});

const UsuariosModel = mongoose.model('UsuariosModel', Schema);

module.exports = UsuariosModel;