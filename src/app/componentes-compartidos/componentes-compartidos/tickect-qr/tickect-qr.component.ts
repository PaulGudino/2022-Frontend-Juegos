import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickect-qr',
  templateUrl: './tickect-qr.component.html',
  styleUrls: ['./tickect-qr.component.css']
})
export class TickectQRComponent implements OnInit {
  @Input() cliente: string = '';
  @Input() juego: string = '';
  @Input() numeroFactura: string = '';
  @Input() codigoQR: string = '';

  QRdata: string = '';

  constructor() { }

  ngOnInit(): void {
    this.QRdata = this.cliente + '|' + this.juego + '|' + this.numeroFactura + '|' + this.codigoQR;
  }

}
