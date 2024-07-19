/*
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServicioAutenticacion } from '../modelo/servicios/servicio-autenticacion';
import { trusted } from 'mongoose';
export class AuthGuard implements CanActivate {

    constructor(
        private autenticacionService: ServicioAutenticacion,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.autenticacionService.getUsuario()){
            return true
        }
        return false
    }
}
*/

import { inject } from "@angular/core"
import { ServicioAutenticacion } from "../modelo/servicios/servicioAutenticacion"
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router"

//let funcion: CanActivateFn =
//    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => MaybeAsync<GuardResul>;
export const usuarioAutenticadoGuard =
    (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => {


    //Como esto no es una clase no podemos recibir nada en el constructor
    //Para que nos inyecten algo debemos utilizar la funcion 'inject'
    //La función inject solo funciona en este tipo de funciones, no en una clase
    const servicioAutenticacion:ServicioAutenticacion = inject(ServicioAutenticacion)
    const router:Router = inject(Router)
    if(servicioAutenticacion.getUsuario().nombre){
        return true
    }
    alert('NO TE CUELES!')
    //return false 'te quedas dónde estás'
    return router.navigateByUrl('/') //Nos vamos al login
}
