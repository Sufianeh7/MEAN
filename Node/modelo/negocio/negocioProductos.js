const Producto = require('../entidades/producto').Producto
const crearError = require('../../util/errorUtil').crearError
const validar = require('../../util/validacionUtil').validar


exports.ServicioProductos = class{
    
    reglasProcuctoInsercion = {
        nombre : "required|min:3|max:20",
        categoria : "required|min:3|max:20",
        fabricante : "required|min:3|max:50",
        descripcion : "required|min:20",
        precio : "numeric",
        existencias : "numeric",
    }

    async listarProductos(criterio){
        try {
            return await Producto.find() // No devuelve cursor, sino la promesa del array
        } catch (error) {
            console.log(error)
            if(error.codigo){
                throw error
            }
            throw crearError(500, "Error con la base de datos al listar los productos.")
        }
    }
    
    async buscarProductoPorID(idProducto){
        try {
            return await Producto.findById(idProducto)
        } catch (error) {
            console.log(error)
            if(error.codigo){
                throw error
            }
            throw crearError(500, "Error con la base de datos al buscar el producto.")
        }
    }
    
    async insertarProducto(producto, autoridad){
        try {
            //Autorización 
            if(autoridad.rol!="EMPLEADO"){                        
                throw crearError(403, 'Solo los empledaos pueden insertar productos.') 
            }
    
            //Validar los datos    
            // let validador = new Validator(producto, reglasProcuctoInsercion)
            // if(validador.fails()){
            //     throw crearError(400, 'Datos de producto inválidos', validador.errors.errors)
            // }

            let error = validar(producto, this.reglasProcuctoInsercion)
            if(error){
                throw error
            }

            let productoMG = new Producto(producto)
            return await productoMG.save()

        } catch ( error ){
            console.log(error)
            if(error.codigo){
                throw error
            }
            throw crearError(500, "Error con la base de datos al insertar el producto.")
        }
    }
}
