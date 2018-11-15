import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    img = ( img == undefined ) ? '' : img;
    //
    if(img.indexOf('https') >= 0){
      return img;
    }
    //
    let url = URL_SERVICIO + '/img'
    //
    if(!img){
      url += '/usuarios/xxx';
    }else{
      //
      switch (tipo){
        case 'usuario':
          url += '/usuarios/';
        break;
        case 'hospital':
          url += '/hospitales/';
        break;
        case 'medico':
          url += '/medicos/';
        break;
        default:
          console.log('no es valido');
          url += '/usuarios/';
        break;
      }
      //
      url += img;
    }
    //
    return url;
  }

}
