import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicityService } from '../../service/publicity/publicity.service';
import { StylesService } from '../../service/styles/styles.service';
import {Styles} from '../../../../interfaces/styles/Styles'


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
  top_publicity = this.publicity.getTopPublicity();
  bottom_publicity = this.publicity.getBottomPublicity();

  style:Styles = this.stylesService.getStyles();

  constructor(
   private router: Router,
   private publicity: PublicityService,
   private stylesService: StylesService

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
