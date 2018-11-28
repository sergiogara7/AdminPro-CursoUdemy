import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  SettingsService, 
  SharedService, 
  SidebarService, 
  UsuarioService, 
  SubirArchivoService, 
  ModalUploadService,
  MedicoService,
  HospitalService,
  LoginGuardGuard, 
  AdminGuard
} from './service.index';
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
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard
  ]
})
export class ServiceModule { }
