import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocultarcontrasena'
})
export class OcultarcontrasenaPipe implements PipeTransform {
 
  transform(value: string, visible: boolean = true ): any {

     if ( visible  ) {
       let salida = '';
      // tslint:disable-next-line: prefer-for-of
       for (let i = 0; i < value.length; i++) {
        salida = salida + '*';
      }
       return salida;
    } else {
      return value;
    }


  }

}
