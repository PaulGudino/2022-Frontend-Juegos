import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardPublicityService } from '../../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from '../../../../servicios/theme/dashboardStyle/dashboard-style.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { KeyControllerService } from '../../service/keyController/key-controller.service';

@Component({
   selector: 'app-scan-view',
   templateUrl: './scan-view.component.html',
   styleUrls: ['./scan-view.component.css'],
})
export class ScanViewComponent implements OnInit {
   selectedInputCode: boolean = false;
   scanState: boolean = true;
   explication: String = 'Puedes escanear el codigo QR de tu ticket';
   code: string = this.keyController.getCode();

   constructor(
      private router: Router,
      public publicity: DashboardPublicityService,
      public styles: DashboardStyleService,
      public keyController: KeyControllerService,
      private gameLogic: GameLogicService
   ) {}

   ngOnInit(): void {}

   changeView() {
      this.scanState = false;
      this.keyController.setCode('');
   }

   async continueToGame() {
      let validateTicket = this.gameLogic.verifyTicket('128971662');
      if (await validateTicket) {
         this.router.navigate(['/juego/play']);
         sessionStorage.setItem('juego_play', 'juego_play');
      }
   }
   doSomething(){
      sessionStorage.removeItem('juego_scan');
   }
}
