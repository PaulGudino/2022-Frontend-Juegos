import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  changeView(){
   this.scanState = false;
  }
}
