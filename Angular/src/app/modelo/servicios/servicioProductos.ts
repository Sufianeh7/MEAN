import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { configuracion } from '../../util/configuracion';

@Injectable({
  providedIn : 'root'
})

export class ServicioProductos{

  public constructor(private httpClient:HttpClient){}

  public listarProductos():Observable<any>{
    return this.httpClient.get(configuracion.urlServicio + "/seguro/productos")
  }

}
