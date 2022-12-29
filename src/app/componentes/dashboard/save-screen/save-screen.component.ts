import { PuenteDatosService } from './../../../servicios/comunicacio_componentes/puente-datos.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardPublicityService } from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';

import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
@Component({
   selector: 'app-save-screen',
   templateUrl: './save-screen.component.html',
   styleUrls: ['./save-screen.component.css'],
})
export class SaveScreenComponent implements OnInit {
   isUpload: boolean = true;
   buttonTitle: string = '';
   @ViewChild('takeInput', { static: false })
   InputVar!: ElementRef;
   fileToUpload!: File | null;
   imagen!: File;
   previsulizacion: string = '';

   constructor(
      public dashboardPublicityService: DashboardPublicityService,
      private publicity: PublicityService,
      // private router: Router,
      private snackbar: SnackbarService,
      private dialogService: ConfirmDialogService,
      private theme: ThemeService,
      private dashStyle: DashboardStyleService,
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
            this.buttonTitle = this.dashStyle.get_title_button_screensaver();
            this.previsulizacion = this.dashStyle.get_video_screensaver();
         });
      });
   }

   updateSaveScreen() {
      const options = {
         title: 'ACTUALIZAR SALVAPANTALLAS',
         message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR EL SALVAPANTALLAS?',
         cancelText: 'CANCELAR',
         confirmText: 'ACTUALIZAR',
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe((confirmed) => {
         if (confirmed && this.fileToUpload) {
            let formData: FormData = new FormData();
            formData.append('id', '1');
            formData.append(
               'video_screensaver',
               this.dashStyle.getVideoScreensaverFile(),
               this.dashStyle.getVideoScreensaverFile().name
            );
            formData.append('title_button_screensaver', this.buttonTitle);
            formData.append(
               'color_background_game',
               this.dashStyle.get_color_background_game()
            );
            formData.append('color_text', this.dashStyle.get_color_text());
            formData.append('title_winner', this.dashStyle.get_title_winner());
            formData.append(
               'description_winner',
               this.dashStyle.get_description_winner()
            );
            // formData.append('image_background_game',this.dashStyle.getImageBackgroundGameFile(),)
            // formData.append('date_created',this.dashStyle.get_date_created().toISOString())
            formData.append('date_modified', new Date().toISOString());
            formData.append('is_active', 'true');
            formData.append('game_id', '1');

            this.theme.updateDesgin(1, formData);

            //this.router.navigate(['/dashboard/juego/fecha']);
            this.snackbar.mensaje('Salvapantallas Actualizado Exitosamente');
         } else if (confirmed && !this.fileToUpload) {
            let formData: FormData = new FormData();
            formData.append('id', '1');
            formData.append('title_button_screensaver', this.buttonTitle);
            formData.append(
               'color_background_game',
               this.dashStyle.get_color_background_game()
            );
            formData.append('color_text', this.dashStyle.get_color_text());
            formData.append('title_winner', this.dashStyle.get_title_winner());
            formData.append(
               'description_winner',
               this.dashStyle.get_description_winner()
            );
            // formData.append('image_background_game',this.dashStyle.getImageBackgroundGameFile(),)
            // formData.append('date_created',this.dashStyle.get_date_created().toISOString())
            formData.append('date_modified', new Date().toISOString());
            formData.append('is_active', 'true');
            formData.append('game_id', '1');

            this.theme.updateDesgin(1, formData);

            //this.router.navigate(['/dashboard/juego/fecha']);
            this.snackbar.mensaje('Salvapantallas Actualizado Exitosamente');
         }
      });
   }

   capturarFile(event: any): void {
      this.fileToUpload = this.imageSrv.captureVideoFile(event);

      if (this.fileToUpload) {
         this.imagen = this.fileToUpload;
         this.imageSrv.extraerBase64(this.fileToUpload).then((imagen: any) => {
            this.previsulizacion = imagen.base;
            this.dashStyle.setVideoScreensaverFile(this.fileToUpload);
         });
      } else {
         this.InputVar.nativeElement.value = '';
         this.snackbar.mensaje('Solo se permiten videos');
      }
   }
   toggleUpload() {
      this.isUpload = !this.isUpload;
   }

   onChangeNameButton(event: Event) {
      let element: HTMLInputElement = event.target as HTMLInputElement;

      this.buttonTitle = element.value;
   }

   cancel() {
      this.previsulizacion = this.dashStyle.get_video_screensaver();
      this.buttonTitle = this.dashStyle.get_title_button_screensaver();
   }
}
