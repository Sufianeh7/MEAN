import { Component, Input, OnInit } from '@angular/core';
import { DetallePedido } from '../../../modelo/entidades/detallePedido';
import { RecortarTextoPipe } from '../../../pipes/recortarTextoPipe';
import { Pedido } from '../../../modelo/entidades/pedido';
import { Producto } from '../../../modelo/entidades/producto';
import { ServicioCesta } from '../../../modelo/servicios/servicioCesta';
import { ServicioProductos } from '../../../modelo/servicios/servicioProductos';

@Component({
  selector: 'app-detalle-cesta',
  standalone: true,
  imports: [ RecortarTextoPipe ],
  templateUrl: './detalle-cesta.component.html'
})
export class DetalleCestaComponent implements OnInit{
  @Input()
  public detalle!:DetallePedido
  @Input()
  public cesta!:Pedido
  public imagenProducto:any

  constructor(
    private servicioCesta:ServicioCesta,
    private servicioProductos:ServicioProductos
  ){
    this.cesta = this.servicioCesta.getCesta()
  }

  ngOnInit(): void {
    this.servicioProductos.getImagenProducto(this.detalle.producto.imagen)
      .subscribe({
        next: (imagen:any) => this.imagenProducto = imagen,
        error: (error:any) => console.log(error)
        
      })
  }

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
