import { Component, OnInit, Input,ElementRef,ViewChild } from '@angular/core';
import { ImageService } from 'src/app/servicios/image/image.service';
import { SnackbarService } from './../../../../servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-add-publicity',
  templateUrl: './add-publicity.component.html',
  styleUrls: ['./add-publicity.component.css']
})
export class AddPublicityComponent implements OnInit {

   img_upload = "assets/img/upload.png";

   previsulizacion: string = this.img_upload;
   @ViewChild("takeInput", { static: false })
   InputVar!: ElementRef;
   fileToUpload!: File | null;
   imagen!:File;


   @Input() title: string=''

  constructor(
   private imageSrv: ImageService,
   private snackbar: SnackbarService,

  ) { }

  ngOnInit(): void {


  }

  capturarFile(event: any): void {

   this.fileToUpload = this.imageSrv.captureFile(event);
   if (this.fileToUpload) {
      console.log('reconoce')
     this.imageSrv.extraerBase64(this.fileToUpload).then((imagen: any) => {
     this.previsulizacion = imagen.base;
     });
   }else{
      console.log('reconoce que fallo')
     this.previsulizacion = this.img_upload;
     this.InputVar.nativeElement.value = "";
     this.snackbar.mensaje('Solo se permiten imagenes');
   }
 }


}
