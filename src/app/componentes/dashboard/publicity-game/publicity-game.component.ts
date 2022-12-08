import { PuenteDatosService } from './../../../servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
   selector: 'app-publicity-game',
   templateUrl: './publicity-game.component.html',
   styleUrls: ['./publicity-game.component.css'],
})
export class PublicityGameComponent implements OnInit {
   previsulizacion: string = '';
   @ViewChild('takeInput', { static: false })
   InputVar!: ElementRef;
   fileToUpload!: File | null;
   imagen!: File;

   constructor(
      private staticData: PuenteDatosService
   ) {}

   ngOnInit(): void {
      this.staticData.setMenuTragamonedas();
   }
   addPublicity() {}
   deletePublicity() {}
}
