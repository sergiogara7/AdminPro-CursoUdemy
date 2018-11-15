import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIO } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private nombre = 'usuario';
  private url = URL_SERVICIO + '/' + this.nombre;
  //
  public token: string;
  public usuario: Usuario;

  constructor(private _http: HttpClient, private router: Router) {
    //console.log('Prueba usuario service');
    this.cargarStorage();
  }
  crearUsuario(usuario: Usuario){
    return this._http.post(this.url,usuario).pipe(map((resp:any)=>{
      swal("Usuario Creado", usuario.correo, "success");
      return resp.usuario;
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
}
