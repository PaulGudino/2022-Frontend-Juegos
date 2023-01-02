import { Component, Input, OnInit } from '@angular/core';
import { DashboardPublicityService } from '../../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';

import { DashboardStyleService } from '../../../../servicios/theme/dashboardStyle/dashboard-style.service';
import { ProbabilityService } from '../../../../servicios/probability/probability/probability.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';

import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { PublicityGame } from 'src/app/interfaces/publicityGame/PublicityGame';

@Component({
   selector: 'app-play-view',
   templateUrl: './play-view.component.html',
   styleUrls: ['./play-view.component.css'],
})
export class PlayViewComponent implements OnInit {
   informationText: string = 'A JUGAR!';
   availableSpin: number = 0;
   informationTextGame: string = `Disponnible ${this.availableSpin} Giro mas`;

   probability: any = {
      // id: 1,
      // porcent_win: 20,
      // winners_limit: 1,
      // attempts_limit: 1,
      // created: "2022-11-29T14:47:30.056806",
      // modified: "2022-11-29T14:47:30.056806",
      // is_active: true,
      // game_id: 1
   };

   constructor(
      public publicity: DashboardPublicityService,
      public styles: DashboardStyleService,
      private probabilityService: ProbabilityService,
      public animation: AnimationGameService,
      public theme: ThemeService,
      public publicityGame: PublicityGameService
   ) {}

   ngOnInit(): void {
      this.probabilityService.getProbabilites().subscribe((data) => {
         console.log(data);
         this.probability = data[data.length - 1];
         this.availableSpin = this.probability.attempts_limit;
      });
   }
}
