import { Component, OnInit } from '@angular/core';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import {DashboardPublicityService} from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service'
import {SnackbarService} from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.component.html',
  styleUrls: ['./publicity.component.css']
})
export class PublicityComponent implements OnInit {



  constructor(
   private publicity: PublicityService,
   private dashboardPublicityService: DashboardPublicityService,
   // private router: Router,
   private snackbar: SnackbarService,
   private dialogService: ConfirmDialogService,

  ) { }

  ngOnInit(): void {
   this.publicity.getPublicityList().subscribe(
      (data => {
         console.log(data[0])
         this.dashboardPublicityService.loadData(data);
         this.dashboardPublicityService.changeTopPublicityImage(data[0].image)
         this.dashboardPublicityService.changeBottomPublicityImage(data[1].image)

      })
   )
  }

	createPublicity(){

	}

	updatePublicity(){
      const options = {
         title: 'ACTUALIZAR PUBLICIDAD',
         message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR LA PUBLICIDAD?',
         cancelText: 'CANCELAR',
         confirmText: 'CREAR'
       };

      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
         if(confirmed){
            let formDataTop: FormData = new FormData();
            formDataTop.append('id','1')
            formDataTop.append('image', this.dashboardPublicityService.getTopImageFile(), this.dashboardPublicityService.getTopImageFile().name);
            formDataTop.append('titulo','Publicidad Superior')
            formDataTop.append('created',this.dashboardPublicityService.getTopPublicity().created)
            formDataTop.append('modified',new Date().toISOString())
            formDataTop.append('is_active','true')

            let formDataBottom: FormData = new FormData();
            formDataBottom.append('id','2')
            formDataBottom.append('image', this.dashboardPublicityService.getBottomImageFile(), this.dashboardPublicityService.getBottomImageFile().name);
            formDataBottom.append('titulo','Publicidad Superior')
            formDataBottom.append('created',this.dashboardPublicityService.getBottomPublicity().created)
            formDataBottom.append('modified',new Date().toISOString())
            formDataBottom.append('is_active','true')

            this.publicity.put(1,formDataTop);
            this.publicity.put(2,formDataBottom);
            //this.router.navigate(['/dashboard/juego/fecha']);
            this.snackbar.mensaje("Publicidad Actualizada exitosamente");

         }

      })


   }
}
