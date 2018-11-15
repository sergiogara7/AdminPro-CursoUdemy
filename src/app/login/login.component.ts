import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { NgZone } from '@angular/core';

declare function init_custom();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public recuerdame=false;
  public correo:string;
  private auth2: any;

  constructor(private router: Router, private _usuarioService: UsuarioService, private zone: NgZone) { }

  ngOnInit() {
    init_custom();
    this.googleInit();
    //
    this.correo = localStorage.getItem('correo') || '';
    if(this.correo.length > 0){
      this.recuerdame=true;
    }
  }

  ingresar(forma: NgForm){
    //
    //console.log(forma.valid);
    //console.log(forma.value);
    //
    if(forma.invalid){
      swal("Error", "Faltan datos importantes", "error");
      return;
    }
    //
    let usuario = new Usuario(null,null,forma.value.contrasena,forma.value.correo)
    //
    this._usuarioService.login(usuario,forma.value.recuerdame).subscribe(ok=> this.router.navigate(['/dashboard']));
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '677944295391-bv7nu3q31tdg0tooirni96fo46tbdt97.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, googleUser =>{
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      //Ejecutamos dentro de una zona
      this.zone.run( () => {
        this._usuarioService.loginGoogle(token).subscribe( ok => this.router.navigate(['/dashboard']));
      });
    });
  }
}
