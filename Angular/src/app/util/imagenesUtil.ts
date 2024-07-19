import {Observable} from "rxjs";

export class ImagenesUtil{

  // Es una clase estática porque sus funciones solo utilizan
  // los parámetros que recibe y no acceden a ninguna propiedad
  // o método de la clase

  public static createImageFromBlob(image:Blob){
    return new Observable(suscribers => {
      let reader = new FileReader();
      reader.readAsDataURL(image);

      reader.addEventListener("load", () => {
        suscribers.next(reader.result)
        suscribers.complete()
      })
    })
  }
}
