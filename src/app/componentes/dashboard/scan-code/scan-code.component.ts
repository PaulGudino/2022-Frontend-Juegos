import { Component, OnInit } from '@angular/core';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { PuenteDatosService } from 'src/app/servicios/comunicacio_componentes/puente-datos.service';

@Component({
   selector: 'app-scan-code',
   templateUrl: './scan-code.component.html',
   styleUrls: ['./scan-code.component.css'],
})
export class ScanCodeComponent implements OnInit {
   title: string = '';
   description: string = '';

   constructor(
      public dashboardPublicityService: DashboardPublicityService,
      private publicity: PublicityService,
      // private router: Router,
      private snackbar: SnackbarService,
      private dialogService: ConfirmDialogService,
      private theme: ThemeService,
      public dashStyle: DashboardStyleService,
      private imageSrv: ImageService,
      private staticData: PuenteDatosService
   ) {}

   ngOnInit(): void {
      this.staticData.setMenuTragamonedas();
      this.publicity.getPublicityTopList().subscribe((data) => {
         this.dashboardPublicityService.loadTopData(data);
         this.publicity
            .getPublicityBottomList()
            .subscribe((bottomPublicityList) => {
               this.dashboardPublicityService.loadBottomData(
                  bottomPublicityList
               );
            });
         this.theme.getDesignInformation().subscribe((designData) => {
            this.dashStyle.loadData(designData[0]);
            this.title = this.dashStyle.get_scan_code_title();
            this.description = this.dashStyle.get_scan_code_description();
            console.log(designData[0]);
         });
      });
   }
   updateScanScreen() {
      const options = {
         title: 'ACTUALIZAR SCANNER',
         message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR INFORMACION DE ESCANER?',
         cancelText: 'CANCELAR',
         confirmText: 'ACTUALIZAR',
      };

      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe((confirmed) => {
         if (confirmed) {
            let formData: FormData = new FormData();
            formData.append('id', '1');
            formData.append('scan_code_title', this.title);
            formData.append('scan_code_description', this.description);
            formData.append('date_modified', new Date().toISOString());
            formData.append('game_id', '1');

            this.theme.updateDesgin(1, formData);
            //this.router.navigate(['/dashboard/juego/fecha']);
            this.snackbar.mensaje(
               'Informacion Escaner Actualizada Exitosamente'
            );
         }
      });
   }
   cancel() {
      // this.title = this.dashStyle.get_scan_code_title();
      // this.description = this.dashStyle.get_scan_code_description();
      window.location.reload();
   }
}
