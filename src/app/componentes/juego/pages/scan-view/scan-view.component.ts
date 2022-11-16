import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-view',
  templateUrl: './scan-view.component.html',
  styleUrls: ['./scan-view.component.css']
})
export class ScanViewComponent implements OnInit {

  selectedInputCode:boolean = false;
  scanState:boolean = true;
  code:string = 'Ingresa tu codigo aqui...';
  explication:String = 'Puedes escanear el codigo QR de tu ticket';

  constructor(
   private router: Router,

  ) { }

  ngOnInit(): void {
  }

  changeView(){
   this.scanState = false;
  }

  continueToGame(){
   this.router.navigate(['/juego/play']);
  }
}
