const EndpointProductos = require('./endpointProductos').EndpointProductos
const router = require('express').Router()

let endpointProductos = new EndpointProductos()

router.get('/seguro/productos/:id', endpointProductos.buscarProductoPorID.bind(endpointProductos));
/* router.get('/seguro/productos', function(request, response){
    endpointProductos.listarProductos(request, response)
}); */
router.get('/seguro/productos', endpointProductos.listarProductos.bind(endpointProductos));
router.post('/seguro/productos', endpointProductos.insertarProducto.bind(endpointProductos));

exports.router = router