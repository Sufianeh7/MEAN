import { HttpClient } from "@angular/common/http";
import { Pedido } from "../entidades/pedido";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { configuracion } from "../../util/configuracion";

@Injectable({
  providedIn: 'root'
})

export class ServicioOrdenesCompra{

  constructor(private httpClient:HttpClient){


  }

  public enviarOrdenCompra(cesta : Pedido):Observable<any>{

    let ordenDeCompra:any = {
      formaPago : cesta.formaPago,
      direccionFacturacion : cesta.direccionFacturacion,
      direccionEntrega : cesta.direccionEntrega,
      usuario: {
        _id : cesta.usuario?._id
      },
      detalles : cesta.detalles
    }

    return this.httpClient.post(configuracion.urlServicio+"/seguro/ordenesDeCompra", ordenDeCompra)
  }

}
