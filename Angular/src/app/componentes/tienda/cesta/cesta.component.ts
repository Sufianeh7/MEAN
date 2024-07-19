import { ServicioCesta } from './../../../modelo/servicios/servicioCesta';
import { Component } from '@angular/core';
import { Pedido } from '../../../modelo/entidades/pedido';
import { DetalleCestaComponent } from '../detalle-cesta/detalle-cesta.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [DetalleCestaComponent , CurrencyPipe, RouterLink],
  templateUrl: './cesta.component.html'
})
export class CestaComponent {

  public cesta:Pedido

  constructor(private servicioCesta:ServicioCesta) {
    this.cesta = servicioCesta.getCesta()
  }

  public vaciar():void{
    this.cesta.vaciarDetalle()
  }

}
