import { Component, Input } from '@angular/core';
import { DetallePedido } from '../../../modelo/entidades/detallePedido';
import { RecortarTextoPipe } from '../../../pipes/recortarTextoPipe';
import { Pedido } from '../../../modelo/entidades/pedido';

@Component({
  selector: 'app-detalle-cesta',
  standalone: true,
  imports: [ RecortarTextoPipe ],
  templateUrl: './detalle-cesta.component.html'
})
export class DetalleCestaComponent {
  @Input()
  public detalle!:DetallePedido
  @Input()
  public cesta!:Pedido

  public aumentar():void{

    // Si trabajamos con el detalle la cesta no se entera
    // this.detalle.cantidad
    this.cesta.addProducto(this.detalle.producto, 1, this.detalle.precio)
  }

  public disminuir():void{
    this.cesta.quitarProducto(this.detalle.producto, 1)
  }

  public eliminar():void{
    this.cesta.eliminarDetalle(this.detalle.producto)
  }
}
