const crearError = require("../util/errorUtil").crearError
const ServicioProductos = require("../modelo/negocio/negocioProductos").ServicioProductos

//////////////
// ENDPOINT //
//////////////

exports.EndpointProductos = class {
    
    servicioProductos

    constructor(){
        this.servicioProductos = new ServicioProductos()
    }

    async buscarProductoPorID(request, response){
        try {
            let idProducto = request.params.id
            let productoEncontrado = await this.servicioProductos.buscarProductoPorID(idProducto)
            if(productoEncontrado){
                response
                    .status(200)
                    .json(productoEncontrado)
            }else{
                response
                    .status(404)
                    .json(crearError(404, "El producto no existe"))
            }
        } catch (error) {
            console.log(error);
            response
                .status(error.codigo)
                .json(error)
        }
    }

    async listarProductos(request, response){
        try {
            let productos = await this.servicioProductos.listarProductos({})
            response
                .status(200)
                .json(productos)
        } catch (error) {
            console.log(error);
            response
                .status(error.codigo)
                .json(error)
        }
    }

    /*
    POST /usuarios
    Content-type: application/json
    ------------------------------
    { usuario }
    */
    async insertarProducto(request, response){
        try {
            let producto = request.body
            let autoridad = request.autoridad
            let resultado = await this.servicioProductos.insertarProducto(producto, autoridad)
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
}

