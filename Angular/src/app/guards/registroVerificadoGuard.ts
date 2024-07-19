import { Router } from '@angular/router';
import { inject } from "@angular/core";
import { ServicioAlmacenamiento } from "../util/servicioAlmacenamiento";

export const registroVerificadoGuard = () => {
  let servicioAlmacenamiento : ServicioAlmacenamiento = inject(ServicioAlmacenamiento)
  const router:Router = inject(Router)

  if(servicioAlmacenamiento.getItem("datosRegistro")){
    return true
  }

  alert("DEBE ANTES PASAR POR LA PANTALLA DE REGISTRO")
  //return false 'te quedas dónde estás'
  return router.navigateByUrl('/') //Nos vamos al login
}
