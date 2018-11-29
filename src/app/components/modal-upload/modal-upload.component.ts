import { Component, OnInit } from '@angular/core';
import { SubirArchivoService, ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public modal: boolean = true;
  public imagen: File;
  public imagenTemp: string;

  constructor(private _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {}

  cerrarModal(){
    this.imagen = null;
    this.imagenTemp = null;
    (<HTMLInputElement>document.getElementById('imagenTemporal')).value = '';
    this._modalUploadService.ocultarModal();
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagen, this._modalUploadService.tipo, this._modalUploadService.id).then(resp =>{
      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal();
    }).catch(err => {
      console.log('Error en la carga');
    });
  }

  seleccionImagen(archivo: File){
    //
    if(!archivo){
      this.imagen=null;
      return;
    }
    //
    if(archivo.type.indexOf('image') < 0){
      swal('Error','El archivo seleccionado, no es una imagen','error')
      this.imagen=null;
      return;
    }
    //
    this.imagen = archivo;
    //
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    //
    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

}
