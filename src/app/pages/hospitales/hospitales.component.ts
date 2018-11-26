import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, ModalUploadService } from 'src/app/services/service.index';

declare var swal: any; // esto para que no lo tome como error

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  private desde: number = 0;
  private totalRegistros: number = 0;
  private totalFiltrados: number = 0;
  public cargando: boolean;
  public paginacion: boolean;
  private texto: string = '';

  constructor(private _hospitalService: HospitalService, private _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    // cargo los hospitales
    this.cargarHospitales();
    // esperando respuesta del servicio modal
    this._modalUploadService.notificacion.subscribe((resp: any)=>{
      //
      swal('Imagen actualizada','Imagen actualizada correctamente','success');
      //
      if(this.paginacion){
        this.cargarHospitales();
      }else{
        this.buscarHospitales(this.texto);
      }
    });
  }

  // funcion al servicio
  cargarHospitales(){
    // edito variables condicionales primero
    this.cargando = true;
    this.paginacion = true;
    this.totalFiltrados = 0;
    // llamo el servicio
    this._hospitalService.listarHospitales(this.desde).subscribe((resp: any) => {
      // cargo variabels recibidas
      this.hospitales = resp.data
      this.totalRegistros = resp.total;
      // edito variable cargando
      this.cargando = false;
    });
  }
  buscarHospitales(texto: string){
    // cargo la variable texto
    this.texto = texto;
    // valido que la variabel si tenga contenido
    if(texto.length <= 0){
      // si esta vacia - recargo la funcion
      return this.cargarHospitales();
    }
    // si siguio - edito variables condicionales
    this.cargando = true;
    this.paginacion = false;
    // llamo el servicio
    this._hospitalService.buscarHospitales(texto).subscribe((resp: Hospital[])=>{
      // cargo als variables recibidas
      this.hospitales = resp;
      this.totalFiltrados = resp.length;
      // edito variable cargando
      this.cargando = false;
    });
  }
  eliminarHospital(hospital: Hospital){
    // confirmo la eliminacion
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar el hospital " ' + hospital.nombre + ' "',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(confirmacion => {
      // valido si la confirmacion fue si
      if(confirmacion){
        // si es true - llamo el servicio
        this._hospitalService.eliminarHospital(hospital._id).subscribe( resp => this.recargarHospitales());
      }
    });
  }
  crearHospital(){
    swal({
      text: 'Digita el nombre del nuevo hospital',
      content: "input",
      button: {
        text: "Crear",
        closeModal: true,
      },
    }).then( nombre => {
      // valido si nombre esta vacio
      if(nombre.length <= 0){
        return;
      }
      // organizo la variable
      let hospitalN = new Hospital(nombre);
      // si todo esta bn - llamo el servicio
      this._hospitalService.crearHospital(hospitalN).subscribe( resp => this.cargarHospitales());
    });
  }
  editarHospital(hospital: Hospital){
    // ahgo el llamado
    this._hospitalService.editarHospital(hospital).subscribe();
  }


  // locales
  cambiarDesde(valor: number){
    // agrego el valor recibido a variabel temporal
    let desde = this.desde + valor;
    // valido si la variable es mayor
    if(desde >= this.totalRegistros){
      return;
    }
    // valido si es menor
    if(desde <0 ){
      return;
    }
    // si todo esta bn - cambio la variable desde
    this.desde=desde;
    // vuelvo a cargar la funcion
    this.cargarHospitales();
  }
  recargarHospitales(){
    // valido si desde es mayor o igual a los registros que quedaron despues de eliminar
    if(this.desde >= (this.totalRegistros-1)){
      // si es mayor - reinicio la paginacion
      this.desde = 0;
    }
    // recargo la funcion
    //this.cargarHospitales();
    this.buscarHospitales(this.texto);
  }

  // modal servicio
  mostrarModalImagen(id: string){
    this._modalUploadService.mostrarModal('hospitales',id);
  }

}
