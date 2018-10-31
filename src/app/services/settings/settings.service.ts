import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  }

  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  guardarAjustes(){
    //console.log('Guardado desde localstorage')
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
      //console.log('Caargando desde localstorage');
    }else{
      //console.log('Usando valores por defectos');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema:string){
    //
    let url = 'assets/css/colors/'+tema+'.css';
    //
    this.ajustes.tema=tema;
    this.ajustes.temaUrl=url;
    //
    this.guardarAjustes();
    //
    this._document.getElementById('theme').setAttribute('href',url);
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}