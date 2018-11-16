import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, ModalUploadService } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
  ]
})
export class ServiceModule { }
