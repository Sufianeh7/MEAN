import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-campo-formulario',
  standalone: true,
  imports: [],
  templateUrl: './campo-formulario.component.html'
})
export class CampoFormularioComponent {

  @Input() public formulario!:FormGroup
  @Input() public campo!:string
  @Input() public label!:string

}
