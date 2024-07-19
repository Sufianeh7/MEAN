import { Component, OnDestroy } from '@angular/core';
import { ServicioAutenticacion } from '../../../modelo/servicios/servicioAutenticacion';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../modelo/entidades/usuario';
import { Subscription } from 'rxjs';
import { ServicioCesta } from '../../../modelo/servicios/servicioCesta';
import { Pedido } from '../../../modelo/entidades/pedido';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnDestroy {

  public nombre:string = ""
  private suscripcion : Subscription
  public cesta : Pedido

  constructor(
      private servicioAutenticacion:ServicioAutenticacion,
      private router:Router,
      private servicioCesta:ServicioCesta
    ){

      this.cesta = servicioCesta.getCesta()

    this.nombre = servicioAutenticacion.getUsuario().nombre
      /*
    servicioAutenticacion.getSubjectUsuario()
      .subscribe(
        (usuario) => {
          this.nombre = usuario.nombre
        }
      )
      */

    this.suscripcion = servicioAutenticacion.getSubjectUsuario()
      .subscribe({
        next: (usuario:Usuario) => {
          console.log("USUARIO RECIBIDO EN EL MENU_COMPONENT");
          this.nombre = usuario.nombre},
        error: error => console.log(error)

      })
  }


  ngOnDestroy(): void {
    if (this.suscripcion) {
      console.log("Cancelando la suscripción...");
      this.suscripcion.unsubscribe()
    }
  }

  public logout():void{
    this.servicioAutenticacion.logout()
    this.router.navigateByUrl("/")

    // Cortar por lo sano: Si haces logout(), hacemos como si se diera a F5
    // window.location.href = "/"
  }
}
