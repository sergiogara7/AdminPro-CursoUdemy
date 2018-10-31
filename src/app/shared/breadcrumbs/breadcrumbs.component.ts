import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  public titulo:string;
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getTituloRoute().subscribe(titulo=>{
      //console.log(titulo);
      //
      this.titulo=titulo;
      //
      this.title.setTitle(this.titulo);
      //
      const metaTag: MetaDefinition={
        name: 'description',
        content: this.titulo
      }
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }
  getTituloRoute(){
    return this.router.events.pipe(
      filter(evento=>evento instanceof ActivationEnd),
      filter((evento: ActivationEnd)=>evento.snapshot.firstChild == null),
      map((valor,index)=>{
        return valor.snapshot.data.titulo;
      })
    )
  }

}
