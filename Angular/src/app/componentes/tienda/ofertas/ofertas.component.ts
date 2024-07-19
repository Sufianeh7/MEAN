import { Component } from '@angular/core';
import { ServicioCesta } from '../../../modelo/servicios/servicioCesta';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [],
  templateUrl: './ofertas.component.html'
})
export class OfertasComponent {

  public mensajes:string[] = []

  public constructor(private servicioCesta:ServicioCesta){

    servicioCesta.getCesta().getSubject().subscribe({
      next  : mensaje => this.mensajes.push(mensaje),
      error : error => console.log(error)
    })
  }
}
