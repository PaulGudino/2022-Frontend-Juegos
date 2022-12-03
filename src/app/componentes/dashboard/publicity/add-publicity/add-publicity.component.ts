import {
   Component,
   OnInit,
   Input,
   ElementRef,
   ViewChild,
   Output,
   EventEmitter,
} from '@angular/core';
import { ImageService } from 'src/app/servicios/image/image.service';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';
import { DashboardPublicityService } from '../../../../servicios/publicity/dashboardPublicity/dashboard-publicity.service';

@Component({
   selector: 'app-add-publicity',
   templateUrl: './add-publicity.component.html',
   styleUrls: ['./add-publicity.component.css'],
})
export class AddPublicityComponent implements OnInit {
   img_upload = 'assets/img/upload.png';

   previsulizacion: string = this.img_upload;
   @ViewChild('takeInput', { static: false })
   InputVar!: ElementRef;
   fileToUpload!: File | null;
   imagen!: File;

   @Input() title: string = '';
   @Input() isTop: boolean = true;
   @Output() cambioPrevisualizacion = new EventEmitter<string>();

   constructor(
      private imageSrv: ImageService,
      private snackbar: SnackbarService,
      private dashboardPublicity: DashboardPublicityService
   ) {}

   ngOnInit(): void {}

   capturarFile(event: any): void {
      this.fileToUpload = this.imageSrv.captureFile(event);

      if (this.fileToUpload) {
         this.imagen = this.fileToUpload;
         this.imageSrv.extraerBase64(this.fileToUpload).then((imagen: any) => {
            this.previsulizacion = imagen.base;
            if (this.isTop) {
               this.dashboardPublicity.setPreviewTopImage(this.previsulizacion);
               this.dashboardPublicity.setTopImageFileToUpload(
                  this.fileToUpload
               );
            } else {
               this.dashboardPublicity.setPreviewBottomImage(
                  this.previsulizacion
               );
               this.dashboardPublicity.setBottomImageFileToUpload(
                  this.fileToUpload
               );
            }
         });
      } else {
         this.previsulizacion = this.img_upload;
         this.InputVar.nativeElement.value = '';
         this.snackbar.mensaje('Solo se permiten imagenes');
      }
   }
}
