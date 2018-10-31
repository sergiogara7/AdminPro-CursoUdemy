import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then(
      () => console.log('Termino con exito')
    ).catch(error => console.log('Hubo un error: ',error));
  }

  ngOnInit() {
  }

  contarTres(){
    return new Promise((resolve,reject)=>{
      let contador=0;
      let intervalo = setInterval(()=>{
        contador++;
        console.log(contador);
        if(contador==3){
          //
          resolve();
          //
          //reject('Simplemente un error')
          clearInterval(intervalo)
        }
      },1000)
    })
  }
}
