const fs = require("fs")

const certificado = {
    'cert' : fs.readFileSync('./autenticacion/server.cert'),
    'key'  : fs.readFileSync('./autenticacion/server.key')
}

exports.getCertificado = function(){
    return certificado
}
