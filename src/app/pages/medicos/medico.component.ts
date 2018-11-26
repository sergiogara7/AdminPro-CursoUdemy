import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService, ModalUploadService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medico: Medico = new Medico('','','','');
  public hospital: Hospital = new Hospital('');

  constructor(private _medicoService: MedicoService, private _hospitalService: HospitalService,private _router: Router, private _activatedRoute: ActivatedRoute,private _modalUploadService: ModalUploadService) {
    //
    _activatedRoute.params.subscribe(params => {
      //
      let id = params['id'];
      //
      if(id != 'nuevo'){
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    //
    this._hospitalService.listarHospitales().subscribe((resp: any)=> this.hospitales = resp.data);
    //
    this._modalUploadService.notificacion.subscribe(resp => this.medico.img = resp.data.img);
  }
  
  guardarMedico(f: NgForm){
    //console.log(f.valid);
    //console.log(f.value);
    // valido formulario
    if(!f.valid){
      return;
    }
    // llamo el servicio
    // valido si el id existe
    if(this.medico._id){
      // si existe - edito
      this._medicoService.editarMedico(this.medico).subscribe();
    }else{
      // si no existe - creo
      this._medicoService.crearMedico(this.medico).subscribe(resp=>{
        this.medico = resp;
        this._router.navigate(['medico',resp._id])
      });
    }
  }

  cambioHospital(id: string){
    this._hospitalService.obtenerHospital(id).subscribe(resp => this.hospital = resp);
  }

  cargarMedico(id: string){
    this._medicoService.obtenerMedico(id).subscribe((resp: any) => {
      //
      this.medico = resp;
      //
      this.medico.hospital = resp.hospital._id;
      this.hospital = resp.hospital;
      //
    });
  }

  // modal servicio
  mostrarModalImagen(){
    this._modalUploadService.mostrarModal('medicos',this.medico._id);
  }

}
