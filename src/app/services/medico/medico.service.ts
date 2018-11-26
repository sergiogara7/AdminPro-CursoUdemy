import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { URL_SERVICIO } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private nombre: string = 'medico'
  private url = URL_SERVICIO + '/' + this.nombre;

  constructor(
    private _http: HttpClient, 
    private router: Router,
    private _usuarioService: UsuarioService
  ) { }

  // -- Listar
  listarMedicos(desde: number = 0){
    // organizo la url
    let url = this.url + '?desde=' + desde;
    //
    return this._http.get(url);
  }
  // -- listar -- Buscar
  buscarMedicos(termino: string){
    // organizo la url
    let url = URL_SERVICIO + '/busqueda/coleccion/medicos/' + termino;
    // llamado
    return this._http.get(url).pipe(map((resp:any)=>{
      return resp.medicos;
    }));
  }
  // -- Obtener x id
  obtenerMedico(id: string){
    // organizo la url
    let url = this.url + '/' + id + '?token=' + this._usuarioService.token;
    // hago el llamado
    return this._http.get(url).pipe(map((resp: any)=>{
      return resp.data;
    }));
  }
  // -- Crear
  crearMedico(medico: Medico){
    // organizo la url
    let url = this.url + '?token=' + this._usuarioService.token;
    // hago el llamado
    return this._http.post(url,medico).pipe(map((resp: any)=>{
      //swal("Medico Creado", Medico.nombre, "success");
      swal("Medico Creado", resp.message, "success");
      return resp.data;
    }))
  }
  // -- Editar
  editarMedico(medico: Medico){
    // organizo la url
    let url = this.url + '/' + medico._id + '?token=' + this._usuarioService.token;
    // hago el llamado
    return this._http.put(url,medico).pipe(map((resp: any)=>{
      swal("Medico Actualizado", resp.data.nombre, "success");
      //
      return true;
    }))
  }
  // -- Eliminar
  eliminarMedico(id: string){
    // organizo la url
    let url = this.url + '/' + id + '?token=' + this._usuarioService.token;
    // hago el llamado
    return this._http.delete(url).pipe(map((resp: any)=>{
      // si es correcto - muestro alerta
      swal('Medico borrado','El Medico ha sido eliminado correctamente','success');
      // retorno
      return true;
    }));
  }
}
