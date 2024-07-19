// floating-button.component.ts
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent {
  showButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showButton = scrollPosition > 150; // Mostrar el botón si el desplazamiento es mayor a 100px
  }

  openWhatsApp() {
    window.open('https://wa.me/+34627198362', '_blank'); // Reemplaza '1234567890' con el número de teléfono real
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
