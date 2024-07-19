let mongoose = require('mongoose')

let esquemaUsuarioHistorico = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id
    //no lo añadiremos al esquema            
    //_id       : ObjectID,
    login: {
        type    : String,
        required: true
    },
    password  : String,
    rol       : String,
    nombre    : String,
    direccion : String,
    telefono  : String,
    correoE   : String,
    fechaAlta : String,
    fechaBaja : String    
})

exports.UsuarioHistorico = mongoose.model('usuarios_historicos', esquemaUsuarioHistorico)