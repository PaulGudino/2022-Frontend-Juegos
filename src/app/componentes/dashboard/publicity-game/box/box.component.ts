import {
   Component,
   OnInit,
   Input,
   ElementRef,
   ViewChild,
   Output,
   EventEmitter,
} from '@angular/core';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ImageService } from 'src/app/servicios/image/image.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';

@Component({
   selector: 'app-box',
   templateUrl: './box.component.html',
   styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit {
   @Input() number: string = '0';
   previsulizacion: string = '';
   previsulizacionGet: string = '';
   @ViewChild('takeInput', { static: false })
   InputVar!: ElementRef;
   fileToUpload!: File | null;
   imagen!: File;

   title: string = `Casilla`;
   constructor(
      private imageSrv: ImageService,
      private snackbar: SnackbarService,
      private publicityGame: PublicityGameService,
      private dialogService: ConfirmDialogService
   ) {}

   ngOnInit(): void {
      this.loadData();
   }

   capturarFile(event: any): void {
      this.fileToUpload = this.imageSrv.captureFilePng(event);

      if (this.fileToUpload) {
         this.imagen = this.fileToUpload;
         this.imageSrv.extraerBase64(this.fileToUpload).then((imagen: any) => {
            this.previsulizacion = imagen.base;
         });
      } else {
         this.previsulizacion = '';
         this.InputVar.nativeElement.value = '';
         this.snackbar.mensaje('Solo se permiten imagenes png');
      }
   }
   updatePublicityGame(): boolean {
      const options = {
         title: 'ACTUALIZAR LOGO CASILLA',
         message: '¿ESTÁ SEGURO QUE DESEA ACTUALIZAR EL lOGO?',
         cancelText: 'CANCELAR',
         confirmText: 'ACTUALIZAR',
      };

      if (!this.fileToUpload) {
         this.snackbar.mensaje('Seleccione un imagen');
         return false;
      }

      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe((confirmed) => {
         if (confirmed) {
            if (this.fileToUpload) {
               let formData: FormData = new FormData();
               formData.append('id', this.number);
               formData.append(
                  'image',
                  this.fileToUpload,
                  this.fileToUpload.name
               );
               this.publicityGame
                  .updatePublicityGame(this.number, formData)
                  .subscribe((data) => {
                     this.loadData();
                  });
               this.snackbar.mensaje('Publicidad Actualizada exitosamente');
               return true;
            }
            return false;
         }
         return false;
      });
      return false;
   }

   cancel() {
      this.previsulizacion = this.previsulizacionGet;
      this.fileToUpload = null;
   }

   loadData() {
      this.publicityGame.getPublicityGame(this.number).subscribe((data) => {
         this.previsulizacionGet = data.image;
         this.previsulizacion = data.image;
      });
   }
}
