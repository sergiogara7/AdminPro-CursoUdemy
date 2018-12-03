import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(private _usuarioService: UsuarioService){

  }

  canActivate(): Promise<boolean> | boolean {
    //
    let token = this._usuarioService.token;
    //
    let payload = JSON.parse( atob(token.split('.')[1]) );
    //console.log(payload.exp);
    //
    let expirado = this.expirado(payload.exp)
    //
    if(expirado){
      this._usuarioService.logout();
      return false;
    }
    //
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean>{
    return new Promise((resolve, reject)=>{
      //
      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();
      //
      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000));
      //console.log(ahora);
      //console.log(tokenExp);
      //
      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true);
      }else{
        this._usuarioService.renuevaToken().subscribe(()=>{
          resolve(true);
        },()=>{
          reject(true);
        })
      }
    });
  }

  expirado(fechaExp: number){
    // fecha actual
    let ahora = new Date().getTime() / 1000;
    //
    if(fechaExp < ahora){
      return true;
    }else{
      return false;
    }
  }
}
