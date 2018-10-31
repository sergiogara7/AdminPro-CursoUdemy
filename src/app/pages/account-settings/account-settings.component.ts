import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private _document,
    private _ajustes: SettingsService
  ) { }

  ngOnInit() {
    this.aplicarCheck();
  }

  cambiarColor(color:string,link:any){
    //
    this._ajustes.aplicarTema(color);
    //
    //this.aplicarCheck(link);
    this.aplicarCheck();
  }

  /*
  aplicarCheck(linkActive:any){
    let links = this._document.getElementsByClassName('selector');
    for(let row of links){
      row.classList.remove('working');
    }
    linkActive.classList.add('working');
  }
  */
  
 aplicarCheck(tema:string = this._ajustes.ajustes.tema){
  let links = this._document.getElementsByClassName('selector');
  for(let row of links){
    if(row.getAttribute('data-theme')==tema){
      row.classList.add('working');
    }else{
      row.classList.remove('working');
    }  
  }
}

}
