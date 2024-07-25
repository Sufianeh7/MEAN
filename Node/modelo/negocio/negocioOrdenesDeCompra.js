const crearError = require("../../util/errorUtil").crearError
const validar = require("../../util/validacionUtil").validar     
const Producto = require("../entidades/producto").Producto   
const Factura = require("../entidades/factura").Factura
const OrdenDeCompra = require("../entidades/ordenDeCompra").OrdenDeCompra
const Usuario = require("../entidades/usuario").Usuario
const negocioUsuarios = require("./negocioUsuarios")
const mongoose = require("mongoose")

let reglasOrdenDeCompra = {
    formaPago            : "required",
    direccionFacturacion : "required",
    direccionEntrega     : "required",
    "usuario._id"        : "required",
    detalles             : "required|array",
}

exports.procesarOrdenDeCompra = async function(ordenDeCompra, autoridad){

    let session

    try {
        //-validacion
        let error = validar(ordenDeCompra, reglasOrdenDeCompra)
        if(error){
            throw error
        }

        //-autorización
        if(autoridad._id != ordenDeCompra.usuario._id){
            //Bloquear al usuario 
            throw crearError(400, "No puedes endosarle la factura a otro cliente")
        }

        //Buscamos el usuario en la bb.dd.
        //let usuario = await Usuario.findById(ordenDeCompra.usuario._id)       //Esto no es incorrecto
        let usuario = await negocioUsuarios.buscarPorId(ordenDeCompra.usuario._id) //Pero esto es mejor
        if(!usuario){
            throw crearError(400, "El usuario no existe!")
        }
        if(usuario.estado != "ACTIVO"){
            throw crearError(400, "El usuario no está activo!")
        }    
        
        ////////////
        //BEGIN TX//
        ////////////
        session = await mongoose.startSession();
        session.startTransaction()        

        //-comprobar las existencias
        //-reducir las existencias
        //-obtener los precios y recalcular el total    
        let total = 0
        let detallesFactura = []
        for(let detalleOrdenDeCompra of ordenDeCompra.detalles){

            let cantidad = detalleOrdenDeCompra.cantidad
            let idProducto = detalleOrdenDeCompra.producto._id

            //Buscamos el producto en la bb.dd
            let producto = await Producto.findById(idProducto).session(session) /*SESIÓN*/
            if(!producto){
                throw crearError(400, `No existe el producto ${producto.nombre}.`)            
            }

            total += producto.precio * cantidad
            if(producto.existencias-cantidad < 0){
                throw crearError(
                    400, 
                    `No hay existencias del producto ${producto.nombre}. Solicitado: ${cantidad}, disponible: ${producto.existencias}`,
                    {
                        producto: producto,
                        solicitado: cantidad,
                        disponible: producto.existencias
                    }
                )
            }
            //Modificamos las existencias
            producto.existencias -= cantidad
            //Modificamos el producto en la bb.dd
            await producto.save({ session }) /*SESIÓN*/

            //Creamos el detalle para la factura
            let detalleFactura = {
                cantidad : detalleOrdenDeCompra.cantidad,
                precio : producto.precio,
                producto: producto
            }
            detallesFactura.push(detalleFactura)
        }

        //-emitir una factura
        let factura = new Factura({
            total                : total,
            detalles             : detallesFactura,
            formaPago            : ordenDeCompra.formaPago, //Esto habría que validarlo
            direccionFacturacion : ordenDeCompra.direccionFacturacion, //Esto habría que validarlo
            direccionEntrega     : ordenDeCompra.direccionEntrega, //Esto habría que validarlo 
            usuario              : usuario
        })
        factura.fecha = Date.now()
        //Necesitamos una función para calcular el códigto de la factura
        factura.codigo = "FAC-"+(Math.round(Date.now()/1000)) //Si se emiten dos facturas en el mismo segundo esto repite el código
        factura.estado = "EMITIDA"
        //-guardar la factura
        await factura.save({ session }) /*SESIÓN*/
        //-preparar los cobros
        //-enviar un correo electrónico con el pdf de la factura...
        //-crear un albarán
        //-preparar el envío

        //-guardar la orden de compra
        let ordenDeCompraMG = new OrdenDeCompra(ordenDeCompra)
        ordenDeCompraMG.fecha = Date.now()
        ordenDeCompraMG.estado = "ACEPTADA"
        await ordenDeCompraMG.save({ session }) /*SESIÓN*/

        //COMMIT
        await session.commitTransaction()        
        
    } catch (error) {
        //ROLLABACK
        if(session){
            await session.abortTransaction()  
        }
        if(error.codigo){
            throw error
        }
        console.log(error)
        throw crearError(500, "Error en el servidor")
    }

}