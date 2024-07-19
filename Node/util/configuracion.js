const fs = require("fs")

console.log("Leyendo la configuración...")

let json = fs.readFileSync('./configuracion.json').toString()
console.log(json)
let objCfg = JSON.parse(json)

//process.env["mongodb.url"] = objCfg["mongodb.url"]
//process.env["mongodb.esquema"] = objCfg["mongodb.esquema"]
//process.env["http.puerto"] = objCfg["http.puerto"]

for(let propiedad in objCfg){
    process.env[propiedad] = objCfg[propiedad]
}