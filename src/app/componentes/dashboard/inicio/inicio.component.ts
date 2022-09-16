import { ApiService } from './../../../servicios/api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PuenteDatosService } from 'src/app/servicios/puente-datos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  nombre: string = '';
  constructor(
    private api: ApiService,
    private puente: PuenteDatosService
    ) {
      
     }

  ngOnInit(): void {
  }

}
