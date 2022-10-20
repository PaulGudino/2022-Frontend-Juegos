import { Injectable } from '@angular/core';



export interface ID{
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PuenteDatosService {
  usuario_id: number = 0;
  usuario_permisos: any = [];

  /**
   * For testing environments
   */
  //  url = 'http://localhost:8000/';
  /**
   * For deployment environmnets
   */
   url = 'https://juegos.pythonanywhere.com/';

  constructor(

  ) { }
  getuser_id(): number{
    return this.usuario_id;
  }
  setuser_id(id: number){
    this.usuario_id = id;
  }
  getuser_permisos(): any{
    return this.usuario_permisos;
  }
  setuser_permisos(permisos: any){
    this.usuario_permisos = permisos;
  }
  geturl(): string{
    return this.url;
  }

}
