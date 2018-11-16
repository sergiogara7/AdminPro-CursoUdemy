import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService, ModalUploadService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  private desde: number = 0;
  private totalRegistros: number = 0;
  private totalFiltrados: number = 0;
  public cargando: boolean;
  public paginacion: boolean;
  private texto: string = '';

  constructor(private _usuarioService: UsuarioService, private _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.listarUsuarios();
    //
    this._modalUploadService.notificacion.subscribe((resp: any)=>{
      //
      swal('Imagen actualizada','Imagen actualizada correctamente','success');
      //
      /*
      let usuarioDb: Usuario = resp.data;
      console.log('Nueva: ',usuarioDb._id,usuarioDb.img);
      console.log('Viejo: ',this._usuarioService.usuario._id,this._usuarioService.usuario.img);
      if(usuarioDb._id == this._usuarioService.usuario._id){
        console.log('entro');
        this._usuarioService.guardarStorage(usuarioDb._id,this._usuarioService.token,usuarioDb);
      }
      console.log('Quedo: ',this._usuarioService.usuario._id,this._usuarioService.usuario.img);
      console.log(this._usuarioService.usuario);
      */
      //
      if(this.paginacion){
        this.listarUsuarios();
      }else{
        this.buscarUsuario(this.texto);
      }
    });
  }

  listarUsuarios(){
    this.cargando = true;
    this.paginacion = true;
    this.totalFiltrados = 0;
    this._usuarioService.listarUsuarios(this.desde).subscribe((resp: any) => {
      this.usuarios = resp.data;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    if(desde >= this.totalRegistros){
      return;
    }
    if(desde <0 ){
      return;
    }
    this.desde=desde;
    this.listarUsuarios();
  }

  buscarUsuario(texto: string){
    //
    this.texto = texto;
    //
    if(texto.length <= 0){
      return this.listarUsuarios();
    }
    //
    this.cargando = true;
    this.paginacion = false;
    //
    this._usuarioService.buscarUsuarios(texto).subscribe((resp: Usuario[])=>{
      this.usuarios = resp;
      this.totalFiltrados = resp.length;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario){
    if(usuario._id == this._usuarioService.usuario._id){
      swal('Error','No se puede borrar usted mismo','error');
      return;
    }
    //
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre + ' ' + usuario.apellido,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(confirmacion => {
      if(confirmacion){
        this._usuarioService.borrarUsuario(usuario._id).subscribe(resp => this.recargarAlEliminar());
      }
    })
  }

  recargarAlEliminar(){
    if(this.desde >= (this.totalRegistros-1)){
      this.desde = 0;
    }
    this.listarUsuarios();
  }

  editarUsuario(usuario: Usuario){
    this._usuarioService.editarUsuario(usuario).subscribe();
  }

  mostrarModalImagen(id: string){
    this._modalUploadService.mostrarModal('usuarios',id);
  }

}
