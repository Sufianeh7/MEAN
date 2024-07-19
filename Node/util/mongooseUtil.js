// npm install mongoose
const mongoose = require('mongoose')
const crearError = require("./errorUtil").crearError

exports.esquema = null

exports.conectar = async function(){

    try {
        console.log("Conectando con mongoDB...")
        let cadenaConexion = process.env["mongodb.url"]
        await mongoose.connect(cadenaConexion)
        console.log("Conexión establecida")
    } catch (error) {
        console.log(error);
        throw crearError(500, "No se pudo conectar con la bbdd.")
    }
}
