import { Producto } from "./producto";

export class DetallePedido {

    public constructor(
        public producto:Producto = new Producto(),
        public cantidad:number   = 0,
        public precio  :number   = 0,
    ){}
    
}