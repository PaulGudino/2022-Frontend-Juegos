import { Component, OnInit } from '@angular/core';
import { ThemeService } from './service/theme/theme.service';
import { DashboardStyleService } from '../../servicios/theme/dashboardStyle/dashboard-style.service';
import { DashboardPublicityService } from '../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { PublicityService } from '../../servicios/publicity/publicity.service';

@Component({
   selector: 'app-juego',
   templateUrl: './juego.component.html',
   styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
   backgroundImgUrl = '';
   buttonTitle: string = '';
   logoImage?: string = '';
   videoUrl: string = '';

   constructor(
      public dashPublicity: DashboardPublicityService,
      private themeService: ThemeService,
      private styles: DashboardStyleService,
      private publicity: PublicityService
   ) {}

   ngOnInit(): void {
      this.publicity.getPublicityTopList().subscribe((dataTopPublicity) => {
         if (dataTopPublicity.length > 0) {
            this.dashPublicity.loadTopData(dataTopPublicity);
            console.log(dataTopPublicity);
            this.publicity
               .getPublicityBottomList()
               .subscribe((dataBottomPublicity) => {
                  this.dashPublicity.loadBottomData(dataBottomPublicity);
               });
         }
         this.themeService.getDesignInformation().subscribe((data) => {
            this.styles.loadData(data[0]);
            this.buttonTitle = this.styles.get_title_button_screensaver();
            this.logoImage = this.styles.get_image_logo_game();
            this.videoUrl = this.styles.get_video_screensaver();
            console.log(this.themeService.publicityGameList);
         });
      });
   }
}
