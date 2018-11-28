import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _usuarioService: UsuarioService){}

  canActivate(){
    if(this._usuarioService.usuario.rol === "ADMIN_ROLE"){
      return true;
    }else{
      this._usuarioService.logout();
      return false;
    }
  }
}
