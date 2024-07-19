
export class Producto{

  constructor(
      public _id         : string = '',
      public nombre      : string = '',
      public categoria   : string = '',
      public fabricante  : string = '',
      public descripcion : string = '',
      public imagen      : string = '',
      public precio      : number = 0,
      public existencias : number = 0,
  ){}
}
