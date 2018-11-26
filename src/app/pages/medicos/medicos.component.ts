import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService, ModalUploadService } from 'src/app/services/service.index';

declare var swal: any; // esto para que no lo tome como error

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  private desde: number = 0;
  private totalRegistros: number = 0;
  private totalFiltrados: number = 0;
  public cargando: boolean;
  public paginacion: boolean;
  private texto: string = '';

  constructor(private _medicoService: MedicoService, private _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    // cargo los medicos
    this.cargarMedicos();
    // esperando respuesta del servicio modal
    this._modalUploadService.notificacion.subscribe((resp: any)=>{
      //
      swal('Imagen actualizada','Imagen actualizada correctamente','success');
      //
      if(this.paginacion){
        this.cargarMedicos();
      }else{
        this.buscarMedicos(this.texto);
      }
    });
  }

  // funcion al servicio
  cargarMedicos(){
    // edito variables condicionales primero
    this.cargando = true;
    this.paginacion = true;
    this.totalFiltrados = 0;
    // llamo el servicio
    this._medicoService.listarMedicos(this.desde).subscribe((resp: any) => {
      // cargo variabels recibidas
      this.medicos = resp.data
      this.totalRegistros = resp.total;
      // edito variable cargando
      this.cargando = false;
    });
  }
  buscarMedicos(texto: string){
    // cargo la variable texto
    this.texto = texto;
    // valido que la variabel si tenga contenido
    if(texto.length <= 0){
      // si esta vacia - recargo la funcion
      return this.cargarMedicos();
    }
    // si siguio - edito variables condicionales
    this.cargando = true;
    this.paginacion = false;
    // llamo el servicio
    this._medicoService.buscarMedicos(texto).subscribe((resp: Medico[])=>{
      // cargo als variables recibidas
      this.medicos = resp;
      this.totalFiltrados = resp.length;
      // edito variable cargando
      this.cargando = false;
    });
  }
  eliminarMedico(Medico: Medico){
    // confirmo la eliminacion
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar el Medico " ' + Medico.nombre + ' "',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(confirmacion => {
      // valido si la confirmacion fue si
      if(confirmacion){
        // si es true - llamo el servicio
        this._medicoService.eliminarMedico(Medico._id).subscribe( resp => this.recargarmedicos());
      }
    });
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
    this.cargarMedicos();
  }
  recargarmedicos(){
    // valido si desde es mayor o igual a los registros que quedaron despues de eliminar
    if(this.desde >= (this.totalRegistros-1)){
      // si es mayor - reinicio la paginacion
      this.desde = 0;
    }
    // recargo la funcion
    //this.cargarmedicos();
    this.buscarMedicos(this.texto);
  }

  // modal servicio
  mostrarModalImagen(id: string){
    this._modalUploadService.mostrarModal('medicos',id);
  }

}
