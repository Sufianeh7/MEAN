import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicioAutenticacion } from '../../../modelo/servicios/servicioAutenticacion';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public mostrarError:boolean = false
  public formulario:FormGroup

  constructor(
      private servicioAutenticacion:ServicioAutenticacion,
      private router:Router
    ){
    this.formulario = new FormGroup({
        login    : new FormControl('', [ Validators.required ]),
        password : new FormControl('', [ Validators.required ]),
    })
  }

  public entrar():void{
    this.formulario.markAllAsTouched()
    if(this.formulario.invalid){
      return
    }

    let credenciales = this.formulario.value
    this.servicioAutenticacion.login(credenciales)
    .subscribe({
      next: (X:any) => this.router.navigateByUrl("/tienda"),
      error: (error) => {
        console.log(error)
        this.mostrarError = true
      }
    })

  }

}
