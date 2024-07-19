import { ServicioProductos } from './../../../modelo/servicios/servicioProductos';
import { Component } from '@angular/core';
import { Producto } from '../../../modelo/entidades/producto';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductoComponent],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent {

  public productos!: Producto[]

  constructor(private servicioProductos : ServicioProductos) {

    this.listarProductos()

  }

  public listarProductos():void{
    this.servicioProductos.listarProductos()
    .subscribe({
      next: productos => this.productos = productos,
      error: error => console.log(error)
    })
  }

/*   public comprar(producto:Producto):void{
    console.log("COMPRAR"+" "+producto.nombre);
  } */

}
