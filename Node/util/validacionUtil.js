//npm install validatorjs
const Validator = require("validatorjs")
const crearError = require("./errorUtil").crearError

//Si el objeto no cumple las reglas se lanza un error
exports.validar = function(objeto, reglas, idioma="es"){
    Validator.useLang(idioma)
    let validador = new Validator(objeto, reglas)
    if(validador.fails()){
        console.log(validador.errors.errors)
        return crearError(
            400, 
            'Los datos son inválidos',
            validador.errors.errors
        ) 
    }
}