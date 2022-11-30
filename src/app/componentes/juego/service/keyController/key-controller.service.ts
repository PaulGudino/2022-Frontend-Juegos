import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyControllerService {

   code:string = 'Ingresa tu codigo aqui...';

  constructor() { }

  getCode(){
   return this.code;
  }
  setCode(code:string){
   this.code=code;
  }

}
