import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = [];
  /*
  {
    titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    submenu: [
      { titulo: 'Dashboard', url: '/dashboard'},
      { titulo: 'ProgressBar', url: '/progress'},
      { titulo: 'Graficas', url: '/graficas1'},
      { titulo: 'promesas', url: '/promesas'},
      { titulo: 'rxjs', url: '/rxjs'}
    ]
  },
  {
    titulo: 'Administrar',
    icono: 'mdi mdi-folder-lock-open',
    submenu: [
      { titulo: 'Usuarios', url: '/usuarios'},
      { titulo: 'Hospitales', url: '/hospitales'},
      { titulo: 'Medicos', url: '/medicos'}
    ]
  }
  */
  constructor(private _usuarioService: UsuarioService) {}

  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }
}
