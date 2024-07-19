import { Subject } from "rxjs";
import { DetallePedido } from "./detallePedido";
import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Pedido {

    //Los que se subscriban a este subject recivirán eventos cuando la cesta cambie
    private subjectCestaCambiada:Subject<any> = new Subject()

    constructor(
        public  _id                  : string|null  = null,
        public  codigo               : string|null  = null,
        public  fecha                : string|null  = null,
        public  estado               : string|null  = null,
        public  direccionFacturacion : string|null  = null,
        public  direccionEntrega     : string|null  = null,
        public  usuario              : Usuario|null = null,
        private _detalles            : DetallePedido[] = [],
        public  total                : number       = 0,
        public  formaPago            : string|null  = null
    ){}

    public getSubject():Subject<any>{
        return this.subjectCestaCambiada
    }

    //Métodos accesores en TypeScript
    //Con extra de azucar sintáctico
    public get detalles(): DetallePedido[] {
        //Devolvemos un clon de los detalles para que nadie los modifique desde el exterior
        return JSON.parse(JSON.stringify(this._detalles))
    }

    public set detalles(detalles: DetallePedido[]) {
        this._detalles = detalles
        this.calcularTotal()
    }

    /*
    public getDetalles(){
        //Devolvemos un clon de los detalles para que nadie los modifique desde el exterior
        //El truqui otra vez
        return JSON.parse(JSON.stringify(this.detalles))
    }

    public setDetalles(detalles:DetallePedido[]):void{
        this.detalles = detalles
        this.calcularTotal()
    }
    */

    public addProducto(producto:Producto, cantidad:number, precio:number ):void{

        /*
        for(let detalle of this.detalles){
            if(detalle.producto._id == producto._id){
                detalle.cantidad += cantidad
                return
            }
        }
        */

        let detalleEncontrado:DetallePedido|undefined = this._detalles
            .find( detalle => detalle.producto._id == producto._id )
        if(detalleEncontrado){
            detalleEncontrado.cantidad += cantidad
            this.calcularTotal()
            this.subjectCestaCambiada.next("Detalle aumentado")
            return
        }

        let nuevoDetalle:DetallePedido = new DetallePedido(producto, cantidad, precio)
        this._detalles.push(nuevoDetalle)
        this.subjectCestaCambiada.next("Detalle añadido")
        this.calcularTotal()
    }

    public quitarProducto(producto:Producto, cantidad:number):void{
        let detalleEncontrado:DetallePedido|undefined = this._detalles
            .find( detalle => detalle.producto._id == producto._id )
        if(detalleEncontrado){
            detalleEncontrado.cantidad -= cantidad
            if(detalleEncontrado.cantidad <= 0){
                this.eliminarDetalle(producto)
                return
            }
            this.calcularTotal()
            this.subjectCestaCambiada.next("Detalle reducido")
            return
        }
    }

    public eliminarDetalle(producto:Producto):void{
        /*
        for(let a=0; a<this.detalles.length; a++){
            let detalle:DetallePedido = this.detalles[a]
            if(detalle.producto._id == producto._id){
                this.detalles.splice(a,1)
                break
            }
        }
        */

        /*
        let posicion:number = this.detalles
            .findIndex( detalle => detalle.producto._id==producto._id)
        this.detalles.splice(posicion, 1)
        */

        this._detalles = this._detalles.filter( detalle => detalle.producto._id!=producto._id)
        this.calcularTotal()
        this.subjectCestaCambiada.next("Detalle eliminado")
    }

    public vaciarDetalle():void{
      this._detalles = []
      this.subjectCestaCambiada.next("Cesta vaciada");
      this.calcularTotal()
    }

    private calcularTotal():void{
        /*
        let total:number = 0
        for(let detalle of this.detalles){
            total += detalle.cantidad*detalle.precio
        }
        this.total = total
        */

        this.total = this._detalles.reduce(
            (total, detalle) => total+=detalle.cantidad*detalle.precio,
            0
        )
    }

}

