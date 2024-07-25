import { ImagenesUtil } from './../../util/imagenesUtil';
import { firstValueFrom, map, mergeMap, Observable } from 'rxjs';
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

  public getImagenProducto(imageUrl:string):Observable<any>{
    return this.httpClient.get(configuracion.urlServicio+"/"+imageUrl, {responseType: 'blob'})
      .pipe(
        mergeMap( async (data:any) => {

          return await firstValueFrom(ImagenesUtil.createImageFromBlob(data))

          } )
      )
  }

}
