import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { PieComponent } from './componentes/maquetacion/pie/pie.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, PieComponent, FloatingButtonComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Angular';
}
