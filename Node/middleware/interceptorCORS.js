
exports.interceptorCORS = function (request, response, next){
    console.log("---------------------------------------------------")
    console.log(`Añadiendo las cabeceras Allow-content`)
    response.setHeader("Access-Control-Allow-Origin", process.env['cors.origin'])
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")  
    
    //Si la petición ha sido OPTIONS ya damos aqui la respuesta
    //No tiene sentido que continúe hacia delante
    if(request.method == "OPTIONS"){
        response.end()
        return
    }
    
    next()
}
