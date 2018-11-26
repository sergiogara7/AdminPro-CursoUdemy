import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { URL_SERVICIO } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private nombre: string = 'hospital'
  private url = URL_SERVICIO + '/' + this.nombre;

  constructor(
    private _http: HttpClient, 
    private router: Router,
    private _usuarioService: UsuarioService
  ) { }

  // -- Listar
  listarHospitales(desde: number = 0){
    // organizo la url
    let url = this.url + '?desde=' + desde;
    //
    return this._http.get(url);
  }
  // -- listar -- Buscar
  buscarHospitales(termino: string){
    // organizo la url
    let url = URL_SERVICIO + '/busqueda/coleccion/hospitales/' + termino;
    // llamado
    return this._http.get(url).pipe(map((resp:any)=>{
      return resp.hospitales;
    }));
  }
  // -- Crear
  crearHospital(hospital: Hospital){
    // organizo la url
    let url = this.url + '?token=' + this._usuarioService.token;
    // hago el llamado
    return this._http.post(url,hospital).pipe(map((resp: any)=>{
      //swal("Hospital Creado", hospital.nombre, "success");
      swal("Hospital Creado", resp.message, "success");
      return resp.data;
    }))
  }
  // -- Editar
  editarHospital(hospital: Hospital){
    // organizo la url
    let url = this.url + '/' + hospital._id + '?token=' + this._usuarioService.token;
    // hago el llamado
    return this._http.put(url,hospital).pipe(map((resp: any)=>{
      swal("Hospital Actualizado", resp.data.nombre, "success");
      //
      return true;
    }))
  }
  // -- Eliminar
  eliminarHospital(id: string){
    // organizo la url
    let url = this.url + '/' + id + '?token=' + this._usuarioService.token;
    // hago el llamado
    return this._http.delete(url).pipe(map((resp: any)=>{
      // si es correcto - muestro alerta
      swal('Hospital borrado','El hospital ha sido eliminado correctamente','success');
      // retorno
      return true;
    }));
  }
  // -- obtener x id
  obtenerHospital(id: string){
    // organizo la url
    let url = this.url + '/' + id + '?token=' + this._usuarioService.token;
    // hago el llamado
    return this._http.get(url).pipe(map((resp: any)=>{
      return resp.data;
    }));
  }
}
