import { Component, OnInit } from '@angular/core';

declare function init_custom();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['../../../assets/css/pages/error-pages.css']
})
export class NopagefoundComponent implements OnInit {

  public ano: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    init_custom()
  }

}
