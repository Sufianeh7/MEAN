
export class Usuario {

    constructor(
        public _id       : string = '',
        public login     : string = '',
        public password  : string = '',
        public correoE   : string = '',
        public nombre    : string = '',
        public telefono  : string = '',
        public direccion : string = '',
        public rol       : string = '',
    ){}
}
