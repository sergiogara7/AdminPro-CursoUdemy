import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  public imagen: File;
  public imagenTemp: any;

  constructor(private _usuarioService: UsuarioService) {
    this.usuario=this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  actualizarPerfil(usuario: Usuario){
    //console.log(usuario);
    //
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    if(!this.usuario.google){
      this.usuario.correo = usuario.correo;
    }
    //
    this._usuarioService.editarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo: File){
    //
    if(!archivo){
      this.imagen=null;
      return;
    }
    //
    if(archivo.type.indexOf('image') < 0){
      swal('Error','El archivo seleccionado, no es una imagen','error')
      this.imagen=null;
      return;
    }
    //
    this.imagen = archivo;
    //
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    //
    reader.onloadend = () => this.imagenTemp = reader.result;
  }
  
  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagen,this.usuario._id);
  }
}
