import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') titulo: string = 'Titulo prueba';
  @Input() porcentaje: number = 58;

  @Output() cambioValor: EventEmitter<number>=new EventEmitter();

  constructor() { }

  ngOnInit() {
    //console.log(this.titulo);
    //console.log(this.porcentaje);
  }
  CambiarPorcentaje(cant){
    this.porcentaje=this.porcentaje+cant;
    if(this.porcentaje > 100){
      this.porcentaje=100;
    }else if(this.porcentaje < 0){
      this.porcentaje=0;
    }
    this.cambioValor.emit(this.porcentaje);
  }

}
