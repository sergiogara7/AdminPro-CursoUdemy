import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_custom();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public forma: FormGroup;

  constructor(private _usuarioService: UsuarioService,private router: Router) { }

  ngOnInit() {
    //
    init_custom();
    //
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
      contrasena2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false, Validators.required),
    },{ validators: this.validateSonIguales('contrasena','contrasena2') });
    //
    this.forma.setValue({
      nombre: 'Sergio',
      apellido: 'Gallego',
      correo: 'sergio@correo.com',
      contrasena: '2',
      contrasena2: '1',
      condiciones: true
    });
  }
  registrarUsuario(){
    //
    if(this.forma.invalid){
      swal("Error", "Faltan datos importantes", "error");
      return;
    }
    //
    if(!this.forma.value.condiciones){
      swal("Importante", "Debes aceptar las condiciones", "warning");
      return;
    }
    //
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.contrasena,
      this.forma.value.correo
    );
    //
    this._usuarioService.crearUsuario(usuario).subscribe((resp)=>this.router.navigate(['/login']))
    //
    //console.log('Forma valida ? : ',this.forma.valid);
    //
    //console.log(this.forma.value);
  }
  validateSonIguales(campo1: string, campo2: string){
    return ( group: FormGroup ) => {
      let val1 = group.controls[campo1].value;
      let val2 = group.controls[campo2].value;
      if(val1 === val2){
        return null;
      }
      //
      return {
        sonIguales: true
      }
    }
  }

}
