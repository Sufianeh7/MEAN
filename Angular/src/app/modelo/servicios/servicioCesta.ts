import { Injectable } from "@angular/core";
import { Pedido } from "../entidades/pedido";
import { Usuario } from "../entidades/usuario";
import { ServicioAutenticacion } from "./servicioAutenticacion";
import { MaquetacionTiendaComponent } from "../../componentes/maquetacion/maquetacion-tienda/maquetacion-tienda.component";

@Injectable({
  providedIn: 'root'
})
export class ServicioCesta{

  // La responsabilidad de esta clae es asegurarse de que todo el mundo
  // esta utilizando el mismo pedido (cesta)
  // Para ello tiene declarado como atributo un objeto del tipo pedido

  private cesta:Pedido = new Pedido()

  constructor( private servicioAutenticacion : ServicioAutenticacion){

    console.log("CREANDO EL SERVICIO CESTA");

    this.cesta = new Pedido()
    // Leer los detalles del local Storage para asignarlos a la cesta

    let cestasJSON = localStorage.getItem("cestas")
    if(cestasJSON){
      let cestas = JSON.parse(cestasJSON)
      let usuario:Usuario = servicioAutenticacion.getUsuario()
      let detalles = cestas[usuario._id]

      // La clase pedido tiene los metodos Get y Set para el array de detalles
      // Esta línea se esta llamando a Set Detalles que en su código recalcula el total
      if(detalles){
        this.cesta.detalles = detalles
      }
    }
    /*
    let detallesLocalStorage = localStorage.getItem('cesta')
    if(detallesLocalStorage){
      // this.cesta.detalles = JSON.parse(detallesLocalStorage)
      this.cesta.detalles = JSON.parse(detallesLocalStorage)
    }
    */

    // Nos suscribimos a los cambios en la cesta
    this.cesta.getSubject()
      .subscribe({
        next : (evento) => this.guardarCesta(evento),
        error: error => console.log(error)
      })
  }

  public getCesta(){
    return this.cesta
  }

  public guardarCesta(evento:String):void{
    // Guardar la cesta en el local Storage
    /*
    console.log("--------------------------------------------");
    console.log("ServicioCesta, evento recibido: "+evento);
    localStorage.setItem('cesta', JSON.stringify(this.cesta.detalles))
    */

    let cestas = JSON.parse(localStorage.getItem("cestas") ?? "{}")
    cestas[this.servicioAutenticacion.getUsuario()._id] = this.cesta.detalles
    localStorage.setItem("cestas", JSON.stringify(cestas))
  }
}
