const negocioOrdenesDeCompra = require("../modelo/negocio/negocioOrdenesDeCompra")
//const express = require("express")
//let router = express.Router()
//router.get('/usuarios', ...)
const router = require("express").Router()

router.post('/seguro/ordenesDeCompra', procesarOrdenDeCompra)

exports.router = router

///////////////////////////////////////
// FUNCIONES DE LA LÓGICA DE CONTROL //
///////////////////////////////////////

async function procesarOrdenDeCompra(request, response){
    try {
        let ordenDeCompra = request.body
        let autoridad = request.autoridad
        await negocioOrdenesDeCompra.procesarOrdenDeCompra(ordenDeCompra, autoridad)
        response
            .status(201)
            .json({ mensaje: "La orden de compra se procesó correctamente."})
    } catch (error){
        console.log(error)
        response
            .status(error.codigo)
            .json(error)         
    }

}