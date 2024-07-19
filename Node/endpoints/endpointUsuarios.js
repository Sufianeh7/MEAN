const negocioUsuarios = require("../modelo/negocio/negocioUsuarios")
const { crearError } = require("../util/errorUtil")
//const express = require("express")
//let router = express.Router()
//router.get('/usuarios', ...)
const router = require("express").Router()

router.head('/usuarios',comprobarLoginUsuario)
router.post('/usuarios', insertarUsuario)
router.put('/seguro/usuarios/:id', modificarUsuario)
router.delete('/seguro/usuarios/:id', bajaUsuario)

exports.router = router

///////////////////////////////////////
// FUNCIONES DE LA LÓGICA DE CONTROL //
///////////////////////////////////////

/*
POST /usuarios
Content-type: application/json
------------------------------
{ usuario }
*/
async function insertarUsuario(request, response){
    let usuario = request.body

    try {
        let resultado = await negocioUsuarios.insertarUsuario(usuario)
        response
            .status(201)
            .json(resultado)
    } catch (error){
        console.log(error)
        response
            .status(error.codigo)
            .json(error)         
    }

}

//PUT /usuarios/87
//CT: app/json
//Authorization: Bearer fhgruygueueudutr.6t875uguhhedhrh.rjgtjfdrjfuj548t8
//----------------
//{
//  _id       : 87,
//  nombre    : "Bartolo"
//  direccion : ...
//}
async function modificarUsuario(request, response){

    let autoridad = request.autoridad
    let idUsuario = request.params.id
    let usuario = request.body
    
    if( usuario._id != idUsuario ){
        response.status(400).json("Qué cojones estás haciendo con los ids")
        return
    }
    
    try {
        await negocioUsuarios.modificarUsuario(usuario, autoridad)
        response.json({ mensaje : "El usuario se modificó correctamente" })
    } catch (error) {
        console.log(error)
        response
            .status(error.codigo)
            .json(error)   
    }
}

async function comprobarLoginUsuario(request, response){
    let login = request.query.login
    if(!login){
        response.status(400).end("Falta el login")
        return
    }

    try {
        let usuarioEncontrado = await negocioUsuarios.buscarPorLogin(login)
        if(usuarioEncontrado){
            response.json() //Es un head, no pondremos nada en el body
        } else {
            response
                .status(404)
                .json({ codigo:404, mensaje: "No existe un usuario con ese login"})         
        }
    }catch(error) {
        console.log(error)
        response
            .status(error.codigo)
            .json(error)
    }
}

// DELETE /seguro/usuarios/:id
async function bajaUsuario(request, response){

    /*     
    let autoridad = request.autoridad
    let idUsuario = request.params.id
    negocioUsuarios.borrarUsuario(idUsuario, autoridad) 
    */

    try {
        await negocioUsuarios.borrarUsuario(request.params.id, request.autoridad)
        response.json({codigo : 200, mensaje: "El cliente se ha borrado correctamente."})
    } catch (error) {
        console.log(error);
        response.status(error.codigo).json(error)
    }
}