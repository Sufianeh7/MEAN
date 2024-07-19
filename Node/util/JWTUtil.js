const fs = require("fs")

const clave = fs.readFileSync("./autenticacion/clave_jwt.txt")

exports.getClaveJWT = function(){
    return clave
}