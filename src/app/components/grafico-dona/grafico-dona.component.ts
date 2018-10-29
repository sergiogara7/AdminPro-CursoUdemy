import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  // variables grafico
  @Input('labels') doughnutChartLabels:string[];
  @Input('data') doughnutChartData:number[];
  @Input('leyenda') titulo:string='Aca titulo de grafico';
  public doughnutChartType:string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
