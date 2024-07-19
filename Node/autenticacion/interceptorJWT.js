const jwt = require("jsonwebtoken")
const JWTUtil = require("../util/JWTUtil")
const crearError = require("../util/errorUtil").crearError

/*
POST   /login
POST   /usuarios
HEAD   /usuarios/:id

PUT    /seguro/usuarios/:id
DELETE /seguro/usuarios/:id
GET    /seguro/usuarios/:id
GET    /seguro/productos
POST   /seguro/productos
...
*/

//El token vendrá en el header 'authorization'
//Authorization: Bearer hfjkshgjrwhfjwrhf4jf.jkhfjkeqhduiyrui2fgh42.mndehwuig43yrt428
exports.interceptorJWT = function(request, response, next){

    console.log("-------------------------------------------------")
    console.log("Interceptor JWT")

    if(!request.url.startsWith("/seguro")){
        next()
        return //pa no seguir        
    }

    /*
    // :(
    let urlSinParametros = request.url.split("?")[0]
    if((request.method=="POST" && urlSinParametros == "/login")    || 
       (request.method=="POST" && urlSinParametros == "/usuarios") ||
       (request.method=="HEAD" && urlSinParametros == "/usuarios") ){
        next()
        return //pa no seguir
    } 
    */

    //Leemos el header 'authorization'
    //Authorization: Bearer bo que pa que pa que pacha fryg4r6564de45.fhgh5hfy564.6587ghyfhgtry54y4
    let authorization = request.headers.authorization

    if(!authorization){
        response
            .status(401)
            .json( crearError(401) )
        return
    }

    let trozos = authorization.split(" ")
    if( trozos.length!=2 || trozos[0].toLowerCase()!="bearer" ){
        response.status(400).json( crearError(401, "La cabecera authorization está mal construida"))
        return        
    }

    let token = trozos[1]

    try {
        let payload = jwt.verify(token, JWTUtil.getClaveJWT()) //, {algorithm: 'HS512'})
        request.autoridad = payload
    } catch(err){
        response.status(401).json( crearError(401, err.message) )
        return 
    }

    next()
}