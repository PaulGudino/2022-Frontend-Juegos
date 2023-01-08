import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from './service/theme/theme.service';
import { DashboardStyleService } from '../../servicios/theme/dashboardStyle/dashboard-style.service';
import { DashboardPublicityService } from '../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { PublicityService } from '../../servicios/publicity/publicity.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators'

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
      private publicity: PublicityService,
      private router: Router,
      private AuthSrv: AuthService
   ) {}


   async ngOnInit(): Promise<void> {
      await this.auth()
      sessionStorage.removeItem('juego_scan');
      sessionStorage.removeItem('juego_play');
      this.publicity.getPublicityTopList().subscribe((dataTopPublicity) => {
         if (dataTopPublicity.length > 0) {
            this.dashPublicity.loadTopData(dataTopPublicity);
            // console.log(dataTopPublicity);
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
            // console.log(this.themeService.publicityGameList);
         });
      });
      
   }
   goScan(){
      this.router.navigate(['/juego/scan']);
      sessionStorage.setItem('juego_scan', 'juego_scan');
   }
   async auth(){
      let formData: FormData = new FormData();
      formData.append('username', 'admin');
      formData.append('password', 'admin');
      this.AuthSrv.auth_token(formData).subscribe(
         (data:any) =>{
            sessionStorage.setItem('token', data.access);
            sessionStorage.setItem('refresh', data.refresh);
         }
      )
   }
}
