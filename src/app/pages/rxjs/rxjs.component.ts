import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry,map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() {
    //
    //this.regresaObservable().pipe(
    //  retry(2)
    //).subscribe(
      this.subscription = this.regresaObservable().subscribe(
      numero=>{console.log('Subs: ',numero)},
      error =>{console.log('Error en el subs:',error)},
      ()=>{console.log('Completado el susb')}
    );
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable():Observable<any>{
    return new Observable( observer =>{
      var contador=0;
      console.log('Contador inicia:',contador,'------>');
      let intervalo = setInterval(()=>{
        //
        contador+=1;
        var salida={
          valor: contador
        };
        //
        //observer.next(contador);
        observer.next(salida);
        //
        if(contador == 15){
          clearInterval(intervalo);
          observer.complete();
        }
        //
        /*
        if(contador == 2){
          clearInterval(intervalo);
          observer.error('**el error**');
        }
        */
      },1000);
    }).pipe(
      //map(resp => return resp.valor + 4),
      map((resp:any)=>{
        return resp.valor
      }),
      filter((valor,index)=>{
        if((valor%2)==1){
          // impar
          return true;
        }else{
          // par
          return false;
        }
      })
    );
  }

}
