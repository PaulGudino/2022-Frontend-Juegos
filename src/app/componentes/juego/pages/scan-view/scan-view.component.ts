import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-view',
  templateUrl: './scan-view.component.html',
  styleUrls: ['./scan-view.component.css']
})
export class ScanViewComponent implements OnInit {

  selectedInputCode:boolean = false;
  titleScanState:boolean = true;
  code:string = '123';
  title:String = 'Escanea el Codigo';
  explication:String = 'Puedes escanear el codigo QR de tu tikect o tambien puedes ingresar manualmente el codigo';

  constructor() { }

  ngOnInit(): void {
  }

}
