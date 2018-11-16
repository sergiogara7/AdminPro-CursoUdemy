import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public modal: boolean = false;
  public notificacion = new EventEmitter<any>();

  constructor() {}
  
  ocultarModal(){
    this.modal = false;
    this.tipo = null;
    this.id = null;
  } 
  mostrarModal(tipo: string, id: string){
    this.modal = true;
    this.tipo = tipo;
    this.id = id;
  }
}
