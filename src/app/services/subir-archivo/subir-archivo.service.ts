import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  private nombre = 'upload';
  private url = URL_SERVICIO + '/' + this.nombre;

  constructor(private _http: HttpClient) {}

  subirArchivo(archivo: File, tipo: string, id: string){
    //
    let url = this.url + '/' + tipo + '/' + id;
    //
    return new Promise(function(resolve,reject){
      //
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      //
      formData.append('imagen',archivo,archivo.name);
      //
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
              if(xhr.status == 200){
                  resolve(JSON.parse(xhr.response))
              }else{
                  reject(xhr.response)
              }
          }
      }
      //
      xhr.open('PUT',url,true);
      xhr.send(formData);
    });
  }
}
