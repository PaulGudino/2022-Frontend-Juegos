import { Component, OnInit } from '@angular/core';
import { PublicityService } from './service/publicity/publicity.service';
import { ThemeService } from './service/theme/theme.service';
import {DashboardStyleService} from '../../servicios/theme/dashboardStyle/dashboard-style.service';
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  backgroundImgUrl = '';
  top_publicity:string = '';
  bottom_publicity:string = '';
  buttonTitle:string = '';
  logoImage:string ='';
  videoUrl:string = '';



  constructor(
    private publicity: PublicityService,
    private themeService:ThemeService,
    private styles:DashboardStyleService

  ) { }

  ngOnInit(): void {
   this.themeService.getPublicityList()
    .subscribe(dataPublicity => {
      console.log(dataPublicity);
      this.publicity.loadData(dataPublicity);
      this.top_publicity = this.publicity.getTopPublicity();
      this.bottom_publicity = this.publicity.getBottomPublicity();
      this.themeService.getDesignInformation()
      .subscribe(data => {
         this.styles.loadData(data[0]);
         this.buttonTitle = this.styles.get_title_button_screensaver();
         this.logoImage = this.styles.get_image_logo_game();
         this.videoUrl = this.styles.get_video_screensaver();
      })
   })

  }

}
