import { configuracion } from './../../../util/configuracion';
import { Component, Input, input, OnInit } from '@angular/core';
import { Producto } from '../../../modelo/entidades/producto';
import { RecortarTextoPipe } from '../../../pipes/recortarTextoPipe';
import { ServicioCesta } from '../../../modelo/servicios/servicioCesta';
import { Pedido } from '../../../modelo/entidades/pedido';
import { ServicioProductos } from '../../../modelo/servicios/servicioProductos';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RecortarTextoPipe],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  //El componente padre proporciona el valor de los @Input
  //utilizando el selector del componente
  @Input()
  public producto!:Producto
  private cesta:Pedido

  constructor(private servicioCesta:ServicioCesta, private servicioProductos: ServicioProductos){
    this.cesta = this.servicioCesta.getCesta()
/*
    this.servicioProductos.getImagenProducto(this.producto.imagen)
      .subscribe({
        next: (data:any) => this.createImageFromBlob(data),
        error: (error:any) => console.log(error)

      }) */
  }

  public comprar():void{
    this.cesta.addProducto(this.producto, 1, this.producto.precio)
  }

  /*
  public cortarDescripcion():string{
    let palabras = this.producto.descripcion.split(" ")
    let descripcion = ""
    let a:number = 0
    while(descripcion.length < 200 && a<palabras.length){
      let palabra = palabras[a]
      descripcion +=" "+palabra
      a++
    }
    if(this.producto.descripcion.length > 200){
      descripcion += "..."
    }
    return descripcion.substring(1)
  }
  */

}
