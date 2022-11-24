import { Component, OnInit } from '@angular/core';
import {DashboardPublicityService} from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service'
import {SnackbarService} from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';

import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
@Component({
  selector: 'app-save-screen',
  templateUrl: './save-screen.component.html',
  styleUrls: ['./save-screen.component.css']
})
export class SaveScreenComponent implements OnInit {

   isUpload:boolean = true;

  constructor(
   private dashboardPublicityService: DashboardPublicityService,
   private publicity: PublicityService,
   // private router: Router,
   private snackbar: SnackbarService,
   private dialogService: ConfirmDialogService,
   private theme: ThemeService,
   private dashStyle: DashboardStyleService,
  ) { }

  ngOnInit(): void {
   this.publicity.getPublicityList().subscribe(
      (data => {
         console.log(data[0])
         this.dashboardPublicityService.loadData(data);
         this.dashboardPublicityService.changeTopPublicityImage(data[0].image)
         this.dashboardPublicityService.changeBottomPublicityImage(data[1].image)
         this.theme.getDesignInformation().subscribe(
            designData => {
               this.dashStyle.loadData(designData);
            }
         )

      })
   )
  }

  updateSaveScreen(){}

  capturarFile(event: any): void {}

  toggleUpload(){
   this.isUpload = !this.isUpload
  }

}
