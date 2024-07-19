const mongoose = require('mongoose')
const Usuario = require('../entidades/usuario').Usuario
const UsuarioHistorico = require('../entidades/usuarioHistorico').UsuarioHistorico
const crearError = require("../../util/errorUtil").crearError

let reglasUsrInsercion = {
    login    : "required|min:3|max:20",
    password : "required|min:3|max:20",
    nombre   : "required|min:3|max:50",
    correoE  : "required|min:3|max:30|email"
}

let reglasUsrModificacion = {
    login     : "required|min:3|max:20",
    password  : "required|min:3|max:20",
    nombre    : "required|min:3|max:50",
    correoE   : "required|min:3|max:30|email",
    telefono  : "required|min:3|max:20",
    direccion : "required|min:3|max:50",
}

exports.buscarPorLogin = async function(login){
    try {
        //return await mongodbUtil.esquema.collection("usuarios").findOne({ login : login })
        return await Usuario.findOne({login : login})
    } catch (error) {
        console.log(error)
        throw crearError(500, "Error con la base de datos")
    }
}

exports.insertarUsuario = async function(usuario){
    try {
        //Validar los datos    
        if(!usuario.login   || usuario.login.trim()   == "" || 
            !usuario.correoE || usuario.correoE.trim() == "" || 
            !usuario.nombre  || usuario.nombre.trim()  == "" ){
            throw crearError(400)
        }

        //Comprobar que el login no está repetido
        let usuarioEncontrado = await exports.buscarPorLogin(usuario.login)
        if(usuarioEncontrado){
            throw crearError(400, "Ya existe el login") 
        }

        //Le asignamos el rol al usuario
        usuario.rol = "CLIENTE"
        usuario.fechaAlta = Date.now()
        
        //QUITAR EL _ID
        delete usuario._id
        //calcular el hash del password y guardar el hash
        //insertar el usuario
        //return await mongodbUtil.esquema.collection("usuarios").insertOne(usuario)

        let usuarioMG = new Usuario(usuario)
        return await usuarioMG.save()
    } catch ( error ){
        if(error.codigo){
            throw error
        }
        console.log(error)
        throw crearError(500, "Error con la base de datos")
    }
}

//Autenticación: si
//Autorización :
//-clientes : solo pueden modificarse a si mismos
//-empleados: pueden modificar cualquier usuario
exports.modificarUsuario = async function(usuario, autoridad){

    //Validación
    if(!usuario.login     || usuario.login.trim()     == "" || 
        !usuario.correoE   || usuario.correoE.trim()   == "" || 
        !usuario.nombre    || usuario.nombre.trim()    == "" ||
        !usuario.direccion || usuario.direccion.trim() == "" ||
        !usuario.telefono  || usuario.telefono.trim()  == "" ){
        throw crearError(400)
    }     

    //Autorización 
    if(autoridad.rol!="EMPLEADO" && autoridad._id!=usuario._id){                        
        throw crearError(403, 'Los clientes solo pueden modificarse a si mismos') 
    }

    try {
        //Modificar 
        // let resultado = await mongodbUtil.esquema.collection("usuarios").findOneAndUpdate( 
        let resultado = await Usuario.findByIdAndUpdate( 
                //{ _id : new ObjectId(usuario._id) },
                usuario._id,
                {
                    $set : {
                        //Aqui no podemos colocar el _id (es inmutable)
                        nombre    : usuario.nombre,
                        correoE   : usuario.correoE,
                        telefono  : usuario.telefono,
                        direccion : usuario.direccion
                    }
                }
            ) 
        if(!resultado){
            throw crearError(404, "El usuario no existe")
        }
    } catch ( error ) {
        if(error.codigo){
            throw error
        }
        console.log(error)
        throw crearError(500, "Error con la base de datos")
    }
}

exports.borrarUsuario = async function(idUsuario, autoridad){
    let session
    try {
        // INICIO DE LA TX (Transacción)
        session = await mongoose.startSession()
        session.startTransaction()

        // Autorizacion
        if(autoridad.rol != 'EMPLEADO' && autoridad._id!=idUsuario){
            throw crearError(403, "Los clientes solo pueden darse de baja a si mismos.")
        }

        // Buscamos el usuario a partir del if
        // Este findById no es necesario que este asociada a la transacción
        let usuario = await Usuario.findById(idUsuario)
        if(!usuario){
            throw crearError(404, "El cliente no existe")
        }

        // Transformamos el documento 'usuario' a un objeto y eliminamos su _id
        let usuarioObj = usuario.toObject()
        delete usuarioObj._id

        // Lo insertamos en la collecion 'usuarios_historicos'
        let usuarioHistorico = new UsuarioHistorico(usuarioObj)
        // delete usuarioHistorico._doc._id

        // Asignamos una fecha de baja
        usuarioHistorico.fechaBaja = Date.now()

        // Esta consulta si que debe asociada a la transacción
        await usuarioHistorico.save({session})

        // Le pedimos al usuario que se borre a si mismo
        await usuario.deleteOne({session})

        // COMMIT
        await session.commitTransaction()
    } catch (error) {
        console.log(error);
        // ABORT (ROLLBACK)
        await session.abortTransaction()
        if(error.codigo){
            throw error
        }
        throw crearError(500, "Error al borrar el usuario en la bbdd")
    } finally {
        await session.endSession() 
    }
}