import { Component } from '@angular/core';
import { ServicioAlmacenamiento } from '../../../util/servicioAlmacenamiento';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicioUsuarios } from '../../../modelo/servicios/servicioUsuarios';

@Component({
  selector: 'app-confirmacion-registro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './confirmacion-registro.component.html'
})
export class ConfirmacionRegistroComponent {

  public terminosAceptados:boolean = false

  public constructor(
      private servicioAlmacenamiento:ServicioAlmacenamiento,
      private servicioUsuarios:ServicioUsuarios,
      private router:Router
    ){
  }

  public registrarUsuario():void{

    let usuario = this.servicioAlmacenamiento.getItem("datosRegistro")
    delete usuario.confirmarPassword
    this.servicioUsuarios.insertarUsuario(usuario)
    .subscribe({
        next: () => {
            alert("Registro completado con éxito. Redirigiendo a la pantalla de login.")
            this.servicioAlmacenamiento.clear()
            this.router.navigateByUrl('/')
        },
        error: error => {
            console.log(error)
            alert("Hubo un fallo durante el registro")
        }
    })
  }

}
