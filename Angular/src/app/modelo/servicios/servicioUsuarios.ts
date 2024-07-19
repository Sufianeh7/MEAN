import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../entidades/usuario';
import { configuracion } from '../../util/configuracion';
import { ServicioAutenticacion } from './servicioAutenticacion';

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuarios {
  constructor(
    private httpClient: HttpClient,
    private servicioAutenticacion: ServicioAutenticacion
  ) {}

  public comprobarLogin(login: string): Observable<any> {
    return this.httpClient.head(
      configuracion.urlServicio + '/usuarios?login=' + login
    );
  }

  public insertarUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.post(
      configuracion.urlServicio + '/usuarios',
      usuario
    );
  }

  //modificarUsuario

  public modificarUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.put(
        configuracion.urlServicio + '/seguro/usuarios/' + usuario._id,
        usuario
        // {headers : {Authorization : "Bearer " + this.servicioAutenticacion.getJWT()}}
      )
      .pipe(
        tap( () => this.servicioAutenticacion.setUsuario(usuario))
      )
  }

  //borrarUsuario
  public borrarUsuario(): Observable<any>{
    let usuario:Usuario = this.servicioAutenticacion.getUsuario()
    return this.httpClient.delete(configuracion.urlServicio + '/seguro/usuarios/' + usuario._id)
      .pipe(
        tap( () => this.servicioAutenticacion.logout())
      )
  }
}
