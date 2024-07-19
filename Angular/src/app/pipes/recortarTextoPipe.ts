import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    standalone: true,
    name: 'recortar'
})
export class RecortarTextoPipe implements PipeTransform {

    transform(texto: any, longitud:number = 200):string {
        let palabras = texto.split(" ")
        let textoRecortado = ""
        let a:number = 0
        while(textoRecortado.length < longitud && a<palabras.length){
          let palabra = palabras[a]
          textoRecortado +=" "+palabra
          a++
        }
        if(texto.length > longitud){
            textoRecortado += "..."
        }
        return textoRecortado.substring(1)
    }

}
