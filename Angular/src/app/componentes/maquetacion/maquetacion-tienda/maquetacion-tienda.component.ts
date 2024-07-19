import { Component } from '@angular/core';
import { MenuComponent } from '../../tienda/menu/menu.component';
import { Router, RouterOutlet } from '@angular/router';
import { ServicioAutenticacion } from '../../../modelo/servicios/servicioAutenticacion';
import { ServicioCesta } from '../../../modelo/servicios/servicioCesta';

@Component({
  selector: 'app-maquetacion-tienda',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './maquetacion-tienda.component.html',
  providers: [ServicioCesta]
})
export class MaquetacionTiendaComponent {

  constructor(
    private router:Router,
    private servicioAutenticacion:ServicioAutenticacion
  ){

    // No es responsabilidad de MaquetacionTiendaComponent el impedir que el usuario
    // navegue utilizando la barra del navegador
    // Eso lo haremos con los 'guards'
    /*
      if(servicioAutenticacion.getJWT() == ""){
      router.navigateByUrl("/")
      return
    } */

    //Es este componente el que deide que se verá nada más entrar a la tienda
    //En esta ruta solo hablamos de los router-outlets que no tienen nombre
    //router.navigateByUrl("/tienda/catalogo")

    //http://localhost:4200/tienda/(catalogo//barra-derecha:resumenCesta//barra-izquierda:ofertas)
    this.router.navigate([
      "/tienda",
      {
        outlets : {
          //clave: nombre del router outlet
          //valor: ruta a aplicar
          'primary'         : ['catalogo'],
          'barra-izquierda' : ['ofertas'],
          'barra-derecha'   : ['resumen']
        }
      }
    ], /*{ skipLocationChange : true }*/)

    //Esto también funciona, pero se ve peor
    //router.navigateByUrl("/tienda/(catalogo//barra-derecha:resumenCesta//barra-izquierda:ofertas", { skipLocationChange : true })
  }

}
