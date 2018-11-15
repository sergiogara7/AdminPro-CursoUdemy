import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private _usuarioService: UsuarioService, private route: Router){}

  canActivate():boolean {
    //console.log('paso por el login guard');
    if(this._usuarioService.estaLogueado()){
      //console.log('Si');
      return true;
    }else{
      //console.log('No');
      this.route.navigate(['/login']);
      return false;
    }
    
  }
}
