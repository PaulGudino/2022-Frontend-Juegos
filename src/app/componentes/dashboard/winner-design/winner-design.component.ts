import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {DashboardPublicityService} from '../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service'
import {SnackbarService} from 'src/app/servicios/snackbar/snackbar.service';
import { PublicityService } from 'src/app/servicios/publicity/publicity.service';
import { ThemeService } from 'src/app/servicios/theme/theme.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
@Component({
  selector: 'app-winner-design',
  templateUrl: './winner-design.component.html',
  styleUrls: ['./winner-design.component.css']
})
export class WinnerDesignComponent implements OnInit {

   availableSpin: string='HAZ GANADO!!!';

   previsualizacion: string = '';
   @ViewChild("takeInput", { static: false })
   InputVar!: ElementRef;
   fileToUpload!: File | null;
   imagen!:File;

  constructor(
   private dashboardPublicityService: DashboardPublicityService,
   private publicity: PublicityService,
   // private router: Router,
   private snackbar: SnackbarService,
   private dialogService: ConfirmDialogService,
   private theme: ThemeService,
   public dashStyle: DashboardStyleService,
   private imageSrv: ImageService,
  ) { }

  ngOnInit(): void {
   this.publicity.getPublicityList().subscribe(
      (data => {
         console.log(data[0])
         this.dashboardPublicityService.loadData(data);
         this.dashboardPublicityService.changeTopPublicityImage(data[0].image)
         this.dashboardPublicityService.changeBottomPublicityImage(data[1].image)
         this.theme.getDesignInformation().subscribe(
            (designData) => {
               this.dashStyle.loadData(designData[0]);
               this.previsualizacion= this.dashStyle.get_image_winner();

               console.log(designData[0])
            }
         )

      })
   )
  }
  capturarFile(event: any): void {

   this.fileToUpload = this.imageSrv.captureFile(event);

   if (this.fileToUpload) {
      this.imagen = this.fileToUpload;
     this.imageSrv.extraerBase64(this.fileToUpload).then((imagen: any) => {
     this.previsualizacion = imagen.base;
     this.dashStyle.setImageWinnerGameFile(this.fileToUpload)

     });
   }else{
     this.InputVar.nativeElement.value = "";
     this.snackbar.mensaje('Solo se permiten imagenes');
   }

  }
  updateWinner(){
   const options = {
      title: 'ACTUALIZAR RESULTADO',
      message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR INFORMACION DE RESULTADO',
      cancelText: 'CANCELAR',
      confirmText: 'CREAR'
    };

   this.dialogService.open(options);
   this.dialogService.confirmed().subscribe(confirmed => {
      if(confirmed && this.fileToUpload){
         let formData: FormData = new FormData();
         formData.append('id','1')

         formData.append('image_winner',this.dashStyle.getImageWinnerGameFile(),this.dashStyle.getImageWinnerGameFile().name)
         formData.append('date_modified',new Date().toISOString())
         formData.append('game_id','1')


         this.theme.updateDesgin(1,formData);
         //this.router.navigate(['/dashboard/juego/fecha']);
         this.snackbar.mensaje("Informacion Escaner Actualizada exitosamente");

      }

   })

  }
  cancel(){
   this.previsualizacion=this.dashStyle.get_image_winner();
  }

}
