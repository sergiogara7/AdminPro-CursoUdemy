import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private nombre = 'usuario';
  private url = URL_SERVICIO + '/' + this.nombre;
  //
  public token: string;
  public usuario: Usuario;

  constructor(private _http: HttpClient, private router: Router, private _subirArchivoService: SubirArchivoService) {
    //console.log('Prueba usuario service');
    this.cargarStorage();
  }
  crearUsuario(usuario: Usuario){
    return this._http.post(this.url,usuario).pipe(map((resp:any)=>{
      swal("Usuario Creado", usuario.correo, "success");
      return resp.usuario;
    }));
  }

  editarUsuario(usuario: Usuario){
    //
    let url = this.url + '/' + usuario._id;
    url += '?token=' + this.token;
    //
    return this._http.put(url,usuario).pipe(map((resp:any)=>{
      //
      if(usuario._id === this.usuario._id){
        this.guardarStorage(resp.id,this.token,resp.data);
      }
      //
      swal("Usuario Actualizado", resp.data.nombre + ' ' + resp.data.apellido, "success");
      //
      return true;
    }));
  }

  login(usuario: Usuario, recordar: boolean = false){
    //
    if(recordar){
      localStorage.setItem('correo',usuario.correo);
    }else{
      localStorage.removeItem('correo');
    }
    //
    let url = URL_SERVICIO + '/login';
    //
    return this._http.post(url,usuario).pipe(map((resp:any)=>{
      //
      swal("Bienvenido", resp.data.nombre, "success");
      //
      this.guardarStorage(resp.id,resp.token,resp.data);
      //
      return true;
    }));
  }

  loginGoogle(token: string){
    //
    let url = URL_SERVICIO + '/login/google';
    //
    //return this._http.post(url,{ token: token }) es lo mismo
    return this._http.post(url,{ token }).pipe(map((resp:any)=>{
      //
      swal("Bienvenido", resp.data.nombre, "success");
      //
      this.guardarStorage(resp.id,resp.token,resp.data);
      //
      return true;
    }));
  }

  logout(){
    this.usuario=null;
    this.token='';
    //
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    //
    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    //
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    //
    this.token = token;
    this.usuario = usuario;
  }
  
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token="";
      this.usuario=null;
    }
  }

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo,'usuarios',id).then((resp: any)=>{
      //
      this.usuario.img = resp.data.img;
      //
      swal("Imagen Actualizada", resp.data.nombre + ' ' + resp.data.apellido, "success");
      //
      this.guardarStorage(id,this.token,this.usuario);
    }).catch(resp=>{
      console.log(resp);
    });
  }

  listarUsuarios(desde: number = 0){
    //
    let url = this.url + '?desde=' + desde;
    //
    return this._http.get(url);
  }

  buscarUsuarios(termino: string){
    //
    let url = URL_SERVICIO + '/busqueda/coleccion/usuarios/' + termino;
    //
    return this._http.get(url).pipe(map((resp:any)=>{
      return resp.usuarios;
    }));
  }

  borrarUsuario(id: string){
    let url = this.url + '/' + id + '?token=' + this.token;
    return this._http.delete(url).pipe(map((resp: any)=>{
      swal('Usuario borrado','El usuario ha sido eliminado correctamente','success');
      return true;
    }));
  }
}
