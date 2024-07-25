let mongoose = require('mongoose')
const Producto = require('./producto').Producto

let esquemaOrdenDeCompra = new mongoose.Schema({
    codigo : String,
    fecha : String,
    total : Number,
    formaPago : String,
    direccionFacturacion : String,
    direccionEntrega : String,
    estado : String,
    usuario: {
        _id : mongoose.ObjectId,
        nombre : String,
        direccion : String,
        telefono : String,
        correoE : String
    },
    detalles : [{
        cantidad : Number,
        precio : Number,
        producto : Producto.schema
    }]
})

exports.OrdenDeCompra = mongoose.model('ordenesDeCompra', esquemaOrdenDeCompra)